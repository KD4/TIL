Spring Cache 
===========================

Spring에서는 캐시 기능을 지원하기 위해서 Spring Caching Abstraction을 지원한다. 

Spring Caching Abstraction은 다른 캐시 솔루션을 Spring CacheManager를 통해서 쉽게 사용할 수 있도록 해준다. 

Spring Caching Abastraction은 자바 메소드에 캐싱을 적용한다.

Spring 3.1부터는 캐시를 도입하기 위해서 CacheManager 인터페이스만 구현 해주면 된다. 다른 캐시 라이브러리를 추가해서 구현체로 사용할 수 있다. 

기본적으로 Spring-boot-starter-cache를 사용한다면 SImpleCacheConfiguration이 동작하여 ConcurrentMapCacheManager 구현체가 사용된다. 

이런 기본 캐시 매니저도 그냥 사용할 수 있지만 실서비스 용으로는 조금 더 안정성 있는 Ehcache나 caffeine 같은 캐시 매니저를 사용한다.

회사 시스템에서는 WAS가 여러 대 있어서 특정 조건에 In memory Cache가 flush되어야했다. 그래서 직접 simple cache manager를 구현하고 flush 관련 pub/sub 작업도 담당하는 버스 구현체를 주입받았다. 

그리고 메서드 캐시를 하지 않고 service Layer에서 명시적으로 InmemoryCacheManager 빈을 주입받아서 로직 상으로 캐시 get/set이 보이도록 처리하였다.

아래는 사용된 Inmemory 구현체 코드를 간단히 한 것이다.

```java
// spring SimpleCacheManager 상속 받아서 caches 관리. 캐시 구현체는 아무거나 사용할 수 있음~ 카페인 사용했음. 
public class HelloInMemoryCacheManager extends SimpleCacheManager implements InMemoryCacheManager {

    private final BusService busService;

    public HelloInMemoryCacheManager(BusService busService) {
        this.busService = busService;
    }

    public final BusMessageConsumer messageConsumer = (message) -> {
        if ("*".equals(message)) {
            // 모든 캐시 flush
            getCacheNames().forEach((name) -> getCache(name).clear());
        } else if (message.contains("....")) {
            // list 캐시 키 프로토콜에 의해서 캐시들을 가져와서 flush 로직
        } else {

            // 특정 캐시 flush
            final Cache cache = getCache(message);
            if (LangUtil.isNotEmpty(cache)) {
                cache.clear();
            }
        }
    };

    // 빈 생성 시 bus 구독
    @PostConstruct
    public void init() {
        busService.subscribe(BusTopic.FLUSH_CACHE.name(), messageConsumer);
    }

    // 빈 제거 시 bus 구독 해지
    @PreDestroy
    public void destroy() {
        busService.unsubscribe(BusTopic.FLUSH_CACHE.name(), messageConsumer);
    }

    // flush 로직 동작 시 버스에 pub
    @Override
    public void flush(String cacheName) {
        busService.publish(BusTopic.FLUSH_CACHE.name(), cacheName);
    }

    // do somethings...
}

```

