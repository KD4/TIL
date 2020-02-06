Spring boot test
==============================

spring-boot-starter-test 디펜던시를 추가하면 스프링 테스트에 필요한 의존성들이 추가된다. 

(junit, json-path, mockito 등 의존성이 자동으로 추가됨.)

```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

* test 스콥으로 추가.

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@AutoConfigureMockMvc
class HelloControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void hello() {
    }
}
```


@SpringBootTest, @RunWith(SpringRunner.class)를 같이 써서 테스트 코드 작성이 가능하다. 

MockMvc 빈 설정을 따로 하지 않아도 Spring Boot에서 알아서 찾아서 해준다. 

webEnvironment 설정은 어떤 스프링 부트 웹 설정을 할 것 인지 넣어주는 용도의 어노테이션인데 각 value는 아래와 같다.

- MOCK: mock servlet environment. 내장 톰캣 구동 안 함.
- RANDON_PORT, DEFINED_PORT: 내장 톰캣 사용 함.
- NONE: 서블릿 환경 제공 안 함.

MOCK을 하게되면 서블릿 컨테이너를 Mocking해서 만들어준다. 

MockMvc는 이렇게 만들어진 Mock 객체인데, API가 자동완성이 안되는 구조라 약간 어렵다.

물론 MVC를 안쓰고 테스트도 가능하다.

RestTemplate이나 Webflux의 WebTestClient를 사용한다. 

WebTestClient는 Java 5에 추가되었는데, Async로 동작하고 API도 간편한 편이다. 스프링부트 플럭스 의존성이 필요하지만 사용성때문에 충분히 감안할 수 있다.

사실 SpringBootTest 어노테이션을 이용한 테스트는 어마어마한 통합 테스트이다. 그래서 슬라이스 테스트를 한다.



## 슬라이스 테스트
레이어 별로 잘라서 테스트하고 싶을 때 사용하는 테스트 기법이다. 

- @JsonTest : Json Serialize나 Deserialize 등을 테스트 
(https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-testing-spring-boot-applications-testing-autoconfigured-json-tests)

- @WebMvcTest : 웹과 관련된 빈만 등록됨. Controller, ControllerAdvice, JsonCompoent, Converteremdemd
(https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-testing-spring-boot-applications-testing-autoconfigured-mvc-tests)

Controller API Mapping을 테스트할 떄 주로 사용한다.

- @WebFluxTest

- @DataJpaTest

