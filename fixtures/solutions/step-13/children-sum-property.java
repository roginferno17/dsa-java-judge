class Solution {
    public boolean hasChildrenSum(TreeNode root) {
        if (root == null) return true;
        if (root.left == null && root.right == null) return true;
        int sum = (root.left != null ? root.left.val : 0)
                + (root.right != null ? root.right.val : 0);
        if (root.val != sum) return false;
        return hasChildrenSum(root.left) && hasChildrenSum(root.right);
    }
}
