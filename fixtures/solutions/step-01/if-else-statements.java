class Solution {
    public String classify(int n) {
        if (n > 0) return "positive";
        if (n < 0) return "negative";
        return "zero";
    }
}
