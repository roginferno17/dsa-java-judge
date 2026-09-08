import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 3 — Hard array problems (9).
 *
 * Three of these (count inversions, reverse pairs, merge without extra space)
 * are really sorting algorithms wearing a disguise, and two more are prefix-sum
 * problems with a twist. The notes point that out rather than treating each as
 * unrelated.
 */
export const step03Hard: Record<string, ProblemMetadata> = {
  "four-sum": {
    slug: "four-sum",
    title: "4-Sum",
    description:
      "Return every unique quadruplet summing to the target. Sort each quadruplet ascending, and return the quadruplets in ascending lexicographic order.",
    constraints: ["1 ≤ nums.length ≤ 200", "-10^9 ≤ nums[i], target ≤ 10^9"],
    className: "Solution",
    methodName: "fourSum",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        // Each quadruplet ascending; quadruplets in lexicographic order.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 0, -1, 0, -2, 2], target: 0 }, expectedOutput: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]] },
      { id: 2, inputs: { nums: [2, 2, 2, 2, 2], target: 8 }, expectedOutput: [[2, 2, 2, 2]], explanation: "Only one distinct quadruplet, despite many index choices." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 2, 3], target: 6 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { nums: [0, 0, 0, 0], target: 0 }, expectedOutput: [[0, 0, 0, 0]], isHidden: true },
      { id: 5, inputs: { nums: [1000000000, 1000000000, 1000000000, 1000000000], target: 0 }, expectedOutput: [], isHidden: true },
      { id: 6, inputs: { nums: [-3, -1, 0, 2, 4, 5], target: 2 }, expectedOutput: [[-3, -1, 2, 4]], isHidden: true },
    ],
    learn: {
      intuition:
        "3-Sum with one more layer. Fix two elements with nested loops, then run the same two-pointer sweep over the remainder. The extra difficulty is entirely in overflow and duplicate handling.",
      approach: [
        "Sort the array.",
        "Two nested loops choose the first and second elements, each skipping repeats of the previous value.",
        "Two pointers close in on the rest, comparing against target minus the two fixed values.",
        "Skip duplicates on both pointers after recording a hit.",
      ],
      bruteForce: { idea: "Four nested loops with a set.", time: "O(n⁴)", space: "O(n)" },
      optimal: { idea: "Sort, fix two, two-pointer the rest.", time: "O(n³)", space: "O(1) beyond the output" },
      pitfalls: [
        "Four values near 10^9 sum to 4 × 10^9, which overflows int. Accumulate in a long — the all-max hidden case exists for this.",
        "Duplicates must be skipped at all four positions, not just the outer loop.",
        "Sorting is what makes the required output order fall out naturally.",
      ],
      javaToolkit: ["long for the running sum", "Nested loops plus two pointers", "Duplicate skipping at every level"],
    },
  },

  "largest-subarray-0-sum": {
    slug: "largest-subarray-0-sum",
    title: "Largest Subarray With Sum Zero",
    description:
      "Return the length of the longest contiguous subarray summing to zero, or 0 if none exists.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "maxLen",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int maxLen(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [9, -3, 3, -1, 6, -5] }, expectedOutput: 5, explanation: "[-3,3,-1,6,-5] sums to zero." },
      { id: 2, inputs: { nums: [1, 2, 3] }, expectedOutput: 0, explanation: "No zero-sum subarray exists." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [0] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1, -1] }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { nums: [0, 0, 0] }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { nums: [1, 2, -3, 4] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "The same prefix-sum machinery as longest-subarray-with-sum-k, specialised to k = 0. Two positions with the same prefix sum mean everything between them cancels out.",
      approach: [
        "Walk the array keeping a running prefix sum.",
        "Store the FIRST index at which each prefix value appears, seeded with 0 at index -1.",
        "When a prefix repeats, the span from just after its first occurrence to here sums to zero.",
      ],
      bruteForce: { idea: "Sum every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Prefix sums with earliest-index storage.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Overwriting an existing prefix loses the earliest index and shortens the answer.",
        "The {0: -1} seed is what lets a subarray starting at index 0 be found.",
        "Prefix sums need long at these magnitudes.",
      ],
      javaToolkit: ["Prefix sums", "putIfAbsent", "HashMap<Long, Integer>"],
    },
  },

  "count-subarrays-xor-k": {
    slug: "count-subarrays-xor-k",
    title: "Count Subarrays With XOR K",
    description: "Return how many contiguous subarrays have a bitwise XOR of exactly k.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "0 ≤ nums[i], k ≤ 10^9"],
    className: "Solution",
    methodName: "countXorSubarrays",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int countXorSubarrays(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [4, 2, 2, 6, 4], k: 6 }, expectedOutput: 4, explanation: "[4,2], [4,2,2,6,4], [2,2,6] and [6] all XOR to 6." },
      { id: 2, inputs: { nums: [5, 6, 7, 8, 9], k: 5 }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [0, 0], k: 0 }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3], k: 0 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [4, 2, 2, 6, 4], k: 0 }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "XOR behaves like addition for this purpose: prefix[j] XOR prefix[i] gives the XOR of the range between them. So a subarray ending here has XOR k exactly when some earlier prefix equals prefix XOR k — because XOR is its own inverse.",
      approach: [
        "Keep a map from prefix XOR to occurrence count, seeded with 0 mapped to 1.",
        "Maintain a running XOR as you scan.",
        "Add the stored count of (prefix XOR k) to the answer, then record the current prefix.",
      ],
      bruteForce: { idea: "XOR every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Prefix XOR with occurrence counts.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Looking up prefix - k instead of prefix ^ k — XOR has no subtraction, it undoes itself.",
        "The {0: 1} seed is needed for subarrays starting at index 0; [1,2,3] with k=0 depends on it.",
        "Counts, not first indices — this counts subarrays rather than measuring one.",
      ],
      javaToolkit: ["Prefix XOR", "a ^ a == 0 and a ^ 0 == a", "HashMap occurrence counts"],
    },
  },

  "merge-overlapping-intervals": {
    slug: "merge-overlapping-intervals",
    title: "Merge Overlapping Intervals",
    description:
      "Merge every set of overlapping intervals and return the result sorted ascending by start. Intervals touching at an endpoint, such as [1,4] and [4,5], count as overlapping.",
    constraints: ["1 ≤ intervals.length ≤ 10^4", "0 ≤ start ≤ end ≤ 10^4"],
    className: "Solution",
    methodName: "merge",
    parameters: [{ name: "intervals", type: "int[][]" }],
    returnType: "int[][]",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        return new int[0][0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] }, expectedOutput: [[1, 6], [8, 10], [15, 18]], explanation: "[1,3] and [2,6] overlap and become [1,6]." },
      { id: 2, inputs: { intervals: [[1, 4], [4, 5]] }, expectedOutput: [[1, 5]], explanation: "Touching endpoints count as overlapping." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { intervals: [[1, 4]] }, expectedOutput: [[1, 4]], isHidden: true },
      { id: 4, inputs: { intervals: [[1, 4], [0, 4]] }, expectedOutput: [[0, 4]], isHidden: true },
      { id: 5, inputs: { intervals: [[1, 4], [2, 3]] }, expectedOutput: [[1, 4]], isHidden: true },
      { id: 6, inputs: { intervals: [[5, 6], [1, 2], [3, 4]] }, expectedOutput: [[1, 2], [3, 4], [5, 6]], isHidden: true },
    ],
    learn: {
      intuition:
        "Once the intervals are sorted by start, any interval can only overlap the one immediately before it in the output. That reduces the whole problem to a single sweep.",
      approach: [
        "Sort the intervals by start.",
        "Walk them keeping the current merged interval.",
        "If the next start is at most the current end, extend the end to the maximum of the two; otherwise emit the current one and start a new one.",
      ],
      bruteForce: { idea: "Repeatedly scan for any overlapping pair and merge it.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Sort by start, then sweep.", time: "O(n log n)", space: "O(n) for the output" },
      pitfalls: [
        "Fully nested intervals like [1,4] and [2,3] must not shrink the end — take the maximum.",
        "Using < instead of <= when testing overlap leaves touching intervals unmerged.",
        "Forgetting to emit the final interval after the loop.",
      ],
      javaToolkit: ["Arrays.sort with a Comparator", "Comparator.comparingInt", "Sweep line over sorted intervals"],
    },
  },

  "merge-sorted-arrays": {
    slug: "merge-sorted-arrays",
    title: "Merge Two Sorted Arrays In Place",
    description:
      "a has length m + n, with its first m slots filled and the rest zeroed as padding. b holds n values. Merge b into a so that a ends up sorted, modifying a in place.",
    constraints: ["0 ≤ m, n ≤ 200", "a.length == m + n", "Both filled regions are sorted ascending"],
    className: "Solution",
    methodName: "merge",
    parameters: [
      { name: "a", type: "int[]" },
      { name: "m", type: "int" },
      { name: "b", type: "int[]" },
      { name: "n", type: "int" },
    ],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void merge(int[] a, int m, int[] b, int n) {
        // Merge into a. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: [1, 2, 3, 0, 0, 0], m: 3, b: [2, 5, 6], n: 3 }, expectedOutput: [1, 2, 2, 3, 5, 6] },
      { id: 2, inputs: { a: [1], m: 1, b: [], n: 0 }, expectedOutput: [1], explanation: "Nothing to merge." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: [0], m: 0, b: [1], n: 1 }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { a: [4, 5, 6, 0, 0, 0], m: 3, b: [1, 2, 3], n: 3 }, expectedOutput: [1, 2, 3, 4, 5, 6], isHidden: true },
      { id: 5, inputs: { a: [2, 0], m: 1, b: [1], n: 1 }, expectedOutput: [1, 2], isHidden: true },
      { id: 6, inputs: { a: [1, 1, 0, 0], m: 2, b: [1, 1], n: 2 }, expectedOutput: [1, 1, 1, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Merging forwards would overwrite values in a that you still need. Merging BACKWARDS writes only into the padding, which is by definition free space.",
      approach: [
        "Set three pointers: i at m - 1, j at n - 1, and k at m + n - 1.",
        "Compare a[i] with b[j] and write the larger to a[k], stepping that pointer and k back.",
        "When i runs out, copy whatever remains of b; when j runs out you are already done.",
      ],
      bruteForce: { idea: "Copy everything into a buffer, sort, copy back.", time: "O((m+n) log(m+n))", space: "O(m+n)" },
      optimal: { idea: "Merge backwards from the end.", time: "O(m + n)", space: "O(1)" },
      pitfalls: [
        "Merging forwards clobbers unread values in a.",
        "If j is exhausted first no further work is needed, but if i is exhausted the rest of b must still be copied.",
        "m = 0 and n = 0 are both valid and both appear in the hidden cases.",
      ],
      javaToolkit: ["Backwards three-pointer merge", "Writing into trailing free space"],
    },
  },

  "repeating-missing": {
    slug: "repeating-missing",
    title: "Find the Repeating and Missing Number",
    description:
      "The array holds the numbers 1 to n, except that one value appears twice and another is absent. Return {repeating, missing}.",
    constraints: ["2 ≤ nums.length ≤ 10^5", "Values are in the range 1..n"],
    className: "Solution",
    methodName: "findRepeatingMissing",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] findRepeatingMissing(int[] nums) {
        // Return {repeating, missing}.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 1, 2, 5, 3] }, expectedOutput: [3, 4], explanation: "3 appears twice and 4 is absent." },
      { id: 2, inputs: { nums: [1, 1] }, expectedOutput: [1, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [2, 2] }, expectedOutput: [2, 1], isHidden: true },
      { id: 4, inputs: { nums: [1, 3, 3] }, expectedOutput: [3, 2], isHidden: true },
      { id: 5, inputs: { nums: [4, 3, 6, 2, 1, 1] }, expectedOutput: [1, 5], isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3, 4, 4] }, expectedOutput: [4, 5], isHidden: true },
    ],
    learn: {
      intuition:
        "Two unknowns need two equations. The difference of the actual and expected sums gives x - y, and the difference of the sums of squares gives x² - y², which factors into (x + y)(x - y) — so dividing recovers x + y and the pair follows.",
      approach: [
        "Compute S = sum(nums) - sum(1..n) and S2 = sumOfSquares(nums) - sumOfSquares(1..n).",
        "S is x - y and S2 / S is x + y, where x repeats and y is missing.",
        "Solve for both and return them.",
      ],
      bruteForce: { idea: "Count occurrences in an array of size n + 1.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Two equations from sums and sums of squares, or XOR bit partitioning.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Sums of squares reach roughly 3 × 10^14 for n = 10^5, so long is mandatory throughout.",
        "S is never zero because the two values differ, so the division is always safe.",
        "The return order is {repeating, missing} — getting it backwards fails every case.",
      ],
      javaToolkit: ["Simultaneous equations from sums", "long arithmetic", "n(n+1)/2 and n(n+1)(2n+1)/6"],
    },
  },

  "count-inversions": {
    slug: "count-inversions",
    title: "Count Inversions",
    description:
      "An inversion is a pair of indices i < j where nums[i] > nums[j]. Return how many the array contains.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "countInversions",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "long",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public long countInversions(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [5, 4, 3, 2, 1] }, expectedOutput: 10, explanation: "A fully reversed array of five has every one of its ten pairs inverted." },
      { id: 2, inputs: { nums: [1, 2, 3] }, expectedOutput: 0, explanation: "Sorted input has no inversions." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [2, 1] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [1, 1, 1] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { nums: [2, 4, 1, 3, 5] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Merge sort already compares every element against every other, just efficiently. During a merge, when a value from the right half is taken before one from the left, it is smaller than EVERY remaining left element — so you can count a whole block of inversions at once.",
      approach: [
        "Run a standard merge sort.",
        "In the merge step, when b[j] is chosen over a[i], add the number of elements remaining in the left half.",
        "Sum those contributions across every merge.",
      ],
      bruteForce: { idea: "Check every pair.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Merge sort, counting during the merge.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "A reversed array of 10^5 has about 5 × 10^9 inversions, far past int range — the return type is long for a reason.",
        "Equal values are NOT inversions, so the merge must take from the left on ties.",
        "Counting one at a time instead of a block at a time silently gives the wrong total.",
      ],
      javaToolkit: ["Merge sort with a counter", "Block counting during merge", "long accumulator"],
    },
  },

  "reverse-pairs": {
    slug: "reverse-pairs",
    title: "Reverse Pairs",
    description:
      "Count the pairs of indices i < j where nums[i] > 2 × nums[j].",
    constraints: ["1 ≤ nums.length ≤ 5 × 10^4", "-2^31 ≤ nums[i] ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "reversePairs",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int reversePairs(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 3, 2, 3, 1] }, expectedOutput: 2, explanation: "(3,1) at indices 1 and 4, and (3,1) at indices 3 and 4." },
      { id: 2, inputs: { nums: [2, 4, 3, 5, 1] }, expectedOutput: 3 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [5, 2] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [2147483647, -2147483648] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [1, 1, 1] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Almost count-inversions, but the condition and the merge no longer align — nums[i] > 2 × nums[j] is not what the merge comparison tests. So count with a separate two-pointer sweep BEFORE merging, while both halves are sorted.",
      approach: [
        "Merge sort as usual.",
        "Before the merge step, sweep both sorted halves with two pointers counting pairs where left > 2 × right.",
        "Then perform the ordinary merge.",
      ],
      bruteForce: { idea: "Check every pair.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Merge sort with a separate counting sweep per level.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "2 × nums[j] overflows int at the extremes — compare as longs. The MAX/MIN hidden case is exactly this.",
        "Trying to count inside the merge itself gives wrong answers because the comparison differs from the merge's.",
        "The counting sweep is linear per level, so the overall bound stays O(n log n).",
      ],
      javaToolkit: ["Merge sort with a pre-merge counting pass", "(long) comparison", "Two-pointer counting"],
    },
  },

  "max-product-subarray": {
    slug: "max-product-subarray",
    title: "Maximum Product Subarray",
    description:
      "Return the largest product obtainable from any contiguous non-empty subarray. The answer is guaranteed to fit in a 32-bit int.",
    constraints: ["1 ≤ nums.length ≤ 2 × 10^4", "-10 ≤ nums[i] ≤ 10"],
    className: "Solution",
    methodName: "maxProduct",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxProduct(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 3, -2, 4] }, expectedOutput: 6, explanation: "[2,3] gives 6; including -2 would turn it negative." },
      { id: 2, inputs: { nums: [-2, 0, -1] }, expectedOutput: 0, explanation: "The best available is the single 0." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [-2] }, expectedOutput: -2, isHidden: true },
      { id: 4, inputs: { nums: [-2, -3, 7] }, expectedOutput: 42, isHidden: true },
      { id: 5, inputs: { nums: [0, 2] }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { nums: [-1, -2, -3] }, expectedOutput: 6, isHidden: true },
      { id: 7, inputs: { nums: [2, -5, -2, -4, 3] }, expectedOutput: 24, isHidden: true },
    ],
    learn: {
      intuition:
        "Kadane's does not transfer directly, because a large NEGATIVE product becomes the best product the moment another negative arrives. So track the running maximum and minimum together, and swap them whenever you multiply by a negative.",
      approach: [
        "Track curMax, curMin and the best answer, all starting at nums[0].",
        "For each later value: if it is negative, swap curMax and curMin first.",
        "Then curMax = max(value, curMax × value) and curMin = min(value, curMin × value).",
        "Update the best from curMax.",
      ],
      bruteForce: { idea: "Multiply out every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Track the running maximum and minimum together.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Tracking only the maximum fails on [-2,-3,7], where the intermediate minimum is what becomes the answer.",
        "A zero resets both running values — starting fresh from the element handles it without a special case.",
        "All-negative arrays of odd length must drop one element, which the min/max tracking handles automatically.",
      ],
      javaToolkit: ["Simultaneous min and max tracking", "Swapping on a negative multiplier", "Kadane's variant"],
    },
  },
}
