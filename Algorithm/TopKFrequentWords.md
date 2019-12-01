Top K Frequent Words
=================================

## Problem

https://leetcode.com/problems/top-k-frequent-words/description/

Given a non-empty list of words, return the k most frequent elements.

Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.

=> 단어 배열이 주어졌을 때, 가장 높은 빈도로 등장하는 단어 k개를 출력하라. 같은 빈도로 등장하는 단어의 경우 알파벳 순서로 정렬하라.

### Example 1:
```
Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
Output: ["i", "love"]
Explanation: "i" and "love" are the two most frequent words.
    Note that "i" comes before "love" due to a lower alphabetical order.
```

### Example 2:
```
Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
Output: ["the", "is", "sunny", "day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
    with the number of occurrence being 4, 3, 2 and 1 respectively.
```

### Note:
1. You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
2. Input words contain only lowercase letters.

### Follow up:
Try to solve it in O(n log k) time and O(n) extra space.

## Solution

 아이디어는 간단하다. 전체 리스트를 돌면서 각 단어가 등장하는 빈도수를 구하고 빈도수가 높은 순서대로 k개만 꺼내서 알파벳 순으로 다시 정렬하고 꺼내면 된다. 하지만 조건이 문제다.
 시간 복잡도 제한이 O(n log k), 공간 복잡도는 O(n)으로 제한했다. 단순히 빈도수를 먼저 구하고, 다시 전체 리스트를 돌면서 정렬하고 꺼내면 O(n) 이상 시간 복잡도를 가질 것이다. 
 조건 아래서 알고리즘을 구현하기 위해서는 우선순위 큐를 사용해야한다. 우선순위 큐는 힙 기반의 큐로 '먼저 들어온 순서대로 나가는' 일반적인 큐 알고리즘이 아니라 특정 조건 아래 우선순위가 높은 순서대로 나가는 알고리즘이다. 자바에서는 PriorityQueue를 제공한다. 이를 사용해서 알고리즘을 구현해보자.

 
```JAVA
class Solution {
    public class WordCnt {
        String word;
        int cnt;
        
        public WordCnt(String word) {
            this.word = word;
            this.cnt = 1;
        }
    }
    public List<String> topKFrequent(String[] words, int k) {
        Map<String, WordCnt> map = new HashMap<>();
        
        for (String word: words) {
            if(map.containsKey(word)) {
                map.get(word).cnt++;
            } else {
                map.put(word, new WordCnt(word));
            }
        }
        
        PriorityQueue<WordCnt> pq = new PriorityQueue<>(k, (a, b) -> a.cnt - b.cnt != 0 ? a.cnt - b.cnt :
                                                        b.word.compareTo(a.word));
        
        for(WordCnt wordCnt: map.values()) {
            pq.offer(wordCnt);
            if (pq.size() > k) {
                pq.poll();
            }
        }
        
        ArrayList<String> result = new ArrayList<>();
        
        while(!pq.isEmpty()) {
            result.add(0, pq.poll().word);
        }
        
        return result;
        
        
        
    }
}
```

