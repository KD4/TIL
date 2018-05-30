
Index Hint - FORCE INDEX USE INDEX 차이점
===================================

인덱스 힌트는 옵티마이저가 쿼리를 수행하는 동안 어떤 인덱스를 사용할지에 대한 정보를 주기 위한 문법이다.

다음과 같은 문법으로 사용할 수 있다.

```mysql
SELECT * FROM table1 USE INDEX (col1_index,col2_index)
  WHERE col1=1 AND col2=2 AND col3=3;

SELECT * FROM table1 IGNORE INDEX (col3_index)
  WHERE col1=1 AND col2=2 AND col3=3;

index_hint:
    USE {INDEX|KEY}
      [FOR {JOIN|ORDER BY|GROUP BY}] ([index_list])
  | IGNORE {INDEX|KEY}
      [FOR {JOIN|ORDER BY|GROUP BY}] (index_list)
  | FORCE {INDEX|KEY}
      [FOR {JOIN|ORDER BY|GROUP BY}] (index_list)
```

## USE INDEX
특정 로우를 찾기 위해서 적절한 인덱스를 옵티마이저에게 추천해준다. 옵티마이저는 추천된 인덱스와 자기가 판단하는 인덱스를 비교해서 더 빠른쪽을 수행한다.

## FORCE INDEX
특정 인덱스를 사용하도록 강제한다.

## IGNORE INDEX
특정 인덱스를 사용하지않도록 강제한다.

### USE INDEX VS FORCE INDEX
두 인덱스 힌트는 비슷하지만, 자세히 보면 다르다.

USE INDEX는 옵티마이저에게 인덱스를 추천한다. 하지만 더 빠른 인덱스가 있다면 옵티마이저는 무시한다.

FORCE INDEX는 옵티마이저가 지정된 인덱스를 사용하도록 강제할 수 있다.
