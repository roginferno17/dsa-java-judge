class Solution {
    public int minDistance(String a, String b) {
        int n = a.length(), m = b.length();
        int[] prev = new int[m + 1];
        for (int j = 0; j <= m; j++) prev[j] = j;
        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            cur[0] = i;
            for (int j = 1; j <= m; j++) {
                cur[j] = (a.charAt(i - 1) == b.charAt(j - 1))
                        ? prev[j - 1]
                        : 1 + Math.min(prev[j - 1], Math.min(prev[j], cur[j - 1]));
            }
            prev = cur;
        }
        return prev[m];
    }
}
