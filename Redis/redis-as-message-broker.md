
# 레디스를 메시지 브로커로 사용하기

- MSA에서 서비스 간 느슨한 결합은 핵심
- 서비스의 이벤트 혹은 커맨드를 관리하는 채널이 필요
- 이를 메시지 브로커라고 함
- 메시지 브로커는 메시징 큐, 이벤트 스트림으로 나뉨

## 메시징 큐와 이벤트 스트림

메시징 큐와 이벤트 스트림의 차이

#### 방향성
- 메시징 큐의 생산자는 소비자의 큐로 데이터를 직접 푸시 (1:1 매칭)
- 이벤트 스트림은 특정 저장소에 메시지를 푸시하고 이 메시지를 여러 소비자가 가져갈 수 있음

#### 영속성
- 메시징 큐에서는 소비자가 데이터를 읽어갈 때 큐에서 데이터를 삭제
- 이벤트 스트림에서는 읽어간 데이터는 바로 삭제되지 않고 설정에 따라 특정 기간 동안 저장될 수 있음

## 레디스를 메시지 브로커로 사용하기
Redis 에서 제공하는 기능 중 메시지 브로커로 사용할 수 있는 기능들

### Pub/Sub

#### 특징
- 발행자가 메시지를 발행하면 해당 채널을 구독하는 모든 소비자에게 메시지가 수신됨
- 일회성 특징을 지님
- 간단한 알림, Cache Invalidation 등에 쓰임

#### 단점
- 메타데이터를 확인할 수 없음: 어떤 구독자가 메시지를 읽어가는지, 잘 전달 됐는지 관리 불가
- 데이터를 저장하지 않음: 한번 전파된 데이터를 기록하지 않아서 전파 기록을 확인할 수 없음

#### 메시지 publish 하기

```
> PUBLISH hello wrold
(interger) 1
```

- hello 채널에 world 메시지 전파

#### 메시지 subscribe 하기

```
> SUBSCRIBE event1 event2
Reading messages...(press Ctrl-C to quit)
1) "subscribe"
2) "event1"
3) (integer) 1
4) "subscribe"
5) "event2"
6) (integer) 1
```

- 클라이언트가 위 커맨드를 수행하면 event1과 event2 채널을 동시에 구독한다.
- 리스닝 커넥션에서는 다른 커맨드 수행 불가

```
> PSUBSCRIBE mail-*
Reading messages... (press Ctrl-C to quit)
1) "psubscribe"
2) "mail-*"
3) (integer) 1
```

- PSUBSCRIBE mail-* 커맨드는 mail-track, mail-album 등 prefix가 mail인 친구들 모두 구독하

#### 클러스터 구조에서의 pub/sub
- 레디스 클러스터에서 데이터를 저장하고 관리하는 방법? 버킷!
- 여러 노드들이 자기가 관리할 슬롯만 관리한다.
- 그렇다면 pubsub 커맨드는 어떻게 동작할까?
- 하나에 노드에 메시지가 publishing 되면 모든 노드에 이 데이터를 전파한다.
- 그런데 이런 복사, 전파 방식은 데이터 분산 저장과 관리라는 클러스터 목적에 부합하지 않음
- 이런 비효율을 해결하기 위해서 redis 7.0 이후는 sharded pub/sub 도입
- sharded pubsub은 채널도 슬롯에 매핑되어 생산자와 소비자가 같은 노드에 커넥션을 맺음


### List
- list Push, Pop 기능을 활용해서 메시징 큐로 사용 가능
- 블로킹 기능을 사용하면 폴링 필요 없이 메시지 인입을 대기할 수 있음

#### 트위터의 타임라인 구현
- A 유저가 트윗 작성
- A 유저의 팔로워 목록을 가져와서 타임라인 리스트에 글을 푸시함

```
> RPUSHX Timelinecache:userB blabla
(integer) 26

> RPUSHX Timelinecache:userC blabla
(integer) 5

> RPUSHX Timelinecache:userD blabla
(integer) 0
```

- RPUSHX 라는 커맨드는 EX(없으면 아이템 추가 X) 기능이 달려있음
- 그래서 D 유저는 타임라인 캐시가 만들어지지않음

#### 블로킹 기능
- 폴링이 필요한 기능에서 유용하게 사용 가능
- BRPOP, BLPOP은 각각 RPOP, LPOP에 블로킹을 추가한 커맨드

