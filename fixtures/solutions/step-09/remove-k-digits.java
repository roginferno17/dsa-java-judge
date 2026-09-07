import java.util.*;

class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder sb = new StringBuilder();
        int remaining = k;
        for (char c : num.toCharArray()) {
            while (remaining > 0 && sb.length() > 0 && sb.charAt(sb.length() - 1) > c) {
                sb.deleteCharAt(sb.length() - 1);
                remaining--;
            }
            sb.append(c);
        }
        while (remaining > 0 && sb.length() > 0) {
            sb.deleteCharAt(sb.length() - 1);
            remaining--;
        }
        int i = 0;
        while (i < sb.length() - 1 && sb.charAt(i) == '0') i++;
        String out = sb.substring(i);
        return out.isEmpty() ? "0" : out;
    }
}
