class Solution {
    public int[] twoOddOccurrences(int[] nums) {
        int xy = 0;
        for (int v : nums) xy ^= v;
        int bit = xy & -xy;
        int a = 0, b = 0;
        for (int v : nums) {
            if ((v & bit) != 0) a ^= v;
            else b ^= v;
        }
        return a <= b ? new int[]{ a, b } : new int[]{ b, a };
    }
}
