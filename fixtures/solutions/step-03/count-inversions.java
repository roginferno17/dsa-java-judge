class Solution {
    private long count = 0;
    public long countInversions(int[] nums) {
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
        merge(a, low, mid, high);
    }
    private void merge(int[] a, int low, int mid, int high) {
        int[] tmp = new int[high - low + 1];
        int i = low, j = mid + 1, k = 0;
        while (i <= mid && j <= high) {
            if (a[i] <= a[j]) tmp[k++] = a[i++];
            else { count += mid - i + 1; tmp[k++] = a[j++]; }
        }
        while (i <= mid) tmp[k++] = a[i++];
        while (j <= high) tmp[k++] = a[j++];
        System.arraycopy(tmp, 0, a, low, tmp.length);
    }
}
