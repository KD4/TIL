
Spring boot devtools
======================================

Spring boot가 제공하는 옵셔널한 툴이다. 개발 환경에서 개발 및 테스트가 용이하도록 환경을 갖추어주는데 일단 아래와 같이 의존성 추가가 필요하다.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>
```

위 의존성을 추가하면 `DevToolsPropertyDefaultsPostProcessor`에 의해서 아래 설정이 적용된다. 


```java
static {
		Map<String, Object> properties = new HashMap<>();
		properties.put("spring.thymeleaf.cache", "false");
		properties.put("spring.freemarker.cache", "false");
		properties.put("spring.groovy.template.cache", "false");
		properties.put("spring.mustache.cache", "false");
		properties.put("server.servlet.session.persistent", "true");
		properties.put("spring.h2.console.enabled", "true");
		properties.put("spring.resources.cache.period", "0");
		properties.put("spring.resources.chain.cache", "false");
		properties.put("spring.template.provider.cache", "false");
		properties.put("spring.mvc.log-resolved-exception", "true");
		properties.put("server.error.include-stacktrace", "ALWAYS");
		properties.put("server.servlet.jsp.init-parameters.development", "true");
		properties.put("spring.reactor.debug", "true");
		PROPERTIES = Collections.unmodifiableMap(properties);
	}

```

설정을 보면 알겠지만 대부분 캐시 설정을 끈다. 캐시가 켜져있으면 개발 환경에서 번거로울 수 있다. 

## 리스타트
클래스패스에 있는 파일이 변경 될 때마다 자동으로 재시작.
- 직접 껐다 켜는거 (cold starts)보다 빠른다. 왜?
- 릴로딩 보다는 느리다. (JRebel 같은건 아님)
- 리스타트 하고 싶지 않은 리소스는? spring.devtools.restart.exclude
- 리스타트 기능 끄려면? spring.devtools.restart.enabled = false
- 라이브 릴로드? 리스타트 했을 때 브라우저 자동 리프레시 하는 기능
- 브라우저 플러그인 설치해야 함.
- 라이브 릴로드 서버 끄려면? spring.devtools.liveload.enabled = false

## 글로벌 설정
~/.spring-boot-devtools.properties

## 리모트 애플리케이션
 