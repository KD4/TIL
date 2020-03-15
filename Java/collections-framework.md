자바 컬렉션 프레임워크
=================================


## List 
Array는 index를 가진 집합에 데이터를 저장하는 자료구조이다. index를 통해서 자료 구조 안 데이터에 접근할 수 있다. 
List는 연속된 자료형으로 순서가 있는 자료 구조이다. 

### ArrayList
내부적으로 Array로 구현된 List, index를 통해서 데이터를 저장하고 capa를 넘으면 새로운 공간을 할당하는 오버헤드가 있다.

### LinkedList
연결 리스트를 통해서 구현한 List, 데이터를 접근할 때 해당 시퀀스까지 탐색을 해야하므로 접근은 느리지만 데이터 삽입은 마지막 노드에 삽입하는 경우 넣어주고 tail node head만 변경해주면 되기 때문에 빠르다.

### Vector
Vector는 가변구조 Array로 기본적으로 ArrayList와 같은 자료구조이다. 하지만 ArrayList와는 다르게 스레드 안정성을 보장한다. syncronized 블락을 사용하기 때문에 성능이 느리고 배열의 크기를 늘릴 때도 2배의 크기로 늘린다. 레거시 클래스다.

## Stack과 Queue

### Stack 
스택 클래스는 Vertor 인터페이스와 List 인터페이스를 통해서 스택 자료 구조를 표현한다. push(), pop(), peek() 메서드를 Stack에 구현한다. 
### Queue
클래스로 구현되어 있는 Stack과는 다르게 Queue는 인터페이스가 있다. 이 인터페이스를 LinkedList, ArrayDeque 등이 구현한다.

## Set
중복 불가능한 구조를 저장하는 비선형 자료구조

### HashSet
해싱 테이블을 이용해 구현되었고 순서를 보장하지 않는다. add, remove, contains 메서드는 해싱 테이블을 이용하기 때문에 O(1)의 시간복잡도를 가진다.

### TreeSet
트리 알고리즘을 이용해서 구현한다. 정렬된 상태로 저장된다. 삽입, 삭제 시 정렬을 고려해야하므로 O(log(n))의 시간 복잡도를 가진다. 내부적으로 크기를 계산할 때 노드의 compareTo() 메서드를 사용하므로 Null 값을 허용하지 않는다. 

## Iterator와 ListIterator

### iterator
자바의 컬렉션 프레임워크는 컬렉션에 저장된 요소를 읽어오는 방법을 Iterator 인터페이스로 표준화하고 있습니다.
Collection 인터페이스에서는 Iterator 인터페이스를 구현한 클래스의 인스턴스를 반환하는 iterator() 메소드를 정의하여 각 요소에 접근하도록 하고 있습니다.
따라서 Collection 인터페이스를 상속받는 List와 Set 인터페이스에서도 iterator() 메소드를 사용할 수 있습니다.
 

### Enumeration
Enumeration 인터페이스는 JDK 1.0부터 사용해 온 Iterator 인터페이스와 같은 동작을 하는 인터페이스입니다.
Enumeration 인터페이스는 hasMoreElements()와 nextElement() 메소드를 사용하여 Iterator와 같은 작업을 수행합니다.
하지만 현재에는 기존 코드와의 호환성을 위해서만 남아있으므로, Enumeration 인터페이스보다는 Iterator 인터페이스를 사용하는 것이 좋습니다.

### ListIterator 
Iterator 인터페이스를 상속받아 여러 기능을 추가한 인터페이스로 양방향 접근을 가능케 했다. 


## Map

### HashTable
HashTable은 Dictionary 인터페이스를 구현한 Map 자료 구조이다.
Key로 들어온 Object의 hashCode() 메서드를 key hash 값으로 이용하기 때문에 null 값은 지원하지 않으며 
data 변경에 대해 synchronized 를 적용하므로 thread-safe하다.
synchronized 키워드를 사용하므로 성능은 가장 느리고 return elements() 메서드의 return 이 Iterator의 구형인 Enumeration을 반환한다.

### HashMap
HashMap은 AbstractMap 인터페이스를 구현한 Map 자료구조이다.
기본적으로 HashTable과 비슷한 동작을 한다.
Key로 들어온 Object를 자체 hash() 함수를 통해서 해싱 값을 얻어내므로 null 값도 지원한다.
하지만 데이터에 어떠한 스레드 안정성을 보장하지 않는다. 

### ConcurrentHashMap
기본적으로 HashMap과 같지만 Key object의 hashCode() 메서드를 직접 사용하여 해싱키를 얻어내므로 null 값을 지원하지 않는다.
그리고 HashTable과는 다르게 동일한 해싱 값일 때만 synchronized 키워드를 사용하므로 HashTable 보다 기본적인 성능이 좋다.
