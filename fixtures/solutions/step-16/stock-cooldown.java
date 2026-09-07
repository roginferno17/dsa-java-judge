class Solution {
    public int maxProfit(int[] prices) {
        final int NEG = Integer.MIN_VALUE / 4;
        int hold = NEG, cool = NEG, free = 0;
        for (int p : prices) {
            int ph = hold, pc = cool, pf = free;
            hold = Math.max(ph, pf - p);
            cool = ph + p;
            free = Math.max(pf, pc);
        }
        return Math.max(0, Math.max(cool, free));
    }
}
