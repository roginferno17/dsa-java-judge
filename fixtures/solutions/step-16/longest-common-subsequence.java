class Solution {
    public int longestCommonSubsequence(String a, String b) {
        int n = a.length(), m = b.length();
        int[] prev = new int[m + 1];
        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            for (int j = 1; j <= m; j++) {
                cur[j] = (a.charAt(i - 1) == b.charAt(j - 1))
                        ? 1 + prev[j - 1]
                        : Math.max(prev[j], cur[j - 1]);
            }
            prev = cur;
        }
        return prev[m];
    }
}
