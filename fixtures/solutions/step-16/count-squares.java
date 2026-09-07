class Solution {
    public int countSquares(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        int[][] side = new int[rows][cols];
        int total = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (matrix[i][j] == 0) continue;
                side[i][j] = (i == 0 || j == 0)
                        ? 1
                        : 1 + Math.min(side[i - 1][j], Math.min(side[i][j - 1], side[i - 1][j - 1]));
                total += side[i][j];
            }
        }
        return total;
    }
}
