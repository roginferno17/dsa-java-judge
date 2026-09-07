import java.util.*;
class Solution {
    public List<List<Integer>> subsequences(int[] nums) {
        List<List<Integer>> out = new ArrayList<>();
        int n = nums.length;
        for (int mask = 0; mask < (1 << n); mask++) {
            List<Integer> cur = new ArrayList<>();
            for (int i = 0; i < n; i++) if (((mask >> i) & 1) == 1) cur.add(nums[i]);
            out.add(cur);
        }
        return out;
    }
}
