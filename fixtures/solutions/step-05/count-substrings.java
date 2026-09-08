class Solution {
    public int countSubstrings(String s, int k) {
        return atMost(s, k) - atMost(s, k - 1);
    }
    private int atMost(String s, int k) {
        if (k <= 0) return 0;
        int[] count = new int[26];
        int distinct = 0, left = 0, total = 0;
        for (int right = 0; right < s.length(); right++) {
            if (count[s.charAt(right) - 'a']++ == 0) distinct++;
            while (distinct > k) {
                if (--count[s.charAt(left) - 'a'] == 0) distinct--;
                left++;
            }
            total += right - left + 1;
        }
        return total;
    }
}
