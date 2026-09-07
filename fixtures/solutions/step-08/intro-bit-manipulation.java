class Solution {
    public String toBinary(int n) {
        if (n == 0) return "0";
        StringBuilder sb = new StringBuilder();
        while (n != 0) {
            sb.append((char) ('0' + (n & 1)));
            n >>>= 1;
        }
        return sb.reverse().toString();
    }
}
