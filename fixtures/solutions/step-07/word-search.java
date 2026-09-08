class Solution {
    public boolean exist(char[][] board, String word) {
        for (int r = 0; r < board.length; r++)
            for (int c = 0; c < board[0].length; c++)
                if (dfs(board, r, c, word, 0)) return true;
        return false;
    }
    private boolean dfs(char[][] b, int r, int c, String w, int i) {
        if (i == w.length()) return true;
        if (r < 0 || r >= b.length || c < 0 || c >= b[0].length || b[r][c] != w.charAt(i)) return false;
        char saved = b[r][c];
        b[r][c] = '#';
        boolean found = dfs(b, r + 1, c, w, i + 1) || dfs(b, r - 1, c, w, i + 1)
                     || dfs(b, r, c + 1, w, i + 1) || dfs(b, r, c - 1, w, i + 1);
        b[r][c] = saved;
        return found;
    }
}
