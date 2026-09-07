import java.util.*;

class Solution {
    private static final int[][] DIRS = { {1, 0}, {-1, 0}, {0, 1}, {0, -1} };

    public int numIslands(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        int count = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] != 1) continue;
                count++;
                Deque<int[]> st = new ArrayDeque<>();
                grid[i][j] = 0;
                st.push(new int[]{ i, j });
                while (!st.isEmpty()) {
                    int[] cell = st.pop();
                    for (int[] d : DIRS) {
                        int r = cell[0] + d[0], c = cell[1] + d[1];
                        if (r >= 0 && c >= 0 && r < rows && c < cols && grid[r][c] == 1) {
                            grid[r][c] = 0;
                            st.push(new int[]{ r, c });
                        }
                    }
                }
            }
        }
        return count;
    }
}
