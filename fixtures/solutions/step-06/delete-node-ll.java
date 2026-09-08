class Solution {
    public ListNode deleteAt(ListNode head, int position) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode cur = dummy;
        for (int i = 0; i < position && cur.next != null; i++) cur = cur.next;
        if (cur.next != null) cur.next = cur.next.next;
        return dummy.next;
    }
}
