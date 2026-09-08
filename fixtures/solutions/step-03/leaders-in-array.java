import java.util.*;
class Solution {
    public List<Integer> leaders(int[] nums) {
        List<Integer> out = new ArrayList<>();
        int max = Integer.MIN_VALUE;
        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] >= max) { out.add(nums[i]); max = nums[i]; }
        }
        Collections.reverse(out);
        return out;
    }
}
