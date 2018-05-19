MySQL 대기 현상을 유발하는 원인
==============================

저번주에 MySQL 작업을 시도하다가 서비스 장애가 났었다. 그 원인이었던 Query 대기를 유발하는 원인에 대해서 파악해보고자한다.

MySQL 대기 현상을 유발하는 원인은 크게 아래 다섯가지이다.

- DDL 작업 진행 시
- Table Flush 진행 시
- mysqldump를 이용해 백업이 진행되는 경우
- Table Lock을 사용하는 경우
- Serializable Isolation Level을 사용하는 경우

위의 다섯 가지 경우를 하나씩 살펴보자. 참고로 테스트에 사용된 MySQL 버전은 MySQL Community 버전 5.0.67로, MyISAM과 InnoDB를 대부분 사용했기 때문에 여기 나온 내용은 그 사항에 특화된 것임을 밝힌다.


## DDL 작업 진행 시

사실 MySQL을 오랫동안 운영해본 사람이라면 MySQL에서의 DDL 작업이 쉬운 작업이 아님을 대부분 알고 있을 것이라 생각한다. MySQL에서 DDL 작업은 온라인 작업이 아니기 때문이다. 특히 alter 작업의 경우 서비스에 많은 영향을 미치기 때문에 서비스 중인 서버에 대해 작업을 시도하고자 하는 경우 서비스를 중단해야 할 수도 있다.

- DDL 작업이란?
DDL은 Data Definition Language의 약자로서 데이터 정의 언어를 뜻한다. 이것은 데이터를 저장하는 데이터베이스의 스키마를 기술하는 언어를 말하는 것으로서 흔히 create table, alter table, create index와 같은 명령어를 의미한다.
특히 MySQL에서 이와 같은 DDL 작업은 온라인 작업이 불가능하다. 즉, 간단히 얘기해서 alter table 작업 시 그 테이블에 대한 데이터 변경 작업이 불가능하다. 그렇기 때문에 DDL 작업을 진행 중인 동안에는 다른 Connection에서 실행하는 데이터 변경 작업은 진행되지 않고 대기하게 된다.

#### 대기 유발 상황
그럼 어떤 경우에 대기가 유발되는지 확인해 보자.

1. shrtcmt 테이블에 다음과 같은 alter table 명령을 실행한다.
```
mysql> alter table shrtcmt engine = MyISAM;
```

2. 다른 커넥션을 통해 shrtcmt 테이블에 데이터 변경을 시도하는 sql 문을 실행한다.
```
mysql> delete from shrtcmt where shrtcmtseq < 6;
```

3. show processlist 구문을 통해 현재 상태를 확인한다.
```
mysql> show processlist;
```

프로세스 상태를 확인하면 delete query가 locked 상태인 것을 확인할 수 있다. 이 경우는 DDL 작업동안 table write lock이 걸리기 때문이다.

#### 해결 방법
먼저 현재 상황을 해결하기 위해서는 DDL 작업이 끝나기를 기다리는 수밖에 없다. 만약 70번 Connection이 select 문을 실행하는 경우라면 실행에 문제가 없었을 것이다. DDL 문은 데이터 변경만 불가능하기 때문이다.
원래 이와 같은 작업은 작업 전에 작업시간 및 작업 일정에 대한 논의가 충분히 이루어졌어야 하는 부분이다. alter table과 같은 DDL 작업 시에는 먼저 테스트를 통해 어느 정도의 시간이 필요한지 확인하고, 그 시간을 토대로 서비스 Down Time을 가져야 하는 것인지에 대한 충분한 논의 후에 작업에 들어가도록 해야 한다.



## Table Flush 진행 시

Table Flush는 일반적으로 생각하기에 대기 현상과 전혀 관계없다고 생각할 수 있다. 하지만 실제 DB의 운영 시 대기 현상을 발생시킬 수도 있다. 그러면 왜 대기 현상이 Table Flush로 인해 발생할 수 있는 것인가? 이것은 Table Flush가 어떤 일을 하는지 파악하면 확인할 수 있다.

#### Table Flush의 작업 내용
Table Flush는 현재 MySQL에 의해 사용 중인 해당 테이블을 닫고, 다시 여는 작업을 진행하는 명령어로서 메모리에 로딩된 테이블에 관련된 cache 영역을 clear하고, reload할 때 사용된다. 그리고 추가적으로 query cache에 있는 데이터를 전부 reset하는 기능을 수행한다. 다시 정리하면 다음과 같다.

