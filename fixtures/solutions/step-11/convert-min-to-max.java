class Solution {
    public int[] convertToMaxHeap(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) siftDown(arr, i, n);
        return arr;
    }

    private void siftDown(int[] a, int i, int n) {
        while (true) {
            int left = 2 * i + 1, right = 2 * i + 2, best = i;
            if (left < n && a[left] > a[best]) best = left;
            if (right < n && a[right] > a[best]) best = right;
            if (best == i) break;
            int t = a[i];
            a[i] = a[best];
            a[best] = t;
            i = best;
        }
    }
}
