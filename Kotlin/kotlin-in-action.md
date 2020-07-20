Kotlin in action 
===============================

코틀린 인 액션 1부 1~6장 요약

### 변수 선언

val 은 이뮤터블한 변수를 선언하기 위한 키워드로 value의 약어이다.

var 은 뮤터블한 변수를 선언하기 위한 키워드로 variable의 약어이다.

### 스마트캐스트
is 키워드 블록을 통해서 instance of에 해당하는 연산을 수행하고 블록이 있다면 그 블록 안에서 해당 변수의 타입을 추론하는 매커니즘을 말한다.

### 반복문

do, while 문은 자바와 같다. for 문 안에서 쓰이는 in, downTo, step, until 등 키워드가 있다.
자바스크립트에서 사용되는 방식과 유사하다. 

maps에 대한 반복문 안에서 in 키워드를 통해 key, value 값을 디스트럭칭할 수 있다.

```kotlin
for ((key, value) in tempMap) {
    println("$key : $value")
}
```

### 조건문

in 으로 컬렉션이나 범위의 원소 검사를 할 수 있다. 

```kotlin
fun isLetter(c: Char) = c in 'a' .. 'z' || c in 'A' .. 'Z'
```

```
c in 'a' .. 'z'
```
구문은 a <= && c<= z 와 같다.

### 코틀린의 예외 처리

기본 예외처리는 자바와 유사하다.

```kotlin
val percentage = 
    if (number in 0..100)
        number
    else
        throw IllegalArgumentException("A percentage value must be between 0 and 100: $number")
```

throw도 expression이므로 다른 expression에 포함될 수 있다.

```kotlin
fun readNumber(reader: BufferedReader) : Int? {
    try {
        val line = reader.readLine()
        return Integer.parseInt(line)
    } catch (e: NumberFormatException) {
        return null
    } finally {
        reader.close()
    }
}
```

- readLine 구문이 있지만 IOexception에 대한 처리가 없다. 코틀린에는 CheckedException과 UncheckedException에 대한 구분이 없다.
- 코틀린에는 try-with-resources 구문이 없다. ( 라이브러리 사용 )

#### try 도 표현식이다.
```kotlin
fun readNumber(reader: BufferedReader) {
    val number = try {
        Integer.parseInt(reader.readLine())
    } catch (e: NumberFormatException) {
        null
    }

    println(number)
}
```

- try 구문도 expression이므로 값을 가지고 있다.
- block 구문이 사용되면 가장 마지막 값이 전체 결과값이 된다.


## 코틀린에서 컬렉션 만들기

```kotlin
val set = hashSetOf(1, 7, 53)
val list = arrayListOf(1, 7, 53)
// to 키워드를 사용해서 손쉽게 map을 초기화할 수 있다.
val map = hashMapOf(1 to "one", 7 to "seven", 53 to "fifty-three")
```

- 코틀린의 컬렉션은 자바의 컬렉션이다. 

```kotlin
set.javaClass is java.util.HashSet
list.javaClass is java.util.ArrayList
map.javaClass is java.util.HashMap
```

- 하지만 콜렉션프레임워크에는 없는 기능을 제공하기도 한다.

```
val strings = listOf("first", "second", "third")
println(strings.last())
// third
val numbers = setOf(1, 14, 2)
println(numbers.max())
// 14
```


## 함수를 호출하기 쉽게 만들기

함수 리펙토링을 통해서 코틀린의 유용한 기능을 탐험하자~

```kotlin
fun <T> joinToString(
    collection: Collection<T>,
    separator: String,
    prefix: String,
    postfix: String
): String {
    val result = StringBuilder(prefix)

    for ((index, element) in collection.withIndex()) {
        if (index > 0) result.append(separator)
        result.append(element)
    }

    result.append(postfix)

    return result.toString()
}
```

#### Named Argments

```kotlin
joinToString(collection, separator = " ", prefix = " ", postfix = " ")
```

각 아규먼트가 어떤 매개변수에 매핑되는지 알 수 있다면 훨씬 더 가독성이 좋아질텐데, 코틀린에서는 아규먼트 명명화를 지원한다. (단, 자바에서 정의된 함수를 안된다.)

