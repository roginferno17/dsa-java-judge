import java.util.*;
class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> out = new ArrayList<>();
        go(1, k, n, new ArrayList<>(), out);
        return out;
    }
    private void go(int d, int k, int rem, List<Integer> cur, List<List<Integer>> out) {
        if (cur.size() == k) { if (rem == 0) out.add(new ArrayList<>(cur)); return; }
        for (int x = d; x <= 9; x++) {
            if (x > rem) break;
            cur.add(x);
            go(x + 1, k, rem - x, cur, out);
            cur.remove(cur.size() - 1);
        }
    }
}
