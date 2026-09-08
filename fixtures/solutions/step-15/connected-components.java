import java.util.*;

class Solution {
    public int countComponents(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            if (e[0] != e[1]) adj.get(e[1]).add(e[0]);
        }
        boolean[] seen = new boolean[n];
        int components = 0;
        for (int i = 0; i < n; i++) {
            if (seen[i]) continue;
            components++;
            Deque<Integer> st = new ArrayDeque<>();
            st.push(i);
            seen[i] = true;
            while (!st.isEmpty()) {
                int u = st.pop();
                for (int v : adj.get(u)) {
                    if (!seen[v]) { seen[v] = true; st.push(v); }
                }
            }
        }
        return components;
    }
}
