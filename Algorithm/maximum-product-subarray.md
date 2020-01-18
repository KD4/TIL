Maximun Product Subarray
====================================

## Problem

Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

## Example 1
```
Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
```

## Example 2
```
Input: [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

## Solution
동적 계획법을 활용하는 문제, 바로 전 배열까지 부분 집합의 합을 구하면서 메모이제이션 배열에 저장한다. 음수값이 포함되어 있으므로 최저값이 저장될 공간도 같이 가져가면서 매 step을 밟는다. 


```java
class Solution {
    public int maxProduct(int[] nums) {
        int[][] d = new int[nums.length][2];
        
        d[0][0] = nums[0];
        d[0][1] = nums[0];
        
        for(int i = 1; i < nums.length; i++) {
            int c = nums[i];
            d[i][0] = Math.max(c, Math.max(c * d[i-1][0], c * d[i-1][1]));
            d[i][1] = Math.min(c, Math.min(c * d[i-1][0], c * d[i-1][1]));
        }
        
        int max = nums[0];
        for(int i = 1; i < nums.length; i++) 
            if (d[i][0] > max) max = d[i][0];
        
        return max;
    }
}
```