import java.util.*;
class Solution {
    public List<String> repeatHello(int n) {
        List<String> out = new ArrayList<>();
        fill(n, out);
        return out;
    }
    private void fill(int n, List<String> out) {
        if (n == 0) return;
        out.add("Hello");
        fill(n - 1, out);
    }
}
