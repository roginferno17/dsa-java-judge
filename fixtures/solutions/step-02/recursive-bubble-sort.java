class Solution {
    public void recursiveBubbleSort(int[] arr) { pass(arr, arr.length); }
    private void pass(int[] a, int n) {
        if (n <= 1) return;
        boolean swapped = false;
        for (int j = 0; j < n - 1; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                swapped = true;
            }
        }
        if (!swapped) return;
        pass(a, n - 1);
    }
}
