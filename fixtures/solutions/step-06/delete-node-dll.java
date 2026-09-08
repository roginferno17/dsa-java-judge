class Solution {
    public DoublyListNode deleteAt(DoublyListNode head, int position) {
        if (head == null) return null;
        DoublyListNode cur = head;
        for (int i = 0; i < position && cur != null; i++) cur = cur.next;
        if (cur == null) return head;
        if (cur.prev != null) cur.prev.next = cur.next;
        if (cur.next != null) cur.next.prev = cur.prev;
        return cur == head ? cur.next : head;
    }
}
