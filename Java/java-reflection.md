[인프런 더 자바] 4. 리플렉션
=================================

#### 스프링의 Depedency Injection은 어떻게 동작할까?

BookService.java
```java
@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

}
```
bookRepository 인스턴스는 어떻게 null이 아닌걸까?

스프링은 어떻게 BookService 인스턴스에 BookRepository 인스턴스를 넣어준 것일까?

## 리플렉션 API 1부: 클래스 정보 조회

리플렉션의 시작은 Class<T>

https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html

Class<T>에 접근하는 방법

모든 클래스를 로딩 한 다음 Class<T>의 인스턴스가 생긴다. “타입.class”로 접근할 수 있다.

모든 인스턴스는 getClass() 메소드를 가지고 있다. “인스턴스.getClass()”로 접근할 수 있다.

클래스를 문자열로 읽어오는 방법

Class.forName(“FQCN”)

클래스패스에 해당 클래스가 없다면 ClassNotFoundException이 발생한다.

Class<T>를 통해 할 수 있는 것

- 필드 (목록) 가져오기
- 메소드 (목록) 가져오기
- 상위 클래스 가져오기
- 인터페이스 (목록) 가져오기
- 애노테이션 가져오기
- 생성자 가져오기
- ...

## 애노테이션과 리플렉션

### 중요 애노테이션

- @Retention: 해당 애노테이션을 언제까지 유지할 것인가? 소스, 클래스, 런타임
- @Inherit: 해당 애노테이션을 하위 클래스까지 전달할 것인가?
- @Target: 어디에 사용할 수 있는가?

### 리플렉션
- getAnnotations(): 상속받은 (@Inherit) 애노테이션까지 조회
- getDeclaredAnnotations(): 자기 자신에만 붙어있는 애노테이션 조회



## 리플렉션 API 1부: 클래스 정보 수정 또는 실행

### Class 인스턴스 만들기
Class.newInstance()는 deprecated 됐으며 이제부터는 생성자를 통해서 만들어야 한다. 

### 생성자로 인스턴스 만들기
```java
Constructor.newInstance(params)
```

### 필드 값 접근하기/설정하기
- 특정 인스턴스가 가지고 있는 값을 가져오는 것이기 때문에 인스턴스가 필요하다.
```java
Field.get(object)
Filed.set(object, value)
```
Static 필드를 가져올 때는 object가 없어도 되니까 null을 넘기면 된다.

### 메소드 실행하기
```java
Object Method.invoke(object, params)
```

## 나만의 DI 프레임워크 만들기

@Inject 라는 애노테이션 만들어서 필드 주입 해주는 컨테이너 서비스 만들기
```java
public class BookService {

    @Inject
    BookRepository bookRepository;

}
```

ContainerService.java
```java
public static <T> T getObject(T classType)
```
classType에 해당하는 타입의 객체를 만들어 준다.

단, 해당 객체의 필드 중에 @Inject가 있다면 해당 필드도 같이 만들어 제공한다.

## 리플렉션 정리

### 리플렉션 사용시 주의할 것
- 지나친 사용은 성능 이슈를 야기할 수 있다. 반드시 필요한 경우에만 사용할 것
- 컴파일 타임에 확인되지 않고 런타임 시에만 발생하는 문제를 만들 가능성이 있다.
- 접근 지시자를 무시할 수 있다.

- 스프링
의존성 주입
MVC 뷰에서 넘어온 데이터를 객체에 바인딩 할 때
- 하이버네이트
@Entity 클래스에 Setter가 없다면 리플렉션을 사용한다.
- JUnit
https://junit.org/junit5/docs/5.0.3/api/org/junit/platform/commons/util/ReflectionUtils.html

- 참고
https://docs.oracle.com/javase/tutorial/reflect/index.html


