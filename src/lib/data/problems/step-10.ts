import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 10 — Sliding Window and Two Pointer (12).
 *
 * The recurring shape: two indices moving only forward, a running summary of what
 * sits between them, and a rule for when the window must shrink. Because neither
 * pointer ever goes backwards, an apparently nested loop is really O(n).
 *
 * Two variants are worth naming, because most of these are one or the other:
 *   - Longest valid window — grow, then shrink only while invalid.
 *   - Count of subarrays with EXACTLY k — count(at most k) minus count(at most k-1),
 *     since "exactly" is not itself monotonic and cannot be windowed directly.
 */
export const step10: Record<string, ProblemMetadata> = {
  "longest-substring-no-repeat": {
    slug: "longest-substring-no-repeat",
    title: "Longest Substring Without Repeating Characters",
    description: "Return the length of the longest substring containing no repeated character.",
    constraints: ["0 ≤ s.length ≤ 5 × 10^4", "s contains printable ASCII characters"],
    className: "Solution",
    methodName: "lengthOfLongestSubstring",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "abcabcbb" }, expectedOutput: 3, explanation: "\"abc\" is the longest run with no repeat." },
      { id: 2, inputs: { s: "bbbbb" }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "" }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { s: "pwwkew" }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { s: "abba" }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { s: " " }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { s: "dvdf" }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Extend the window rightwards while every character inside is distinct. On a repeat, the left edge must move past the previous occurrence of that character — and only forwards, never back.",
      approach: [
        "Keep a map from character to its last index.",
        "For each right index, if the character was seen at or after the left edge, move left to just after that occurrence.",
        "Record the last index and update the best length.",
      ],
      bruteForce: { idea: "Check every substring for duplicates.", time: "O(n³)", space: "O(n)" },
      optimal: { idea: "Sliding window with last-seen indices.", time: "O(n)", space: "O(min(n, alphabet))" },
      pitfalls: [
        "Jumping the left edge to a stale index moves it BACKWARDS — \"abba\" and \"dvdf\" both break unless you take the maximum with the current left. This is the single most common bug here.",
        "The last-seen index must be updated on every character, not only on a repeat.",
        "An empty string is 0, and a single space is 1.",
      ],
      javaToolkit: ["HashMap<Character, Integer> or an int[128]", "Math.max to keep left monotonic", "Window length as right - left + 1"],
    },
  },

  "max-consecutive-ones-3": {
    slug: "max-consecutive-ones-3",
    title: "Max Consecutive Ones III",
    description:
      "Given a binary array, return the length of the longest run of 1s obtainable by flipping at most k zeros to 1.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums[i] is 0 or 1", "0 ≤ k ≤ nums.length"],
    className: "Solution",
    methodName: "longestOnes",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int longestOnes(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k: 2 }, expectedOutput: 6, explanation: "Flipping the two zeros at indices 4 and 5 joins a run of six." },
      { id: 2, inputs: { nums: [0, 0, 0], k: 0 }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 0 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [0], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [1, 1, 1], k: 5 }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k: 3 }, expectedOutput: 10, isHidden: true },
      { id: 7, inputs: { nums: [0, 0, 0, 0], k: 4 }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "Rewrite the question as: the longest window containing at most k zeros. Every such window can be turned into all 1s, so the flip budget is really just a cap on one counter.",
      approach: [
        "Extend right, incrementing a zero counter when nums[right] is 0.",
        "While the counter exceeds k, advance left, decrementing when it leaves a 0 behind.",
        "The best window length seen is the answer.",
      ],
      bruteForce: { idea: "Count zeros in every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Sliding window with a zero counter.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Shrinking to exactly k zeros is unnecessary — shrink only while the count EXCEEDS k.",
        "k = 0 reduces to the longest existing run of 1s.",
        "k larger than the array is fine: the whole array qualifies.",
      ],
      javaToolkit: ["Two-pointer window", "A single violation counter", "Reframing a constraint as a cap"],
    },
  },

  "fruit-into-baskets": {
    slug: "fruit-into-baskets",
    title: "Fruit Into Baskets",
    description:
      "You walk along a row of trees picking one fruit from each, and you carry two baskets that each hold a single type. Return the maximum number of fruits collectable — the length of the longest contiguous run containing at most two distinct values.",
    constraints: ["1 ≤ fruits.length ≤ 10^5", "0 ≤ fruits[i] ≤ 10^9"],
    className: "Solution",
    methodName: "totalFruit",
    parameters: [{ name: "fruits", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int totalFruit(int[] fruits) {
        // At most two distinct values in the window.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { fruits: [1, 2, 1] }, expectedOutput: 3, explanation: "Only two types appear, so the whole row fits." },
      { id: 2, inputs: { fruits: [1, 2, 3, 2, 2] }, expectedOutput: 4, explanation: "The run [2,3,2,2] uses just two types." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { fruits: [5] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { fruits: [1, 2, 3, 4, 5] }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { fruits: [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4] }, expectedOutput: 5, isHidden: true },
      { id: 6, inputs: { fruits: [7, 7, 7, 7] }, expectedOutput: 4, isHidden: true },
      { id: 7, inputs: { fruits: [0, 1, 2, 2] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Strip the story away and it is 'longest subarray with at most 2 distinct values' — the k-distinct problem with k pinned to 2. A count map tells you how many distinct types the window holds.",
      approach: [
        "Extend right, incrementing that fruit's count in a map.",
        "While the map holds more than 2 keys, advance left and decrement, removing keys that reach 0.",
        "Track the best window length.",
      ],
      bruteForce: { idea: "Count distinct values in every subarray.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Sliding window with a count map.", time: "O(n)", space: "O(1) — at most 3 keys" },
      pitfalls: [
        "A key whose count reaches 0 must be REMOVED, or map.size() overstates the distinct count and the window never shrinks enough.",
        "Values go up to 10^9, so an array indexed by value is out; use a HashMap.",
        "Fruit values can be 0 — a fine key, but a poor 'unset' sentinel.",
      ],
      javaToolkit: ["HashMap<Integer, Integer> counts", "map.size() as the distinct count", "Removing zero-count keys"],
    },
  },

  "longest-repeating-replacement": {
    slug: "longest-repeating-replacement",
    title: "Longest Repeating Character Replacement",
    description:
      "You may change at most k characters of the string to any uppercase letter. Return the length of the longest substring that can be made of a single repeated character.",
    constraints: ["1 ≤ s.length ≤ 10^5", "s contains only uppercase English letters", "0 ≤ k ≤ s.length"],
    className: "Solution",
    methodName: "characterReplacement",
    parameters: [
      { name: "s", type: "String" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int characterReplacement(String s, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "ABAB", k: 2 }, expectedOutput: 4, explanation: "Change both As to B, or both Bs to A." },
      { id: 2, inputs: { s: "AABABBA", k: 1 }, expectedOutput: 4, explanation: "\"AABA\" becomes \"AAAA\" with one change." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "A", k: 0 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { s: "AAAA", k: 2 }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { s: "ABCDE", k: 1 }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { s: "ABBB", k: 2 }, expectedOutput: 4, isHidden: true },
      { id: 7, inputs: { s: "AABCDEF", k: 0 }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "A window is achievable when everything except its most common letter can be rewritten within budget: windowLength - maxCount ≤ k. Keep a count per letter and check that one condition.",
      approach: [
        "Extend right, incrementing that letter's count and tracking the highest count seen.",
        "If windowLength - maxCount exceeds k, advance left once, decrementing.",
        "The best window length is the answer.",
      ],
      bruteForce: { idea: "For every substring, count letters and check the budget.", time: "O(n² × 26)", space: "O(26)" },
      optimal: { idea: "Sliding window on windowLength - maxCount ≤ k.", time: "O(n)", space: "O(26)" },
      pitfalls: [
        "The usual solution never decreases maxCount, which looks wrong but is not: a stale maxCount can only keep the window from shrinking, and the window never grows past the true best.",
        "Recomputing maxCount by scanning all 26 counters each step is also correct, just slower.",
        "The count array must be updated when the left edge moves, even if maxCount is not.",
      ],
      javaToolkit: ["int[26] counts", "windowLength - maxCount ≤ k", "Why a stale maximum is safe"],
    },
  },

  "binary-subarray-sum": {
    slug: "binary-subarray-sum",
    title: "Binary Subarray With Sum",
    description: "Given a binary array, return how many contiguous subarrays sum to exactly goal.",
    constraints: ["1 ≤ nums.length ≤ 3 × 10^4", "nums[i] is 0 or 1", "0 ≤ goal ≤ nums.length"],
    className: "Solution",
    methodName: "numSubarraysWithSum",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "goal", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 0, 1, 0, 1], goal: 2 }, expectedOutput: 4, explanation: "Four windows sum to 2, several sharing the same ones with different zeros attached." },
      { id: 2, inputs: { nums: [0, 0, 0, 0, 0], goal: 0 }, expectedOutput: 15, explanation: "Every one of the 15 subarrays sums to 0." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], goal: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1], goal: 0 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [1, 1, 1], goal: 3 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [0, 1, 0, 0, 1, 0], goal: 1 }, expectedOutput: 12, isHidden: true },
      { id: 7, inputs: { nums: [1, 0, 1], goal: 0 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "A plain window cannot handle 'exactly': adding a 0 leaves the sum unchanged, so there is no clean shrink rule. The fix is subtraction — the count of subarrays summing to AT MOST goal, minus at most goal - 1, leaves exactly goal.",
      approach: [
        "Write a helper counting subarrays with sum ≤ limit, using a window that shrinks while the sum exceeds the limit and adds (right - left + 1) each step.",
        "Return atMost(goal) - atMost(goal - 1).",
        "Guard limit < 0 by returning 0.",
      ],
      bruteForce: { idea: "Sum every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "atMost(goal) - atMost(goal - 1), or prefix sums in a HashMap.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "atMost(-1) must be 0, not a loop that misbehaves — goal = 0 hits this immediately.",
        "Adding (right - left + 1) counts every subarray ENDING at right, which is what makes the helper work.",
        "The zeros are the difficulty: [0,0,0,0,0] with goal 0 gives 15, not 5.",
      ],
      javaToolkit: ["The atMost trick", "Counting subarrays ending at each index", "Prefix sums with a HashMap as the alternative"],
    },
  },

  "count-nice-subarrays": {
    slug: "count-nice-subarrays",
    title: "Count Number of Nice Subarrays",
    description: "A subarray is nice when it contains exactly k odd numbers. Return how many nice subarrays there are.",
    constraints: ["1 ≤ nums.length ≤ 5 × 10^4", "1 ≤ nums[i] ≤ 10^5", "1 ≤ k ≤ nums.length"],
    className: "Solution",
    methodName: "numberOfSubarrays",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 1, 2, 1, 1], k: 3 }, expectedOutput: 2, explanation: "[1,1,2,1] and [1,2,1,1] each hold three odd numbers." },
      { id: 2, inputs: { nums: [2, 4, 6], k: 1 }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [2, 2, 2, 1, 2, 2, 1, 2, 2, 2], k: 2 }, expectedOutput: 16, isHidden: true },
      { id: 5, inputs: { nums: [1, 1, 1], k: 1 }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { nums: [1, 1, 1], k: 3 }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { nums: [2, 2, 2], k: 1 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Replace each number by its parity and this becomes the previous problem exactly: count subarrays whose sum of 1s is k. The same atMost(k) - atMost(k-1) subtraction applies.",
      approach: [
        "Treat odd as 1 and even as 0.",
        "Count subarrays with at most k odd numbers using a sliding window.",
        "Return atMost(k) - atMost(k - 1).",
      ],
      bruteForce: { idea: "Count odds in every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Parity mapping plus the atMost subtraction.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Use n & 1 rather than n % 2 == 1 out of habit — safe here since values are positive, but the habit matters.",
        "The even runs around the odd ones drive the count up fast; case 4 gives 16, not 4.",
        "Recognising this as the previous problem in disguise is most of the work.",
      ],
      javaToolkit: ["Parity as a 0/1 mapping", "atMost subtraction", "Spotting a re-skinned problem"],
    },
  },

  "substring-all-three": {
    slug: "substring-all-three",
    title: "Number of Substrings Containing All Three Characters",
    description:
      "Given a string of only the characters a, b and c, return how many substrings contain at least one of each.",
    constraints: ["1 ≤ s.length ≤ 5 × 10^4", "s contains only 'a', 'b' and 'c'"],
    className: "Solution",
    methodName: "numberOfSubstrings",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int numberOfSubstrings(String s) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "abcabc" }, expectedOutput: 10 },
      { id: 2, inputs: { s: "aaacb" }, expectedOutput: 3, explanation: "Every valid substring must reach the b at the end." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "abc" }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { s: "aaa" }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { s: "ccbba" }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { s: "abcabcabc" }, expectedOutput: 28, isHidden: true },
      { id: 7, inputs: { s: "ab" }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "For each right index, find the LARGEST left index at which the substring still contains all three. Every start from 0 up to that index also works, since removing characters from the front only shrinks the window — so that index plus one is the count ending here.",
      approach: [
        "Track the most recent index of each of a, b and c.",
        "At each right index, if all three have been seen, add min(lastA, lastB, lastC) + 1.",
        "Sum over all right indices.",
      ],
      bruteForce: { idea: "Check every substring for all three characters.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Last-seen indices, counting valid starts per end.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Adding 1 per right index counts only the shortest window and badly undercounts.",
        "Before all three have appeared, the contribution is 0 — initialise the last-seen indices to -1 and skip.",
        "A shrinking window works too, but the last-seen version is shorter and harder to get wrong.",
      ],
      javaToolkit: ["Last-seen index array", "Counting valid starts per end", "Math.min across three indices"],
    },
  },

  "max-points-cards": {
    slug: "max-points-cards",
    title: "Maximum Points You Can Obtain From Cards",
    description:
      "Cards lie in a row, each worth some points. You take exactly k cards, one at a time, each from either end. Return the highest total obtainable.",
    constraints: ["1 ≤ cardPoints.length ≤ 10^5", "1 ≤ cardPoints[i] ≤ 10^4", "1 ≤ k ≤ cardPoints.length"],
    className: "Solution",
    methodName: "maxScore",
    parameters: [
      { name: "cardPoints", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxScore(int[] cardPoints, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { cardPoints: [1, 2, 3, 4, 5, 6, 1], k: 3 }, expectedOutput: 12, explanation: "Taking 1 from the left then 6 and 5 from the right gives 12." },
      { id: 2, inputs: { cardPoints: [2, 2, 2], k: 2 }, expectedOutput: 4 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { cardPoints: [5], k: 1 }, expectedOutput: 5, isHidden: true },
      { id: 4, inputs: { cardPoints: [1, 2, 3, 4, 5], k: 5 }, expectedOutput: 15, isHidden: true },
      { id: 5, inputs: { cardPoints: [9, 7, 7, 9, 7, 7, 9], k: 7 }, expectedOutput: 55, isHidden: true },
      { id: 6, inputs: { cardPoints: [1, 1000, 1], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { cardPoints: [100, 40, 17, 9, 73, 75], k: 3 }, expectedOutput: 248, isHidden: true },
    ],
    learn: {
      intuition:
        "The cards you take are always a prefix plus a suffix, so the cards you LEAVE are one contiguous block of n - k cards. Maximising what you take is minimising that block's sum — an ordinary fixed-size window.",
      approach: [
        "Compute the total of all cards.",
        "Slide a window of size n - k and find its minimum sum.",
        "The answer is total minus that minimum.",
        "When k equals n the window is empty and the answer is the total.",
      ],
      bruteForce: { idea: "Try every split of k between the two ends.", time: "O(k)", space: "O(1)" },
      optimal: { idea: "Minimise the untaken window of size n - k.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "A greedy 'take the bigger end each time' is wrong — case 6 takes the 1, not the 1000, because the 1000 is unreachable.",
        "k = n leaves a zero-width window; handle it or the loop misbehaves.",
        "The O(k) prefix/suffix version is also fine and arguably clearer.",
      ],
      javaToolkit: ["Complement reframing", "Fixed-size window", "Total minus minimum"],
    },
  },

  "longest-substring-k-distinct": {
    slug: "longest-substring-k-distinct",
    title: "Longest Substring With At Most K Distinct Characters",
    description: "Return the length of the longest substring containing at most k distinct characters.",
    constraints: ["0 ≤ s.length ≤ 5 × 10^4", "0 ≤ k ≤ 50"],
    className: "Solution",
    methodName: "lengthOfLongestSubstringKDistinct",
    parameters: [
      { name: "s", type: "String" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "eceba", k: 2 }, expectedOutput: 3, explanation: "\"ece\" uses only e and c." },
      { id: 2, inputs: { s: "aa", k: 1 }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "", k: 2 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { s: "abc", k: 0 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { s: "abcdef", k: 6 }, expectedOutput: 6, isHidden: true },
      { id: 6, inputs: { s: "aabbcc", k: 2 }, expectedOutput: 4, isHidden: true },
      { id: 7, inputs: { s: "aaabbb", k: 3 }, expectedOutput: 6, isHidden: true },
    ],
    learn: {
      intuition:
        "The general form of fruit-into-baskets: same window, same count map, with k in place of the fixed 2.",
      approach: [
        "Extend right, incrementing that character's count.",
        "While the map holds more than k keys, advance left and decrement, removing keys that hit 0.",
        "Track the best length.",
      ],
      bruteForce: { idea: "Count distinct characters in every substring.", time: "O(n²)", space: "O(k)" },
      optimal: { idea: "Sliding window, shrinking on more than k keys.", time: "O(n)", space: "O(k)" },
      pitfalls: [
        "k = 0 admits no characters at all, so the answer is 0 for any string.",
        "Zero-count keys must be removed, exactly as in fruit-into-baskets.",
        "k larger than the alphabet means the whole string qualifies.",
      ],
      javaToolkit: ["HashMap counts", "Generalising a fixed constant to a parameter", "Guarding k = 0"],
    },
  },

  "subarray-k-different": {
    slug: "subarray-k-different",
    title: "Subarrays With K Different Integers",
    description: "Return how many contiguous subarrays contain exactly k distinct integers.",
    constraints: ["1 ≤ nums.length ≤ 2 × 10^4", "1 ≤ nums[i] ≤ nums.length", "1 ≤ k ≤ nums.length"],
    className: "Solution",
    methodName: "subarraysWithKDistinct",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 1, 2, 3], k: 2 }, expectedOutput: 7 },
      { id: 2, inputs: { nums: [1, 2, 1, 3, 4], k: 3 }, expectedOutput: 3 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1, 1, 1], k: 1 }, expectedOutput: 6, isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3], k: 3 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [2, 1, 1, 1, 2], k: 2 }, expectedOutput: 7, isHidden: true },
      { id: 7, inputs: { nums: [1, 2, 3, 4], k: 1 }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "'Exactly k distinct' is not monotonic — adding an element can leave the distinct count unchanged — so a single window cannot decide when to shrink. 'At most k' IS monotonic, so count that and subtract at most k - 1.",
      approach: [
        "Write atMost(k): a window with a count map, shrinking while it holds more than k keys, adding (right - left + 1) at each step.",
        "Return atMost(k) - atMost(k - 1).",
      ],
      bruteForce: { idea: "Count distinct values in every subarray.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "atMost(k) - atMost(k - 1).", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Trying to window 'exactly k' directly is the trap this problem exists to teach — it cannot work.",
        "atMost(0) is 0, which matters when k = 1.",
        "The two windows can be run in one pass with two left pointers, but two calls are clearer.",
      ],
      javaToolkit: ["The atMost subtraction pattern", "HashMap counts", "Monotonicity as the requirement for windowing"],
    },
  },

  "min-window-substring": {
    slug: "min-window-substring",
    title: "Minimum Window Substring",
    description:
      "Return the shortest substring of s containing every character of t, counting multiplicity. If none exists, return \"\". If several tie in length, return the leftmost.",
    constraints: ["1 ≤ s.length, t.length ≤ 10^5", "s and t consist of English letters"],
    className: "Solution",
    methodName: "minWindow",
    parameters: [
      { name: "s", type: "String" },
      { name: "t", type: "String" },
    ],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public String minWindow(String s, String t) {
        // Multiplicity counts. On a tie, return the leftmost window.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "ADOBECODEBANC", t: "ABC" }, expectedOutput: "BANC" },
      { id: 2, inputs: { s: "a", t: "a" }, expectedOutput: "a" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a", t: "aa" }, expectedOutput: "", isHidden: true },
      { id: 4, inputs: { s: "ab", t: "b" }, expectedOutput: "b", isHidden: true },
      { id: 5, inputs: { s: "aa", t: "aa" }, expectedOutput: "aa", isHidden: true },
      { id: 6, inputs: { s: "abc", t: "d" }, expectedOutput: "", isHidden: true },
      { id: 7, inputs: { s: "cabwefgewcwaefgcf", t: "cae" }, expectedOutput: "cwae", isHidden: true },
    ],
    learn: {
      intuition:
        "Grow the window until it covers t, then shrink from the left as far as it still covers. A single counter of how many required characters are still missing turns the coverage check into a comparison against zero.",
      approach: [
        "Build a need-count per character from t and a counter of how many are still outstanding.",
        "Extend right; when a character is still needed, decrement the outstanding counter.",
        "While outstanding is 0, record the window if it is the shortest so far, then advance left, restoring the need when a required character leaves.",
      ],
      bruteForce: { idea: "Check every substring for coverage.", time: "O(n² × m)", space: "O(m)" },
      optimal: { idea: "Sliding window with a need map and a missing counter.", time: "O(n + m)", space: "O(alphabet)" },
      pitfalls: [
        "Multiplicity matters: t = \"aa\" needs TWO a's, so \"a\" is not a cover — a hidden case checks this.",
        "Only decrement the outstanding counter while the need for that character is still positive; extra copies must not count.",
        "Strict '<' when comparing lengths keeps the leftmost of any tie.",
      ],
      javaToolkit: ["int[128] need counts", "A single 'missing' counter", "Grow-then-shrink structure"],
    },
  },

  "min-window-subsequence": {
    slug: "min-window-subsequence",
    title: "Minimum Window Subsequence",
    description:
      "Return the shortest contiguous substring of s1 in which s2 appears as a SUBSEQUENCE — same order, not necessarily adjacent. If none exists, return \"\". If several tie in length, return the leftmost.",
    constraints: ["1 ≤ s1.length ≤ 2 × 10^4", "1 ≤ s2.length ≤ 100", "Both consist of lowercase English letters"],
    className: "Solution",
    methodName: "minWindowSubsequence",
    parameters: [
      { name: "s1", type: "String" },
      { name: "s2", type: "String" },
    ],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String minWindowSubsequence(String s1, String s2) {
        // Subsequence, not substring. Leftmost on a tie.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s1: "abcdebdde", s2: "bde" }, expectedOutput: "bcde", explanation: "\"bcde\" is shorter than \"bdde\", and both contain b, d, e in order." },
      { id: 2, inputs: { s1: "abc", s2: "ac" }, expectedOutput: "abc" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s1: "a", s2: "b" }, expectedOutput: "", isHidden: true },
      { id: 4, inputs: { s1: "abc", s2: "abc" }, expectedOutput: "abc", isHidden: true },
      { id: 5, inputs: { s1: "cnhczmccqouqadqtmjjzl", s2: "mm" }, expectedOutput: "mccqouqadqtm", isHidden: true },
      { id: 6, inputs: { s1: "ab", s2: "ba" }, expectedOutput: "", isHidden: true },
      { id: 7, inputs: { s1: "aaaa", s2: "a" }, expectedOutput: "a", isHidden: true },
    ],
    learn: {
      intuition:
        "Unlike the previous problem, order matters, so a count map is useless. The forward-then-backward walk handles it: march forward matching s2 in order, and the moment the last character lands, march BACKWARDS from there re-matching s2 in reverse — that lands exactly on the tightest start for this end.",
      approach: [
        "Walk i through s1 and j through s2, advancing j on each match.",
        "When j reaches the end of s2, note the end index, then walk backwards matching s2 from its end to its start.",
        "The position where the backward walk finishes is the tightest start; record the window if it is the shortest.",
        "Restart the forward walk from just after that start.",
      ],
      bruteForce: { idea: "For every start, greedily match s2 forward.", time: "O(n × m)", space: "O(1)" },
      optimal: { idea: "Forward match then backward tighten, or O(n × m) dynamic programming.", time: "O(n × m) worst case", space: "O(1)" },
      pitfalls: [
        "The backward tighten is what makes the answer minimal — without it the first match is often far too long.",
        "Restart the forward scan from start + 1, not from the window's end, or you skip overlapping windows.",
        "Order matters: s1 = \"ab\", s2 = \"ba\" has no answer even though both letters are present.",
        "Use strict '<' on the length comparison to keep the leftmost of a tie.",
      ],
      javaToolkit: ["Forward-then-backward two-pointer", "Greedy tightening", "Why a count map fails when order matters"],
    },
  },
}
