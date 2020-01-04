스프링 부트 프로젝트 구조
===============================

스프링 부트는 프로젝트 구조에 대한 제약조건은 없지만 권장하는 프로젝트 구조는 있다.

## default 패키지를 사용해라.

@ComponentScan, @EentityScan, @SpringBootApplication과 같은 스프링 부트 기능을 적절히 사용하기 위해서 default package 구조를 가져라.

아래와 같이 프로젝트 default package 없이 바로 MainApplication이 위치한다면 컴포넌트 스캔과 같은 기능은 의존성이 포함된 모든 third-party 프로젝트의 Bean을 생성할 것이다.

```
src
  +- main
    +- java
      +- MainApplication.class
   +- resources
```



[Tip]
- Java 패키지 네이밍은 도메인 이름을 거꾸로 표현하는 것을 추천한다. (예, com.example.project).

## Main Application 클래스의 위치

처음 언급한 컴포넌트 스캔 등과 같은 이슈로 메인 어플리케이션 클래스 또한 default pacakge 최상위에 위치시켜라. 하위로 이동한다면 상위 패키지에 대한 컴포넌트 스캔은 동작하지 않을 것이다.

```
com
 +- example
     +- myapplication
         +- Application.java
         |
         +- customer
         |   +- Customer.java
         |   +- CustomerController.java
         |   +- CustomerService.java
         |   +- CustomerRepository.java
         |
         +- order
             +- Order.java
             +- OrderController.java
             +- OrderService.java
             +- OrderRepository.java
```

```java
package com.example.myapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
```