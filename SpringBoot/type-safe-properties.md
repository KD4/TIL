타입-세이프 프로퍼티
=====================================


```yaml
myApp.testBaseUrl=daum.net
myApp.redisUrl=redishost.coom
```

위에 application.properties처럼 app에서 사용하는 custom한 설정들이 있다면 @ConfigurationProoperties를 사용해서 관리할 수 있다. 

## 간단한 사용 방법
```java
@ConfigurationProperties("myApp")
public class MyAppProperties {
    private String testBaseUrl;
    private String redisUrl;

    // getter and setter...
}
```

위와 같이 설정으로 관리할 속성들을 Bean 규약에 따라서 만들고 ConfigurationProperties 어노테이션을 붙이면 스프링부트는 이 빈을 활용해서 타입 - 세이프 프로퍼티를 만들어준다. 

Application Entrypoint에 @EnableConfigurationProperties 를 아래와 같이 선언해주거나, ConfigurationProperties가 붙은 클래스에 @Component를 붙이거나 직접 빈을 만들면 된다.
   
## 융통성 있는 바인딩
- context-path (케밥)
- context_path (언드스코어)
- contextPath (캐멀)
- CONTEXTPATH

## 프로퍼티 타입 컨버전
- @DurationUnit을 제공한다. 여러가지 타입을 받을 수 있다. 

## 프로퍼티 값 검증
- @Validated
- JSR-303 (@NotNull, ...)

## 참고:
https://www.baeldung.com/configuration-properties-in-spring-boot