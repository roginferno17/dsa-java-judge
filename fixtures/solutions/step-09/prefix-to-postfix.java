import java.util.*;

class Solution {
    public String prefixToPostfix(String s) {
        Deque<String> st = new ArrayDeque<>();
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s.charAt(i);
            if (isOperator(c)) {
                String left = st.pop();
                String right = st.pop();
                st.push(left + right + c);
            } else {
                st.push(String.valueOf(c));
            }
        }
        return st.pop();
    }

    private boolean isOperator(char c) {
        return c == '+' || c == '-' || c == '*' || c == '/' || c == '^';
    }
}
