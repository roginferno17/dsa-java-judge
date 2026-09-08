import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 16 — String DP and knapsack (13).
 *
 * Two families, one shape. String DP compares two sequences and its state is a
 * pair of indices; knapsack considers items one at a time and its state is
 * (index, remaining capacity). In both, the transition is the same question:
 * take this element or skip it.
 *
 * The knapsack group is worth reading as a single problem in eight costumes.
 * Once subset-sum is written, partition, count-subsets, target-sum and both coin
 * problems are changes to the base case, the combining operator, or a rewriting
 * of the target — never to the structure.
 */
export const step16Strings: Record<string, ProblemMetadata> = {
  "longest-common-subsequence": {
    slug: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    description:
      "Return the length of the longest sequence of characters appearing in both strings in the same order, not necessarily contiguously.",
    constraints: ["0 ≤ length ≤ 1000", "Lowercase English letters"],
    className: "Solution",
    methodName: "longestCommonSubsequence",
    parameters: [
      { name: "a", type: "String" },
      { name: "b", type: "String" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int longestCommonSubsequence(String a, String b) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: "abcde", b: "ace" }, expectedOutput: 3, explanation: "\"ace\" appears in order in both." },
      { id: 2, inputs: { a: "abc", b: "def" }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: "", b: "abc" }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { a: "abc", b: "abc" }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { a: "aaaa", b: "aa" }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { a: "abcba", b: "abcbcba" }, expectedOutput: 5, isHidden: true },
      { id: 7, inputs: { a: "bsbininm", b: "jmjkbkjkv" }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Compare the two last characters. If they match, they can both be used and the problem shrinks by one on each side. If not, one of them must be dropped — and since you cannot tell which, try both and keep the better.",
      approach: [
        "State: lcs(i, j) over the first i characters of a and the first j of b.",
        "Transition: on a match, 1 + lcs(i - 1, j - 1); otherwise max(lcs(i - 1, j), lcs(i, j - 1)).",
        "Base: either index reaching 0 gives 0.",
      ],
      bruteForce: { idea: "Generate every subsequence of one string and test it against the other.", time: "O(2^n × m)", space: "O(n)" },
      optimal: { idea: "2D table over index pairs.", time: "O(n × m)", space: "O(min(n, m)) with one rolling row" },
      pitfalls: [
        "A SUBSEQUENCE need not be contiguous; the contiguous version is the next problem and has a different recurrence.",
        "On a match there is no need to also try the two skip branches — using both matching characters is never worse.",
        "The table is (n + 1) × (m + 1) so that index 0 can mean 'empty prefix'.",
      ],
      javaToolkit: ["2D DP over two sequences", "Match versus skip transitions", "Rolling row to cut the space"],
    },
  },

  "longest-common-substring": {
    slug: "longest-common-substring",
    title: "Longest Common Substring",
    description:
      "Return the length of the longest CONTIGUOUS block of characters appearing in both strings.",
    constraints: ["0 ≤ length ≤ 1000", "Lowercase English letters"],
    className: "Solution",
    methodName: "longestCommonSubstring",
    parameters: [
      { name: "a", type: "String" },
      { name: "b", type: "String" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int longestCommonSubstring(String a, String b) {
        // Contiguous, unlike the subsequence version.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: "abcde", b: "abfce" }, expectedOutput: 2, explanation: "\"ab\" is the longest contiguous match." },
      { id: 2, inputs: { a: "abcdxyz", b: "xyzabcd" }, expectedOutput: 4, explanation: "\"abcd\" appears in both." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: "", b: "abc" }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { a: "abc", b: "def" }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { a: "aaaa", b: "aa" }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { a: "zxabcdezy", b: "yzabcdezx" }, expectedOutput: 6, isHidden: true },
      { id: 7, inputs: { a: "abc", b: "abc" }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Contiguity removes the 'skip one side' option entirely. A mismatch does not shrink the problem — it RESETS the run to zero, so the state has to mean 'longest common suffix ending exactly here', and the answer is the largest value anywhere in the table.",
      approach: [
        "State: run(i, j) is the length of the common suffix ending at a[i-1] and b[j-1].",
        "Transition: 1 + run(i - 1, j - 1) on a match, and 0 on a mismatch.",
        "Track the maximum over the whole table.",
      ],
      bruteForce: { idea: "Compare every pair of starting positions.", time: "O(n × m × min(n, m))", space: "O(1)" },
      optimal: { idea: "2D table of common-suffix runs.", time: "O(n × m)", space: "O(min(n, m))" },
      pitfalls: [
        "The answer is NOT run(n, m) — the best run usually ends in the middle, so the maximum must be tracked separately.",
        "A mismatch sets the cell to 0, not to the maximum of its neighbours; that is the whole difference from the subsequence version.",
        "A suffix automaton or suffix array solves this faster, but the DP is the one to learn first.",
      ],
      javaToolkit: ["Suffix-run DP", "Tracking a running maximum over a table", "Substring versus subsequence"],
    },
  },

  "longest-palindromic-subsequence": {
    slug: "longest-palindromic-subsequence",
    title: "Longest Palindromic Subsequence",
    description: "Return the length of the longest subsequence of s that reads the same forwards and backwards.",
    constraints: ["1 ≤ s.length ≤ 1000", "Lowercase English letters"],
    className: "Solution",
    methodName: "longestPalindromeSubseq",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int longestPalindromeSubseq(String s) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "bbbab" }, expectedOutput: 4, explanation: "\"bbbb\"." },
      { id: 2, inputs: { s: "cbbd" }, expectedOutput: 2, explanation: "\"bb\"." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { s: "abcd" }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { s: "aaaa" }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { s: "agbdba" }, expectedOutput: 5, isHidden: true },
      { id: 7, inputs: { s: "ab" }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "A palindromic subsequence of s is exactly a common subsequence of s and its REVERSE. So this needs no new algorithm at all — reverse the string and run LCS.",
      approach: [
        "Reverse s.",
        "Return the LCS length of s and its reverse.",
        "Alternatively, do interval DP over (left, right) directly.",
      ],
      bruteForce: { idea: "Test every subsequence for being a palindrome.", time: "O(2^n × n)", space: "O(n)" },
      optimal: { idea: "LCS of s with its reverse, or interval DP.", time: "O(n²)", space: "O(n)" },
      pitfalls: [
        "The reduction works because reversing turns 'reads the same backwards' into 'matches the reversed copy'; it does NOT work for the substring version, where a spurious match can span the wrong positions.",
        "Any single character is a palindrome, so the answer is never 0 for a non-empty string.",
        "The interval DP recurrence is dp(l, r) = 2 + dp(l+1, r-1) on a match, else max of dropping either end.",
      ],
      javaToolkit: ["Reduction to LCS", "StringBuilder.reverse", "Interval DP as the alternative"],
    },
  },

  "longest-palindromic-substring-dp": {
    slug: "longest-palindromic-substring-dp",
    title: "Longest Palindromic Substring",
    description:
      "Return the longest CONTIGUOUS palindromic substring of s. If several tie in length, return the leftmost.",
    constraints: ["1 ≤ s.length ≤ 1000", "Letters and digits"],
    className: "Solution",
    methodName: "longestPalindrome",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String longestPalindrome(String s) {
        // Leftmost on a tie.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "babad" }, expectedOutput: "bab", explanation: "\"aba\" is also length 3, but \"bab\" starts earlier." },
      { id: 2, inputs: { s: "cbbd" }, expectedOutput: "bb" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "ac" }, expectedOutput: "a", isHidden: true },
      { id: 5, inputs: { s: "aaaa" }, expectedOutput: "aaaa", isHidden: true },
      { id: 6, inputs: { s: "abacdfgdcaba" }, expectedOutput: "aba", isHidden: true },
      { id: 7, inputs: { s: "forgeeksskeegfor" }, expectedOutput: "geeksskeeg", isHidden: true },
    ],
    learn: {
      intuition:
        "Every palindrome grows outward from a centre, and there are only 2n - 1 centres — n single characters and n - 1 gaps between them. Expanding from each is O(n) and needs no table at all.",
      approach: [
        "For each index, expand outwards for an odd-length palindrome centred there.",
        "Expand again for an even-length one centred between it and the next character.",
        "Keep the longest, and use a strict comparison so the leftmost wins a tie.",
      ],
      bruteForce: { idea: "Test every substring for being a palindrome.", time: "O(n³)", space: "O(1)" },
      optimal: { idea: "Expand around all 2n - 1 centres.", time: "O(n²)", space: "O(1)" },
      pitfalls: [
        "Forgetting the even-length centres misses \"bb\" entirely — case 2 catches it.",
        "The tie rule must be stated or the answer is not unique; here a strictly longer candidate is needed to replace the current best.",
        "The interval DP version is also O(n²) but uses O(n²) space; Manacher's does it in O(n).",
      ],
      javaToolkit: ["Expand around centre", "Odd and even centres", "Strict comparison for leftmost"],
    },
  },

  "edit-distance": {
    slug: "edit-distance",
    title: "Edit Distance",
    description:
      "Return the fewest single-character insertions, deletions or replacements needed to turn a into b.",
    constraints: ["0 ≤ length ≤ 500", "Lowercase English letters"],
    className: "Solution",
    methodName: "minDistance",
    parameters: [
      { name: "a", type: "String" },
      { name: "b", type: "String" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int minDistance(String a, String b) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: "horse", b: "ros" }, expectedOutput: 3, explanation: "Replace h with r, delete r, delete e." },
      { id: 2, inputs: { a: "intention", b: "execution" }, expectedOutput: 5 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: "", b: "" }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { a: "", b: "abc" }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { a: "abc", b: "abc" }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { a: "a", b: "b" }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { a: "sunday", b: "saturday" }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Look at the last character of each string. If they agree, nothing is spent and both shrink. If not, exactly one operation is spent, and the three options — insert, delete, replace — correspond to shrinking b, shrinking a, or shrinking both.",
      approach: [
        "State: dist(i, j) between the first i characters of a and the first j of b.",
        "Transition: on a match, dist(i - 1, j - 1). Otherwise 1 + the minimum of dist(i - 1, j), dist(i, j - 1) and dist(i - 1, j - 1).",
        "Base: dist(i, 0) = i and dist(0, j) = j — everything must be deleted or inserted.",
      ],
      bruteForce: { idea: "Search over all edit sequences.", time: "O(3^n)", space: "O(n)" },
      optimal: { idea: "2D table with a three-way minimum.", time: "O(n × m)", space: "O(min(n, m))" },
      pitfalls: [
        "The base row and column are i and j, not zeros — this is the most common bug in the whole problem.",
        "All three operations cost 1; weighting them differently is a distinct problem with a different recurrence.",
        "Matching characters cost nothing and must not add 1.",
      ],
      javaToolkit: ["Three-way minimum", "Non-zero base row and column", "Levenshtein distance"],
    },
  },

  "subset-sum-target": {
    slug: "subset-sum-target",
    title: "Subset Sum Equal to Target",
    description: "Return whether some subset of the array sums to exactly the target. The empty subset sums to 0.",
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 100", "0 ≤ target ≤ 10^4"],
    className: "Solution",
    methodName: "subsetSum",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean subsetSum(int[] nums, int target) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3, 4], target: 5 }, expectedOutput: true, explanation: "1 + 4, or 2 + 3." },
      { id: 2, inputs: { nums: [2, 4, 6], target: 5 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], target: 0 }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { nums: [0], target: 0 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { nums: [5], target: 5 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3], target: 7 }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { nums: [3, 34, 4, 12, 5, 2], target: 9 }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Every item is either used or not. Track which sums are REACHABLE using the first i items, and each new item extends that set by shifting it up by the item's value.",
      approach: [
        "State: reachable(i, t) — can the first i items make t?",
        "Transition: reachable(i - 1, t) OR reachable(i - 1, t - nums[i]).",
        "Base: reachable(0, 0) is true and reachable(0, t > 0) is false.",
        "One boolean row of size target + 1 suffices if it is filled from HIGH to LOW.",
      ],
      bruteForce: { idea: "Enumerate all 2^n subsets.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Boolean DP over reachable sums.", time: "O(n × target)", space: "O(target)" },
      pitfalls: [
        "With one rolling row, iterating the sum upward lets the same item be used twice — go downward.",
        "A target of 0 is always achievable by the empty subset.",
        "This is pseudo-polynomial: it scales with the target's VALUE, not its number of digits.",
      ],
      javaToolkit: ["Boolean reachability DP", "Downward iteration on a rolling row", "Pseudo-polynomial complexity"],
    },
  },

  "partition-equal-subset": {
    slug: "partition-equal-subset",
    title: "Partition Equal Subset Sum",
    description: "Return whether the array can be split into two groups with equal sums.",
    constraints: ["1 ≤ nums.length ≤ 200", "1 ≤ nums[i] ≤ 100"],
    className: "Solution",
    methodName: "canPartition",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean canPartition(int[] nums) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 5, 11, 5] }, expectedOutput: true, explanation: "[1,5,5] and [11]." },
      { id: 2, inputs: { nums: [1, 2, 3, 5] }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 1] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { nums: [1] }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { nums: [2, 2, 3, 5] }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { nums: [3, 3, 3, 4, 5] }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { nums: [100, 100] }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Two equal halves means each is half the total, so the question reduces to: is there a subset summing to total / 2? An odd total answers itself immediately.",
      approach: [
        "Sum the array; return false if the total is odd.",
        "Run subset-sum for total / 2.",
      ],
      bruteForce: { idea: "Enumerate every split.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Subset-sum on half the total.", time: "O(n × total)", space: "O(total)" },
      pitfalls: [
        "The odd-total check is not merely an optimisation — without it, total / 2 truncates and the DP answers a different question.",
        "A single element can never be split, whatever its value.",
        "Both halves must be non-empty in spirit, but the sum condition already guarantees that for positive values.",
      ],
      javaToolkit: ["Reduction to subset-sum", "The parity shortcut", "Integer division hazards"],
    },
  },

  "partition-given-difference": {
    slug: "partition-given-difference",
    title: "Partition With a Given Difference",
    description:
      "Count the ways to split the array into two groups whose sums differ by exactly d, with the first group's sum at least the second's. Every element goes into exactly one group; groups may be empty. Return the count modulo 1_000_000_007.",
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 100", "0 ≤ d ≤ 10^4"],
    className: "Solution",
    methodName: "countPartitions",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "d", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countPartitions(int[] nums, int d) {
        // Answer modulo 1000000007.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [5, 2, 6, 4], d: 3 }, expectedOutput: 1, explanation: "[5,4] against [2,6] — sums 9 and 8." },
      { id: 2, inputs: { nums: [1, 1, 1, 1], d: 0 }, expectedOutput: 6 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], d: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1], d: 0 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [0, 0, 1], d: 1 }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3, 4], d: 10 }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { nums: [1, 2, 3, 4], d: 11 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Let the larger group sum to S1 and the other to S2. Then S1 + S2 is the total and S1 - S2 is d, so S2 = (total - d) / 2. The whole problem collapses to counting subsets with that fixed sum.",
      approach: [
        "Compute the total. If total - d is negative or odd, no split exists.",
        "Count subsets summing to (total - d) / 2.",
        "Accumulate modulo the prime.",
      ],
      bruteForce: { idea: "Try all 2^n assignments.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Count-subsets DP on the derived target.", time: "O(n × total)", space: "O(total)" },
      pitfalls: [
        "Zeros double the count, because each can go on either side without changing any sum — case 5 gives 4, not 1. The DP handles this only if the base case counts the empty subset once and zeros are treated as ordinary items.",
        "An odd total - d has no solution at all.",
        "The counting DP starts from dp[0] = 1, unlike the boolean version.",
      ],
      javaToolkit: ["Algebraic target rewriting", "Counting rather than deciding", "Why zeros multiply the count"],
    },
  },

  "count-subsets-sum-k": {
    slug: "count-subsets-sum-k",
    title: "Count Subsets With Sum K",
    description:
      "Return how many subsets sum to exactly k, modulo 1_000_000_007. Subsets are distinguished by which POSITIONS they use, so equal values at different positions count separately.",
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 100", "0 ≤ k ≤ 10^4"],
    className: "Solution",
    methodName: "countSubsets",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countSubsets(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 2, 3], k: 3 }, expectedOutput: 3, explanation: "{3}, {1,2} using either 2." },
      { id: 2, inputs: { nums: [1, 2, 3], k: 7 }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 0 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [0], k: 0 }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { nums: [0, 0, 1], k: 1 }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { nums: [2, 3, 5, 6, 8, 10], k: 10 }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { nums: [1, 1, 1, 1], k: 2 }, expectedOutput: 6, isHidden: true },
    ],
    learn: {
      intuition:
        "The same take-or-skip walk as subset-sum, but ADDING the two branches instead of ORing them. Decision becomes counting by changing one operator.",
      approach: [
        "State: count(i, t) — subsets of the first i items summing to t.",
        "Transition: count(i - 1, t) + count(i - 1, t - nums[i]).",
        "Base: count(0, 0) = 1.",
        "Reduce modulo the prime at every addition.",
      ],
      bruteForce: { idea: "Enumerate all subsets.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Counting DP over sums.", time: "O(n × k)", space: "O(k)" },
      pitfalls: [
        "An element equal to 0 doubles every count, since including or excluding it changes nothing — case 4 answers 2 for a single zero.",
        "The base is count(0, 0) = 1, not 0; the empty subset is a real subset.",
        "The rolling row must be filled downward, exactly as in subset-sum.",
      ],
      javaToolkit: ["OR becoming +", "Modular accumulation", "Zeros as a doubling factor"],
    },
  },

  "knapsack-01": {
    slug: "knapsack-01",
    title: "0/1 Knapsack",
    description:
      "Each item may be taken at most once. Return the greatest total value fitting within the capacity.",
    constraints: ["1 ≤ n ≤ 1000", "1 ≤ capacity ≤ 1000", "0 ≤ weight, value ≤ 1000"],
    className: "Solution",
    methodName: "knapsack",
    parameters: [
      { name: "weights", type: "int[]" },
      { name: "values", type: "int[]" },
      { name: "capacity", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int knapsack(int[] weights, int[] values, int capacity) {
        // Each item at most once.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { weights: [1, 2, 4, 5], values: [5, 4, 8, 6], capacity: 5 }, expectedOutput: 13, explanation: "Items of weight 1 and 4." },
      { id: 2, inputs: { weights: [3], values: [10], capacity: 2 }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { weights: [1], values: [7], capacity: 1 }, expectedOutput: 7, isHidden: true },
      { id: 4, inputs: { weights: [1, 1, 1], values: [1, 2, 3], capacity: 2 }, expectedOutput: 5, isHidden: true },
      { id: 5, inputs: { weights: [10, 20, 30], values: [60, 100, 120], capacity: 50 }, expectedOutput: 220, isHidden: true },
      { id: 6, inputs: { weights: [2, 2, 2], values: [5, 5, 5], capacity: 1 }, expectedOutput: 0, isHidden: true },
      { id: 7, inputs: { weights: [1, 3, 4, 5], values: [1, 4, 5, 7], capacity: 7 }, expectedOutput: 9, isHidden: true },
    ],
    learn: {
      intuition:
        "The archetype the whole group is built on. Each item is taken or skipped, and taking it costs capacity — so the state is (items considered, capacity left) and the answer is the better of the two branches.",
      approach: [
        "State: best(i, c) using the first i items with capacity c.",
        "Transition: max(best(i - 1, c), values[i] + best(i - 1, c - weights[i])) when the item fits.",
        "Base: no items gives 0.",
        "A single rolling row filled downward removes the item dimension.",
      ],
      bruteForce: { idea: "Try all 2^n subsets.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "DP over (item, remaining capacity).", time: "O(n × capacity)", space: "O(capacity)" },
      pitfalls: [
        "Sorting by value-per-weight and filling greedily is optimal only when items can be SPLIT — that is Step 12's fractional knapsack, and it gives the wrong answer here.",
        "Iterating capacity upward on a rolling row turns this into unbounded knapsack, where items can repeat.",
        "The item must be checked to fit before the take branch is considered.",
      ],
      javaToolkit: ["The knapsack state", "Downward capacity iteration for 0/1", "0/1 versus fractional versus unbounded"],
    },
  },

  "coin-change": {
    slug: "coin-change",
    title: "Coin Change",
    description:
      "Coins are available in unlimited quantity. Return the fewest coins summing to the amount, or -1 if it cannot be made.",
    constraints: ["1 ≤ coins.length ≤ 12", "1 ≤ coins[i] ≤ 2^31 - 1", "0 ≤ amount ≤ 10^4"],
    className: "Solution",
    methodName: "coinChange",
    parameters: [
      { name: "coins", type: "int[]" },
      { name: "amount", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // -1 when the amount cannot be made.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { coins: [1, 2, 5], amount: 11 }, expectedOutput: 3, explanation: "5 + 5 + 1." },
      { id: 2, inputs: { coins: [2], amount: 3 }, expectedOutput: -1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { coins: [1], amount: 0 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { coins: [1, 3, 4], amount: 6 }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { coins: [2, 5, 10, 1], amount: 27 }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { coins: [186, 419, 83, 408], amount: 6249 }, expectedOutput: 20, isHidden: true },
      { id: 7, inputs: { coins: [2147483647], amount: 2 }, expectedOutput: -1, isHidden: true },
    ],
    learn: {
      intuition:
        "Unlimited coins means an item can be reused, so unlike 0/1 knapsack the state after taking a coin still allows that same coin. The recurrence looks at every coin as a possible LAST coin and takes the best.",
      approach: [
        "State: fewest(t) coins to make t.",
        "Transition: fewest(t) = 1 + min over coins c ≤ t of fewest(t - c).",
        "Base: fewest(0) = 0; everything else starts unreachable.",
      ],
      bruteForce: { idea: "Search over every multiset of coins.", time: "exponential", space: "O(amount)" },
      optimal: { idea: "Bottom-up over amounts, reusing coins freely.", time: "O(amount × coins)", space: "O(amount)" },
      pitfalls: [
        "Greedy largest-first is WRONG for arbitrary coin systems: with {1,3,4} and amount 6 it takes 4+1+1 = 3 coins when 3+3 = 2 is better. Step 12's greedy version only worked because the system was canonical.",
        "The unreachable sentinel must not be added to blindly — guard it or use amount + 1 as a safe infinity.",
        "A coin larger than the amount is skipped, and a coin at Integer.MAX_VALUE would overflow if added to a running total.",
      ],
      javaToolkit: ["Unbounded item reuse", "A safe infinity sentinel", "Why greedy needs a canonical system"],
    },
  },

  "target-sum": {
    slug: "target-sum",
    title: "Target Sum",
    description:
      "Put a + or a - in front of every element and concatenate. Return how many of the 2^n sign assignments evaluate to the target.",
    constraints: ["1 ≤ nums.length ≤ 20", "0 ≤ nums[i] ≤ 1000", "-1000 ≤ target ≤ 1000"],
    className: "Solution",
    methodName: "findTargetSumWays",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 1, 1, 1, 1], target: 3 }, expectedOutput: 5 },
      { id: 2, inputs: { nums: [1], target: 1 }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], target: 2 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [0], target: 0 }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { nums: [1, 0], target: 1 }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3, 4, 5], target: 3 }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { nums: [100], target: -100 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Split the elements into a positive group P and a negative group N. Then P - N is the target and P + N is the total, so P = (total + target) / 2 — and the problem becomes counting subsets with that sum.",
      approach: [
        "Compute the total; return 0 if total + target is negative or odd, or if the target exceeds the total in magnitude.",
        "Count subsets summing to (total + target) / 2.",
      ],
      bruteForce: { idea: "Try all 2^n sign assignments.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Algebraic rewrite into count-subsets.", time: "O(n × total)", space: "O(total)" },
      pitfalls: [
        "A negative target is legitimate; only the DERIVED sum must be non-negative, so check total + target rather than target alone.",
        "Zeros double the count for the same reason as in the partition problem, which cases 4 and 5 exercise.",
        "At n = 20 the brute force is only a million assignments and would pass, but the rewrite is the point.",
      ],
      javaToolkit: ["Sign assignment as a partition", "The (total + target) / 2 rewrite", "Guarding the derived target"],
    },
  },

  "coin-change-2": {
    slug: "coin-change-2",
    title: "Coin Change II",
    description:
      "Coins are available in unlimited quantity. Return how many distinct COMBINATIONS sum to the amount — order does not matter, so 1+2 and 2+1 are the same combination.",
    constraints: ["1 ≤ coins.length ≤ 300", "1 ≤ coins[i] ≤ 5000", "0 ≤ amount ≤ 5000", "Coin values are distinct"],
    className: "Solution",
    methodName: "change",
    parameters: [
      { name: "coins", type: "int[]" },
      { name: "amount", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int change(int[] coins, int amount) {
        // Combinations, not permutations.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { coins: [1, 2, 5], amount: 5 }, expectedOutput: 4, explanation: "5; 2+2+1; 2+1+1+1; 1×5." },
      { id: 2, inputs: { coins: [2], amount: 3 }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { coins: [1], amount: 0 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { coins: [10], amount: 10 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { coins: [1, 2], amount: 4 }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { coins: [3, 5, 7, 8, 9, 10, 11], amount: 500 }, expectedOutput: 35502874, isHidden: true },
      { id: 7, inputs: { coins: [2, 5], amount: 11 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "The loop ORDER decides whether you count combinations or permutations. Putting the COIN loop on the outside means every combination is built in one fixed coin order, so it is counted once. Putting the amount loop outside would count each ordering separately.",
      approach: [
        "One array of counts over amounts, starting with ways(0) = 1.",
        "For each coin, sweep amounts upward adding ways(t - coin) to ways(t).",
        "The upward sweep is what allows a coin to be reused.",
      ],
      bruteForce: { idea: "Enumerate every multiset of coins.", time: "exponential", space: "O(amount)" },
      optimal: { idea: "Counting DP with the coin loop outermost.", time: "O(coins × amount)", space: "O(amount)" },
      pitfalls: [
        "Swapping the two loops silently answers a different question — it counts ordered sequences, which for [1,2] and amount 4 gives 5 rather than 3.",
        "ways(0) = 1 seeds the whole table; starting at 0 makes every answer 0.",
        "The sweep is UPWARD here, the opposite of 0/1 knapsack, precisely because reuse is wanted.",
      ],
      javaToolkit: ["Loop order deciding combinations versus permutations", "Upward sweep for unbounded reuse", "Seeding ways(0) = 1"],
    },
  },
}
