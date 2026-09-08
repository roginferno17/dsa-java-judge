import java.util.*;

class Solution {
    public List<Integer> allDivisors(int n) {
        List<Integer> out = new ArrayList<>();
        for (int i = 1; (long) i * i <= n; i++) {
            if (n % i == 0) {
                out.add(i);
                if (i != n / i) out.add(n / i);
            }
        }
        Collections.sort(out);
        return out;
    }
}
