import java.util.*;

class Solution {
    private static final int[][] DIRS = { {1, 0}, {-1, 0}, {0, 1}, {0, -1} };

    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        int original = image[sr][sc];
        if (original == newColor) return image;
        int rows = image.length, cols = image[0].length;
        Deque<int[]> st = new ArrayDeque<>();
        image[sr][sc] = newColor;
        st.push(new int[]{ sr, sc });
        while (!st.isEmpty()) {
            int[] cell = st.pop();
            for (int[] d : DIRS) {
                int r = cell[0] + d[0], c = cell[1] + d[1];
                if (r >= 0 && c >= 0 && r < rows && c < cols && image[r][c] == original) {
                    image[r][c] = newColor;
                    st.push(new int[]{ r, c });
                }
            }
        }
        return image;
    }
}
