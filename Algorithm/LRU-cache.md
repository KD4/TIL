LRU Cache
==========================

## Problem
Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

- get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
- put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

The cache is initialized with a positive capacity.

```
Follow up:
Could you do both operations in O(1) time complexity?
```
```
Example:

LRUCache cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```

## Solution

 이 문제는 LRU 캐시를 구현하는 문제이다. LRU 캐시는 용량을 초과했을 때 최근에 엑세스 되지 않은 아이템을 캐시에서 제거하는 로직을 가졌다. 
단순히 생각하면 각 캐시 아이템에 접근했던 시간을 기록하고 용량이 다 찼을 때 모든 캐시를 돌면서 가장 오래된 시간 정보를 가진 친구를 삭제하면 될텐데,
이 문제에서는 get, put 연산이 O(1) 시간 복잡도를 가지도록 제한했다. 

 여러가지 방법이 있겠지만 Doubly Likned List와 HashMap 자료구조를 사용하여 풀 수 있다.
캐시 아이템이 엑세스 될 때 해시맵에서 아이템을 꺼내고 이 아티템을 양방향 연결 리스트의 맨 앞으로 가져온다. 용량이 꽉차서 아이템을 제거할 때는 tail 포인터에 있는 아이템을 리스트와 맵에서 제거하면 된다. HashMap 컬렉션 프레임워크를 사용하고 양방향 링크드 리스트 기반 LRUCache를 구현한 코드는 아래와 같다. 

```java
class LRUCache {
    class CacheItem {
        int key;
        int value;
        CacheItem prev;
        CacheItem next;
        
        public CacheItem(int key, int value) {
            this.key = key;
            this.value = value;
        }
        
    }
    
    int capacity;
    CacheItem head;
    CacheItem tail;
    Map<Integer, CacheItem> map;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.head = null;
        this.tail = null;
        this.map = new HashMap<>();
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) {
            return -1;
        } else {
            CacheItem cur = map.get(key);
            if (cur == head) {
                return cur.value;
            }
            
            if (cur == tail) {
                tail = tail.prev;         
            }
            
            if ( cur.next != null ) cur.next.prev = cur.prev;
            cur.prev.next = cur.next;
            
            head.prev = cur;
            cur.next = head;
            head = cur;
            return cur.value;
        }
    }
    
    public void put(int key, int value) {
        if (get(key) == -1) {
            CacheItem cur = new CacheItem(key, value);
            if (head == null) {
                head = cur;
                tail = cur;
            } else {
                head.prev = cur;
                cur.next = head;
                head = cur;
            }
            map.put(key, cur);
            
        } else {
            CacheItem cur = map.get(key);
            cur.value = value;            
        }
        
        if (map.size() > this.capacity) {
            map.remove(tail.key);
            tail.prev.next = null;
            tail = tail.prev;
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
```

