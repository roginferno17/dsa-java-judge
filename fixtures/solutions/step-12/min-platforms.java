import java.util.*;

class Solution {
    public int minPlatforms(int[] arrival, int[] departure) {
        int[] a = arrival.clone(), d = departure.clone();
        Arrays.sort(a);
        Arrays.sort(d);
        int i = 0, j = 0, current = 0, best = 0;
        while (i < a.length) {
            if (a[i] <= d[j]) {
                current++;
                best = Math.max(best, current);
                i++;
            } else {
                current--;
                j++;
            }
        }
        return best;
    }
}
