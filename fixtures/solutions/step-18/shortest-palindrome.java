class Solution {
    public String shortestPalindrome(String s) {
        if (s.isEmpty()) return s;
        int keep = longestPalindromicPrefix(s);
        String tail = s.substring(keep);
        return new StringBuilder(tail).reverse() + s;
    }

    /** lps[i] = length of the longest proper border of the prefix ending at i. */
    private int[] lps(String s) {
        int[] lps = new int[s.length()];
        int length = 0;
        for (int i = 1; i < s.length(); ) {
            if (s.charAt(i) == s.charAt(length)) {
                lps[i++] = ++length;
            } else if (length > 0) {
                length = lps[length - 1];
            } else {
                lps[i++] = 0;
            }
        }
        return lps;
    }

    /** Length of the longest palindromic prefix of s. */
    private int longestPalindromicPrefix(String s) {
        if (s.isEmpty()) return 0;
        String reversed = new StringBuilder(s).reverse().toString();
        String combined = s + "#" + reversed;
        int[] table = lps(combined);
        return table[combined.length() - 1];
    }
}
