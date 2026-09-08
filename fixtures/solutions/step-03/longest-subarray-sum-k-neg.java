import java.util.*;
class Solution {
    public int longestSubarray(int[] nums, long k) {
        Map<Long, Integer> first = new HashMap<>();
        first.put(0L, -1);
        long sum = 0;
        int best = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            Integer j = first.get(sum - k);
            if (j != null) best = Math.max(best, i - j);
            first.putIfAbsent(sum, i);
        }
        return best;
    }
}
