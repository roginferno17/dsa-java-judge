class Solution {
    public int trap(int[] height) {
        int l = 0, r = height.length - 1;
        int leftMax = 0, rightMax = 0, total = 0;
        while (l < r) {
            if (height[l] <= height[r]) {
                leftMax = Math.max(leftMax, height[l]);
                total += leftMax - height[l];
                l++;
            } else {
                rightMax = Math.max(rightMax, height[r]);
                total += rightMax - height[r];
                r--;
            }
        }
        return total;
    }
}
