## 1장 코틀린 코루틴을 배워야 하는 이유

비동기적 연산을 수행하는 다른 방법들과 코루틴의 성능, 가독성 등을 비교한다.

- 코루틴 개념이 처음 제시된 건 1963년 "Design Of a Separable Transaction-Diagram Compiler" 논문
- Coroutine은 컴퓨터 프로그램에서 엔트리 포인트가 여러 개인 Subroutine이다. 그래서 어디서든지 잠시 멈췄다가 다시 이어서 실행할 수 있다.

### 스레드 전환 방식

```
fun onCreate() {
    thread {
        val news = getNewsFromApi()
        val sortedNews = news.sortedByDescending { it.publishedAt }
        runOnUiThread {
            view.showNews(sortedNews)
        }
    }
}

```

- 멈출 수 있는 방법이 없어 메모리 누수로 이어질 수 있다.
- 비용이 많이 든다.
- 복잡도가 증가되며 관리하기도 어려워짐
- 코드 가독성이 안좋음

### 콜백 방식

```
fun showNews() {
    getConfigFromApi { config ->
        getNewsFromApi(config) { news ->
            getUserFromApi { ->
                view.showNews(user, news)
            }
        }
    }
}

```

- 콜백은 두 가지 작업을 동시에 처리할 수 없다.
- 구조 변경이 어렵다
- 비동기 작업이 쌓이면 코드가 읽기 어려워진다. (콜백지옥)

### 리액티브 스트림

리액티브 스트림을 구현하는 RxJava나 Reactor를 사용하는 방법

```
fun onCreate() {
    disposables = getNewsFromApi()
        .subscribeOn(Schedulers.io))
        .observeOn(AndroidSchedulers.mainThread())
        .map { news ->
            news.sortedByDescending { it.publishedAt }
        }
        .subscribe { sortedNews ->
            views.showNews(srotedNews)
        }
}

```

- 비동기 처리를 위해서 배워야하는 추가적인 개념들(Scheduler, Operator, Subscrbier...)이 많다.
- 객체를 반환하는 함수들은 Observable, Single 클래스로 래핑(wrapping) 해야한다.
- 기존 코드의 포팅이 어렵다.

### 코틀린 적용

```
val scope = CoroutineScope(Dispactchers.Main)

fun onCreate() {
    scope.launch { updateNews() }
    scope.launch { updateProfile() }
}

```

위 코드는 updateNews 함수 내부에서 API 호출 후 대기하는 도중에 updateProfile을 호출해서 수행하고 이후에 updateNews를 실행한다. 이처럼 두 함수가 한 스레드 내에서 넘나들며 실행되는데 이는 updateNews API 응답을 기다리며 스레드가 블로킹 되는게 아니라 코루틴이 중단되기 때문이다.

비동기 작업에 코루틴을 사용할 때 가장 큰 장점은 간결성이다. Rx-Java와 달리 코루틴을 도입하면 아래와 같이 비동기 작업에 중단 가능 제어자를 추가하면 된다.

```
suspend fun getArticle (articleKey) = articleRepository.getArticle(articleKey)
```

위와 같은 특징 외에도 코루틴을 사용하면 스레드를 사용하는 비용이 매우 저렴하다.

# 2장 시퀀스 빌더

코틀린 시퀀스는 List나 Set과 같은 컬렉션이랑 비슷한 개념이지만 필요할 때마다 값을 하나씩 계산하는 지연(lazy) 처리를 한다.

```
val seq = sequence {
    yield(1)
    yield(2)
    yield(3)
}

fun main() {
    for (num in seq) {
        print(num)
    }
}

```

sequence 함수는 DSL로 인자는 수신 객체 지정 람다 함수이다(`suspend SequenceScope<T>.() -> Unit`). 람다 내부에서 수신 객체인 this는 SequenceScope<T>를 가리킨다. 이 객체는 yield 함수를 가지고 있다.

시퀀스에서 가장 큰 특징은 yield 구문이 연속적으로 실행되는게 아니라 호출될 때마다 생성하고 반환한다는 점이다.

2장에서 쌩뚱 시퀀스가 왜 나왔을까? 코루틴의 중단과 다시실행(재개) 기능을 설명하기 위해서다. 1장에서 설명했듯 코루틴은 여러 엔트리 포인트가 있는 중단 가능한 서브 루틴이다.

# 3장 중단은 어떻게 작동할까?

중단 함수는 코틀린 코루틴의 핵심이다.
코루틴은 중단되었을 때 Continuation 객체를 반환한다.
Continuation 객체를 이용하면 멈췄던 곳에서 다시 코루틴을 실행할 수 있다.

---

### Concurrency vs parallelism

중단이란 용어가 자주 나온다. 중단이란 용어는 어떤 의미가 있길래, 동시성을 구현하는 매커니즘에서 자주 등장하는걸까? 이를 이해하기 위해서 동시성(Concurrency)와 병렬성(parallelism)을 먼저 알아보자.

