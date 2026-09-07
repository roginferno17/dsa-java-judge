import java.util.*;

class Solution {
    private static class Node {
        Node[] bit = new Node[2];
    }

    private final Node root = new Node();
    private boolean empty = true;

    public int[] maximizeXor(int[] nums, int[][] queries) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        Integer[] order = new Integer[queries.length];
        for (int i = 0; i < order.length; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> Integer.compare(queries[a][1], queries[b][1]));

        int[] out = new int[queries.length];
        int placed = 0;
        for (int q : order) {
            int x = queries[q][0], limit = queries[q][1];
            while (placed < sorted.length && sorted[placed] <= limit) {
                insert(sorted[placed++]);
                empty = false;
            }
            out[q] = empty ? -1 : bestPartner(x);
        }
        return out;
    }

    private void insert(int value) {
        Node cur = root;
        for (int b = 30; b >= 0; b--) {
            int bit = (value >> b) & 1;
            if (cur.bit[bit] == null) cur.bit[bit] = new Node();
            cur = cur.bit[bit];
        }
    }

    private int bestPartner(int value) {
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
