import java.util.*;
class Solution {
    public int[] maxSubArrayValues(int[] nums) {
        int cur = nums[0], best = nums[0], start = 0, bs = 0, be = 0;
        for (int i = 1; i < nums.length; i++) {
            if (cur + nums[i] < nums[i]) { cur = nums[i]; start = i; }
            else cur = cur + nums[i];
            if (cur > best) { best = cur; bs = start; be = i; }
        }
        return Arrays.copyOfRange(nums, bs, be + 1);
    }
}
