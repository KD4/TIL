/**
*Given a non-empty, singly linked list with head node head, return a middle node of linked list.

*If there are two middle nodes, return the second middle node.
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    // walker
    // runner
    // walker는 한번에 한 칸씩 전진
    // runner는 한번에 두 칸씩 전진
    // runner의 위치가 null이면 walker 반환
    public ListNode middleNode(ListNode head) {
        ListNode walker = head;
        ListNode runner = head;
        
        while(runner != null) {
            runner = runner.next;
            if (runner != null) {
                walker = walker.next;
                runner = runner.next;
            }
        }
        
        return walker;
    }
}