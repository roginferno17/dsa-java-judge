class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length;
        int total = 0;
        for (int v : cardPoints) total += v;
        int window = n - k;
        if (window == 0) return total;
        int sum = 0;
        for (int i = 0; i < window; i++) sum += cardPoints[i];
        int min = sum;
        for (int i = window; i < n; i++) {
            sum += cardPoints[i] - cardPoints[i - window];
            min = Math.min(min, sum);
        }
        return total - min;
    }
}