- Flush 해당 테이블의 reopen 작업
- query cache의 reset 작업



#### 대기 유발 상황
그러면 어떠한 경우에 이러한 대기 현상이 유발되는지 확인해 보자.


1. shrtcmt 테이블에 다음과 같은 쿼리를 실행한다.
```
mysql> select * from shrtcmt;
```

2. 다른 커넥션을 통해 Table Flush를 시도한다.
```
mysql> flush tables;
```

3. shrtcmt를 select하는 다른 쿼리를 또 다른 커넥션을 통해 실행한다.
```
mysql> select * from shrtcmt limit 0,2;
```

4. show processlist;를 실행해 상태를 확인한다.
```
mysql> show processlist;
```



### 대기 유발 예제

여기에서 “show processlist”를 통해 확인해 보면 State 항목에 Locked라는 구문은 보이지 않는다. Connection의 select 쿼리로 인해, “flush tables”가 대기되고, 그로 인해 그 이후에 실행Connection도 대기되어 장시간 대기 현상을 보이는 것을 확인할 수 있다.

이와 같이 대기 현상이 유발되는 이유는 Table Flush의 작업 성격에 있다. Table Flush 작업은 해당 테이블에 아무런 작업이 일어나지 않을 그 순간에 진행된다. 또한 Table Flush 이후에 들어온 쿼리들은 Flush가 끝날 때까지 기다린 다음에 진행되는데, Flush 이전에 실행되어 있던 쿼리가 끝나지 않으면 Table Flush 작업도 대기 상태가 되기 때문에 연쇄적으로 대기 현상이 발생하게 되는 것이다.

#### 해결 방법
이와 같은 대기 발생 시, 상황을 해결하기 위해서는 유발에 원인이 되는 쿼리를 실행하는 Connection을 kill하여 처리하던가, “flush tables”를 시도하는 Connection을 kill해 처리해야 한다. 하지만 어느 Connection을 kill해야 하는가에 대한 문제는 서비스의 상황에 따라 달라지게 된다. 데이터를 select하는 쿼리인 경우에는 대부분 큰 문제가 되지 않기 때문에 대기 유발의 원인이 되는 Connection, 즉 7번 Connection을 kill하여 해결하지만, 만약 데이터를 변경하려는 쿼리일 경우에는 다른 선택을 해야 할 수도 있다.

즉, 서비스 성격에 따라 데이터 변경을 시도하는 Connection을 kill하던가 아니면 flush tables를 시도하는 Connection을 kill하면 되는데, 둘 중 어느 Connection을 kill해야 하는가에 대한 문제는 연결되어 있는 Connection이 어떤 성격의 것이냐에 따라 선택되어야 하는 것이므로 어떤 것을 선택해야 옳은지는 단정 지어 말하기 어렵다.



## mysqldump를 이용해 백업이 진행되는 경우

mysqldump는 MySQL에 기본 제공되는 백업 툴로서 이 툴을 이용하면 데이터에 대한 논리적인 백업을 진행할 수 있다. 이 툴을 사용해 서비스 중인 DB에 대해 백업을 진행하는 경우, 서비스에 관계없이 백업할 수 있다. 하지만 특이한 상황의 경우 위와 같은 대기 현상을 발견할 수 있다(백업은 일반적으로 백업 타입에 따라 물리적인 백업과 논리적인 백업으로 나뉜다. 물리적인 백업은 실제 데이터가 저장된 저장 파일을 백업 받는 것을 의미하고, 논리적인 백업은 실제 데이터와 스키마를 추출해 논리적인 형태로 바이너리 파일이나 txt 파일로 저장하는 것을 의미).



#### mysqldump의 작업 내용
mysqldump는 논리적으로 데이터의 내용을 백업 받을 수 있는 툴이다. 이 툴을 사용해 백업을 받는 경우에도 앞 예제와 같은 현상이 발생할 수 있다. 그것은 바로 다음과 같은 mysqldump의 특징 때문이다.

- Snapshot을 위해 mysqldump는 작업 시작 전 “flush tables” 명령을 수행한다.

IT에서 SnapShot은 어느 한 순간의 메모리 상태를 말하는 것으로, 일반적으로 DB에서의 SnapShot은 어느 한 순간의 데이터 집합을 의미한다. mysqldump를 이용하면 SnapShot 상태의 데이터를 백업 받을 수 있는데, 이러한 목적으로 백업을 받을 경우 대기 현상이 유발될 수 있다.



