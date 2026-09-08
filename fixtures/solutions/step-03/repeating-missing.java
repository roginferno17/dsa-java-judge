class Solution {
    public int[] findRepeatingMissing(int[] nums) {
        long n = nums.length;
        long sn = n * (n + 1) / 2;
        long s2n = n * (n + 1) * (2 * n + 1) / 6;
        long s = 0, s2 = 0;
        for (int x : nums) { s += x; s2 += (long) x * x; }
        long diff = s - sn;          // x - y
        long sqDiff = s2 - s2n;      // x^2 - y^2
        long sum = sqDiff / diff;    // x + y
        long x = (diff + sum) / 2;
        long y = sum - x;
        return new int[]{ (int) x, (int) y };
    }
}
