import java.util.*;
class Solution {
    public String frequencySort(String s) {
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray()) freq.merge(c, 1, Integer::sum);
        List<Character> keys = new ArrayList<>(freq.keySet());
        keys.sort((a, b) -> {
            int d = freq.get(b) - freq.get(a);
            return d != 0 ? d : Character.compare(a, b);
        });
        StringBuilder sb = new StringBuilder();
        for (char c : keys) for (int i = 0; i < freq.get(c); i++) sb.append(c);
        return sb.toString();
    }
}
