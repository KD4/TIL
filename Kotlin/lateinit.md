# lateinit

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
