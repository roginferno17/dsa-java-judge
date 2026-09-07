import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 9 — Monotonic stack (14).
 *
 * One idea underlies almost all of these: a stack kept in sorted order, where
 * popping is not a loss but the ANSWER for whatever gets popped. The element that
 * forced the pop is the next greater (or smaller) one, and each element enters and
 * leaves at most once, which is why an apparently nested loop is really O(n).
 */
export const step09Monotonic: Record<string, ProblemMetadata> = {
  "next-greater-element": {
    slug: "next-greater-element",
    title: "Next Greater Element",
    description:
      "For each position, return the first element to its RIGHT that is strictly greater than it, or -1 when there is none.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "nextGreater",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] nextGreater(int[] nums) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [4, 5, 2, 25] }, expectedOutput: [5, 25, 25, -1], explanation: "Nothing to the right of 25 is bigger, so it gets -1." },
      { id: 2, inputs: { nums: [13, 7, 6, 12] }, expectedOutput: [-1, 12, 12, -1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: [-1], isHidden: true },
      { id: 4, inputs: { nums: [5, 4, 3, 2, 1] }, expectedOutput: [-1, -1, -1, -1, -1], isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3, 4, 5] }, expectedOutput: [2, 3, 4, 5, -1], isHidden: true },
      { id: 6, inputs: { nums: [2, 2, 2] }, expectedOutput: [-1, -1, -1], isHidden: true },
      { id: 7, inputs: { nums: [-3, -1, -2] }, expectedOutput: [-1, -1, -1], isHidden: true },
    ],
    learn: {
      intuition:
        "Scanning right for each element is O(n²) and repeats work. Instead keep a stack of elements still WAITING for their answer, kept decreasing from the bottom. A new element resolves everything smaller than it in one go, and each element is pushed and popped at most once.",
      approach: [
        "Walk left to right with a stack of indices (or values).",
        "While the stack top is ≤ the current value, that element's answer is the current value — pop and record it.",
        "Push the current index. Anything left on the stack at the end gets -1.",
      ],
      bruteForce: { idea: "For each index, scan right until something bigger.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Monotonic decreasing stack, one pass.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "'Strictly greater' means equal values do NOT resolve each other — [2,2,2] is all -1. Use ≤ in the pop condition, not <.",
        "Pre-fill the answer with -1 so leftovers need no extra pass.",
        "-3, -1, -2 is a reminder that this is about order, not sign: -1 is greater than -3.",
      ],
      javaToolkit: ["Deque<Integer> of indices", "Arrays.fill for the -1 default", "Amortised O(n) from push-once/pop-once"],
    },
  },

  "next-greater-element-2": {
    slug: "next-greater-element-2",
    title: "Next Greater Element in a Circular Array",
    description:
      "The array is circular, so the search wraps past the end back to the start. For each position, return the first strictly greater element found going right, or -1 if none exists anywhere.",
    constraints: ["1 ≤ nums.length ≤ 10^4", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "nextGreaterCircular",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] nextGreaterCircular(int[] nums) {
        // The search wraps around the end.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 1] }, expectedOutput: [2, -1, 2], explanation: "The last 1 wraps around and finds the 2 at the front." },
      { id: 2, inputs: { nums: [5, 4, 3, 2, 1] }, expectedOutput: [-1, 5, 5, 5, 5], explanation: "Everything after the 5 wraps around to it." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: [-1], isHidden: true },
      { id: 4, inputs: { nums: [3, 3, 3] }, expectedOutput: [-1, -1, -1], isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3, 4, 3] }, expectedOutput: [2, 3, 4, -1, 4], isHidden: true },
      { id: 6, inputs: { nums: [100, 1, 11, 1, 120, 111, 123, 1, -1, -100] }, expectedOutput: [120, 11, 120, 120, 123, 123, -1, 100, 100, 100], isHidden: true },
    ],
    learn: {
      intuition:
        "Wrapping is just a second pass. Walking the indices twice — index % n — gives every element the chance to see everything that follows it around the circle, and the monotonic stack is otherwise unchanged.",
      approach: [
        "Loop i from 0 to 2n - 1, using nums[i % n].",
        "Run the same monotonic-stack rule, but only RECORD an answer for indices from the first pass.",
        "Only push during the first pass, so the second pass purely resolves leftovers.",
      ],
      bruteForce: { idea: "For each index, walk up to n - 1 steps around the circle.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Monotonic stack over a doubled index range.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Pushing during the second pass can produce answers that wrap more than a full turn.",
        "Physically doubling the array works but uses O(n) extra memory for nothing — i % n is enough.",
        "The global maximum is still -1: nothing anywhere is strictly greater.",
      ],
      javaToolkit: ["i % n for circular indexing", "A doubled loop bound", "Guarding writes to the first pass"],
    },
  },

  "next-smaller-element": {
    slug: "next-smaller-element",
    title: "Next Smaller Element",
    description:
      "For each position, return the first element to its RIGHT that is strictly smaller than it, or -1 when there is none.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "1 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "nextSmaller",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] nextSmaller(int[] nums) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [4, 8, 5, 2, 25] }, expectedOutput: [2, 5, 2, -1, -1] },
      { id: 2, inputs: { nums: [1, 2, 3] }, expectedOutput: [-1, -1, -1], explanation: "An increasing array never finds anything smaller ahead." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [7] }, expectedOutput: [-1], isHidden: true },
      { id: 4, inputs: { nums: [3, 2, 1] }, expectedOutput: [2, 1, -1], isHidden: true },
      { id: 5, inputs: { nums: [5, 5, 5] }, expectedOutput: [-1, -1, -1], isHidden: true },
      { id: 6, inputs: { nums: [11, 13, 21, 3] }, expectedOutput: [3, 3, 3, -1], isHidden: true },
    ],
    learn: {
      intuition:
        "Identical to next greater with the comparison flipped. The stack is kept INCREASING from the bottom, and a new element resolves everything larger than it.",
      approach: [
        "Walk left to right with a stack.",
        "While the stack top is ≥ the current value, its answer is the current value — pop and record.",
        "Push the current element; leftovers get -1.",
      ],
      bruteForce: { idea: "Scan right from each index.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Monotonic increasing stack.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "'Strictly smaller' means equals do not resolve — use ≥ in the pop condition.",
        "-1 is only a safe sentinel because the constraint keeps values positive; with negatives allowed you would need a different marker.",
        "Both variants are the same code with one comparison changed — worth noticing rather than memorising twice.",
      ],
      javaToolkit: ["Monotonic increasing stack", "Flipping the comparison", "Sentinel choice"],
    },
  },

  "number-of-nges": {
    slug: "number-of-nges",
    title: "Number of Next Greater Elements to the Right",
    description:
      "For each queried index, return how many elements strictly greater than nums[index] appear ANYWHERE to its right. Return one count per query, in query order.",
    constraints: ["1 ≤ nums.length ≤ 10^4", "1 ≤ queries.length ≤ 10^4", "0 ≤ queries[i] < nums.length"],
    className: "Solution",
    methodName: "countGreaterToRight",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "queries", type: "int[]" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] countGreaterToRight(int[] nums, int[] queries) {
        // Count ALL greater elements to the right, not just the first.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 4, 2, 7, 5, 8, 10, 6], queries: [0, 5] }, expectedOutput: [6, 1], explanation: "After index 0 (value 3) six values exceed it; after index 5 (value 8) only 10 does." },
      { id: 2, inputs: { nums: [1, 2, 3], queries: [0, 1, 2] }, expectedOutput: [2, 1, 0] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [5], queries: [0] }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { nums: [2, 2, 2], queries: [0, 1, 2] }, expectedOutput: [0, 0, 0], isHidden: true },
      { id: 5, inputs: { nums: [9, 1, 8, 2, 7], queries: [1, 3] }, expectedOutput: [3, 1], isHidden: true },
      { id: 6, inputs: { nums: [4, 3, 2, 1], queries: [0, 3] }, expectedOutput: [0, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "Despite the name this is NOT the monotonic-stack problem — it asks for a count of all greater elements, not the first one. A suffix scan answers every index in one pass, and the queries are then lookups.",
      approach: [
        "Precompute an answer for every index: walking right to left, count how many seen values exceed nums[i].",
        "The simple version is an O(n²) suffix count, which is fine at n = 10^4.",
        "For better asymptotics, walk right to left with a Fenwick tree over coordinate-compressed values, giving O(n log n).",
        "Answer each query by lookup.",
      ],
      bruteForce: { idea: "Scan the suffix for each query separately.", time: "O(q × n)", space: "O(1)" },
      optimal: { idea: "Precompute per index, then O(1) per query.", time: "O(n²) simple, O(n log n) with a BIT", space: "O(n)" },
      pitfalls: [
        "Reaching for the monotonic stack here gives the FIRST greater element, not the count — read the question, not the title.",
        "'Strictly greater' excludes equals, so [2,2,2] is all zeros.",
        "Answering each query independently rescans the same suffix repeatedly; precompute once.",
      ],
      javaToolkit: ["Suffix precomputation", "Fenwick tree with coordinate compression", "Reading the problem before pattern-matching it"],
    },
  },

  "trapping-rainwater": {
    slug: "trapping-rainwater",
    title: "Trapping Rain Water",
    description:
      "Each entry is the height of a bar of width 1. Return how many units of water are trapped between the bars after it rains.",
    constraints: ["1 ≤ height.length ≤ 2 × 10^4", "0 ≤ height[i] ≤ 10^5"],
    className: "Solution",
    methodName: "trap",
    parameters: [{ name: "height", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int trap(int[] height) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }, expectedOutput: 6, explanation: "The dips between the taller bars hold six units in total." },
      { id: 2, inputs: { height: [4, 2, 0, 3, 2, 5] }, expectedOutput: 9 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { height: [1] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { height: [1, 2, 3, 4] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { height: [5, 0, 5] }, expectedOutput: 5, isHidden: true },
      { id: 6, inputs: { height: [0, 0, 0] }, expectedOutput: 0, isHidden: true },
      { id: 7, inputs: { height: [3, 0, 0, 2, 0, 4] }, expectedOutput: 10, isHidden: true },
    ],
    learn: {
      intuition:
        "Think column by column rather than about pools. The water above one bar is bounded by the tallest bar to its left and the tallest to its right — specifically min(leftMax, rightMax) - height[i], and never less than zero.",
      approach: [
        "Two pointers from both ends, tracking leftMax and rightMax.",
        "Move whichever side is SHORTER: that side's max is the binding constraint, so its water is already determined.",
        "Add max(0, thatMax - height[pointer]) and advance.",
      ],
      bruteForce: { idea: "Scan both directions from every index for its maxima.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Two pointers with running maxima.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Moving the taller side is the classic error: its max is not yet known to be binding, so the water there is not settled.",
        "Prefix and suffix max arrays give the same answer in O(n) time and O(n) space — a good stepping stone.",
        "A monotonic stack also solves it, filling horizontal layers instead of columns.",
      ],
      javaToolkit: ["Two pointers", "Running leftMax and rightMax", "Prefix/suffix max arrays as the intermediate version"],
    },
  },

  "sum-subarray-min": {
    slug: "sum-subarray-min",
    title: "Sum of Subarray Minimums",
    description:
      "Return the sum of the minimum of every contiguous subarray, modulo 1_000_000_007.",
    constraints: ["1 ≤ nums.length ≤ 3 × 10^4", "1 ≤ nums[i] ≤ 3 × 10^4"],
    className: "Solution",
    methodName: "sumSubarrayMins",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int sumSubarrayMins(int[] nums) {
        // Answer modulo 1000000007.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 1, 2, 4] }, expectedOutput: 17, explanation: "The ten subarray minima are 3,1,2,4,1,1,2,1,1,1 — summing to 17." },
      { id: 2, inputs: { nums: [11, 81, 94, 43, 3] }, expectedOutput: 444 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [2, 2] }, expectedOutput: 6, isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3, 4, 5] }, expectedOutput: 35, isHidden: true },
      { id: 6, inputs: { nums: [5, 4, 3, 2, 1] }, expectedOutput: 35, isHidden: true },
      { id: 7, inputs: { nums: [30000, 30000, 30000] }, expectedOutput: 180000, isHidden: true },
    ],
    learn: {
      intuition:
        "Flip the question: instead of asking each subarray for its minimum, ask each ELEMENT how many subarrays it is the minimum of. If it can extend l positions left and r positions right before meeting something smaller, that is l × r subarrays, and it contributes value × l × r.",
      approach: [
        "For each index find the previous smaller element and the next smaller one, with two monotonic stacks.",
        "Left span is i - prevSmaller, right span is nextSmaller - i.",
        "Accumulate nums[i] × left × right modulo the prime.",
      ],
      bruteForce: { idea: "Enumerate every subarray and take its minimum.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Contribution counting with previous/next smaller.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Duplicates get double-counted unless the two boundaries break ties differently — use strictly smaller on one side and smaller-or-equal on the other. [2,2] is exactly this test: the answer is 6, not 8.",
        "The product can exceed int before the modulo, so accumulate in long.",
        "The same technique with next/previous GREATER gives the sum of subarray maximums, which the next problem needs.",
      ],
      javaToolkit: ["Previous smaller / next smaller element", "Contribution counting", "Asymmetric tie-breaking for duplicates"],
    },
  },

  "sum-subarray-ranges": {
    slug: "sum-subarray-ranges",
    title: "Sum of Subarray Ranges",
    description:
      "The range of a subarray is its largest element minus its smallest. Return the sum of the ranges of every contiguous subarray.",
    constraints: ["1 ≤ nums.length ≤ 1000", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "subArrayRanges",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "long",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public long subArrayRanges(int[] nums) {
        // The answer does not fit an int.
        return 0L;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3] }, expectedOutput: 4, explanation: "Single elements contribute 0; [1,2] and [2,3] contribute 1 each; [1,2,3] contributes 2." },
      { id: 2, inputs: { nums: [4, -2, -3, 4, 1] }, expectedOutput: 59 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [3, 3, 3] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [1, 3, 3] }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { nums: [-1000000000, 1000000000] }, expectedOutput: 2000000000, isHidden: true },
      { id: 7, inputs: { nums: [5, 4, 3, 2, 1] }, expectedOutput: 20, isHidden: true },
    ],
    learn: {
      intuition:
        "Sum of (max - min) over all subarrays splits cleanly into (sum of all maxima) minus (sum of all minima). Each half is the previous problem's contribution-counting technique, run with the comparison flipped.",
      approach: [
        "Compute the sum of subarray maximums by contribution, using previous/next greater elements.",
        "Compute the sum of subarray minimums the same way with previous/next smaller.",
        "Subtract. Accumulate in long throughout — no modulo here.",
      ],
      bruteForce: { idea: "For each start, extend right tracking the running max and min.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Two contribution passes.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The result overflows int easily — the return type is long for a reason, and one hidden case reaches 2 × 10^9.",
        "Duplicates need the same asymmetric tie-breaking as the previous problem, in BOTH passes.",
        "At n = 1000 the O(n²) version is only 5 × 10^5 steps and passes; the stack version is the point, not the necessity.",
      ],
      javaToolkit: ["Splitting into max-sum minus min-sum", "long accumulation", "Reusing contribution counting"],
    },
  },

  "asteroid-collision": {
    slug: "asteroid-collision",
    title: "Asteroid Collision",
    description:
      "Each value is an asteroid: its magnitude is the size and its sign the direction, positive moving right and negative moving left. Two colliding asteroids destroy the smaller one, and both if they are equal in size. Asteroids moving the same way never meet. Return the surviving asteroids, in order.",
    constraints: ["1 ≤ asteroids.length ≤ 10^4", "-1000 ≤ asteroids[i] ≤ 1000", "asteroids[i] is never 0"],
    className: "Solution",
    methodName: "asteroidCollision",
    parameters: [{ name: "asteroids", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { asteroids: [5, 10, -5] }, expectedOutput: [5, 10], explanation: "-5 meets 10 and loses; 5 and 10 both move right so they never meet." },
      { id: 2, inputs: { asteroids: [8, -8] }, expectedOutput: [], explanation: "Equal sizes destroy each other." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { asteroids: [10, 2, -5] }, expectedOutput: [10], isHidden: true },
      { id: 4, inputs: { asteroids: [-2, -1, 1, 2] }, expectedOutput: [-2, -1, 1, 2], isHidden: true },
      { id: 5, inputs: { asteroids: [1, -2, -2, -2] }, expectedOutput: [-2, -2, -2], isHidden: true },
      { id: 6, inputs: { asteroids: [1] }, expectedOutput: [1], isHidden: true },
      { id: 7, inputs: { asteroids: [-2, 2, 1, -2] }, expectedOutput: [-2], isHidden: true },
    ],
    learn: {
      intuition:
        "A collision happens only when a right-mover is immediately followed by a left-mover. The right-movers still in play are exactly the stack top, so pushing survivors onto a stack and resolving each incoming left-mover against it handles every chain reaction naturally.",
      approach: [
        "Push right-movers (positive values) straight onto the stack.",
        "For a left-mover, while the top is a right-mover smaller than it, pop; that asteroid is destroyed.",
        "If the top is equal in size, pop it and destroy the incoming one too. If the top is bigger, only the incoming one dies.",
        "If the stack empties or its top is another left-mover, the incoming asteroid survives and is pushed.",
      ],
      bruteForce: { idea: "Repeatedly rescan the array resolving one collision at a time.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "One stack pass.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The equal-size case destroys BOTH — easy to write as one survivor.",
        "After a left-mover destroys the top it may collide with the next one down; that is a loop, not a single check.",
        "[-2,-1,1,2] has no collisions at all: left-movers at the front are already leaving.",
      ],
      javaToolkit: ["Deque<Integer> as a stack", "Sign as direction", "Loop-then-decide control flow"],
    },
  },

  "remove-k-digits": {
    slug: "remove-k-digits",
    title: "Remove K Digits",
    description:
      "Remove exactly k digits from the non-negative integer given as a string so the remaining digits form the smallest possible number. Return it without leading zeros; if nothing is left, return \"0\".",
    constraints: ["1 ≤ num.length ≤ 10^5", "0 ≤ k ≤ num.length", "num has no leading zeros unless it is \"0\""],
    className: "Solution",
    methodName: "removeKdigits",
    parameters: [
      { name: "num", type: "String" },
      { name: "k", type: "int" },
    ],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public String removeKdigits(String num, int k) {
        // Strip leading zeros; return "0" when nothing is left.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { num: "1432219", k: 3 }, expectedOutput: "1219", explanation: "Removing 4, 3 and 2 leaves the smallest arrangement." },
      { id: 2, inputs: { num: "10200", k: 1 }, expectedOutput: "200", explanation: "Removing the 1 exposes a leading zero, which is stripped." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { num: "10", k: 2 }, expectedOutput: "0", isHidden: true },
      { id: 4, inputs: { num: "9", k: 1 }, expectedOutput: "0", isHidden: true },
      { id: 5, inputs: { num: "112", k: 1 }, expectedOutput: "11", isHidden: true },
      { id: 6, inputs: { num: "1234567890", k: 9 }, expectedOutput: "0", isHidden: true },
      { id: 7, inputs: { num: "12345", k: 0 }, expectedOutput: "12345", isHidden: true },
    ],
    learn: {
      intuition:
        "The leftmost digits dominate the value, so a digit should be removed the moment a smaller one follows it. Scanning left to right and popping any larger digit off a stack builds the smallest possible sequence greedily.",
      approach: [
        "Keep a stack of kept digits. For each incoming digit, pop while the top is larger and removals remain.",
        "Push the digit.",
        "If removals remain at the end, drop from the back — the sequence is now non-decreasing, so the largest digits are last.",
        "Strip leading zeros; return \"0\" if the result is empty.",
      ],
      bruteForce: { idea: "Try every combination of k removals.", time: "exponential", space: "O(n)" },
      optimal: { idea: "Greedy monotonic non-decreasing stack.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Leftover removals at the end must come off the BACK, not the front — \"12345\" with k = 2 gives \"123\".",
        "Leading zeros must be stripped after removal, which \"10200\" checks.",
        "Removing every digit yields \"0\", not an empty string.",
      ],
      javaToolkit: ["StringBuilder as a stack", "Greedy exchange argument", "Trailing removals and leading-zero cleanup"],
    },
  },

  "largest-rectangle-histogram": {
    slug: "largest-rectangle-histogram",
    title: "Largest Rectangle in a Histogram",
    description:
      "Each entry is the height of a bar of width 1. Return the area of the largest axis-aligned rectangle that fits inside the histogram.",
    constraints: ["1 ≤ heights.length ≤ 10^5", "0 ≤ heights[i] ≤ 10^4"],
    className: "Solution",
    methodName: "largestRectangleArea",
    parameters: [{ name: "heights", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int largestRectangleArea(int[] heights) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { heights: [2, 1, 5, 6, 2, 3] }, expectedOutput: 10, explanation: "The bars of height 5 and 6 together give 5 × 2 = 10." },
      { id: 2, inputs: { heights: [2, 4] }, expectedOutput: 4 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { heights: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { heights: [0] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { heights: [3, 3, 3, 3] }, expectedOutput: 12, isHidden: true },
      { id: 6, inputs: { heights: [1, 2, 3, 4, 5] }, expectedOutput: 9, isHidden: true },
      { id: 7, inputs: { heights: [5, 4, 3, 2, 1] }, expectedOutput: 9, isHidden: true },
    ],
    learn: {
      intuition:
        "Every maximal rectangle is limited by some bar's height, so ask each bar how far it can stretch. It extends until it meets something shorter on either side — previous smaller and next smaller again, and the width between them times the height is that bar's best rectangle.",
      approach: [
        "Walk left to right with a stack of increasing heights, holding indices.",
        "When the current bar is shorter than the top, pop it: the current index is its next smaller, and the new top is its previous smaller.",
        "Area is height × (right - left - 1). Flush the stack at the end with a right boundary of n.",
      ],
      bruteForce: { idea: "For every pair of boundaries, take the minimum height.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "One monotonic increasing stack.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The width is right - left - 1, not right - left — an off-by-one that silently inflates every area.",
        "Bars still on the stack at the end must be flushed with n as their right boundary.",
        "A sentinel 0 appended to the input removes the flush as a special case, which is worth doing.",
      ],
      javaToolkit: ["Monotonic increasing stack of indices", "Sentinel bar", "Width as right - left - 1"],
    },
  },

  "maximal-rectangles": {
    slug: "maximal-rectangles",
    title: "Maximal Rectangle",
    description:
      "Given a binary matrix of 0s and 1s, return the area of the largest rectangle containing only 1s.",
    constraints: ["1 ≤ rows, cols ≤ 200", "matrix[i][j] is 0 or 1"],
    className: "Solution",
    methodName: "maximalRectangle",
    parameters: [{ name: "matrix", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int maximalRectangle(int[][] matrix) {
        return 0;
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { matrix: [[1, 0, 1, 0, 0], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 0, 1, 0]] },
        expectedOutput: 6,
        explanation: "Rows 1 and 2, columns 2 to 4, form a 2 × 3 block of ones.",
      },
      { id: 2, inputs: { matrix: [[0]] }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[1]] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { matrix: [[1, 1], [1, 1]] }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { matrix: [[0, 0], [0, 0]] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { matrix: [[1, 0, 1], [1, 1, 1], [1, 1, 1]] }, expectedOutput: 6, isHidden: true },
      { id: 7, inputs: { matrix: [[1, 1, 1, 1]] }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "Treat each row as the ground line of a histogram whose bar heights are the runs of consecutive 1s ending at that row. The best rectangle with its bottom on that row is then exactly the previous problem's answer, so the matrix reduces to a stack of histograms.",
      approach: [
        "Keep a heights array across rows.",
        "For each row: a 1 increments that column's height, a 0 resets it to 0.",
        "Run largest-rectangle-in-histogram on the updated heights and keep the maximum.",
      ],
      bruteForce: { idea: "Try every pair of corners and verify the block is all ones.", time: "O(r² c²)", space: "O(1)" },
      optimal: { idea: "Row-by-row histogram reduction.", time: "O(r × c)", space: "O(c)" },
      pitfalls: [
        "A 0 must RESET the height to zero, not decrement it — the run must be unbroken.",
        "The histogram must be evaluated for every row, since the best rectangle can end anywhere.",
        "This depends on largest-rectangle-histogram being correct, off-by-one included; get that right first.",
      ],
      javaToolkit: ["Reducing 2D to repeated 1D", "Running column heights", "Reusing a solved subproblem"],
    },
  },

  "sliding-window-max": {
    slug: "sliding-window-max",
    title: "Sliding Window Maximum",
    description: "Return the maximum of every contiguous window of size k, left to right.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "1 ≤ k ≤ nums.length", "-10^4 ≤ nums[i] ≤ 10^4"],
    className: "Solution",
    methodName: "maxSlidingWindow",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 }, expectedOutput: [3, 3, 5, 5, 6, 7] },
      { id: 2, inputs: { nums: [1], k: 1 }, expectedOutput: [1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 2, 3, 4], k: 4 }, expectedOutput: [4], isHidden: true },
      { id: 4, inputs: { nums: [4, 3, 2, 1], k: 2 }, expectedOutput: [4, 3, 2], isHidden: true },
      { id: 5, inputs: { nums: [-1, -2, -3], k: 2 }, expectedOutput: [-1, -2], isHidden: true },
      { id: 6, inputs: { nums: [2, 2, 2, 2], k: 2 }, expectedOutput: [2, 2, 2], isHidden: true },
      { id: 7, inputs: { nums: [7, 2, 4], k: 2 }, expectedOutput: [7, 4], isHidden: true },
    ],
    learn: {
      intuition:
        "An element can never be the answer again once a LATER, LARGER element appears — it is both older and smaller. Discarding those permanently leaves a deque of decreasing candidates whose front is always the current maximum.",
      approach: [
        "Keep a deque of indices with decreasing values.",
        "Before pushing i, pop from the BACK while those values are ≤ nums[i]; they can never win again.",
        "Pop from the FRONT when its index falls outside the window.",
        "Once i ≥ k - 1, the front is that window's maximum.",
      ],
      bruteForce: { idea: "Scan each window of size k.", time: "O(n × k)", space: "O(1)" },
      optimal: { idea: "Monotonic decreasing deque.", time: "O(n)", space: "O(k)" },
      pitfalls: [
        "Store INDICES, not values — expiry is decided by position.",
        "A heap gives O(n log n) and needs lazy deletion; the deque is both faster and simpler.",
        "The two pops are at opposite ends: expiry at the front, dominated candidates at the back.",
      ],
      javaToolkit: ["ArrayDeque as a double-ended queue", "pollFirst / pollLast / peekFirst", "Storing indices for expiry"],
    },
  },

  "stock-span": {
    slug: "stock-span",
    title: "Stock Span Problem",
    description:
      "The span of a day is the number of consecutive days up to and including it on which the price was less than or equal to that day's price. Return the span for every day.",
    constraints: ["1 ≤ prices.length ≤ 10^5", "1 ≤ prices[i] ≤ 10^5"],
    className: "Solution",
    methodName: "stockSpan",
    parameters: [{ name: "prices", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] stockSpan(int[] prices) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { prices: [100, 80, 60, 70, 60, 75, 85] }, expectedOutput: [1, 1, 1, 2, 1, 4, 6], explanation: "On the day priced 75, the previous three days were all at or below it." },
      { id: 2, inputs: { prices: [10, 4, 5, 90, 120, 80] }, expectedOutput: [1, 1, 2, 4, 5, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { prices: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { prices: [5, 5, 5] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 5, inputs: { prices: [1, 2, 3, 4] }, expectedOutput: [1, 2, 3, 4], isHidden: true },
      { id: 6, inputs: { prices: [4, 3, 2, 1] }, expectedOutput: [1, 1, 1, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "The span ends at the first STRICTLY GREATER price to the left, so this is previous-greater-element wearing a different hat. Once you have that index, the span is just the distance to it.",
      approach: [
        "Keep a stack of indices with decreasing prices.",
        "Pop while the top's price is ≤ today's — those days are inside today's span.",
        "Span is i - stackTop, or i + 1 when the stack empties. Push i.",
      ],
      bruteForce: { idea: "Walk backwards from each day.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Monotonic decreasing stack of indices.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The comparison is ≤, since equal prices are inside the span — [5,5,5] gives [1,2,3], not all ones.",
        "An empty stack means every earlier day qualifies, so the span is i + 1.",
        "The span counts today itself, so it is never 0.",
      ],
      javaToolkit: ["Previous greater element", "Stack of indices", "Distance as the answer"],
    },
  },

  "celebrity-problem": {
    slug: "celebrity-problem",
    title: "The Celebrity Problem",
    description:
      "In a party of n people, m[i][j] is 1 when person i knows person j. A celebrity is known by everyone else and knows nobody. Return their index, or -1 if there is none. The diagonal is always 0.",
    constraints: ["1 ≤ n ≤ 3000", "m[i][j] is 0 or 1", "m[i][i] is 0"],
    className: "Solution",
    methodName: "findCelebrity",
    parameters: [{ name: "m", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int findCelebrity(int[][] m) {
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { m: [[0, 1, 0], [0, 0, 0], [0, 1, 0]] }, expectedOutput: 1, explanation: "Person 1 knows nobody and both others know them." },
      { id: 2, inputs: { m: [[0, 1], [1, 0]] }, expectedOutput: -1, explanation: "Each knows the other, so neither qualifies." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { m: [[0]] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { m: [[0, 0], [0, 0]] }, expectedOutput: -1, isHidden: true },
      { id: 5, inputs: { m: [[0, 1, 1], [0, 0, 1], [0, 0, 0]] }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { m: [[0, 1, 0], [0, 0, 1], [1, 0, 0]] }, expectedOutput: -1, isHidden: true },
    ],
    learn: {
      intuition:
        "Every question eliminates someone. If a knows b then a is not the celebrity; if a does not know b then b is not. So one pass with two pointers — or a stack of candidates — leaves a single survivor, who then only needs verifying.",
      approach: [
        "Two pointers at 0 and n - 1. If m[i][j] is 1, i is out and i moves; otherwise j is out and j moves.",
        "The survivor is the only possible celebrity.",
        "Verify: their whole row is 0 and their whole column is 1 apart from the diagonal. If not, return -1.",
      ],
      bruteForce: { idea: "Check the row and column of every person.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Elimination to one candidate, then verify.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "The verification is mandatory — elimination only proves nobody ELSE can be the celebrity, not that the survivor is one. Case 4, where nobody knows anybody, is exactly this trap.",
        "n = 1 makes person 0 a celebrity by definition: they know nobody, and there is nobody to know them.",
        "The diagonal must be skipped during verification.",
      ],
      javaToolkit: ["Two-pointer elimination", "Verify-the-candidate", "Why elimination alone is not a proof"],
    },
  },
}
