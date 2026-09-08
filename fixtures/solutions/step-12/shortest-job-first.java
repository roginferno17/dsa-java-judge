import java.util.*;

class Solution {
    public int averageWaitingTime(int[] burst) {
        int[] b = burst.clone();
        Arrays.sort(b);
        long clock = 0, totalWait = 0;
        for (int t : b) {
            totalWait += clock;
            clock += t;
        }
        return (int) (totalWait / b.length);
    }
}
