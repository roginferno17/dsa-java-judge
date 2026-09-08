class Solution {
    public int splitArray(int[] nums, int k) {
        int low = 0, high = 0;
        for (int x : nums) { low = Math.max(low, x); high += x; }
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int parts = 1, sum = 0;
            for (int x : nums) {
                if (sum + x > mid) { parts++; sum = x; } else sum += x;
            }
            if (parts <= k) { ans = mid; high = mid - 1; } else low = mid + 1;
        }
        return ans;
    }
}
