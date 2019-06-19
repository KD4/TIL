# The Hamming distance between two integers is the number of positions at which the corresponding bits are different
# corresponding: 상응하는, 일치하는, 해당하는
# 두 정수 간 해밍 거리는 같은 위치의 비트의 값이 다른 위치들의 개수를 말한다. 

# 두 정수를 XOR 연산하고 1의 개수를 세면 될 것 같다.

# bit 연산이란?
# a = 3이고 b = 2일 때, 즉 11과 10 인 경우
# a & b = 10 : 두 비트가 모두 1이면 1, 아니면 0
# a | b = 11 : 두 비트 중 하나라도 1, 아니면 0
# a ^ b = 01 : 두 비트가 다르면 1, 아니면 0
# 쉬프트 연산
# a >> i : a의 모든 비트를 오른쪽으로 i 만큼 밀고 맨 왼쪽을 0으로 채움
# a << i : a의 모든 비트를 왼쪽으로 i만큼 밀고 맨 오른쪽을 0으로 채움


class Solution:
    def hammingDistance(self, x: int, y: int) -> int:
        result = 0
        for i in bin(x ^ y)[2:]:
            result += int(i)
        return result

print(Solution().hammingDistance(60, 13))

    
    