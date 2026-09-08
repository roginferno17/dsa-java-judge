import java.util.*;

class Solution {
    private List<List<Integer>> adj;
    private int[] state;   // 0 unseen, 1 in progress, 2 done

    public boolean hasCycle(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) adj.get(e[0]).add(e[1]);
        state = new int[n];
        for (int i = 0; i < n; i++) {
            if (state[i] == 0 && walk(i)) return true;
        }
        return false;
    }

    private boolean walk(int u) {
        state[u] = 1;
        for (int v : adj.get(u)) {
            if (state[v] == 1) return true;
            if (state[v] == 0 && walk(v)) return true;
        }
        state[u] = 2;
        return false;
    }
}
