import java.util.*;
class Solution {
    public int[] sortStack(int[] stack) {
        Deque<Integer> st = new ArrayDeque<>();
        for (int v : stack) st.push(v);
        sort(st);
        int[] out = new int[stack.length];
        for (int i = out.length - 1; i >= 0; i--) out[i] = st.pop();
        return out;
    }
    private void sort(Deque<Integer> st) {
        if (st.size() <= 1) return;
        int top = st.pop();
        sort(st);
        insert(st, top);
    }
    private void insert(Deque<Integer> st, int v) {
        if (st.isEmpty() || st.peek() <= v) { st.push(v); return; }
        int top = st.pop();
        insert(st, v);
        st.push(top);
    }
}
