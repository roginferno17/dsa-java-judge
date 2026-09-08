import java.util.*;

class Solution {
    private List<List<Integer>> adj;
    private int[] disc, low;
    private int timer;
    private List<List<Integer>> bridges;

    public List<List<Integer>> findBridges(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }

        disc = new int[n];
        low = new int[n];
        Arrays.fill(disc, -1);
        timer = 0;
        bridges = new ArrayList<>();
        for (int i = 0; i < n; i++) if (disc[i] < 0) walk(i, -1);
        bridges.sort((a, b) -> a.get(0).equals(b.get(0))
                ? Integer.compare(a.get(1), b.get(1))
                : Integer.compare(a.get(0), b.get(0)));
        return bridges;
    }

    private void walk(int u, int parent) {
        disc[u] = low[u] = timer++;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            if (disc[v] < 0) {
                walk(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) {
                    bridges.add(Arrays.asList(Math.min(u, v), Math.max(u, v)));
                }
            } else {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
}