#### 대기 유발 상황
그러면 어떠한 경우에 대기 현상이 발생하게 되는 것인가? 다음과 같은 상황에 확인할 수 있다.



1. shrtcmt 테이블에 select를 실행한다.
```
mysql> select * from shrtcmt;
```

2. mysqldump를 이용해 백업되도록 실행한다.
```
[mysql bin] ./mysqldump -ptest -u root --master-data --single-transaction --all-databases >> /db/dump/test.sql
```

3. shrtcmt 테이블에 다른 커넥션을 연결해 다른 select를 실행한다.
```
mysql> select * from shrtcmt limit 0,2;
```

4. show processlist;를 통해 확인한다.
```
mysql> show processlist;
```



#### 대기 유발

만약 mysqldump 실행 시 <화면 3>과 같은 SnapShot을 위한 옵션(--master-data, --single-transaction, --all-databases)을 사용하지 않는다면 이와 같은 대기 현상은 나타나지 않는다. 이와 같은 현상은 mysqldump를 이용해 SnapShot을 원할 경우에만 발생하게 된다.

#### 해결 방법
이와 같은 경우, 대기 유발 상황을 해결하는 방법은 Table Flush 진행의 경우와 다르지 않지만, 이 상황의 경우 Table Flush가 백업의 SnapShot을 위해 진행하는 작업이기 때문에 대기를 유발한 Connection, 즉 위의 예제처럼 2번 Connection을 kill하던지 아니면 백업을 포기하던지 선택해야 한다. 여기서도 마찬가지로 어느 Connection을 kill할지에 대한 선택의 문제는 그 Connection의 성격에 따라 달라진다.


http://dev.mysql.com/doc/refman/5.0/en/mysqldump.html에 기술된 내용을 확인하면, 실제 프로세스를 통해 보이는 현상과 다르게 설명되어 있음을 확인할 수 있다. 링크의 문서 내용을 확인하면 다음과 같은 내용을 확인할 수 있다.

--all-databases, --single-transaction 옵션을 사용하여 백업을 진행하면 “FLUSH TABLES WITH READ LOCK”을 사용하는 global read lock이 발생한다.

하지만, --all-databases, --single-transaction 옵션만 사용하게 되면, global read lock은 발생하지 않는다. --master-data 옵션도 같이 사용해야만 발생하게 되고 세 가지의 옵션을 사용하는 경우에 “FLUSH TABLES WITH READ LOCK”이 아닌 “FLUSH TABLES”가 실행됨을 <화면 4>를 통해 확인할 수 있다.


## Table Lock을 사용하는 경우

서비스를 운영할 때 데이터에 대한 일관성을 보장하기 위해 Table Lock을 사용하는 경우 Table Lock의 특성에 맞지 않게 Application을 구성하면 Lock으로 인한 대기 현상으로 인해 서비스에 영향을 미칠 수 있다.

#### Table Lock을 사용하는 경우
먼저 어느 경우에 Table Lock을 사용하는지 확인해 보자.

- Table Lock을 사용하는 Storage Engine으로 테이블을 생성한 경우
- 명시적으로 Table Lock을 사용한 경우

위의 두 가지 경우 중 주로 원인이 되는 경우는 첫 번째의 경우, 즉 Table Lock을 사용하는 Storage Engine을 사용하는 경우이다. 이 예제에 가장 대표적인 예로는 MyISAM Storage Engine이 있다. 그럼 대기 유발 상황을 확인하기 전에 Table Lock에 대해 간단히 알아보자. Table Lock은 다음과 같은 원칙에 따라 Lock을 실행한다.

- 데이터 일관성을 보호하기 위해 Read Lock과 Write Lock을 사용한다.
- Read Lock은 하나의 테이블에 동시에 접근할 수 있다.
- Read Lock과 Write Lock은 하나의 테이블에 동시 접근할 수 없다.



#### 대기 유발 상황
그러면 MyISAM과 같이 Table Lock을 사용하는 스토리지 엔진으로 테이블을 생성한 경우 어떻게 Lock이 유발되는지 확인해 보자.

1. 먼저 테스트하려는 shrtcmt 테이블이 MyISAM 스토리지 엔진인지 확인한다.
```
mysql> show create table shrtcmt;
```

2. shrtcmt 테이블에 select를 한다.
```
mysql> select * from shrtcmt;
```

