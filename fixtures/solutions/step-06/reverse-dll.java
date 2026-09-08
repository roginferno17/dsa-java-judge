class Solution {
    public DoublyListNode reverse(DoublyListNode head) {
        DoublyListNode cur = head, last = null;
        while (cur != null) {
            DoublyListNode nxt = cur.next;
            cur.next = cur.prev;
            cur.prev = nxt;
            last = cur;
            cur = nxt;
        }
        return last;
    }
}
