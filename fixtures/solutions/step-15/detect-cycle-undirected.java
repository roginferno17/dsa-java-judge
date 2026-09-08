import java.util.*;

class Solution {
    private List<List<Integer>> adj;
    private boolean[] seen;

    public boolean hasCycle(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        seen = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (!seen[i] && walk(i, -1)) return true;
        }
        return false;
    }

    private boolean walk(int u, int parent) {
        seen[u] = true;
        for (int v : adj.get(u)) {
            if (!seen[v]) {
                if (walk(v, u)) return true;
            } else if (v != parent) {
                return true;
            }
        }
        return false;
    }
}
