class Solution {
    public DoublyListNode build(int[] values) {
        DoublyListNode head = null, tail = null;
        for (int v : values) {
            DoublyListNode node = new DoublyListNode(v);
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; node.prev = tail; tail = node; }
        }
        return head;
    }
}