- 디폴트 파라미터가 있으면 해당 인자는 생략될 수 있다.
- 네임드 파라미터를 사용하면 순서에 상관없이 중간 인자를 생략할 수 있다. 

#### class 없이 메소드 정의하기

- 자바에서는 모든 함수가 클래스 안에 정의되어 있는데, 유틸리티 함수를 모아두는 클래스와 같이 굳이 클래스가 필요없는 경우가 있다( 대게 static 한 메소드들 )
- 코틀린에서는 함수가 클래스의 밖- 최상위 수준에 있을 수 있다.

```kotlin
// file name: join.kt
package strings

fun joinToString(...): String { ... }
```

그럼 위와 같은 탑레벨 함수는 어떻게 컴파일될까?

```java
/* java */
package strings

public class JoinKt {
    public static String jointToString(...) { ... }
}
```

- 결국 컴파일 했을 땐 유틸리티 클래스가 생김. 클래스 이름은 소스 파일명에 대응됨.
- 흔히 사용되지는 않지만 같은 방법으로 프로퍼티도 정의될 수 있다.

#### Constant 상수 선언

static final 에 해당하는 상수를 선언하려면 const 키워드를 붙여줘야한다.


## 메소드를 다른 클래스에 추가하기

Extension Function 은 이미 정의된 클래스에 메소드를 끼워넣을 수 있는 방법이다. 

```kotlin
fun String.lastChar(): Char = this.get(this.length - 1)
```

- 함수 body에서 this 는 왼쪽 수신 객체를 지칭한다.
- 따라서 this를 통해서 수신 객체에 프로퍼티나 메소드에 접근할 수 있다. 
- 하지만 extention function 에서는 private 멤버나 protected 멤버에는 접근할 수 없다.
- this는 생략될 수 있다.
- 확장 함수는 static 메소드로 컴파일되므로 자바 파일 안에서도 호출 가능하다.
- 우선순위* 수신 클래스에 동일한 함수명이 있다면 이 함수가 우선순위가 높으므로 확장함수는 동작하지 않는다.

Extension Properties 도 있다. 
- 기존 클래스 객체에 프로퍼티를 확장할 수 있지만 실제 상태는 없다.
- 실제 상태는 없으므로 getter를 구현해줘야한다.

```kotlin
val String.lastChar: Char
    get() = get(length - 1)
```


## 가변인자 활용법 (varargs)

listOf 메소드는 아래와 같이 정의되어 있다.

```kotlin
fun <T> listOf(vararg values: T): List<T> { ... }
```

- 가변 인자 정의로 ... 를 사용하는 자바와는 달리 vararg 라는 키워드를 사용한다.

### Spread

- spread: 가변 길이 인자를 받는 함수에 배열을 넘길 때는 spread 연산자(*) 로 배열의 내용을 풀어서 전달할 수 있다.

### infix calls
map 을 선언할 때 to 키워드를 사용했는데 아래와 같은 형태의 호출을 infix call이라 부른다.

```kotlin
val map = mapOf(1 to "one", 2 to "two")
```

이 방식에서는 수신객체와 유일한 메서드 인자 사이에 메서드 이름을 넣는다. 즉 infix calls로 호출될 수 있는 메서드는 인자가 하나여야한다.

1.to("one") <= to 함수를 일반적인 방법으로 호출하는 경우

2 to "two" <= to 함수를 infix 개념으로 호출하는 경우

```kotlin
infix fun Any.to(other: Any) = Pair(this, other)
```

- 위 함수의 정의처럼 infix modifier를 함수에 붙여주면 이 함수를 infix call 매커니즘으로 호출 가능

#### String

- 기본적으로 자바와 코틀린의 String 클래스는 같아서 특별히 변환이 필요 없다.
- 다양한 확장 함수가 추가됐다

## 코틀린 인터페이스

```kotlin
interface Clickable {
    fun click()
}

class Button : Clickable {
    override fun click() = println("I was clicked")
}
```

