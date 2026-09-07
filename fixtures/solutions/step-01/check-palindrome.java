class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) return false;
        long rev = 0, v = x;
        while (v != 0) { rev = rev * 10 + v % 10; v /= 10; }
        return rev == x;
    }
}
