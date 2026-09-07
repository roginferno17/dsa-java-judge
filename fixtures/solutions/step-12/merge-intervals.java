import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        int[][] a = intervals.clone();
        Arrays.sort(a, (x, y) -> Integer.compare(x[0], y[0]));
        List<int[]> out = new ArrayList<>();
        int start = a[0][0], end = a[0][1];
        for (int i = 1; i < a.length; i++) {
            if (a[i][0] <= end) {
                end = Math.max(end, a[i][1]);
            } else {
                out.add(new int[]{ start, end });
                start = a[i][0];
                end = a[i][1];
            }
        }
        out.add(new int[]{ start, end });
        return out.toArray(new int[0][]);
    }
}
