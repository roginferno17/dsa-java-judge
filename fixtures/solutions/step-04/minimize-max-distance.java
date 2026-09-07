class Solution {
    public double minMaxDistance(int[] stations, int k) {
        double low = 0, high = 0;
        for (int i = 1; i < stations.length; i++) {
            high = Math.max(high, stations[i] - stations[i - 1]);
        }
        for (int iter = 0; iter < 100; iter++) {
            double mid = (low + high) / 2;
            if (mid <= 0) break;
            long need = 0;
            for (int i = 1; i < stations.length; i++) {
                need += (long) Math.ceil((stations[i] - stations[i - 1]) / mid) - 1;
                if (need > k) break;
            }
            if (need <= k) high = mid; else low = mid;
        }
        return high;
    }
}
