import java.util.*;
class Solution {
    public List<String> findPaths(int[][] grid) {
        List<String> out = new ArrayList<>();
        int n = grid.length;
        if (grid[0][0] == 0 || grid[n - 1][n - 1] == 0) return out;
        boolean[][] seen = new boolean[n][n];
        go(grid, 0, 0, seen, new StringBuilder(), out);
        return out;
    }
    private void go(int[][] g, int r, int c, boolean[][] seen, StringBuilder path, List<String> out) {
        int n = g.length;
        if (r == n - 1 && c == n - 1) { out.add(path.toString()); return; }
        seen[r][c] = true;
        int[] dr = {1, 0, 0, -1};
        int[] dc = {0, -1, 1, 0};
        char[] mv = {'D', 'L', 'R', 'U'};
        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
            if (g[nr][nc] == 0 || seen[nr][nc]) continue;
            path.append(mv[k]);
            go(g, nr, nc, seen, path, out);
            path.deleteCharAt(path.length() - 1);
        }
        seen[r][c] = false;
    }
}
