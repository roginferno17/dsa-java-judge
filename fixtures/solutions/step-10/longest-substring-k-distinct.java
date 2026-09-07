import java.util.*;

class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        if (k == 0) return 0;
        Map<Character, Integer> count = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            count.merge(s.charAt(right), 1, Integer::sum);
            while (count.size() > k) {
                char leaving = s.charAt(left);
                if (count.merge(leaving, -1, Integer::sum) == 0) count.remove(leaving);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
