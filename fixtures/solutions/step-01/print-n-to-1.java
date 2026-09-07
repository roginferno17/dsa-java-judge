import java.util.*;
class Solution {
    public List<Integer> nToOne(int n) {
        List<Integer> out = new ArrayList<>();
        fill(n, out);
        return out;
    }
    private void fill(int n, List<Integer> out) {
        if (n == 0) return;
        out.add(n);
        fill(n - 1, out);
    }
}
