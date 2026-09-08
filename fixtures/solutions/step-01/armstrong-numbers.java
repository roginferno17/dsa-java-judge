class Solution {
    public boolean isArmstrong(int n) {
        int digits = 0, tmp = n;
        if (n == 0) digits = 1;
        while (tmp > 0) { digits++; tmp /= 10; }
        long sum = 0;
        tmp = n;
        do {
            int d = tmp % 10;
            long p = 1;
            for (int i = 0; i < digits; i++) p *= d;
            sum += p;
            tmp /= 10;
        } while (tmp > 0);
        return sum == n;
    }
}
