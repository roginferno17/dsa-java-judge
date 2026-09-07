import java.util.*;
class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        int[] a = nums.clone();
        Arrays.sort(a);
        List<List<Integer>> out = new ArrayList<>();
        go(a, 0, new ArrayList<>(), out);
        return out;
    }
    private void go(int[] a, int start, List<Integer> cur, List<List<Integer>> out) {
        out.add(new ArrayList<>(cur));
        for (int i = start; i < a.length; i++) {
            if (i > start && a[i] == a[i - 1]) continue;
            cur.add(a[i]);
            go(a, i + 1, cur, out);
            cur.remove(cur.size() - 1);
        }
    }
}
