class Solution {
    public int ceilInBST(TreeNode root, int target) {
        int best = -1;
        TreeNode n = root;
        while (n != null) {
            if (n.val == target) return n.val;
            if (n.val > target) {
                best = n.val;
                n = n.left;
            } else {
                n = n.right;
            }
        }
        return best;
    }
}
