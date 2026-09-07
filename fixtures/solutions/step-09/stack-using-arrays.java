import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        int[] data = new int[ops.length + 1];
        int top = -1;
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "push":
                    data[++top] = args[i][0];
                    out.add("null");
                    break;
                case "pop":
                    out.add(top < 0 ? "-1" : String.valueOf(data[top--]));
                    break;
                case "top":
                    out.add(top < 0 ? "-1" : String.valueOf(data[top]));
                    break;
                default:
                    out.add(String.valueOf(top + 1));
                    break;
            }
        }
        return out;
    }
}
