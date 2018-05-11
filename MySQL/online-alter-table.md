MySQL에서 무중단으로 스키마 변경하기
==================================================

## Alter Table 이슈
Alter Table을 날리면 보통 아래와 같은 순서대로 작업이 진행된다.

1. 해당 테이블에 WRITE LOCK을 건다. READ만 허용.
2. 임시로 빈 새로운 테이블을 만든다.
3. 이전 테이블에서 새 테이블로 데이터를 복사한다.
4. 복사가 끝나면 이전 테이블을 삭제하고 새 테이블에 이름을 변경한다.
5. 새 테이블에 차단했던 WRITE를 푼다.

위 작업 흐름에서 볼 수 있듯이, 테이블 구조를 변경하는 동안 데이터를 넣을 수 없는 방식이다.
그리고 스키마 변경을 할 시에는 데이터를 복사하게 되므로 해당 테이블 사이즈만큼 스토리지 공간이 필요하다.


## pt-online-schema-change 방식
이 방식은 기존 MySQL의 Alter 방식의 프로세스를 수작업으로 자동화 시켰다고 보면 된다. Write 잠금 기능을 제거하고 그 기능을 trigger로 풀어서 원본 테이블의 R/W를 가능하게 했고 아래 수행 순서처럼 trigger를 통해 데이터 동기화를 이루었다.

pt-online-schema 방식의 기본적인 프로세스는 아래와 같다.

#### 1. 새로운 임시 테이블 생성
기존 테이블에 앞에는 prefix 인자를 넣으면 prefix가 붙고 `_`에 원본 테이블명, 그리고 뒤에는 `_new` 를 붙여 네이밍한 다음 임시 테이블을 만든다.

식은 기존 MySQL의 Alter 방식의 프로세스를 수작업으로 자동화(스크립트화)시켰다고 보면 된다. Write 잠금 기능을 제거하고 그 기능을 trigger로 풀어서 원본 테이블의 R/W를 가능하게 했고 수행 순서를 보면 알겠지만, trigger를 통해 데이터 동기화를 이루었다. pt-online-schema-change의 방식의 기본적인 프로세스는 아래와 같다.

create_new_table()함수를 보면,
```
my $prefix = $args{prefix} || '_';
my $suffix = '_new';
my $table_name = $orig_tbl->{tbl}.$suffix;
$table_name = $prefix.$table_name;
```
2. 새로운 임시테이블 Alter
alter 인자로 주어진 ddl구문을 실행해서 임시 테이블에 칼럼 및 인덱스 등을 생성한다.
```
my $sql = "ALTER TABLE $new_tbl->{name} $alter";
print $sql, "\n" if $o->get('print');
PTDEBUG && _d($sql);
eval {
  $cxn->dbh()->do($sql);
};
```

3. 트리거 생성
원본 테이블의 변경사항을 임시 테이블에 반영해서 동기화하는 부분에 해당된다. 원래 테이블에 AFTER INSERT, AFTER UPDATE, AFTER DELETE 등 세 트리거를 만든다.
실행부분은 아래와 같고.
```
my @trigger_names = eval {
    create_triggers(
    orig_tbl => $orig_tbl,
    new_tbl => $new_tbl,
    columns => \@common_cols,
    Cxn => $cxn,
    Quoter => $q,
    OptionParser => $o,
  );
};
```

실제로 트리거문 구성을 살펴보면 아래와 같다. 참고로 MySQL의 트리거는 각각의 이벤트에 하나 밖에 만들 수 없기 때문에 이미 트리거 존재하는 테이블에 pt-online-schema-change을 사용할 수 없다.
```
my $insert_trigger
= "CREATE TRIGGER `${prefix}_ins` AFTER INSERT ON $orig_tbl->{name} "
. "FOR EACH ROW "
. "REPLACE INTO $new_tbl->{name} ($qcols) VALUES ($new_vals)";

my $update_trigger
= "CREATE TRIGGER `${prefix}_upd` AFTER UPDATE ON $orig_tbl->{name} "
. "FOR EACH ROW "
. "REPLACE INTO $new_tbl->{name} ($qcols) VALUES ($new_vals)";

my $delete_trigger
= "CREATE TRIGGER `${prefix}_del` AFTER DELETE ON $orig_tbl->{name} "
. "FOR EACH ROW "
. "DELETE IGNORE FROM $new_tbl->{name} "
. "WHERE $del_index_cols";
```

INSERT 이벤트에 대해서는 REPLACE문, UPDATE 이벤트는 REPLACE 문, DELETE 이벤트에 대해 DELETE 문을 발생시킨다. 그리고 DELETE 문은 임시 테이블에 레코드가 없을 경우 무시해 버리게 해 놨다.



4. 데이터 복사
INSERT LOW_PRIORITY IGNORE INTO ... 구문을 가지고 nibble_iter를 통해 원본 테이블의 데이터를 임시 테이블로 복사를 시작한다.
이렇게하면 응용 프로그램 측의 처리가 잠금 대기 시간에서 실패하는 것을 막으려하고 있다. 또한 시스템이 과부하되는 것을 방지하기 위해 1,000 레코드 처리할 때마다 대기 시간을 가질 수 있게 되어 있다.



5. 테이블 리네임(swap)
원본 테이블과 임시테이블을 교체한다. 기존 테이블은 _기존테이블_old로 바꾸고 신규 임시 테이블은 기존 테이블로 리네임한다.
eval {
  $old_tbl = swap_tables(
    orig_tbl => $orig_tbl,
    new_tbl => $new_tbl,
    suffix => '_old',
    Cxn => $cxn,
    Quoter => $q,
    OptionParser => $o,
  );
};
RENAME TABLE.. TO .. TO ...

6. foreign key 업데이트
존재할 경우 처리.

7. OLD 테이블 DROP
