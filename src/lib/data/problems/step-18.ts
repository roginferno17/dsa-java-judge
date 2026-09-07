import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 18 — Advanced Strings (10).
 *
 * One idea runs through most of this step: the LPS array, which records for every
 * prefix the length of its longest proper border — a string that is both a prefix
 * and a suffix of it. Once that array exists, pattern matching becomes linear, and
 * so do four of the problems here that look nothing like matching.
 *
 * Z-values and rolling hashes are the two alternatives, and each is here once so
 * the trade-offs are visible: Z is as fast and often simpler to reason about;
 * hashing is the most flexible and the only one that can be wrong.
 */
export const step18: Record<string, ProblemMetadata> = {
  "kmp-algorithm": {
    slug: "kmp-algorithm",
    title: "KMP — the LPS Array",
    description:
      "Return the LPS array of the string: lps[i] is the length of the longest PROPER prefix of s[0..i] that is also a suffix of it. A proper prefix cannot be the whole string, so lps[0] is always 0.",
    constraints: ["1 ≤ s.length ≤ 10^5", "Lowercase English letters"],
    className: "Solution",
    methodName: "buildLPS",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] buildLPS(String s) {
        // lps[0] is always 0 — a proper prefix cannot be the whole string.
        return new int[s.length()];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "aabaaac" }, expectedOutput: [0, 1, 0, 1, 2, 2, 0], explanation: "At index 4 the prefix \"aa\" is also a suffix of \"aabaa\"." },
      { id: 2, inputs: { s: "abcdabca" }, expectedOutput: [0, 0, 0, 0, 1, 2, 3, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { s: "aaaa" }, expectedOutput: [0, 1, 2, 3], isHidden: true },
      { id: 5, inputs: { s: "abcdef" }, expectedOutput: [0, 0, 0, 0, 0, 0], isHidden: true },
      { id: 6, inputs: { s: "aabaaab" }, expectedOutput: [0, 1, 0, 1, 2, 2, 3], isHidden: true },
      { id: 7, inputs: { s: "ababab" }, expectedOutput: [0, 0, 1, 2, 3, 4], isHidden: true },
    ],
    learn: {
      intuition:
        "When a match fails, restarting from scratch throws away everything already matched. The LPS array says how much of that work survives: if the first k characters matched and then failed, the longest border of those k characters is still matched, so the comparison resumes there.",
      approach: [
        "Keep a length counter for the current border, starting at 0, and scan from index 1.",
        "On a match, extend the border by one and record it.",
        "On a mismatch with a non-zero border, fall back to lps[length - 1] and try again — do not advance the index.",
        "On a mismatch with a zero border, record 0 and advance.",
      ],
      bruteForce: { idea: "For each prefix, test every possible border length.", time: "O(n³)", space: "O(1)" },
      optimal: { idea: "One pass with a falling-back border pointer.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The fallback is lps[length - 1], NOT length - 1 — that single index is what makes the algorithm linear rather than quadratic.",
        "The index must not advance on a fallback, only on a match or on a zero-length mismatch.",
        "'Proper' matters: lps[0] is 0, and \"aaaa\" ends at 3, not 4.",
      ],
      javaToolkit: ["The LPS (failure) array", "Falling back through lps[length - 1]", "Proper versus improper borders"],
    },
  },

  "rabin-karp": {
    slug: "rabin-karp",
    title: "Rabin-Karp Pattern Matching",
    description:
      "Return every starting index at which the pattern occurs in the text, in ascending order. Overlapping occurrences all count. Return an empty list if there are none.",
    constraints: ["1 ≤ text.length ≤ 10^5", "1 ≤ pattern.length ≤ 10^4", "Lowercase English letters"],
    className: "Solution",
    methodName: "findOccurrences",
    parameters: [
      { name: "text", type: "String" },
      { name: "pattern", type: "String" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> findOccurrences(String text, String pattern) {
        // Overlapping occurrences all count.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { text: "abracadabra", pattern: "abra" }, expectedOutput: [0, 7] },
      { id: 2, inputs: { text: "aaaa", pattern: "aa" }, expectedOutput: [0, 1, 2], explanation: "Occurrences may overlap." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { text: "abc", pattern: "d" }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { text: "abc", pattern: "abc" }, expectedOutput: [0], isHidden: true },
      { id: 5, inputs: { text: "ab", pattern: "abc" }, expectedOutput: [], isHidden: true },
      { id: 6, inputs: { text: "mississippi", pattern: "issi" }, expectedOutput: [1, 4], isHidden: true },
      { id: 7, inputs: { text: "aaaaa", pattern: "a" }, expectedOutput: [0, 1, 2, 3, 4], isHidden: true },
    ],
    learn: {
      intuition:
        "Comparing every window character by character is O(n × m). A rolling hash summarises a window in one number that can be updated in O(1) as the window slides — so most windows are rejected by a single integer comparison.",
      approach: [
        "Hash the pattern and the first window.",
        "Slide the window, removing the leading character's contribution and adding the new trailing one.",
        "On a hash match, verify the characters — hashes can collide.",
      ],
      bruteForce: { idea: "Compare the pattern at every position.", time: "O(n × m)", space: "O(1)" },
      optimal: { idea: "Rolling hash with verification, or KMP for a guaranteed bound.", time: "O(n + m) expected", space: "O(1)" },
      pitfalls: [
        "Skipping the verification makes the algorithm WRONG, not merely risky — this is the only technique in the step that can produce a false positive.",
        "Arithmetic must be done modulo a large prime and in long, or the hash overflows.",
        "Overlapping matches must all be reported, which case 2 and case 7 both check.",
      ],
      javaToolkit: ["Rolling hash", "Modular arithmetic in long", "Why verification is mandatory"],
    },
  },

  "z-algorithm": {
    slug: "z-algorithm",
    title: "Z-Algorithm",
    description:
      "Return the Z array: z[i] is the length of the longest substring starting at i that is also a prefix of s. By convention z[0] is the whole string's length.",
    constraints: ["1 ≤ s.length ≤ 10^5", "Lowercase English letters"],
    className: "Solution",
    methodName: "buildZ",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] buildZ(String s) {
        // z[0] is s.length() by convention.
        return new int[s.length()];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "aabxaabxcaabxaabxay" }, expectedOutput: [19, 1, 0, 0, 4, 1, 0, 0, 0, 8, 1, 0, 0, 5, 1, 0, 0, 1, 0] },
      { id: 2, inputs: { s: "aaaa" }, expectedOutput: [4, 3, 2, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { s: "abcdef" }, expectedOutput: [6, 0, 0, 0, 0, 0], isHidden: true },
      { id: 5, inputs: { s: "ababab" }, expectedOutput: [6, 0, 4, 0, 2, 0], isHidden: true },
      { id: 6, inputs: { s: "abab" }, expectedOutput: [4, 0, 2, 0], isHidden: true },
      { id: 7, inputs: { s: "aabaab" }, expectedOutput: [6, 1, 0, 3, 1, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "Keep the rightmost segment already known to match a prefix — the Z-box. Any index inside it can copy its answer from the corresponding position near the front of the string, and only what falls outside the box needs real character comparisons. Each of those extends the box, so the total work is linear.",
      approach: [
        "Maintain a window [left, right] that is known to equal a prefix.",
        "For i inside the window, start from min(z[i - left], right - i + 1).",
        "Extend by direct comparison, then move the window if it grew.",
      ],
      bruteForce: { idea: "Compare from every index against the prefix.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Z-box with copied values.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The copied value must be CAPPED at the distance to the window's right edge; beyond that nothing is known.",
        "z[0] is the whole length by convention here, though some sources leave it 0 — the description fixes it.",
        "Z and LPS carry the same information in different shapes; either can solve most of this step.",
      ],
      javaToolkit: ["The Z-box window", "Capping the copied value", "Z versus LPS"],
    },
  },

  "longest-palindrome-advanced": {
    slug: "longest-palindrome-advanced",
    title: "Longest Palindromic Substring (Advanced)",
    description:
      "Return {start index, length} of the longest palindromic substring. If several tie in length, return the LEFTMOST.",
    constraints: ["1 ≤ s.length ≤ 10^5", "Lowercase English letters"],
    className: "Solution",
    methodName: "longestPalindromeSpan",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] longestPalindromeSpan(String s) {
        // { start, length }, leftmost on a tie.
        return new int[]{ 0, 1 };
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "babad" }, expectedOutput: [0, 3], explanation: "\"bab\" at index 0; \"aba\" ties in length but starts later." },
      { id: 2, inputs: { s: "cbbd" }, expectedOutput: [1, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: [0, 1], isHidden: true },
      { id: 4, inputs: { s: "ac" }, expectedOutput: [0, 1], isHidden: true },
      { id: 5, inputs: { s: "aaaa" }, expectedOutput: [0, 4], isHidden: true },
      { id: 6, inputs: { s: "abacdfgdcaba" }, expectedOutput: [0, 3], isHidden: true },
      { id: 7, inputs: { s: "forgeeksskeegfor" }, expectedOutput: [3, 10], isHidden: true },
    ],
    learn: {
      intuition:
        "Manacher's turns the O(n²) centre expansion into O(n) by the same trick as the Z-algorithm: keep the rightmost palindrome found so far, and let each new centre inherit its mirror's radius before expanding. Inserting separators between characters removes the odd/even split entirely.",
      approach: [
        "Interleave a separator so every palindrome has odd length — \"aba\" becomes \"#a#b#a#\".",
        "Track the rightmost palindrome's centre and right edge.",
        "For each position, seed the radius from its mirror, capped at the right edge, then expand.",
        "Convert the best radius back to a start index and length in the original string.",
      ],
      bruteForce: { idea: "Expand around all 2n - 1 centres.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Manacher's algorithm.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The index conversion back to the original string is where most Manacher implementations go wrong; check it on a two-character input first.",
        "The leftmost tie rule means a strictly greater radius is needed to replace the current best.",
        "Centre expansion is O(n²) and correct; at n = 10^5 that is 10^10 comparisons in the worst case, which is why the linear version is the point here.",
      ],
      javaToolkit: ["Manacher's algorithm", "Separator insertion for odd lengths", "Mirroring under a right boundary"],
    },
  },

  "min-insert-palindrome": {
    slug: "min-insert-palindrome",
    title: "Minimum Characters to Insert at the Front for a Palindrome",
    description:
      "Return the fewest characters that must be added at the FRONT of s to make the whole string a palindrome.",
    constraints: ["1 ≤ s.length ≤ 10^5", "Lowercase English letters"],
    className: "Solution",
    methodName: "minInsertionsAtFront",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int minInsertionsAtFront(String s) {
        // Characters may only be added at the front.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "aacecaaa" }, expectedOutput: 1, explanation: "Prepending one 'a' gives \"aaacecaaa\"." },
      { id: 2, inputs: { s: "abcd" }, expectedOutput: 3, explanation: "Only \"a\" is a palindromic prefix." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { s: "aba" }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { s: "ab" }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { s: "aaaa" }, expectedOutput: 0, isHidden: true },
      { id: 7, inputs: { s: "abcbabcbabcba" }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Whatever is prepended mirrors a suffix, so the part of s that survives untouched is its longest palindromic PREFIX. The answer is everything after it. Finding that prefix is where KMP reappears: build the LPS of s + '#' + reverse(s), and its last value is exactly that length.",
      approach: [
        "Form t = s + separator + reverse(s), using a character that appears in neither.",
        "Build the LPS array of t.",
        "The last LPS value is the longest palindromic prefix of s; the answer is s.length() minus it.",
      ],
      bruteForce: { idea: "Test each prefix, longest first, for being a palindrome.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "LPS of s + separator + reverse(s).", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The separator is essential: without it the border can run past the middle and report a length longer than s itself.",
        "This is the FRONT-only variant. Allowing insertions anywhere is a different problem — that answer is n minus the longest palindromic SUBSEQUENCE.",
        "An already-palindromic string answers 0.",
      ],
      javaToolkit: ["LPS on a concatenation", "The separator trick", "Front-only versus anywhere insertion"],
    },
  },

  "count-and-say": {
    slug: "count-and-say",
    title: "Count and Say",
    description:
      "The sequence starts at \"1\". Each later term reads the previous one aloud: runs of the same digit become the run's length followed by the digit, so \"1211\" reads as \"one 1, one 2, two 1s\" and becomes \"111221\". Return the nth term, counting from 1.",
    constraints: ["1 ≤ n ≤ 30"],
    className: "Solution",
    methodName: "countAndSay",
    parameters: [{ name: "n", type: "int" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String countAndSay(int n) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 1 }, expectedOutput: "1" },
      { id: 2, inputs: { n: 4 }, expectedOutput: "1211", explanation: "1 → 11 → 21 → 1211." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 2 }, expectedOutput: "11", isHidden: true },
      { id: 4, inputs: { n: 3 }, expectedOutput: "21", isHidden: true },
      { id: 5, inputs: { n: 5 }, expectedOutput: "111221", isHidden: true },
      { id: 6, inputs: { n: 6 }, expectedOutput: "312211", isHidden: true },
      { id: 7, inputs: { n: 10 }, expectedOutput: "13211311123113112211", isHidden: true },
    ],
    learn: {
      intuition:
        "Each term is a run-length encoding of the previous one. There is no formula and no shortcut — build the terms one at a time, which is the whole exercise in scanning runs.",
      approach: [
        "Start from \"1\".",
        "Repeat n - 1 times: scan the current string, counting each run of identical characters and appending count then character.",
        "Return the final string.",
      ],
      optimal: { idea: "Iterative run-length encoding.", time: "O(n × length)", space: "O(length)" },
      pitfalls: [
        "The sequence is 1-indexed, so n = 1 is \"1\" and no encoding step happens at all.",
        "The run scan must handle the LAST run after the loop ends, which is the usual off-by-one.",
        "The terms grow by roughly 30% each step; at n = 30 the string is a few thousand characters, so StringBuilder matters.",
      ],
      javaToolkit: ["Run-length encoding", "StringBuilder in a loop", "Handling the final run"],
    },
  },

  "repeated-string-match": {
    slug: "repeated-string-match",
    title: "Repeated String Match",
    description:
      "Return the fewest times a must be repeated so that b is a substring of the result, or -1 if no number of repetitions works.",
    constraints: ["1 ≤ a.length, b.length ≤ 10^4", "Lowercase English letters"],
    className: "Solution",
    methodName: "repeatedStringMatch",
    parameters: [
      { name: "a", type: "String" },
      { name: "b", type: "String" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int repeatedStringMatch(String a, String b) {
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: "abcd", b: "cdabcdab" }, expectedOutput: 3, explanation: "\"abcdabcdabcd\" contains it." },
      { id: 2, inputs: { a: "a", b: "aa" }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: "abc", b: "wxyz" }, expectedOutput: -1, isHidden: true },
      { id: 4, inputs: { a: "a", b: "a" }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { a: "abc", b: "cabcabca" }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { a: "aa", b: "a" }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { a: "abcd", b: "d" }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "b can start at most one full copy of a into the repetition, so the answer is bounded: enough copies to cover b's length, plus at most one more. That makes it a search over exactly two candidates rather than an open-ended loop.",
      approach: [
        "Let k be the smallest number of copies with total length at least b.length().",
        "Test k copies, then k + 1.",
        "Return the first that contains b, otherwise -1.",
      ],
      bruteForce: { idea: "Keep appending copies and testing.", time: "unbounded without a stopping rule", space: "O(n)" },
      optimal: { idea: "Two candidate lengths, checked with any substring search.", time: "O(n + m)", space: "O(n + m)" },
      pitfalls: [
        "Without the bound, a b that never occurs makes the loop run forever — the +1 is exactly what makes -1 provable.",
        "b may be SHORTER than a and still need only one copy, as cases 6 and 7 show.",
        "String.contains is fine here; KMP would make the search linear with no extra allocation.",
      ],
      javaToolkit: ["Bounding a search before running it", "String.repeat", "Why k + 1 is enough"],
    },
  },

  "longest-happy-prefix": {
    slug: "longest-happy-prefix",
    title: "Longest Happy Prefix",
    description:
      "A happy prefix is a non-empty prefix that is also a suffix, but not the whole string. Return the longest one, or \"\" if there is none.",
    constraints: ["1 ≤ s.length ≤ 10^5", "Lowercase English letters"],
    className: "Solution",
    methodName: "longestPrefix",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String longestPrefix(String s) {
        // Not the whole string.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "level" }, expectedOutput: "l" },
      { id: 2, inputs: { s: "ababab" }, expectedOutput: "abab" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "", isHidden: true },
      { id: 4, inputs: { s: "aa" }, expectedOutput: "a", isHidden: true },
      { id: 5, inputs: { s: "abcd" }, expectedOutput: "", isHidden: true },
      { id: 6, inputs: { s: "aaaa" }, expectedOutput: "aaa", isHidden: true },
      { id: 7, inputs: { s: "abcabcabc" }, expectedOutput: "abcabc", isHidden: true },
    ],
    learn: {
      intuition:
        "This is the definition of the LPS array's last entry, stated as a puzzle. Build the array and read lps[n - 1]; no further work is needed.",
      approach: [
        "Build the LPS array of s.",
        "Return the prefix of that length.",
      ],
      bruteForce: { idea: "Test every prefix length against the matching suffix.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "The last entry of the LPS array.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "'Not the whole string' is exactly the PROPER in 'longest proper prefix' — the LPS array already enforces it, so \"aaaa\" gives 3 rather than 4.",
        "A string with no repetition answers with the empty string, not with its first character.",
        "Once you see this is one array lookup, the rest of the step becomes much easier to read.",
      ],
      javaToolkit: ["LPS as a reusable building block", "Proper borders", "Recognising a restated definition"],
    },
  },

  "shortest-palindrome": {
    slug: "shortest-palindrome",
    title: "Shortest Palindrome",
    description:
      "Return the shortest palindrome obtainable by adding characters only at the FRONT of s.",
    constraints: ["0 ≤ s.length ≤ 5 × 10^4", "Lowercase English letters"],
    className: "Solution",
    methodName: "shortestPalindrome",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String shortestPalindrome(String s) {
        return s;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "aacecaaa" }, expectedOutput: "aaacecaaa" },
      { id: 2, inputs: { s: "abcd" }, expectedOutput: "dcbabcd" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "" }, expectedOutput: "", isHidden: true },
      { id: 4, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 5, inputs: { s: "ab" }, expectedOutput: "bab", isHidden: true },
      { id: 6, inputs: { s: "aba" }, expectedOutput: "aba", isHidden: true },
      { id: 7, inputs: { s: "aaaa" }, expectedOutput: "aaaa", isHidden: true },
    ],
    learn: {
      intuition:
        "The previous problem computed HOW MANY characters are needed; this one asks which. They are the reverse of everything after the longest palindromic prefix, prepended in that order.",
      approach: [
        "Find the longest palindromic prefix using the LPS of s + separator + reverse(s).",
        "Take the remainder of s after that prefix, reverse it, and prepend.",
      ],
      bruteForce: { idea: "Test each prefix, longest first, for being a palindrome.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "LPS on the concatenation, then one reversal.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Only the SUFFIX beyond the palindromic prefix is reversed and prepended; reversing the whole string doubles it.",
        "An empty string is already a palindrome and must not crash the LPS build.",
        "The separator is needed for the same reason as in the counting version.",
      ],
      javaToolkit: ["Reusing the palindromic-prefix computation", "StringBuilder.reverse", "Constructing the answer, not just measuring it"],
    },
  },

  "string-rotation-advanced": {
    slug: "string-rotation-advanced",
    title: "Check if a String Is a Rotation of Another",
    description:
      "Return whether goal can be obtained by rotating s — moving some number of leading characters to the end.",
    constraints: ["0 ≤ s.length, goal.length ≤ 100", "Lowercase English letters"],
    className: "Solution",
    methodName: "isRotation",
    parameters: [
      { name: "s", type: "String" },
      { name: "goal", type: "String" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isRotation(String s, String goal) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "abcde", goal: "cdeab" }, expectedOutput: true },
      { id: 2, inputs: { s: "abcde", goal: "abced" }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "", goal: "" }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { s: "a", goal: "a" }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { s: "ab", goal: "abc" }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { s: "aa", goal: "aa" }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { s: "abab", goal: "baba" }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Every rotation of s appears somewhere inside s + s — concatenating the string with itself lays all of them out end to end. So the question is just whether goal is a substring of that doubled string.",
      approach: [
        "Fail immediately if the lengths differ.",
        "Return whether s + s contains goal.",
      ],
      bruteForce: { idea: "Try all n rotations explicitly.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Substring search in s + s.", time: "O(n) with KMP, O(n²) worst case with contains", space: "O(n)" },
      pitfalls: [
        "The length check is not optional: \"ab\" is a substring of \"ababab\" but is not a rotation of \"abab\".",
        "Two empty strings are rotations of each other.",
        "Using KMP for the search makes this linear and is the reason the problem sits in this step rather than in Step 5.",
      ],
      javaToolkit: ["The double-the-string trick", "Length guard before the search", "KMP as the linear search"],
    },
  },
}
