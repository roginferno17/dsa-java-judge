import java.util.*;

class Solution {
    public int[] nextGreaterCircular(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];
        Arrays.fill(ans, -1);
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < 2 * n; i++) {
            int v = nums[i % n];
            while (!st.isEmpty() && nums[st.peek()] < v) {
                ans[st.pop()] = v;
            }
            if (i < n) st.push(i);
        }
        return ans;
    }
}
