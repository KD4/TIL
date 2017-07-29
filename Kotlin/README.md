# Kotlin

코틀린은 Jetbrains이 만든 언어로 풀스택 언어를 지향하고있다.

풀스택 언어란 애플리케이션들의 모든 구성요소를 코틀린으로 만들 수 있다는 것을 뜻한다.

이 목표를 위해서 최신 릴리즈(2017년 7월 현재 1.1버전)버전에서 두 가지 핵심 기능을 업데이트했다.

첫번 째는, Javascript와 상호호환이다. Javascript 엔진이 한 표준 라이브러리로써 코틀린의 모든 기능을 사용할 수 있도록 업데이트되었다.
이는 기존에 사용하던 JS 코드와 함께 코틀린 문법을 사용할 수 있다는 것을 뜻한다.

두번째는 코루틴을 지원한다. 스레드의 가벼운 대체자로, 코루틴은 하나의 JVM 인스턴스에서 보다 가변적인scalable 애플리케이션 뒷단과 수많은 작업을 지원할 수 있게 해준다.

자바 개발자의 시각으로 코틀린은 바라보면 스칼라와 매우 흡사한 면이 있다. 실제로 문법도 상단부분 비슷하다.

하지만 코틀린은 스칼라를 비롯한 다른 JVM 언어에 비하면 러닝커브가 낮은 편이다. 또한 Spring과 구글 안드로이드 진영에서 코틀린을 지원한다고 말하면서

코틀린의 위상은 점점 높아지고있다. 우리나라에서는 자바의 나라니까... "앞으로 배우면 쓸모많을 언어"는 아마도 코틀린이 아닐까?

이 글에서는 코틀린 hello world 예제를 메이븐 기반으로 작성하고 문법에 대해서 간단히 적어내려가고자 한다.

## maven 프로젝트 구조
프로젝트 예제는 [여기](https://github.com/KD4/kotlin-examples-java)를 통해서 확인할 수 있다.

예제를 간단히 실행하기 위해서 우선 프로젝트를 받고 mvn test를 통해서 코틀린 파일들을 컴파일할 수 있다.

이후에 실행은 mvn exec:java 커맨드를 통해서 실행할 수 있다.

이제 프로젝트에 들어가있는 예제들에 대해서 파악해보자.

## hello world

```Kotlin
// Hello.kt
package hello

fun getHelloString() : String {
    return "Hello, world!"
}

fun main(args : Array<String>) {
    println(getHelloString())
}
```

위 예제를 통해서 코틀린에서 함수를 정의하는 법을 배워보자!

### 함수 정의

```kotlin
fun 함수이름(매개변수 이름: 매개변수 타입) : 반환 타입 {
    return 반환값
}
```

코틀린은 함수 정의를 fun으로 시작하며 매개변수의 경우에는 변수 이름이 앞에, 자료형이 뒤에 붙는 형식이다. 그리고 반환 타입을 정의하면 된다. 또한 세미콜론(;)이 없다. 세미콜론은 옵션이다. 써줘도 무방하다.

위 함수 정의를 아래처럼 간단히 할 수도있다.

```kotlin
fun 함수이름(매개변수 이름: 매개변수 타입) = 반환값
```

expression으로 사용할 경우에는 return 타입을 명시해주지 않아도 되며 return이라는 키워드도 쓰지 않아야 된다.

만약 return 키워드를 쓸 경우에는 컴파일 에러가 발생한다.

반환형이 없는 경우에는 Unit이라는 오브젝트를 반환형에 명시할 수 있다. void와 같은 개념의 키워드인데, 생략도 가능하다.

위에 정의된 main 함수 같은 경우에는 Unit이 생략된 void형 메서드이다.

### 변수 정의

예제에는 없지만 간단한 문법들을 차례대로 소개하겠다.

우선 코틀린에서 변수를 정의하는 방법이다. 코틀린에는 val와 var라는 키워드로 변수를 정의할 수 있다.

```kotlin
val one: Int = 1
val two = 2
```

val 키워드는 타입을 명시해줄 수 해줘도 되고, 컴파일러가 타입 추론을 해주기 때문에 두번째와 같이 명시 해주지 않아도 된다.

```kotlin
val one: Int = 1
one = 100 // 컴파일 에러
var two: Int = 2
two = 2 // 컴파일 가능
```
위 코드를 통해서 val와 var의 차이를 알 수 있다. val는 변경할 수 없는 변수형이다. Java에서 final이므로 다시 변수값을 할당할 수 없다.
변수 할당이 필요한 경우에는 var 키워드를 통해서 선언해야한다.

### 문자열 보간법

String Interpolation(보간법) 은 문자열 중간에 변수를 삽입할 수 있는 구조이다. Java에서는 안되던 기능인데,

Javscript에서는 사용 가능해졌다...!

```Javascript
// ES6 문법
let age = 3;
console.log(`I'm ${age} years old!`);
```

이걸, 코틀린에서 할 수 있다.


```kotlin
val hello = "hello"
println("${hello} world")
```

문법은 위와 같다.

### Elvis Operator

Null 처리는 안정성을 해칩니다. 다음과 같은 코드는 NullPointException 버그를 만들어냅니다.

```
String temp = null;

int size = temp.length;
```

이를 회피하기 위해서는 아래와 같이 작성해야합니다.

```
String temp = null;
int size = -1;
if (temp != null) {
  size = temp.length();
}
```

코틀린은 Elvis Operator를 통해서 Null Safe 한 방법을 지원합니다.

엘비스 연산자는 ? 를 통해서 구현할 수 있습니다. 여기서 이 ? 가 엘비스 헤어스타일과 닮았다고 엘비스 연산자...라는데 그렇답니다..

?는 Java에서 Nullable과 같습니다. 아래 ? 연산자 앞에 변수가 null이면 뒤에 length를 실행하지 않고 바로 null을 리턴합니다.

```kotlin
// null을 포함 할 수 있는 temp var 변수이며, null로 초기화 합니다.
var temp: String? = null

// 다음과 같이 사이즈를 체크하게 됩니다.
val size = temp?.length
```

위의 결과는 아래와 같다.

temp가 null이므로 temp.length는 실행되지 않고, null을 바로 리턴한다.

---------------------

코틀린은 현대적인 언어이다. 자바가 출시된 이후 제기된 불편함과 문제점을 해결하기 위해서 수많은 장치가 들어가 있다.
