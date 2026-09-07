import java.util.*;

class Solution {
    public List<Integer> bfs(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            if (e[0] != e[1]) adj.get(e[1]).add(e[0]);
        }
        for (List<Integer> row : adj) Collections.sort(row);

        List<Integer> out = new ArrayList<>();
        boolean[] seen = new boolean[n];
        Deque<Integer> q = new ArrayDeque<>();
        q.add(0);
        seen[0] = true;
        while (!q.isEmpty()) {
            int u = q.poll();
            out.add(u);
            for (int v : adj.get(u)) {
                if (!seen[v]) { seen[v] = true; q.add(v); }
            }
        }
        return out;
    }
}
