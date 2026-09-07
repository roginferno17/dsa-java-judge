import java.util.*;

class Solution {
    private static class Node {
        int val;
        Node next;
        Node(int v) { val = v; }
    }

    public List<String> run(String[] ops, int[][] args) {
        Node head = null, tail = null;
        int size = 0;
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "push": {
                    Node node = new Node(args[i][0]);
                    if (tail == null) {
                        head = node;
                        tail = node;
                    } else {
                        tail.next = node;
                        tail = node;
                    }
                    size++;
                    out.add("null");
                    break;
                }
                case "pop":
                    if (head == null) {
                        out.add("-1");
                    } else {
                        out.add(String.valueOf(head.val));
                        head = head.next;
                        if (head == null) tail = null;
                        size--;
                    }
                    break;
                case "peek":
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
