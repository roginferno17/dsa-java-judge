import java.util.*;

class Solution {
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        List<int[]> points = new ArrayList<>();   // {column, depth, value}
        collect(root, 0, 0, points);
        points.sort((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0])
                : a[1] != b[1] ? Integer.compare(a[1], b[1])
                : Integer.compare(a[2], b[2]));

        List<List<Integer>> out = new ArrayList<>();
        List<Integer> cur = null;
        Integer col = null;
        for (int[] p : points) {
            if (col == null || p[0] != col) {
                col = p[0];
                cur = new ArrayList<>();
                out.add(cur);
            }
            cur.add(p[2]);
        }
        return out;
    }

    private void collect(TreeNode n, int c, int d, List<int[]> points) {
        if (n == null) return;
        points.add(new int[]{ c, d, n.val });
        collect(n.left, c - 1, d + 1, points);
        collect(n.right, c + 1, d + 1, points);
    }
}
