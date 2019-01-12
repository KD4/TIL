/*
// Given an n-ary tree, return the preorder traversal of its nodes' values.
// N트리가 주어졌을 때 전위순회 하는 함수를 반환하라.
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val,List<Node> _children) {
        val = _val;
        children = _children;
    }
};
*/
class Solution {
    public List<Integer> preorder(Node root) {
        List<Integer> ret = new ArrayList<Integer>();
        traverse(root, ret);
        return ret;        
    }
    
    public void traverse(Node root, List<Integer> ret) {
        if (root == null) return;
        ret.add(root.val);
        for (Node child: root.children) {
            traverse(child, ret);
        }
    }
}