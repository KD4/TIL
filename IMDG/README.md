IMDG (In-Memory Data Grid)
===================================

```
 우리 시스템에서는 좋아요, 싫어요 같은 글에 대한 감정 표현을 MongoDB에 쌓고 있는데, 분산 서버 아키텍쳐인 감정 표현 Application Server에서 일어날 수 있는 동시성 문제를 고민하게 되었다.
 비정상적인 클라이언트 활동으로 분산된 서버로 동시에 요청이 들어오면 데이터가 훼손될 수 있기 때문이다. 그 과정에서 IMDG라는 데이터 아키텍쳐를 알게되었다.
```


## IMDG (In-Memory Data Grid)의 정의
그렇다면, IMDG란 무엇일까? In-Memory와 Data Grid라는 용어 때문에 생소하고 거창하게 생각될 수 있지만 그 정의를 보고 나면 분산캐시와 많이 다르지 않다는 사실에 오히려 허탈함을 느낄 수 있다. 그러나, IMDG가 활용 및 응용 측면에서 분산캐시와 동일한 형태로 구성될 수 있지만 기술의 근본적인 취지와 출발점이 다르다는 것을 주의해서 살펴보자.

```
IMDGs are middleware products that provide an in-memory, distributed object store (usually called cache or space), in which multiple, distributed and heterogeneous (Java, .NET, C++) applications can place, retrieve and exchange large volumes of data objects. [1]
```

## IMDG는 어떻게 동작할까?
IMDG는 Terabyte 급 대용량 데이터를 메모리에 저장하고 데이터에 대한 일관성(Consistency)과 가용성(Availability)을 보장함으로써 고성능/고확장성을 갖는 어플리케이션을 구현하도록 하는 것이 목표이다.

일반적으로 (데이터) 캐시는 RDB나 File 형태로 Persistent Storage에 저장되어 있는 데이터를 Key-Value 객체로 메모리에 저장하고 어플리케이션에서 API를 통해 접근하게 함으로써 시스템의 성능을 개선하기 위한 목적으로 활용된다. 하지만, 캐시에 저장되어 있는 데이터는 읽기 오퍼레이션만 접근이 제약되며, 데이터 일관성을 유지하기 위해서 Persistent Storage의 데이터가 변경될 경우 캐싱 데이터를 invalidate 함으로써 그 다음 읽기 오퍼레이션이 실행될 때까지는 메모리의 데이터가 참조되지 않도록 한다. 만일,  (로컬) 캐시가 여러 개인 경우에는 하나의 캐시에서 invalidate 된 데이터의 상태가 다른 캐시에는 반영이 되지 않기 때문에 캐시들 사이에 데이터 불일치가 발생하는 문제점이 있다.

이러한 문제를 해결하기 위해 분산캐시가 등장하게 되었는데, 분산캐시는 다수의 노드에 데이터를 분산저장하고 데이터에 대한 단일화된 논리적 뷰를 제공하여, 한 클라이언트에서 변경된 데이터가 다른 클라이언트에게도 동일하게 보일 수 있도록 데이터 일관성을 보장한다. 하지만, 분산캐시의 경우 노드 추가/삭제에 대한 클러스터 구성관리와 노드 간에 데이터 재배치 하는 코디네이션 기능이 없기 때문에, 하나의 노드에 장애가 일어날 경우 그 노드에 저장되어 있던 데이터들이 모두 유실되어 데이터 가용성 보장을 하지 못하는 문제점을 갖고 있다.

이러한 문제점을 보완하기 위해서 데이터에 대한 복제(replication)본을 만들어 다중 노드에 분산시키고 원본과 복제본 사이에 동기화(synchronization)를 통해 데이터 일관성을 보장하는 방향으로 분산캐시의 기술이 발전되어 왔으며 IMDG에는 이러한 최신의 분산캐시 기술이 반영되어 있어서 기본적으로 데이터의 무결성 (data integrity), 가용성 (availability), 지속성(durability)을 보장하게 된다.

IMDG는 캐시와 달리 데이터에 대한 읽기 오퍼레이션에 대한 성능 개선하고자 하는 목적으로 국한되어 있지 않고, 대용량의 데이터를 메모리에 로딩하여 읽기/수정/삭제를 포함한 전반적인 데이터 오퍼레이션과 관리기능을 제공하여 어플리케이션 성능을 고도화하는데 목적이 있다. 따라서, 데이터의 정합성을 보장하기 위한 분산락, 분산 트랜잭션의 제공, 성능 개선을 위한 데이터 병렬처리, 데이터 분석을 위한 쿼리 제공, 데이터 변경 이벤트 통지 (Event Notification), 외부 데이터 소스와의 데이터 동기화, 동적 클러스터 구성 및 확장성 보장, 보안과 같은 고도화된 데이터 관리 미들웨어로서의 역할과 기능을 제공한다.


