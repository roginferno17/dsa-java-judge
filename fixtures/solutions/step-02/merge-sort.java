class Solution {
    public void mergeSort(int[] arr) { sort(arr, 0, arr.length - 1); }
    private void sort(int[] a, int low, int high) {
        if (low >= high) return;
        int mid = low + (high - low) / 2;
        sort(a, low, mid);
        sort(a, mid + 1, high);
        merge(a, low, mid, high);
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
