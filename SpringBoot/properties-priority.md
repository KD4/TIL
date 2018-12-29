프로퍼티 우선순위
==================

스프링 부트가 자동으로 구성하는 빈들은 세부적인 부분을 조정할 수 있도록 300여개가 넘는 프로퍼티를 제공한다.

프로퍼티를 설정하는 방법은 다음과 같다

1. 명령줄 인자
2. java:comp/env에서 얻을 수 있는 JNDI 속성
3. JVM 시스템 프로퍼티
4. 운영체제의 환경 변수
5. random.*로 시작하는 프로퍼티 때문에 무작위로 생성된 값
6. 애플리케이션 외부에 있는 application.properties나 application.yml 파일
7. 애플리케이션 내부에 패키징된 application.properties나 application.yml 파일
8. @PropertySource로 지정된 프로퍼티 소스
9. 기본 프로퍼티

이 목록은 우선순위 순으로 작성했다. 즉 목록 위쪽에 있는 소스에 설정한 프로퍼티는 아래쪽에 있는 소스에 설정한 동일한 프로퍼티를 오버라이드한다.

application.properties와 application.yml 파일은 다음 네 곳 어디에나 배치할 수 있다.

1. 외부적으로 애플리케이션이 작동하는 디렉터리의 /config 하위 디렉터리
2. 외부적으로 애플리케이션이 작동하는 티렉토리
3. 내부적으로 config 패키지ㅣ
4. 내부적으로 클래스 패스의 루트

이 목록도 우선순위가 있다. 1번이 4번을 오버라이드한다.

또 우선순위가 동일한 레벨 안에 application.properties와 application.yml 파일이 나란히 있으면 application.yml에 있는 프로퍼티가 application.properties에 있는 프로퍼티를 오버라이드 한다.


