import java.util.*;

class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        for (int v : nums) {
            int pos = Arrays.binarySearch(tails, 0, size, v);
            if (pos < 0) pos = -(pos + 1);      // first tail >= v
            tails[pos] = v;
            if (pos == size) size++;
        }
        return size;
    }
}
