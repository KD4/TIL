/**
 * Given a binary search tree, write a function kthSmallest to find k th smallest element in it.
 * 이진검색트리가 주어졌을때 k번째로 큰 엘리먼트를 반환하라
 * Note:
 * 이진검색트리를 중위순회하면 정렬된 리스트를 얻을 수 있다. 
 */

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    int index;
    int targetIndex;
    int result;
    
    public int kthSmallest(TreeNode root, int k) {
        this.targetIndex = k;
        traverse(root);
        return result;
    }
    
    public void traverse(TreeNode root) {
        if (root == null) return;
        
        traverse(root.left);
        if (++this.index == targetIndex) {
            this.result = root.val;
            return;
        }
        traverse(root.right);
    }
}