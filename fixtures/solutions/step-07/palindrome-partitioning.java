import java.util.*;
class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> out = new ArrayList<>();
        go(s, 0, new ArrayList<>(), out);
        return out;
    }
    private void go(String s, int start, List<String> cur, List<List<String>> out) {
        if (start == s.length()) { out.add(new ArrayList<>(cur)); return; }
        for (int end = start; end < s.length(); end++) {
            if (!isPal(s, start, end)) continue;
            cur.add(s.substring(start, end + 1));
            go(s, end + 1, cur, out);
            cur.remove(cur.size() - 1);
        }
    }
    private boolean isPal(String s, int l, int r) {
        while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;
        return true;
    }
}
