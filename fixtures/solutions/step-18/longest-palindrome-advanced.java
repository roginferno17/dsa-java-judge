class Solution {
    public int[] longestPalindromeSpan(String s) {
        int n = s.length();
        // Interleave separators so every palindrome has odd length.
        char[] t = new char[2 * n + 1];
        for (int i = 0; i < t.length; i++) t[i] = (i % 2 == 0) ? '#' : s.charAt(i / 2);

        int[] radius = new int[t.length];
        int centre = 0, right = 0;
        int bestRadius = 0, bestCentre = 0;
        for (int i = 0; i < t.length; i++) {
            if (i < right) radius[i] = Math.min(right - i, radius[2 * centre - i]);
            while (i - radius[i] - 1 >= 0 && i + radius[i] + 1 < t.length
                    && t[i - radius[i] - 1] == t[i + radius[i] + 1]) {
                radius[i]++;
            }
            if (i + radius[i] > right) { centre = i; right = i + radius[i]; }
            if (radius[i] > bestRadius) { bestRadius = radius[i]; bestCentre = i; }
        }
        int start = (bestCentre - bestRadius) / 2;
        return new int[]{ start, bestRadius == 0 ? 1 : bestRadius };
    }
}
