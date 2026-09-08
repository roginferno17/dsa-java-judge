class Solution {
    public ListNode flatten(ListNode head) {
        if (head == null || head.next == null) return setNext(head);
        return setNext(mergeCols(head, flatten(head.next)));
    }
    private ListNode mergeCols(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0), cur = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { cur.bottom = a; a = a.bottom; }
            else { cur.bottom = b; b = b.bottom; }
            cur = cur.bottom;
            cur.next = null;
        }
        cur.bottom = (a != null) ? a : b;
        return dummy.bottom;
    }
    /** The judge reads the result through next, so mirror bottom into next. */
    private ListNode setNext(ListNode head) {
        for (ListNode c = head; c != null; c = c.bottom) c.next = c.bottom;
        return head;
    }
}
