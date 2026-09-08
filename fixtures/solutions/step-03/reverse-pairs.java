class Solution {
    private int count = 0;
    public int reversePairs(int[] nums) {
        int[] a = nums.clone();
        count = 0;
        sort(a, 0, a.length - 1);
        return count;
    }
    private void sort(int[] a, int low, int high) {
        if (low >= high) return;
        int mid = low + (high - low) / 2;
        sort(a, low, mid);
        sort(a, mid + 1, high);
        countPairs(a, low, mid, high);
        merge(a, low, mid, high);
    }
    private void countPairs(int[] a, int low, int mid, int high) {
        int j = mid + 1;
        for (int i = low; i <= mid; i++) {
            while (j <= high && (long) a[i] > 2L * a[j]) j++;
            count += j - (mid + 1);
        }
    }
    private void merge(int[] a, int low, int mid, int high) {
        int[] tmp = new int[high - low + 1];
        int i = low, j = mid + 1, k = 0;
        while (i <= mid && j <= high) tmp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
        while (i <= mid) tmp[k++] = a[i++];
        while (j <= high) tmp[k++] = a[j++];
        System.arraycopy(tmp, 0, a, low, tmp.length);
    }
}
