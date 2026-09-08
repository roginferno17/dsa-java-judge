import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 2 — Sorting Techniques (7 problems).
 *
 * Every one of these is void and sorts in place, because the point is the
 * mechanics of the algorithm rather than the result. Arrays.sort would pass none
 * of the intent even though it would pass the tests, so each problem's Learn notes
 * say what the algorithm is supposed to do on each pass.
 */
export const step02: Record<string, ProblemMetadata> = {
  "selection-sort": {
    slug: "selection-sort",
    title: "Selection Sort",
    description:
      "Sort the array ascending, in place, using selection sort: repeatedly find the smallest element in the unsorted remainder and swap it into place.",
    constraints: ["1 ≤ arr.length ≤ 1000", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "selectionSort",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void selectionSort(int[] arr) {
        // Sort in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [13, 46, 24, 52, 20, 9] }, expectedOutput: [9, 13, 20, 24, 46, 52] },
      { id: 2, inputs: { arr: [5, 4, 3, 2, 1] }, expectedOutput: [1, 2, 3, 4, 5], explanation: "Fully reversed input — the worst case for comparisons, though selection sort does the same work regardless." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { arr: [2, 2, 2] }, expectedOutput: [2, 2, 2], isHidden: true },
      { id: 5, inputs: { arr: [-3, 5, -1, 0] }, expectedOutput: [-3, -1, 0, 5], isHidden: true },
      { id: 6, inputs: { arr: [1, 2, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Split the array into a sorted front and an unsorted back. Each pass finds the minimum of the back and swaps it onto the boundary, growing the sorted part by one.",
      approach: [
        "For i from 0 to n - 2, assume arr[i] is the smallest of the remainder.",
        "Scan j from i + 1 to n - 1 recording the index of anything smaller.",
        "Swap that element with arr[i] once the scan finishes.",
      ],
      optimal: { idea: "n passes, each scanning the remaining suffix.", time: "O(n²) always", space: "O(1)" },
      pitfalls: [
        "Swapping inside the inner loop instead of once per pass — that still sorts, but it is no longer selection sort and does far more writes.",
        "Selection sort does the same number of comparisons whether the input is sorted or not; it cannot finish early.",
        "It is not stable: swapping distant elements can reorder equal values.",
      ],
      javaToolkit: ["Nested for loops", "Tracking a minimum index", "Swap with a temp variable"],
    },
  },

  "bubble-sort": {
    slug: "bubble-sort",
    title: "Bubble Sort",
    description:
      "Sort the array ascending, in place, using bubble sort: compare neighbours and swap them when they are out of order, repeating until a full pass makes no swaps.",
    constraints: ["1 ≤ arr.length ≤ 1000", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "bubbleSort",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void bubbleSort(int[] arr) {
        // Sort in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [13, 46, 24, 52, 20, 9] }, expectedOutput: [9, 13, 20, 24, 46, 52] },
      { id: 2, inputs: { arr: [1, 2, 3, 4] }, expectedOutput: [1, 2, 3, 4], explanation: "Already sorted — with the early-exit check this finishes in a single pass." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { arr: [3, 1] }, expectedOutput: [1, 3], isHidden: true },
      { id: 5, inputs: { arr: [-1, -1, 0, -5] }, expectedOutput: [-5, -1, -1, 0], isHidden: true },
      { id: 6, inputs: { arr: [9, 8, 7, 6, 5] }, expectedOutput: [5, 6, 7, 8, 9], isHidden: true },
    ],
    learn: {
      intuition:
        "Each pass drags the largest remaining value to the end, the way a bubble rises. After i passes the last i positions are final, so each pass can stop earlier than the last.",
      approach: [
        "Loop i from n - 1 down to 1 — this marks the end of the unsorted region.",
        "Inner loop j from 0 to i - 1, swapping arr[j] and arr[j + 1] when out of order.",
        "Track whether any swap happened; if none did, the array is sorted and you can stop.",
      ],
      bruteForce: { idea: "Always run all n passes.", time: "O(n²) always", space: "O(1)" },
      optimal: { idea: "Bubble with an early exit when a pass makes no swaps.", time: "O(n) best, O(n²) worst", space: "O(1)" },
      pitfalls: [
        "Letting the inner loop run to n - 1 every pass, re-comparing the tail that is already sorted.",
        "Omitting the swapped flag, which gives up the O(n) best case on already-sorted input.",
        "Reading arr[j + 1] when j reaches the last index — the bound must be i, not n.",
      ],
      javaToolkit: ["Adjacent comparison and swap", "boolean flag for early exit", "Shrinking inner bound"],
    },
  },

  "insertion-sort": {
    slug: "insertion-sort",
    title: "Insertion Sort",
    description:
      "Sort the array ascending, in place, using insertion sort: take each element and slide it back into its correct position among the already-sorted prefix.",
    constraints: ["1 ≤ arr.length ≤ 1000", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "insertionSort",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void insertionSort(int[] arr) {
        // Sort in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [13, 46, 24, 52, 20, 9] }, expectedOutput: [9, 13, 20, 24, 46, 52] },
      { id: 2, inputs: { arr: [4, 3, 2, 1] }, expectedOutput: [1, 2, 3, 4], explanation: "Reversed input is the worst case: every element slides all the way to the front." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { arr: [1, 2, 3, 4, 5] }, expectedOutput: [1, 2, 3, 4, 5], isHidden: true },
      { id: 5, inputs: { arr: [7, 7, 3, 3] }, expectedOutput: [3, 3, 7, 7], isHidden: true },
      { id: 6, inputs: { arr: [-2, 4, -6, 8] }, expectedOutput: [-6, -2, 4, 8], isHidden: true },
    ],
    learn: {
      intuition:
        "Exactly how most people sort a hand of cards: the left side is already in order, so pick up the next card and slide it left until it fits. On nearly-sorted data almost nothing moves, which is why this is the fastest of the three simple sorts in practice.",
      approach: [
        "For i from 1 to n - 1, hold arr[i] in a temporary variable.",
        "Walk j back from i - 1 while arr[j] is greater than the held value, shifting each one right.",
        "Drop the held value into the gap at j + 1.",
      ],
      optimal: { idea: "Shift-and-insert into a growing sorted prefix.", time: "O(n) best, O(n²) worst", space: "O(1)" },
      pitfalls: [
        "Swapping repeatedly instead of shifting — same result, roughly three times the writes.",
        "Using > rather than >= in the shift condition is what keeps insertion sort stable; equal values stay in their original order.",
        "Letting j go below 0 without a bounds check.",
      ],
      javaToolkit: ["Shifting elements right", "while loop with a compound condition", "Stability"],
    },
  },

  "merge-sort": {
    slug: "merge-sort",
    title: "Merge Sort",
    description:
      "Sort the array ascending, in place, using merge sort: split in half, sort each half recursively, then merge the two sorted halves back together.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "mergeSort",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void mergeSort(int[] arr) {
        // Sort in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [9, 4, 7, 6, 3, 1, 5] }, expectedOutput: [1, 3, 4, 5, 6, 7, 9] },
      { id: 2, inputs: { arr: [3, 1] }, expectedOutput: [1, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { arr: [5, 5, 5, 5] }, expectedOutput: [5, 5, 5, 5], isHidden: true },
      { id: 5, inputs: { arr: [-1000000000, 1000000000, 0] }, expectedOutput: [-1000000000, 0, 1000000000], isHidden: true },
      { id: 6, inputs: { arr: [8, 7, 6, 5, 4, 3, 2, 1] }, expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8], isHidden: true },
    ],
    learn: {
      intuition:
        "Two already-sorted lists can be merged in one pass by repeatedly taking the smaller front element. Recursion gets you those sorted halves, and the halving is what turns n² into n log n.",
      approach: [
        "Recurse on [low, mid] and [mid + 1, high] until a range holds one element.",
        "Merge: walk both halves with two pointers, copying the smaller value into a temporary buffer.",
        "Copy the buffer back over the original range.",
      ],
      bruteForce: { idea: "Any of the O(n²) simple sorts.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Divide, sort each half, merge.", time: "O(n log n) always", space: "O(n)" },
      pitfalls: [
        "Computing mid as (low + high) / 2 can overflow for very large indices; low + (high - low) / 2 cannot.",
        "Forgetting to copy the leftovers of whichever half is not exhausted.",
        "Forgetting to write the temporary buffer back — the array then appears unsorted despite a correct merge.",
        "Using >= when choosing between equal elements breaks stability.",
      ],
      javaToolkit: ["Recursive divide and conquer", "Two-pointer merge", "System.arraycopy", "low + (high - low) / 2"],
    },
  },

  "recursive-bubble-sort": {
    slug: "recursive-bubble-sort",
    title: "Recursive Bubble Sort",
    description:
      "Sort the array ascending, in place, expressing bubble sort recursively: one pass bubbles the largest value to the end, then recurse on everything before it.",
    constraints: ["1 ≤ arr.length ≤ 1000", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "recursiveBubbleSort",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void recursiveBubbleSort(int[] arr) {
        // Sort in place using recursion instead of an outer loop.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [4, 1, 3, 9, 7] }, expectedOutput: [1, 3, 4, 7, 9] },
      { id: 2, inputs: { arr: [2, 1] }, expectedOutput: [1, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { arr: [1, 2, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 5, inputs: { arr: [0, -1, -1, 2] }, expectedOutput: [-1, -1, 0, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "The outer loop of bubble sort is just \"do this again on a slightly smaller array\". Recursion expresses that directly: the loop variable becomes the recursion parameter.",
      approach: [
        "Write a helper taking the current size n.",
        "Base case: n <= 1, return.",
        "Do one inner pass over the first n elements, swapping out-of-order neighbours.",
        "Recurse with n - 1.",
      ],
      optimal: { idea: "One pass per recursion level.", time: "O(n²)", space: "O(n) call stack" },
      pitfalls: [
        "Recursion depth equals the array length here, so this uses O(n) stack where the loop version used none.",
        "Missing base case, or recursing with n rather than n - 1, gives a StackOverflowError.",
        "The early-exit optimisation still applies: if a pass made no swaps you can return instead of recursing.",
      ],
      javaToolkit: ["Turning an outer loop into a recursion parameter", "Helper with a size argument"],
    },
  },

  "recursive-insertion-sort": {
    slug: "recursive-insertion-sort",
    title: "Recursive Insertion Sort",
    description:
      "Sort the array ascending, in place, expressing insertion sort recursively: sort the first i elements, then insert element i into that sorted prefix.",
    constraints: ["1 ≤ arr.length ≤ 1000", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "recursiveInsertionSort",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void recursiveInsertionSort(int[] arr) {
        // Sort in place using recursion instead of an outer loop.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [4, 1, 3, 9, 7] }, expectedOutput: [1, 3, 4, 7, 9] },
      { id: 2, inputs: { arr: [3, 2, 1] }, expectedOutput: [1, 2, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { arr: [6, 6, 1] }, expectedOutput: [1, 6, 6], isHidden: true },
      { id: 5, inputs: { arr: [-4, 10, -4] }, expectedOutput: [-4, -4, 10], isHidden: true },
    ],
    learn: {
      intuition:
        "Insertion sort's outer loop says \"the first i elements are sorted\". As a recursion that becomes: sort the first i - 1, then place element i - 1 correctly.",
      approach: [
        "Helper taking the index i currently being inserted.",
        "Base case: i >= n, return.",
        "Shift the held value left past anything larger, then place it.",
        "Recurse with i + 1.",
      ],
      optimal: { idea: "One insertion per recursion level.", time: "O(n²) worst, O(n) on sorted input", space: "O(n) call stack" },
      pitfalls: [
        "Recursing before doing the insertion, or after — either order works as long as the prefix is sorted before you insert into it.",
        "Deep recursion on large arrays; the iterative form has no such limit.",
      ],
      javaToolkit: ["Recursion over an index", "Shift-and-place insertion"],
    },
  },

  "quick-sort": {
    slug: "quick-sort",
    title: "Quick Sort",
    description:
      "Sort the array ascending, in place, using quicksort: pick a pivot, partition the array so smaller values sit left and larger values right, then recurse on each side.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "quickSort",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void quickSort(int[] arr) {
        // Sort in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [4, 6, 2, 5, 7, 9, 1, 3] }, expectedOutput: [1, 2, 3, 4, 5, 6, 7, 9] },
      { id: 2, inputs: { arr: [2, 1] }, expectedOutput: [1, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { arr: [1, 1, 1, 1, 1] }, expectedOutput: [1, 1, 1, 1, 1], isHidden: true },
      { id: 5, inputs: { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], isHidden: true },
      { id: 6, inputs: { arr: [-5, 3, -5, 0, 3] }, expectedOutput: [-5, -5, 0, 3, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Put one element where it belongs permanently, and you have split the problem in two. Unlike merge sort there is no merging step — the partition itself does the work, which is why quicksort needs no extra array.",
      approach: [
        "Choose a pivot. A random or middle element is far safer than always taking the first.",
        "Partition so that everything left of the pivot is smaller and everything right is larger.",
        "Recurse on both sides of the pivot's final position.",
      ],
      bruteForce: { idea: "Merge sort, which is O(n log n) but needs O(n) extra space.", time: "O(n log n)", space: "O(n)" },
      optimal: { idea: "Partition in place and recurse.", time: "O(n log n) average, O(n²) worst", space: "O(log n) stack" },
      pitfalls: [
        "Always picking arr[low] as the pivot degrades to O(n²) on already-sorted input — one hidden case is exactly that.",
        "An array of all-equal values also degrades a naive partition; three-way partitioning fixes it.",
        "Off-by-one in the partition loop causes infinite recursion, which the judge reports as a stack overflow.",
      ],
      javaToolkit: ["Lomuto or Hoare partitioning", "Random or median-of-three pivot", "In-place recursion"],
    },
  },
}
