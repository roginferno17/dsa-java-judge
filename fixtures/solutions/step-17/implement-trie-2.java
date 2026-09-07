import java.util.*;

class Solution {
    private static class Node {
        Node[] next = new Node[26];
        int endCount;
        int passCount;
    }

    private final Node root = new Node();

    public List<String> run(String[] ops, String[] args) {
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "insert":
                    insert(args[i]);
                    out.add("null");
                    break;
                case "erase":
                    erase(args[i]);
                    out.add("null");
                    break;
                case "countWordsEqualTo": {
                    Node n = walk(args[i]);
                    out.add(String.valueOf(n == null ? 0 : n.endCount));
                    break;
                }
                default: {
                    Node n = walk(args[i]);
                    out.add(String.valueOf(n == null ? 0 : n.passCount));
                    break;
                }
            }
        }
        return out;
    }

    private void insert(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            int k = c - 'a';
            if (cur.next[k] == null) cur.next[k] = new Node();
            cur = cur.next[k];
            cur.passCount++;
        }
        cur.endCount++;
    }

    private void erase(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            cur = cur.next[c - 'a'];
            if (cur == null) return;
            cur.passCount--;
        }
        cur.endCount--;
    }

    private Node walk(String s) {
        Node cur = root;
        for (char c : s.toCharArray()) {
            cur = cur.next[c - 'a'];
            if (cur == null) return null;
        }
        return cur;
    }
}
