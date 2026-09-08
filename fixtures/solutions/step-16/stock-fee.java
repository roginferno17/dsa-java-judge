class Solution {
    public int maxProfit(int[] prices, int fee) {
        int hold = -prices[0], free = 0;
        for (int i = 1; i < prices.length; i++) {
            int ph = hold, pf = free;
            hold = Math.max(ph, pf - prices[i]);
            free = Math.max(pf, ph + prices[i] - fee);
        }
        return free;
    }
}
