class Solution {
    public int countBitsToFlip(int a, int b) {
        int x = a ^ b, c = 0;
        while (x != 0) {
            x &= (x - 1);
            c++;
        }
        return c;
    }
}
