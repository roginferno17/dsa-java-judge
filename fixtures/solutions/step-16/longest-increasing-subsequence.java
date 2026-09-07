class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        int[] len = new int[n];
        int best = 0;
        for (int i = 0; i < n; i++) {
            len[i] = 1;
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) len[i] = Math.max(len[i], len[j] + 1);
            }
            best = Math.max(best, len[i]);
        }
        return best;
    }
}
