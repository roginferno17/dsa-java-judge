import java.util.*;

class Solution {
    public List<Integer> distanceK(TreeNode root, int target, int k) {
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        TreeNode start = index(root, null, target, parent);
        List<Integer> out = new ArrayList<>();
        if (start == null) return out;

        Set<TreeNode> seen = new HashSet<>();
        seen.add(start);
        List<TreeNode> level = new ArrayList<>();
        level.add(start);
        int d = 0;
        while (!level.isEmpty() && d < k) {
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode n : level) {
                for (TreeNode m : new TreeNode[]{ n.left, n.right, parent.get(n) }) {
                    if (m != null && seen.add(m)) next.add(m);
                }
            }
            level = next;
            d++;
        }
        if (d == k) for (TreeNode n : level) out.add(n.val);
        Collections.sort(out);
        return out;
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
