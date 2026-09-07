class Solution {
    public int[] predecessorSuccessor(TreeNode root, int target) {
        int pred = -1, succ = -1;
        TreeNode n = root;
        while (n != null) {
            if (n.val < target) {
                pred = n.val;
                n = n.right;
            } else {
                n = n.left;
            }
        }
        n = root;
        while (n != null) {
            if (n.val > target) {
                succ = n.val;
                n = n.left;
            } else {
                n = n.right;
            }
        }
        return new int[]{ pred, succ };
    }
}
