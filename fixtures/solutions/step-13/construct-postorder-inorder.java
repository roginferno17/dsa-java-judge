import java.util.*;

class Solution {
    private Map<Integer, Integer> position;
    private int cursor;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        position = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) position.put(inorder[i], i);
        cursor = postorder.length - 1;
        return build(postorder, 0, inorder.length - 1);
    }

    private TreeNode build(int[] postorder, int lo, int hi) {
        if (lo > hi) return null;
        int val = postorder[cursor--];
        TreeNode node = new TreeNode(val);
        int mid = position.get(val);
        node.right = build(postorder, mid + 1, hi);   // right before left
        node.left = build(postorder, lo, mid - 1);
        return node;
    }
}
