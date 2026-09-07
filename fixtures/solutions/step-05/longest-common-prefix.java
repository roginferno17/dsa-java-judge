import java.util.*;
class Solution {
    public String longestCommonPrefix(String[] strs) {
        String[] a = strs.clone();
        Arrays.sort(a);
        String first = a[0], last = a[a.length - 1];
        int i = 0;
        while (i < first.length() && i < last.length() && first.charAt(i) == last.charAt(i)) i++;
        return first.substring(0, i);
    }
}
