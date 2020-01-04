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

이분그래프 문제이다. 

이분 그래프: 그래프를 구성하는 모든 Node들에 대하여 각 Node는 그의 인접 Node 들끼리 서로 직접 연결된 Edge가 없다라는 조건을 만족하면 이 그래프를 이분 그래프라고한다. A의 인접 노드 B, C가 있을 때 B와 C는 인접하지않아야한다. 

이분 그래프는 인접 리스트, 인접 행렬을 통해서 표현할 수 있다.

인접 행렬은 2차원 배열을 adj를 만들었을때 1번 노드와 2번 노드가 인접하면 adj[1][2], adj[2][1] 를 true 값으로 표현(혹은 다른 방식으로)하는 방식이다.
이 방식은 특정 노드가 어떤 노드와 인접하는 지 확인할 때는 O(1)의 시간 복잡도를 가지지만 특정 노드의 모든 인접 노드를 확인하려면 O(V) (V는 노드 수) 만큼의 시간복잡도를 가진다. 또한 간선이 없는 경우에도 공간을 써야하므로 공간 복잡도 측면에서도 효율성이 떨어진다.

인접 리스트는 각 정점의 인접 노드들을 리스트 형식으로 표현한다. 이 방식은 특정 노드가 어떤 노드와 인접하는지 알고싶으면 그 노드의 인접 노드를 모두 검사해야하므로 O(V)의 시간복잡도를 가진다.
대신 모든 노드를 확인할 때는 O(E) (E는 간선의 수)만큼의 시간 복잡도를 가지고 공간 복잡도 측면에서도 행렬 표현보다 유리하다.


이 문제는 각 정점들의 인접 노드들을 모두 탐색하며 그 인접 노드들이 서로 다시 인접하는지 체크해야하므로 인접 리스트를 사용하는 것이 효율적이다.

아래는 인접리스트 형태로 표현한 문제 풀이이다.

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
 