## Hazelcast IMDG의 기능
다음은 IMDG 제품 가운데 하나인 Hazelcast의 기능이다. HazelCast는 더블 라이선스 정책을 취하고 있는 제품으로, ElasticMemory와 같은 기능을 사용하려면 상용 라이선스를 구입해야 한다. 그러나 많은 기능이 오픈소스라서 별도의 비용 없이 사용할 수 있으며, 사용 레퍼런스 정보를 찾아 보기가 매우 쉽다.

HazelCast의 기능이 다른 모든 IMDG에서 제공하는 일반적인 기능이라고 할 수는 없지만 IMDG의 기능을 살펴보기에는 매우 좋은 예라서 간단하게 소개하겠다.

### DistributedMap & DistributedMultiMap
Map<?, ?>을 구현한 클래스다. 여러 IMDG 노드에 Map 데이터가 분산 배치된다.

RDBMS의 테이블(table)은 Map<Object key, List<Object>>로 표현할 수 있기 때문에, RDBMS를 샤딩해서 쓰는 것과 비슷한 데이터 분산 효과를 얻을 수 있다. 더구나 HazelCast는 DistributedMap에서 SQL-like한 기능을 사용할 수 있도록 했다. Map에 있는 value를 검사할 때 WHERE 구문이나 LIKE, IN, BETWEEN 같은 SQL-like 구문을 사용할 수 있다.

HazelCast는 모든 데이터를 메모리에 두는 것뿐만 아니라 영구 저장소에 저장하는 기능도 제공한다. 이렇게 영구 저장소에 데이터를 저장하면 캐시 시스템으로 사용하도록 구성할 수 있다. LRU(Least Recently Used) 알고리즘이나 LFU(Least Frequently Used) 알고리즘을 선택해, 꼭 필요한 데이터만 메모리에 두고 상대적으로 잘 찾지 않는 나머지 데이터는 영구 저장소에 두게 할 수도 있다.

또한 MultiMap을 분산 환경에서 사용할 수 있도록 했다. 어떤 key를 조회하면 Collection <Object> 형태의 value 목록을 얻을 수 있다.

### Distributed Collections
DistributedSet이나 DistributedList, DistributedQueue 등을 사용할 수 있다. 이런 Distributed Collection 객체에 있는 데이터는 어느 하나의 IMDG 노드가 아니라 여러 노드가 분산 저장된다. 그렇기 때문에 여러 노드에 저장된 단 하나의 List 객체 또는 Set 객체 유지가 가능하다.

### DistributedTopic & DistributedEvent
HazelCast는 publish 순서를 보장하는 Topic 읽기가 가능하다. 즉 분산 Message Queue 시스템으로 이용할 수 있다는 뜻이다.

### DistributedLock
말 그대로 분산 Lock이다. 여러 분산 시스템에서 하나의 Lock을 사용해 동기화할 수 있다.

### Transactions
DistributedMap, DistributedQueue 등에 대한 트랜잭션을 사용할 수 있다. 커밋/롤백을 할 수 있기 때문에 더 신중한 연산이 필요한 곳에서도 IMDG를 사용할 수 있다.

### 대용량 메모리 사용과 GC
앞에서 소개한 대부분의 제품은 구현 언어로 Java를 사용한다. 수십 GB 크기의 힙을 사용해야 하는 만큼 Full GC에 필요한 시간도 상당히 오래 걸릴 수 있다. 그렇기 때문에 IMDG에서는 이런 제약을 극복할 수 있는 방법을 마련해 적용하고 있다. 바로 Off-heap 메모리(Direct Buffer)를 사용하는 것이다.

JVM에 Direct Buffer 생성을 요청하면 JVM은 힙 바깥의 공간에서 메모리를 할당해 사용한다. 이렇게 할당한 공간에 객체를 저장하도록 하는 것이다. Direct Buffer는 GC 대상 공간이 아니기 때문에, Full GC 문제가 발생하지 않게 된다. 보통 Direct Buffer에 대한 접근은 Heap Buffer보다 느리다. 하지만 큰 공간을 할당할 수 있고 Full GC에 대한 부담을 줄일 수 있기 때문에 매우 큰 용량의 메모리 공간을 사용할 때 Full GC 시간을 없앨 수 있어 항상 일정한 처리 시간을 확보할 수 있다는 것이 장점이다.


```
Direct Buffer라는 개념, 신기하다.
```