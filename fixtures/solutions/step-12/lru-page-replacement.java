import java.util.*;

class Solution {
    public int pageFaults(int[] pages, int frames) {
        LinkedHashSet<Integer> memory = new LinkedHashSet<>();
        int faults = 0;
        for (int p : pages) {
            if (memory.remove(p)) {
                memory.add(p);          // a hit still refreshes recency
                continue;
            }
            faults++;
            if (memory.size() == frames) {
                Iterator<Integer> it = memory.iterator();
                it.next();
                it.remove();
            }
            memory.add(p);
        }
        return faults;
    }
}
