class Solution {
    public int longestSubarray(int[] nums, long k) {
        int left = 0, best = 0;
        long sum = 0;
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum > k && left <= right) sum -= nums[left++];
            if (sum == k) best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
