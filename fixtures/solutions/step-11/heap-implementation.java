import java.util.*;

class Solution {
    private int[] heap;
    private int size;
    private boolean isMin;

    public List<String> run(boolean isMin, String[] ops, int[][] args) {
        this.isMin = isMin;
        this.heap = new int[ops.length + 1];
        this.size = 0;
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "insert":
                    insert(args[i][0]);
                    out.add("null");
                    break;
                case "extract":
                    out.add(size == 0 ? "-1" : String.valueOf(extract()));
                    break;
                case "peek":
                    out.add(size == 0 ? "-1" : String.valueOf(heap[0]));
                    break;
                default:
                    out.add(String.valueOf(size));
                    break;
            }
        }
        return out;
    }

    private void insert(int v) {
        heap[size] = v;
        siftUp(size);
        size++;
    }

    private int extract() {
        int top = heap[0];
        heap[0] = heap[--size];
        siftDown(0);
        return top;
    }

    /** True when a should sit above b. */
    private boolean beats(int a, int b) {
        return isMin ? a < b : a > b;
    }

    private void siftUp(int i) {
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (!beats(heap[i], heap[parent])) break;
            swap(i, parent);
            i = parent;
        }
    }

    private void siftDown(int i) {
        while (true) {
            int left = 2 * i + 1, right = 2 * i + 2, best = i;
            if (left < size && beats(heap[left], heap[best])) best = left;
            if (right < size && beats(heap[right], heap[best])) best = right;
            if (best == i) break;
            swap(i, best);
            i = best;
        }
    }

    private void swap(int i, int j) {
        int t = heap[i];
        heap[i] = heap[j];
        heap[j] = t;
    }
}
