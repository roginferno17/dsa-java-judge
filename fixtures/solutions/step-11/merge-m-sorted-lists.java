import java.util.*;

class Solution {
    public int[] mergeSorted(int[][] lists) {
        int total = 0;
        for (int[] l : lists) total += l.length;
        int[] out = new int[total];
        // Entries are {value, listIndex, positionInList}.
        PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> Integer.compare(x[0], y[0]));
        for (int i = 0; i < lists.length; i++) {
            if (lists[i].length > 0) pq.offer(new int[]{ lists[i][0], i, 0 });
        }
        int w = 0;
        while (!pq.isEmpty()) {
            int[] e = pq.poll();
            out[w++] = e[0];
            int next = e[2] + 1;
            if (next < lists[e[1]].length) pq.offer(new int[]{ lists[e[1]][next], e[1], next });
        }
        return out;
    }
}
