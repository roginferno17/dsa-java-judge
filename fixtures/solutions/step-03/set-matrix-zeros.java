class Solution {
    public void setZeroes(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        boolean[] zeroRow = new boolean[rows];
        boolean[] zeroCol = new boolean[cols];
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (matrix[r][c] == 0) { zeroRow[r] = true; zeroCol[c] = true; }
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (zeroRow[r] || zeroCol[c]) matrix[r][c] = 0;
    }
}
