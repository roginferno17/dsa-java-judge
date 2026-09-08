import java.util.*;

class Solution {
    private List<List<Integer>> adj;
    private boolean[] seen;
    private List<Integer> out;

    public List<Integer> dfs(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            if (e[0] != e[1]) adj.get(e[1]).add(e[0]);
        }
        for (List<Integer> row : adj) Collections.sort(row);

        seen = new boolean[n];
        out = new ArrayList<>();
        walk(0);
        return out;
    }

    private void walk(int u) {
        seen[u] = true;
        out.add(u);
        for (int v : adj.get(u)) if (!seen[v]) walk(v);
    }
}
