class Solution {
    public int countSetBits(int n) {
        int c = 0;
        while (n != 0) {
            n &= (n - 1);
            c++;
        }
        return c;
    }
}
