import java.util.*;

class Solution {
    public int[] shortestPathDAG(int n, int[][] edges, int src) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        int[] indeg = new int[n];
        for (int[] e : edges) { adj.get(e[0]).add(new int[]{ e[1], e[2] }); indeg[e[1]]++; }

        Deque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) if (indeg[i] == 0) q.add(i);
        List<Integer> order = new ArrayList<>();
        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int[] e : adj.get(u)) if (--indeg[e[0]] == 0) q.add(e[0]);
        }

        long[] dist = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[src] = 0;
        for (int u : order) {
            if (dist[u] == Long.MAX_VALUE) continue;
            for (int[] e : adj.get(u)) dist[e[0]] = Math.min(dist[e[0]], dist[u] + e[1]);
        }
        int[] out = new int[n];
        for (int i = 0; i < n; i++) out[i] = (dist[i] == Long.MAX_VALUE) ? -1 : (int) dist[i];
        return out;
    }
}
