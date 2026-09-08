import java.util.*;

class Solution {
    private final Map<Integer, Integer> values = new HashMap<>();
    private final Map<Integer, Integer> counts = new HashMap<>();
    private final Map<Integer, LinkedHashSet<Integer>> buckets = new HashMap<>();
    private int capacity;
    private int minCount = 0;

    public List<String> run(int capacity, String[] ops, int[][] args) {
        this.capacity = capacity;
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            if (ops[i].equals("get")) {
                out.add(String.valueOf(get(args[i][0])));
            } else {
                put(args[i][0], args[i][1]);
                out.add("null");
            }
        }
        return out;
    }

    private int get(int key) {
        if (!values.containsKey(key)) return -1;
        touch(key);
        return values.get(key);
    }

    private void put(int key, int value) {
        if (capacity == 0) return;
        if (values.containsKey(key)) {
            values.put(key, value);
            touch(key);
            return;
        }
        if (values.size() == capacity) {
            LinkedHashSet<Integer> bucket = buckets.get(minCount);
            int victim = bucket.iterator().next();
            bucket.remove(victim);
            values.remove(victim);
            counts.remove(victim);
        }
        values.put(key, value);
        counts.put(key, 1);
        buckets.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(key);
        minCount = 1;
    }

    /** Move a key from its count bucket to the next one, keeping recency order. */
    private void touch(int key) {
        int c = counts.get(key);
        LinkedHashSet<Integer> bucket = buckets.get(c);
        bucket.remove(key);
        if (bucket.isEmpty() && minCount == c) minCount = c + 1;
        counts.put(key, c + 1);
        buckets.computeIfAbsent(c + 1, k -> new LinkedHashSet<>()).add(key);
    }
}
