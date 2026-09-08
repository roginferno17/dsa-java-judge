import java.util.*;

class Solution {
    private static final int[][] DIRS = { {1, 0}, {-1, 0}, {0, 1}, {0, -1} };

    public int[][] solve(int[][] board) {
        int rows = board.length, cols = board[0].length;
        boolean[][] safe = new boolean[rows][cols];
        Deque<int[]> st = new ArrayDeque<>();
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                boolean border = (i == 0 || j == 0 || i == rows - 1 || j == cols - 1);
                if (border && board[i][j] == 0 && !safe[i][j]) {
                    safe[i][j] = true;
                    st.push(new int[]{ i, j });
                }
            }
        }
        while (!st.isEmpty()) {
            int[] cell = st.pop();
            for (int[] d : DIRS) {
                int r = cell[0] + d[0], c = cell[1] + d[1];
                if (r >= 0 && c >= 0 && r < rows && c < cols && board[r][c] == 0 && !safe[r][c]) {
                    safe[r][c] = true;
                    st.push(new int[]{ r, c });
                }
            }
        }
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (board[i][j] == 0 && !safe[i][j]) board[i][j] = 1;
            }
        }
        return board;
    }
}
