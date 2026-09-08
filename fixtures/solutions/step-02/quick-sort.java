import java.util.*;
class Solution {
    private final Random rnd = new Random(42);
    public void quickSort(int[] arr) { sort(arr, 0, arr.length - 1); }
    private void sort(int[] a, int low, int high) {
        while (low < high) {
            int p = partition(a, low, high);
            if (p - low < high - p) { sort(a, low, p - 1); low = p + 1; }
            else { sort(a, p + 1, high); high = p - 1; }
        }
    }
    private int partition(int[] a, int low, int high) {
        int r = low + rnd.nextInt(high - low + 1);
        swap(a, r, high);
        int pivot = a[high], i = low;
        for (int j = low; j < high; j++) if (a[j] < pivot) swap(a, i++, j);
        swap(a, i, high);
        return i;
    }
    private void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
}
