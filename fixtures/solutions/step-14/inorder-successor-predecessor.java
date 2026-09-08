class Solution {
    public int inorderSuccessor(TreeNode root, int target) {
        int best = -1;
        TreeNode n = root;
        while (n != null) {
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
