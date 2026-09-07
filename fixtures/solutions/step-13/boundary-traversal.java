import java.util.*;

class Solution {
    public List<Integer> boundary(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        if (root == null) return out;
        if (isLeaf(root)) {
            out.add(root.val);
            return out;
        }
        out.add(root.val);

        for (TreeNode c = root.left; c != null; c = (c.left != null) ? c.left : c.right) {
            if (!isLeaf(c)) out.add(c.val);
        }

        addLeaves(root, out);

        List<Integer> right = new ArrayList<>();
        for (TreeNode c = root.right; c != null; c = (c.right != null) ? c.right : c.left) {
            if (!isLeaf(c)) right.add(c.val);
        }
        Collections.reverse(right);
        out.addAll(right);
        return out;
    }

    private boolean isLeaf(TreeNode n) {
        return n.left == null && n.right == null;
    }

    private void addLeaves(TreeNode n, List<Integer> out) {
        if (n == null) return;
        if (isLeaf(n)) {
            out.add(n.val);
            return;
        }
        addLeaves(n.left, out);
        addLeaves(n.right, out);
    }
}
