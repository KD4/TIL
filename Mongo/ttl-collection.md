TTL Collection
=================================

몽고 DB에서는 TTL Collection이란 기능이 존재한다.
이 기능은 mongo 데몬이 MongoDB에 저장된 데이터를 일정 시간이 지난 후에 혹은 특정 시간에 자동으로 제거하는 기능을 말한다.

event data나 로그성 데이터와 같이 계속 저장될 필요가 없는 자료가 저장된 collection에서 유용하게 사용될 수 있다. 

mongod가 백그라운드 스레드로 자동 삭제 task를 동작시키며 이 task에서 TTL index로 등록된 data-type 필드를 참조하여 유효 시간이 지난 데이터들을 삭제한다.

```note
TTL index는 단일 필드 인덱스이다. 복합 인덱스는 등록이 불가능하다. 
```

## expireAfterSeconds: 일정 시간 후에 데이터 삭제하기

일정 시간이 지난 후에 데이터를 삭제하는 기능은 index로 등록된 필드를 참조하여 동작한다. 

TTL index의 필드는 BSON date 타입의 필드와 expireAfterSeconds 필드를 통해서 설정한다. 

```
db.log_events.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } )
```

어떤 document의 date type 필드의 값과 expireAfterSeconds로 설정된 시간(초)를 더한 값이 현재 시간보다 작은 값을 가지면, 해당 document는 제거된다. 

## 특정 시각에 데이터 삭제하기

특정 시각에 데이터라는 삭제하는 기능은 TTL Index를 생성하면서 expireAfterSeconds 필드는 Zero로 설정해야한다. 
그리고 expire 대상 date-type 필드를 넣어줘야하는데, 자동 삭제 task는 expireAfterSeconds가 0일 때, 이 date-type 필드를 참조해서 저장된 필드 값이 현재 시간보다 이전 시간이면 삭제한다.

```
db.log_events.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
```

