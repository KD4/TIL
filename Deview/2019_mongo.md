MongoDB
====================

컨텐츠 검색

MongoDB 기반 검색 서버를 만들어서 컨텐츠 서비스를 하고 있다.


검색 서비스를 업데이트가 CP에서 발생함.

Chicago 플랫폼

왜 몽고디비를 기반으로?

FAST + SCALABLE + HA = MongoDB

통검 1초 rule, 현재 시카고 플랫폼 10ms미만

4~5억건 이상 서버 호출, 초당 6천건, 몽고 DB는 초당 만건

몽고DB 속도 올리기 - Index

속도를 중요시 하는 검색서버를 만들면서 어떻게 설계하는가를 말한다.

인덱스부터

## MongoDB Index 이해하기

MongoDB는 컬렉션당 최대 64개 인덱스만 생성가능.

너무 많은 인덱스를 추가하면 오히려 사이드 이펙트가 발생한다.

대부분의 사람들이 쿼리 느릴때 추가하면 된다. 그때그때 생성하면 되지않나?
서비스를 하다보니 인덱스가 만능은 아니다.
1. Frequent Swap. 몽고디비는 메모리에 인덱스를 올리기 때문에 인덱스가 많아지면 Disk I/O가 많아지고
2. 인덱스가 많아지면 데이터 write시 더 많은 쿼리가 일어남. 이는 read에도 문제가 생김.
3. 인덱스가 많으면 옵티마이저가 잘못 작동할 수 있다.

### Index Prefix를 이해하자

복합 인덱스에서 여러 속성을 넣으면 순서대로 부분집합 인덱스가 생긴다.
-> 중복되는 인덱스를 지울 수 있다.

복합 인덱스 설계 시 순서가 중요하다(부분 인덱스, pre index가 생기기 때문)

### 멀티 소팅
Sort key들은 반드시 인덱스와 같은 순서로 나열되어야한다.

createIndex({gameData:1, teamName: 1});로 인덱스를 만들면

sort({gameDate:1, teamName: 1}) 이건 커버됨. sort({teamName:1, gameData: 1}) 이건 커버 안됨

compound 인덱스의 경우, 소팅 방향이 중요함, 역방향은 지원합니다.


## 인덱스 말고 속도를 올리는 방법
하나의 컬렉션을 여러 컬렉션으로 나누자?

하나의 컬렉션이 너무 많은 문서를 가질 경우, 인덱스 사이즈가 증가하고 인덱스 필드의 cardinality가 낮아질 가능성이 있다.

이는 lookup performance에 악영향을 미치고 슬로우 쿼리를 유발한다.

한 컬렉션에 너무 많은 문서가 있다면 반드시 컬렉션을 나눠서 쿼리 프로세서가

### 스레드를 이용해 대량의 Document를 upsert

단순히 bulk operation은 네트워크 이슈만 해결해준다.

여러 개의 thread에서 bulk operation으로 많은 도큐먼트를 한번에 wrtie.

몽고 4.0 이전에는 non-blocking secondary read 기능이 없었음

write가 primary에 반영되고 secondary들에 다 전달될때가지 세컨더리는 락걸리기 때문에 느려진다.

secondary slow query가 잡히면 거의 이 문제다.

## 미운 인덱스

몽고디비 슬로우 쿼리는 explain을 해보자.

key examined: 쿼리 프로세서가 읽은 키값.

튜닝 포인트는 key examined 값 8천이하로 하면 100ms로 내려감

인덱스 설계한대로 쿼리가 인덱스를 타는지 확인해보자.

=> 안탄다

몽고디비 인덱스 힌트를 태워보자 => 탄다

왜 안타지? 일단 서비스 롤백하고 확인해보니 Query Planner가 이전 플랜을 캐싱해놓아서 그렇다.

첫 배치를 가장 좋은 성능으로 가져오는 것을 좋은 것으로 본다. 몽고DB는 101개로 되어있다.

그래서 쿼리 플래너가 카운트 쿼리의 쿼리 모양으로 첫번째 배치를 가져오는 성능을 테스트 했을 때 엄한 인덱스가 제일 좋은 성능을 가질 수 있음

만약 동점이 나올 경우 in-memory sort를 하지 않아도 되는 쿼리플랜을 선택함.

몽고 DB는 32MB가 넘는애들은 인메모리로 쏘팅안함

해결 방법은 두가지다.
hint를 주거나, 엄한 인덱스를 지우기

startDate, endDate, serviceCode
serviceCode, weight 인덱스를 안타게 쿼리 순서를 바꾸면?
{startDate, endDate, serviceCode}
