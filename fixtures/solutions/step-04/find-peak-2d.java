class Solution {
    public int[] findPeakGrid(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        int low = 0, high = cols - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int row = 0;
            for (int r = 0; r < rows; r++) if (matrix[r][mid] > matrix[row][mid]) row = r;
            int left = mid - 1 >= 0 ? matrix[row][mid - 1] : Integer.MIN_VALUE;
            int right = mid + 1 < cols ? matrix[row][mid + 1] : Integer.MIN_VALUE;
            if (matrix[row][mid] > left && matrix[row][mid] > right) return new int[]{ row, mid };
            if (left > matrix[row][mid]) high = mid - 1; else low = mid + 1;
        }
        return new int[]{ -1, -1 };
    }
}
