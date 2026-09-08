class Solution {
    public ListNode build(int[] values) {
        ListNode dummy = new ListNode(0), cur = dummy;
        for (int v : values) { cur.next = new ListNode(v); cur = cur.next; }
        return dummy.next;
    }
}
