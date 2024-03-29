람다로 프로그래밍
======================

#### run은 인자로 받은 람다를 실행해주는 라이브러리 함수다.

```kotlin
>>> run {println("42")}
42
```

#### 코틀린에는 함수 호출 시 맨 뒤에 있는 인자가 람다식이라면 그 람다를 괄호 밖으로 빼낼 수 있다는 문법 관습이 존재한다.

```kotlin
people.maxBy() { p: Person -> p.age}
people.maxBy({p: Person -> p.age})
```

#### 본문이 여러 줄로 이뤄진 경우 본문의 맨 마지막에 있는 식이 람다의 결과값이 된다.

```kotlin
>>> val sum { x: Int, y: Int ->
    println("Computing the sum of $x and $y...")
    x + y
}
>>> print(sum1, 2))
Computing the sum of 1 and 2...
3
```

#### 람다를 함수 안에서 정의하면 함수의 파라미터 뿐 아니라 람다 정의의 앞에 선언된 로컬 변수까지 람다에서 모두 사용할 수 있다.

이건 클로저 개념.

#### ::를 사용하는 식을 멤버 참조라고 부른다.

넘기려는 코드가 이미 함수로 선언된 경우는 이 함수 레퍼런스를 넘겨주기 위해서 멤버 참조, 이중콜론을 사용한다.

```kotlin
val getAge = Person::age
```

#### filer 함수는 컬렉션을 이터레이션하면서 주어진 람다에 각 원소를 넘겨서 람다가 true를 반환하는 원소만 모은다.

#### map 함수는 주어진 람다를 컬렉션의 각 원소에 적용한 결과를 모아서 새 컬렉션을 만든다.

#### 맵의 경우는 키와 값을 처리하는 filter와 map이 존재한다.

#### count는 조건을 만족하는 원소의 개수만 추적하고 원소를 저장하지 않으므로 filter 후 size 프로퍼티를 확인하는 것보다 효율적이다.

#### groupBy: 특성을 전달하면 특성대로 구분해주는 함수

#### flatMap은 먼저 인자로 주어진 람다를 컬렉션의 모든 객체에 적용하고 람다를 적용한 결과 얻어지는 여러 리스트를 한 리스트에 모은다.

#### 컬렉션 함수는 결과 컬렉션을 즉시 생성한다. 이는 컬렉션 함수를 연쇄하면 매단계마다 계산 중간결과를 새로운 컬렉션에 임시로 담는다는 말이다. 시퀀스를 사용하면 중간 임시 컬렉션을 사용하지 않고도 컬렉션 연산을 연쇄할 수 있다.

```
>>> people.asSequnce()
      .map(Person::name)
      .filter { it.startWith("A")} // 중간연산
      .toList() // 결과 연산
```

#### 결과연산이 실행될 때 비로소 원소 하나씩 차례대로 연산된다.

#### 시퀀스는 자바8스트림과 같은 개념이다.

#### 코틀린은 함수형 인터페이스를 인자로 취하는 자바 메소드를 호출할 때 람다를 넘길 수 있다.

#### 코틀린 컴파일러가 코틀린 람다를 함수형 인터페이스로 변환해주지는 않는다.

#### with 함수는 첫 번째 인자로 받은 객체를 두 번째 인자로 받은 람다의 수신객체로 만든다. with는 실제로 파라미터가 2개 있는 함수로 코틀린 관례에 따라 두번째 인자는 밖으로 빼쓴다.

#### apply 함수는 거의 with와 같다. 차이는 apply는 항상 자신에게 전달된 수신객체를 반환한다는 점이다.

#### buildString의 인자는 수신객체지정 람다며, 수신객체는 항상 stringbuilder가 된다.

