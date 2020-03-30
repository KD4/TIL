// Design a data structure that supports all following operations in average O(1) time.

// insert(val): Inserts an item val to the set if not already present.
// remove(val): Removes an item val from the set if present.
// getRandom: Returns a random element from current set of elements. Each element must have the same probability of being returned.

// @See https://leetcode.com/problems/insert-delete-getrandom-o1/

class RandomizedSet {

    // Set 자료구조 조건, 중복 불가를 구현하기 위한 map
    // getRandom 메소드는 list에 있는 값을 뽑는다. 
    HashMap<Integer, Integer> map;
    ArrayList<Integer> list;
    Random random = new Random();

    /** Initialize your data structure here. */
    public RandomizedSet() {
        map = new HashMap<>();
        list = new ArrayList<>();
    }
    
    /** Inserts a value to the set. Returns true if the set did not already contain the specified element. */
    public boolean insert(int val) {
        if (map.containsKey(val)) return false;
        map.put(val, map.size());
        list.add(val);
        return true;
    }
    
    /** Removes a value from the set. Returns true if the set contained the specified element. */
    public boolean remove(int val) {
        if (!map.containsKey(val)) return false;
        
        int idx = map.get(val);
        
        int last = list.get(list.size()-1);
        
        // 마지막 값이 아니면
        if (idx != list.size()-1) {
            // idx 값에 마지막에 저장된 val를 설정한다.
            list.set(idx, last);
            // 마지막 값에 인덱스를 수정한다. 
            map.put(last, idx);
        }
        
        list.remove(list.size() - 1);
        map.remove(val);
        return true;
    }
    
    /** Get a random element from the set. */
    public int getRandom() {
    
        int idx = random.nextInt(map.size());
        return list.get(idx);
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet obj = new RandomizedSet();
 * boolean param_1 = obj.insert(val);
 * boolean param_2 = obj.remove(val);
 * int param_3 = obj.getRandom();
 */