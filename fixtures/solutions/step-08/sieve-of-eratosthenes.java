import java.util.*;

class Solution {
    public List<Integer> sieve(int n) {
        List<Integer> out = new ArrayList<>();
        if (n < 2) return out;
        boolean[] prime = new boolean[n + 1];
        Arrays.fill(prime, true);
        prime[0] = false;
        prime[1] = false;
        for (int i = 2; (long) i * i <= n; i++) {
            if (prime[i]) {
                for (int j = i * i; j <= n; j += i) prime[j] = false;
            }
        }
        for (int i = 2; i <= n; i++) if (prime[i]) out.add(i);
        return out;
    }
}
