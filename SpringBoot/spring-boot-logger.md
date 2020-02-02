스프링부트 기본 로거 설정
==============================


## 로깅 퍼사드 VS 로거
Commons Logging, SLF4j 그리고 JUL, Log4J2, Logback

Commons Logging은 예전부터 메모리 릭 문제 등 이슈가 있었다. 그래서 SLF4j라는 새로운 로거 라이브러리가 나왔다.

그런데 Spring Boot 팀은 왜 Commons Logging을 사용했을까? 그 이유는 처음 개발팀이 core 모듈을 개발할 때는 SLF4j가 없었기 때문이라고,,,

그래서 예전에는 exclusion을 통해서 commons logging 의존성을 제외하고 SLF4j를 넣어줄 수 있었다.

이 방법은 런타임이 아니라 컴파일 타임에 설정된다. 그리고 추가 의존성 설정을 해야하는 번거로움이 있었다. 

스프링 5부터는 Spring-JCL을 통해서 컴파일 시점에 로거 변경이 가능하다.

### 스프링 5에 로거 관련 변경 사항
https://docs.spring.io/spring/docs/5.0.0.RC3/spring-framework-reference/overview.html#overview-logging
- Spring-JCL
- Commons Logging -> SLF4j or Log4j2
- pom.xml에 exclusion 안해도 됨.

결국 스프링부트를 사용한다면 Commons Logging -> SLF4j -> Logback을 사용한다. Logback은 SLF4j의 구현체이다.



## 스프링 부트 로깅
### 기본 포맷
기본 로그 포맷은 [날짜] [시간] [로그레벨] [pid] [스레드] [패키지명] [메시지] 이다.

--debug 옵션을 통해서 일부 핵심 라이브러리 로깅 레벨을 디버깅 모드로 설정할 수 있고, --trace 옵션을 통해 모든 패키지의 로그 레벨을 디버깅 모드로 설정할 수 있다.

로그를 컬러로 출력하고 싶을 때는 `spring.output.ansi.enabled` 옵션을 always로 주면된다.

기본 로그 출력은 console 이지만 logging.file 또는 logging.path을 줘서 파일 출력으로 변경하고 출력된 파일의 경로도 입력할 수 있다.

특정 패키지의 로그 레벨 조정은 `logging.level.패지키 = 로그 레벨` 설정을 통해서 할 수 있다.

이런 설정 파일로 하나하나 하지 않고 커스텀 로그 설정 파일을 사용할 수 있다. 

https://docs.spring.io/spring-boot/docs/current/reference/html/howto-logging.html 커스텀 로그 설정 파일 사용하기

- Logback: logback-spring.xml
- Log4J2: log4j2-spring.xml
- JUL (비추): logging.properties

### Logback extension
- 프로파일 <springProfile name=”프로파일”>
- Environment 프로퍼티 <springProperty>
- 로거를 Log4j2로 변경하기
https://docs.spring.io/spring-boot/docs/current/reference/html/howto-logging.html#howto-configure-log4j-for-logging

