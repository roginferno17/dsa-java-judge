class Solution {
    public int countSubsets(int[] nums, int k) {
        return countWithSum(nums, k);
    }

    /** Number of subsets of nums summing to exactly t, modulo the prime. */
    private int countWithSum(int[] nums, int t) {
        final int MOD = 1000000007;
        if (t < 0) return 0;
        int[] ways = new int[t + 1];
        ways[0] = 1;
        for (int v : nums) {
            for (int s = t; s >= v; s--) {
                ways[s] = (ways[s] + ways[s - v]) % MOD;
            }
        }
        return ways[t];
    }
}
