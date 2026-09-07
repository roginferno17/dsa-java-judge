import java.util.*;

class Solution {
    private int clock = 0;
    private final Map<Integer, List<int[]>> timelines = new HashMap<>();  // user -> [time, tweetId]
    private final Map<Integer, Set<Integer>> follows = new HashMap<>();

    public List<String> run(String[] ops, int[][] args) {
        List<String> out = new ArrayList<>();
        for (int i = 0; i < ops.length; i++) {
            int[] a = args[i];
            switch (ops[i]) {
                case "postTweet":
                    timelines.computeIfAbsent(a[0], k -> new ArrayList<>()).add(new int[]{ clock++, a[1] });
                    out.add("null");
                    break;
                case "follow":
                    follows.computeIfAbsent(a[0], k -> new HashSet<>()).add(a[1]);
                    out.add("null");
                    break;
                case "unfollow": {
                    Set<Integer> s = follows.get(a[0]);
                    if (s != null) s.remove(a[1]);
                    out.add("null");
                    break;
                }
                default:
                    out.add(feed(a[0]));
                    break;
            }
        }
        return out;
    }

    private String feed(int userId) {
        Set<Integer> sources = new HashSet<>();
        sources.add(userId);
        Set<Integer> followed = follows.get(userId);
        if (followed != null) sources.addAll(followed);

        List<int[]> all = new ArrayList<>();
        for (int u : sources) {
            List<int[]> t = timelines.get(u);
            if (t != null) all.addAll(t);
        }
        all.sort((x, y) -> Integer.compare(y[0], x[0]));

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Math.min(10, all.size()); i++) {
            if (i > 0) sb.append(',');
            sb.append(all.get(i)[1]);
        }
        return sb.toString();
    }
}
