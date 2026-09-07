import java.util.*;
class Solution {
    public List<Integer> subsetSums(int[] nums) {
        List<Integer> out = new ArrayList<>();
        go(nums, 0, 0, out);
        Collections.sort(out);
        return out;
    }
    private void go(int[] a, int i, int sum, List<Integer> out) {
        if (i == a.length) { out.add(sum); return; }
        go(a, i + 1, sum + a[i], out);
        go(a, i + 1, sum, out);
    }
}
