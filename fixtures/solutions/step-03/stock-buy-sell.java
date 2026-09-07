class Solution {
    public int maxProfit(int[] prices) {
        int min = prices[0], best = 0;
        for (int p : prices) {
            best = Math.max(best, p - min);
            min = Math.min(min, p);
        }
        return best;
    }
}
