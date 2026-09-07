class Solution {
    public boolean searchBST(TreeNode root, int target) {
        TreeNode n = root;
        while (n != null) {
            if (n.val == target) return true;
            n = (target < n.val) ? n.left : n.right;
        }
        return false;
    }
}
