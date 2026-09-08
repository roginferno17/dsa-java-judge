class Solution {
    public void recursiveInsertionSort(int[] arr) { insert(arr, 1); }
    private void insert(int[] a, int i) {
        if (i >= a.length) return;
        int key = a[i], j = i - 1;
        while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
        a[j + 1] = key;
        insert(a, i + 1);
    }
}
