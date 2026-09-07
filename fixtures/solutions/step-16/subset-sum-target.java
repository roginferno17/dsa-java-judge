class Solution {
    public boolean subsetSum(int[] nums, int target) {
        boolean[] reach = new boolean[target + 1];
        reach[0] = true;
        for (int v : nums) {
            for (int t = target; t >= v; t--) {
                if (reach[t - v]) reach[t] = true;
            }
        }
        return reach[target];
    }
}
