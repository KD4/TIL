Netty
=====================================

Netty는 높은 성능의 네트워크 서버와 클라이언트를 개발하기 위한 이벤트 기반의 네트워크 어플리케이션 프레임워크이다.

Netty가 왜 높은 성능을 가지는 것일까?

다음과 같은 특징들 덕분이다. 

- Non-blocking Asynchronous 처리가 기본
- 적은 스레드로 많은 요청을 처리
- GC부하를 최소화하는 Zero-copy ByteBuf 지원

이 특징 덕분에 Tomcat으로 만든 웹서버보다 많은 수의 커넥션을 받을 수 있고,

GC 부담을 줄여 메모리를 효율적으로 관리할 수 있고

더 빠르게 이벤트들을 처리할 수 있다.

즉, 이벤트 루프 기반 프레임워크에서는 하나의 프로세스가 여러 커넥션을 핸들링 할 수 있다는 뜻이다. 

# Netty의 핵심 인터페이스

## Channel
- 읽기, 쓰기, 연결(connect), 바인드(bind)등의 I/O 작업을 할 수 있는 요소 또는 네트워크 연결
- 모든 I/O 작업은 비동기 -> ChannelFuture

**핵심 메소드**
```java
ChannelFuture   write(Object obj)
ChannelFuture   flush(Object obj)
ChannelFuture   writeAndFlush(Object obj)
ChannelFuture   closeFuture()
ChannelPipeline pipeline()
SocketAddress   remoteAddress()
```

## ChannelFuture

- `Channel`의 I/O 작업의 결과
- `ChannelFutureListener`를 등록하고 Listener 결과에 따라서 수행됨

**핵심 메소드**
```java
ChannelFuture addListener(GenericFutreListener listener);
Channel channel();
boolean isSuccess();
Throwable cause();
ChannelFuture await();
```

## ChannelHandler
- Netty의 핵심 요소!
- Netty의 I/O 이벤트를 처리하는 인터페이스
- ChannelInboundHandlerAdapter
- ChannelOutboundHandlerAdapter

```java
void exceptionCaught(ChannelHandlerContext ctx, Throwable cause);
void handlerAdded(ChannelHandlerContext ctx);
void handlerRemoved(ChannelHandlerContext ctx);
```

## ChannelHandlerContext
- `ChannelHandler`는 `ChannelHandlerContext`를 통해
- 다음 `ChannelHandler`에게 이벤트를 넘기거나,
- 동적으로 `ChannelPipeline`을 변경할 수 있음

**핵심 메소드**
```java
Channel channel();
ChannelPipeline pipeline();
ChannelFuture write();
ChannelHandlerContext fireChannelActive(Object msg);
ChannelHandlerContext fireChannelRead(Object msg);
```

## ChannelPipeline
- `Channel`에 드나드는 inboud/outbound 이벤트를 처리
- intercepting Filter 패턴 처리, `ChannelHandler` 리스트
- 두번째 시간에 상세 설명

```Java
ChannelPipeline addLast(ChannelHandler handlers);
ChannelPipeline addLast(String name, ChannelHandler handler);
ChannelHandler remove(String name);
<T extends ChannelHandler> T remove(Class<T> handlerType);
```

## EventLoop
- 등록된 `Channel`들의 모든 I/O 작업을 처리
- 구현체 `NioEventLoopGroup`를 주로 사용

```Java
boolean inEventLoop();
<T> Future<T> submit(Callable<T> task);
<V> Promise<V> newPromise();
<V> ScheduledFuture schedule(Callable<V> callable, long delay, Timeunit unit);
```


