class Solution {
    public boolean search(ListNode head, int key) {
        for (ListNode cur = head; cur != null; cur = cur.next) if (cur.val == key) return true;
        return false;
    }
}
