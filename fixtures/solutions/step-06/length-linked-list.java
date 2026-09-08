class Solution {
    public int length(ListNode head) {
        int n = 0;
        for (ListNode cur = head; cur != null; cur = cur.next) n++;
        return n;
    }
}
