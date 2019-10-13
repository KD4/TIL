// Given a binary tree,
// return the bottom-up level order traversal of its nodes' values.
// (ie, from left to right, level by level from leaf to root).

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
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        // result 선언
        // 큐에 트리를 레벨 단계별로 차례대로 넣고 꺼내면된다.
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while(!q.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            int size = q.size();
            for (int i = 0 ; i < size; i++) {
                TreeNode node = q.poll();
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
                level.add(node.val);
            }
            result.add(0, level);
        }

        return result;
    }
}