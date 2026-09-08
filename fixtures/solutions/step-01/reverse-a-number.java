class Solution {
    public int reverse(int x) {
        long result = 0;
        long v = x;
        while (v != 0) { result = result * 10 + v % 10; v /= 10; }
        if (result < Integer.MIN_VALUE || result > Integer.MAX_VALUE) return 0;
        return (int) result;
    }
}
