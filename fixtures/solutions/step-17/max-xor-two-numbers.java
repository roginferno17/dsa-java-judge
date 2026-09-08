class Solution {
    private static class Node {
        Node[] bit = new Node[2];
    }

    public int findMaximumXOR(int[] nums) {
        Node root = new Node();
        for (int v : nums) insert(root, v);
        int best = 0;
        for (int v : nums) best = Math.max(best, bestPartner(root, v));
        return best;
    }

    private void insert(Node root, int value) {
        Node cur = root;
        for (int b = 30; b >= 0; b--) {
            int bit = (value >> b) & 1;
            if (cur.bit[bit] == null) cur.bit[bit] = new Node();
            cur = cur.bit[bit];
        }
    }

    private int bestPartner(Node root, int value) {
        Node cur = root;
        int result = 0;
        for (int b = 30; b >= 0; b--) {
            int bit = (value >> b) & 1;
            int want = 1 - bit;
            if (cur.bit[want] != null) {
                result |= (1 << b);
                cur = cur.bit[want];
            } else {
                cur = cur.bit[bit];
            }
        }
        return result;
    }
}
