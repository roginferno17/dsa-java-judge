import java.util.*;
class Solution {
    public int[] highestLowestFrequency(int[] arr) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : arr) freq.merge(x, 1, Integer::sum);
        int best = 0, worst = 0, bestC = -1, worstC = Integer.MAX_VALUE;
        for (Map.Entry<Integer, Integer> e : freq.entrySet()) {
            int v = e.getKey(), c = e.getValue();
            if (c > bestC || (c == bestC && v < best)) { best = v; bestC = c; }
            if (c < worstC || (c == worstC && v < worst)) { worst = v; worstC = c; }
        }
        return new int[]{ best, worst };
    }
}