- 클래스 이름 뒤에 extends, implements 키워드 대신 ':' 를 사용한다.
- 인터페이스는 여러 개 구현할 수 있고 클래스는 하나만 상속 가능
- 인터페이스에 정의된 메소느는 반드시 오버라이딩해서 구현해야한다.


### interface default method 

- 인터페이스에 메소드를 정의할 때 default 구현을 정의할 수 있다.

```kotlin
interface Clickable {
    fun click()
    fun showOff() = println("I'm clickable!")
}
```

- 다중 상속은 문제는 아래와 같이 명시적인 구현을 통해서 해결할 수 있다.

```kotlin
class Button : Clickable, Focusable {
    override fun click() = println("I was clikced")
    override fun showOff() {
        super<Clickable>.showOff()
        super<Focusable>.showOff()
    }
}
```

## 상속 제한자


- final : 오버라이딩 불가능, 클래스 멤버에 기본적으로 할당됨
- open : 오버라이딩 가능, 오버라이딩이 필요하다면 명시
- abstract : 오버라이딩 필수, abstract class에서 사용될 수 있음
- override : 부모 클래스나 인터페이스의 멤버를 오버라이딩 할 때 사용

- 코틀린의 클래스와 메서드는 기본적으로 final이다
- 상속 가능한 클래스 형태로 만들려면 open 키워드를 붙어야한다. 

```kotlin
open class RichButton : Clickable {
    fun disalbe() {} // this function is final, you can't override it in a subclass
    open func animate() {} // but this can be overrided by open keyword.
    override fun click() {} // this function has declared with open keyword.
}

```

## 접근 제한자

- public (default): 어디서든 볼 수 있음
- internal : 모듈에서만 접근 가능
- protected : 서브클래스에서만 접근 가능
- private : 해당 클래스에서만 접근가능


## Inner and nested classes

- 코틀린에서는 class안에 class를 선언하면 기본적으로 nested class가 생성된다. 즉 외부 참조를 할 수 없는 static inner class와 같은 class이다. 

- 그냥 평범한 inner class를 만들려면 inner 키워드를 붙여줘야한다.

### Sealed class
- 외부파일에서 참조가 불가능하도록 클래스 정의하기


## primary constructor and initalizer block

```kotlin
class User constructor(_nickname: String) {
    val nickname: String

    init {
        nickname = _nickname
    }
}
```

- primary constructor 는 클래스 이름 뒤에 기재한다.
- 초기화 코드는 init block 안에 기재한다.

### primary constructor 간략화

```kotlin
class User(_nickname: String) {
    val nickname = _nickname
}
```

프로퍼티에 val 키워드가 붙으면 초기화 블럭이 필요없다.

```kotlin
class User(val nickname: String)
```


## superclass 생성자 호출

```kotlin
open class User(val nick: String) { ... }
class TwitterUser(nick: String) : User(nick) { ... }
```

슈퍼 클래스를 가지고 있다면 슈퍼 클래스의 생성자를 위와 같이 호출하면서 상속해야한다.

- 생성자를 선언하지 않은 슈퍼클래스라도 빈 생성자가 있기 때문에 호출해야한다.


## Abstract property

```kotlin
interface User {
    val nickname: String
}
```
- 인터페이스에 abstract property를 선언할 수 있다.

이 프로퍼티를 재정의하는 방법은 다음과 같다.

```kotlin
// primary constructor property
class PrivateUser(override val nickname: String) : User
// custom getter
class SubscribingUser(val email: String) : User {
    override val nickname: String
        get() = email.substringBefore('@')
}
// property initializer
class FacebookUser(val accountId: Int) : User {
    override val nickname = getFacebookName(accountId)
}
```

### interface 내 getter/setter 활용

```kotlin
interface User {
    val email: String
    val nickname: String
        get() = email.substringBefore('@')
}
```
- 인터페이스도 구현을 가질 수 있으나 backing field가 없다.
- nickname은 구현이 있기 때문에 하위 클래스가 override할 필요가 없다.

## Accessing a backing field

