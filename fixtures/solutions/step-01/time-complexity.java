import java.util.*;
class Solution {
    public long countPairs(int[] arr, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        long count = 0;
        for (int x : arr) {
            long need = (long) target - x;
            if (need >= Integer.MIN_VALUE && need <= Integer.MAX_VALUE) {
                count += seen.getOrDefault((int) need, 0);
            }
            seen.merge(x, 1, Integer::sum);
        }
        return count;
    }
}
