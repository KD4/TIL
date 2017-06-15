# Read Preference
```
Read Preference는 replica set으로 구성된 몽고 시스템에서 읽기 연산을 할 때 어느 MongoDB 클라이언트로 라우팅할 것인지를 설정하기 위한 옵션이다.
```

기본적으로 어플리케이션은 리플리카 셋으로 쿼리를 보낼 때 read query를 포함한 모든 쿼리를 primary로 보낸다.

replica set의 secondary 멤버로 일부 read 쿼리, 혹은 모든 읽기 쿼리를 분산시켜 읽기 처리량을 높이거나 대기 시간을 줄일 수 있다.

* 읽기 설정을 secondary로 한다면, primary의 데이터가 secondary로 복제되기 까지 약간의 딜레이가 (1~2) 있으므로 최신 데이터라는 것을 보장할 수 없다.

- primary : 기본 모드, 모든 작업을 primary 멤버에서 진행
- primaryPreferrd : primary가 사용불가 상태일 때, 읽기 작업을 secondary에서 진행
- secondary : 모든 읽기 작업을 secondary 멤버에서 진행
- secondaryPreferred : 평소에는 읽기 작업을 secondary에서 진행하지만, secondary가 사용 불가 상태일 때, primary에서 진행
- nearest : primary, secondary 상관없이 네트워크 상 가장 가까운 멤버로 읽기 작업 수행

Java mongo Driver를 사용할 때는 URI 마지막 option으로 할당할 수 있다.

spring.data.mongodb.uri=mongodb://example1.com:27017,example3.com:27017,example2.com:27017?readPreference=secondaryPreferred
