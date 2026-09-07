import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 3 — Arrays (partial).
 *
 * These nine had a harness before this file existed, but no description, no
 * learn content and, for most of them, no hidden cases. They are re-authored here
 * to the same standard as the rest rather than carried over as they were.
 * The remaining 31 problems in this step are still to be written.
 */
export const step03: Record<string, ProblemMetadata> = {
  "largest-element-array": {
    slug: "largest-element-array",
    title: "Largest Element in an Array",
    description:
      "Return the largest value in the array. One pass is enough: keep the best you have seen and replace it whenever you find something bigger.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "largest",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int largest(int[] arr) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 8, 7, 56, 90] }, expectedOutput: 90 },
      { id: 2, inputs: { arr: [5, 5, 5, 5] }, expectedOutput: 5, explanation: "All equal, so the maximum is that value." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [-10, -5, -2, -20] }, expectedOutput: -2, isHidden: true },
      { id: 4, inputs: { arr: [100] }, expectedOutput: 100, isHidden: true },
      { id: 5, inputs: { arr: [-1000000000, 1000000000] }, expectedOutput: 1000000000, isHidden: true },
    ],
    learn: {
      intuition:
        "You cannot know the maximum without looking at every element, so a single pass is already optimal. The only decision is what to start from.",
      approach: [
        "Start the running maximum at arr[0], not at 0.",
        "Walk the rest of the array, replacing it whenever you see something larger.",
        "Return it.",
      ],
      optimal: { idea: "One linear scan tracking the running maximum.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Initialising to 0 breaks on an all-negative array, which is exactly what one hidden case checks. Use arr[0] or Integer.MIN_VALUE.",
        "Sorting to grab the last element works but costs O(n log n) for no benefit.",
      ],
      javaToolkit: ["Math.max(a, b)", "Enhanced for loop: for (int x : arr)", "Integer.MIN_VALUE"],
    },
  },

  "second-largest-element": {
    slug: "second-largest-element",
    title: "Second Largest Element in an Array",
    description:
      "Return the second largest DISTINCT value in the array, or -1 when there is no such value. In [10, 10, 10] every element is the same, so the answer is -1.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "getSecondLargest",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int getSecondLargest(int[] arr) {
        // Return -1 when there is no second distinct value.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [12, 35, 1, 10, 34, 1] }, expectedOutput: 34, explanation: "35 is largest, 34 is next." },
      { id: 2, inputs: { arr: [10, 10, 10] }, expectedOutput: -1, explanation: "Only one distinct value exists." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1] }, expectedOutput: -1, isHidden: true },
      { id: 4, inputs: { arr: [2, 1] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { arr: [-5, -2, -2, -9] }, expectedOutput: -5, isHidden: true },
      { id: 6, inputs: { arr: [5, 5, 4] }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "Track the best two distinct values at once. The word \"distinct\" is what makes this more than a variation on finding the maximum — repeats of the largest must not become the runner-up.",
      approach: [
        "Keep largest and second, both starting at Integer.MIN_VALUE.",
        "For each value: if it beats largest, second becomes the old largest and largest becomes it.",
        "Otherwise, if it is smaller than largest but bigger than second, it becomes second. Equality with largest is skipped.",
        "Return -1 if second never moved.",
      ],
      bruteForce: { idea: "Sort descending and scan for the first different value.", time: "O(n log n)", space: "O(1)" },
      optimal: { idea: "One pass holding the top two distinct values.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Letting a duplicate of the largest become the second — the whole point of the [10,10,10] case.",
        "Returning Integer.MIN_VALUE instead of -1 when there is no answer.",
        "A single-element array has no second value.",
      ],
      javaToolkit: ["Tracking two running extremes", "Integer.MIN_VALUE as a sentinel", "Careful else-if ordering"],
    },
  },

  "check-sorted-array": {
    slug: "check-sorted-array",
    title: "Check if Array Is Sorted and Rotated",
    description:
      "Decide whether the array was originally sorted ascending and then rotated some number of positions. A plainly sorted array counts, since rotating by zero is allowed. Duplicates are permitted.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "check",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean check(int[] nums) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 4, 5, 1, 2] }, expectedOutput: true, explanation: "This is [1,2,3,4,5] rotated by three." },
      { id: 2, inputs: { nums: [2, 1, 3, 4] }, expectedOutput: false, explanation: "Two drops (2→1 and later ordering) mean no single rotation produces this." },
      { id: 3, inputs: { nums: [1, 2, 3] }, expectedOutput: true, explanation: "Already sorted — a rotation of zero." },
    ],
    hiddenTestCases: [
      { id: 4, inputs: { nums: [1] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { nums: [1, 1, 1] }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { nums: [2, 1] }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { nums: [1, 3, 2] }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Walk the array as if it were circular and count the places where a value is followed by a smaller one. A sorted array has none of these drops; a sorted-and-rotated one has exactly one, at the seam. Two or more and no rotation can explain it.",
      approach: [
        "Loop over every index i, comparing nums[i] with nums[(i + 1) % n].",
        "Count how many times the next value is strictly smaller.",
        "Return whether that count is at most 1.",
      ],
      optimal: { idea: "Count the descents around the circle.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Forgetting the wrap-around comparison between the last and first element, which is where the seam lives.",
        "Using >= instead of > when counting drops, which wrongly rejects arrays containing duplicates.",
      ],
      javaToolkit: ["Circular indexing with (i + 1) % n", "Counting inversions at adjacent positions"],
    },
  },

  "remove-duplicates-sorted": {
    slug: "remove-duplicates-sorted",
    title: "Remove Duplicates from Sorted Array",
    description:
      "The array is sorted ascending. Move the distinct values to the front, in order, and return how many there are. Whatever sits beyond that prefix does not matter.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums is sorted in non-decreasing order"],
    className: "Solution",
    methodName: "removeDuplicates",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Return the count of distinct values, having moved them to the front.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 1, 2] }, expectedOutput: 2, explanation: "Distinct values are 1 and 2." },
      { id: 2, inputs: { nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] }, expectedOutput: 5 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1, 1, 1, 1] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3, 4] }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { nums: [-3, -3, 0, 0, 7] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Because the array is sorted, every duplicate sits next to its twin. One pointer marks where the next unique value should be written, the other scans ahead looking for one.",
      approach: [
        "Keep a write index starting at 1 — the first element is always unique.",
        "Scan from index 1. Whenever nums[i] differs from nums[write - 1], copy it to nums[write] and advance write.",
        "Return write.",
      ],
      bruteForce: { idea: "Collect into a Set, then copy back.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Two pointers writing in place.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Comparing against nums[i - 1] instead of nums[write - 1]: after writes begin, those are different values.",
        "This only works because the input is sorted; on unsorted data it fails.",
      ],
      javaToolkit: ["Two-pointer read/write", "In-place array mutation"],
    },
  },

  "find-missing-number": {
    slug: "find-missing-number",
    title: "Missing Number",
    description:
      "The array holds n distinct values drawn from the range 0 to n, so exactly one is missing. Return it.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "All values are distinct and in the range 0..n"],
    className: "Solution",
    methodName: "missingNumber",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int missingNumber(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 0, 1] }, expectedOutput: 2, explanation: "n is 3, so 0..3 should appear; 2 does not." },
      { id: 2, inputs: { nums: [0, 1] }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [0] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] }, expectedOutput: 8, isHidden: true },
    ],
    learn: {
      intuition:
        "You know what the total should be, so subtract what it actually is. XOR gives the same answer with no risk of overflow at all, because every present value cancels itself out.",
      approach: [
        "Compute the expected total n * (n + 1) / 2.",
        "Subtract the actual sum of the array.",
        "The difference is the missing value.",
      ],
      bruteForce: { idea: "For each candidate 0..n, scan the array looking for it.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Expected sum minus actual sum, or XOR of indices and values.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "The expected sum overflows int for large n — compute it as a long.",
        "n is nums.length, not the largest value present.",
        "The missing value can be 0 or n itself, both of which are hidden cases here.",
      ],
      javaToolkit: ["n(n+1)/2", "XOR cancellation a ^ a == 0", "long for sums"],
    },
  },

  "kadanes-algorithm": {
    slug: "kadanes-algorithm",
    title: "Maximum Subarray Sum (Kadane's Algorithm)",
    description:
      "Return the largest sum obtainable from any contiguous, non-empty subarray. The array can be entirely negative, in which case the answer is the least negative single element.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
    className: "Solution",
    methodName: "maxSubArray",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxSubArray(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expectedOutput: 6, explanation: "[4, -1, 2, 1] sums to 6." },
      { id: 2, inputs: { nums: [1] }, expectedOutput: 1 },
      { id: 3, inputs: { nums: [5, 4, -1, 7, 8] }, expectedOutput: 23, explanation: "The whole array is best here." },
    ],
    hiddenTestCases: [
      { id: 4, inputs: { nums: [-1] }, expectedOutput: -1, isHidden: true },
      { id: 5, inputs: { nums: [-3, -2, -5] }, expectedOutput: -2, isHidden: true },
      { id: 6, inputs: { nums: [-2, -1] }, expectedOutput: -1, isHidden: true },
      { id: 7, inputs: { nums: [0, 0, 0] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "At each position ask one question: does the running sum help me, or is this element better off starting fresh? If what came before is negative it can only drag you down, so drop it.",
      approach: [
        "Set both current and best to nums[0].",
        "For each later element, current = max(element, current + element).",
        "Update best whenever current beats it, then return best.",
      ],
      bruteForce: { idea: "Sum every possible subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Kadane's: extend or restart at each step.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Initialising best to 0 returns 0 for an all-negative array, when the answer should be the largest single element. Three hidden cases check exactly this.",
        "Resetting current to 0 rather than to the element has the same failure.",
        "The subarray must be non-empty.",
      ],
      javaToolkit: ["Math.max", "Running accumulator", "Kadane's algorithm"],
    },
  },

  "stock-buy-sell": {
    slug: "stock-buy-sell",
    title: "Best Time to Buy and Sell Stock",
    description:
      "You may buy once and sell once, and you must sell after you buy. Return the greatest profit available, or 0 when no trade makes money.",
    constraints: ["1 ≤ prices.length ≤ 10^5", "0 ≤ prices[i] ≤ 10^4"],
    className: "Solution",
    methodName: "maxProfit",
    parameters: [{ name: "prices", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxProfit(int[] prices) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { prices: [7, 1, 5, 3, 6, 4] }, expectedOutput: 5, explanation: "Buy at 1, sell at 6." },
      { id: 2, inputs: { prices: [7, 6, 4, 3, 1] }, expectedOutput: 0, explanation: "Prices only fall, so the best move is not to trade." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { prices: [1] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { prices: [2, 2, 2] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { prices: [1, 10000] }, expectedOutput: 9999, isHidden: true },
      { id: 6, inputs: { prices: [3, 2, 6, 1, 4] }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "Selling on a given day is only ever as good as the cheapest day before it. So walk forward remembering the lowest price seen so far, and check what selling today would earn.",
      approach: [
        "Track the minimum price seen so far, starting at prices[0].",
        "For each later price, compute price - minSoFar and keep the best.",
        "Update minSoFar as you go, then return the best profit.",
      ],
      bruteForce: { idea: "Try every buy and sell pair.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "One pass tracking the running minimum.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Allowing a sell before the buy — updating the minimum before computing today's profit is what prevents it.",
        "Returning a negative number: no trade is always available, so the floor is 0.",
        "This is one transaction only, not the sum of every upward move.",
      ],
      javaToolkit: ["Math.min / Math.max", "Running minimum", "Single-pass greedy"],
    },
  },

  "two-sum": {
    slug: "two-sum",
    title: "Two Sum",
    description:
      "Return the indices of the two numbers that add up to the target. Exactly one answer exists, and you may not use the same element twice. Either order of the two indices is accepted.",
    constraints: ["2 ≤ nums.length ≤ 10^4", "-10^9 ≤ nums[i], target ≤ 10^9", "Exactly one valid answer exists"],
    className: "Solution",
    methodName: "twoSum",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: false },
    starterCode: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1], explanation: "nums[0] + nums[1] = 9." },
      { id: 2, inputs: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2], explanation: "Not [0, 0] — an element cannot pair with itself." },
      { id: 3, inputs: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1], explanation: "Equal values at different indices are fine." },
    ],
    hiddenTestCases: [
      { id: 4, inputs: { nums: [-1, -2, -3, -4, -5], target: -8 }, expectedOutput: [2, 4], isHidden: true },
      { id: 5, inputs: { nums: [0, 4, 3, 0], target: 0 }, expectedOutput: [0, 3], isHidden: true },
      { id: 6, inputs: { nums: [1000000000, 1000000000], target: 2000000000 }, expectedOutput: [0, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "For each number you need to know whether its complement has already appeared. A map of value to index answers that in constant time, so one pass is enough.",
      approach: [
        "Walk the array with an index.",
        "Look up target - nums[i] in the map; if it is there, return that index and i.",
        "Otherwise store nums[i] to i and continue.",
      ],
      bruteForce: { idea: "Check every pair with two nested loops.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "One pass with a value-to-index map.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Storing the current number before checking for its complement, which lets an element pair with itself.",
        "Sorting first destroys the original indices, which are what you have to return.",
        "target - nums[i] can overflow int when both are near the limits; compute it as a long.",
      ],
      javaToolkit: ["HashMap<Integer, Integer>", "map.containsKey / map.get", "new int[]{a, b}"],
    },
  },

  "sort-012": {
    slug: "sort-012",
    title: "Sort Colors (Sort 0s, 1s and 2s)",
    description:
      "The array contains only 0, 1 and 2. Sort it in place in a single pass, without counting occurrences first and without calling a library sort.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums[i] is 0, 1 or 2"],
    className: "Solution",
    methodName: "sortColors",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void sortColors(int[] nums) {
        // Sort in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 0, 2, 1, 1, 0] }, expectedOutput: [0, 0, 1, 1, 2, 2] },
      { id: 2, inputs: { nums: [2, 0, 1] }, expectedOutput: [0, 1, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [0] }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { nums: [2, 2, 2] }, expectedOutput: [2, 2, 2], isHidden: true },
      { id: 5, inputs: { nums: [1, 0] }, expectedOutput: [0, 1], isHidden: true },
      { id: 6, inputs: { nums: [2, 1, 0] }, expectedOutput: [0, 1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Keep three regions: settled zeros at the front, settled twos at the back, and the unexamined middle. Every element you look at gets sent to one of the three, so the middle shrinks to nothing in one pass.",
      approach: [
        "Set low = 0, mid = 0, high = n - 1.",
        "While mid <= high: a 0 swaps to low and advances both low and mid; a 1 just advances mid; a 2 swaps to high and decrements high ONLY.",
        "Not advancing mid after a swap with high is essential — the value you just pulled in has not been examined.",
      ],
      bruteForce: { idea: "Count 0s, 1s and 2s, then overwrite the array.", time: "O(n)", space: "O(1) but two passes" },
      optimal: { idea: "Dutch National Flag partitioning in one pass.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Advancing mid after swapping with high, which skips over an unexamined value.",
        "Using mid < high instead of <=, leaving the final element unsorted.",
        "Returning a new array — this method returns void and the judge inspects the array you were given.",
      ],
      javaToolkit: ["Three-pointer partitioning", "In-place swap", "Dutch National Flag algorithm"],
    },
  },
}
