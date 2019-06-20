# Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.
# splice 꼬아 잇다
# 주어준 링크드리스트 두 개를 하나의 리스트로 만들어라. 두 리스트의 노드들을 꼬아서 만들어야한다.

# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        cur = None
        result = None

        while l1 is not None or l2 is not None:
            if l2 is None or (l1 is not None and l1.val < l2.val):
                if result is None:
                    result = l1
                    cur = l1
                    l1 = l1.next
                else:
                    cur.next = l1
                    cur = l1
                    l1 = l1.next
            else:
                if result is None:
                    result = l2
                    cur = l2
                    l2 = l2.next
                else:
                    cur.next = l2
                    cur = l2
                    l2 = l2.next
        
        return result
        