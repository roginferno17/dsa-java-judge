import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 3 — Medium array problems (15).
 *
 * Several of these admit more than one correct answer (which triplet order, which
 * of two equally good subarrays). Where that happens the description fixes an
 * exact output so a correct solution is never marked wrong for choosing
 * differently.
 */
export const step03Medium: Record<string, ProblemMetadata> = {
  "longest-subarray-sum-k": {
    slug: "longest-subarray-sum-k",
    title: "Longest Subarray With Sum K (Positives)",
    description:
      "All values are positive. Return the length of the longest contiguous subarray summing to exactly k, or 0 if none exists.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "1 ≤ nums[i] ≤ 10^9", "1 ≤ k ≤ 10^14"],
    className: "Solution",
    methodName: "longestSubarray",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "long" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int longestSubarray(int[] nums, long k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3, 1, 1, 1, 1], k: 3 }, expectedOutput: 3, explanation: "[1,1,1] at the end is longer than [1,2] or [3]." },
      { id: 2, inputs: { nums: [2, 3, 5], k: 5 }, expectedOutput: 2, explanation: "[2,3] beats the single [5]." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1, 2, 3], k: 100 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [1, 1, 1, 1], k: 4 }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { nums: [1000000000, 1000000000], k: 2000000000 }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "With only positive values, growing the window always increases the sum and shrinking it always decreases. That monotonicity means two pointers suffice: expand while short, contract while over.",
      approach: [
        "Keep left and right pointers and a running sum.",
        "Extend right, adding to the sum.",
        "While the sum exceeds k, subtract nums[left] and advance left.",
        "Whenever the sum equals k, record the window length.",
      ],
      bruteForce: { idea: "Sum every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Sliding window, valid because all values are positive.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "This window only works because the values are positive; the next problem removes that guarantee and the technique collapses.",
        "The sum reaches 10^14, so it must be a long.",
        "Return 0, not -1, when nothing matches.",
      ],
      javaToolkit: ["Two-pointer sliding window", "long accumulator", "Monotonic window sums"],
    },
  },

  "longest-subarray-sum-k-neg": {
    slug: "longest-subarray-sum-k-neg",
    title: "Longest Subarray With Sum K (Positives and Negatives)",
    description:
      "Values may be negative, zero or positive. Return the length of the longest contiguous subarray summing to exactly k, or 0 if none exists.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9", "-10^14 ≤ k ≤ 10^14"],
    className: "Solution",
    methodName: "longestSubarray",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "long" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int longestSubarray(int[] nums, long k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [10, 5, 2, 7, 1, 9], k: 15 }, expectedOutput: 4, explanation: "[5,2,7,1] sums to 15." },
      { id: 2, inputs: { nums: [-1, 1, 1], k: 1 }, expectedOutput: 3, explanation: "The whole array sums to 1, beating the shorter [1]." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [0, 0, 0], k: 0 }, expectedOutput: 3, isHidden: true },
      { id: 4, inputs: { nums: [1, -1, 5], k: 0 }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3], k: 7 }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { nums: [-5], k: -5 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Negatives break the sliding window because extending can now decrease the sum. Instead use prefix sums: a subarray ending at i sums to k exactly when some earlier prefix equals prefix[i] - k.",
      approach: [
        "Walk the array keeping a running prefix sum.",
        "Store the EARLIEST index at which each prefix value was first seen.",
        "At each position, look up prefix - k; if present, the window from just after that index to here sums to k.",
        "Track the longest such window.",
      ],
      bruteForce: { idea: "Sum every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Prefix sums stored in a HashMap.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Overwriting an existing prefix in the map loses the earliest index and produces a shorter answer — only store a prefix the first time you see it.",
        "Seed the map with prefix 0 at index -1 so a subarray starting at index 0 is found.",
        "Prefix sums need long; 10^5 values of 10^9 overflow int easily.",
      ],
      javaToolkit: ["Prefix sums", "HashMap<Long, Integer>", "putIfAbsent to keep the earliest index"],
    },
  },

  "majority-element": {
    slug: "majority-element",
    title: "Majority Element (More Than n/2 Times)",
    description:
      "Exactly one value appears more than n/2 times. Return it, using O(n) time and O(1) space.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "A majority element is guaranteed to exist"],
    className: "Solution",
    methodName: "majorityElement",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int majorityElement(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 2, 3] }, expectedOutput: 3 },
      { id: 2, inputs: { nums: [2, 2, 1, 1, 1, 2, 2] }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [-1, -1, 2] }, expectedOutput: -1, isHidden: true },
      { id: 5, inputs: { nums: [5, 5, 5, 5] }, expectedOutput: 5, isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 1, 2, 1] }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Boyer–Moore voting: pair each majority element with a different one and both cancel. Because the majority appears more than half the time, it cannot be fully cancelled, so whatever survives is the answer.",
      approach: [
        "Keep a candidate and a count starting at 0.",
        "When the count is 0, adopt the current value as the candidate.",
        "Increment the count when the value matches the candidate, decrement otherwise.",
        "The surviving candidate is the majority.",
      ],
      bruteForce: { idea: "Count occurrences in a HashMap.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Boyer–Moore voting.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Without the guarantee that a majority exists you would need a second pass to verify the candidate.",
        "Sorting and taking the middle element also works but costs O(n log n).",
        "Resetting the candidate only when the count reaches exactly 0 is what makes the cancellation argument hold.",
      ],
      javaToolkit: ["Boyer–Moore voting algorithm", "Candidate and counter pair"],
    },
  },

  "max-subarray-extended": {
    slug: "max-subarray-extended",
    title: "Subarray With Maximum Sum (Return the Subarray)",
    description:
      "Return the contiguous non-empty subarray with the largest sum, as an array of its elements. If several tie, return the one that starts earliest; if those also tie, return the shortest.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
    className: "Solution",
    methodName: "maxSubArrayValues",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] maxSubArrayValues(int[] nums) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expectedOutput: [4, -1, 2, 1], explanation: "This window sums to 6, the best available." },
      { id: 2, inputs: { nums: [5, 4, -1, 7, 8] }, expectedOutput: [5, 4, -1, 7, 8], explanation: "The whole array is best." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [-1] }, expectedOutput: [-1], isHidden: true },
      { id: 4, inputs: { nums: [-3, -2, -5] }, expectedOutput: [-2], isHidden: true },
      { id: 5, inputs: { nums: [1] }, expectedOutput: [1], isHidden: true },
      { id: 6, inputs: { nums: [2, -1, 2] }, expectedOutput: [2, -1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Kadane's algorithm, with bookkeeping. Track where the current run began, and whenever the running sum beats the best, record that run's boundaries.",
      approach: [
        "Track current sum, the index the current run started at, and the best sum with its start and end.",
        "When extending would be worse than restarting, restart the run at the current index.",
        "Update the best boundaries only on a STRICT improvement, which gives the earliest-then-shortest tie rule.",
        "Copy that range out at the end.",
      ],
      bruteForce: { idea: "Try every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Kadane's with start and end tracking.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Updating the best on >= rather than > returns a later or longer subarray and breaks the stated tie rule.",
        "All-negative input must return a single element, not an empty array.",
        "Forgetting to move the run start when restarting gives the right sum with the wrong boundaries.",
      ],
      javaToolkit: ["Kadane's with index tracking", "Arrays.copyOfRange", "Strict > for tie-breaking"],
    },
  },

  "rearrange-alternating": {
    slug: "rearrange-alternating",
    title: "Rearrange Array in Alternating Positive and Negative Items",
    description:
      "The array holds an equal count of positive and negative values. Rearrange it so signs alternate starting with a positive, preserving the original relative order within the positives and within the negatives.",
    constraints: ["2 ≤ nums.length ≤ 10^5", "nums.length is even", "Equal counts of positive and negative values", "No zeros"],
    className: "Solution",
    methodName: "rearrange",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] rearrange(int[] nums) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 1, -2, -5, 2, -4] }, expectedOutput: [3, -2, 1, -5, 2, -4], explanation: "Positives 3,1,2 and negatives -2,-5,-4 keep their order and interleave." },
      { id: 2, inputs: { nums: [-1, 1] }, expectedOutput: [1, -1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, -1] }, expectedOutput: [1, -1], isHidden: true },
      { id: 4, inputs: { nums: [-1, -2, 1, 2] }, expectedOutput: [1, -1, 2, -2], isHidden: true },
      { id: 5, inputs: { nums: [5, -5, 4, -4, 3, -3] }, expectedOutput: [5, -5, 4, -4, 3, -3], isHidden: true },
    ],
    learn: {
      intuition:
        "Even indices take positives in order, odd indices take negatives in order. Two independent write pointers stepping by two handle it in a single pass.",
      approach: [
        "Create a result array of the same length.",
        "Keep pos = 0 and neg = 1 as write positions.",
        "Scan the input: write each positive to pos and advance by two; write each negative to neg and advance by two.",
      ],
      bruteForce: { idea: "Split into two lists, then interleave.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Two strided write pointers, one pass.", time: "O(n)", space: "O(n) for the output" },
      pitfalls: [
        "Sorting or swapping in place destroys the required relative order.",
        "Advancing by one instead of two writes over the other sign's slots.",
        "The counts are guaranteed equal, so neither pointer can run past the end.",
      ],
      javaToolkit: ["Strided write pointers", "Stable partitioning by sign"],
    },
  },

  "next-permutation": {
    slug: "next-permutation",
    title: "Next Permutation",
    description:
      "Rearrange the array in place into the next lexicographically greater permutation. If none exists — the array is in descending order — rearrange it into the smallest permutation, which is ascending.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "0 ≤ nums[i] ≤ 100"],
    className: "Solution",
    methodName: "nextPermutation",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void nextPermutation(int[] nums) {
        // Rearrange in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3] }, expectedOutput: [1, 3, 2] },
      { id: 2, inputs: { nums: [3, 2, 1] }, expectedOutput: [1, 2, 3], explanation: "Already the largest permutation, so it wraps to the smallest." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 1, 5] }, expectedOutput: [1, 5, 1], isHidden: true },
      { id: 4, inputs: { nums: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { nums: [2, 3, 1] }, expectedOutput: [3, 1, 2], isHidden: true },
      { id: 6, inputs: { nums: [1, 3, 2] }, expectedOutput: [2, 1, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "A descending suffix is already maximal, so nothing inside it can grow. Find the last position that can be increased, swap it with the smallest value to its right that still beats it, then make the remaining suffix as small as possible by reversing it.",
      approach: [
        "Scan from the right for the first index i where nums[i] < nums[i + 1]. That is the pivot.",
        "If no pivot exists, reverse the whole array and stop.",
        "Otherwise scan from the right for the first value greater than nums[i] and swap them.",
        "Reverse everything after i.",
      ],
      bruteForce: { idea: "Generate all permutations, sort them, take the next one.", time: "O(n! × n)", space: "O(n!)" },
      optimal: { idea: "Pivot, swap, reverse the suffix.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Sorting the suffix instead of reversing works but is unnecessarily O(n log n) — the suffix is already descending.",
        "Using <= when finding the pivot mishandles duplicates.",
        "The descending case must wrap to ascending, not stay put.",
      ],
      javaToolkit: ["Pivot-swap-reverse", "In-place reversal", "Scanning from the right"],
    },
  },

  "leaders-in-array": {
    slug: "leaders-in-array",
    title: "Leaders in an Array",
    description:
      "A leader is an element with no strictly greater element anywhere to its right; the last element is always a leader. Return the leaders in their original left-to-right order.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "leaders",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> leaders(int[] nums) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [16, 17, 4, 3, 5, 2] }, expectedOutput: [17, 5, 2], explanation: "17 beats everything after it, 5 beats 2, and 2 is last." },
      { id: 2, inputs: { nums: [1, 2, 3, 4] }, expectedOutput: [4], explanation: "Only the last element has nothing larger to its right." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [5] }, expectedOutput: [5], isHidden: true },
      { id: 4, inputs: { nums: [4, 3, 2, 1] }, expectedOutput: [4, 3, 2, 1], isHidden: true },
      { id: 5, inputs: { nums: [2, 2, 2] }, expectedOutput: [2, 2, 2], isHidden: true },
      { id: 6, inputs: { nums: [-1, -5, -3] }, expectedOutput: [-1, -3], isHidden: true },
    ],
    learn: {
      intuition:
        "Whether an element is a leader depends only on what lies to its right, so scanning right to left lets you answer with a single running maximum.",
      approach: [
        "Walk from the last index backwards keeping the maximum seen so far.",
        "An element is a leader when it is at least that maximum.",
        "Collect leaders as you go, then reverse to restore left-to-right order.",
      ],
      bruteForce: { idea: "For each element, scan everything to its right.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Right-to-left scan with a running maximum.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Forgetting to reverse at the end returns the leaders backwards.",
        "The definition is 'no STRICTLY greater element to the right', so equal values are still leaders — the [2,2,2] case checks this.",
        "The last element is always a leader.",
      ],
      javaToolkit: ["Suffix maximum", "Collections.reverse", "Right-to-left scanning"],
    },
  },

  "longest-consecutive-sequence": {
    slug: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    description:
      "Return the length of the longest run of consecutive integers present in the array. The values need not be adjacent in the array. Aim for O(n).",
    constraints: ["0 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "longestConsecutive",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [100, 4, 200, 1, 3, 2] }, expectedOutput: 4, explanation: "1, 2, 3 and 4 are all present." },
      { id: 2, inputs: { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] }, expectedOutput: 9 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [1] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [1, 1, 1] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [-3, -2, -1, 5] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Put everything in a set, then only start counting from values that BEGIN a run — those with no predecessor in the set. Each run is then walked exactly once, which keeps the whole thing linear despite the nested loop.",
      approach: [
        "Insert every value into a HashSet, which also removes duplicates.",
        "For each value, skip it unless value - 1 is absent from the set.",
        "From a genuine start, count upward while the next value exists, tracking the longest run.",
      ],
      bruteForce: { idea: "Sort, then scan for runs.", time: "O(n log n)", space: "O(1)" },
      optimal: { idea: "HashSet with start-only expansion.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Expanding from every element rather than only from run starts makes this O(n²) on a long consecutive block.",
        "Duplicates must not extend a run — using a Set handles that for free.",
        "An empty array returns 0.",
      ],
      javaToolkit: ["HashSet<Integer>", "Start-only expansion", "Amortised linear scanning"],
    },
  },

  "set-matrix-zeros": {
    slug: "set-matrix-zeros",
    title: "Set Matrix Zeros",
    description:
      "Wherever the matrix contains a 0, set that entire row and column to 0. Do it in place.",
    constraints: ["1 ≤ rows, cols ≤ 200", "-2^31 ≤ values ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "setZeroes",
    parameters: [{ name: "matrix", type: "int[][]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `class Solution {
    public void setZeroes(int[][] matrix) {
        // Modify the matrix in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] }, expectedOutput: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
      { id: 2, inputs: { matrix: [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]] }, expectedOutput: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[0]] }, expectedOutput: [[0]], isHidden: true },
      { id: 4, inputs: { matrix: [[1, 2], [3, 4]] }, expectedOutput: [[1, 2], [3, 4]], isHidden: true },
      { id: 5, inputs: { matrix: [[1, 0], [0, 1]] }, expectedOutput: [[0, 0], [0, 0]], isHidden: true },
      { id: 6, inputs: { matrix: [[1], [0], [1]] }, expectedOutput: [[0], [0], [0]], isHidden: true },
    ],
    learn: {
      intuition:
        "The trap is that zeroing as you go creates new zeros that then trigger more zeroing. You must record every row and column to clear BEFORE changing anything.",
      approach: [
        "First pass: note which rows and which columns contain a zero.",
        "Second pass: set a cell to 0 when its row or its column was marked.",
        "For O(1) extra space, store those marks in the matrix's own first row and column, handling that first column separately.",
      ],
      bruteForce: { idea: "Copy the matrix, decide from the copy.", time: "O(rows × cols)", space: "O(rows × cols)" },
      optimal: { idea: "Two boolean arrays, or the first row and column as marker storage.", time: "O(rows × cols)", space: "O(rows + cols) or O(1)" },
      pitfalls: [
        "Zeroing during the first pass cascades and blanks the whole matrix.",
        "With the O(1) trick, the first row and first column overlap at [0][0] and need a separate flag.",
        "A matrix with no zeros must be left completely untouched.",
      ],
      javaToolkit: ["Two-pass marking", "Using the matrix as its own marker storage", "boolean[] flags"],
    },
  },

  "rotate-matrix-90": {
    slug: "rotate-matrix-90",
    title: "Rotate Matrix by 90 Degrees",
    description: "Rotate the square matrix 90 degrees clockwise, in place.",
    constraints: ["1 ≤ n ≤ 20", "The matrix is n × n"],
    className: "Solution",
    methodName: "rotate",
    parameters: [{ name: "matrix", type: "int[][]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `class Solution {
    public void rotate(int[][] matrix) {
        // Rotate clockwise, in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] }, expectedOutput: [[7, 4, 1], [8, 5, 2], [9, 6, 3]], explanation: "The first column, read bottom to top, becomes the first row." },
      { id: 2, inputs: { matrix: [[1, 2], [3, 4]] }, expectedOutput: [[3, 1], [4, 2]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[1]] }, expectedOutput: [[1]], isHidden: true },
      { id: 4, inputs: { matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]] }, expectedOutput: [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]], isHidden: true },
      { id: 5, inputs: { matrix: [[1, 1], [1, 1]] }, expectedOutput: [[1, 1], [1, 1]], isHidden: true },
    ],
    learn: {
      intuition:
        "A clockwise rotation is a transpose followed by reversing each row. Transposing flips across the main diagonal, and the row reversal completes the turn — two simple passes instead of tracking a four-way cycle.",
      approach: [
        "Transpose: for every i, swap matrix[i][j] with matrix[j][i] for j greater than i.",
        "Reverse each row.",
      ],
      bruteForce: { idea: "Write into a fresh n × n matrix.", time: "O(n²)", space: "O(n²)" },
      optimal: { idea: "Transpose, then reverse each row.", time: "O(n²)", space: "O(1)" },
      pitfalls: [
        "Looping j from 0 in the transpose swaps every pair twice and leaves the matrix unchanged — start j at i + 1.",
        "Reversing rows before transposing gives an anticlockwise rotation.",
        "For anticlockwise, transpose then reverse each COLUMN instead.",
      ],
      javaToolkit: ["Transpose with j > i", "In-place row reversal", "Composing two simple transforms"],
    },
  },

  "spiral-matrix": {
    slug: "spiral-matrix",
    title: "Print the Matrix in Spiral Order",
    description:
      "Return every element of the matrix in spiral order, starting at the top-left and moving clockwise inwards.",
    constraints: ["1 ≤ rows, cols ≤ 100"],
    className: "Solution",
    methodName: "spiralOrder",
    parameters: [{ name: "matrix", type: "int[][]" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] }, expectedOutput: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
      { id: 2, inputs: { matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]] }, expectedOutput: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[1]] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { matrix: [[1, 2, 3]] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 5, inputs: { matrix: [[1], [2], [3]] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 6, inputs: { matrix: [[1, 2], [3, 4]] }, expectedOutput: [1, 2, 4, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Hold four boundaries — top, bottom, left, right — and peel one edge at a time, shrinking the boundary you just consumed. The spiral falls out of the bookkeeping.",
      approach: [
        "While the boundaries have not crossed: walk the top row left to right, then the right column top to bottom.",
        "If rows remain, walk the bottom row right to left; if columns remain, walk the left column bottom to top.",
        "Shrink the corresponding boundary after each edge.",
      ],
      optimal: { idea: "Four shrinking boundaries.", time: "O(rows × cols)", space: "O(1) beyond the output" },
      pitfalls: [
        "A single row or single column re-emits values unless you re-check top <= bottom and left <= right before the two reverse passes — both are hidden cases.",
        "Shrinking a boundary at the wrong moment skips or repeats an edge.",
        "The matrix need not be square.",
      ],
      javaToolkit: ["Four boundary variables", "Guarding the reverse passes", "Layer-by-layer traversal"],
    },
  },

  "count-subarrays-sum": {
    slug: "count-subarrays-sum",
    title: "Count Subarrays With a Given Sum",
    description:
      "Return how many contiguous subarrays sum to exactly k. Values may be negative.",
    constraints: ["1 ≤ nums.length ≤ 2 × 10^4", "-1000 ≤ nums[i] ≤ 1000", "-10^7 ≤ k ≤ 10^7"],
    className: "Solution",
    methodName: "subarraySum",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int subarraySum(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 1, 1], k: 2 }, expectedOutput: 2, explanation: "The first two and the last two." },
      { id: 2, inputs: { nums: [1, 2, 3], k: 3 }, expectedOutput: 2, explanation: "[1,2] and [3]." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 0 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [0, 0, 0], k: 0 }, expectedOutput: 6, isHidden: true },
      { id: 5, inputs: { nums: [-1, -1, 1], k: 0 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [1, -1, 0], k: 0 }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Same prefix-sum idea as the longest-subarray problem, but counting instead of measuring. Each earlier prefix equal to prefix - k marks a subarray ending here, so you accumulate COUNTS rather than keeping the first index.",
      approach: [
        "Keep a map from prefix sum to how many times it has occurred, seeded with 0 mapped to 1.",
        "Walk the array maintaining the running prefix.",
        "Add the stored count of prefix - k to the answer, then record the current prefix.",
      ],
      bruteForce: { idea: "Sum every subarray.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Prefix sums with occurrence counts.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Seeding the map with {0: 1} is essential; without it subarrays starting at index 0 are missed.",
        "Storing the first index instead of a count under-reports overlapping answers — [0,0,0] with k=0 has six.",
        "A sliding window does not work here because negatives break monotonicity.",
      ],
      javaToolkit: ["Prefix sum counts", "map.getOrDefault", "Seeding {0: 1}"],
    },
  },

  "pascals-triangle": {
    slug: "pascals-triangle",
    title: "Pascal's Triangle",
    description:
      "Return the first numRows rows of Pascal's triangle. Each row starts and ends with 1, and every other entry is the sum of the two directly above it.",
    constraints: ["1 ≤ numRows ≤ 30"],
    className: "Solution",
    methodName: "generate",
    parameters: [{ name: "numRows", type: "int" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> generate(int numRows) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { numRows: 5 }, expectedOutput: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]] },
      { id: 2, inputs: { numRows: 1 }, expectedOutput: [[1]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { numRows: 2 }, expectedOutput: [[1], [1, 1]], isHidden: true },
      { id: 4, inputs: { numRows: 3 }, expectedOutput: [[1], [1, 1], [1, 2, 1]], isHidden: true },
      { id: 5, inputs: { numRows: 6 }, expectedOutput: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]], isHidden: true },
    ],
    learn: {
      intuition:
        "Each row is built from the one before it. Row r has r + 1 entries, with 1 at both ends and every interior value the sum of its two parents.",
      approach: [
        "Start with the row [1].",
        "For each subsequent row, place a 1, then for each interior position add the two values above it, then place a closing 1.",
        "Collect the rows in order.",
      ],
      optimal: { idea: "Build each row from the previous.", time: "O(numRows²)", space: "O(numRows²) for the output" },
      pitfalls: [
        "Row indices are 0-based while row LENGTHS are 1-based — an easy off-by-one.",
        "Reusing and mutating the previous row object puts the same list into the result repeatedly; create a new list per row.",
        "Row 30 stays well inside int range, so no long is needed here.",
      ],
      javaToolkit: ["List<List<Integer>>", "Building each row from the last", "new ArrayList<>() per row"],
    },
  },

  "majority-element-n3": {
    slug: "majority-element-n3",
    title: "Majority Element (More Than n/3 Times)",
    description:
      "Return every value appearing more than n/3 times, sorted ascending. At most two such values can exist.",
    constraints: ["1 ≤ nums.length ≤ 5 × 10^4", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "majorityElement",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> majorityElement(int[] nums) {
        // Return the qualifying values sorted ascending.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 2, 3] }, expectedOutput: [3], explanation: "3 appears twice out of three, which exceeds 3/3 = 1." },
      { id: 2, inputs: { nums: [1, 2] }, expectedOutput: [1, 2], explanation: "Both appear once, exceeding 2/3." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { nums: [1, 2, 3] }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { nums: [2, 2] }, expectedOutput: [2], isHidden: true },
      { id: 6, inputs: { nums: [1, 1, 1, 3, 3, 2, 2, 2] }, expectedOutput: [1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Extended Boyer–Moore. Since at most two values can exceed n/3, track two candidates with two counters and cancel a value against BOTH when it matches neither. Unlike the n/2 version, the survivors are not guaranteed, so a verification pass is mandatory.",
      approach: [
        "Keep two candidates and two counts.",
        "Increment when a value matches a candidate; adopt it if a count is 0; otherwise decrement both.",
        "Second pass: count the two survivors for real and keep only those exceeding n/3.",
        "Sort the result.",
      ],
      bruteForce: { idea: "Count everything in a HashMap.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Two-candidate voting plus verification.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Skipping the verification pass reports values that are not actually frequent enough — [1,2,3] must return an empty list.",
        "Checking the candidate-match cases before the zero-count cases matters when the two candidates would otherwise collide.",
        "The threshold is strictly greater than n/3, computed with integer division.",
      ],
      javaToolkit: ["Extended Boyer–Moore", "Mandatory verification pass", "Collections.sort"],
    },
  },

  "three-sum": {
    slug: "three-sum",
    title: "3-Sum",
    description:
      "Return every unique triplet summing to zero. Sort each triplet ascending, and return the triplets in ascending lexicographic order so the answer is unambiguous.",
    constraints: ["3 ≤ nums.length ≤ 3000", "-10^5 ≤ nums[i] ≤ 10^5"],
    className: "Solution",
    methodName: "threeSum",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Each triplet ascending; triplets in ascending lexicographic order.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [-1, 0, 1, 2, -1, -4] }, expectedOutput: [[-1, -1, 2], [-1, 0, 1]], explanation: "Two distinct triplets, each sorted, listed in lexicographic order." },
      { id: 2, inputs: { nums: [0, 1, 1] }, expectedOutput: [], explanation: "No triplet sums to zero." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [0, 0, 0] }, expectedOutput: [[0, 0, 0]], isHidden: true },
      { id: 4, inputs: { nums: [0, 0, 0, 0] }, expectedOutput: [[0, 0, 0]], isHidden: true },
      { id: 5, inputs: { nums: [-2, 0, 1, 1, 2] }, expectedOutput: [[-2, 0, 2], [-2, 1, 1]], isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3] }, expectedOutput: [], isHidden: true },
    ],
    learn: {
      intuition:
        "Sorting turns this into a series of two-sum problems. Fix the first element, then close in from both ends of the remainder — and sorting is also what makes duplicate suppression a simple skip.",
      approach: [
        "Sort the array.",
        "For each index i, skip it if it repeats the previous value.",
        "Run two pointers over the rest: move left in when the sum is too small, right in when too large.",
        "On a hit, record the triplet and skip past duplicates on both pointers.",
      ],
      bruteForce: { idea: "Three nested loops with a set for deduplication.", time: "O(n³)", space: "O(n)" },
      optimal: { idea: "Sort, then fix one element and use two pointers.", time: "O(n²)", space: "O(1) beyond the output" },
      pitfalls: [
        "Skipping duplicates only for i still emits repeated triplets — both pointers need it too. [0,0,0,0] catches this.",
        "The sum of three values near 10^5 stays inside int, but the habit of checking is worth keeping.",
        "Sorting first is what makes the output order deterministic, which is why the problem asks for it.",
      ],
      javaToolkit: ["Arrays.sort", "Two pointers inside a loop", "Duplicate skipping on all three indices"],
    },
  },
}
