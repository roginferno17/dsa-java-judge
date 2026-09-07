import java.util.*;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int impossible = amount + 1;
        int[] fewest = new int[amount + 1];
        Arrays.fill(fewest, impossible);
        fewest[0] = 0;
        for (int t = 1; t <= amount; t++) {
            for (int c : coins) {
                if (c >= 0 && c <= t && fewest[t - c] + 1 < fewest[t]) {
                    fewest[t] = fewest[t - c] + 1;
                }
            }
        }
        return fewest[amount] >= impossible ? -1 : fewest[amount];
    }
}
