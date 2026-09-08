import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int v : nums) count.merge(v, 1, Integer::sum);

        List<int[]> entries = new ArrayList<>();
        for (Map.Entry<Integer, Integer> e : count.entrySet()) {
            entries.add(new int[]{ e.getKey(), e.getValue() });
        }
        // Frequency descending, then value ascending.
        entries.sort((x, y) -> y[1] != x[1] ? Integer.compare(y[1], x[1]) : Integer.compare(x[0], y[0]));

        int[] out = new int[k];
        for (int i = 0; i < k; i++) out[i] = entries.get(i)[0];
        return out;
    }
}
