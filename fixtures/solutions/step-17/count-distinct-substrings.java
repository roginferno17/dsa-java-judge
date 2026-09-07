class Solution {
    private static class Node {
        Node[] next = new Node[26];
    }

    public int countDistinctSubstrings(String s) {
        Node root = new Node();
        int created = 0;
        for (int i = 0; i < s.length(); i++) {
            Node cur = root;
            for (int j = i; j < s.length(); j++) {
                int k = s.charAt(j) - 'a';
                if (cur.next[k] == null) {
                    cur.next[k] = new Node();
                    created++;
                }
                cur = cur.next[k];
            }
        }
        return created;
    }
}
