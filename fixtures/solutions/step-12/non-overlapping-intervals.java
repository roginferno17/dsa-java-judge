import java.util.*;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        int[][] a = intervals.clone();
        Arrays.sort(a, (x, y) -> Integer.compare(x[1], y[1]));
        long lastEnd = Long.MIN_VALUE;
        int kept = 0;
        for (int[] iv : a) {
            if (iv[0] >= lastEnd) {
                kept++;
                lastEnd = iv[1];
            }
        }
        return a.length - kept;
    }
}
