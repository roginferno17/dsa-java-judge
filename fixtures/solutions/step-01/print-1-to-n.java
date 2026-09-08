import java.util.*;
class Solution {
    public List<Integer> oneToN(int n) {
        List<Integer> out = new ArrayList<>();
        fill(n, out);
        return out;
    }
    private void fill(int n, List<Integer> out) {
        if (n == 0) return;
        fill(n - 1, out);
        out.add(n);
    }
}
