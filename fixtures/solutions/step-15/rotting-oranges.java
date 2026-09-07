import java.util.*;

class Solution {
    private static final int[][] DIRS = { {1, 0}, {-1, 0}, {0, 1}, {0, -1} };

    public int orangesRotting(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        int fresh = 0;
        List<int[]> level = new ArrayList<>();
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1) fresh++;
                else if (grid[i][j] == 2) level.add(new int[]{ i, j });
            }
        }
        int minutes = 0;
        while (!level.isEmpty() && fresh > 0) {
            List<int[]> next = new ArrayList<>();
            for (int[] cell : level) {
                for (int[] d : DIRS) {
                    int r = cell[0] + d[0], c = cell[1] + d[1];
                    if (r >= 0 && c >= 0 && r < rows && c < cols && grid[r][c] == 1) {
                        grid[r][c] = 2;
                        fresh--;
                        next.add(new int[]{ r, c });
                    }
                }
            }
            if (next.isEmpty()) break;
            level = next;
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}
