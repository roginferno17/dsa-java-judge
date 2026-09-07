import java.util.*;

class Solution {
    private static class Node {
        int val;
        Node next;
        Node(int v, Node n) { val = v; next = n; }
    }

    public List<String> run(String[] ops, int[][] args) {
        Node head = null;
        int size = 0;
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "push":
                    head = new Node(args[i][0], head);
                    size++;
                    out.add("null");
                    break;
                case "pop":
                    if (head == null) {
                        out.add("-1");
                    } else {
                        out.add(String.valueOf(head.val));
                        head = head.next;
                        size--;
                    }
                    break;
                case "top":
                    out.add(head == null ? "-1" : String.valueOf(head.val));
                    break;
                default:
                    out.add(String.valueOf(size));
                    break;
            }
        }
        return out;
    }
}