```kotlin
class User(val name: String) {
    var address: String = "unspecified"
        set(value: String) {
            println("""
                Address was changed for $name:
                "$field" -> "$value".""".trimIndent() 
                )
            field = value
        }
}
```

- setter 에서 해당 객체에 프로퍼티를 설정하고 싶을 때 backing field 사용.


## 동등성 비교

- 코틀린에서 동등성 비교에 ==를 사용하게 되는데, 이는 자동으로 java 의 equals를 호출하는 것과 같다.
- 레퍼런스 비교(동일성 체크)를 하려면 ===를 사용한다.

## data 클래스
- 간단히 말해서 DTO 클래스를 만들어주는데 이는 equals, hashCode, toString 등 여러 메소드를 자동으로 생성해준다.
- 데이터 클래스 프로퍼티는 val일 필요는 없지만 불변 객체를 지향하므로 val를 사용하는게 좋다. 
- 또 불변객체를 지향하기 때문에 data class는 copy 메서드가 제공된다. 

## 구현 위임

- by 키워드: 인터페이스나 슈퍼 클래스의 추상 메소드 구현을 특정 클래스에 위임할 수 있다.

```kotlin
class DelegatingCollection<T> {
    innerList: Collection<T> = ArrayList<T>()
} : Colllection<T> by innerList {}
```

- by 키워드를 사용해도 해당 클래스에서 직접 메서드를 구현할 수 있다(override 사용)

## Object 키워드 : 싱글톤

- Object 선언은 싱글톤으로 객체를 선언하는 방법이다.
- Object 키워드를 사용하면 해당 클래스와 관련된 유틸성 메소드(팩토리)를 자동으로 만들어준다. 
- 자바의 익명 클래스와 매칭

### 싱글톤으로 사용하면

- 객체 선언은 object 키워드로 시작한다.
- 객체는 singleton이다
- 프로퍼티, 메서드, 초기화 블럭을 쓸 수 있지만 생성자는 못쓴다.

- 일반적인 class로 사용 가능

## Companion object : factory method
- class안에 object를 선언하고 companion이라고 앞에 명시하면 익명 object가 만들어진다. 

```kotlin
class A {
    companion object {
        fun bar() {
            println("Companion object called)
        }
    }
}

>>> A.bar()
```
- companion object는 object 이름없이 class 이름으로 지칭될 수 있다.

#### factory method 로 활용
- companion object는 팩토리 메소드로 활용하기 적합하다.

```kotlin
class User private constructor(val nickname: String) {
    companion object {
        fun newSubscribingUser(email: String) = 
            User(email.substringBefore('@'))
        
        fun newFacebookUser(accountId: Int) = 
            User(getFacebookName(accountId))
    }
}

val subscribingUser = User.newSubscribingUser("bob@gmail.com")
```

- name을 붙일 수 있다. 호출 시 해당 네임을 명시적으로 적어주거나, 생략 가능

- 외부에서 동반객체를 가리키기 위해서 Companion이라는 키워드를 사용할 수 있고, 이를 통해 확장 함수 정의가 가능하다.

## 람다식의 문법

```kotlin
{ x: Int, y: Int -> x + y }
```

- 파라미터와 바디로 구성됨
- 항상 중괄호로 감싸져있음

람다식 문법에 따라 리스트의 maxBy 함수를 호출하면 아래와 같다

```kotlin
tempList.maxBy({ p: Person -> p.age })

// 가장 마지막 인자가 람다식이면 ()를 밖으로 뺄 수 있고
tempList.maxBy() { p: Person -> p.age }

// 괄호 인자가 람다식 하나면 아예 뺄 수 있다.
tempList.maxBy { p: Person -> p.age }
```

#### 더 간략화

함수의 인자로 쓰일 때 일반적으로 람다 파라미터의 타입은 유츄할 수 있다.

```kotlin
tempList.maxBy { p -> p.age }

// 이때 파라미터가 하나 뿐이라면 it 키워드 사용 가능
tempList.maxBy { it.age }
```

- 람다가 여러줄로 기술된 경우 가장 마지막 expression이 결과값이 된다.

```kotlin
val sum = { x: Int, y: Int ->
        println("hi")
        x+y 
    }
```

