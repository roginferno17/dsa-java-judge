class Solution {
    public int removeDuplicates(int[] nums) {
        int write = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[write - 1]) nums[write++] = nums[i];
        }
        return write;
    }
}
