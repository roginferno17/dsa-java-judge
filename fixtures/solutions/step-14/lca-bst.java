class Solution {
    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        TreeNode n = root;
        while (n != null) {
            if (p < n.val && q < n.val) n = n.left;
            else if (p > n.val && q > n.val) n = n.right;
            else return n.val;
        }
        return -1;
    }
}
