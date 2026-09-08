import java.util.*;

class Solution {
    public List<List<Integer>> factorise(int[] queries) {
        int max = 1;
        for (int q : queries) max = Math.max(max, q);
        int[] spf = new int[max + 1];
        for (int i = 2; i <= max; i++) {
            if (spf[i] == 0) {
                for (int j = i; j <= max; j += i) {
                    if (spf[j] == 0) spf[j] = i;
                }
            }
        }
        List<List<Integer>> out = new ArrayList<>();
        for (int q : queries) {
            List<Integer> row = new ArrayList<>();
            int v = q;
            while (v > 1) {
                row.add(spf[v]);
                v /= spf[v];
            }
            out.add(row);
        }
        return out;
    }
}
