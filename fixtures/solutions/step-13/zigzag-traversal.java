import java.util.*;

class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> out = new ArrayList<>();
        if (root == null) return out;
        Deque<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        boolean leftToRight = true;
        while (!q.isEmpty()) {
            int width = q.size();
            List<Integer> level = new ArrayList<>(width);
            for (int i = 0; i < width; i++) {
                TreeNode n = q.poll();
                level.add(n.val);
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
            if (!leftToRight) Collections.reverse(level);
            out.add(level);
            leftToRight = !leftToRight;
        }
        return out;
    }
}
