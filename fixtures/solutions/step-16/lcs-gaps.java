class Solution {
    public String printLCS(String a, String b) {
        int n = a.length(), m = b.length();
        // length[i][j] = LCS of the suffixes a[i..] and b[j..]
        int[][] length = new int[n + 1][m + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                length[i][j] = (a.charAt(i) == b.charAt(j))
                        ? 1 + length[i + 1][j + 1]
                        : Math.max(length[i + 1][j], length[i][j + 1]);
            }
        }

        StringBuilder out = new StringBuilder();
        int i = 0, j = 0;
        int remaining = length[0][0];
        while (remaining > 0) {
            for (char c = 'a'; c <= 'z'; c++) {
                int ia = a.indexOf(c, i);
                int jb = b.indexOf(c, j);
                if (ia < 0 || jb < 0) continue;
                if (1 + length[ia + 1][jb + 1] == remaining) {
                    out.append(c);
                    i = ia + 1;
                    j = jb + 1;
                    remaining--;
                    break;
                }
            }
        }
        return out.toString();
    }
}
