class Solution {
    public String longestPalindrome(String s) {
        int bestStart = 0, bestLen = 1;
        for (int i = 0; i < s.length(); i++) {
            int[] odd = expand(s, i, i);
            if (odd[1] > bestLen) { bestStart = odd[0]; bestLen = odd[1]; }
            int[] even = expand(s, i, i + 1);
            if (even[1] > bestLen) { bestStart = even[0]; bestLen = even[1]; }
        }
        return s.substring(bestStart, bestStart + bestLen);
    }
    private int[] expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        return new int[]{ l + 1, r - l - 1 };
    }
}
