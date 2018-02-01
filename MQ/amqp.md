AMQP
===================

Advanced Message Queuing Protocol

메세징 큐의 오픈소스에 기반한 표준 프로토콜.

AMQP 자체는 프로토콜을 의미하기 때문에 이 프로토콜에 따른 실제 MQ 제품들은 여러가지가 존재한다. 대표적으로 Erlang, 자바로 제작된 RabbitMQ이 있다.

## AMQP의 대표적인 제약
- 모든 Broker들은 똑같은 방식으로 동작할 것
- 모든 Client들은 똑같은 방식으로 동작할 것
- 네트워크 상에 전송되는 명령어들을 표준화할 것
- 프로그래밍 언어의 중립적일 것

## AMQP 라우팅 모델
AMQP의 라우팅 모델은 아래와 같은 3개의 중요한 component들로 구성된다.
- Exchange
- Queue
- Binding

AMQP는 이 3가지의 구성요소들이 서로 간에 어떻게 통신하는지를 정의한 프로토콜이라고 볼 수 있다.

대략적으로는 Publisher라고하는 데이터 제공 Client가 MQ 서버에 특정 Vhost 영역에 있는 Exchange group으로 routing Key와 함께 메시지를 날리면 

이 Exhange에 바인딩된 큐들 중에서 Routing key에 맞는 큐로 메시지가 전달된다.

이 전달된 메시지는 Consumer라고 하는 client에게 차례대로 전달된다. 

- Exchange
publisher로부터 수신한 메시지를 적절한 큐 또는 다른 exchange로 분배하는 라우터 기능을 한다. 각 Queue나 Exchange는 binding을 사용해서 exchange에 연결되어 있고 exchange는 수신한 메시지를 이 binding에 따라 적당한 queue나 exchange로 보낸다.

Binding과 메시지를 매칭시키기 위한 라우팅 알고리즘을 정의한 것을 exchange type이라고 하고, exhange type은 라우팅 알고리즘의 클래스이다. 브로커는 여러 개의 exchange type 인스턴스를 가질 수 있다. 
exchange type은 메시지를 어떤 방법으로 라우팅 시킬 지를 결정하는 것이고 binding을 이러한 방법을 이용해 실제로 어떤 메시지를 어떤 큐에 보낼지를 결정하는 라우팅
exhange를 보통 어플리케이션에서는 destination이라고도 부른다.

- Queue
일반적인 큐로 메모리나 디스크에 메시지를 저장하고 consumer에게 전달하는 역할을 한다. 큐는 특정 메시지 타입을 가지고 exchange에 바인딩된다.

- Binding
exchange와 queue와 관계를 정의한 일종의 라우팅 테이블

- Routing key
exchange type. 이 타입에 따라서 exchange는 받을 메시지를 큐로 보낸다.

### Standard Exchagne Type
Exchange Type은 메시지를 어떤 원칙 내지는 방법으로 라우팅할지 결정하는 일종의 알고리즘이다. AMQP에서는 표준 Exchange Type으로 라우팅 키에 기반한 아래 3개의 라우팅 알고리즘과 key-value 헤더에 기반한 1개 유형의 Exchange Type들을 반드시 정의하도록 되어 있다

- Direct Exchange : 메시지의 라우팅 키를 큐에 1:N으로 매칭시키는 방법이다. 가장 일반적인 경우는 큐의 이름을 바인딩하고자하는 라우팅 키와 동일하게 작성하는 방법이 있다. 

- Topic Exchange : 와일카드를 이용해서 메시지를 큐에 매칭시키는 방법이다. 라우팅 키는 '.'으로 구분된 0개 이상의 단어의 집합으로 간주되고, 와일다카드 문자들을 이용해서 특정 큐에 바인딩한다.

- Fanout Exchange :  모든 메시지를 모든 큐로 라우팅하는 유형이다.

- Headers Exchange : key-value로 정의된 헤더에 의해 라우팅을 결정한다. 큐를 바인딩할 때 x-match라는 특별한 argument로 헤더를 어떤식으로 해석하고 바인딩할지를 결정하는데, x-match가 all이면 바인딩 조건을 모두 충족시켜야한다는 뜻이고, any이면 하나만 충족시키면 된다는 것이다. 







