class Solution {
    public TreeNode copyTree(TreeNode root) {
        if (root == null) return null;
        TreeNode copy = new TreeNode(root.val);
        copy.left = copyTree(root.left);
        copy.right = copyTree(root.right);
        return copy;
    }
}
