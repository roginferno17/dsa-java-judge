class Solution {
    public int getIntersectionValue(int[] a, int[] b, int[] common) {
        ListNode tail = build(common);
        ListNode headA = prepend(a, tail);
        ListNode headB = prepend(b, tail);
        ListNode p = headA, q = headB;
        if (p == null || q == null) return -1;
        while (p != q) {
            p = (p == null) ? headB : p.next;
            q = (q == null) ? headA : q.next;
        }
        return p == null ? -1 : p.val;
    }
    private ListNode build(int[] vals) {
        ListNode dummy = new ListNode(0), cur = dummy;
        for (int v : vals) { cur.next = new ListNode(v); cur = cur.next; }
        return dummy.next;
    }
    private ListNode prepend(int[] vals, ListNode tail) {
        ListNode dummy = new ListNode(0), cur = dummy;
        for (int v : vals) { cur.next = new ListNode(v); cur = cur.next; }
        cur.next = tail;
        return dummy.next;
    }
}
