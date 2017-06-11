# 함수형 인터페이스와 함께 자바 8에 녹아든 람다 표현식

이번 글에서는 자바 8의 람다식과 함수형 인터페이스를 함수형 프로그래밍의 1급 시민 패러다임과 함께 비교하면서 설명하고자 합니다.



컴퓨터 과학, 프로그래밍 언어론에서 1급 시민(1급 객체)라는 말이 등장합니다.
1급 시민이란 무엇일까요? 위키피디아에서는 다음과 같이 정의하고 있습니다.

```
In programming language design, a first-class citizen (also type, object, entity, or value) in a given programming language is an entity which supports all the operations generally available to other entities. These operations typically include being passed as an argument, returned from a function, and assigned to a variable.
- Wikikpedia
```

프로그래밍 언어 디자인에서 프로그래밍 언어의 first-class citizen는 다른 엔티티가 일반적으로 사용할 수 있는 모든 작업들을 지원하는 엔티티라고 합니다.

이러한 작업들에는 객체 등을 함수의 인자로 넘기거나, 함수에서 반환하고 변수에 할당할 수 있는 것들이 포함되어 있습니다.

일반적으로 1급 시민의 조건은 다음과 같이 정의한다고 합니다.

```
1. 변수(variable)에 담을 수 있다
1. 인자(parameter)로 전달할 수 있다
1. 반환값(return value)으로 전달할 수 있다
```

위 조건에 근거해서, 자바의 일급 시민은 객체(일반, 참조 자료형)입니다.

객체는 변수에 담을 수 있고, 인자로 전달될 수 있으며, 반환값으로 전달될 수 있습니다.
객체지향 프로그래밍의 메커니즘에 합당한 일급시민이였습니다.

하지만 프로그래밍 패러다임이 변하면서 함수형 프로그래밍이 대두되었습니다.
함수형 프로그래밍에서는 '함수' 자체가 일급 시민입니다. 함수 자체가 일급시민이 되면 어떤 장점이 있을까요 ?

우선 생각해볼수있는게 '고차함수'입니다.
특정 메소드의 작업 내용이나 결과를 2차, 3차로 고도화할 수 있습니다.
고차 작업을 설명하기 위해서 multiplyAfterOp 함수를 1급 시민이 함수인 자바스크립트로 정의해보겠습니다.


```javascript
function multiplyAfterOp(op) {
  return op() * op();
}

console.log(multiplyAfterOp(add(1, 2)))
// 4
```

위 함수는 특정 계산식을 받아서 계산식의 결과를 곱해서 결과를 반환하는 함수입니다.

multiplyAfterOp 함수와 같이 1차적인 작업만 가능한 단일 함수가 함수를 받을 수 있도록 설계를 한다면 N차로 작업이 가능한 고차함수를 설계할 수 있습니다.

함수형 프로그래밍의 장점은 바로 이 고차함수 설계입니다.

자바 8은 일명 모던 자바라고 불리며 이 함수형 프로그래밍의 컨셉을 가져오고자 람다식을 도입했습니다.

```java
(Long val1, String val2) -> val1 + val2.length()
```

람다식은 위와 와 같은 형태로 되어있습니다.
언뜻보면 정말 자바에서 함수 자료형을 지원해서 함수 자체를 결과값으로, 인자값으로 넣어줄 수 있는 것처럼 보이지만 사실은 이것또한 객체입니다.

위와 같은 람다식을 자바8에서는 함수형 인터페이스로 정의합니다. 함수형 인터페이스는 메소드가 하나만 정의되어있다고 약속한 인터페이스입니다.
이 약속을 통해서 이 인터페이스를 구현한 객체에는 함수 하나만 있다고 믿고 자바는 마치 함수처럼 코드를 작성하고 표현할 수 있는 것입니다.

```
함수형 인터페이스: 추상 메서드가 1개인 인터페이스
```



```java
public interface Comparator<T> { int compare(T o1, T o2); }
Comparator<Long> comp = (Long o1, Long o2) -> o2 - o1 < 0 ? -1 : 1;
//함수형(Functional) 인터페이스의 임의 객체를 람다식으로 표현
```

Comparator는 함수형 인터페이스입니다.
2번째 줄 코드에서 (Long o1, Long o2) -> o2 - 01 < 0 ? -1 : 1; 부분은 사실 아래 코드와 같이 compare 메소드를 오버라이딩하고 Comparator 인터페이스를 재정의해서 comp에 넣어주는 작업을 합니다.

```java
interface CustomComparator implements Comparator {
  @Override
  public int compare(Long o1, Long o2) {
    return o2 - o1 < 0 ? -1 : 1;
  }
}
```

위와 같이 람다식이 표현된 곳이 인자값으로 들어가는 곳은 반환값, 인자타입을 확인해서 그 객체가 구현한 인터페이스가 함수형 인터페이스인지 확인하고 함수형 인터페이스면 해당 인터페이스의 메소드를 람다식과 매칭해서 오버라이딩해줍니다.

이 메커니즘을 통해서 자바 8에서는 함수형 프로그래밍을 구현했습니다.

함수형 인터페이스와 함께 자바 8에 녹아든 람다 표현식을 통해서 모던 자바에서는 고차 함수 작업이 가능하게되었습니다.

자바 8과 함께 등장한 라이브러리와 프레임워크들은 아래와 같이 미리 정의된 함수형 인터페이스를 활용해서 다양한 고차적인 작업들을 지원하고 있습니다.

```java
public interface Function<T, R> { R apply(T t); }

public interface Predicate<T> { boolean test(T t); }

public interface BiFunction<T, U, R> { R apply(T t, U u); }

public interface Supplier<T> { T get(); }

public interface Consumer<T> { void accept(T t); }
.
.
.
```
