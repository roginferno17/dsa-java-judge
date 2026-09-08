class Solution {
    public int minimumTotal(int[][] triangle) {
        int n = triangle.length;
        int[] below = triangle[n - 1].clone();
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                below[j] = triangle[i][j] + Math.min(below[j], below[j + 1]);
            }
        }
        return below[0];
    }
}
