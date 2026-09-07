class Solution {
    public int maxProfit(int[] prices) {
        int lowest = Integer.MAX_VALUE, best = 0;
        for (int p : prices) {
            best = Math.max(best, p - lowest);
            lowest = Math.min(lowest, p);
        }
        return best;
    }
}
