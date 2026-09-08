class Solution {
    public int cherryPickup(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        int[][] below = new int[cols][cols];
        for (int a = 0; a < cols; a++) {
            for (int b = 0; b < cols; b++) {
                below[a][b] = (a == b) ? grid[rows - 1][a] : grid[rows - 1][a] + grid[rows - 1][b];
            }
        }
        for (int r = rows - 2; r >= 0; r--) {
            int[][] cur = new int[cols][cols];
            for (int a = 0; a < cols; a++) {
                for (int b = 0; b < cols; b++) {
                    int best = Integer.MIN_VALUE;
                    for (int da = -1; da <= 1; da++) {
                        for (int db = -1; db <= 1; db++) {
                            int na = a + da, nb = b + db;
                            if (na < 0 || nb < 0 || na >= cols || nb >= cols) continue;
                            best = Math.max(best, below[na][nb]);
                        }
                    }
                    int gain = (a == b) ? grid[r][a] : grid[r][a] + grid[r][b];
                    cur[a][b] = gain + best;
                }
            }
            below = cur;
        }
        return below[0][cols - 1];
    }
}
