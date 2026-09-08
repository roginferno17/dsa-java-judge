import java.util.*;

class Solution {
    public int maxMeetings(int[] start, int[] end) {
        int n = start.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) order[i] = i;
        Arrays.sort(order, (x, y) -> Integer.compare(end[x], end[y]));

        long free = Long.MIN_VALUE;
        int count = 0;
        for (int i : order) {
            if (start[i] >= free) {
                count++;
                free = end[i];
            }
        }
        return count;
    }
}
