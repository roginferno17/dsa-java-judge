import java.util.*;
class Solution {
    public List<String> addOperators(String num, int target) {
        List<String> out = new ArrayList<>();
        go(num, target, 0, new StringBuilder(), 0L, 0L, out);
        Collections.sort(out);
        return out;
    }
    private void go(String s, int target, int pos, StringBuilder expr, long value, long prev, List<String> out) {
        if (pos == s.length()) {
            if (value == target) out.add(expr.toString());
            return;
        }
        for (int i = pos; i < s.length(); i++) {
            if (i > pos && s.charAt(pos) == '0') break;
            long cur = Long.parseLong(s.substring(pos, i + 1));
            int len = expr.length();
            if (pos == 0) {
                expr.append(cur);
                go(s, target, i + 1, expr, cur, cur, out);
            } else {
                expr.append('+').append(cur);
                go(s, target, i + 1, expr, value + cur, cur, out);
                expr.setLength(len);
                expr.append('-').append(cur);
                go(s, target, i + 1, expr, value - cur, -cur, out);
                expr.setLength(len);
                expr.append('*').append(cur);
                go(s, target, i + 1, expr, value - prev + prev * cur, prev * cur, out);
            }
            expr.setLength(len);
        }
    }
}
