import java.util.*;
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int x : nums) set.add(x);
        int best = 0;
        for (int x : set) {
            if (set.contains(x - 1)) continue;
            int len = 1, cur = x;
            while (set.contains(cur + 1)) { cur++; len++; }
            best = Math.max(best, len);
        }
        return best;
    }
}
