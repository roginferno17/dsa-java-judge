class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        return Math.max(robLine(nums, 0, n - 2), robLine(nums, 1, n - 1));
    }

    private int robLine(int[] nums, int from, int to) {
        int twoBack = 0, oneBack = 0;
        for (int i = from; i <= to; i++) {
            int cur = Math.max(oneBack, twoBack + nums[i]);
            twoBack = oneBack;
            oneBack = cur;
        }
        return oneBack;
    }
}
