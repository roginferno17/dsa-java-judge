class Solution {
    public int[] bstStats(TreeNode root) {
        TreeNode lo = root;
        while (lo.left != null) lo = lo.left;
        TreeNode hi = root;
        while (hi.right != null) hi = hi.right;
        return new int[]{ lo.val, hi.val, height(root) };
    }

    private int height(TreeNode n) {
        if (n == null) return 0;
        return 1 + Math.max(height(n.left), height(n.right));
    }
}
