import java.util.*;
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        int[] a = candidates.clone();
        Arrays.sort(a);
        List<List<Integer>> out = new ArrayList<>();
        go(a, 0, target, new ArrayList<>(), out);
        return out;
    }
    private void go(int[] a, int start, int rem, List<Integer> cur, List<List<Integer>> out) {
        if (rem == 0) { out.add(new ArrayList<>(cur)); return; }
        for (int i = start; i < a.length; i++) {
            if (i > start && a[i] == a[i - 1]) continue;
            if (a[i] > rem) break;
            cur.add(a[i]);
            go(a, i + 1, rem - a[i], cur, out);
            cur.remove(cur.size() - 1);
        }
    }
}
