import java.util.*;

class Solution {
    public double fractionalKnapsack(int[] values, int[] weights, int capacity) {
        int n = values.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) order[i] = i;
        Arrays.sort(order, (x, y) -> Double.compare(
                (double) values[y] / weights[y], (double) values[x] / weights[x]));

        double total = 0.0;
        long remaining = capacity;
        for (int i : order) {
            if (remaining <= 0) break;
            if (weights[i] <= remaining) {
                total += values[i];
                remaining -= weights[i];
            } else {
                total += (double) values[i] * remaining / weights[i];
                remaining = 0;
            }
        }
        return total;
    }
}
