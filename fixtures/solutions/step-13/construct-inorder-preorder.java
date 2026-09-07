import java.util.*;

class Solution {
    private Map<Integer, Integer> position;
    private int cursor;

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        position = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) position.put(inorder[i], i);
        cursor = 0;
        return build(preorder, 0, inorder.length - 1);
    }

    private TreeNode build(int[] preorder, int lo, int hi) {
        if (lo > hi) return null;
        int val = preorder[cursor++];
        TreeNode node = new TreeNode(val);
        int mid = position.get(val);
        node.left = build(preorder, lo, mid - 1);
        node.right = build(preorder, mid + 1, hi);
        return node;
    }
}
