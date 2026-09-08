import java.util.*;

class Solution {
    public int[] sortKSorted(int[] nums, int k) {
        int n = nums.length;
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        int[] out = new int[n];
        int w = 0;
        for (int i = 0; i < n; i++) {
            pq.offer(nums[i]);
            if (pq.size() > k + 1) out[w++] = pq.poll();
        }
        while (!pq.isEmpty()) out[w++] = pq.poll();
        return out;
    }
}
