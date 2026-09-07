import java.util.*;
class Solution {
    private static final String[] MAP = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    public List<String> letterCombinations(String digits) {
        List<String> out = new ArrayList<>();
        if (digits == null || digits.isEmpty()) return out;
        go(digits, 0, new StringBuilder(), out);
        return out;
    }
    private void go(String d, int i, StringBuilder sb, List<String> out) {
        if (i == d.length()) { out.add(sb.toString()); return; }
        for (char c : MAP[d.charAt(i) - '0'].toCharArray()) {
            sb.append(c);
            go(d, i + 1, sb, out);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
