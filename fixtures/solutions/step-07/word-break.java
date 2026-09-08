import java.util.*;
class Solution {
    public boolean wordBreak(String s, String[] dict) {
        Set<String> words = new HashSet<>(Arrays.asList(dict));
        Boolean[] memo = new Boolean[s.length() + 1];
        return go(s, 0, words, memo);
    }
    private boolean go(String s, int start, Set<String> words, Boolean[] memo) {
        if (start == s.length()) return true;
        if (memo[start] != null) return memo[start];
        for (int end = start + 1; end <= s.length(); end++) {
            if (words.contains(s.substring(start, end)) && go(s, end, words, memo)) {
                return memo[start] = true;
            }
        }
        return memo[start] = false;
    }
}
