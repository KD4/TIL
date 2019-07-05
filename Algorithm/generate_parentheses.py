# -*- coding: utf-8 -*-
# Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
# n개의 괄호쌍이 주어졌을때, 쌍이 맞는 괄호 조합을 만드는 함수를 작성하라.
# backtracking == recursion + termination check
# 유망하지 않으면 배제를 하고 부모노드로 되돌아가면서 풀이 시간을 단축한다.

class Solution:
    def generateParenthesis(self, n):
        result = []
        self.process(n, 0, 0, "", result)
        return result
    
    def process(self, n, num_open, num_closed, temp_str, result):
        if num_open == n and num_closed == n:
            result.append(temp_str)
            return
        
        if num_open < n:
            self.process(n, num_open+1, num_closed, temp_str + "(", result)
        
        if num_closed < num_open:
            self.process(n, num_open, num_closed+1, temp_str + ")", result)


result = Solution()

print(result.generateParenthesis(3))
        