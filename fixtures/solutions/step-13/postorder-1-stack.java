import java.util.*;

class Solution {
    public List<Integer> postorderOneStack(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        Deque<TreeNode> st = new ArrayDeque<>();
        TreeNode cur = root, lastVisited = null;
        while (cur != null || !st.isEmpty()) {
            while (cur != null) {
                st.push(cur);
                cur = cur.left;
            }
            TreeNode top = st.peek();
            if (top.right != null && top.right != lastVisited) {
                cur = top.right;
            } else {
                out.add(top.val);
                lastVisited = st.pop();
            }
        }
        return out;
    }
}
