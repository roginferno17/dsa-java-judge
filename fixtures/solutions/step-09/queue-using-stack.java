import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        Deque<Integer> in = new ArrayDeque<>();
        Deque<Integer> outStack = new ArrayDeque<>();
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            switch (ops[i]) {
                case "push":
                    in.push(args[i][0]);
                    out.add("null");
                    break;
                case "pop":
                    shift(in, outStack);
                    out.add(String.valueOf(outStack.pop()));
                    break;
                case "peek":
                    shift(in, outStack);
                    out.add(String.valueOf(outStack.peek()));
                    break;
                default:
                    out.add(String.valueOf(in.isEmpty() && outStack.isEmpty()));
                    break;
            }
        }
        return out;
    }

    private void shift(Deque<Integer> in, Deque<Integer> outStack) {
        if (outStack.isEmpty()) {
            while (!in.isEmpty()) outStack.push(in.pop());
        }
    }
}
