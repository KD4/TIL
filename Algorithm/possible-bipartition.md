Possible Bipartition
============================

## Problem

https://leetcode.com/problems/possible-bipartition/

Given a set of N people (numbered 1, 2, ..., N), we would like to split everyone into two groups of any size.

Each person may dislike some other people, and they should not go into the same group. 

Formally, if dislikes[i] = [a, b], it means it is not allowed to put the people numbered a and b into the same group.

Return true if and only if it is possible to split everyone into two groups in this way.

=> N명 사람들이 있고 이 사람들이 서로 싫어하는 사람을 표현한 dislikes 배열이 있다. 두 그룹으로 N명의 사람을 나눌 때 서로 싫어하는 사람들은 따로 묶을 수 있는지 확인하는 프로그램을 작성하세요.


### Example 1

```
Input: N = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
Explanation: group1 [1,4], group2 [2,3]
```

### Example 2

```
Input: N = 3, dislikes = [[1,2],[1,3],[2,3]]
Output: false

```

### Example 3:

```
Input: N = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
Output: false
```
 

## Solution

이분그래프 문제이다. 이분그래프란 간단히 주어진 그래프의 정점들을 2가지 색으로 나눠서 칠했을 때 인접 정점들은 다른 색상으로 칠할 수 있는 그래프이다. 


```java
class Solution {
    public boolean possibleBipartition(int N, int[][] dislikes) {
        List<List<Integer>> adjList = new ArrayList<>();
        
        // initialize
        for (int i = 0; i < N ; i++) {
            adjList.add(new ArrayList<>());
        }
        
        boolean[] visited = new boolean[N];
        boolean[] colors = new boolean[N];
        
        for (int[] d: dislikes) {
            // people is numbered from 1, this code adjust these numbers for starting from 0.
            int a = d[0] - 1;
            int b = d[1] - 1;            
            adjList.get(a).add(b);
            adjList.get(b).add(a);
        }
        
        for (int i = 0; i < N ; i++) {
            if (!visited[i]) {
                visited[i] = true;
                boolean res = isBipartiteDfs(i, adjList, visited, colors);
                if (!res) return false;
            }
        }
        
        return true;
        
    }
    
    private boolean isBipartiteDfs(int cur, List<List<Integer>> adjList, 
                                   boolean[] visited, boolean[] colors) {
        for (int next: adjList.get(cur)) {
            if (!visited[next]) {
                visited[next] = true;
                colors[next] = !colors[cur];
                boolean res = isBipartiteDfs(next, adjList, visited, colors);
                if (!res) return false;                
            } else if(colors[next] == colors[cur]) {
                return false;
            }
        }
        return true;
    }
}
```
 