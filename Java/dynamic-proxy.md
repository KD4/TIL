[인프런 더 자바] 5. 다이나믹 프록시
=================================

다이나믹 프록시는 리플랙션의 일부 (리플랙션 패키지 안에 있는 기능)

프록시의 대표적인 예는 Spring Data JPA

```java
public interface BookRepository extends JpaRepository<Book, Integer> {

}
```

위와 같이 BookRepository 인터페이스만 정의해도 JPA에서는 Bean을 만들어준다. 

## Spring Data JPA는 어떻게 동작하나?

스프링 데이터 JPA에서는 인터페이스 타입의 인스턴스를 누가 만들어 주는 것인가?
- Spring AOP를 기반으로 동작하며 REpositoryFactorySupport에서 프록시를 생성한다.

## 프록시 패턴

대리, 대리인.

프록시와 리얼 서브젝트가 공유하는 인터페이스가 있고 클라이언트는 해당 인터페이스 타입으로 프록시를 사용한다.
클라이언트는 프록시를 거쳐서 리얼 서브젝트를 사용하기 때문에 프록시는 리얼 서브젝트에 대한 접근 관리거나 부가기능을 제공하거나 리턴값을 변경할 수도 있다.
리얼 서브젝트는 자신이 해야 할 일만 하면서(SRP) 프록시를 사용해서 부가적인 기능(접근 제한, 로깅, 트랜잭션 등)을 제공할 때 이런 패턴을 주로 사용한다. 

* SRP(Single Responsibility Principle) 단일 책임 원칙, 객체 지향 프로그래밍에서 모든 클래스는 하나의 책임만 가진다는 원칙.

* 프록시는 리얼 서브젝트를 가지고 있어야한다.

## 다이나믹 프록시

런타임에 특정 인터페이스들을 구현하는 클래스 또는 인스턴스를 만드는 기술

```
“an application can use a dynamic proxy class to create an object that implements multiple arbitrary event listener interfaces”
```

document: https://docs.oracle.com/javase/8/docs/technotes/guides/reflection/proxy.html

런타임(코드가 실행되는 시점)

```java

/**
* arg1 : 클래스 타입
* arg2 : 구현하는 인터페이스들
* arg3 : 프록시 정의
*/
BookService bookService = (BookService) Proxy.newProxyInstance(BookService.class.getClassLoader(), new Class[]{BookeService.class}, 
    new InvocationHandler() {
        // 리얼 서브젝트
        BookService bookService = new DefaultBookService();

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            if (method.getName().equals("rent")) {
                System.out.println("aaaa");
                Object invoke = method.invoke(bookService, args);
                System.out.println("bbbb");
                return invoke;
            }

            return method.invoke(bookService, args);
        }

    }
)
```

이렇게 하면 코드레벨에서 프록시 클래스를 매번 만드는 수고는 줄어들지만, 유연한 구조가 아니다. 프록시가 많이진다면 겹겹 쌓일 수 있다. 또한 자바의 다이나믹 클래스는 클래스 기반 프록시는 못 만든다. 반드시 인터페이스여야한다. 


참고
- https://docs.oracle.com/javase/8/docs/technotes/guides/reflection/proxy.html
- https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html#newProxyInstance-java.lang.ClassLoader-java.lang.Class:A-java.lang.reflect.InvocationHandler-


## 인터페이스가 없는 경우? 프록시를 어떻게 만들까

서브 클래스를 만들 수 있는 라이브러리를 사용하여 프록시를 만들 수 있다. 

두 가지 라이브러리가 있다. CGlib, ByteBuddy

### CGlib
- https://github.com/cglib/cglib/wiki
- CGlib는 스프링, 하이버네이트가 사용하는 라이브러리이다. 버전 호환성이 좋지 않아서 서로 다른 라이브러리 내부에 내장된 형태로 제공되기도 한다. 

CGlib을 이용한 BookService 클래스 프록시 만들기

```xml
    <dependency>
        <groupId>cglib</groupId>
        <artifactId>cglib</artifactId>
        <version>3.3.0</version>
    </dependency>
```

```java
MethodInterceptor handler = new MethodInterceptor() {
    BookService bookService = new BookService();
    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        return method.invoke(bookService, objects);
    }
};

BookService bookService = (BookService) Enhancer.create(BookService.class, handler);

```

### ByteBuddy
- https://bytebuddy.net/#/
- 바이트 코드 조작 뿐 아니라 런타임(다이나믹) 프록시를 만들 때도 사용할 수 있다.

```java
Class<? extends BookService> proxyClass = new ByteBuddy().subclass(BookService.class)
        .method(named("rent")).intercept(InvocationHandlerAdapter.of(new InvocationHandler() {
            BookService bookService = new BookService();
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("aaa");
                Object invoke = method.invoke(bookService, args);
                System.out.println("bbb");
                return invoke;
            }
        }))
        .make()
        .load(BookService.class.getClassLoader()).getLoaded();
BookService bookService = proxyClass.getConstructor(null).newInstance();

Book book = new Book();
book.setTitle("spring");
bookService.rent(book);

```

### 주의점
위 두개 lib를 사용한다하더라도 class가 final이거나 private 생성자만 있는 경우처럼 상속을 사용하지 못하게 막아논 경우에는 프록시를 만들 수 없다.
=> 인터페이스가 있을 때는 인터페이스의 프록시를 만들어 사용할 것.


## 정리

## 다이나믹 프록시 
- 런타임에 인터페이스 또는 클래스의 프록시 언스턴스 또는 클래스를 만들어 사용하는 프로그래밍 기법

## 다이나믹 프록시 사용처
- 스프링 데이터 JPA
- 스프링 AOP
- Mockito
- 하이버네이트 lazy initialzation


참고
http://tutorials.jenkov.com/java-reflection/dynamic-proxies.html


