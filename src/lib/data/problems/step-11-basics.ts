import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 11 — Heap basics (4).
 *
 * A binary heap is an array pretending to be a tree: the children of index i live
 * at 2i + 1 and 2i + 2, and its parent at (i - 1) / 2. Nothing enforces a total
 * order — only that a parent beats its children — which is why insertion and
 * removal are O(log n) rather than O(n).
 */
export const step11Basics: Record<string, ProblemMetadata> = {
  "intro-priority-queue": {
    slug: "intro-priority-queue",
    title: "Introduction to Priority Queues",
    description:
      "Replay a log of operations against a MIN priority queue: \"offer\" (one argument), \"poll\", \"peek\" and \"size\". Return one entry per operation — \"null\" for offer, the value for poll and peek, the count for size. On an empty queue, poll and peek both give -1. Java's PriorityQueue is allowed here; the next problem asks you to build one.",
    constraints: ["1 ≤ ops.length ≤ 10^4", "-10^9 ≤ offered value ≤ 10^9"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        // Smallest value comes out first.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { ops: ["offer", "offer", "offer", "peek", "poll", "peek", "size"], args: [[5], [1], [3], [], [], [], []] },
        expectedOutput: ["null", "null", "null", "1", "1", "3", "2"],
        explanation: "Insertion order does not matter — 1 is the smallest, so it surfaces first.",
      },
      { id: 2, inputs: { ops: ["poll", "peek", "size"], args: [[], [], []] }, expectedOutput: ["-1", "-1", "0"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["offer", "poll", "poll"], args: [[7], [], []] }, expectedOutput: ["null", "7", "-1"], isHidden: true },
      { id: 4, inputs: { ops: ["offer", "offer", "poll", "poll", "poll"], args: [[2], [2], [], [], []] }, expectedOutput: ["null", "null", "2", "2", "-1"], isHidden: true },
      { id: 5, inputs: { ops: ["offer", "offer", "offer", "poll", "poll", "poll"], args: [[-1], [0], [-5], [], [], []] }, expectedOutput: ["null", "null", "null", "-5", "-1", "0"], isHidden: true },
      { id: 6, inputs: { ops: ["size", "offer", "size"], args: [[], [9], []] }, expectedOutput: ["0", "null", "1"], isHidden: true },
    ],
    learn: {
      intuition:
        "A priority queue answers one question fast — what is the smallest thing here? — and gives up everything else. Unlike a sorted list it never orders the whole collection, which is why insertion is O(log n) instead of O(n).",
      approach: [
        "Java's PriorityQueue is a min-heap by default.",
        "offer inserts, poll removes and returns the smallest, peek looks without removing.",
        "Guard poll and peek against an empty queue — they return null rather than throwing.",
      ],
      optimal: { idea: "Binary heap.", time: "O(log n) insert and remove, O(1) peek", space: "O(n)" },
      pitfalls: [
        "Iterating a PriorityQueue does NOT visit elements in sorted order — only poll gives that.",
        "For a max-heap pass Collections.reverseOrder() to the constructor.",
        "peek and poll return null, not -1, on an empty queue, so the sentinel here is yours to add.",
      ],
      javaToolkit: ["PriorityQueue<Integer>", "Collections.reverseOrder()", "offer / poll / peek"],
    },
  },

  "heap-implementation": {
    slug: "heap-implementation",
    title: "Min Heap and Max Heap Implementation",
    description:
      "Build a binary heap from scratch — no PriorityQueue, no sorting. When isMin is true the smallest value surfaces first, otherwise the largest. Replay operations \"insert\" (one argument), \"extract\", \"peek\" and \"size\", returning \"null\" for insert, the value for extract and peek, the count for size. On an empty heap, extract and peek give -1.",
    constraints: ["1 ≤ ops.length ≤ 10^4", "-10^9 ≤ inserted value ≤ 10^9"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "isMin", type: "boolean" },
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(boolean isMin, String[] ops, int[][] args) {
        // Build the heap yourself: an int[] plus siftUp and siftDown.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { isMin: true, ops: ["insert", "insert", "insert", "extract", "peek"], args: [[4], [2], [8], [], []] },
        expectedOutput: ["null", "null", "null", "2", "4"],
      },
      {
        id: 2,
        inputs: { isMin: false, ops: ["insert", "insert", "insert", "extract", "peek"], args: [[4], [2], [8], [], []] },
        expectedOutput: ["null", "null", "null", "8", "4"],
        explanation: "The same inserts, the opposite ordering.",
      },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { isMin: true, ops: ["extract", "peek", "size"], args: [[], [], []] }, expectedOutput: ["-1", "-1", "0"], isHidden: true },
      { id: 4, inputs: { isMin: true, ops: ["insert", "insert", "insert", "insert", "extract", "extract", "extract", "extract"], args: [[5], [3], [7], [1], [], [], [], []] }, expectedOutput: ["null", "null", "null", "null", "1", "3", "5", "7"], isHidden: true },
      { id: 5, inputs: { isMin: false, ops: ["insert", "insert", "insert", "extract", "extract", "extract"], args: [[-3], [-1], [-2], [], [], []] }, expectedOutput: ["null", "null", "null", "-1", "-2", "-3"], isHidden: true },
      { id: 6, inputs: { isMin: true, ops: ["insert", "insert", "extract", "insert", "peek", "size"], args: [[9], [9], [], [1], [], []] }, expectedOutput: ["null", "null", "9", "null", "1", "2"], isHidden: true },
    ],
    learn: {
      intuition:
        "Two operations do all the work. siftUp carries a newly appended value towards the root while it beats its parent; siftDown carries the value moved into the root back towards the leaves while a child beats it. Both walk one tree path, so both are O(log n).",
      approach: [
        "Store the heap in an array; children of i are 2i + 1 and 2i + 2, parent is (i - 1) / 2.",
        "insert: append, then siftUp from the last index.",
        "extract: take index 0, move the last element into its place, shrink, then siftDown from 0.",
        "A single 'beats' comparison flipped by isMin turns a min-heap into a max-heap.",
      ],
      bruteForce: { idea: "Keep a sorted array and insert in place.", time: "O(n) per insert", space: "O(n)" },
      optimal: { idea: "Array-backed binary heap with siftUp and siftDown.", time: "O(log n) insert and extract", space: "O(n)" },
      pitfalls: [
        "siftDown must compare against the BETTER of the two children; picking the left one blindly breaks the invariant.",
        "The child index may run past the end — check bounds before every comparison.",
        "Duplicates are fine; the invariant is 'a parent beats its children', not 'strictly beats'.",
        "Writing the whole thing twice for min and max is unnecessary — one comparator flag covers both.",
      ],
      javaToolkit: ["Array-as-tree index arithmetic", "siftUp and siftDown", "A comparison flag instead of duplicated code"],
    },
  },

  "check-min-heap": {
    slug: "check-min-heap",
    title: "Check if an Array Represents a Min Heap",
    description:
      "Read the array as a complete binary tree — the children of index i sit at 2i + 1 and 2i + 2. Return whether every parent is less than or equal to both of its children.",
    constraints: ["0 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "isMinHeap",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isMinHeap(int[] arr) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 3, 5, 7, 9, 6] }, expectedOutput: true, explanation: "1 ≤ 3 and 5; 3 ≤ 7 and 9; 5 ≤ 6." },
      { id: 2, inputs: { arr: [10, 3, 5] }, expectedOutput: false, explanation: "The root 10 is bigger than both children." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { arr: [42] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { arr: [2, 2, 2, 2] }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { arr: [1, 2, 3, 4, 5, 6, 0] }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { arr: [1, 2] }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "The heap property is entirely local — a parent versus its own children — so one pass over the internal nodes settles it. There are only n / 2 of those; the second half of the array is all leaves and has nothing to check.",
      approach: [
        "For each index i from 0 to n / 2 - 1, check both children when they exist.",
        "Return false on the first violation, true if the loop finishes.",
      ],
      optimal: { idea: "Check the parent-child relation at every internal node.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "The right child may not exist for the last internal node — check 2i + 2 < n before reading it.",
        "Empty and single-element arrays are heaps by definition.",
        "The property is ≤, not <; an array of equal values is a valid heap.",
      ],
      javaToolkit: ["Index arithmetic for children", "n / 2 as the internal-node bound", "Bounds checks before comparison"],
    },
  },

  "convert-min-to-max": {
    slug: "convert-min-to-max",
    title: "Convert a Min Heap to a Max Heap",
    description:
      "Rearrange a min-heap array in place so it becomes a max-heap, using Floyd's bottom-up heapify: for i from n / 2 - 1 down to 0, sift arr[i] down, at each step swapping with the LARGER child, and with the LEFT child when they are equal. Return the resulting array. All test inputs hold distinct values, so the procedure is what fixes the answer.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "arr is a valid min-heap", "Values are distinct"],
    className: "Solution",
    methodName: "convertToMaxHeap",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] convertToMaxHeap(int[] arr) {
        // Floyd's bottom-up heapify: i from n/2 - 1 down to 0, sift down.
        return arr;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 2, 3, 4, 5, 6] }, expectedOutput: [6, 5, 3, 4, 2, 1] },
      { id: 2, inputs: { arr: [3, 4, 8, 11, 13] }, expectedOutput: [13, 11, 8, 3, 4] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [7] }, expectedOutput: [7], isHidden: true },
      { id: 4, inputs: { arr: [1, 2] }, expectedOutput: [2, 1], isHidden: true },
      { id: 5, inputs: { arr: [1, 2, 3] }, expectedOutput: [3, 2, 1], isHidden: true },
      { id: 6, inputs: { arr: [1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17] }, expectedOutput: [17, 15, 13, 9, 6, 5, 10, 4, 8, 3, 1], isHidden: true },
      { id: 7, inputs: { arr: [10, 20, 30, 40, 50, 60, 70] }, expectedOutput: [70, 50, 60, 40, 20, 10, 30], isHidden: true },
    ],
    learn: {
      intuition:
        "The leaves are already valid one-element heaps, so heapify from the last internal node backwards: by the time you sift a node down, both of its subtrees are already max-heaps. That is what makes the whole build O(n) rather than O(n log n).",
      approach: [
        "Start at index n / 2 - 1 and walk down to 0.",
        "Sift each value down: while a child beats it, swap with the larger child and continue from there.",
        "Ignore the fact that the input is a min-heap — the procedure works from any arrangement.",
      ],
      bruteForce: { idea: "Insert every element into a fresh max-heap.", time: "O(n log n)", space: "O(n)" },
      optimal: { idea: "Floyd's bottom-up heapify.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Heapifying top-down from index 0 does not work — a node's subtrees must be valid before it is sifted.",
        "Sifting must CONTINUE from the swapped position, not stop after one exchange.",
        "Many different arrays are valid max-heaps of the same values, which is why the procedure and the tie-break are specified rather than left open.",
      ],
      javaToolkit: ["Floyd's heapify", "siftDown with the larger child", "Why bottom-up build is O(n)"],
    },
  },
}
