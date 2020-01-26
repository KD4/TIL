@Profile 애노테이션
======================================

@Profile 애노테이션을 @Configuration, @Component, @Bean 애노테이션과 함께 사용하면 특정 프로파일에만 동작하는 애노테이션을 만들 수 있다. 

# Bean과 함께 @Profile 사용하기

@Profile 애노테이션을 사용해서 특정 Profile에서만 생성되는 빈을 만들어본다.

'dev' Profile에서만 활성화되는 설정 파일은 아래와 같이 작성한다.

```java
@Component
@Profile("dev")
public class DevDatasourceConfig
```

'dev' profile에서는 동작하지 않는 빈 설정은 NOT 연산자를 앞에 붙임으로써 활성화 시킬 수 있다.

```java
@Component
@Profile("!dev")
public class ProdDatasourceConfig
```

# 어떤 프로파일을 활성화 할 것인가?

`spring.profiles.active` 옵션을 통해서 활성 프로파일을 설정할 수 있다. 
또한 `spring.profiles.include` 통해서 다양한 케이스에 맞는 프로파일 설정을 추가할 수 있다. 

[외부설정](./external-config.md)도 profile 별로 다르게 줄 수 있는데 아래와 같은 템플릿을 사용한다.
```
application-{profile}.properties
```
