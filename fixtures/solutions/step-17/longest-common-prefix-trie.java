class Solution {
    public String longestCommonPrefix(String[] strs) {
        String prefix = strs[0];
        for (String s : strs) {
            int i = 0;
            while (i < prefix.length() && i < s.length() && prefix.charAt(i) == s.charAt(i)) i++;
            prefix = prefix.substring(0, i);
            if (prefix.isEmpty()) return "";
        }
        return prefix;
    }
}
