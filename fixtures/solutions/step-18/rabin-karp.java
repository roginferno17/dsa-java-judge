import java.util.*;

class Solution {
    public List<Integer> findOccurrences(String text, String pattern) {
        List<Integer> out = new ArrayList<>();
        int n = text.length(), m = pattern.length();
        if (m > n) return out;

        final long MOD = 1000000007L, BASE = 257L;
        long power = 1;
        for (int i = 1; i < m; i++) power = power * BASE % MOD;

        long target = 0, window = 0;
        for (int i = 0; i < m; i++) {
            target = (target * BASE + pattern.charAt(i)) % MOD;
            window = (window * BASE + text.charAt(i)) % MOD;
        }
        for (int i = 0; ; i++) {
            if (window == target && text.regionMatches(i, pattern, 0, m)) out.add(i);
            if (i + m >= n) break;
            window = (window - text.charAt(i) * power % MOD + MOD) % MOD;
            window = (window * BASE + text.charAt(i + m)) % MOD;
        }
        return out;
    }
}
