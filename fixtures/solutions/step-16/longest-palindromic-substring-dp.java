class Solution {
    private int bestStart = 0, bestLen = 1;

    public String longestPalindrome(String s) {
        bestStart = 0;
        bestLen = 1;
        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i);
            expand(s, i, i + 1);
        }
        return s.substring(bestStart, bestStart + bestLen);
    }

    private void expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        int len = r - l - 1;
        if (len > bestLen) { bestLen = len; bestStart = l + 1; }
    }
}
