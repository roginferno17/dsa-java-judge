import java.util.*;

class Solution {
    public int sumSubarrayMins(int[] nums) {
        final long MOD = 1000000007L;
        int n = nums.length;
        int[] prevSmaller = new int[n];   // strictly smaller
        int[] nextSmaller = new int[n];   // smaller or equal
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && nums[st.peek()] >= nums[i]) st.pop();
            prevSmaller[i] = st.isEmpty() ? -1 : st.peek();
            st.push(i);
        }
        st.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && nums[st.peek()] > nums[i]) st.pop();
            nextSmaller[i] = st.isEmpty() ? n : st.peek();
            st.push(i);
        }
        long total = 0;
        for (int i = 0; i < n; i++) {
            long left = i - prevSmaller[i];
            long right = nextSmaller[i] - i;
            total = (total + nums[i] % MOD * (left * right % MOD)) % MOD;
        }
        return (int) total;
    }
}
