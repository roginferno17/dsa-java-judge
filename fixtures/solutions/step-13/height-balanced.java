class Solution {
    public boolean isBalanced(TreeNode root) {
        return check(root) >= 0;
    }

    /** Height, or -1 once any subtree below is unbalanced. */
    private int check(TreeNode n) {
        if (n == null) return 0;
        int l = check(n.left);
        if (l < 0) return -1;
        int r = check(n.right);
        if (r < 0) return -1;
        if (Math.abs(l - r) > 1) return -1;
        return 1 + Math.max(l, r);
    }
}
