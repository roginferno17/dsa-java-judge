class Solution {
    public int longestCommonSubstring(String a, String b) {
        int n = a.length(), m = b.length();
        int[] prev = new int[m + 1];
        int best = 0;
        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                    best = Math.max(best, cur[j]);
                }
            }
            prev = cur;
        }
        return best;
    }
}
