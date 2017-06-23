# Lazy Annotation

스프링4에서는 @Autowired, @Inject, @Bean을 사용할 때 @Lazy 어노테이션을 통해 빈 로딩시 즉시로딩이 아닌 지연로딩을 지원하는데 아래 예제를 통해 의미를 이해해 보자.

클래스 레벨의 @Component와 같이 쓰이거나 자바설정 파일의 메소드 레벨의 @Bean 어노테이션과 같이 사용가능 하며, @Autowired, @Inject와 도 같이 사용되어 지연로딩을 설정한다.

-  @Component와 @Bean에 @Lazy 어노테이션이 정의되지 않았다면 어노테이션이 적용되는 시점에 즉시로딩된다.(EAGER Loading, 즉시로딩)

-  @Component와 @Bean에 @Lazy 어노테이션이 정의(value=true)되었다면 다른 참조되는 빈에 의해 사용되거나 실제 참조될 때 로드된다.(LAZY Loading, 지연로딩)

- @Component와 @Bean에 @Lazy 어노테이션이 정의(value=	false)되었다면 빈팩토리가 초기화 될 때 싱글톤 형태로 로드된다.(EAGER Loading)

```java
[AppConfig.java]
package edu.spring4;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
public class AppConfig {
	@Bean
	@Lazy   //지연로딩, 실제사용될 때 로딩
	public Programmer programmer(){
		return new Programmer();
	}

	@Bean	//즉시로딩, AppConfig가 로드될 때 Designer는 생성됨
	public Designer designer(){
		return new Designer();
	}
}

[Programmer.java]
package edu.spring4;
public class Programmer {
	public Programmer(){
		System.out.println("Programmer initialized~~");
	}
}

[Designer.java]
package edu.spring4;
public class Designer {
	public Designer(){
		System.out.println("Designer initialized~~");
	}
}


[LaZyTest.java]
package edu.spring4;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
public class LazyTest {
	public static void main(String[] args)  {
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
		ctx.register(AppConfig.class);  //Designer 로딩됨
		ctx.refresh();
		ctx.getBean(Programmer.class);  // Programmer 로딩
	}
}
```
