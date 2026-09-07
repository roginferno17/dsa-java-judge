import java.util.*;
class Solution {
    public int[] reverseStack(int[] stack) {
        Deque<Integer> st = new ArrayDeque<>();
        for (int v : stack) st.push(v);
        reverse(st);
        int[] out = new int[stack.length];
        for (int i = out.length - 1; i >= 0; i--) out[i] = st.pop();
        return out;
    }
    private void reverse(Deque<Integer> st) {
        if (st.isEmpty()) return;
        int top = st.pop();
        reverse(st);
        insertBottom(st, top);
    }
    private void insertBottom(Deque<Integer> st, int v) {
        if (st.isEmpty()) { st.push(v); return; }
        int top = st.pop();
        insertBottom(st, v);
        st.push(top);
    }
}
