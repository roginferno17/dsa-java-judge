class Solution {
    public int detectCycleStart(ListNode head) {
        ListNode slow = head, fast = head, meet = null;
        while (fast != null && fast.next != null) {
            slow = slow.next; fast = fast.next.next;
            if (slow == fast) { meet = slow; break; }
        }
        if (meet == null) return -1;
        ListNode a = head;
        while (a != meet) { a = a.next; meet = meet.next; }
        return a.val;
    }
}
