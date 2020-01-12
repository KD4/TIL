Edit Distance
============================

# Problem
Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.

You have the following 3 operations permitted on a word:
```
Insert a character
Delete a character
Replace a character
```

# Example

```
Input: word1 = "horse", word2 = "ros"

Output: 3

Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
```

# Solution
 편집 거리 구하기는 서로 다른 두 단어의 유사도를 구하기 위해서 측정된다. 서로 다른 두 단어를 같은 단어로 만들기 위해서 행해져야하는 연산의 개수(삽입, 삭제, 교체)를 구하는 문제인데 2차원의 메모이제이션 배열을 이용해서 동적 계획법 접근으로 문제를 해결할 수 있다.


```java
class Solution {
    public int minDistance(String word1, String word2) {
        
        int len1 = word1.length();
        int len2 = word2.length();

        int[][] d = new int[len1+1][len2+1];

        for (int i = 0; i <= len1; i++) {
            d[i][0] = i;
        }

        for (int j = 0; j <= len2; j++) {
            d[0][j] = j;
        }

        for (int i = 1; i <= len1; i++) {
            for (int j = 1; j <= len2; j++) {
                if (word1.charAt(i-1) == word2.charAt(j-1)) {
                    d[i][j] = d[i-1][j-1];
                } else {
                    d[i][j] = Math.min(d[i-1][j-1], Math.min(d[i-1][j], d[i][j-1])) + 1;
                }
            }
        }

        return d[len1][len2];
    }
}
```