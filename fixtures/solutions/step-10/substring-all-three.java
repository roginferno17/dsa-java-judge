class Solution {
    public int numberOfSubstrings(String s) {
        int[] last = { -1, -1, -1 };
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            last[s.charAt(i) - 'a'] = i;
            int earliest = Math.min(last[0], Math.min(last[1], last[2]));
            if (earliest >= 0) total += earliest + 1;
        }
        return total;
    }
}
