import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        Queue<Integer> q = new LinkedList<>();
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "push": {
                    q.offer(args[i][0]);
                    for (int k = q.size() - 1; k > 0; k--) q.offer(q.poll());
                    out.add("null");
                    break;
                }
                case "pop":
                    out.add(String.valueOf(q.poll()));
                    break;
                case "top":
                    out.add(String.valueOf(q.peek()));
                    break;
                default:
                    out.add(String.valueOf(q.isEmpty()));
                    break;
            }
        }
        return out;
    }
}
