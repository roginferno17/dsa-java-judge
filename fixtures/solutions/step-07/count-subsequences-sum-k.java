class Solution {
    public int countSubsequences(int[] nums, int k) {
        return count(nums, 0, 0, k);
    }
    private int count(int[] a, int i, int sum, int k) {
        if (i == a.length) return sum == k ? 1 : 0;
        return count(a, i + 1, sum + a[i], k) + count(a, i + 1, sum, k);
    }
}
