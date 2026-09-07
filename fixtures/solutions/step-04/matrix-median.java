class Solution {
    public int findMedian(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        int low = Integer.MAX_VALUE, high = Integer.MIN_VALUE;
        for (int[] row : matrix) {
            low = Math.min(low, row[0]);
            high = Math.max(high, row[cols - 1]);
        }
        int need = (rows * cols) / 2 + 1, ans = low;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int count = 0;
            for (int[] row : matrix) count += upperBound(row, mid);
            if (count >= need) { ans = mid; high = mid - 1; } else low = mid + 1;
        }
        return ans;
    }
    private int upperBound(int[] a, int t) {
        int low = 0, high = a.length - 1, ans = a.length;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (a[mid] > t) { ans = mid; high = mid - 1; } else low = mid + 1;
        }
        return ans;
    }
}
