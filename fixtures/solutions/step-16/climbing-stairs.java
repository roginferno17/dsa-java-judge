class Solution {
    public int climbStairs(int n) {
        int twoBack = 1, oneBack = 1;
        for (int i = 2; i <= n; i++) {
            int cur = oneBack + twoBack;
            twoBack = oneBack;
            oneBack = cur;
        }
        return oneBack;
    }
}
