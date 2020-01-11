minimum path sum
========================

# Problem
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.


# Example

```
Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]

Output: 7

Explanation: Because the path 1→3→1→1→1 minimizes the sum.
```

# Solution

 이 문제는 정수 값이 입력된 m * n 2차원 배열이 주어졌을 때 (0, 0) 부터 (m-1, n-1) 위치까지 아래, 오른쪽으로만 이동하는 경로 중에서경로에 놓인 값의 합이 가장 적은 경로를 찾는 문제이다.

 DP를 통해서 해결할 수 있다. 

* DP: 어떤 문제를 해결하기 위해 그 문제를 더 작은 문제의 연장선으로 생각하고 과거에 구한 해를 재사용하는 방식으로 문제를 해결하는 방법


```java
class Solution {
    public int minPathSum(int[][] grid) {
        int[][] d = new int[grid.length][grid[0].length];
        d[0][0] = grid[0][0];
        
        for(int i = 0; i < grid.length; i++) {
            for(int j = 0; j < grid[0].length; j++) {
                if (i == 0 && j == 0) continue;
                
                int up = i > 0 ? d[i-1][j] : Integer.MAX_VALUE;
                int left = j > 0 ? d[i][j-1] : Integer.MAX_VALUE;
                
                d[i][j] = Math.min(up, left) + grid[i][j];
            }
        }
        
        return d[grid.length-1][grid[0].length-1];
        
    }
}
```