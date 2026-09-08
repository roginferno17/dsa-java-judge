import java.util.*;
class Solution {
    public int aggressiveCows(int[] stalls, int k) {
        int[] a = stalls.clone();
        Arrays.sort(a);
        int low = 1, high = a[a.length - 1] - a[0], ans = 0;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int placed = 1, last = a[0];
            for (int i = 1; i < a.length; i++) {
                if (a[i] - last >= mid) { placed++; last = a[i]; }
            }
            if (placed >= k) { ans = mid; low = mid + 1; } else high = mid - 1;
        }
        return ans;
    }
}
