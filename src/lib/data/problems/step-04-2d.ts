import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 4 — Binary search on 2D matrices (5 problems).
 *
 * The recurring idea is that a matrix with the right ordering guarantee can be
 * treated as something you already know how to search: a flattened sorted array,
 * a staircase, or a value range.
 */
export const step04TwoD: Record<string, ProblemMetadata> = {
  "row-max-ones": {
    slug: "row-max-ones",
    title: "Row With Maximum Number of 1s",
    description:
      "Every row of the matrix is sorted, so all 0s come before all 1s. Return the index of the row containing the most 1s. On a tie return the smallest index; if there are no 1s at all return -1.",
    constraints: ["1 ≤ rows, cols ≤ 500", "Each value is 0 or 1", "Each row is sorted ascending"],
    className: "Solution",
    methodName: "rowWithMaxOnes",
    parameters: [{ name: "matrix", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int rowWithMaxOnes(int[][] matrix) {
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[0, 0, 1], [0, 1, 1], [0, 0, 0]] }, expectedOutput: 1, explanation: "Row 1 has two 1s, more than any other." },
      { id: 2, inputs: { matrix: [[1, 1], [1, 1]] }, expectedOutput: 0, explanation: "Tie, so the smaller index wins." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[0, 0], [0, 0]] }, expectedOutput: -1, isHidden: true },
      { id: 4, inputs: { matrix: [[0, 1]] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { matrix: [[0, 0, 0], [1, 1, 1]] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { matrix: [[0]] }, expectedOutput: -1, isHidden: true },
    ],
    learn: {
      intuition:
        "Because each row is sorted, the count of 1s equals the number of columns minus the index of the first 1 — and that index is a lower-bound search. So each row costs log(cols) rather than cols.",
      approach: [
        "For each row, binary search for the first index holding a 1.",
        "The count of 1s is cols minus that index.",
        "Keep the best count and its row, only replacing on a strictly greater count so ties keep the earlier row.",
      ],
      bruteForce: { idea: "Count 1s in every cell.", time: "O(rows × cols)", space: "O(1)" },
      optimal: { idea: "Lower bound per row.", time: "O(rows × log cols)", space: "O(1)" },
      pitfalls: [
        "Using >= when comparing counts breaks the tie rule and returns the later row.",
        "A matrix with no 1s must return -1, not 0.",
        "There is also an O(rows + cols) staircase walk from the top right.",
      ],
      javaToolkit: ["Lower bound per row", "Strict > for tie-breaking"],
    },
  },

  "search-2d-matrix": {
    slug: "search-2d-matrix",
    title: "Search in a 2D Matrix",
    description:
      "Each row is sorted ascending, and the first value of every row is greater than the last value of the previous row. Return whether target is present, in O(log(rows × cols)).",
    constraints: ["1 ≤ rows, cols ≤ 100", "-10^9 ≤ values, target ≤ 10^9"],
    className: "Solution",
    methodName: "searchMatrix",
    parameters: [
      { name: "matrix", type: "int[][]" },
      { name: "target", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3 }, expectedOutput: true },
      { id: 2, inputs: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 13 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[1]], target: 1 }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { matrix: [[1]], target: 2 }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { matrix: [[1, 2], [3, 4]], target: 4 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { matrix: [[1, 3], [5, 7]], target: 0 }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Because every row starts after the previous one ends, reading the matrix row by row gives one fully sorted sequence. So treat it as a sorted array of length rows × cols and translate each index back into a row and column.",
      approach: [
        "Binary search over 0 .. rows × cols - 1.",
        "Convert mid into matrix[mid / cols][mid % cols].",
        "Compare and halve exactly as in a 1D search.",
      ],
      bruteForce: { idea: "Check every cell.", time: "O(rows × cols)", space: "O(1)" },
      optimal: { idea: "Binary search over the flattened index.", time: "O(log(rows × cols))", space: "O(1)" },
      pitfalls: [
        "Swapping the division and modulo — the row is index / cols and the column is index % cols.",
        "Using rows where cols belongs in the conversion, which silently reads the wrong cells on non-square matrices.",
        "This flattening is only valid because of the row-start guarantee; the next problem drops it.",
      ],
      javaToolkit: ["Index flattening: idx / cols, idx % cols", "Binary search over a virtual array"],
    },
  },

  "search-row-col-sorted": {
    slug: "search-row-col-sorted",
    title: "Search in a Row- and Column-Wise Sorted Matrix",
    description:
      "Every row is sorted left to right and every column top to bottom, but rows do not continue from one another. Return whether target is present.",
    constraints: ["1 ≤ rows, cols ≤ 300", "-10^9 ≤ values, target ≤ 10^9"],
    className: "Solution",
    methodName: "searchMatrix",
    parameters: [
      { name: "matrix", type: "int[][]" },
      { name: "target", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]], target: 5 }, expectedOutput: true },
      { id: 2, inputs: { matrix: [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]], target: 13 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[1]], target: 1 }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { matrix: [[1, 2], [3, 4]], target: 3 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { matrix: [[1, 2], [3, 4]], target: 5 }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { matrix: [[-5, -3], [-2, 0]], target: -2 }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Start at the top-right corner, which is the largest in its row and the smallest in its column. That makes every comparison decisive: too big means the whole column is too big, too small means the whole row is too small.",
      approach: [
        "Begin at row 0, column cols - 1.",
        "If the value equals target, done. If it is greater, move left one column. If smaller, move down one row.",
        "Stop when you walk off the matrix.",
      ],
      bruteForce: { idea: "Binary search each row separately.", time: "O(rows × log cols)", space: "O(1)" },
      optimal: { idea: "Staircase walk from the top-right corner.", time: "O(rows + cols)", space: "O(1)" },
      pitfalls: [
        "Flattening the matrix as in the previous problem is wrong here — the rows are not continuous.",
        "Starting at the top-left or bottom-right corner gives an ambiguous comparison and cannot eliminate anything.",
        "The bottom-left corner works equally well, with the directions mirrored.",
      ],
      javaToolkit: ["Staircase search", "Choosing a corner with a decisive comparison"],
    },
  },

  "find-peak-2d": {
    slug: "find-peak-2d",
    title: "Find a Peak Element in a 2D Matrix",
    description:
      "A peak is a cell strictly greater than its four orthogonal neighbours; cells outside the matrix count as negative infinity. Return {row, col} of any peak. Aim for O(rows × log cols).",
    constraints: ["1 ≤ rows, cols ≤ 500", "No two adjacent cells are equal"],
    className: "Solution",
    methodName: "findPeakGrid",
    parameters: [{ name: "matrix", type: "int[][]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] findPeakGrid(int[][] matrix) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[1, 2], [3, 4]] }, expectedOutput: [1, 1], explanation: "4 beats 3 to its left and 2 above it, and it is the only peak here." },
      { id: 2, inputs: { matrix: [[10, 8, 6], [4, 3, 2], [1, 0, -1]] }, expectedOutput: [0, 0], explanation: "Everything descends away from the top-left corner." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[1]] }, expectedOutput: [0, 0], isHidden: true },
      { id: 4, inputs: { matrix: [[1, 2]] }, expectedOutput: [0, 1], isHidden: true },
      { id: 5, inputs: { matrix: [[2], [1]] }, expectedOutput: [0, 0], isHidden: true },
      { id: 6, inputs: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] }, expectedOutput: [2, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Binary search over columns rather than cells. Take the middle column, find its largest value, and compare that value with its left and right neighbours: whichever side is bigger must contain a peak, exactly as in the 1D version.",
      approach: [
        "Search over columns with low = 0 and high = cols - 1.",
        "For the middle column, find the row holding its maximum.",
        "If the value to its left is larger, search the left columns; if the right is larger, search right; otherwise it is a peak.",
      ],
      bruteForce: { idea: "Test every cell against its neighbours.", time: "O(rows × cols)", space: "O(1)" },
      optimal: { idea: "Binary search on columns, scanning each candidate column for its maximum.", time: "O(rows × log cols)", space: "O(1)" },
      pitfalls: [
        "Comparing the middle cell rather than the column maximum breaks the guarantee that a peak lies on the chosen side.",
        "Reading a neighbouring column without a bounds check at the edges.",
        "Multiple peaks can exist in general. Every test here has exactly one, so any correct method reaches the same answer.",
      ],
      javaToolkit: ["Binary search over one dimension", "Scanning a column for its maximum"],
    },
  },

  "matrix-median": {
    slug: "matrix-median",
    title: "Median of a Row-Wise Sorted Matrix",
    description:
      "Every row is sorted ascending and the total number of cells is odd. Return the median of all values, without materialising the full sorted list.",
    constraints: ["1 ≤ rows, cols ≤ 100", "rows × cols is odd", "1 ≤ values ≤ 10^9"],
    className: "Solution",
    methodName: "findMedian",
    parameters: [{ name: "matrix", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int findMedian(int[][] matrix) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { matrix: [[1, 3, 5], [2, 6, 9], [3, 6, 9]] }, expectedOutput: 5, explanation: "Sorted, the nine values are 1,2,3,3,5,6,6,9,9 and the middle one is 5." },
      { id: 2, inputs: { matrix: [[1, 3, 8], [2, 3, 4], [1, 2, 5]] }, expectedOutput: 3 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { matrix: [[1]] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { matrix: [[1, 2, 3]] }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { matrix: [[5], [3], [1]] }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { matrix: [[1, 1, 1], [1, 1, 1], [1, 1, 2]] }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Binary search on the VALUE rather than on any index. For a candidate value you can count how many cells are less than or equal to it in O(rows × log cols) using upper bound per row. The median is the smallest value whose count reaches half the cells plus one.",
      approach: [
        "Search the value range from the smallest first-column entry to the largest last-column entry.",
        "For a candidate mid, sum upperBound(row, mid) across all rows.",
        "If that count is less than (rows × cols) / 2 + 1, search higher; otherwise search lower, remembering mid.",
      ],
      bruteForce: { idea: "Flatten everything and sort.", time: "O(rows × cols × log(rows × cols))", space: "O(rows × cols)" },
      optimal: { idea: "Binary search on the answer, counting with upper bound per row.", time: "O(log(range) × rows × log cols)", space: "O(1)" },
      pitfalls: [
        "Counting strictly-less-than instead of less-than-or-equal breaks on matrices full of duplicates — a hidden case covers it.",
        "The answer must be a value present in the matrix, which searching for the smallest qualifying value guarantees.",
        "This is the same 'binary search on the answer' pattern as the search-space problems in this step.",
      ],
      javaToolkit: ["Binary search on the answer", "Counting with upper bound", "Predicate that is monotonic in the answer"],
    },
  },
}