```
> BRPOP queue:a 5
1) "queue:a"
2) "data"
```

- 위 커맨드 응답 값을 보면 데이터가 2개 반환됨, 첫 번째는 리스트의 이름, 그리고 두번째는 데이터
- 이는 BRPOP 커맨드가 여러 리스트를 동시에 구독할 수 있기 때문

```
> BRPOP queue:a queue:b queue:c timeout 1000
1) "queue:b"
2) "DATA"
```

- a,b,c 리스트를 1000초 동안 구독
- b에서 메시지를 받음

#### list를 이용한 원형 큐

- 아이템을 꺼냈다가 다시 집어 넣어야 할 요구사항(원형큐)이 있다면 RPOPLPUSH 커맨드를 쓸 수 있다.
- 사용 용례 gpt에게 물어보자

```
> LPUSH clist A
(integer) 1
> LPUSH clist B
(integer) 1
> LPUSH clist C
(integer) 1

> LRANGE clist 0 -1
1) "C"
2) "B"
3) "A"

> RPOPLPUSH clist clist
"A"

> LRANGE clist 0 -1
1) "A"
2) "C"
3) "B"
```

## Stream
- 기본적으로 데이터를 계속해서 추가할 수 있는 자료구조
- 카프카에서 영감을 받은 자료구조로 아파치 카프카처럼 사용 가능

- Redis Stream은 카프카의 토픽과 대응됨
- Stream 에서 각 메시지는 시간과 관련된 유니크한 ID를 가짐

`<millisecondsTime>-<sequenceNumber>`

- 레디스 stream에 저장된 모든 데이터는 유니크한 ID를 가진다. 이 값을 통해서 데이터 검색도 가능

### 스트림의 생성과 데이터 입력
- 카프카는 토픽을 먼저 만들어야 하는데, 레디스 스트림은 XADD 커맨드로 생성과 입력을 동시에 할 수 있음

```
> XADD Email * subject "first" body "hello?"
"165911481311-0"
```

- Email 이라는 스트림 생성
- 두번째 인자로 주는 값은 데이터의 ID, 커스텀하게 넣어줄 수 있고 *(asterisk)를 쓰면 레디스 타임스탬프 ID를 쓴다는 의미
- 그 다음 인자들은 키-값 형태의 데이터, subject 키로 "first" 값, body 키에 "hello?" 값을 보내겠다는 의미

### 데이터의 조회

```
// XREAD [Count count] [BLOCK milliseconds] STREAMS key [key...] ID [ID...]
> XREAD BLOCK 0 STREAMS Email 0
```

- Email 스트림에 저장된 데이터를 처음부터 읽어오고 새로운 메시지가 들어올 때까지 리스닝
- BLOCK 0: 계속 리스닝 하라는 의미, 1000을 입력하면 1000ms, 1초 동안 대기
- STREAMS Email: Email 스트림 읽으라는 의미
- 0: ID 중 0 보다 큰 값, 즉 처음부터 읽으라는 의미

```
> XREAD BLOCK 0 STREAMS Email $
```
- 위 커맨드에는 마지막에 $ 표시가 들어감, 이건 컨슈밍 시작한 순간부터 데이터를 읽어옴
- 여기에 offset(ID) 값을 지정하면 그 값 이후로 읽어올 수 있음

#### 특정 데이터를 뽑아오기
```
> XRANGE key start end [COUNT count]
> XREVRANGE key end start [COUNT count]
```

- XRANGE 커맨드를 이용하면 ID를 이용해서 특정 범위의 데이터를 가져올 수 있음

### 소비자 그룹

- 같은 데이터를 여러 소비자에게 전달하는 것을 팬아웃(fan-out)이라고 함
- 카프카에서는 하나의 토픽을 여러 소비자 그룹이 팬아웃할 수 있음
- 스트림에서도 XREAD 커맨드를 통해서 팬아웃 가능
- 스트림에서 이벤트를 구독하는 성능을 높이기 위해서 스케일 아웃을 한다면? -> 단순히 XREAD 한다면 중복 메시지 구독이 발생
- 중복된 메시지 구독을 막기 위해서 레디스에서도 소비자 그룹을 제공함

```
> XGROUP CREATE Email EmailServiceGroup $
```

- EmailServiceGroup 라는 그룹을 만들어줌
- Email 스트림의 최신 메시지를 구독하는 그룹

