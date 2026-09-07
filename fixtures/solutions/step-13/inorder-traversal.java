import java.util.*;

class Solution {
    public List<Integer> inorder(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        walk(root, out);
        return out;
    }

    private void walk(TreeNode n, List<Integer> o) {
        if (n == null) return;
        walk(n.left, o);
        o.add(n.val);
        walk(n.right, o);
    }
}
