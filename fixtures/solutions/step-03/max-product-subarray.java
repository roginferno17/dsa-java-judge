class Solution {
    public int maxProduct(int[] nums) {
        int curMax = nums[0], curMin = nums[0], best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int v = nums[i];
            if (v < 0) { int t = curMax; curMax = curMin; curMin = t; }
            curMax = Math.max(v, curMax * v);
            curMin = Math.min(v, curMin * v);
            best = Math.max(best, curMax);
        }
        return best;
    }
}
