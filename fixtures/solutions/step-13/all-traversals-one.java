import java.util.*;

class Solution {
    private static class Frame {
        TreeNode node;
        int state;
        Frame(TreeNode n) { node = n; state = 1; }
    }

    public List<List<Integer>> allInOnePass(TreeNode root) {
        List<Integer> pre = new ArrayList<>(), in = new ArrayList<>(), post = new ArrayList<>();
        Deque<Frame> st = new ArrayDeque<>();
        if (root != null) st.push(new Frame(root));
        while (!st.isEmpty()) {
            Frame f = st.peek();
            if (f.state == 1) {
                pre.add(f.node.val);
                f.state = 2;
                if (f.node.left != null) st.push(new Frame(f.node.left));
            } else if (f.state == 2) {
                in.add(f.node.val);
                f.state = 3;
                if (f.node.right != null) st.push(new Frame(f.node.right));
            } else {
                post.add(f.node.val);
                st.pop();
            }
        }
        List<List<Integer>> out = new ArrayList<>();
        out.add(pre);
        out.add(in);
        out.add(post);
        return out;
    }
}
