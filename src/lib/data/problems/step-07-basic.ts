import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 7 — Basic recursion and subsequence patterns (11 problems).
 *
 * Backtracking problems usually admit many valid orderings of the answer, so
 * every problem here that returns a collection states an exact order. Without
 * that a correct solution would be marked wrong for enumerating differently.
 */
export const step07Basic: Record<string, ProblemMetadata> = {
  "recursive-atoi": {
    slug: "recursive-atoi",
    title: "Recursive Implementation of atoi()",
    description:
      "Convert the leading numeric portion of a string to an int, using recursion rather than a loop. Skip leading spaces, accept one optional sign, read digits until a non-digit, and clamp to the 32-bit signed range.",
    constraints: ["0 ≤ s.length ≤ 200"],
    className: "Solution",
    methodName: "myAtoi",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int myAtoi(String s) {
        // Use recursion for the digit accumulation.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "42" }, expectedOutput: 42 },
      { id: 2, inputs: { s: "   -42" }, expectedOutput: -42 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "4193 with words" }, expectedOutput: 4193, isHidden: true },
      { id: 4, inputs: { s: "words 987" }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { s: "-91283472332" }, expectedOutput: -2147483648, isHidden: true },
      { id: 6, inputs: { s: "" }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "The same specification as the iterative atoi, expressed as a recursion over the index. Each frame consumes one digit and hands the accumulated value forward; the base case is a non-digit or the end of the string.",
      approach: [
        "Handle spaces and the optional sign before recursing.",
        "Write a helper taking the index and the value so far.",
        "Base case: index at the end, or the character is not a digit — return the accumulated value.",
        "Otherwise fold the digit in, clamping if it leaves the int range, and recurse on the next index.",
      ],
      bruteForce: { idea: "The iterative version.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Recursion over the index carrying an accumulator.", time: "O(n)", space: "O(n) call stack" },
      pitfalls: [
        "Accumulating in an int destroys the overflow before you can detect it; carry a long.",
        "Clamping must happen inside the recursion, not after it, or the value has already wrapped.",
        "Non-digit text before any digits gives 0, whereas text after simply stops the read.",
      ],
      javaToolkit: ["Accumulator passed through recursion", "long clamping", "Character.isDigit"],
    },
  },

  "pow-x-n": {
    slug: "pow-x-n",
    title: "Pow(x, n)",
    description:
      "Return x raised to the power n. n may be negative. Answers within 1e-5 are accepted.",
    constraints: ["-100.0 < x < 100.0", "-2^31 ≤ n ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "myPow",
    parameters: [
      { name: "x", type: "double" },
      { name: "n", type: "int" },
    ],
    returnType: "double",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public double myPow(double x, int n) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { x: 2.0, n: 10 }, expectedOutput: 1024.0 },
      { id: 2, inputs: { x: 2.0, n: -2 }, expectedOutput: 0.25, explanation: "A negative exponent gives the reciprocal." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { x: 2.0, n: 0 }, expectedOutput: 1.0, isHidden: true },
      { id: 4, inputs: { x: 1.0, n: -2147483648 }, expectedOutput: 1.0, isHidden: true },
      { id: 5, inputs: { x: 2.1, n: 3 }, expectedOutput: 9.261, isHidden: true },
      { id: 6, inputs: { x: -2.0, n: 3 }, expectedOutput: -8.0, isHidden: true },
    ],
    learn: {
      intuition:
        "Multiplying n times is O(n) and far too slow at these limits. Squaring halves the exponent each step: x^n is (x^(n/2))² for even n, and x times that for odd n.",
      approach: [
        "Convert n to a long immediately and take its absolute value.",
        "Recurse: half = pow(x, n / 2), then return half × half, multiplied by x once more when n is odd.",
        "If n was negative, return the reciprocal.",
      ],
      bruteForce: { idea: "Multiply x by itself n times.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Binary exponentiation.", time: "O(log n)", space: "O(log n) call stack" },
      pitfalls: [
        "Math.abs(Integer.MIN_VALUE) returns itself, still negative — convert to long BEFORE negating. That is a hidden case.",
        "Computing half once and squaring it is the point; calling pow twice makes it O(n) again.",
        "n = 0 must give 1 for any x.",
      ],
      javaToolkit: ["Binary exponentiation", "(long) n before negating", "Halving the exponent"],
    },
  },

  "count-good-numbers": {
    slug: "count-good-numbers",
    title: "Count Good Numbers",
    description:
      "A digit string of length n is good when every even index holds an even digit and every odd index holds a prime digit (2, 3, 5 or 7). Return how many good strings of length n exist, modulo 1_000_000_007.",
    constraints: ["1 ≤ n ≤ 10^15"],
    className: "Solution",
    methodName: "countGoodNumbers",
    parameters: [{ name: "n", type: "long" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countGoodNumbers(long n) {
        // Answer modulo 1000000007.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 1 }, expectedOutput: 5, explanation: "One position, at even index 0, so five even digits are allowed." },
      { id: 2, inputs: { n: 4 }, expectedOutput: 400, explanation: "Two even positions and two odd: 5 × 4 × 5 × 4." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 2 }, expectedOutput: 20, isHidden: true },
      { id: 4, inputs: { n: 50 }, expectedOutput: 564908303, isHidden: true },
      { id: 5, inputs: { n: 1000000000000000 }, expectedOutput: 711414395, isHidden: true },
      { id: 6, inputs: { n: 3 }, expectedOutput: 100, isHidden: true },
    ],
    learn: {
      intuition:
        "Every position is independent: even indices have 5 choices and odd indices have 4. So the answer is 5^(even count) × 4^(odd count) — a counting problem that reduces to fast exponentiation.",
      approach: [
        "There are (n + 1) / 2 even positions and n / 2 odd ones.",
        "Compute 5^even and 4^odd with modular binary exponentiation.",
        "Multiply the two results modulo 1e9+7.",
      ],
      bruteForce: { idea: "Enumerate the strings.", time: "O(5^n)", space: "O(n)" },
      optimal: { idea: "Modular binary exponentiation.", time: "O(log n)", space: "O(log n)" },
      pitfalls: [
        "n reaches 10^15, so the exponent must be a long and the power must be binary.",
        "Multiplying two values near 10^9 overflows int; do the modular multiply in long.",
        "Taking the modulus at every step is required, not optional.",
      ],
      javaToolkit: ["Modular exponentiation", "long intermediate products", "1_000_000_007"],
    },
  },

  "sort-stack-recursion": {
    slug: "sort-stack-recursion",
    title: "Sort a Stack Using Recursion",
    description:
      "The array is given bottom-to-top. Sort it so the largest value ends up on top, using only recursion and the call stack — no extra data structure. Return the sorted array, still bottom-to-top.",
    constraints: ["0 ≤ stack size ≤ 1000"],
    className: "Solution",
    methodName: "sortStack",
    parameters: [{ name: "stack", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] sortStack(int[] stack) {
        // Index 0 is the bottom. Largest ends up last.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { stack: [11, 2, 32, 3, 41] }, expectedOutput: [2, 3, 11, 32, 41] },
      { id: 2, inputs: { stack: [3, 1, 2] }, expectedOutput: [1, 2, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { stack: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { stack: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { stack: [2, 2, 1] }, expectedOutput: [1, 2, 2], isHidden: true },
      { id: 6, inputs: { stack: [-1, -3, -2] }, expectedOutput: [-3, -2, -1], isHidden: true },
    ],
    learn: {
      intuition:
        "Two mutually supporting recursions. Pop everything off, sort what remains, then insert the popped value back at its correct depth — which is itself a recursion that pops until the right spot appears.",
      approach: [
        "If the stack has fewer than two elements, it is sorted.",
        "Pop the top, sort the rest recursively, then insert the popped value in order.",
        "Insertion: if the stack is empty or the top is not greater, push; otherwise pop, recurse, and push back.",
      ],
      bruteForce: { idea: "Drain into an array, sort, refill.", time: "O(n log n)", space: "O(n)" },
      optimal: { idea: "Recursive insertion sort using only the call stack.", time: "O(n²)", space: "O(n) call stack" },
      pitfalls: [
        "Using a second stack or a list defeats the exercise even though it passes.",
        "Forgetting to push the held value back after the inner recursion loses it.",
        "This is insertion sort in disguise, so it is O(n²) — that is expected.",
      ],
      javaToolkit: ["Deque as a stack", "Mutual recursion", "Holding a value across a recursive call"],
    },
  },

  "reverse-stack-recursion": {
    slug: "reverse-stack-recursion",
    title: "Reverse a Stack Using Recursion",
    description:
      "The array is given bottom-to-top. Reverse it using only recursion, and return the result still bottom-to-top.",
    constraints: ["0 ≤ stack size ≤ 1000"],
    className: "Solution",
    methodName: "reverseStack",
    parameters: [{ name: "stack", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] reverseStack(int[] stack) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { stack: [1, 2, 3, 4] }, expectedOutput: [4, 3, 2, 1] },
      { id: 2, inputs: { stack: [1, 2] }, expectedOutput: [2, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { stack: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { stack: [7] }, expectedOutput: [7], isHidden: true },
      { id: 5, inputs: { stack: [1, 1, 2] }, expectedOutput: [2, 1, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Same two-recursion shape as sorting, with a simpler inner step: instead of inserting in order, insert at the very bottom. Doing that for every element reverses the whole stack.",
      approach: [
        "Base case: an empty stack is reversed.",
        "Pop the top, reverse the rest, then push the held value at the BOTTOM.",
        "Insert-at-bottom: if empty, push; otherwise pop, recurse, and push back.",
      ],
      optimal: { idea: "Recursive insert-at-bottom.", time: "O(n²)", space: "O(n) call stack" },
      pitfalls: [
        "Pushing the held value on top rather than at the bottom leaves the stack unchanged.",
        "The insert-at-bottom helper is a separate recursion; trying to fold it into one function does not work.",
      ],
      javaToolkit: ["Insert-at-bottom helper", "Two mutually recursive functions"],
    },
  },

  "generate-binary-strings": {
    slug: "generate-binary-strings",
    title: "Generate All Binary Strings Without Consecutive Ones",
    description:
      "Return every binary string of length n that contains no two adjacent 1s, in ascending lexicographic order.",
    constraints: ["1 ≤ n ≤ 20"],
    className: "Solution",
    methodName: "generateStrings",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> generateStrings(int n) {
        // Ascending lexicographic order.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 3 }, expectedOutput: ["000", "001", "010", "100", "101"], explanation: "011, 110 and 111 all contain adjacent ones." },
      { id: 2, inputs: { n: 1 }, expectedOutput: ["0", "1"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 2 }, expectedOutput: ["00", "01", "10"], isHidden: true },
      { id: 4, inputs: { n: 4 }, expectedOutput: ["0000", "0001", "0010", "0100", "0101", "1000", "1001", "1010"], isHidden: true },
    ],
    learn: {
      intuition:
        "Build the string one character at a time. A 0 is always allowed; a 1 only when the previous character was not a 1. Choosing 0 before 1 at every step produces lexicographic order for free.",
      approach: [
        "Recurse carrying the position and the previous character.",
        "Base case: the string reaches length n — record it.",
        "Always try appending '0'; append '1' only when the previous was not '1'.",
      ],
      bruteForce: { idea: "Generate all 2^n strings and filter.", time: "O(2^n × n)", space: "O(2^n)" },
      optimal: { idea: "Backtracking that never builds an invalid prefix.", time: "O(fib(n))", space: "O(n)" },
      pitfalls: [
        "Trying '1' before '0' produces the right set in the wrong order.",
        "Generating everything and filtering works but wastes most of the recursion.",
        "The count follows the Fibonacci sequence, which is a nice thing to notice.",
      ],
      javaToolkit: ["Backtracking with a constraint", "StringBuilder with undo", "Choice ordering fixes output order"],
    },
  },

  "generate-parenthesis": {
    slug: "generate-parenthesis",
    title: "Generate Parentheses",
    description:
      "Return every well-formed combination of n pairs of parentheses, in ascending lexicographic order.",
    constraints: ["1 ≤ n ≤ 8"],
    className: "Solution",
    methodName: "generateParenthesis",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> generateParenthesis(int n) {
        // Ascending lexicographic order.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 3 }, expectedOutput: ["((()))", "(()())", "(())()", "()(())", "()()()"] },
      { id: 2, inputs: { n: 1 }, expectedOutput: ["()"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 2 }, expectedOutput: ["(())", "()()"], isHidden: true },
      { id: 4, inputs: { n: 4 }, expectedOutput: ["(((())))", "((()()))", "((())())", "((()))()", "(()(()))", "(()()())", "(()())()", "(())(())", "(())()()", "()((()))", "()(()())", "()(())()", "()()(())", "()()()()"], isHidden: true },
    ],
    learn: {
      intuition:
        "Two simple rules keep every prefix valid: you may open while opens remain, and you may close only while closes used is below opens used. Because '(' sorts before ')', trying open first yields lexicographic order.",
      approach: [
        "Recurse carrying the counts of open and close brackets placed.",
        "Base case: the string reaches length 2n — record it.",
        "Try '(' when open < n, then ')' when close < open.",
      ],
      bruteForce: { idea: "Generate all 2^(2n) strings and validate each.", time: "O(2^(2n) × n)", space: "O(n)" },
      optimal: { idea: "Backtracking that only ever builds valid prefixes.", time: "O(4^n / √n)", space: "O(n)" },
      pitfalls: [
        "Using close < n rather than close < open produces invalid strings like ')('.",
        "Trying ')' before '(' gives the right set in the wrong order.",
        "The number of results is the nth Catalan number.",
      ],
      javaToolkit: ["Backtracking with two counters", "Prefix validity invariants", "Catalan numbers"],
    },
  },

  "print-subsequences": {
    slug: "print-subsequences",
    title: "Print All Subsequences (Power Set)",
    description:
      "Return every subsequence of the array. Order the result by the bitmask of chosen indices ascending, so the empty subsequence comes first and the full array last.",
    constraints: ["0 ≤ nums.length ≤ 16"],
    className: "Solution",
    methodName: "subsequences",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> subsequences(int[] nums) {
        // Ordered by the index bitmask ascending: [], [a], [b], [a,b], ...
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2] }, expectedOutput: [[], [1], [2], [1, 2]], explanation: "Masks 00, 01, 10, 11 — bit i means index i is chosen." },
      { id: 2, inputs: { nums: [3] }, expectedOutput: [[], [3]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [] }, expectedOutput: [[]], isHidden: true },
      { id: 4, inputs: { nums: [1, 2, 3] }, expectedOutput: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]], isHidden: true },
      { id: 5, inputs: { nums: [5, 5] }, expectedOutput: [[], [5], [5], [5, 5]], isHidden: true },
    ],
    learn: {
      intuition:
        "Every element is either in or out, so there are exactly 2^n subsequences and each corresponds to an n-bit mask. Iterating masks from 0 upwards gives a deterministic order without any recursion at all.",
      approach: [
        "Loop mask from 0 to 2^n - 1.",
        "For each mask, include index i whenever bit i is set.",
        "Collect the resulting lists in mask order.",
      ],
      bruteForce: { idea: "Recursive take/skip at each index.", time: "O(2^n × n)", space: "O(n)" },
      optimal: { idea: "Bitmask enumeration.", time: "O(2^n × n)", space: "O(1) beyond the output" },
      pitfalls: [
        "The empty subsequence counts and must appear first.",
        "Duplicate values produce duplicate subsequences here — this problem does not deduplicate.",
        "The recursive version is equally valid but must visit skip-then-take to match this order.",
      ],
      javaToolkit: ["Bitmask iteration", "(mask >> i) & 1", "1 << n for the count"],
    },
  },

  "subsequence-patterns": {
    slug: "subsequence-patterns",
    title: "Patterns of Subsequences",
    description:
      "The three standard subsequence recursions differ only in what they do with the answer: collect them all, count them, or stop at the first. Implement the counting form — return how many subsequences have a sum strictly greater than the target.",
    constraints: ["0 ≤ nums.length ≤ 20", "-1000 ≤ nums[i], target ≤ 1000"],
    className: "Solution",
    methodName: "countAboveTarget",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countAboveTarget(int[] nums, int target) {
        // Count subsequences whose sum is strictly greater than target.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3], target: 3 }, expectedOutput: 3, explanation: "[1,3], [2,3] and [1,2,3] sum to 4, 5 and 6." },
      { id: 2, inputs: { nums: [1], target: 0 }, expectedOutput: 1, explanation: "Only [1] beats 0; the empty subsequence sums to 0." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [], target: -1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1, 1], target: 5 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [-1, -2], target: -5 }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { nums: [5, 5], target: 5 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "All three subsequence patterns share one skeleton: at each index, take it or skip it. Collecting appends to a list at the base case, counting returns 1 or 0, and existence returns a boolean and short-circuits. Recognising the shared skeleton is the point of this problem.",
      approach: [
        "Recurse over the index carrying the running sum.",
        "Base case: past the last index — return 1 if the sum beats the target, otherwise 0.",
        "Return take + skip.",
      ],
      bruteForce: { idea: "Enumerate all 2^n subsequences and test each.", time: "O(2^n × n)", space: "O(n)" },
      optimal: { idea: "Count directly in the recursion, never materialising the subsequences.", time: "O(2^n)", space: "O(n)" },
      pitfalls: [
        "The empty subsequence has sum 0 and counts when the target is negative — a hidden case checks this.",
        "\"Strictly greater\" excludes equality. With [5,5] and target 5 the sums are 0, 5, 5 and 10, so only one subsequence counts.",
        "Building the actual lists just to count them wastes the whole optimisation.",
      ],
      javaToolkit: ["take / skip recursion", "Returning counts instead of lists", "The shared subsequence skeleton"],
    },
  },

  "count-subsequences-sum-k": {
    slug: "count-subsequences-sum-k",
    title: "Count All Subsequences With Sum K",
    description: "Return how many subsequences sum to exactly k.",
    constraints: ["0 ≤ nums.length ≤ 20", "-1000 ≤ nums[i], k ≤ 1000"],
    className: "Solution",
    methodName: "countSubsequences",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countSubsequences(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 1], k: 2 }, expectedOutput: 2, explanation: "[2] and [1,1]." },
      { id: 2, inputs: { nums: [1, 2, 3], k: 3 }, expectedOutput: 2, explanation: "[3] and [1,2]." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [], k: 0 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [0, 0], k: 0 }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { nums: [1, 1, 1], k: 2 }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { nums: [5], k: 9 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "The counting pattern again, with equality instead of a comparison. The interesting wrinkle is zeros: a zero can be taken or skipped without changing the sum, so it doubles the count of every matching subsequence.",
      approach: [
        "Recurse over the index carrying the running sum.",
        "Base case: past the end — return 1 when the sum equals k.",
        "Return take + skip.",
      ],
      optimal: { idea: "take/skip recursion returning counts.", time: "O(2^n)", space: "O(n)" },
      pitfalls: [
        "The empty subsequence sums to 0, so k = 0 always has at least one answer.",
        "[0,0] with k = 0 gives 4, not 1 — each zero independently doubles the count.",
        "Pruning on sum > k is only valid when every value is non-negative, which is not guaranteed here.",
      ],
      javaToolkit: ["take / skip recursion", "Counting at the base case", "Zero-handling in subset counts"],
    },
  },

  "exists-subsequence-sum-k": {
    slug: "exists-subsequence-sum-k",
    title: "Check if a Subsequence With Sum K Exists",
    description: "Return whether any subsequence sums to exactly k.",
    constraints: ["0 ≤ nums.length ≤ 20", "-1000 ≤ nums[i], k ≤ 1000"],
    className: "Solution",
    methodName: "existsSubsequence",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean existsSubsequence(int[] nums, int k) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3], k: 5 }, expectedOutput: true, explanation: "[2,3] works." },
      { id: 2, inputs: { nums: [1, 2], k: 7 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [], k: 0 }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { nums: [], k: 1 }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { nums: [-1, 1], k: 0 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { nums: [3], k: 3 }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "The third of the three patterns. Because you only need to know whether an answer exists, the recursion can stop the instant it finds one — the short-circuit is what distinguishes this from counting.",
      approach: [
        "Recurse over the index carrying the running sum.",
        "Base case: past the end — return whether the sum equals k.",
        "Return take, and only explore skip if take was false.",
      ],
      bruteForce: { idea: "Count every matching subsequence, then test for a non-zero count.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "take/skip recursion with an early return.", time: "O(2^n) worst case, often far less", space: "O(n)" },
      pitfalls: [
        "Writing `return take(...) || skip(...)` gets the short-circuit for free; computing both first throws it away.",
        "The empty subsequence means k = 0 is always true, even for an empty array.",
        "Negative values make sum-based pruning unsafe.",
      ],
      javaToolkit: ["Short-circuit ||", "Early return from recursion", "The existence pattern"],
    },
  },
}