3. 다른 커넥션을 열어서 shrtcmt 테이블에 데이터 변경문(ex>insert, update, delete)을 실행한다.
```
mysql> delete from shrtcmt where userid = ’’;
```

4. 또 다른 커넥션을 열어서 shrtcmt 테이블에 select 쿼리를 실행한다.
```
mysql> select * from shrtcmt limit 0,2;
```

5. show processlist를 통해 현재 상태를 확인한다.
```
mysql> show processlist;
```



#### 해결 방법
앞 예제의 경우에는 오랜 시간 동안 실행되어 언제 끝날지 모르는 Connection을 kill하여 처리해야 한다. 이 예제에서의 문제점은 오랜 시간 동안 실행되는 select SQL 문으로 인해 같이 실행될 수 없는 데이터 변경 문이 실행되어 Lock 경합을 유발한다는 데에 있다.

중요한 것은 MyISAM과 같은 Storage Engine에서 read는 같은 테이블에 동시에 여러 건이 실행될 수 있지만, read와 write는 같은 테이블에 동시에 일어날 수 없다는 것이다. 만약 1시간 동안 실행되는 update 문이 있었다면, 그 테이블은 1시간 동안 어떤 select도 발생할 수 없게 된다.

그러므로 MyISAM과 같이 Table Lock을 사용하는 Storage Engine을 사용하려면, SQL 문이 되도록 짧은 시간에 끝날 수 있도록 작성해야 한다. 하지만 그럼에도 불구하고 이런 대기 현상이 자주 발생한다면, 현재 운영하는 서비스에 MyISAM과 같은 Storage Engine은 맞지 않는 것이다. 이런 경우에는 서비스 특성에 따라 다른 Lock mode를 사용하는 Storage Engine으로 교체하는 것을 고려해 보는 게 좋다.


## Serializable Isolation Level을 사용하는 경우

InnoDB에서 Serializable Isolation Level을 사용하는 경우 Read Lock 사용으로 인한 대기 현상을 확인할 수 있다.

#### Serializable Isolation Level이란?
Serializable Isolation Level은 select 수행 시 Read Lock, 즉 Shared Lock을 사용하는 Transaction Isolation Level로서 표준 SQL에서 지원하는 4개의 Isolation Level 중 가장 Static한 Level이다. Serializable Isolation Level의 특징은 다음과 같다.

- select 수행 시 Read Lock을 사용한다.
- 데이터의 일관성 및 동시성을 위해 MVCC(MultiVersion Concurrency Control)를 사용하지 않는다(MVCC는 다중 사용자 데이터베이스 성능을 위한 기술로서 데이터 조회 시 lock을 사용하지 않고 데이터의 버전을 관리해 데이터의 일관성 및 동시성을 높이는 기술을 말한다).

#### 대기 유발 상황
그러면 Serializable Isolation Level 사용 시 어떤 경우에 대기 유발 상황이 발생하는지 그 상황을 확인해 보자.



1. 현재 MySQL 서버의 Isolation Level이 Serializable인지 확인한다.
```
mysql> select @@tx_isolation;
```

2. shrtcmt 테이블이 InnoDB Storage Engine인지 확인한다.
```
mysql> show create table shrtcmt;
```

3. shrtcmt 테이블에 select 쿼리를 실행한다.
```
mysql> select * from shrtcmt;
```

4. 다른 커넥션을 열어서 데이터 변경 작업을 실행한다.
```
mysql> delete from shrtcmt where userid=’’;
```

5. show processlist; 구문을 통해 상태를 확인한다.
```
mysql> show processlist;
```


#### 해결 방법
먼저 앞과 같은 상황을 해결하기 위해서는 문제가 되는 Connection을 kill 명령을 사용해 중단시킨다. 또는 innodb_ lock_wait_timeout 시간을 짧게 하여 해결할 수도 있다. 하지만 Lock 경합으로 인해 실질적으로 commit되는 트랜잭션의 수는 적을 것이고, rollback되는 트랜잭션의 수는 많아질 것이다. 그래서 서비스에 사용할 경우에는 이 Isolation Level을 사용하는 게 맞는 것인지 먼저 파악해 보는 것이 중요하다. 데이터의 접근 동시성을 확보하기 위해서는 다른 Isolation Level을 사용하도록 권장한다. 일반적으로 많이 사용하는 Isolation Level은 Read Uncommitted와 Read Committed이다.


출처: http://blog.pages.kr/232 [hi.pe.kr 날으는물고기·´″°³о♡]
