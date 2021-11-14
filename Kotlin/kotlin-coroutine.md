코틀린 코루틴
========================

코루틴은 컴퓨터 프로그램 구성요소 중 하나로 비선점형 멀티태스킹을 수행하는 일반화한 서브루틴이다.

서브루틴은 우리가 사용하는 함수이다. 메인 흐름에서 벗어나 특정 작업을 수행하는 과정을 서브루틴 실행이라고한다.

이 서브루틴 실행은 일반적으로 작업을 수행하고 메인루틴에게 작업 완료를 보고한 후 스코프를 지우고 작업 내용을 남기지 않는다. 

하지만 코루틴은 서브루틴과 메인루틴 사이에 데이터를 주고 받으며 이어진다. 

코루틴이란 서로 협력해서 실행을 주고받으면서 작동하는 여러 서브루틴을 말한다. 대표적으로 제네레이터를 들 수 있다. 

어떤 함수 A가 실행되다가 제네레이터인 코루틴 B를 호출하면 A가 실행되던 스레드 안에서 코루틴 B의 실행이 시작된다.

코루틴 B는 실행을 진행하다가 실행을 A에 양보한다. (yield)
A는 다시 코루틴을 호출했던 다음 부분부터 실행을 계속하다, 다시 B를 호출할 수 있다. 이런 제어 흐름을 코루틴이라고 한다. 

언어에 따라 제네레이터 등 특정 형태의 코루틴만을 지원하는 경우가 있고, 일반적인 코루틴을 만들 수 있는 기능을 제공하는 경우가 있다. 

코틀린은 특정 코루틴을 언어만 지원하는게 아니라 코루틴을 구현할 수 있는 기본 도구를 언어가 제공하는 형태이다. 

코틀린은 코루틴 빌더를 통해서 코루틴을 생성한다.


## CoroutineScope
- 코루틴 정의를 위한 Scope 제공
- CoroutineContext 형태를 지정
  - Main, Default, IO...
- launch, async 등을 통해 scope 실행 형태 정의


## GlobalScope
- CoroutineScope을 상속받아 구현해둔 object 구현체
  - CoroutineScope와 다르게 Application/Demon Lifecycle을 따르도록 개발 필요
- GlobalScope로 시작하며 launch, actor 등을 활용

GlobalScope.launch가 만들어낸 코루틴은 서로 다른 스레드에서 실행된다. 때문에 메인 스레드가 실행 중인 동안만 코루틴의 동작을 '보장'한다. 

이를 방지하려면 비동기적으로 launch를 실행하거나, launch가 모두 다 실행될 때까지 기다려야 한다. 특히 코루틴의 실행이 끝날 때까지 현재 스레드를 블록시키는 함수로 run Blocking()이 있다. runBlocking은 CoroutineScope의 확장 함수가 아닌 일반 함수이기 때문에 별도의 코루틴 스코프 객체 없이 사용 가능하다. 


## Coroutines 동작

## Dispatchers

## suspend
