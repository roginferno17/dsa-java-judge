class Solution {
    private TreeNode first, second, previous;

    public TreeNode recoverTree(TreeNode root) {
        first = null;
        second = null;
        previous = null;
        inorder(root);
        if (first != null && second != null) {
            int t = first.val;
            first.val = second.val;
            second.val = t;
        }
        return root;
    }

    private void inorder(TreeNode n) {
        if (n == null) return;
        inorder(n.left);
        if (previous != null && previous.val > n.val) {
            if (first == null) first = previous;
            second = n;
        }
        previous = n;
        inorder(n.right);
    }
}
