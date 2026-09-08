class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int l = leftDepth(root), r = rightDepth(root);
        if (l == r) return (1 << l) - 1;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }

    private int leftDepth(TreeNode n) {
        int d = 0;
        while (n != null) { d++; n = n.left; }
        return d;
    }

    private int rightDepth(TreeNode n) {
        int d = 0;
        while (n != null) { d++; n = n.right; }
        return d;
    }
}
