Maximum Subarray
==================================

## Problem

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

정수형 배열이 주어졌을 때, 연속되는 부분 배열의 합이 가장 큰 배열 원소들의 합을 반환하는 함수를 짜시오.


## Example 1
```
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```
Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

## Solution

DP 활용 문제이다. 메모이제이션에 들어가는 값을 구하는 문제.
메모이제이션 배열 d[i]에는 i번째 원소가 마지막 원소인 부분배열의 합 중 최대값이 저장된다. 
예를 들어 위 예제 배열이 주어졌을 때 d[2]의 값은 다음과 같다.
```java
Math.max(nums[2], nums[2]+ nums[1], nums[2]+nums[1]+nums[0])
```

이를 다르게 본다면 아래와 같이 표현할 수 있다.
```java
Math.max(nums[2], d[1]+nums[2]);
```

위와 같이 메모이제이션 배열을 활용한 풀이는 아래와 같다.

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int[] d = new int[nums.length];
        d[0] = nums[0];
        
        for (int i = 1; i<nums.length;i++) {
            d[i] = Math.max(d[i-1]+nums[i], nums[i]);
        }
        
        int max = d[0];
        for (int cur: d) {
            max = Math.max(cur, max);
        }
        
        return max;
    }
}
```