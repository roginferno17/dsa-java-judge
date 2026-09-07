import java.util.*;
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        int[] a = candidates.clone();
        Arrays.sort(a);
        List<List<Integer>> out = new ArrayList<>();
        go(a, 0, target, new ArrayList<>(), out);
        return out;
    }
    private void go(int[] a, int i, int rem, List<Integer> cur, List<List<Integer>> out) {
        if (rem == 0) { out.add(new ArrayList<>(cur)); return; }
        if (i == a.length || rem < 0) return;
        if (a[i] <= rem) {
            cur.add(a[i]);
            go(a, i, rem - a[i], cur, out);
            cur.remove(cur.size() - 1);
        }
        go(a, i + 1, rem, cur, out);
    }
}
