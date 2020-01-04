number of islands
===============================

## Problem
Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

'1'과 '0'으로 구성된 2차원 배열이 주어졌을 때, 1로 구성된 섬의 개수를 반환하는 함수를 작성해라. 섬은 가로 세로로만 연결되어 있으며 '1'로 연결된 섬은 하나로 카운팅한다. 

### Example 1:
```
Input:
11110
11010
11000
00000

Output: 1
```

### Example 2:

```
Input:
11000
11000
00100
00011

Output: 3
```

## Solution

모든 배열을 돌면서 '1'이 보일때 DFS를 실시한다. DFS를 실시하면서 섬의 개수를 하나씩 카운팅한다. DFS를 통해서 방문한 위치는 'x'로 표시해서 다시 방문했을 때 섬 개수를 카운팅하지 않도록 조치한다.




```java
class Solution {
    public int numIslands(char[][] grid) {
        int numIslands = 0;
        
        if (grid == null || grid.length == 0 || grid[0].length == 0) return numIslands;
        
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                
                if (grid[i][j] != '1') continue;
                
                numIslands++;
                dfs(grid, i, j);
            }
        }
        
        return numIslands;
        
    }
    
    public void dfs(char[][] grid, int i, int j) {
        grid[i][j] = 'x';
        // left
        if (j-1 >= 0 && grid[i][j-1] == '1') dfs(grid, i, j-1);
        // right
        if (j+1 < grid[0].length && grid[i][j+1] == '1') dfs(grid, i, j+1);
        // up
        if (i-1 >= 0 && grid[i-1][j] == '1') dfs(grid, i-1, j);
        // down
        if (i+1 < grid.length && grid[i+1][j] == '1') dfs(grid, i+1, j);
    }
}
```