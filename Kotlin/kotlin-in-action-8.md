고차 함수: 파라미터와 반환 값으로 람다 사용
===========================

#### 함수 타입을 사용해 함수에 대한 참조를 담는 변수나 파라미터나 반환 값을 만들 수 있다.

#### 고차 함수는 다른 함수르르 인자로 받거나 함수를 반환한다. 함수의 파라미터 타입이나 반환 타입으로 함수 타입을 사용하면 고차함수를 선언할 수 있다.

#### 람다를 인자로 받는 함수를 정의하려면 먼저 람다 인자의 타입을 어떻게 선언할 수 있는지 알아야 한다.

```kotlin
val sum: (Int, Int) -> Int = { x, y -> x + y} // Int 파라미터를 2개 받아서 Int 값을 반환하는 함수
val action: () -> Unit = { println(42) } // 아무 인자도 받지 않고 아무 값도 반환하지 않는 함수
```

#### 간단한 고차 함수 만들기

```kotlin
fun twoAndThree(operation: (Int, Int) -> Int) {
    val result = operation(2, 3)
    println("The result is $result")
}
>> twoAndThree { a, b -> a + b }
The result is 5
>> twoAndThree { a,b -> a * b }
The result is 6
```

#### 코틀린이 보통 람다를 무명클래스로 컴파일하지만 그렇다고 람다식을 사용할 때마다 새로운 클래스를 생성하지는 않는다. 만약 람다가 변수를 포획한다면 새로운 클래스를 만든다. 이런 경우 실행 시점에 무명 클래스 생성에 따른 부가비용이 든다. 

#### 인라인 함수를 컴파일할 때 컴파일러는 그 함수의 본문과 그 함수에게 전달된 람다의 본문을 컴파일한 바이트코드를 모든 함수 호출 지점에 삽입해준다. 이렇게 만들어지는 바이트코드는 람다를 활용한 인라인 함수 코드를 풀어서 직접 쓴 경우와 비교할 때 아무 부가 비용이 들지 않는다.

#### 컬렉션 인라인 함수는 대부분 효율적이다. 단 사이즈가 큰 경우, 연속된 함수를 사용하면 중간 연산 배열이 생성되기 때문에 asSequnce를 사용하는 것이 좋다.

#### use 함수는 닫을 수 있는 자원에 대한 확장함수며 람다를 인자로 받는다. use는 람다를 호출한 다음에 자원을 닫아준다.

#### 고차 함수를 사용하면 컴포넌트를 이루는 각 부분의 코드를 더 잘 재사용할 수 있다. 또 고차 함수를 활용해 강력한 제네릭 라이브러리를 만들 수 있다.

#### 인라인 함수에서는 람다 안에 있는 return 문이 바깥쪽 함수를 반환시키는 넌로컬 return을 사용할 수 있다.

```kotlin
fun lookForAlice(people: List<Person>) {
    people.forEach label@ {
        if (it.name == "Alice") return$label // 앞에서 정의한 레이블 참조 후 리턴
    }
    println("Alice might be somewhere")
}
```

#### 무명 함수는 람다 식을 대신할 수 있으며 return 식을 처리하는 규칙이 일반 람다 식과는 다르다. 본문 여러 곳에서 return해야 하는 코드 블록을 만들어야 한다면 람다 대신 무명 함수를 쓸 수 있다.