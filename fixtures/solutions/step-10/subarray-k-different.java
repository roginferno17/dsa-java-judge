import java.util.*;

class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    private int atMost(int[] nums, int k) {
        if (k <= 0) return 0;
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, total = 0;
        for (int right = 0; right < nums.length; right++) {
            count.merge(nums[right], 1, Integer::sum);
            while (count.size() > k) {
                int leaving = nums[left];
                if (count.merge(leaving, -1, Integer::sum) == 0) count.remove(leaving);
                left++;
            }
            total += right - left + 1;
        }
        return total;
    }
}
