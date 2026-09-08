class Solution {
    public int leastInterval(String tasks, int n) {
        int[] count = new int[26];
        for (char c : tasks.toCharArray()) count[c - 'A']++;
        int maxCount = 0, ties = 0;
        for (int c : count) {
            if (c > maxCount) {
                maxCount = c;
                ties = 1;
            } else if (c == maxCount && c > 0) {
                ties++;
            }
        }
        int skeleton = (maxCount - 1) * (n + 1) + ties;
        return Math.max(skeleton, tasks.length());
    }
}