```
> XREADGROUP GROUP EmailServiceGroup eamilService1 COUNT 1 STREAMS email >
```
- eamilService1 이라는 소비자가 Eamil 스트림의 메시지 1개를 가져오겠다는 커멘드
- 소비자 그룹을 통해서 메시지를 가져오러면 소비자 키를 지정해야함
- `>` 의 의미는 소비 되지 않은 최신 메시지를 가져온다는 의미, 
- 만약 0또는 다른 ID를 입력할 경우, 입력한 값보다 큰 ID 중 대기에 속하던 메시지를 반환한다.


```
> XGROUP CREATE Email bigroup 0
> XGROUP CREATE Push bigroup 0

> XREADGROUP GROUP bigroup BI1 COUNT 2 STREAMS Email Push > >
```

- bigroup에 속하는 BI1 서비스가 Email, Push 토픽의 메시지를 동시에 구독하고 처리함


### ACK와 보류 리스트
- 기본적으로 레디스 스트림은 컨슈머가 데이터를 읽어가면 last_delivered_id 값을 바로 업데이트해서 다음 메시지를 구독하게 함
- 그런데 이 메시지가 잘 처리됐는지 여부를 확인할 필요가 있음, 일종의 DL
- 레디스 스트림에서는 컨슈머 서비스가 데이터를 읽어가면 이를 보류 리스트에 넣어둠
- 컨슈머 서비스가 ACK를 보내면 이 보류 리스트에서 제거함
- 서비스는 XREADGROUP를 이용해 데이터를 읽고, 처리가 완료된 후에 XACK를 주기적으로 전송하는 작업이 필요함
```
> XACK Email EmailServiceGroup 1659114481311-0
```

- XPENDING 커멘드를 이용해 주기적인 DL 처리

```
> XPENDING Email EmailServiceGroup
1) (integer) 9
2) "1659114481311-0"
3) "1659170735630-0"
4) 1) 1) "es1"
      2) "1"
   2) 1) "es2"
      2) "1"
   3) 1) "es3"
      2) "7"
```
- 첫 번째 값은 현재 소비자 그룹에서 ACK 받지 못해 보류 중인 메시지 개수
- 두 번째, 세 번째 값은 최소, 최대 ID
- 세 번째는 각 소비자별 보류 중인 리스트 몇 개인지 알려줌, 즉 lag 파악 가능

#### 메시지 재할당
- 컨슈머 서비스 장애 등이 발생하면 보류 리스트에 자연스럽게 메시지가 쌓이거나 오래된 메시지가 남아있을 수 있다.
- 보류 리스트에 오래 유지되는 메시지를 파악해서 재처리 하는 작업이 필요하다.

```
// XCLAIM <key> <group> <consumer> <min-idle-time> <ID-1> ... <ID-3>
> EmailService 1: XCLAIM Email EmailServiceGroup EmailService3 10000 1626569498055-0
```
- XPENDING 커멘드를 통해서 정체된 메시지를 확인하고 10000ms, 10초 동안 ACK 받지 못했으면 재할당해서 처리하는 수동 커멘드이다.
- 매번 XPENDING 을 통해 메시지 확인한 후 XCLAIM 명령어를 사용하는 대신 자동 재할당을 등록할 수도 있다.

```
> XAUTOCLAIM Email EmailServiceGroup es1 10000 0-0 count 1
```
- Email 토픽의 EmailServiceGroup 안에 10초 이상 대기한 메시지 1개를 es1으로 재할당하라는 커멘드

#### DL 처리
- CLAIM 커맨드나 XREAD 등을 통해서 메시지가 할당된 경우, counter 값이 1씩 증가한다. 
- 이 값은 할당될 떄마다 증가하는데 특정 임계를 넘은 경우는 할당 안되도록 처리하는게 현명하다.
- 이런 메시지를 Dead Letter라고 부른다. 

#### 스트림 모니터링
- XINFO 커맨드를 통해서 스트림의 여러 상태를 확인할 수 있다. 

```
> XINFO consumers email emailServiceGroup
```
- 특정 소비자 그룹에 속한 소비자의 정보를 알 수 있다.

```
> XINFO GROUPS email
```
- 특정 스트림에 속한 전체 소비자 그룹 리스트를 볼 수 있다.


```
> XINFO STREAM email
```

- 스트림 자체의 정보를 알 수 있다.
- 스트림 메타정보로, 인코딩 정보, 마지막 메시지의 ID 등을 표시한다.
