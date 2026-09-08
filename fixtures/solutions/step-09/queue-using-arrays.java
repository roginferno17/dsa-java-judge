import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        int cap = ops.length + 1;
        int[] data = new int[cap];
        int front = 0, count = 0;
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "push":
                    data[(front + count) % cap] = args[i][0];
                    count++;
                    out.add("null");
                    break;
                case "pop":
                    if (count == 0) {
                        out.add("-1");
                    } else {
                        out.add(String.valueOf(data[front]));
                        front = (front + 1) % cap;
                        count--;
                    }
                    break;
                case "peek":
                    out.add(count == 0 ? "-1" : String.valueOf(data[front]));
                    break;
                default:
                    out.add(String.valueOf(count));
                    break;
            }
        }
        return out;
    }
}
