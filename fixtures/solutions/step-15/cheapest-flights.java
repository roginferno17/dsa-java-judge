import java.util.*;

class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        long[] cost = new long[n];
        Arrays.fill(cost, Long.MAX_VALUE);
        cost[src] = 0;
        for (int round = 0; round <= k; round++) {
            long[] next = cost.clone();           // read from the previous round only
            for (int[] f : flights) {
                if (cost[f[0]] == Long.MAX_VALUE) continue;
                next[f[1]] = Math.min(next[f[1]], cost[f[0]] + f[2]);
            }
            cost = next;
        }
        return cost[dst] == Long.MAX_VALUE ? -1 : (int) cost[dst];
    }
}