### lambda의 스코프

- 람다는 클로저를 생성한다.
- 따라서 상위 스코프를 가져갈 수 있다.

## Member references

#### "::"
- "::" 표현을 이용해서 멤버 메소드를 호출하거나 멤버 프로퍼티를 참조할 수 있다.

```kotlin
var getAge = Person::age

fun salute() = println("Salute!!")

run(::salute)

val createPerson = ::Person
val p = createPerson("Alice", 29)
println(p)
```

## Bound references

- Member reference 는 클래스 인스턴스를 인자로 주어야할 때가 있다.
- Bound reference를 생성하면 클래스 인스턴스도 같이 참조되기 때문에 인자가 필요없다.

```kotlin
val p = Person("Dmitry", 34)
val personAgeFunction = Person::age
println(personAgeFunction(p))

val dmitrysAgeFunction = p::age
println(dmitrysAgeFuncion())
```

## Functional interface

= SAM(Single Abstract Method) interface라고 한다.

- 코틀린에서는 자바 함수가 functional interface를 인자로 받는 경우 lambda 식으로 인자를 넘겨줄 수 있다.

## Lambdas with receivers

- 범위 지정 함수이다. 

### 수신 객체 지정 람다 with

with는 아래와 같이 정의된다.

```kotlin
inline fun <T, R> with(receiver: T, block: T.() -> R): R {
    return receiver.block()
}
```

- 위 정의를 보면 알 수 있지만 receiver에 확장함수를 넣어주는 것과 같은 역할을 한다.
* 확장함수 아시죠?

- with 함수를 사용하면 람다구문 내의 this를 바꿀 수 있다. 즉 수신객체를 지정할 수 있다.

```kotlin
fun alphabet(): String {
    val stringBuilder = StringBuilder()

    return with(stringBuilder) {
        for (letter in 'A'..'Z') {
            this.append(letter)
        }

        append("\nNow I know the alphabet")
        this.toString()
    }
}

```

### 람다 apply

- apply 확장 함수는 with와 비슷하지만 자신에게 전달된 객체를 다시 반환한다.
```kotlin
fun alphabet() = StringBuilder().apply {
    for (letter in 'A'..'Z') {
        append(letter)
    }

    append("\nNoew I Know the alphabet!!")
}.toString()
```


#### apply 사용 규칙

코틀린 공식 문서에 모범 사례에 의하면 apply는 수신 객체 람다 내부에서 수신 객체의 함수를 사용하지 않고 수신 객체 자신을 다시 반환하려는 경우에 apply를 사용한다. 그러면 위 예제는 틀렸나?

```kotlin
val peter = Person().apply {
    // apply 의 블록에서는 오직 프로퍼티만 사용한다!
    name = "Peter"
    age = 18
}
```

#### also 사용 규칙
수신 객체 람다가 전달된 수신 객체를 전혀 사용하지 않거나 수신 객체의 속성을 변경하지 않고 사용하는 경우 also를 사용한다. also는 apply와 마찬가지로 수신객체를 반환하므로 블록 함수가 다른 값을 반환해야 하는 경우에는 also를 사용할 수 없다.

해당 객체의 유효성 검사를 할 때 유용하다.


```kotlin
class Book(author: Person) {
    val author = author.also {
        requireNotNull(it.age)
        print(it.name)
    }
}
```

#### let 사용 규칙

- 지정된 값이 null이 아닌 경우에 코드를 실행해야 하는 경우
- nullable 객체를 다른 nullable 객체로 변환하는 경우
- 단일 지역 변수의 범위를 제한하는 경우

### with 사용 규칙
- Non-nullable 수신 객체이고 결과가 필요하지 않은 경우에는 with를 사용한다.


## Nullable

#### Nullable in Java

```java
int strLen(String s) {
    return s.length();
}
```
- 자바에서 선언된 위 함수의 인자인 s에는 null이 들어갈 수 있다.
- 따라서 위 코드는 null safe하지 않다.

