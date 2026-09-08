import java.util.*;

class Solution {
    public double[] runningMedian(int[] nums) {
        PriorityQueue<Integer> lower = new PriorityQueue<>(Collections.reverseOrder());
        PriorityQueue<Integer> upper = new PriorityQueue<>();
        double[] out = new double[nums.length];
        for (int i = 0; i < nums.length; i++) {
            lower.offer(nums[i]);
            upper.offer(lower.poll());
            if (upper.size() > lower.size()) lower.offer(upper.poll());
            out[i] = (lower.size() > upper.size())
                    ? lower.peek()
                    : ((double) lower.peek() + upper.peek()) / 2.0;
        }
        return out;
    }
}
