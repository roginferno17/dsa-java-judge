import java.util.*;

class Solution {
    public int[] countGreaterToRight(int[] nums, int[] queries) {
        int n = nums.length;
        int[] count = new int[n];
        for (int i = n - 2; i >= 0; i--) {
            int c = 0;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] > nums[i]) c++;
            }
            count[i] = c;
        }
        int[] ans = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            ans[i] = count[queries[i]];
        }
        return ans;
    }
}
