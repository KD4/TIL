# Jackson Module Kotlin

## 개요
코틀린 클래스를 serialization/deserialize 하기 위한 모듈이다.

기존에는 Kotlin 클래스를 Jackson 모듈로 deserialize 하기 위해서는 디폴트 생성자가 반드시 존재해야했다.

이 모듈을 이용하면 디폴트 생성자가 없는 클래스도 자동으로 deserialize가 되도록 설정할 수 있다. 또한 이 모듈은 여러 생성자 혹은 팩토리 메소드도 지원한다.

## 사용법
코틀린 디폴트 생성자를 그냥 사용한다면, 이 모듈은 클래스의 필드 이름을 가지고 JSON 프로퍼티 이름을 추론한다.

### Maven 설정
```xml
<dependency>
    <groupId>com.fasterxml.jackson.module</groupId>
    <artifactId>jackson-module-kotlin</artifactId>
    <version>2.9.0</version>
</dependency>
```

### ObjectMapper에 주입

아래와 같이 ObjectMapper 설정에 KotlinModule을 넣어주면된다.

```java
val mapper = ObjectMapper().registerModule(KotlinModule())
```

혹은 아래와 같이 mapper를 생성할 수 있다.

```java
val mapper = jacksonObjectMapper()

val mapper = ObjectMapper().registerKotlinModule()

```
