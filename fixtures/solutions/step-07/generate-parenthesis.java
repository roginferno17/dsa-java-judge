import java.util.*;
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> out = new ArrayList<>();
        build(n, 0, 0, new StringBuilder(), out);
        return out;
    }
    private void build(int n, int open, int close, StringBuilder sb, List<String> out) {
        if (sb.length() == 2 * n) { out.add(sb.toString()); return; }
        if (open < n) {
            sb.append('(');
            build(n, open + 1, close, sb, out);
            sb.deleteCharAt(sb.length() - 1);
        }
        if (close < open) {
            sb.append(')');
            build(n, open, close + 1, sb, out);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
