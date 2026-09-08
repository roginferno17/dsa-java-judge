class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[128];
        for (int i = 0; i < s.length(); i++) { count[s.charAt(i)]++; count[t.charAt(i)]--; }
        for (int c : count) if (c != 0) return false;
        return true;
    }
}
