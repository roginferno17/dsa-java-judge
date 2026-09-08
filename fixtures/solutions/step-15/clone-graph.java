import java.util.*;

class Solution {
    private static class Node {
        int label;
        List<Node> neighbours = new ArrayList<>();
        Node(int label) { this.label = label; }
    }

    public List<List<Integer>> cloneGraph(int n, int[][] edges) {
        List<Node> nodes = new ArrayList<>();
        for (int i = 0; i < n; i++) nodes.add(new Node(i));
        for (int[] e : edges) {
            nodes.get(e[0]).neighbours.add(nodes.get(e[1]));
            nodes.get(e[1]).neighbours.add(nodes.get(e[0]));
        }

        Map<Node, Node> copies = new HashMap<>();
        for (int i = 0; i < n; i++) copy(nodes.get(i), copies);

        List<List<Integer>> out = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            List<Integer> row = new ArrayList<>();
            for (Node nb : copies.get(nodes.get(i)).neighbours) row.add(nb.label);
            Collections.sort(row);
            out.add(row);
        }
        return out;
    }

    private Node copy(Node original, Map<Node, Node> copies) {
        Node existing = copies.get(original);
        if (existing != null) return existing;
        Node fresh = new Node(original.label);
        copies.put(original, fresh);
        for (Node nb : original.neighbours) fresh.neighbours.add(copy(nb, copies));
        return fresh;
    }
}
