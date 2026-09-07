class Solution {
    public int knapsack(int[] weights, int[] values, int capacity) {
        int[] best = new int[capacity + 1];
        for (int i = 0; i < weights.length; i++) {
            for (int c = capacity; c >= weights[i]; c--) {
                best[c] = Math.max(best[c], values[i] + best[c - weights[i]]);
            }
        }
        return best[capacity];
    }
}
