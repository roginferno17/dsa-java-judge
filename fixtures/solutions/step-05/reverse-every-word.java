class Solution {
    public String reverseEachWord(String s) {
        String[] parts = s.split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < parts.length; i++) {
            sb.append(new StringBuilder(parts[i]).reverse());
            if (i < parts.length - 1) sb.append(' ');
        }
        return sb.toString();
    }
}
