class Solution {
    public int power(long n, long x) {
        long mod = 1000000007L;
        long base = n % mod;
        long exp = x;
        long result = 1L;
        while (exp > 0) {
            if ((exp & 1L) == 1L) result = result * base % mod;
            base = base * base % mod;
            exp >>= 1;
        }
        return (int) result;
    }
}
