import java.util.*;

class Solution {
    public List<Integer> printLIS(int[] nums) {
        int n = nums.length;
        int[] startsAt = new int[n];
        int longest = 0;
        for (int i = n - 1; i >= 0; i--) {
            startsAt[i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] > nums[i]) startsAt[i] = Math.max(startsAt[i], startsAt[j] + 1);
            }
            longest = Math.max(longest, startsAt[i]);
        }

        List<Integer> out = new ArrayList<>();
        int from = 0;
        long previous = Long.MIN_VALUE;
        for (int remaining = longest; remaining >= 1; remaining--) {
            int pick = -1;
            for (int i = from; i < n; i++) {
                if (nums[i] > previous && startsAt[i] == remaining) {
                    if (pick < 0 || nums[i] < nums[pick]) pick = i;
                }
            }
            out.add(nums[pick]);
            previous = nums[pick];
            from = pick + 1;
        }
        return out;
    }
}
