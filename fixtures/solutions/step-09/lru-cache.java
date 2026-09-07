import java.util.*;

class Solution {
    private static class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }

    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0);
    private final Node tail = new Node(0, 0);
    private int capacity;

    public List<String> run(int capacity, String[] ops, int[][] args) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            if (ops[i].equals("get")) {
                out.add(String.valueOf(get(args[i][0])));
            } else {
                put(args[i][0], args[i][1]);
                out.add("null");
            }
        }
        return out;
    }

    private int get(int key) {
        Node n = map.get(key);
        if (n == null) return -1;
        unlink(n);
        insertFront(n);
        return n.value;
    }

    private void put(int key, int value) {
        if (capacity == 0) return;
        Node n = map.get(key);
        if (n != null) {
            n.value = value;
            unlink(n);
            insertFront(n);
            return;
        }
        if (map.size() == capacity) {
            Node victim = tail.prev;
            unlink(victim);
            map.remove(victim.key);
        }
        Node fresh = new Node(key, value);
        map.put(key, fresh);
        insertFront(fresh);
    }

    private void unlink(Node n) {
        n.prev.next = n.next;
        n.next.prev = n.prev;
    }

    private void insertFront(Node n) {
        n.next = head.next;
        n.prev = head;
        head.next.prev = n;
        head.next = n;
    }
}
