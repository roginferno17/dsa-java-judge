class Solution {
    public ListNode addOne(ListNode head) {
        ListNode rev = reverse(head);
        int carry = 1;
        ListNode cur = rev, last = null;
        while (cur != null && carry > 0) {
            int sum = cur.val + carry;
            cur.val = sum % 10;
            carry = sum / 10;
            last = cur;
            cur = cur.next;
        }
        if (carry > 0) last.next = new ListNode(carry);
        return reverse(rev);
    }
    private ListNode reverse(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) { ListNode n = cur.next; cur.next = prev; prev = cur; cur = n; }
        return prev;
    }
}
