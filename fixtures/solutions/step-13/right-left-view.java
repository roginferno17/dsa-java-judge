import java.util.*;

class Solution {
    public List<Integer> sideView(TreeNode root, boolean fromRight) {
        List<Integer> out = new ArrayList<>();
        if (root == null) return out;
        Deque<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        while (!q.isEmpty()) {
            int width = q.size();
            for (int i = 0; i < width; i++) {
                TreeNode n = q.poll();
                boolean visible = fromRight ? (i == width - 1) : (i == 0);
                if (visible) out.add(n.val);
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
        }
        return out;
    }
}
