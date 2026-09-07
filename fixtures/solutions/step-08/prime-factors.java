import java.util.*;

class Solution {
    public List<Integer> primeFactors(int n) {
        List<Integer> out = new ArrayList<>();
        for (int i = 2; (long) i * i <= n; i++) {
            if (n % i == 0) {
                out.add(i);
                while (n % i == 0) n /= i;
            }
        }
        if (n > 1) out.add(n);
        return out;
    }
}
