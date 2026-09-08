import java.util.*;

class Solution {
    public List<Integer> topologicalSort(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        int[] indeg = new int[n];
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); indeg[e[1]]++; }

        PriorityQueue<Integer> ready = new PriorityQueue<>();
        for (int i = 0; i < n; i++) if (indeg[i] == 0) ready.add(i);

        List<Integer> out = new ArrayList<>();
        while (!ready.isEmpty()) {
            int u = ready.poll();
            out.add(u);
            for (int v : adj.get(u)) if (--indeg[v] == 0) ready.add(v);
        }
        return out;
    }
}
