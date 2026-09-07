import java.util.*;

class Solution {
    public List<List<Integer>> allTraversals(TreeNode root) {
        List<Integer> pre = new ArrayList<>(), in = new ArrayList<>(), post = new ArrayList<>();
        preorder(root, pre);
        inorder(root, in);
        postorder(root, post);
        List<List<Integer>> out = new ArrayList<>();
        out.add(pre);
        out.add(in);
        out.add(post);
        return out;
    }

    private void preorder(TreeNode n, List<Integer> o) {
        if (n == null) return;
        o.add(n.val);
        preorder(n.left, o);
        preorder(n.right, o);
    }

    private void inorder(TreeNode n, List<Integer> o) {
        if (n == null) return;
        inorder(n.left, o);
        o.add(n.val);
        inorder(n.right, o);
    }

    private void postorder(TreeNode n, List<Integer> o) {
        if (n == null) return;
        postorder(n.left, o);
        postorder(n.right, o);
        o.add(n.val);
    }
}
