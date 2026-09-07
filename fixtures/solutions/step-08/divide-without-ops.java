class Solution {
    public int divide(int dividend, int divisor) {
        if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
        boolean negative = (dividend < 0) ^ (divisor < 0);
        long a = Math.abs((long) dividend);
        long b = Math.abs((long) divisor);
        long q = 0;
        for (int shift = 31; shift >= 0; shift--) {
            if ((b << shift) <= a) {
                a -= (b << shift);
                q |= (1L << shift);
            }
        }
        if (negative) q = -q;
        if (q > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (q < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        return (int) q;
    }
}
