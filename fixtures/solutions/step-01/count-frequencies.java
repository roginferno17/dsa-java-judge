import java.util.*;
class Solution {
    public int[][] frequencies(int[] arr) {
        TreeMap<Integer, Integer> freq = new TreeMap<>();
        for (int x : arr) freq.merge(x, 1, Integer::sum);
        int[][] out = new int[freq.size()][2];
        int i = 0;
        for (Map.Entry<Integer, Integer> e : freq.entrySet()) {
            out[i][0] = e.getKey();
            out[i][1] = e.getValue();
            i++;
        }
        return out;
    }
}
