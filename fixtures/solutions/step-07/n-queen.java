import java.util.*;
class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> out = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        boolean[] rows = new boolean[n], d1 = new boolean[2 * n], d2 = new boolean[2 * n];
        go(0, n, board, rows, d1, d2, out);
        out.sort(Comparator.comparing(rowsList -> String.join("", rowsList)));
        return out;
    }
    private void go(int col, int n, char[][] b, boolean[] rows, boolean[] d1, boolean[] d2, List<List<String>> out) {
        if (col == n) {
            List<String> sol = new ArrayList<>();
            for (char[] row : b) sol.add(new String(row));
            out.add(sol);
            return;
        }
        for (int row = 0; row < n; row++) {
            int i1 = row + col, i2 = row - col + n - 1;
            if (rows[row] || d1[i1] || d2[i2]) continue;
            rows[row] = d1[i1] = d2[i2] = true;
            b[row][col] = 'Q';
            go(col + 1, n, b, rows, d1, d2, out);
            b[row][col] = '.';
            rows[row] = d1[i1] = d2[i2] = false;
        }
    }
}
