class Solution {
    public boolean graphColoring(int[][] graph, int m) {
        return go(graph, m, 0, new int[graph.length]);
    }
    private boolean go(int[][] g, int m, int v, int[] color) {
        if (v == g.length) return true;
        for (int c = 1; c <= m; c++) {
            if (!ok(g, color, v, c)) continue;
            color[v] = c;
            if (go(g, m, v + 1, color)) return true;
            color[v] = 0;
        }
        return false;
    }
    private boolean ok(int[][] g, int[] color, int v, int c) {
        for (int u = 0; u < g.length; u++) if (g[v][u] == 1 && color[u] == c) return false;
        return true;
    }
}
