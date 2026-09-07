import java.util.*;

class Solution {
    private static final int[][] DIRS = {
        {1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}
    };

    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;
        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) return -1;
        int[][] dist = new int[n][n];
        for (int[] row : dist) Arrays.fill(row, -1);
        dist[0][0] = 1;
        Deque<int[]> q = new ArrayDeque<>();
        q.add(new int[]{ 0, 0 });
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            if (cell[0] == n - 1 && cell[1] == n - 1) return dist[cell[0]][cell[1]];
            for (int[] d : DIRS) {
                int r = cell[0] + d[0], c = cell[1] + d[1];
                if (r >= 0 && c >= 0 && r < n && c < n && grid[r][c] == 0 && dist[r][c] < 0) {
                    dist[r][c] = dist[cell[0]][cell[1]] + 1;
                    q.add(new int[]{ r, c });
                }
            }
        }
        return -1;
    }
}
