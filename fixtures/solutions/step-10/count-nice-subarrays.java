class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    private int atMost(int[] nums, int limit) {
        if (limit < 0) return 0;
        int left = 0, odds = 0, count = 0;
        for (int right = 0; right < nums.length; right++) {
            odds += nums[right] & 1;
            while (odds > limit) odds -= nums[left++] & 1;
            count += right - left + 1;
        }
        return count;
    }
}
