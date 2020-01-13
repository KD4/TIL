SpringApplication of Boot
====================================

## 로그 레벨
기본 스프링 부트 어플리케이션의 스프링 로그 레벨은 INFO이다.
--debug 같은 옵션을 통해 디버깅 모드로 실행 할 수 있다

## FailureAnalyzers
에러가 났을 때 에러를 예쁘게 보여주는 기술

## Banner

어플리케이션 실행 할 때 로그에 찍히는 것
배너를 바꾸고 싶다? resources에 banner.txt를 넣어주면 된다. 
배너에서도 변수 사용 가능. Banner.variables가 있다. 

|Variable |Description|
|------|------|
|${application.version}| MANAFEST.MF에 정의된 어플리케이션의 버전을 나타냄. |
|${application.formatted-version}|MANAFEST.MF에 정의된 어플리케이션의 버전을 포맷된 상태로 나타냄. |
|${spring-boot.version}| 스프링 부트의 버전을 보여줌 2.2.2.RELEASE |
|${spring-boot.formatted-version}| 스프링부트 버전을 포맷된 상태로 보여줌. v.2.2.2.RELEASE|
|${Ansi.NAME} (or ${AnsiColor.NAME}, ${AnsiBackground.NAME}, ${AnsiStyle.NAME})|ANSI 회피 코드의 이름을 나타냄|
|${application.title}|MANAFEST.MF에 정의된 앱 이름을 보여줌|

MANIFEST 파일은 jar로 패키징할 때 만들어짐.

배너는 txt 말고, gif, jpg 등등도 사용가능하다.

resources가 아니라 다른 위치에 넣고 싶으면 application.properties의 spring.banner.location을 설정하면 된다. 

* 기본 인코딩은 UTF-8이다.  


## Appilcation Evnet
스프링이나 부트에서 제공하는 Event 들이 있다. 

어플리케이션이 시작될 때, 컨텍스트를 만들었을 때, 리프레시 됐을 때 등 이벤트 콜백을 등록할 수 있다. 

```java
// ApplicationListener 의 제네릭스로 캐치할 이벤트를 넣어준다. 
@Component
public class SampleListner implements ApplicationListener<ApplicationStartingEvent> {

    @Override
    public void onApplicationEvent(ApplicationStartingEvent event) {
        
    }
}
```

- 빈으로 등록하면 해당 이벤트에서 알아서 시작함
- 어플리케이션 컨텍스트가 만들어진 후에 생성되는 이벤트는 이렇게 빈으로 생성하면 캐치 가능
- 아래 ApplicationStartingEvent는 실행되지 않는다. (빈이 아직 생성되지 않았기 때문)

이 경우는 아래와 같이 리스너를 직접 등록해줘야함

```java
public static void main(String[] args) {
    SpringApplication app = new SpringApplication(SpringinitApplication.class);
    app.addListeners(new SampleListener());
    app.run(args);
}
```

## WebApplicationType

SpringApplication은 적절한 Type의 ApplicationContext를 알아서 생성해주는데, 이 알고리즘은 WebApplicationType에 의해서 결정된다. 

```
WebApplicationType.SERVLET 
WebApplicationType.REACTIVE
WebApplicationType.NONE
```

## 애플리케이션 아규먼트 사용하기

application arguments는 --로 들어오는 옵션, -D로 들어오는건 JVM 옵션이다. 

## ApplicationRunner, CommandLineRunner

애플리케이션 실행한 뒤 뭔가 실행하고 싶을 때 사용함.

```java

@Component
public class SampleListner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) {
        // --로 입력된 application 아규먼트를 받아올 수 있다. 
        
    }
}
```

구현한 게 여러개라면 @Order를 줘서 순서를 조정할 수 있음. 숫자 낮은게 우선순위가 높음.

