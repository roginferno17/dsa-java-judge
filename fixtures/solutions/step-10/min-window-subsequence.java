class Solution {
    public String minWindowSubsequence(String s1, String s2) {
        int n = s1.length(), m = s2.length();
        int bestStart = -1, bestLen = Integer.MAX_VALUE;
        int i = 0;
        while (i < n) {
            int j = 0;
            // Forward: match s2 in order.
            while (i < n) {
                if (s1.charAt(i) == s2.charAt(j)) {
                    j++;
                    if (j == m) break;
                }
                i++;
            }
            if (j < m) break;              // s2 never completed
            int end = i;
            // Backward: tighten to the latest possible start.
            j = m - 1;
            while (j >= 0) {
                if (s1.charAt(i) == s2.charAt(j)) j--;
                if (j < 0) break;
                i--;
            }
            if (end - i + 1 < bestLen) {
                bestLen = end - i + 1;
                bestStart = i;
            }
            i++;                            // restart just after this start
        }
        return bestStart < 0 ? "" : s1.substring(bestStart, bestStart + bestLen);
    }
}
