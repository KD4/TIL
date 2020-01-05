스프링 부트 자동 설정 이해
=================================

`@EnableAutoConfiguration` 어노테이션에 대한 이야기다!
(이 어노테이션은 `@SpringBootApplication` 안에 숨어 있다.)

Spring Boot는 두 단계로 빈을 생성한다. 
1. `@ComponentScan`
2. `@EnableAutoConfiguration`

## @ComponentScan

`@ComponentScan` 어노테이션은 해당 어노테이션이 붙은 클래스의 패키지에서 하위 패키지 코드를 탐색하면서 아래 어노테이션이 붙은 클래스를 빈으로 만들기 위한 어노테이션이다.

- @Component
- @Configuration @Repository @Service @Controller @RestController

## @EnableAutoConfiguration
스프링 부트의 자동 설정 핵심, `@EnableAutoConfiguration` 어노테이션이다.

이 어노테이션이 붙어 있으면 `{project-dir}/resources/META-INF/spring.factories` 에 명시된 Configuration 설정 내용을 모두 참고해서 빈을 만들어준다.

실제로 아래는 `spring-boot-starter-autoconfiguration` 프로젝트의 spring.factories 파일 내용 중 일부이다.

```yml
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\
org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,\
```

한줄 한줄, 설정파일의 패키지 경로가 적혀있다. 스프링부트는 이 내용을 참고해서 설정 파일을 찾고 해당 설정 파일에 명시된 Bean 생성 정보를 파악해 빈을 생성해준다. 그래서 자동 설정이 포함된 프로젝트가 있다면 해당 프로젝트 의존성 명시만으로 빈을 사용할 수 있는 것이다. 이해를 쉽게 하기 위해서 일단 자동 설정이 포함된 프로젝트를 만들어보자.

## 자동설정 만들기

1. 의존성 추가
maven 프로젝트를 만들고 pom.xml에 아래와 같은 의존성을 추가한다.

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure-processor</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.0.3.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

2. @Configuration 파일을 작성한다.

```java
@Configuration
public class TestConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public TestClass testClass() {
        TestClass testClass = new TestClass();
        testClass.setName("Test");
        return testClass;
    }
}
```

3. src/main/resource/META-INF에 spring.factories 파일 만들기

위 설정 파일이 있는 패키지 경로를 아래와 같이 EnableAutoConfiguration 설정 하위로 넣어준다.

```yml
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  me.kd4.TestConfiguration
```

4. mvn install

이 단계를 통하면 이제 이 프로젝트는 자동설정이 포함된 스프링 프로젝트가 된다. 

## @ConfigurationProperties
이를 직접 사용할 때는 자동 설정된 빈을 사용할 때도 있지만 빈의 프로퍼티를 변경해서 사용하고싶을 때도 있다.

이럴 때 사용하는 것이 ConfigurationProperties이다.

1. 의존성 추가
```xml
<dependency>
 <groupId>org.springframework.boot</groupId>
 <artifactId>spring-boot-configuration-processor</artifactId>
 <optional>true</optional>
</dependency>
```

2. TestProperties 클래스 추가

```java

@ConfigurationProperties("kdtest")
public class TestProperties {
    private String name;
    private Long howLong;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

3. TestClass가 이 내용을 참조하도록 변경

```java

@Configuration
@EnableConfigurationProperties(TestProperties.class)
public class TestConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public TestClasss testclass(TestProperties properties) {
        TestClass testClass = new TestClass();
        testClass.setName(properties.getName());
        return testClass;
    }
}

```

4. mvn install
다시 패키징

5. 사용처에서 application.properties에서 설정

```yml
kdtest.name=강관우
```


