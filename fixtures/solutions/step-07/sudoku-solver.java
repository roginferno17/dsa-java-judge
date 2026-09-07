class Solution {
    public void solveSudoku(int[][] board) { solve(board); }
    private boolean solve(int[][] b) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (b[r][c] != 0) continue;
                for (int d = 1; d <= 9; d++) {
                    if (!ok(b, r, c, d)) continue;
                    b[r][c] = d;
                    if (solve(b)) return true;
                    b[r][c] = 0;
                }
                return false;
            }
        }
        return true;
    }
    private boolean ok(int[][] b, int r, int c, int d) {
        int br = (r / 3) * 3, bc = (c / 3) * 3;
        for (int i = 0; i < 9; i++) {
            if (b[r][i] == d || b[i][c] == d) return false;
            if (b[br + i / 3][bc + i % 3] == d) return false;
        }
        return true;
    }
}
