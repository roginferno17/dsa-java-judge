import java.util.*;

class Solution {
    public boolean findTarget(TreeNode root, int target) {
        List<Integer> values = new ArrayList<>();
        inorder(root, values);
        int i = 0, j = values.size() - 1;
        while (i < j) {
            int sum = values.get(i) + values.get(j);
            if (sum == target) return true;
            if (sum < target) i++;
            else j--;
        }
        return false;
    }

    private void inorder(TreeNode n, List<Integer> out) {
        if (n == null) return;
        inorder(n.left, out);
        out.add(n.val);
        inorder(n.right, out);
    }
}
