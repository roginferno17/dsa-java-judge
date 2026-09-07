import java.util.*;
class Solution {
    public int[] countOccurrences(int[] arr, int[] queries) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : arr) freq.merge(x, 1, Integer::sum);
        int[] out = new int[queries.length];
        for (int i = 0; i < queries.length; i++) out[i] = freq.getOrDefault(queries[i], 0);
        return out;
    }
}
