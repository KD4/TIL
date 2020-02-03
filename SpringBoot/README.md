# Spring Boot

Spring 만으로 아주 간단한 Hello World 웹 어플리케이션을 개발한다고 하자, 무엇이 필요할까 ?

최소한 다음 항목은 필요하다.

- 필요한 의존성을 비롯한 메이븐이나 그레들 빌드 파일이 완비된 프로젝트 구조. 적어도 스프링MVC와 서블릿 API를 의존성으로 지정해야한다.
- 스프링의 DispatcherServlet을 선언한 web.xml 파일 또는 WebApplicationInitializer 구현
- 스프링 MVC를 사용할 수 있는 스프링 구성
- HTTP 요청에 "Hello World"라고 응답할 컨트롤러 클래스
- 애플리케이션을 배포할 웹 애플리케이션 서버 ( 톰캣 등 )

이 목록에서 가장 눈에 띄는 것은 Hello World 기능을 개발하는 데 특화된 컨트롤러 하나 뿐이다.

나머지 항목은 스프링으로 웹 애플리케이션을 개발할 때 필요한 일반적인 보일러플레이트다.

스프링은 설정해야할 구성이 많았다.

모든 구성 작업은 개발 저항으로 나타난다. 애플리케이션 로직 작성 대신 구성 작업에 쓰는 시간은 모두 시간낭비다.

```
반면 스프링 부트로 개발을 한다면 이 모든 것들을 다 구성 할 필요는 없다.
스프링 부트가 제시하는 새로운 패러다임 덕분에 변화에 저항을 최소화하면서 스프링 애플리케이션을 개발할 수 있게되었다.
스프링 부트를 이용하면 스프링 애플리케이션을 더 민첩하게 개발할 수 있고, 애플리케이션의 기능에 필요한 스프링 구성 작업을 최소하하거나 없앨 수 있다.
사실 스프링 부트가 하는 가장 중요한 일은 개발자가 해야 할 일을 스프링이 대신 하는 것이다.
```

- [Spring 부트 핵심](./key-point.md)
- [프로퍼티 우선순위](./properties-priority.md)
- [부트 테스트를 위한 어노테이션](./annotations-for-test.md)
- [액츄에이터](./actuator.md)
- [인프런-스프링 부트 프로젝트 구조](./structuring-your-code.md)
- [인프런-스프링 부트 의존성 관리](./dependency-management.md)
- [인프런-스프링 부트 자동 설정](./auto-configuration.md)
- [인프런-스프링 부트 내장 웹서버](./embedded-web-server.md)
- [인프런-독립적으로 실행 가능한 JAR](./spring-boot-maven-plugin.md)
- [인프런-스프링부트의 스프링 어플리케이션](./spring-application-of-boot.md)
- [인프런-스프링부트 외부설정](./external-config.md)
- [인프런-스프링부트 타입세이프 프로퍼티](./type-safe-properties.md)
- [인프런-스프링부트 프로파일](./profile.md)
- [인프런-스프링부트 로거 설정](./spring-boot-logger.md)
- [인프런-스프링부트 테스트](./spring-boot-test.md)
- [인프런-스프링부트 테스트 유틸](./spring-boot-test-utils.md)
