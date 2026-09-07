import java.util.*;

class Solution {
    public List<Integer> postorderTwoStacks(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        if (root == null) return out;
        Deque<TreeNode> st1 = new ArrayDeque<>();
        Deque<TreeNode> st2 = new ArrayDeque<>();
        st1.push(root);
        while (!st1.isEmpty()) {
            TreeNode n = st1.pop();
            st2.push(n);
            if (n.left != null) st1.push(n.left);
            if (n.right != null) st1.push(n.right);
        }
        while (!st2.isEmpty()) out.add(st2.pop().val);
        return out;
    }
}
