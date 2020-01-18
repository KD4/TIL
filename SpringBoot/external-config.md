외부 설정
================================
https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config 

## External Config 란?
Application에서 사용하는 여러 가지 Config를 Application 밖 또는 안에다가 정해줄 수 있는 기능

흔히 볼 수 있는 application.properties는 스프링 부트가 자동으로 로딩하는 설정 파일 규약이다.

```
properties
YAML
환경 변수
커맨드 라인 아규먼트
```

여기서 설정된 값들은 아래처럼 key, value를 통해서 참조해서 사용할 수 있다.

```java

@Value("${keesun.name}")
private String name

```

## 프로퍼티 우선 순위
1. 유저 홈 디렉토리에 있는 spring-boot-dev-tools.properties
2. 테스트에 있는 @TestPropertySource
3. @SpringBootTest 애노테이션의 properties 애트리뷰트
4. 커맨드 라인 아규먼트
5. SPRING_APPLICATION_JSON (환경 변수 또는 시스템 프로티) 에 들어있는 프로퍼티
6. ServletConfig 파라미터
7. ServletContext 파라미터
8. java:comp/env JNDI 애트리뷰트
9. System.getProperties() 자바 시스템 프로퍼티
10. OS 환경 변수
11. RandomValuePropertySource
12. JAR 밖에 있는 특정 프로파일용 application properties
13. JAR 안에 있는 특정 프로파일용 application properties
14. JAR 밖에 있는 application properties
15. JAR 안에 있는 application properties
16. @PropertySource
17. 기본 프로퍼티 (SpringApplication.setDefaultProperties)

## application.properties 우선 순위 (높은게 낮은걸 덮어 씁니다.)
12~15 순위에 있는 application.properties 파일도 위치에 따라 우선순위가 있다!
```
1. file:./config/
2. file:./
3. classpath:/config/
4. classpath:/
```

## 추가 기능들

### 랜덤값 설정하기
-> ${random.*}
### 플레이스 홀더
-> name = keesun
-> fullName = ${name} baik