- Concurrency: 하나의 코어가 N개의 작업을 잘게 짤라서 왔다갔다하면서 수행함. 서브 작업들이 대기하는 시간에 다른 작업을 수행하면서 전체 수행시간을 줄인다.
- Parallelism: N개의 코어가 N개의 작업을 수행한다. 멀티코어, 분산컴퓨팅이 병렬성을 원리로 한다.

CPU 바운드와 I/O 바운드라는 개념도 동시성, 병렬성의 개념과 관련이 있는데 CPU 바운드는 코어의 계산 처리 비용이 큰 작업이라 CPU 바운드 작업 여러 개를 동시성을 높여서 한다고해도 컨텍스트 스위칭 비용 때문에 오히려 비효율적이다. 각 작업 간에 유의미한 대기시간이 없다면 하나씩 수행하는게 더 효율적인 작업을 CPU 바운드라고 한다. 반면 I/O 바운드는 외부 대기시간이 존재하여 I/O 대기시간이 존재하는 작업들이다. 이런 작업들은 동시성을 가지고 설계하면 유휴시간동안 효율적으로 리소스를 사용할 수 있다.

코틀린에서는 이런 동시성을 챙기기 위해서 중단 가능한 연산이라는 기능을 제공한다. 스레드의 실행을 블로킹하지 않으면서 실행을 잠시 중단하는 것이다.

- 중단 가능한 연산의 컨텍스트를 관리하는 코루틴 컨텍스트
- 코루틴 컨텐스트를 실행하는 코루틴 매커니즘
- suspend는 중단 가능한 연산들을 표현하는 제어자

중단과 재개는 동시성의 핵심이다.

---

다시 본론으로 돌아가서 코루틴은 중단되었을 때 Continuation 객체를 반환한다. 이 Continuation 객체를 이용하면 멈췄던 곳에서 다시 코루틴을 실행할 수 있다.
코루틴은 runBlocking이나 launch와 같은 코루틴 빌더 등을 통해 만들 수 있다. 중단 가능한 main 함수를 통해서 만들어보자

```
suspend fun main() {
    println("Before")

    suspendCoroutine<Unit> { } // 중단 지점을 제공하는 원시함수

    println("After")
}
// Before 만 출력됨

```

"After"가 출력되지 않음. 코루틴은 중단되었을때 Continuation 객체를 반환하고 중단함수는 이 객체를 받을 수 있음
suspendCoroutine의 첫번째 인자인 람다 함수는 Continuation 객체를 인자로 받음
그래서 이런식으로 continuation을 조작해야~ 중단된 코루틴이 제대로 실행됨

```
suspend fun main() {
    println("Before")

    suspendCoroutine<Unit> { continuation ->
        continuation.resume(Unit)
    }

    println("After")
}
// Before
// After

```

우리가 많이 사용하는 delay도 Continuation 객체를 다루는 로직으로 구현되어 있다.

```
private val executor = Executors.newSingleThreadScheduledExecutor = { Thread(it, "scheduler").apply { isDeamon = true }

suspend fun delay(timeMillis: Long): Unit =
    suspendCoroutine { cont ->
        executor.schedule(
            { cont.resume(Unit) },
            timeMillis,
            TimeUnit.MILLISECONDS
        )
    }

suspend fun main() {
    println("Before")

    delay(1000)

    println("After")
}
// Before
// (1초 후)
// After

```

Continuation resume을 호출해서 재개할 때 값을 반환하거나 예외를 던질 수 있다.

```
suspend fun main() {
    println("Before")

    val user = suspendCoroutine<Unit> { continuation ->
        requestUser { user -> continuation.resume(user) }
    }

    println(user)
    println("After")
}
// Before
// User("name")
// After

```

위 예제는 중단함수에서 user를 가져와서 cont 객체에 반환함.

```
suspend fun main() {
    try {
        suspendCoroutine<Unit> { cont ->
            cont.resumeWithException(RuntimeException())
        }
    } catch (e: RuntimeException) {
        println("Caught")
    }
}

// Caught

```

Continuation 객체는 다른 스레드나 다른 코루틴으로 재개해야한다.
아래 예제는 동작하지 않는다.

```
var continuation: Continuation<Unit>? = null

suspend fun suspendAndSetContinuation() {
    suspendCoroutine<Unit> { cont ->
        continuation = cont
    }
}

suspend fun main() {
    println("Before")
    suspendAndSetContinuation()
    continuation?.resume(Unit)
    println("After")
}
// Before

```

그래서 다른 코루틴을 통해 실행하도록 수정해줘야한다.

```
suspend fun main() {
    println("Before")

    launch {
        deply(1000)
        continuation?.resume(Unit)
    }

    suspendAndSetContinuation()

    println("After")
}
// Before
// (1초 후)
// After

```