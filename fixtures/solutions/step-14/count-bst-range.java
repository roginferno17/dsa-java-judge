class Solution {
    public int countInRange(TreeNode root, int low, int high) {
        if (root == null) return 0;
        if (root.val < low) return countInRange(root.right, low, high);
        if (root.val > high) return countInRange(root.left, low, high);
        return 1 + countInRange(root.left, low, high) + countInRange(root.right, low, high);
    }
}
