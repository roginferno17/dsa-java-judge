class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        if ((long) m * k > bloomDay.length) return -1;
        int low = Integer.MAX_VALUE, high = Integer.MIN_VALUE, ans = -1;
        for (int d : bloomDay) { low = Math.min(low, d); high = Math.max(high, d); }
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int run = 0, made = 0;
            for (int d : bloomDay) {
                if (d <= mid) { if (++run == k) { made++; run = 0; } }
                else run = 0;
            }
            if (made >= m) { ans = mid; high = mid - 1; } else low = mid + 1;
        }
        return ans;
    }
}
