import java.util.*;

class Solution {
    public int timeToBurn(TreeNode root, int start) {
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        TreeNode from = index(root, null, start, parent);
        if (from == null) return 0;

        Set<TreeNode> seen = new HashSet<>();
        seen.add(from);
        List<TreeNode> level = new ArrayList<>();
        level.add(from);
        int minutes = 0;
        while (true) {
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode n : level) {
                for (TreeNode m : new TreeNode[]{ n.left, n.right, parent.get(n) }) {
                    if (m != null && seen.add(m)) next.add(m);
                }
            }
            if (next.isEmpty()) break;
            level = next;
            minutes++;
        }
        return minutes;
    }

    private TreeNode index(TreeNode n, TreeNode p, int target, Map<TreeNode, TreeNode> parent) {
        if (n == null) return null;
        parent.put(n, p);
        TreeNode found = (n.val == target) ? n : null;
        TreeNode l = index(n.left, n, target, parent);
        TreeNode r = index(n.right, n, target, parent);
        if (found != null) return found;
        return (l != null) ? l : r;
    }
}
