class Solution {
    public ListNode insert(ListNode head, int position, int value) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode cur = dummy;
        for (int i = 0; i < position && cur.next != null; i++) cur = cur.next;
        ListNode node = new ListNode(value);
        node.next = cur.next;
        cur.next = node;
        return dummy.next;
    }
}
