내장 웹 서버 이해
=======================================

Spring Boot Web Starter 를 실행하면 톰캣 웹 서버가 실행된다. 이 때문에 스프링 부트를 웹 서버로 착각하는 경우가 있는데 스프링 부트는 웹 서버가 아니다. 

Spring Boot Web Starter는 웹서버를 등록해주는 자동 설정이 있어서 의존성에 등록된 웹서버를 자동으로 띄워준다. default로 tomcat이 등록되어 있다. 

원시 내장 톰캣을 띄우는 방법은 간단하게 아래와 같은 코드가 필요하다.

```java

public class Application {
    public static void main(String[] args) throws LifecycleException {
        // 톰캣 객체 생성
        Tomcat tomcat = new Tomcat();

        //포트 설정
        tomcat.setPort(8080);

        //톰캣에 컨텍스트 추가
        Context context = tomcat.addContext('/', '/'); // contextPath, docBase

        // 서블릿 만들기
        HttpServlet servlet = new HttpServlet() {
            @Override
            protected void doGet(HttpServletRequest req, HttpServletResponse res) {
                Printwriter writer = res.getWriter();
                writer.println("<html></html>");
            }
        }

        // 톰캣에 서블릿 추가
        String servletName = "hello";
        tomcat.addServlet("/", servletName, servlet);

        //컨텍스트에 서블릿 맵핑
        context.addServletMappingDecoded("/hello", servletName);

        // 톰캣 실행 및 대기
        tomcat.start();
        tomcat.getServer().await();
    }
}

```

이 일련의 과정을 보다 상세하고 유연하게 설정해주는게 바로 스프링 부트의 자동 설정이다.

위와 관련된 내용은 auto configuration의 spring.factories 에서 볼 수 있는 ServletWebServerFactoryAutoConfiguration에 있다. 

# 내장 웹 서버 응용 1부: 컨테이너와 서버 포트

https://docs.spring.io/spring-boot/docs/current/reference/html/howto-embedded-web-servers.html

## 다른 서블릿 컨테이너로 변경

대부분의 Spring Boot Starter 프로젝트들은 default embedded container를 가지고 있다.

- 서블릿 기반 어플리케이션인 `spring-boot-starter-web` 프로젝트는 `spring-boot-starter-tomcat`을 기본 컨테이너로 포함하고 있다. 이 설정은 당연히 커스터마이징 가능하다. 

아래는 기본 톰캣 컨테이너 의존성을 제거하고 jetty를 추가하는 설정이다.

```xml
<properties>
    <servlet-api.version>3.1.0</servlet-api.version>
</properties>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <!-- Exclude the Tomcat dependency -->
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<!-- Use Jetty instead -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>

```

## 웹 서버 사용 하지 않기
기본적으로 web starter 프로젝트는 웹 컨테이너 의존성을 포함하는데 이 내용을 disable 시킬 수도 있다.

```yaml
spring.main.web-application-type=none
```

이전 시간에 배웠듯이 이 방법은 자동 설정을 이용한다.

## 포트 변경

### server.port

standalone application이라면 HTTP port는 기본적으로 8080이다. 이 설정도 사용자가 원한다면 `server.port` 설정을 통해서 변경할 수 있다. 

application.properties 파일에 추가하거나, OS System Environment에 `SERVER_PORT`를 설정하거나 실행 변수로 넘길 수 있다. 

### random port

OS에서 사용할 수 있는 포트 중에서 시스템이 랜덤으로 설정하게 하는 방법도 있다. 

```yaml
server.port=0
```

### applicationListner

이 경우 포트 번호를 컴파일 시점에는 알 수 없기 때문에 런타임 시점에 확인하는 방법이 필요하다. 

가장 좋은 방법은 ApplicationListner를 통해서 `ServletWebServerInitializedEvent` 이벤트를 캐치해서 확인하는 것이다. 


# 내장 웹 서버 응용 2부: HTTPS와 HTTP2

https://opentutorials.org/course/228/4894

https://gist.github.com/keesun/f93f0b83d7232137283450e08a53c4fd

## HTTPS 설정하기

### 키스토어 만들기
HTTPS를 Spring-boot-web-starter에 적용하려면 일단 키스토어를 만들어야한다.

아래 쉘 스크립트를 프로젝트 디렉토리에서 실행해서 키스토어 파일을 생성하자.

```sh
keytool -genkey 
  -alias tomcat 
  -storetype PKCS12 
  -keyalg RSA 
  -keysize 2048 
  -keystore keystore.p12 
  -validity 4000
```

그리고 applicationo.properties에 아래 설정을 추가하자.

```yaml
server.ssl.key-store: keystore.p12
server.ssl.key-store-password: 123456
server.ssl.keyStoreType: PKCS12
server.ssl.keyAlias: tomcat
```

이렇게 설정을 끝낸 후 앱을 실행하면 내장 톰캣 컨테이너의 커넥터는 HTTPS 모드로 동작한다. 

자연스럽게 HTTP 리퀘스트는 못 받는 상태로 된다. 

커넥터는 한번에 하나의 프로토콜만 지원한다.

### HTTP 커넥터는 코딩으로 설정하기
- https://github.com/spring-projects/spring-boot/tree/v2.0.3.RELEASE/spring-boot-samples/spring-boot-sample-tomcat-multi-connectors

이 경우는 따로 코드 작성을 해서 http connector를 추가해줘야한다.

```java
	@Bean
	public ServletWebServerFactory servletContainer() {
		TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
		tomcat.addAdditionalTomcatConnectors(createStandardConnector());
		return tomcat;
	}

	private Connector createStandardConnector() {
		Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
		connector.setPort(0);
		return connector;
	}

```




## HTTP2 설정

server.http2.enable 옵션을 할 수 있는데, 톰캣의 경우 9이상, JDK도 9이상이어야한다. 복잡하다.


