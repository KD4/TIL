Rabbit MQ
================================
- RabbitMQ
: `RabbitMQ`는 `얼랭` 제작되었다.

MQ
(`Message Queuing`)
: 프로그래밍에서 MQ는 프로세스 또는 프로그램 인스턴스가 데이터를 서로 교환할 때 사용하는 방법이다.

### RabbitMQ 서버 컨셉
- Producer : 메세지를 보내는 어플리케이션
- Consumer : 메세지를 받는 어플리케이션
- Queue : 메세지가 담기는 버퍼
- Message : producer가 rabbitMQ를 통해서 consumer에게 보내는 정보
- Connection : 사용자 어플리케이션과 RabbitMQ broker간에 TCP connection
- Channel : 하나의 커넥션 안에 가상의 connection. 사용자가 메세지를 publishing하고 subscribing할때 채널을 통해서 이루어짐
- Binding : queue와 exchange 간에 연결
- Routing key : 메세지를 위한 큐 주소
- Vhost : Virtual host는 가은 RabbitMQ 인스턴스를 사용하는 어플리케이션들에게 격리된 접근 통로를 제공합니다. 목적이 다른 유저들은 다른 통로를 활용할 수 있다.

### Exchange
Producer가 보내는 일반 메세지(POJO)를 AMQP 규약에 맞춰주는 독립체
메세지를 받아서 변환하고 Queue에 큐잉까지 담당함.
메세지를 exchange에 보낼때 여러가지 옵션을 지정해서 넘겨줄 수 있음.

### Fanout-exchagne 방식
하나의 메세지 복사본을 exchagne에 바인딩된 모든 큐에 전달
메세지를 broadcast할 때 이상적

### Direct - Exchange 방식
direct exchange는 routing key 기반으로 메세지를 큐로 전달
해당 key로 지정된 큐로 메세지가 direct 전송

### Topic Exchange 방식
Direct exchange는 routing key 기반으로 메세지를 큐로 전달


Spring-messaging, Spring-websocket modules






