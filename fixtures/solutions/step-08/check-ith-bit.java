class Solution {
    public boolean isBitSet(int n, int i) {
        return (n & (1 << i)) != 0;
    }
}
