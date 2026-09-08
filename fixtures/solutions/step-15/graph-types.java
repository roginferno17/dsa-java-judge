class Solution {
    public int[] degrees(int n, int[][] edges) {
        int[] deg = new int[n];
        for (int[] e : edges) {
            deg[e[0]]++;
            deg[e[1]]++;      // a self-loop lands on the same vertex twice
        }
        return deg;
    }
}
