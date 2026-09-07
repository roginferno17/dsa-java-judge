import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "offer":
                    pq.offer(args[i][0]);
                    out.add("null");
                    break;
                case "poll":
                    out.add(pq.isEmpty() ? "-1" : String.valueOf(pq.poll()));
                    break;
                case "peek":
                    out.add(pq.isEmpty() ? "-1" : String.valueOf(pq.peek()));
                    break;
                default:
                    out.add(String.valueOf(pq.size()));
                    break;
            }
        }
        return out;
    }
}
