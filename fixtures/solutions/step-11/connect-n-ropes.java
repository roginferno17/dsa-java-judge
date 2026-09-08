import java.util.*;

class Solution {
    public long minCost(int[] ropes) {
        PriorityQueue<Long> pq = new PriorityQueue<>();
        for (int r : ropes) pq.offer((long) r);
        long total = 0;
        while (pq.size() > 1) {
            long joined = pq.poll() + pq.poll();
            total += joined;
            pq.offer(joined);
        }
        return total;
    }
}
