# Java 5에 새롭게 추가된 Callable, Future 그리고 Executor

Java 5부터 비동기성 작업을 지원하기 위해서 Callable, Future, Executor등이 추가되었다.

그 이전에는 Runnable 인터페이스를 통해서 비동기성 작업을 지원하고 있었는데 Runnable의 유일한 메소드인 run()은 결과 값을 리턴하지 않기 때문에 run() 메소드의 실행 결과를 얻기 위해서는 공용 메모리를 이용하거나 파이프 같은 구현을 해야했다. 이런 코드를 작성하면 이 메소드가 어떤 작업물에 영향을 끼칠 지 알기 힘들다는 단점이 있다. 이런 단점을 없애기 위해서 추가된 것이 바로 Callable 인터페이스이다.

Java.util.concurrent.Callable 인터페이스는 다음과 같이 정의되어 있다.

```java
public Interface Callable<V> {
    V call() throws Exception
}

public class CallableImpl implements Callable<Integer> {
    public Integer call() throws Exception {
        // do something
        return result;
    }
}
```

Callable 인터페이스에서 Generic Type의 반환값을 가지는 call() 메소드를 확인할 수 있다.

Runnable 인터페이스의 구현체는 Thread를 이용해서 start 시킬 수 있었다.

Callable 인터페이스의 구현체는 그렇다면 어떻게 실행시키고, 어떤 방식으로 반환값을 관리할 수 있을까?

Java 5부터 새롭게 추가된 Executor 인터페이스는 쓰레드 풀, 큐 등 다양한 Executor 구현체를 가지고 있으며 Thread를 직접 사용할 때 겪었던 문제를 해결해줄 수 있다.

또한 이 Executor 구현체를 관리할 수 있는 레이어가 하나 더 추가되었는데 바로 ExecutorService 이다.

ExecutorService 인터페이스는 다음과 같이 두 가지 종류의 메소드가 추가되었다.

    - Executor의 라이프 사이클을 관리
    - Callable을 작업으로 사용하기 위한 메소드

먼저, 라이프 사이클이란 Executor가 가지는 Runnable, Callable 구현체를 정지, 종료등을 시킬 수 있는 기능이고

두번째로 언급한 Callable 관련 메소드들이 우리가 필요한 메소드들이다.

ExecutorService 인터페이스는 작업 수행과 관련해서 추가적으로 메소드를 제공하고 있으며, 이들 메소드는 다음과 같다.

    - <T> Future<T> submit(Callable<T> task)
        - 결과값을 리턴하는 작업을 추가한다.
    - Future<?> submit(Runnable task)
        - 결과값이 없는 작업을 추가한다.
    - <T> Future<T> submit(Runnable task, T result)
        - 새로운 작업을 추가한다. result는 작업이 성공적으로 수행될 때 사용될 리턴 값을 의미한다.
    - <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks)
        - 주어진 작업을 모두 실행한다. 각 실행 결과값을 구할 수 있는 Future의 List를 리턴한다.
    - <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit)
        - 앞서 invokeAll()과 동일하다. 지정한 시간 동안 완료되지 못한 작업은 취소되는 차이점이 있다.
    - <T> T invokeAny(Collection<? extends Callable<T>> tasks)
        - 작업울 수행하고, 작업 결과 중 성공적으로 완료된 것의 결과를 리턴한다. 정상적으로 수행된 결과가 발생하거나 예외가 발생하는 경우 나머지 완료되지 않은 작업은 취소된다.
    - <T> T invokeAny(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit)
        - invokeAny()와 동일하다. 지정한 시간 동안만 대기한다는 차이점이 있다.

ExecutorService.submit() 메소드를 사용하면 CallableImpl 클래스를 작업으로 사용할 수 있다. 아래 코드는 ExecutorService.submit() 메소드의 실행 예이다.

```java
ExecutorService executor = Executors.newFixedThreadPool(THREADCOUNT);
…
Future<Integer> future = executor.submit(new CallableImpl());
Integer result = future.get();
```

ExecutorService.submit() 메소드는 전달받은 Callable 객체를 내부 메커니즘에 따라 지정한 때에 실행한다. 예를 들어, 위 경우 CallableImpl 객체는 큐에 저장되었다가 가용한 쓰레드가 생길 때 CallblaImpl.call() 메소드가 실행될 것이다.

Callable.call() 메소드가 ExecutorService.submit() 메소드에 전달될 때 곧 바로 실행되는 것이 아니기 때문에 리턴값을 바로 구할 수 없다. 이 리턴값은 미래의 어느 시점에 구할 수 있는데, 이렇게 미래에 실행되는 Callable의 수행 결과 값을 구할 때 사용되는 것이 Future이다. Future.get() 메소드는 Callable.call() 메소드의 실행이 완료될 때 까지 블록킹되며, Callable.call() 메소드의 실행이 완료되면 그 결과값을 리턴한다.


출처: http://javacan.tistory.com/entry/134 [자바캔(Java Can Do IT)]
