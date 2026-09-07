class Solution {
    public int longestPalindromeSubseq(String s) {
        String r = new StringBuilder(s).reverse().toString();
        int n = s.length();
        int[] prev = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int[] cur = new int[n + 1];
            for (int j = 1; j <= n; j++) {
                cur[j] = (s.charAt(i - 1) == r.charAt(j - 1))
                        ? 1 + prev[j - 1]
                        : Math.max(prev[j], cur[j - 1]);
            }
            prev = cur;
        }
        return prev[n];
    }
}
