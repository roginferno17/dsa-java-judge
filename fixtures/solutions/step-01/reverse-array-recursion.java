class Solution {
    public void reverseArray(int[] arr) { rev(arr, 0, arr.length - 1); }
    private void rev(int[] a, int l, int r) {
        if (l >= r) return;
        int t = a[l]; a[l] = a[r]; a[r] = t;
        rev(a, l + 1, r - 1);
    }
}
