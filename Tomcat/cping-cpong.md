Cping Cpong
-------------------------
톰캣 Connector가 톰캣과 연결된 Backend Application 스레드 상태를 확인하는 매커니즘이다.

CPing/CPong의 개념은 테스트 패킷으로 커넥션에 문제가 없는지 확인하고 정상적인 경우에만 Backend에 연결을 맺게 하는 것이다. 즉, 새로운 백엔드 커넥션을 연결한 후 (Connection Mode: C mode) 그리고 요청받은 패킷을 백엔드에서 받기 전(Prepost mode: P ode)에 test 패킷을 통해 connection 연결에 문제가 없는지를 확인하는 것이다. 당연히 연결 상태를 확인해 문제가 없을 경우에만 backend에 정상적으로 연결한다.

ping-mode
|mode|description|
|:---:|:---:|
|C: connection mode| C 모드일 때는 백엔드와 연결된 이후에 커넥팅을 테스트한다. 타임아웃 조건은 connect_timeout 옵션을 통해서 설정할 수 있다. C 모드가 unset 됐을 때는 ping_timeout이 사용된다.|
|P: prepost mode| P 모드일 때는 각 요청이 백엔드로 가기 전에 커넥션 상태를 확인한다. 타임아웃은 prepost_timeout 옵션을 통해서 설정할 수 있다. unset 됐을 때는 ping_timeout이 사용된다.|
|I: interval mode | I 모드일 때는 정기적으로 커넥션을 검사한다. 이 값은 connection_ping_interval로 설정할 수 있다. |
A: all modes | A 모드는 모든 조건에서 다 검사한다.|

CPing 테스트를 사용하는 것을 권장.

각각 모드에서 timeout을 설정하지 않는다면 ping_timeout의 값이 적용됨.

- ping_timeout: Cpong default 대기 시간. 기본값은 10000(mlisec)
- connection timeout : 커넥션이 연결되는 동안 CPong 대기 시간. JK는 맺어진 커넥션을 영구적으로 사용하기 때문에, 새로운 백엔드커넥션을 연결하는 경우는 드믈다. C mode를 대신 사용하는 것을 권고한다.
- prepost_timeout: 백엔드로 요청이 전달되기 전에 사용되는 값. 



