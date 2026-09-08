import java.util.*;

class Solution {
    public int findKthSmallest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int v : nums) {
            pq.offer(v);
            if (pq.size() > k) pq.poll();
        }
        return pq.peek();
    }
}
