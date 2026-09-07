import java.util.*;
class Solution {
    public List<Integer> findUnion(int[] a, int[] b) {
        List<Integer> out = new ArrayList<>();
        int i = 0, j = 0;
        while (i < a.length && j < b.length) {
            int v;
            if (a[i] < b[j]) v = a[i++];
            else if (b[j] < a[i]) v = b[j++];
            else { v = a[i]; i++; j++; }
            if (out.isEmpty() || out.get(out.size() - 1) != v) out.add(v);
        }
        while (i < a.length) { int v = a[i++]; if (out.isEmpty() || out.get(out.size()-1) != v) out.add(v); }
        while (j < b.length) { int v = b[j++]; if (out.isEmpty() || out.get(out.size()-1) != v) out.add(v); }
        return out;
    }
}
