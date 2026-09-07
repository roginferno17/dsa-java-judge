class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) { slow = slow.next; fast = fast.next.next; }
        ListNode second = reverse(slow.next);
        ListNode a = head, b = second;
        while (b != null) {
            if (a.val != b.val) return false;
            a = a.next; b = b.next;
        }
        return true;
    }
    private ListNode reverse(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) { ListNode n = cur.next; cur.next = prev; prev = cur; cur = n; }
        return prev;
    }
}
