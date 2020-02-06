스프링 웹 MVC 
============================

https://docs.spring.io/spring/docs/5.0.7.RELEASE/spring-framework-reference/web.html#spring-web

Web MVC를 테스트하기 위한 코드부터 작성해보자.

```java
@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {

    //WebMvcTest 설정을 사용한 빈
    @Autowired
    MockMvc mockMvc;

    @Test
    public void hello() {
        mockMvc.perform(get("/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("hello"));
    }

}
```

```java
@RestController
public class UserController {

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}
```

아무런 설정을 안해도 위 코드는 동작한다. 
이 내용은 Spring Boot의 자동설정을 통해서 제공되고 있다. `WebMvcAutoConfiguration`에 해당 설정들이 들어있다. 

## WebMvcAutoConfiguration의 설정들
- POST만 form data만 보낼 수 있는게 Servlet 스펙인데, PUT, PATCH도 가능하도록 하는 필터 
- PUT, DELETE 매핑도 할 수 있도록 _method 파라미터를 설정하는 필터
- 등등..

## 스프링 MVC 확장
MVC의 기능을 사용하면서 거기에 커스텀한 설정을 추가하고 싶다? 
이런 경우 아래 설정 파일을 만들어서 MVC 기능을 확장할 수 있다.

```java

@Configuration
// @EnableWEbMvc 이 어노테이션을 붙이면 WebMvcConfigurer 인터페이스를 전부 설정해야한다. 
public class WebConfig implements WebMvcConfigurer {

}
```