class Solution {
    public int smallestDivisor(int[] nums, int threshold) {
        int low = 1, high = 1, ans = 1;
        for (int x : nums) high = Math.max(high, x);
        while (low <= high) {
            int mid = low + (high - low) / 2;
            long sum = 0;
            for (int x : nums) sum += (x + (long) mid - 1) / mid;
            if (sum <= threshold) { ans = mid; high = mid - 1; } else low = mid + 1;
        }
        return ans;
    }
}
