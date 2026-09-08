import java.util.*;

class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] seen = new boolean[n];
        int provinces = 0;
        for (int i = 0; i < n; i++) {
            if (seen[i]) continue;
            provinces++;
            Deque<Integer> st = new ArrayDeque<>();
            st.push(i);
            seen[i] = true;
            while (!st.isEmpty()) {
                int u = st.pop();
                for (int v = 0; v < n; v++) {
                    if (isConnected[u][v] == 1 && !seen[v]) { seen[v] = true; st.push(v); }
                }
            }
        }
        return provinces;
    }
}
