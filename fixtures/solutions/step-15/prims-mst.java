import java.util.*;

class Solution {
    public int minimumSpanningTree(int n, int[][] edges) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[]{ e[1], e[2] });
            adj.get(e[1]).add(new int[]{ e[0], e[2] });
        }

        boolean[] inTree = new boolean[n];
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        pq.add(new int[]{ 0, 0 });
        int total = 0, added = 0;
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int u = top[1];
            if (inTree[u]) continue;
            inTree[u] = true;
            total += top[0];
            added++;
            for (int[] e : adj.get(u)) if (!inTree[e[0]]) pq.add(new int[]{ e[1], e[0] });
        }
        return added == n ? total : -1;
    }
}
