import java.util.*;
class Solution {
    public int[][] merge(int[][] intervals) {
        int[][] a = new int[intervals.length][];
        for (int i = 0; i < intervals.length; i++) a[i] = intervals[i].clone();
        Arrays.sort(a, Comparator.comparingInt(x -> x[0]));
        List<int[]> out = new ArrayList<>();
        int[] cur = a[0].clone();
        for (int i = 1; i < a.length; i++) {
            if (a[i][0] <= cur[1]) cur[1] = Math.max(cur[1], a[i][1]);
            else { out.add(cur); cur = a[i].clone(); }
        }
        out.add(cur);
        return out.toArray(new int[0][]);
    }
}
