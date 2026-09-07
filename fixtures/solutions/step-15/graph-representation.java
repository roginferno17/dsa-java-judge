import java.util.*;

class Solution {
    public List<List<Integer>> adjacencyList(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            if (e[0] != e[1]) adj.get(e[1]).add(e[0]);
        }
        for (List<Integer> row : adj) Collections.sort(row);
        return adj;
    }
}
