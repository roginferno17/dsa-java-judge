class Solution {
    public double findMedianSortedArrays(int[] a, int[] b) {
        if (a.length > b.length) return findMedianSortedArrays(b, a);
        int n = a.length, m = b.length, total = n + m, half = (total + 1) / 2;
        int low = 0, high = n;
        while (low <= high) {
            int i = low + (high - low) / 2;
            int j = half - i;
            int aLeft  = i > 0 ? a[i - 1] : Integer.MIN_VALUE;
            int aRight = i < n ? a[i]     : Integer.MAX_VALUE;
            int bLeft  = j > 0 ? b[j - 1] : Integer.MIN_VALUE;
            int bRight = j < m ? b[j]     : Integer.MAX_VALUE;
            if (aLeft <= bRight && bLeft <= aRight) {
                if (total % 2 == 1) return Math.max(aLeft, bLeft);
                return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2.0;
            }
            if (aLeft > bRight) high = i - 1; else low = i + 1;
        }
        return 0;
    }
}
