class Solution {
    public int collatzSteps(int n) {
        long v = n;
        int steps = 0;
        while (v != 1) {
            v = (v % 2 == 0) ? v / 2 : 3 * v + 1;
            steps++;
        }
        return steps;
    }
}
