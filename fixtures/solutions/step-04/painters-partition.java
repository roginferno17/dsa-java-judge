class Solution {
    public int minTime(int[] boards, int k) {
        int low = 0, high = 0;
        for (int b : boards) { low = Math.max(low, b); high += b; }
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int painters = 1, time = 0;
            for (int b : boards) {
                if (time + b > mid) { painters++; time = b; } else time += b;
            }
            if (painters <= k) { ans = mid; high = mid - 1; } else low = mid + 1;
        }
        return ans;
    }
}
