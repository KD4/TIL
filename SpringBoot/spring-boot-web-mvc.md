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
    public void hello() {∑
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

## HttpMessageConverters

https://docs.spring.io/spring/docs/5.0.7.RELEASE/spring-framework-reference/web.html#mvc-config-message-converters

HttpMessageConverter는 Spring framework의 Web MVC interface로 HTTP 요청 본문을 객체로 변경하거나 객체를 HTTP 응답 본문으로 변경할 때 사용한다.

```java
@RestController
public class UserController {

    @PostMapping("/users")
    public @ResponseBody User create(@RequestBody User user) {
        return null;
    }
}
```

```
{“username”:”keesun”, “password”:”123”} <-> User
```

위와 같은 어노테이션이 붙을 때 HttpMessageConverter가 사용된다. 종류는 여러가지가 있는데 사용하는 HttpMessageConverter는 어떤 요청이느냐에 따라서 달라진다. 요청에 Content type이 Json이면 JosnMessageConverter가 사용되어 Json으로 컨버팅된다. 그냥 String이라면 StringMessageConverter가 사용된다. 

추가로 RestController가 붙어 있으면 ResponseBody가 생략되어도 괜찮다.

```java
@RestController
public class UserController {

    @PostMapping("/users")
    public User create(@RequestBody User user) {
        return null;
    }
}
```

## ViewResolver

스프링 부트가 제공하는 클래스
들어오는 요청에 accept header에 따라 응답이 달라진다. 브라우저 또는 클라이언트가 어떤 타입에 본문을 원한다를 서버에 알려주는 accept header. accept header에 따라 응답이 달라질 수 있다.

* Accept Header or format query param

#### Accept Header

`Accept` 헤더는 MINME 타입으로 표현되는, 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지 서버에게 알려줄 때 사용하는 헤더이다.

```
Accept: <MIME_type>/<MIME_subtype>
Accept: <MIME_type>/*
Accept: */*

// example, you can use Mulitple types likes below.
// Accept: text/html, application/json, application/xml
```

accept를 xml로 주었을 때 일반적인 경우의 어플리케이션은 HttpMediaTypeNotAcceptableException을 뱉을 것이다. 

HttpMediaTypeNotAcceptableException 예외가 발생하는 경우는 HttpMessageConverter가 없는 경우이다. 

HttpMessageConvertersAutoConfiguration 에서 필요한 HttpMessageConverter가 등록되는지, 빈 조건을 살펴볼 수 있다. 

xml을 받기 위해서 아래 의존성을 추가해야한다.

```xml
<dependency>
   <groupId>com.fasterxml.jackson.dataformat</groupId>
   <artifactId>jackson-dataformat-xml</artifactId>
   <version>2.9.6</version>
</dependency>
```

## 정적 리소스 지원

정적 리소스라는거는 동적으로 생성하지 않은거, 즉 웹 브라우저의 요청에 따라서 이미 만들어진 리소스를 보내주는 경우 
서버가 요청에 따라서 다른 뷰를 만드는게 아니라 이미 만들어진 리소스를 제공

정적 리소스 맵핑 "/**"
기본 리소스 위치
- classpath:/static
- classpath:/public
- classpath:/resources
- classpath:/META-INF/resources

예를 들어 /hello.html => /static/hello.html을 보내준다.

이 기본 정적 리소스 매핑 정보는 아래 스프링 옵션으로 변경 가능하다.
- spring.mvc.static-path-pattern: 맵핑 설정 변경 가능
- spring.mvc.static.locations: 리소스 찾을 위치 변경 가능

#### 추천하는 방법

WebMvcConfigurer의 addResourceHandler를 오버라이딩하면 조금 더 명시적이다. 

```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
  registry.addResourceHandler("/m/**")
    .addResourceLocations("classpath:/m/") // 반드시 "/"로 끝나야 함.
    .setCachePeriod(20); //초단위
```


## ResourceHttpRequestHandler
정적 리소스 파일을 핸들링하는 클래스

특징 Last-Modified 헤더 관리
=> 정적 리소스 파일 변경시 Last-Modified 필드가 변경됨 

=> 브라우저는 이 리소스가 언제 바꼈는지 알 수 있다. 

=> 브라우저 요청 헤더에는 If-Modified-Since 가 있다.

=> 서버는 Last-Modifed < If-Modifed-Since 라면 302 리턴을 보내 리소스를 다시 보내지 않는다.

# WebJARs
 
Spring Boot 기반 웹웹 UI에서 사용하는 자바스크립트 라이브러리를 메이븐이나 그래들과 같은 Spring Boot 의존성 관리 라이프사이클에서 관리할 수 있도록 도와주는 기능이다. 

기존에 bootstrap, jquery, react와 같은 JS Lib를 사용할 때는 아래와 같은 방법들을 사용했을 것이다. 

1. minify된 JS 파일을 다운받아서 프로젝트에 넣음
2. CDN 사용

위와 같은 방법은 번거롭다, 안정성이 부족하다 라는 단점이 있는데 아래 디펜던시를 추가하면 Jquery 의존성을 메이븐을 통해 관리할 수 있고 프로젝트 리소스 디렉토리에 자동으로 들어가서 파일 C/P 번거로움도 없어진다.

```xml
<!-- https://mvnrepository.com/artifact/org.webjars/jquery -->
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>jquery</artifactId>
    <version>3.3.1</version>
</dependency>
```

```html
<script src="/webjars/jquery/dist/jquery.min.js"></script>
<script>
   $(function() {
       console.log("ready!");
   });
</script>
```

webjars로 등록된 디펜던시는 위 예제처럼 "/webjars/jquery/{version}/dist/" 경로에서 확인할 수 있다. 


### 웰컴 페이지
- index.html 찾아 보고 있으면 제공.
- index.템플릿 찾아 보고 있으면 제공.
- 둘 다 없으면 에러 페이지.

### 파비콘
- favicon.ico
- 파이콘 만들기 https://favicon.io/
- 파비콘도 리소스 디렉토리 아무곳에나 넣을 수 있다.
- 파비콘이 안 바뀔 때?
https://stackoverflow.com/questions/2208933/how-do-i-force-a-favicon-refresh

# 템플릿엔진

스프링부트를 이용해 동적 컨텐츠를 생성하는 방법 = 템플릿 엔진

### 스프링부트가 자동 설정을 지원하는 템플릿 엔진

- FreeMarker
- Groovy
- **Thymeleaf**
- Mustache

### JSP를 권장하지 않는 이유

- JAR 패키징 할 때는 동작하지 않고, WAR로 패키징 해야 함.
- Underflow(서블릿엔진)는 JSP를 지원하지 않음
https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-jsp-limitations

### Thymeleaf 사용하기

- https://www.thymeleaf.org/
- https://www.thymeleaf.org/doc/articles/standarddialect5minutes.html
- 의존성 추가: spring-boot-starter-thymeleaf
- 템플릿 파일 위치: /src/main/resources/template/
- 예제: https://github.com/thymeleaf/thymeleafexamples-stsm/blob/3.0-master/src/main/webapp/WEB-INF/templates/seedstartermng.html

자동 설정이 적용되면 resources/templates 아래에서 찾게된다. 

"/hello"를 호출했을 때 /resources/templates/hello 템플릿 반환하기

```java
@Controller
public class SampleController {

    @GetMapping("/hello")
    public String hello(Model model) {
        model.addAttribute("name", "gwanwoo") // name property에 gwanwoo를 할당
        return "hello"; // hello라는 템플릿 문서를 View로 하는 동적 문서를 만들도록 요청한다.
    }
}
```

- @Controller: 여기서 controller 애노테이션은 @RestController 과 모양은 물론 역할도 다르다. return하는 값이 String이면 해당하는 뷰를 찾아서 넘겨준다.
 

#### Variable Expression

1. 템플릿 엔진에 xml namespace 추가
2. 변수 주입

```html
<!DOCTYPE html>
<!-- 1. NameSpace 정의 -->
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<!-- 2. name 변수 주입, 없으면 Name으로 출력 -->
<h1 th:text="${name}">Name</h1> 
</body>
```

* 장점: html이라서 기본적으로 웹서버 없이 동작 가능하다. 기본값 또한 세팅이 가능하므로 백단 작업없이 프론트 작업만도 가능하다.

 
# HtmlUnit

HTML 템플릿 뷰 테스트를 보다 전문적으로 하는 방법 : HTML Unit

- http://htmlunit.sourceforge.net/
- http://htmlunit.sourceforge.net/gettingStarted.html

### 의존성 추가

```xml
<dependency>
   <groupId>org.seleniumhq.selenium</groupId>
   <artifactId>htmlunit-driver</artifactId>
   <scope>test</scope>
</dependency>
<dependency>
   <groupId>net.sourceforge.htmlunit</groupId>
   <artifactId>htmlunit</artifactId>
   <scope>test</scope>
</dependency>
```

### 테스트 예제


```java
@RunWith(SpringRunner.class)
@WebMvcTest(SampleController.class)
public class SampleControllerTest {

    //WebMvcTest 설정을 사용한 빈
    @Autowired
    WebClient webClient

    @Test
    public void hello() {∑
        HtmlPage page = webClient.getPage("/hello");
        HtmlHeading1 h1 = page.getFirstByXPath("//h1");
        assetThat(h1.getTextContent()).isEqualToIgnoringCase("gwanwoo");
    }

}
```
