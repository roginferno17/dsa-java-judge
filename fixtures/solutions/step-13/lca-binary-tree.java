class Solution {
    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        return find(root, p, q).val;
    }

    private TreeNode find(TreeNode n, int p, int q) {
        if (n == null) return null;
        if (n.val == p || n.val == q) return n;
        TreeNode l = find(n.left, p, q);
        TreeNode r = find(n.right, p, q);
        if (l != null && r != null) return n;
        return (l != null) ? l : r;
    }
}
