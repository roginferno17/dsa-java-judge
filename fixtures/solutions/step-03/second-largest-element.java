class Solution {
    public int getSecondLargest(int[] arr) {
        long largest = Long.MIN_VALUE, second = Long.MIN_VALUE;
        for (int x : arr) {
            if (x > largest) { second = largest; largest = x; }
            else if (x < largest && x > second) { second = x; }
        }
        return second == Long.MIN_VALUE ? -1 : (int) second;
    }
}
