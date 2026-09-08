class Solution {
    public boolean existsSubsequence(int[] nums, int k) {
        return exists(nums, 0, 0, k);
    }
    private boolean exists(int[] a, int i, int sum, int k) {
        if (i == a.length) return sum == k;
        return exists(a, i + 1, sum + a[i], k) || exists(a, i + 1, sum, k);
    }
}
