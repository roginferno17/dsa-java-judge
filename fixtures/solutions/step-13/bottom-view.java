import java.util.*;

class Solution {
    public List<Integer> bottomView(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        if (root == null) return out;
        TreeMap<Integer, Integer> byColumn = new TreeMap<>();
        Deque<Object[]> q = new ArrayDeque<>();
        q.add(new Object[]{ root, 0 });
        while (!q.isEmpty()) {
            Object[] e = q.poll();
            TreeNode n = (TreeNode) e[0];
            int c = (Integer) e[1];
            byColumn.put(c, n.val);          // overwrite: the deepest wins
            if (n.left != null) q.add(new Object[]{ n.left, c - 1 });
            if (n.right != null) q.add(new Object[]{ n.right, c + 1 });
        }
        out.addAll(byColumn.values());
        return out;
    }
}
