class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int rows = matrix.length, cols = matrix[0].length;
        int low = 0, high = rows * cols - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int v = matrix[mid / cols][mid % cols];
            if (v == target) return true;
            if (v < target) low = mid + 1; else high = mid - 1;
        }
        return false;
    }
}
