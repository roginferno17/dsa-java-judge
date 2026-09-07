import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, String[] wordList) {
        Set<String> words = new HashSet<>(Arrays.asList(wordList));
        if (!words.contains(endWord)) return 0;
        words.remove(beginWord);

        List<String> level = new ArrayList<>();
        level.add(beginWord);
        int steps = 1;
        while (!level.isEmpty()) {
            if (level.contains(endWord)) return steps;
            List<String> next = new ArrayList<>();
            for (String word : level) {
                char[] chars = word.toCharArray();
                for (int i = 0; i < chars.length; i++) {
                    char original = chars[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        chars[i] = c;
                        String candidate = new String(chars);
                        if (words.remove(candidate)) next.add(candidate);
                    }
                    chars[i] = original;
                }
            }
            level = next;
            steps++;
        }
        return 0;
    }
}
