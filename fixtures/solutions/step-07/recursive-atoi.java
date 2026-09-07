class Solution {
    public int myAtoi(String s) {
        int i = 0, n = s.length();
        while (i < n && s.charAt(i) == ' ') i++;
        if (i == n) return 0;
        int sign = 1;
        if (s.charAt(i) == '+' || s.charAt(i) == '-') {
            if (s.charAt(i) == '-') sign = -1;
            i++;
        }
        return (int) parse(s, i, 0L, sign);
    }
    private long parse(String s, int i, long acc, int sign) {
        if (i >= s.length() || !Character.isDigit(s.charAt(i))) return sign * acc;
        acc = acc * 10 + (s.charAt(i) - '0');
        if (sign == 1 && acc > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (sign == -1 && -acc < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        return parse(s, i + 1, acc, sign);
    }
}
