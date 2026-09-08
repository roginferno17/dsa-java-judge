class Solution {
    public int loopLength(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next; fast = fast.next.next;
            if (slow == fast) {
                int n = 1;
                for (ListNode c = slow.next; c != slow; c = c.next) n++;
                return n;
            }
        }
        return 0;
    }
}
