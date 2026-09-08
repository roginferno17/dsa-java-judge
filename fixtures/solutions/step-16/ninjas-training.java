class Solution {
    public int ninjaTraining(int[][] points) {
        int[] prev = { points[0][0], points[0][1], points[0][2] };
        for (int day = 1; day < points.length; day++) {
            int[] cur = new int[3];
            for (int last = 0; last < 3; last++) {
                int best = Integer.MIN_VALUE;
                for (int k = 0; k < 3; k++) if (k != last) best = Math.max(best, prev[k]);
                cur[last] = points[day][last] + best;
            }
            prev = cur;
        }
        return Math.max(prev[0], Math.max(prev[1], prev[2]));
    }
}
