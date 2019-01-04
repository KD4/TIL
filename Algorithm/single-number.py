# 정수형 배열이 주어졌을 때, 이 정수형 배열에는 한 숫자만 제외하고 두번씩 반복된다. 한번만 등장하는 숫자를 반환해라.
# XOR 배타 연산을 통해서 들어온 모든 배열의 값을 계산한다면 마지막에 남는 숫자가 한번만 등장하는 숫자이다. 
class Solution:
    def singleNumber(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        ret = 0
        for num in nums:
            ret ^= num
            
        return num
        