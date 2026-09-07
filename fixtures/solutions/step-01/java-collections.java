import java.util.*;
class Solution {
    public List<Integer> uniqueSorted(int[] arr) {
        Set<Integer> set = new HashSet<>();
        for (int x : arr) set.add(x);
        List<Integer> out = new ArrayList<>(set);
        Collections.sort(out);
        return out;
    }
}
