class Solution {
    public ListNode sortZeroOneTwo(ListNode head) {
        ListNode d0 = new ListNode(0), d1 = new ListNode(0), d2 = new ListNode(0);
        ListNode t0 = d0, t1 = d1, t2 = d2;
        for (ListNode cur = head; cur != null; cur = cur.next) {
            if (cur.val == 0) { t0.next = cur; t0 = cur; }
            else if (cur.val == 1) { t1.next = cur; t1 = cur; }
            else { t2.next = cur; t2 = cur; }
        }
        t2.next = null;
        t1.next = d2.next;
        t0.next = (d1.next != null) ? d1.next : d2.next;
        return d0.next;
    }
}
