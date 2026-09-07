import java.util.*;

class Solution {
    public String postfixToPrefix(String s) {
        Deque<String> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (isOperator(c)) {
                String right = st.pop();
                String left = st.pop();
                st.push(c + left + right);
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
