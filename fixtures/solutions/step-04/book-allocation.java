class Solution {
    public int allocateBooks(int[] books, int m) {
        if (m > books.length) return -1;
        int low = 0, high = 0;
        for (int b : books) { low = Math.max(low, b); high += b; }
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int students = 1, pages = 0;
            for (int b : books) {
                if (pages + b > mid) { students++; pages = b; } else pages += b;
            }
            if (students <= m) { ans = mid; high = mid - 1; } else low = mid + 1;
        }
        return ans;
    }
}
