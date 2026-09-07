import java.util.*;

class Solution {
    private int[] parent;

    public int minimumSpanningTree(int n, int[][] edges) {
        int[][] sorted = edges.clone();
        Arrays.sort(sorted, (a, b) -> Integer.compare(a[2], b[2]));
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        int total = 0, used = 0;
        for (int[] e : sorted) {
            int ru = find(e[0]), rv = find(e[1]);
            if (ru == rv) continue;
            parent[ru] = rv;
            total += e[2];
            used++;
        }
        return used == n - 1 ? total : -1;
    }

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];    // path halving
            x = parent[x];
        }
        return x;
    }
}
