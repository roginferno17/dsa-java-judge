class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int v : nums) total += v;
        long needed = (long) total + target;
        if (needed < 0 || needed % 2 != 0 || needed / 2 > total) return 0;
        int t = (int) (needed / 2);
        int[] ways = new int[t + 1];
        ways[0] = 1;
        for (int v : nums) {
            for (int s = t; s >= v; s--) ways[s] += ways[s - v];
        }
        return ways[t];
    }
}
