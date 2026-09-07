class Solution {
    public int kthElement(int[] a, int[] b, int k) {
        if (a.length > b.length) return kthElement(b, a, k);
        int n = a.length, m = b.length;
        int low = Math.max(0, k - m), high = Math.min(k, n);
        while (low <= high) {
            int i = low + (high - low) / 2;
            int j = k - i;
            int aLeft  = i > 0 ? a[i - 1] : Integer.MIN_VALUE;
            int aRight = i < n ? a[i]     : Integer.MAX_VALUE;
            int bLeft  = j > 0 ? b[j - 1] : Integer.MIN_VALUE;
            int bRight = j < m ? b[j]     : Integer.MAX_VALUE;
            if (aLeft <= bRight && bLeft <= aRight) return Math.max(aLeft, bLeft);
            if (aLeft > bRight) high = i - 1; else low = i + 1;
        }
        return 0;
    }
}
