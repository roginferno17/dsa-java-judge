class Solution {
    public DoublyListNode insert(DoublyListNode head, int position, int value) {
        DoublyListNode node = new DoublyListNode(value);
        if (head == null) return node;
        if (position == 0) { node.next = head; head.prev = node; return node; }
        DoublyListNode cur = head;
        for (int i = 0; i < position - 1 && cur.next != null; i++) cur = cur.next;
        node.next = cur.next;
        node.prev = cur;
        if (cur.next != null) cur.next.prev = node;
        cur.next = node;
        return head;
    }
}
