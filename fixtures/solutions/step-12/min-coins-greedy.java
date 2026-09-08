class Solution {
    public int minCoins(int[] coins, int amount) {
        int count = 0;
        for (int i = coins.length - 1; i >= 0 && amount > 0; i--) {
            count += amount / coins[i];
            amount %= coins[i];
        }
        return count;
    }
}