- 코틀린에서는 null이 가능한 타입과 그렇지 않은 타입이 구분된다.
- 아래와 같이 String이라고 선언된 regular type에는 String instance가 할당되어야 한다. null은 할당할 수 없다.

```kotlin
fun strLen(s: String) = s.length
>> strLen(null)
ERROR: Null can not be a value of a non-null type String
```

- null을 할당할 수 있는 타입에는 non-null 타입 이읆 뒤에 '?'가 붙는다.

```kotlin
fun strLenSafe(s: String?): Int = 
    if (s != null) s.length else 0
```

### Safe call operator: "?."

foo?.bar() 은 foo != null ? for.bar() : null 과 같은 뜻

### Elvis operator: "?:"

foo ?: bar 는 Optional.nullable(foo).else(bar)와 같은 뜻

이를 활용해 예외를 던질 수 있다.

```kotlin
val address = person.company?.address ?: throw IllegalArgmentException("No address")
```

### Safe casts: "as?"

foo as? Type 은 foo 가 Type일 때 foo as Type 연산을 실행하고 아니면 null을 반환하는 안전 캐스팅 연산자

```kotlin
val otherPerson = o as? Person ?: return false

return otherPerson.firstName == firstName && otherPerson.lastName == lastName
```

### Not-null assertions: "!!"

foo!! 는 for != null 면 foo를 반환하고 foo가 null이면 NPE 떨구는 연산자

### let과 ?. 활용

- let 구문은 수신객체를 인자로 받는 람다식을 실행해준다.
- safe-call operator ?. 와 함께 사용하면 null check 방식을 단순화 시켜준다.

```kotlin
if (email != null) sendEmail(email)

email?.let { email -> sendEmail(email) }

email?.let { sendEmail(it) }
```

## lateinit

코틀린에서는 class 변수를 명시적으로 초기화를 하거나 var subject: String? = null이라고 명시해야한다.

```java
class Test {
 var subject: String
 init {
      subject = ""
 }
}
//혹은
class Test {
 var subject: String = ""
 // 또는
 var subject = "" // 묵시적으로 String으로 유추 가능
}
```

lateinit는 위와 같이 선언할 때 초기화하는 것이 아니라 사용하는 시점에 초기화가 된다는 명시입니다.

```java
class Test {
lateinit var subject: String
}
```

lateinit 사용 시 주의해야할 부분은 아래와 같습니다.
- var(mutable)만 사용가능
- null을 사용해서 초기화 불필요
- 늦은 초기화이므로 초기화 전에 사용하면 오류 발생
- 변수에 대한 setter/getter를 사용할 수 없음


lateinit은 아래와 같이 사용될 수 있습니다.

lateinit을 사용하려면 아래와 같이 초기화하고, 이를 아래와 같이 사용할 수 있습니다.

```java
fun main() {
 val test = Test()
 test.subject = "제목 초기화"
 println("subject ${test.subject}")
}

class Test {
 lateinit var subject: String
}
```

그래서 위와 같이 초기화 가능합니다.

null / ""으로 initialized 해줄 필요가 없습니다.

## Nullable Type을 위한 확장 함수 활용

```kotlin
fun String?.isNullOrBlank() : Boolean = 
    this == null || this.isBlank()

fun verifyUserInput(input: String?) {
    if (input.isNullOrBlank()) {
        println("Please fill in the required fields")
    }
}
```

## 상속

```java
interface StringProcessor {
    void process(String value);
}
```

위와 같이 정의된 인터페이스를 코틀린에서 상속할 때 아래 두가지 방식 모두 가능하다.

```kotlin
class StringPrinter : StringProcessor {
    override fun process(value: String) { println(value) }
}

class StringPrinter : StringProcessor {
    override fun process(value: String?) { 
        value?.let { println(it) }
    }
}
```


## 코틀린의 타입

코틀린 타입은 자바와 달리 래퍼런스 클래스와 그 기본 타입들이 다르지 않다.

- 정수형 타입 : Byte, Short, Int, Long
- 실수형 타입 : Float, Double
- 문자형 타입 : Char
- 논리형 타입 : Boolean

대략 자바의 래퍼클래스처럼 사용된다?

