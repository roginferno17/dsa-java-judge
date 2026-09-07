import java.util.*;
class Solution {
    public int[][] findPairs(DoublyListNode head, int target) {
        List<int[]> out = new ArrayList<>();
        if (head == null) return new int[0][0];
        DoublyListNode left = head, right = head;
        while (right.next != null) right = right.next;
        while (left != null && right != null && left != right && left.prev != right) {
            int sum = left.val + right.val;
            if (sum == target) { out.add(new int[]{ left.val, right.val }); left = left.next; right = right.prev; }
            else if (sum < target) left = left.next;
            else right = right.prev;
        }
        return out.toArray(new int[0][]);
    }
}
