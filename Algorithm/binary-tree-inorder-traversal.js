/**
 * @see https://leetcode.com/problems/binary-tree-inorder-traversal/description/
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    return travelTreeOrderIn(root);
};

function travelTreeOrderIn(root) {
    if (!root) return [];
    return [
        ...travelTreeOrderIn(root.left), 
        root.val,
        ...travelTreeOrderIn(root.right)
    ];
}
