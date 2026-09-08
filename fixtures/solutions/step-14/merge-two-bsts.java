import java.util.*;

class Solution {
    public List<Integer> mergeBSTs(TreeNode a, TreeNode b) {
        List<Integer> x = new ArrayList<>(), y = new ArrayList<>();
        inorder(a, x);
        inorder(b, y);
        List<Integer> out = new ArrayList<>(x.size() + y.size());
        int i = 0, j = 0;
        while (i < x.size() && j < y.size()) {
            if (x.get(i) <= y.get(j)) out.add(x.get(i++));
            else out.add(y.get(j++));
        }
        while (i < x.size()) out.add(x.get(i++));
        while (j < y.size()) out.add(y.get(j++));
        return out;
    }

    private void inorder(TreeNode n, List<Integer> out) {
        if (n == null) return;
        inorder(n.left, out);
        out.add(n.val);
        inorder(n.right, out);
    }
}
