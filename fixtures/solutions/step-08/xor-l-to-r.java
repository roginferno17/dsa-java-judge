class Solution {
    public int xorRange(int l, int r) {
        return prefix(r) ^ prefix(l - 1);
    }
    private int prefix(int n) {
        if (n < 0) return 0;
        switch (n % 4) {
            case 0: return n;
            case 1: return 1;
            case 2: return n + 1;
            default: return 0;
        }
    }
}
