class Solution {
    public int nthRoot(int n, int m) {
        int low = 1, high = m;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int c = compare(mid, n, m);
            if (c == 0) return mid;
            if (c < 0) low = mid + 1; else high = mid - 1;
        }
        return -1;
    }
    private int compare(long x, int n, int m) {
        long p = 1;
        for (int i = 0; i < n; i++) {
            p *= x;
            if (p > m) return 1;
        }
        return p == m ? 0 : -1;
    }
}
