import java.util.*;

class Solution {
    public long subArrayRanges(int[] nums) {
        return contribution(nums, true) - contribution(nums, false);
    }

    /** Sum over all subarrays of the max (wantMax) or the min. */
    private long contribution(int[] nums, boolean wantMax) {
        int n = nums.length;
        int[] prev = new int[n];
        int[] next = new int[n];
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && beatsOrEquals(nums[st.peek()], nums[i], wantMax)) st.pop();
            prev[i] = st.isEmpty() ? -1 : st.peek();
            st.push(i);
        }
        st.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && beats(nums[st.peek()], nums[i], wantMax)) st.pop();
            next[i] = st.isEmpty() ? n : st.peek();
            st.push(i);
        }
        long total = 0;
        for (int i = 0; i < n; i++) {
            total += (long) nums[i] * (i - prev[i]) * (next[i] - i);
        }
        return total;
    }

    /** Is a dominated by b, ties included? Used on the left, so duplicates break one way only. */
    private boolean beatsOrEquals(int a, int b, boolean wantMax) {
        return wantMax ? a <= b : a >= b;
    }

    private boolean beats(int a, int b, boolean wantMax) {
        return wantMax ? a < b : a > b;
    }
}
