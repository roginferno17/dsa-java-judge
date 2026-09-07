import java.util.*;

class Solution {
    public List<Integer> postorder(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        walk(root, out);
        return out;
    }

    private void walk(TreeNode n, List<Integer> o) {
        if (n == null) return;
        walk(n.left, o);
        walk(n.right, o);
        o.add(n.val);
    }
}
