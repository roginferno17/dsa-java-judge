class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int v : nums) total += v;
        if (total % 2 != 0) return false;
        int half = total / 2;
        boolean[] reach = new boolean[half + 1];
        reach[0] = true;
        for (int v : nums) {
            for (int t = half; t >= v; t--) {
                if (reach[t - v]) reach[t] = true;
            }
        }
        return reach[half];
    }
}
