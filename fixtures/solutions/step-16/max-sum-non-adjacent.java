class Solution {
    public int maxNonAdjacentSum(int[] nums) {
        int twoBack = 0, oneBack = 0;
        for (int v : nums) {
            int cur = Math.max(oneBack, twoBack + v);
            twoBack = oneBack;
            oneBack = cur;
        }
        return Math.max(0, oneBack);
    }
}
