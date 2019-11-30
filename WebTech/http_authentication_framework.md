HTTP 인증 프레임워크
===================================


서버가 관리하는 자원에 대한 접근 권한을 관리하기 위해서 사용되는 HTTP 프레임워크이다.

HTTP는 헤더를 통해서 해당 프레임워크를 정의하였다.

이 프레임워크에 정의된 기본 인증 단계는 아래와 같이 이뤄져있다.

- 1단계. Client에서 필요한 요청을 보낸다.
- 2단계. 서버에서 해당 요청은 권한이 필요함을 알리고 필요한 인증 방법을 헤더에 실어 보낸다. (WWW-Authenticate: <Type> realm=<realm>
- 3단계. 필요한 인증을 진행하고 클라이언트는 서버로 요청을 보낼 때 인증 내용을 같이 보낸다. (Authorization <Type> <realm>)
- 4단계. 서버는 인증을 확인하고 자원 요청을 허가한다.

여기서 보이는 <Type>은 인증 스킴이다. 

인증 스킴은 크게 [Basic](./basic_authentication.md), Bearer, Digest, HOBA 등이 있다. 