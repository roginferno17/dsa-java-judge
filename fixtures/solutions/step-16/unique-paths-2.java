class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        int[] row = new int[cols];
        row[0] = grid[0][0] == 1 ? 0 : 1;
        for (int j = 1; j < cols; j++) row[j] = grid[0][j] == 1 ? 0 : row[j - 1];
        for (int i = 1; i < rows; i++) {
            row[0] = grid[i][0] == 1 ? 0 : row[0];
            for (int j = 1; j < cols; j++) {
                row[j] = grid[i][j] == 1 ? 0 : row[j] + row[j - 1];
            }
        }
        return row[cols - 1];
    }
}
