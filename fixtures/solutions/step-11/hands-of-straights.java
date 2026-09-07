import java.util.*;

class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;
        TreeMap<Integer, Integer> count = new TreeMap<>();
        for (int c : hand) count.merge(c, 1, Integer::sum);
        while (!count.isEmpty()) {
            int start = count.firstKey();
            int need = count.get(start);
            for (int i = 0; i < groupSize; i++) {
                Integer have = count.get(start + i);
                if (have == null || have < need) return false;
                if (have == need) count.remove(start + i);
                else count.put(start + i, have - need);
            }
        }
        return true;
    }
}
