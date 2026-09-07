import java.util.*;

class Solution {
    public List<Integer> rootToNodePath(TreeNode root, int target) {
        List<Integer> path = new ArrayList<>();
        return find(root, target, path) ? path : new ArrayList<>();
    }

    private boolean find(TreeNode n, int target, List<Integer> path) {
        if (n == null) return false;
        path.add(n.val);
        if (n.val == target) return true;
        if (find(n.left, target, path) || find(n.right, target, path)) return true;
        path.remove(path.size() - 1);
        return false;
    }
}
