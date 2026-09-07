class Solution {
    public DoublyListNode deleteAllOccurrences(DoublyListNode head, int key) {
        DoublyListNode cur = head;
        while (cur != null) {
            DoublyListNode nxt = cur.next;
            if (cur.val == key) {
                if (cur.prev != null) cur.prev.next = cur.next;
                if (cur.next != null) cur.next.prev = cur.prev;
                if (cur == head) head = cur.next;
            }
            cur = nxt;
        }
        return head;
    }
}
