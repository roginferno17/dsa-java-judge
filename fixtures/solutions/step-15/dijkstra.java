import java.util.*;

class Solution {
    public int[] dijkstra(int n, int[][] edges, int src) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[]{ e[1], e[2] });
            adj.get(e[1]).add(new int[]{ e[0], e[2] });
        }

        long[] dist = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[src] = 0;
        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        pq.add(new long[]{ 0, src });
        while (!pq.isEmpty()) {
            long[] top = pq.poll();
            int u = (int) top[1];
            if (top[0] > dist[u]) continue;          // stale entry
            for (int[] e : adj.get(u)) {
                long nd = dist[u] + e[1];
                if (nd < dist[e[0]]) { dist[e[0]] = nd; pq.add(new long[]{ nd, e[0] }); }
            }
        }
        int[] out = new int[n];
        for (int i = 0; i < n; i++) out[i] = (dist[i] == Long.MAX_VALUE) ? -1 : (int) dist[i];
        return out;
    }
}
