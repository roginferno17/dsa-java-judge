class Solution {
    public int[] rearrange(int[] nums) {
        int[] out = new int[nums.length];
        int pos = 0, neg = 1;
        for (int x : nums) {
            if (x > 0) { out[pos] = x; pos += 2; }
            else { out[neg] = x; neg += 2; }
        }
        return out;
    }
}
