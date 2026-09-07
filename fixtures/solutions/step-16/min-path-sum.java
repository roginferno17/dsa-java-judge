class Solution {
    public int minPathSum(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        int[] row = new int[cols];
        row[0] = grid[0][0];
        for (int j = 1; j < cols; j++) row[j] = row[j - 1] + grid[0][j];
        for (int i = 1; i < rows; i++) {
            row[0] += grid[i][0];
            for (int j = 1; j < cols; j++) {
                row[j] = grid[i][j] + Math.min(row[j], row[j - 1]);
            }
        }
        return row[cols - 1];
    }
}
