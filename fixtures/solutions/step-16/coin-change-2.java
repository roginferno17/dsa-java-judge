class Solution {
    public int change(int[] coins, int amount) {
        int[] ways = new int[amount + 1];
        ways[0] = 1;
        for (int c : coins) {                 // coin loop outermost: combinations
            for (int t = c; t <= amount; t++) ways[t] += ways[t - c];
        }
        return ways[amount];
    }
}
