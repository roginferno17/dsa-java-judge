class Solution {
    public int oddOccurrence(int[] nums) {
        int x = 0;
        for (int v : nums) x ^= v;
        return x;
    }
}
