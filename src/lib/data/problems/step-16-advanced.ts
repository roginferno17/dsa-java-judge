import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 16 — Stocks, LIS and squares (11).
 *
 * The stock problems are one recurrence with a growing state. Start with "am I
 * holding a share?", then add whatever the variant needs — a cooldown day, a fee,
 * a transaction counter. Nothing else changes, which is why they are worth doing
 * in order rather than as five separate problems.
 */
export const step16Advanced: Record<string, ProblemMetadata> = {
  "stock-buy-sell-dp": {
    slug: "stock-buy-sell-dp",
    title: "Best Time to Buy and Sell Stock",
    description:
      "Buy on one day and sell on a LATER day, at most once. Return the greatest profit, or 0 if no trade is worthwhile.",
    constraints: ["1 ≤ prices.length ≤ 10^5", "0 ≤ prices[i] ≤ 10^4"],
    className: "Solution",
    methodName: "maxProfit",
    parameters: [{ name: "prices", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxProfit(int[] prices) {
        // At most one buy and one sell.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { prices: [7, 1, 5, 3, 6, 4] }, expectedOutput: 5, explanation: "Buy at 1, sell at 6." },
      { id: 2, inputs: { prices: [7, 6, 4, 3, 1] }, expectedOutput: 0, explanation: "Prices only fall, so do not trade." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { prices: [1] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { prices: [1, 2] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { prices: [2, 1] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { prices: [3, 3, 3] }, expectedOutput: 0, isHidden: true },
      { id: 7, inputs: { prices: [2, 4, 1, 7] }, expectedOutput: 6, isHidden: true },
    ],
    learn: {
      intuition:
        "Selling on a given day is only ever worth the cheapest price seen BEFORE it. Sweep once carrying that minimum, and the best profit is the largest gap found.",
      approach: [
        "Track the minimum price so far, starting at prices[0].",
        "At each day, the candidate profit is price minus that minimum.",
        "Keep the largest candidate, floored at 0.",
      ],
      bruteForce: { idea: "Try every buy-sell pair.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "One pass tracking the running minimum.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Update the minimum AFTER computing the profit, or a day can sell to itself for 0 — harmless here but wrong in the variants.",
        "A falling market answers 0, not a negative number: not trading is allowed.",
        "The state-machine framing — 'holding' versus 'not holding' — is overkill here but is exactly what the next four problems need.",
      ],
      javaToolkit: ["Running minimum", "Profit as a max over differences", "Where the state machine begins"],
    },
  },

  "stock-cooldown": {
    slug: "stock-cooldown",
    title: "Best Time to Buy and Sell Stock With Cooldown",
    description:
      "Trade as often as you like, holding at most one share at a time, but after SELLING you cannot buy on the next day. Return the greatest profit.",
    constraints: ["1 ≤ prices.length ≤ 5000", "0 ≤ prices[i] ≤ 1000"],
    className: "Solution",
    methodName: "maxProfit",
    parameters: [{ name: "prices", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxProfit(int[] prices) {
        // One day of cooldown after every sale.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { prices: [1, 2, 3, 0, 2] }, expectedOutput: 3, explanation: "Buy 1, sell 2, cool down, buy 0, sell 2." },
      { id: 2, inputs: { prices: [1] }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { prices: [1, 2] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { prices: [2, 1] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { prices: [1, 2, 3, 4, 5] }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { prices: [6, 1, 3, 2, 4, 7] }, expectedOutput: 6, isHidden: true },
      { id: 7, inputs: { prices: [2, 1, 4] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Two states are no longer enough. After selling you are neither free to buy nor holding, so add a third: HOLDING, COOLING (just sold), and FREE. Each day, each state is the best of the moves that land in it.",
      approach: [
        "hold = max(hold, free - price) — the buy must come from a free day, not a cooling one.",
        "cool = hold + price — selling today.",
        "free = max(free, previous cool) — yesterday's cooldown expires.",
        "Update all three from the PREVIOUS day's values.",
      ],
      bruteForce: { idea: "Recurse on buy, sell or wait at every day.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Three-state machine with rolling values.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Updating the three states in place lets the same day both sell and buy — snapshot the previous values first.",
        "Buying from 'cool' rather than 'free' silently removes the cooldown.",
        "Adding a state is the general recipe for these variants; trying to patch the two-state version with an index check is much harder to get right.",
      ],
      javaToolkit: ["Three-state machine", "Snapshotting previous values", "Adding a state per constraint"],
    },
  },

  "stock-fee": {
    slug: "stock-fee",
    title: "Best Time to Buy and Sell Stock With Transaction Fee",
    description:
      "Trade as often as you like, holding at most one share at a time. Each completed transaction costs a fee. Return the greatest profit.",
    constraints: ["1 ≤ prices.length ≤ 5 × 10^4", "0 ≤ prices[i] ≤ 5 × 10^4", "0 ≤ fee ≤ 5 × 10^4"],
    className: "Solution",
    methodName: "maxProfit",
    parameters: [
      { name: "prices", type: "int[]" },
      { name: "fee", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxProfit(int[] prices, int fee) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { prices: [1, 3, 2, 8, 4, 9], fee: 2 }, expectedOutput: 8, explanation: "Buy 1 sell 8, buy 4 sell 9, minus two fees." },
      { id: 2, inputs: { prices: [1, 3, 7, 5, 10, 3], fee: 3 }, expectedOutput: 6 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { prices: [1], fee: 2 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { prices: [1, 2], fee: 0 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { prices: [1, 2], fee: 5 }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { prices: [1, 2, 3, 4, 5], fee: 1 }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { prices: [5, 4, 3, 2, 1], fee: 1 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Back to two states, with the fee charged once per completed trade. Charging it on the SELL keeps the arithmetic simple, and it is what discourages the many tiny trades that would otherwise be free.",
      approach: [
        "hold = max(hold, free - price).",
        "free = max(free, hold + price - fee).",
        "Both start at -prices[0] and 0 respectively.",
      ],
      bruteForce: { idea: "Search over every set of trades.", time: "exponential", space: "O(n)" },
      optimal: { idea: "Two-state machine with the fee on the sale.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Charging the fee on both buy and sell doubles it.",
        "The fee can make a rising sequence not worth trading at all — case 5 answers 0 despite the price going up.",
        "Merging consecutive rises into one long trade is exactly what the DP does automatically; case 6 pays one fee, not four.",
      ],
      javaToolkit: ["Two-state machine", "Charging a cost on one transition", "Why the DP merges trades on its own"],
    },
  },

  "stock-3": {
    slug: "stock-3",
    title: "Best Time to Buy and Sell Stock III",
    description: "Complete at most TWO transactions, holding at most one share at a time. Return the greatest profit.",
    constraints: ["1 ≤ prices.length ≤ 10^5", "0 ≤ prices[i] ≤ 10^5"],
    className: "Solution",
    methodName: "maxProfit",
    parameters: [{ name: "prices", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxProfit(int[] prices) {
        // At most two completed transactions.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { prices: [3, 3, 5, 0, 0, 3, 1, 4] }, expectedOutput: 6, explanation: "Buy 0 sell 3, then buy 1 sell 4." },
      { id: 2, inputs: { prices: [1, 2, 3, 4, 5] }, expectedOutput: 4, explanation: "One transaction already captures the whole rise." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { prices: [7, 6, 4, 3, 1] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { prices: [1] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { prices: [1, 2, 4, 2, 5, 7, 2, 4, 9, 0] }, expectedOutput: 13, isHidden: true },
      { id: 6, inputs: { prices: [2, 1, 4, 5, 2, 9, 7] }, expectedOutput: 11, isHidden: true },
      { id: 7, inputs: { prices: [3, 2, 6, 5, 0, 3] }, expectedOutput: 7, isHidden: true },
    ],
    learn: {
      intuition:
        "Four states, in order: bought once, sold once, bought twice, sold twice. Each day every state can either stay put or be entered from the one before it, so the whole thing is four running maxima updated in sequence.",
      approach: [
        "buy1 = max(buy1, -price); sell1 = max(sell1, buy1 + price).",
        "buy2 = max(buy2, sell1 - price); sell2 = max(sell2, buy2 + price).",
        "Initialise buy1 and buy2 to a large negative value, and both sells to 0.",
      ],
      bruteForce: { idea: "Try every pair of disjoint intervals.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Four-state machine in one pass.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Updating all four in one pass with the CURRENT day's values is fine here, and is in fact what makes the chain work — each state legitimately builds on the one updated just before it.",
        "Two transactions is a maximum, not a requirement: case 2 uses one.",
        "The split-the-array approach (best profit before i plus best after i) also works and is worth knowing.",
      ],
      javaToolkit: ["Four-state chain", "Initialising to a very negative value", "Prefix/suffix split as the alternative"],
    },
  },

  "stock-4": {
    slug: "stock-4",
    title: "Best Time to Buy and Sell Stock IV",
    description: "Complete at most k transactions, holding at most one share at a time. Return the greatest profit.",
    constraints: ["0 ≤ k ≤ 100", "0 ≤ prices.length ≤ 1000", "0 ≤ prices[i] ≤ 1000"],
    className: "Solution",
    methodName: "maxProfit",
    parameters: [
      { name: "k", type: "int" },
      { name: "prices", type: "int[]" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxProfit(int k, int[] prices) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { k: 2, prices: [2, 4, 1] }, expectedOutput: 2 },
      { id: 2, inputs: { k: 2, prices: [3, 2, 6, 5, 0, 3] }, expectedOutput: 7 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { k: 0, prices: [1, 3] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { k: 2, prices: [] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { k: 1, prices: [7, 1, 5, 3, 6, 4] }, expectedOutput: 5, isHidden: true },
      { id: 6, inputs: { k: 100, prices: [1, 2, 3, 4, 5] }, expectedOutput: 4, isHidden: true },
      { id: 7, inputs: { k: 3, prices: [1, 2, 4, 2, 5, 7, 2, 4, 9, 0] }, expectedOutput: 15, isHidden: true },
    ],
    learn: {
      intuition:
        "The generalisation of the previous problem: 2k states instead of 4. Rather than writing them out, keep an array of buy and sell values indexed by transaction number and update them in order each day.",
      approach: [
        "buy[j] = max(buy[j], sell[j - 1] - price) and sell[j] = max(sell[j], buy[j] + price), for j from 1 to k.",
        "Initialise every buy to a large negative value and every sell to 0.",
        "When k is at least half the number of days, the limit cannot bind and the answer is the sum of all rises.",
      ],
      bruteForce: { idea: "Search over all sets of at most k disjoint intervals.", time: "exponential", space: "O(n)" },
      optimal: { idea: "2k-state machine, with an unlimited-transaction shortcut for large k.", time: "O(n × k)", space: "O(k)" },
      pitfalls: [
        "k = 0 or an empty price list answers 0; both are easy to crash on.",
        "Without the large-k shortcut, k = 100 on 1000 days is 100,000 updates — fine here, but the shortcut matters when k is unbounded.",
        "The j loop must run in increasing order so sell[j - 1] is already the value for this day.",
      ],
      javaToolkit: ["Arrays of DP states", "The k ≥ n / 2 shortcut", "Generalising a fixed state machine"],
    },
  },

  "longest-increasing-subsequence": {
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    description: "Return the length of the longest STRICTLY increasing subsequence.",
    constraints: ["1 ≤ nums.length ≤ 2500", "-10^4 ≤ nums[i] ≤ 10^4"],
    className: "Solution",
    methodName: "lengthOfLIS",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int lengthOfLIS(int[] nums) {
        // Strictly increasing.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }, expectedOutput: 4, explanation: "[2,3,7,101] and others of length 4." },
      { id: 2, inputs: { nums: [7, 7, 7, 7] }, expectedOutput: 1, explanation: "Equal values do not increase." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [0, 1, 0, 3, 2, 3] }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { nums: [5, 4, 3, 2, 1] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3, 4, 5] }, expectedOutput: 5, isHidden: true },
      { id: 7, inputs: { nums: [-2, -1, 0, 1] }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "Ask, for each position, how long an increasing run can END there. That length is one more than the best such run ending at any earlier, smaller value — and every position is a candidate answer, not just the last.",
      approach: [
        "State: len(i) is the LIS ending exactly at index i.",
        "Transition: len(i) = 1 + max over j < i with nums[j] < nums[i] of len(j).",
        "Answer: the maximum over all i.",
      ],
      bruteForce: { idea: "Test every subsequence.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "O(n²) DP, or O(n log n) with the patience method.", time: "O(n²)", space: "O(n)" },
      pitfalls: [
        "STRICTLY increasing means equal values do not extend a run — [7,7,7,7] is 1, not 4.",
        "The answer is the maximum over the whole table; len(n - 1) alone is wrong.",
        "Every position starts at 1, since a single element is already a run.",
      ],
      javaToolkit: ["Ends-at-i DP", "Maximum over the table", "Strict versus non-strict"],
    },
  },

  "print-lis": {
    slug: "print-lis",
    title: "Print the Longest Increasing Subsequence",
    description:
      "Return an actual longest strictly increasing subsequence, not just its length. When several have the maximum length, return the LEXICOGRAPHICALLY SMALLEST one. All values are distinct.",
    constraints: ["1 ≤ nums.length ≤ 1000", "-10^4 ≤ nums[i] ≤ 10^4", "Values are distinct"],
    className: "Solution",
    methodName: "printLIS",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> printLIS(int[] nums) {
        // Lexicographically smallest among all longest increasing subsequences.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }, expectedOutput: [2, 3, 7, 18], explanation: "[2,5,7,101] is also length 4, but [2,3,7,18] is smaller." },
      { id: 2, inputs: { nums: [5] }, expectedOutput: [5] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [3, 2, 1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { nums: [1, 2, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 5, inputs: { nums: [4, 1, 5, 2, 6] }, expectedOutput: [1, 2, 6], isHidden: true },
      { id: 6, inputs: { nums: [-5, -3, 0, 7] }, expectedOutput: [-5, -3, 0, 7], isHidden: true },
      { id: 7, inputs: { nums: [9, 1, 8, 2, 7, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Reconstructing needs the DP measured from the other end: how long a run STARTS at each index. Then build the answer greedily — at each step take the smallest value that can still finish a run of the remaining length.",
      approach: [
        "Compute start(i): the longest increasing run beginning at index i.",
        "Let L be the maximum, and walk L times.",
        "At each step, among indices after the last chosen one with a larger value and start(i) equal to the remaining length, take the one with the smallest VALUE.",
      ],
      bruteForce: { idea: "Enumerate every increasing subsequence and sort the longest ones.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Starts-at-i DP plus a greedy lexicographic reconstruction.", time: "O(n²)", space: "O(n)" },
      pitfalls: [
        "Parent pointers give SOME longest subsequence, but which one depends on tie-breaking — the lexicographic rule is what makes the answer unique, and it is why the description states it.",
        "The DP must measure runs STARTING at i; the ends-at-i version cannot be walked forwards.",
        "A strictly decreasing input answers with a single element, and the smallest one at that.",
      ],
      javaToolkit: ["Starts-at-i DP", "Greedy lexicographic reconstruction", "Why parent pointers are not unique"],
    },
  },

  "lis-binary-search": {
    slug: "lis-binary-search",
    title: "Longest Increasing Subsequence in O(n log n)",
    description:
      "Return the length of the longest strictly increasing subsequence, in O(n log n) rather than O(n²).",
    constraints: ["1 ≤ nums.length ≤ 2.5 × 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "lengthOfLIS",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int lengthOfLIS(int[] nums) {
        // Aim for O(n log n).
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }, expectedOutput: 4 },
      { id: 2, inputs: { nums: [0, 1, 0, 3, 2, 3] }, expectedOutput: 4 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [7, 7, 7, 7] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [4, 10, 4, 3, 8, 9] }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { nums: [1, 3, 6, 7, 9, 4, 10, 5, 6] }, expectedOutput: 6, isHidden: true },
      { id: 7, inputs: { nums: [-1000000000, 0, 1000000000] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Keep a list where position i holds the SMALLEST possible tail of an increasing run of length i + 1. That list is always sorted, so each new value can be placed by binary search — either extending the list or lowering an existing tail to keep more options open.",
      approach: [
        "For each value, binary-search the list for the first tail at least as large.",
        "If none exists, append the value; otherwise overwrite that tail.",
        "The list's LENGTH is the answer.",
      ],
      bruteForce: { idea: "The O(n²) ends-at-i DP.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Patience method with binary search.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "The list is NOT itself a valid subsequence — only its length is meaningful. Printing it is a common and wrong shortcut.",
        "For a strictly increasing LIS the search is for the first tail ≥ value; using > gives the non-decreasing variant instead, and [7,7,7,7] then answers 4.",
        "Arrays.binarySearch returns a negative insertion point for a miss; -(result + 1) converts it.",
      ],
      javaToolkit: ["Patience sorting", "Arrays.binarySearch and its negative return", "Strict versus non-decreasing search bound"],
    },
  },

  "lcs-gaps": {
    slug: "lcs-gaps",
    title: "Longest Common Subsequence With Gaps",
    description:
      "Return an actual longest common subsequence of the two strings — the characters themselves, not the length. When several have the maximum length, return the LEXICOGRAPHICALLY SMALLEST one. Return \"\" when there is none.",
    constraints: ["0 ≤ length ≤ 200", "Lowercase English letters"],
    className: "Solution",
    methodName: "printLCS",
    parameters: [
      { name: "a", type: "String" },
      { name: "b", type: "String" },
    ],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String printLCS(String a, String b) {
        // Lexicographically smallest among the longest common subsequences.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: "abcde", b: "ace" }, expectedOutput: "ace" },
      { id: 2, inputs: { a: "abc", b: "def" }, expectedOutput: "" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: "", b: "abc" }, expectedOutput: "", isHidden: true },
      { id: 4, inputs: { a: "abc", b: "abc" }, expectedOutput: "abc", isHidden: true },
      { id: 5, inputs: { a: "ab", b: "ba" }, expectedOutput: "a", isHidden: true },
      { id: 6, inputs: { a: "bl", b: "yby" }, expectedOutput: "b", isHidden: true },
      { id: 7, inputs: { a: "abcbdab", b: "bdcaba" }, expectedOutput: "bcab", isHidden: true },
    ],
    learn: {
      intuition:
        "Compute the LCS table measured from the END — length(i, j) for the suffixes starting at i and j. Then build the answer forwards: at each step try letters a to z in order and take the first that can still complete a subsequence of the remaining length.",
      approach: [
        "Fill length(i, j) over suffixes with the usual recurrence.",
        "Walk with two cursors. For each letter in alphabetical order, find its first occurrence at or after each cursor.",
        "If both exist and 1 + length(ia + 1, jb + 1) equals the remaining length, take that letter and move both cursors past it.",
      ],
      bruteForce: { idea: "Enumerate all common subsequences and sort the longest.", time: "exponential", space: "O(n)" },
      optimal: { idea: "Suffix LCS table plus a greedy letter-by-letter reconstruction.", time: "O(n × m × 26)", space: "O(n × m)" },
      pitfalls: [
        "Walking the table backwards from (n, m) gives SOME LCS, but not reliably the smallest one — case 7 is where the two differ.",
        "The table must be over SUFFIXES for a forward reconstruction; the usual prefix table would have to be walked in reverse.",
        "An empty result is a legitimate answer when the strings share no characters.",
      ],
      javaToolkit: ["Suffix-indexed DP tables", "Greedy lexicographic reconstruction", "Precomputing next-occurrence positions"],
    },
  },

  "largest-square-matrix": {
    slug: "largest-square-matrix",
    title: "Largest Square Submatrix of Ones",
    description: "Return the SIDE LENGTH of the largest square containing only 1s, or 0 if there is none.",
    constraints: ["1 ≤ rows, cols ≤ 300", "matrix[i][j] is 0 or 1"],
    className: "Solution",
    methodName: "maximalSquare",
    parameters: [{ name: "matrix", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maximalSquare(int[][] matrix) {
        // Return the side length, not the area.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[1, 0, 1, 0, 0], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 0, 1, 0]] }, expectedOutput: 2 },
      { id: 2, inputs: { matrix: [[0, 1], [1, 0]] }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[0]] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { matrix: [[1]] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { matrix: [[1, 1], [1, 1]] }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { matrix: [[0, 0], [0, 0]] }, expectedOutput: 0, isHidden: true },
      { id: 7, inputs: { matrix: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Let side(i, j) be the largest square whose BOTTOM-RIGHT corner is this cell. Such a square exists only if squares of size one smaller end at the cells above, to the left, and diagonally up-left — so the minimum of those three, plus one, is the answer here.",
      approach: [
        "side(i, j) = 0 when the cell is 0.",
        "Otherwise 1 + min(side(i - 1, j), side(i, j - 1), side(i - 1, j - 1)).",
        "The first row and column are just the cell's own value.",
        "Track the maximum over the table.",
      ],
      bruteForce: { idea: "Try every square and verify it.", time: "O((rows × cols)²)", space: "O(1)" },
      optimal: { idea: "Bottom-right-corner DP with a three-way minimum.", time: "O(rows × cols)", space: "O(cols)" },
      pitfalls: [
        "The minimum of THREE neighbours is needed, not two — with only two, an L-shaped region is wrongly counted as a square.",
        "The answer is the side length; the area version is that squared.",
        "As with the common-substring DP, the best cell is usually not the last one, so track the maximum separately.",
      ],
      javaToolkit: ["Corner-anchored DP", "Three-way minimum", "Rolling row"],
    },
  },

  "count-squares": {
    slug: "count-squares",
    title: "Count Square Submatrices With All Ones",
    description: "Return how many square submatrices of any size contain only 1s.",
    constraints: ["1 ≤ rows, cols ≤ 300", "matrix[i][j] is 0 or 1"],
    className: "Solution",
    methodName: "countSquares",
    parameters: [{ name: "matrix", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countSquares(int[][] matrix) {
        // Squares of every size, counted separately.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[0, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 1]] }, expectedOutput: 15, explanation: "10 of size 1, 4 of size 2, 1 of size 3." },
      { id: 2, inputs: { matrix: [[1, 0, 1], [1, 1, 0], [1, 1, 0]] }, expectedOutput: 7 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[0]] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { matrix: [[1]] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { matrix: [[1, 1], [1, 1]] }, expectedOutput: 5, isHidden: true },
      { id: 6, inputs: { matrix: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] }, expectedOutput: 14, isHidden: true },
      { id: 7, inputs: { matrix: [[0, 0], [0, 0]] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "The same table as the previous problem, read differently. If the largest square ending at a cell has side s, then squares of side 1, 2, up to s all end there — so summing the whole table counts every square exactly once, indexed by its bottom-right corner.",
      approach: [
        "Fill the same side(i, j) table.",
        "Return the sum of every entry rather than the maximum.",
      ],
      bruteForce: { idea: "Try every square and verify it.", time: "O((rows × cols)²)", space: "O(1)" },
      optimal: { idea: "Sum the largest-square table.", time: "O(rows × cols)", space: "O(cols)" },
      pitfalls: [
        "Each square is counted once by its bottom-right corner, which is what makes summing correct rather than double-counting.",
        "A 2 × 2 block of ones holds five squares, not four: four of size 1 and one of size 2.",
        "The result can exceed int for a very large all-ones grid; at 300 × 300 it does not, but the reasoning is worth doing.",
      ],
      javaToolkit: ["Reusing a table for a different question", "Counting by canonical corner", "Sum versus maximum"],
    },
  },
}
