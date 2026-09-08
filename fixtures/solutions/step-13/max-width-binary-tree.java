import java.util.*;

class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        int best = 0;
        List<Object[]> level = new ArrayList<>();
        level.add(new Object[]{ root, 0 });
        while (!level.isEmpty()) {
            int base = (Integer) level.get(0)[1];
            int last = (Integer) level.get(level.size() - 1)[1];
            best = Math.max(best, last - base + 1);
            List<Object[]> next = new ArrayList<>();
            for (Object[] e : level) {
                TreeNode n = (TreeNode) e[0];
                int j = (Integer) e[1] - base;     // rebase to avoid overflow
                if (n.left != null) next.add(new Object[]{ n.left, 2 * j + 1 });
                if (n.right != null) next.add(new Object[]{ n.right, 2 * j + 2 });
            }
            level = next;
        }
        return best;
    }
}
