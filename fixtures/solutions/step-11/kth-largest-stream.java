import java.util.*;

class Solution {
    public int[] kthLargestStream(int k, int[] nums, int[] adds) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int v : nums) {
            pq.offer(v);
            if (pq.size() > k) pq.poll();
        }
        int[] out = new int[adds.length];
        for (int i = 0; i < adds.length; i++) {
            pq.offer(adds[i]);
            if (pq.size() > k) pq.poll();
            out[i] = pq.peek();
        }
        return out;
    }
}
