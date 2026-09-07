class Solution {
    private int counter;
    private int answer;

    public int[] kthElements(TreeNode root, int k) {
        counter = k;
        answer = -1;
        ascending(root);
        int smallest = answer;

        counter = k;
        answer = -1;
        descending(root);
        return new int[]{ smallest, answer };
    }

    private void ascending(TreeNode n) {
        if (n == null || counter <= 0) return;
        ascending(n.left);
        if (--counter == 0) answer = n.val;
        ascending(n.right);
    }

    private void descending(TreeNode n) {
        if (n == null || counter <= 0) return;
        descending(n.right);
        if (--counter == 0) answer = n.val;
        descending(n.left);
    }
}
