WebSocket
=======================================================================

HTTP 규격은 클라이언트에서 서버로 단방향 통신만 가능한 한계가 있다.
이 점 때문에 양방향 통신을 하려면 Polling, streaming과 같은 꼼수를 사용해야했다.

웹소켓은 하나의 TCP 접속에 전이중통신 채널을 제공하는 컴퓨터 통신 프로포콜이다. HTML5에서 스펙으로 추가되었다.

웹소켓은 다른 HTTP 요청과 마찬가지로 80번 포트와 443포트를 통해 웹 서버에 연결한다. 그러므로 웹서버도 웹소켓 프로토콜을 지원해야한다.

```HTTP
GET /... HTTP/1.1
Upgrade: WebSocket
Connection: Upgrade
```

위는 웹소켓 통신 시 브라우저가 서버로 보내는 요청의 헤더이다. 브라우저는 여기에 랜덤한 키를 만들어서 서버로 보내고 이 요청을 받은 서버는 키를 기반으로 토큰을 만들어서 웹소켓 핸드쉐이킹을 한다.

위에서 알아본 바와 같이, 일단 일반적인 HTTP 통신은 아니기 때문에 웹 클라이언트 지원 여부가 기술 도입의 걸림돌이다. 

미지원 브라우저가 분명히 존재하고 웹 이외에 다른 클라이언트 설정도 고민이기 때문에 아래와 같은 기술들이 나왔다.

- [SocketJS와 Socket.io](./socketjs.md)
- [STOMP](./stomp.md)
