class Solution {
    public String longestPrefix(String s) {
        int[] table = lps(s);
        return s.substring(0, table[s.length() - 1]);
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
}
