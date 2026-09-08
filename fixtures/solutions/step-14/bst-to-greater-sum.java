class Solution {
    private int running;

    public TreeNode convertBST(TreeNode root) {
        running = 0;
        reverseInorder(root);
        return root;
    }

    private void reverseInorder(TreeNode n) {
        if (n == null) return;
        reverseInorder(n.right);
        running += n.val;
        n.val = running;
        reverseInorder(n.left);
    }
}
