import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        Deque<Integer> st = new ArrayDeque<>();
        Deque<Integer> mins = new ArrayDeque<>();
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "push": {
                    int v = args[i][0];
                    st.push(v);
                    mins.push(mins.isEmpty() ? v : Math.min(v, mins.peek()));
                    out.add("null");
                    break;
                }
                case "pop":
                    st.pop();
                    mins.pop();
                    out.add("null");
                    break;
                case "top":
                    out.add(String.valueOf(st.peek()));
                    break;
                default:
                    out.add(String.valueOf(mins.peek()));
                    break;
            }
        }
        return out;
    }
}
