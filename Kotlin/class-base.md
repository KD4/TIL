### 기본클래스
코틀린 기본 클래스 형태는 Java와 동일하다. 함수 정의가 없다면 {}를 제외하고 아래와 같이 정의할 수 있다.

```java

class ClassName

```

### 생성자
코틀린에서 생성자 원형은 다음과 같다.

```java
class ClassName constructor(name: String) {
}
```

줄여서 다음과 같이 선언한다.

```java
class ClassName(name: String) {
}
```

### 생성자 초기화
생성자를 통해서 초기화가 필요하다면 init 블락을 사용하던가 생성자에서 초기화할 수 있습니다.

### 싱글톤을 위한 private 생성자.
```java
class PrivateConstructor private constructor() {
}
```

### 클래스 사용하기
클래스를 생성하기 위해서 Java에서는 new 키워드를 사용하게 됩니다.
new를 사용하여 다음과 같이 ClassName 클래스에 접근하여 사용할 수 있습니다.
```java
class ClassName {
}

ClassName className = new ClassName();
```

코틀린에서는 new라고 쓰지 않고도 Class 사용이 가능합니다.
아래와 같이 해당 클래스의 생성자만 정의하면 바로 사용이 가능합니다.

```java
class ClassName {
}
val className = ClassName()
```

### 상속
코틀린에서는 abstract와 interface에 대한 별도 구분 없이 상속과 구현을 : 으로 합니다.
```java
open class Base(age: Int)

// open으로 생성한 추상 클래스를 다음과 같이 사용
class UseBase(age: Int) : Base(age)
```

### 함수 오버라이딩

```java
interface BaseItem {
    fun onStart()
}

open class Base {
    open fun v() {}
    fun nv() {}
}

class AbstractBase() : Base(), BaseItem {
    // Base의 open 키워드를 통해 상속을 구현
    override fun v() {}
    // Interface에서 구현한 상속
    override fun onStart() {}
}
```

### Open 키워드 활용

kotlin에서 사용하게 되는 open 키워드는 다음과 같습니다.

java에서는 상속의 재 정의를 방지하기 위해 final을 사용합니다.
kotlin에서는 반대로 상속의 재 정의를 허용하기 위해서 open을 사용합니다.
java에서는 final을 통해서 상속의 재 정의를 막지만 kotlin에서는 open을 이용하여 함수의 재 정의를 할 수 있도록 허용합니다.

open 클래스의 open 함수가 있다면, 이는 상속을 받아 재 정의가 가능한 형태가 제공됩니다.

그래서 다음과 같이 open 클래스를 구현하게 되면 v()는 재 정의가 가능하고, nv()는 재 정의가 불가능한 형태가 만들어집니다.

```java
open class Base {
    open fun v() {
        print("ABC")
    }
    fun nv() {}
}
```

open은 변수에서도 사용이 가능한데 다음과 같습니다.

```java
open class Foo {
  open val x: Int get { ... }
}
class Bar(override val x: Int) : Foo() {

}
```
위의 코드를 예제로 작성하면 다음과 같고 실행하면 12라는 결과를 얻을 수 있습니다.

```java
fun main(args: Array<String>) {
    print(C(12).x)
}

open class A {
    open val x: Int = 0
}

class C(override val x: Int) : A() {
}
```

### 추상클래스 정의
kotlin에서도 기본 Abstract은 동일하게 구현하게 됩니다.

```java
abstract class BaseUse(name: String) {

    init {
        updateName(name)
    }

    protected abstract fun updateName(name: String)
}


// Base를 상속 받는 클래스
class UseName(name: String) : BaseUse(name) {

    override fun updateName(name: String) {
        // 정의
    }
}
```

추가로 kotlin의 open class를 추가하여 다음과 같이 확장도 가능합니다.

```java
open class Base {
  open fun f() {}
}

abstract class AbstractBase : Base() {
  override abstract fun f()
}
```

open 클래스의 f() 함수는 override가 가능한 형태입니다. 이를 AbstractBase에서 상속받고, abstract으로 확장할 수 있습니다.

### static 메소드 구현

kotlin에서는 companion 키워드를 사용하여 구현하게 됩니다.

```java
// 생성자 private 처리
class ClassName private constructor() {

  // 외부에서 static 형태로 접근 가능
  companion object {
    fun getInstance() = ClassName()
  }
}

// Use kotlin
val className = ClassName().getInstance()
// Use java
ClassName className = ClassName.Companion.getInstance();
```
