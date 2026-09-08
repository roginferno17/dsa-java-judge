class Solution {
    public double myPow(double x, int n) {
        long e = n;
        boolean neg = e < 0;
        if (neg) e = -e;
        double r = power(x, e);
        return neg ? 1.0 / r : r;
    }
    private double power(double x, long e) {
        if (e == 0) return 1.0;
        double half = power(x, e / 2);
        return (e % 2 == 0) ? half * half : half * half * x;
    }
}
