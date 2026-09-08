class Solution {
    public int rowWithMaxOnes(int[][] matrix) {
        int cols = matrix[0].length, best = -1, bestCount = 0;
        for (int r = 0; r < matrix.length; r++) {
            int low = 0, high = cols - 1, first = cols;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (matrix[r][mid] >= 1) { first = mid; high = mid - 1; } else low = mid + 1;
            }
            int count = cols - first;
            if (count > bestCount) { bestCount = count; best = r; }
        }
        return bestCount == 0 ? -1 : best;
    }
}