#### 타입 변환

- 코틀린은 숫자를 다른 타입의 숫자로 자동으로 바꾸어 주지 않기 때문에 변환 메소드를 사용해야한다.

```kotlin

val i = 1
val l: Long = i // Error: type mismatch

val l: Long = i.toLong()
```

- 단순 숫자 리터럴을 사용할 때는 변환 함수를 사용하지 않아도 자동으로 변환해준다.

### 리터럴 기본 타입

- Long은 뒤에 L 붙인다.
- Double은 .을 붙인다.
- Float는 f나 F를 뒤에 붙인다.
- Hexadecimal 은 0x나 0X를 앞에 붙인다. 
- Binary는 0b나 0B를 앞에 붙인다.

## Any, Any? 부모 타입

- 자바에서의 Object 타입처럼 코틀린에서는 Any가 모든 객체의 조상 타입이다.
- 자바와는 달리 primitive type들도 Any를 조상으로 가진다.
- nullable type의 경우는 Any?를 조상으로 가진다.
- 코틀린 코드가 Any를 사용하면 자바 바이트코드로는 Object로 변환된다.

## Unit Type = void
- 코틀린 Unit type은 자바의 void와 같은 역할을 한다.
- 이는 생략 가능하다.

```kotlin
fun f(): Unit {...}
fun f() {...}
```

- void와 달리 Unit은 실제로 리턴되는 타입으로, 생략해도 결국엔 이 Unit 타입이 리턴된다는 뜻이다. 
- 제네릭스에서 Unit을 명시하는 경우가 있다.

## Nothing Type

- 의미: 아무것도 반환하지 않는 함수

```kotlin
fun fail(message: String): Nothing {
    throw IllegalStateException(message)
}
```

## Arrays of Objects and primitive types

```java
int[] intArray = new int [] { 1, 2, 3, 4 }
```

```kotlin
val intArray: Array<Int> = arrayOf(1,2,3,4)
```
- 코틀린의 배열은 타입파라미터를 받는 클래스
- arrayOf, arrayOfNulls, 등의 생성자로 array를 만들 수 있다.


## Creating Array

```kotlin
val letters = Array<String>(26) {
    i -> ('a'+i).toString()
}
```

- IntArray, ByteArray, CharArray 등의 원시 타입 배열을 이용하면 box 타입이 아닌 int[], byte[], char[] 등으로 컴파일된다. 

## Storing Properties

표준 라이브러리의 Map과 MutableMap에 대해서 getValue와 setValue확장함수가 구현되어 있어 map으로 property delegate할 수 있다.

```kotlin
class User(val map: Map<String, Any?>) {
    val name: String by map
    val age: Int by map
}

val user = User(mapOf(
    "name" to "John Doe",
    "age" to 25
))
println(user.name) // Prints "John Doe"
println(user.age) // Prints 25
```

## 고차 함수 정의

- 고차함수(Higher-Order Functions)은 함수를 인자로 받거나 함수를 반환하는 함수를 말한다.
- 함수 타입을 사용해 함수에 대한 참조를 담는 변수나 파라미터나 반환 값을 만들 수 있다.
- 인라인 함수를 컴파일 할 때 컴파일러는 그 함수의 본문과 그 함수에게 전달된 람다의 본문을 컴파일한 바이트코드를 모든 함수 호출 지점에 삽입해준다. 이렇게 만들어지는 바이트코드는 람다를 활용한 인라인 함수 코드를 풀어서 쓴 경우와 비교할 때 아무 부가 비용이 들지 않는다.
- 고차 함수를 사용하면 컴포넌트를 이루는 각 부분의 코드를 더 잘 재사용할 수 있다. 또 고차 함수를 활용해 강력한 제네릭 라이브러리를 만들 수 있다.
- 인라인 함수에서는 람다 안에 있는 return문이 바깥쪽 함수를 반환시키는 넌로컬 return을 사용할 수 있다.
- 무명함수는 람다식을 대신할 수 있으며 return식을 처리하는 규칙이 일반 람다식과 달라서 로컬 return이 가능하다.

