Generics
=======================================

## 제네릭스란?

클래스 혹은 메서드에서 사용할 객채의 타입을 코드 작성 시점에 결정할 수 있는 기능이다.

## 왜 필요할까?

- 형변환 생략가능으로 코드 가독성 증가
- 타입 안정성 제공

## 어떻게 사용하지?

제네릭 클래스 혹은 메서드에 꺽새로 감싸 타입변수를 정의하고 해당 타입 변수를 다루는 로직을 작성한다.

제네릭 클래스는 클래스 이름 바로 옆, 제네릭 메서드는 메서드 리턴 타입 왼쪽에 혹은 매개변수 안에 작성한다.

```java
class Box<T> {
    T t;

    public void set(T t) {
        this.t = t;
    }

    public T get() {
        return t;
    }
}

Box<Integer> boxI = new Box<>(); // Java 7부터 new 생성자에 타입 지정은 안해도된다.
boxI.set(1);
// boxI.set("1"); <== compile error
```

사용하는 제네릭 타입에 대한 형 제한이 필요한 경우가 있다. 

제네릭스 타입 변수은 `extends` 키워드를 이용해 상한 타입 제한을 걸 수 있다. (타입 변수는 하한 타입 제한은 제공하지 않는다.)

```java
class Box<T extends Number> {
    T t;

    public void set(T t) {
        this.t = t;
    }

    public T get() {
        return t;
    }
}

Box<Integer> boxI = new Box<>();
Box<Float> boxF = new Box<>();
Box<Number> boxN = new Box<>();
// Box<String> boxS = new Box<String>(); <== 불가
```

## 와일드 카드의 필요성

자바 언어에서 배열은 타입 호환성을 유지한다. 즉, Integer 는 Number 이기도 하므로 Integer 의 배열은 Number 의 배열이기도 하다. 그러나 제네릭은 그렇지 않다( List<Integer> 는 List<Number> 가 아니다 ). 어떤 선택이 옳고 그른지는 논쟁의 여지가 있다. 양쪽이 모두 장단점이 있기 때문이다. 어쨌든, 미묘하게 다른 의미의 파생 타입을 생성하기 위한 목적으로 비슷한 두 메커니즘이 존재한다는 점이 혼란과 실수 유발의 근본 원인인 것은 의문의 여지가 없다.

실제 예제를 봐보자.

Integer 객체가 들어가는 boxI를 만들고 Number 객체가 들어있는 boxN를 서브 박스에 넣고싶지만 boxI는 생성하면서 이미 사용하는 타입을 Integer로 정해버렸다. 그래서 Number 타입을 받는 박스는 형이 맞지 않아 들어갈 수 없다. (제네릭스를 사용하지 않는다면 가능하다. 어차피 제네릭스는 컴파일하면 타입이 사라진다. 이건 나중에 살펴본다.)

```java
static class Box<T extends Number> {
    T t;
    Box<T> sub;

    public void set(T t) {
        this.t = t;
    }

    public T get() {
        return t;
    }

    public void put(Box<T> box) {
        sub.put(box);
    }
}

public static void main(String[] args) {

    Box<Integer> boxI = new Box<>();
    Box<Number> boxN = new Box<>();
    // boxI.put(boxN); <== error

}
```

위 예제를 컴파일하면 `Box<Number>` 에 put(`Box<Integer>`) 메서드를 찾을 수 없다는 에러 메시지를 얻는다. 제네릭이 타입 호환성이 없다는 점만 알면, 이 에러 메시지는 당연한 것이다. Integer 가 Number 라 할지라도, `Box<Integer>` 는 `Box<Number>` 가 아니기 때문이다. 그러나 어쨌든 이러한 속성 때문에 제네릭이 기대하는 만큼 유연하지 않다고 느낄 수 있다. 제네릭 코드의 활용도를 높이려면, 한 가지 정해진 제네릭 타입 매개변수를 명시하는 대신, 타입 매개변수의 상한 경계(upper-bound) 또는 하한 경계(lower-bound)를 명시할 수 있어야 한다. 즉, 와일드카드를 사용해야 하는 것이다. 이 와일드카드는 " ? extends T " 또는 " ? super T "의 형식을 띤다. (경계 지정 와일드카드는 타입 매개변수로만 사용할 수 있으며, 그 자신을 타입으로 사용할 수는 없다. 이 때문에 경계가 지정된 타입 변수가 필요하다.)

와일드 카드를 사용해서 위 코드를 수정해보자.


```java
static class Box<T extends Number> {
    T t;
    Box<? extends Number> sub;

    public void set(T t) {
        this.t = t;
    }

    public T get() {
        return t;
    }

    public void put(Box<? extends Number> box) {
        sub.put(box);
    }
}

public static void main(String[] args) {
    Box<Integer> boxI = new Box<>();
    Box<Number> boxN = new Box<>();
    boxI.put(boxN);
}
```

put() 의 매개변수는 타입 매개변수가 T 또는 그 서브타입인 Box를 모두 허용하므로, 이제 코드를 우리가 원하는 대로 컴파일할 수 있다. Integer 는 Number 의 서브타입이고 `Box<Integer>` 는 와일드카드인 `Box<? extends Number>` 와 부합하므로, 컴파일러는 비로소 put(`Box<Integer>`) 메서드 참조를 허용한다.


## Type Erasure

사실 제네릭은 눈속임이다. 코드 작성 시점의 편의를 위해서 사용하는 기능이고 실제로 강력한 형제한은 들어가지 않는다.

"클래스 혹은 메서드에서 사용할 객채의 타입을 코드 작성 시점에 결정할 수 있는 기능이며 타입 안정성을 제공한다"고 했으면서 이게 무슨 말일까?

자바에서는 제네릭 클래스를 인스턴화화 할 때 해당 타입 타입을 지워버린다. 그 타입은 컴파일 직전까지만 존재하고 컴파일된 바이트코드에서는 어떠한 타입파라미터의 정보를 찾아볼 수 없다. 

```java
List<Integer> numbers = new ArrayList<>();
```
위 코드는 아래와 같은 바이트 코드로 컴파일된다.

```java
L0
LINENUMBER 11 L0
NEW java/util/ArrayList
DUP
INVOKESPECIAL java/util/ArrayList.<init> ()V
ASTORE 1
```

위와 같이 ArrayList를 생성할 때 어떠한 타입정보도 들고 있지 않다. new ArrayList()로 생성한 것과 동일하게 바이트 코드가 생성된다.

제네릭의 이런 Type Erasue는 하위 호환성, 즉 Java는 제네릭으로 작성된 코드도 Java 4에서 돌아갈 수 있도록 사려 깊은 코드를 제공했지만 프로그래머에게 혼란을 제공했다.

Type Erasue가 발생한다는 걸 모른다면 프로그래머는 실수하기 쉽다.

`List<T>` 로 선언한 코드가 사실 `List<? extends Object>`라니! 글로벌 캐시를 사용하면서 List<BoxI>를 쓰다가 로직이 변경됨에 따라 List<BoxN>으로 코드를 변경하면 

컴파일 시점에는 문제 없다고 하겠지만 실제로 런타임에는 캐시에 저장된 값은 BoxN이기 때문에 BoxI와 캐스팅 에러가 떨어질 것이다. 

사실 이런 경우는 필연적으로 캐스팅 오류가 발생할 수 밖에 없지만 Type Erasure가 예상할 수 없는 문제를 일으킨다는 것은 분명하다.

```
임백준씨 저서인 ‘폴리글랏 프로그래밍' 에서 저자는 이러한 Type Erasure를 예로 들면서 Java의 한계에 대해 설명하고 있다.
```








 

