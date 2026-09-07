class Solution {
    public String[] rightTriangle(int n) {
        String[] rows = new String[n];
        for (int i = 1; i <= n; i++) {
            StringBuilder sb = new StringBuilder();
            for (int s = 0; s < n - i; s++) sb.append(' ');
            for (int s = 0; s < i; s++) sb.append('*');
            rows[i - 1] = sb.toString();
        }
        return rows;
    }
}
