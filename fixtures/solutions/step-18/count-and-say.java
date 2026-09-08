class Solution {
    public String countAndSay(int n) {
        String s = "1";
        for (int k = 2; k <= n; k++) {
            StringBuilder next = new StringBuilder();
            int i = 0;
            while (i < s.length()) {
                int j = i;
                while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
                next.append(j - i).append(s.charAt(i));
                i = j;
            }
            s = next.toString();
        }
        return s;
    }
}
