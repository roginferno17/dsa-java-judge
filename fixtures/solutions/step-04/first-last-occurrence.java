class Solution {
    public int[] searchRange(int[] nums, int target) {
        int lb = bound(nums, target, true);
        if (lb == nums.length || nums[lb] != target) return new int[]{ -1, -1 };
        return new int[]{ lb, bound(nums, target, false) - 1 };
    }
    private int bound(int[] a, int t, boolean lower) {
        int low = 0, high = a.length - 1, ans = a.length;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            boolean ok = lower ? a[mid] >= t : a[mid] > t;
            if (ok) { ans = mid; high = mid - 1; } else low = mid + 1;
        }
        return ans;
    }
}
