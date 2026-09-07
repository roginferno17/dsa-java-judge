import java.util.*;
class Solution {
    public int maxLen(int[] nums) {
        Map<Long, Integer> first = new HashMap<>();
        first.put(0L, -1);
        long sum = 0;
        int best = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            Integer j = first.get(sum);
            if (j != null) best = Math.max(best, i - j);
            else first.put(sum, i);
        }
        return best;
    }
}
