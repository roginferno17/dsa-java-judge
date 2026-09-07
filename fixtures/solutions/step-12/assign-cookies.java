import java.util.*;

class Solution {
    public int findContentChildren(int[] greed, int[] sizes) {
        int[] g = greed.clone(), s = sizes.clone();
        Arrays.sort(g);
        Arrays.sort(s);
        int child = 0, cookie = 0;
        while (child < g.length && cookie < s.length) {
            if (s[cookie] >= g[child]) child++;
            cookie++;
        }
        return child;
    }
}
