import java.util.*;

class Solution {
    public String infixToPostfix(String s) {
        StringBuilder out = new StringBuilder();
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                out.append(c);
            } else if (c == '(') {
                st.push(c);
            } else if (c == ')') {
                while (!st.isEmpty() && st.peek() != '(') out.append(st.pop());
                if (!st.isEmpty()) st.pop();
            } else {
                while (!st.isEmpty() && st.peek() != '(' && shouldPop(st.peek(), c)) {
                    out.append(st.pop());
                }
                st.push(c);
            }
        }
        while (!st.isEmpty()) out.append(st.pop());
        return out.toString();
    }

    private boolean shouldPop(char onStack, char incoming) {
        int a = prec(onStack), b = prec(incoming);
        if (a > b) return true;
        // Equal precedence pops only for left-associative operators.
        return a == b && incoming != '^';
    }

    private int prec(char c) {
        if (c == '^') return 3;
        if (c == '*' || c == '/') return 2;
        return 1;
    }
}
