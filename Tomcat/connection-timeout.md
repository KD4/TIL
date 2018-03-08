Attribute : connection timeout
-------------------------------------------

tomcat option 중 connection timeout이란게 있다.

연결이 성립된 이후, 커넥터가 AJP13 연결을 담당하는 스레드로부터 오는 Ping 요청을 기다리는 시간이다.

톰캣으로 요청이 들어오고 실행 되기까지 timeout이다.
mod_jk와 결합하면서 유휴 AJP13 스레드들을 정리하기 위해서 조정이 필요한 옵션이다.
