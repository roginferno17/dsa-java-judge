class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int low = 0, high = 0;
        for (int w : weights) { low = Math.max(low, w); high += w; }
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int used = 1, load = 0;
            for (int w : weights) {
                if (load + w > mid) { used++; load = w; } else load += w;
            }
            if (used <= days) { ans = mid; high = mid - 1; } else low = mid + 1;
        }
        return ans;
    }
}
