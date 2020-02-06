스프링 부트 의존성 관리
===============================

모든 스프링 부트 배포판은 그들이 사용하는 의존성의 호환 버전을 리스팅하고 있다. 스프링 부트를 사용할 때 특별히 의존성 패키지들 버전을 명시해주지 않아도 사용할 수 있는데, 스프링 부트 자체에서 의존성 버전을 관리하고 있기 때문에 가능하다. 어떻게 이런 의존성 관리를 제공하고 있는지 Maven 프로젝트 예시를 통해서 살펴보자.

```
 스프링 부트를 사용할 때도 필요에 따라서 버전을 명시하거나 변경할 수 있다. 
```

## Maven Pom 상속

Maven을 사용하면 `spring-boot-starter-parent` 프로젝트를 상속 받아서 기본적인 스프링 부트 의존성을 가져올 수 있다.

```xml
<!-- Inherit defaults from Spring Boot -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.2.RELEASE</version>
</parent>
```

`spring-boot-starter-parent`은 아래와 같은 기능을 한다.

- Java 1.8 호환성이 좋은 자바 버전을 명시한다.
- UTF-8 소스 컴파일을 명시한다.
- `spring-boot-dependencies` pom 파일 통해 확인할 수 있는 Dependency managerment 영역은 호환되는 의존성 버전을 관리해준다. 이 기능을 통해서 우리 pom 파일에서는 version tag 없이 의존성을 명시할 수 있다.

이렇게 `spring-boot-starter-parent`를 상속한다면 아래와 같이 이미 정의된 의존성 버전도 오버라이딩 할 수 있다. 

```xml
<properties>
    <spring-data-releasetrain.version>Fowler-SR2</spring-data-releasetrain.version>
</properties>
```

## Parent DOM 없이 사용하기 

`spring-boot-starter-parent`가 기본으로 설정한 모든 내용이 필요없을 수 있다. 이 내용 없이 단지 의존성 관리만 가져가고 싶다면 `dependencyManagement` 기능을 사용하면된다.

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <!-- Import dependency management from Spring Boot -->
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.2.2.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```