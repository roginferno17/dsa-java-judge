import java.util.*;
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            long need = (long) target - nums[i];
            if (need >= Integer.MIN_VALUE && need <= Integer.MAX_VALUE) {
                Integer j = seen.get((int) need);
                if (j != null) return new int[]{ j, i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}
