class Solution {
    private int nodes, leafCount;

    public int[] treeStats(TreeNode root) {
        walk(root);
        return new int[]{ nodes, leafCount, nodes - leafCount };
    }

    private void walk(TreeNode n) {
        if (n == null) return;
        nodes++;
        if (n.left == null && n.right == null) leafCount++;
        walk(n.left);
        walk(n.right);
    }
}
