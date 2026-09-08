import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] indeg = new int[numCourses];
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);      // [a, b] means b before a
            indeg[p[0]]++;
        }

        Deque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.add(i);
        int done = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            done++;
            for (int v : adj.get(u)) if (--indeg[v] == 0) q.add(v);
        }
        return done == numCourses;
    }
}
