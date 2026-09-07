class Solution {
    public int countOccurrences(int[] nums, int target) {
        return bound(nums, target, false) - bound(nums, target, true);
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
