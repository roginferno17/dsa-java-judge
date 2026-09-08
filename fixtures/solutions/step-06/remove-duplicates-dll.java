class Solution {
    public DoublyListNode removeDuplicates(DoublyListNode head) {
        DoublyListNode cur = head;
        while (cur != null) {
            DoublyListNode scout = cur.next;
            while (scout != null && scout.val == cur.val) scout = scout.next;
            cur.next = scout;
            if (scout != null) scout.prev = cur;
            cur = scout;
        }
        return head;
    }
}
