import java.util.*;

class Solution {
    public int[] replaceByRank(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        Map<Integer, Integer> rank = new HashMap<>();
        int next = 1;
        for (int v : sorted) {
            if (!rank.containsKey(v)) rank.put(v, next++);
        }
        int[] out = new int[nums.length];
        for (int i = 0; i < nums.length; i++) out[i] = rank.get(nums[i]);
        return out;
    }
}
