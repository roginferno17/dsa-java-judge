import java.util.*;

class Solution {
    private List<List<Integer>> adj;
    private int[] disc, low;
    private int timer;
    private Set<Integer> points;

    public List<Integer> articulationPoints(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }

        disc = new int[n];
        low = new int[n];
        Arrays.fill(disc, -1);
        timer = 0;
        points = new TreeSet<>();
        for (int i = 0; i < n; i++) if (disc[i] < 0) walk(i, -1);
        return new ArrayList<>(points);
    }

    private void walk(int u, int parent) {
        disc[u] = low[u] = timer++;
        int children = 0;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            if (disc[v] < 0) {
                children++;
                walk(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (parent != -1 && low[v] >= disc[u]) points.add(u);
            } else {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
        if (parent == -1 && children > 1) points.add(u);
    }
}
