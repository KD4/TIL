# CORS
```
CORS를 한 마디로 요약하면, "요청을 받은 웹서버가 허락하면 크로스도메인이라도 Ajax로 통신할 수 있다"라는 정책이다. 기술적으로는 크로스도메인에 위치한 웹서버가 응답에 적절한 Access-Control-Allow-류의 헤더를 보냄으로써 크로스도메인 Ajax를 허용 수 있다.

cross-domain request를 허용하게 하기 위한 표준적인 방법으로 다른 same-origin policy를 회피하기 위한 방법들 보다 다소 안전하다라고 소개하고 있음.
```

## Spring CORS

보안상의 이슈로, 브라우저에서 리소스를 현재 origin에서 다른곳으로의 AJAX  요청을 금하고 있다.
예를 들어, 브라우저 한쪽 탭에서 은행 계좌를 체크하고 다른 탭에서 evil.com 웹사이트를 접속하고 있다.
evil.com의 스크립트에서 credential을 이용해 은행 API로 AJAX 요청을 할 수 없다.

Cross-origin resource sharing(CORS)는 IFrame이나 JSONP와 같은 일부 보안에 약하거나 강력하지 않은 hack과 같은 방법 대신에 권한이 있는 도메인 간 요청을 유연한 방법으로 제공하는 대부분의 브라우저에서 구현된 W3C 사양이다.

Spring Framework 4.2 GA는 전형적인 filter 기반으로 해결하는 대신 좀 더 쉽고 강력한 방법으로 구성할 수 있는 CORS를 위한 클래스를 처음으로 제공한다.

Spring MVC는 높은 수준의 구성 기능을 제공한다.

Controller 메소드에 CORS 설정

@RequestMapping 어노테이션이 있는 handler 메소드에 @CrossOrigin 어노테이션을 달아 CORS를 활성화시킨다.(기본적으로  @CrossOrigin은 모든 origin과 @RequestMapping  어노테이션의 HTTP 메소드를 허용한다.)

```java
@RestController
@RequestMapping("/account")
public class AccountController {

	@CrossOrigin
	@RequestMapping("/{id}")
	public Account retrieve(@PathVariable Long id) {
		// ...
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public void remove(@PathVariable Long id) {
		// ...
	}
}

```

또한 전체 controller에 CORS를 활성화하는것도 가능하다.

```java
@CrossOrigin(origins = "http://domain2.com", maxAge = 3600)
@RestController
@RequestMapping("/account")
public class AccountController {

	@RequestMapping("/{id}")
	public Account retrieve(@PathVariable Long id) {
		// ...
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public void remove(@PathVariable Long id) {
		// ...
	}
}
```

이 예에서 CORS 지원은 핸들러 메소드인 retrieve()와 remove() 둘다 활성화하는것을 지원하고 @CrossOrigin 속성을 이용하여 CORS 을 커스터마이징을 할 수 있다.

컨트롤러나 메소드 레벨의 CORS 설정을 할 수 있고  Spring은 컨트롤러와 메소드에 둘 다 쓸수있는 CORS 설정을 생성하기 위한 어노테이션 속성을 만들것이다.

```java
@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/account")
public class AccountController {

        @CrossOrigin(origins = "http://domain2.com")
        @RequestMapping("/{id}")
        public Account retrieve(@PathVariable Long id) {
                // ...
        }

        @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
        public void remove(@PathVariable Long id) {
                // ...
        }
}
```

Global CORS 설정

추가로 어노테이션 기반 설정뿐만 아니라 global CORS 설정을 정의하기를 원할 것이다.

이 방법은 filter를 사용하는것과 유사하지만 Spring MVC와 함께 선언할 수 있고 @CrossOrigin 설정과 함께 쓸수 있다. 기본적으로 모든 origin과 GET, HEAD와 POST 메소드가 허용된다.


JavaConfig

전체 어플리케이션에 CORS를 활성화하기 위해서는 다음과 같이 간단하다.

```java
@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**");
        }
}
```

어떤 속성이라도 쉽게 바꿀수 있고 특정 path 패턴에만 CORS 설정을 적용할 수 있다.

```java
@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://domain2.com")
                        .allowedMethods("PUT", "DELETE")
                        .allowedHeaders("header1", "header2", "header3")
                        .exposedHeaders("header1", "header2")
                        .allowCredentials(false).maxAge(3600);
        }
}
```


### 어떻게 동작하는가?

CORS 요청은(OPTIONS 메소드로 preflight를 포함한) 자동으로 다양하게 등록된 HandlerMapping을 dispatch한다.

CORS 응답 요청(Access-Control-Allow-Origin과 같은)을 추가하기 위해 CorsProcessor 구현(기본적으로 DefaultCorsProcessor) 에 CORS preflight 요청을 처리하고 CORS를 가로채서 간단하고 실제 요청을 감사를 처리한다.

CorsConfiguration 은 CORS요청이 어떻게 허용 origin, 헤더, 메소드등 처리되어야하는지 방법을 지정할 수 있다.

이것은 다양한 방법으로 제공된다.


AbstractHandlerMapping#setCorsConfiguration()은 /api/** 와 같은 path 패턴을 매핑하는 여러 CorsConfiguration으로 Map을 지정하는것을 허용한다.

하위 클래스들은  AbstractHandlerMapping#getCorsConfiguration(Object, HttpServletRequest) 메소드를 오버라이딩해서 고유 CorsConfiguration을 제공한다

핸들러는 각 요청을 위한 CorsConfiguration을 제공하기 위한  CorsConfigurationSource 인터페이스를 구현한다.(ResourceHttpRequestHandler와 같은)

Spring Boot integration

CORS는 Spring Boot 1.3 release 에서 사용가능할 것이고, 1.3.0.BUILD-SNAPSHOT 빌드에서 이미 사용가능하다.

Spring Boot application에서 특별히 어떤 설정도 하지 않고, Controller 메소드에 @CrossOrigin 어노테이션으로 CORS 설정을 사용할 수 있다.

Global CORS 설정은 커스터마이징된 addCorsMappings(CorsRegistry)메소드의 빈 WebMvcConfigurer 을 등록함으로써 정의된다.

```java
@Configuration
public class MyConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**");
            }
        };
    }
}
```


출처: http://devtrans.tistory.com/entry/CORS-support-in-Spring-Framework [번역하기 좋은날]
