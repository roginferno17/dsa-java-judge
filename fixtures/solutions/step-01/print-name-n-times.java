import java.util.*;
class Solution {
    public List<String> repeatName(String name, int n) {
        List<String> out = new ArrayList<>();
        fill(name, n, out);
        return out;
    }
    private void fill(String name, int n, List<String> out) {
        if (n == 0) return;
        out.add(name);
        fill(name, n - 1, out);
    }
}
