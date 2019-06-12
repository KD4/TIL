import sys

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def __init__(self):
        self.initflag = False
        self.prev = 0
        self.min = sys.maxsize

    def getMinimumDifference(self, root: TreeNode) -> int:
        self.travelInorder(root)
        return self.min

    def travelInorder(self, root: TreeNode):
        if root is None:
            return

        self.travelInorder(root.left)

        if self.initflag:
            self.min = self.min if self.min < root.val - self.prev else root.val - self.prev
        else:
            self.initflag = True

        self.prev = root.val

        self.travelInorder(root.right)




