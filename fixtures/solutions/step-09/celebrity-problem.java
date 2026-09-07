class Solution {
    public int findCelebrity(int[][] m) {
        int n = m.length;
        int i = 0, j = n - 1;
        while (i < j) {
            if (m[i][j] == 1) i++;   // i knows someone, so i is not the celebrity
            else j--;                // i does not know j, so j is not the celebrity
        }
        int candidate = i;
        for (int k = 0; k < n; k++) {
            if (k == candidate) continue;
            if (m[candidate][k] != 0 || m[k][candidate] != 1) return -1;
        }
        return candidate;
    }
}
