class Solution {
    public int repeatedStringMatch(String a, String b) {
        StringBuilder sb = new StringBuilder();
        int copies = 0;
        while (sb.length() < b.length()) { sb.append(a); copies++; }
        if (sb.indexOf(b) >= 0) return copies;
        sb.append(a);
        if (sb.indexOf(b) >= 0) return copies + 1;
        return -1;
    }
}
