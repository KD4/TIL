스프링 부트 통합 테스트를 위한 어노테이션들
=====================================

## @SpringJUnit4ClassRunner

JUnit 테스트에 사용할 스프링 애플리케이션 컨텐스트를 로드하고 테스트 클래스에 자동으로 주입하는 기능을 활성화하는 어노테이션

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=AddressBookConfiguration.class)
public class AddressServiceTests {
    // SpringJUnit4ClassRunner 로 인해서 빈 주입 가능
    @Autowired
    private AddressService addressService;
}
```

## @ContextConfiguration or @SpringAppllicationConfiguration

스프링의 애플리케이션 컨텐스트를 로딩한다. 

하지만 ContextConfiguration는 스프링 부트 기능을 전부 사용하지 못한다. 로깅과 외부 프로퍼티까지 로딩해서 부트를 활성화하려면 SpringApplicationConfiguration을 사용해야한다.

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes=AddressBookConfiguration.class)
public class AddressServiceTests {
    // SpringJUnit4ClassRunner 로 인해서 빈 주입 가능
    @Autowired
    private AddressService addressService;
}
```

## @WebAppConfiguration
웹 컨텐스트를 활성화한다. 

웹 애플리케이션 전체를 테스트하기 위해서는 리퀘스트 매핑 정보를 가진 컨텐스트가 필요하다.

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes=ReadingListApplication.class)
@WebAppConfiguration // 웹 컨텍스트 테스트 활성화
public class MockMvcWebTests {
    
    @Autowired
    private WebApplicationContext webContext;

    private MockMvc mockMvc;

    @Before
    public void setupMockMvc() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(webContext) // context가 필요하다
                .build();
    }
}
```

## @WebIntegrationTest

테스트 클래스에 WebIntegrationTest 어노테이션을 붙이면 스프링 부트가 테스트용 애플리케이션 컨텐스트를 생성하면서 내장 서블릿 컨테이너도 시작한다. 
애플리케이션을 내장 컨테이너와 함께 실행하고 나면 이를 대상으로 실제 HTTP 요청을 보낼 수 있고 결과를 검증할 수 있다.

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes=ReadingListApplication.class)
@WebIntegrationTest // 서버에서 테스트 시ㅣㄹ행
public class SimpleWebTests {
    
    @Test(expected=HttpClientErrorException.class)
    public void pageNotFound() {
        
        try {
            RestTemplate rest = new RestTemplate();
            rest.getForObject("http://localhost:8080/nopages", String.class);
            fail("Should result in HTTP 404");
        } catch (HttpClientErrorException e) {
            assertEquals(HttpStatus.NOT_FOUND, e.getStatusCode());
            throw e;
        }
    }
}
```

