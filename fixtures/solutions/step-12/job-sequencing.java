import java.util.*;

class Solution {
    public int[] jobScheduling(int[] deadlines, int[] profits) {
        int n = deadlines.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) order[i] = i;
        Arrays.sort(order, (x, y) -> Integer.compare(profits[y], profits[x]));

        int maxDeadline = 0;
        for (int d : deadlines) maxDeadline = Math.max(maxDeadline, d);
        boolean[] taken = new boolean[maxDeadline + 1];

        int count = 0, total = 0;
        for (int i : order) {
            for (int slot = Math.min(deadlines[i], maxDeadline); slot >= 1; slot--) {
                if (!taken[slot]) {
                    taken[slot] = true;
                    count++;
                    total += profits[i];
                    break;
                }
            }
        }
        return new int[]{ count, total };
    }
}
