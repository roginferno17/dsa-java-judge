class Solution {
    public boolean isIsomorphic(String s, String t) {
        int[] ms = new int[256], mt = new int[256];
        for (int i = 0; i < s.length(); i++) {
            char a = s.charAt(i), b = t.charAt(i);
            if (ms[a] != mt[b]) return false;
            ms[a] = i + 1;
            mt[b] = i + 1;
        }
        return true;
    }
}
