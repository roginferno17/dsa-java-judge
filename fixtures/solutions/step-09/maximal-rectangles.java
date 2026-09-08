import java.util.*;

class Solution {
    public int maximalRectangle(int[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return 0;
        int cols = matrix[0].length;
        int[] heights = new int[cols];
        int best = 0;
        for (int[] row : matrix) {
            for (int c = 0; c < cols; c++) {
                heights[c] = (row[c] == 1) ? heights[c] + 1 : 0;
            }
            best = Math.max(best, largestRectangleArea(heights));
        }
        return best;
    }

    private int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Deque<Integer> st = new ArrayDeque<>();
        int best = 0;
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.isEmpty() && heights[st.peek()] >= h) {
                int height = heights[st.pop()];
                int left = st.isEmpty() ? -1 : st.peek();
                best = Math.max(best, height * (i - left - 1));
            }
            st.push(i);
        }
        return best;
    }
}
