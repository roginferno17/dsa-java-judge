import java.util.*;

class Solution {
    public int[] maxSumCombinations(int[] a, int[] b, int k) {
        int n = a.length;
        Integer[] x = new Integer[n], y = new Integer[n];
        for (int i = 0; i < n; i++) { x[i] = a[i]; y[i] = b[i]; }
        Arrays.sort(x, Collections.reverseOrder());
        Arrays.sort(y, Collections.reverseOrder());

        // Entries are {sum, i, j}; the frontier expands from (0, 0).
        PriorityQueue<int[]> pq = new PriorityQueue<>((p, q) -> Integer.compare(q[0], p[0]));
        Set<Long> seen = new HashSet<>();
        pq.offer(new int[]{ x[0] + y[0], 0, 0 });
        seen.add(0L);

        int[] out = new int[k];
        for (int c = 0; c < k; c++) {
            int[] e = pq.poll();
            out[c] = e[0];
            int i = e[1], j = e[2];
            if (i + 1 < n && seen.add((long) (i + 1) * n + j)) pq.offer(new int[]{ x[i + 1] + y[j], i + 1, j });
            if (j + 1 < n && seen.add((long) i * n + (j + 1))) pq.offer(new int[]{ x[i] + y[j + 1], i, j + 1 });
        }
        return out;
    }
}
