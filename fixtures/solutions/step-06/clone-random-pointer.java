import java.util.*;
class Solution {
    public int[][] copyRandomList(ListNode head) {
        if (head == null) return new int[0][0];
        Map<ListNode, ListNode> copy = new IdentityHashMap<>();
        for (ListNode c = head; c != null; c = c.next) copy.put(c, new ListNode(c.val));
        for (ListNode c = head; c != null; c = c.next) {
            copy.get(c).next = copy.get(c.next);
            copy.get(c).random = (c.random == null) ? null : copy.get(c.random);
        }
        Map<ListNode, Integer> index = new IdentityHashMap<>();
        int n = 0;
        for (ListNode c = copy.get(head); c != null; c = c.next) index.put(c, n++);
        int[][] out = new int[n][2];
        int i = 0;
        for (ListNode c = copy.get(head); c != null; c = c.next) {
            out[i][0] = c.val;
            out[i][1] = (c.random == null) ? -1 : index.get(c.random);
            i++;
        }
        return out;
    }
}
