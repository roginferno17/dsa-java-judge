import java.util.*;
class Solution {
    public List<String> generateStrings(int n) {
        List<String> out = new ArrayList<>();
        build(n, new StringBuilder(), out);
        return out;
    }
    private void build(int n, StringBuilder sb, List<String> out) {
        if (sb.length() == n) { out.add(sb.toString()); return; }
        sb.append('0');
        build(n, sb, out);
        sb.deleteCharAt(sb.length() - 1);
        if (sb.length() == 0 || sb.charAt(sb.length() - 1) != '1') {
            sb.append('1');
            build(n, sb, out);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
