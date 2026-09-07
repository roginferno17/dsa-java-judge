import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 7 — Combinations, subsets and backtracking (14 problems).
 *
 * Every problem returning a collection states an exact order, because
 * backtracking naturally produces many valid enumerations of the same answer and
 * a judge cannot accept them all.
 */
export const step07Backtracking: Record<string, ProblemMetadata> = {
  "combination-sum": {
    slug: "combination-sum",
    title: "Combination Sum",
    description:
      "Given distinct candidates, return every unique combination summing to the target. A candidate may be reused any number of times. Sort each combination ascending, and return the combinations in ascending lexicographic order.",
    constraints: ["1 ≤ candidates.length ≤ 30", "2 ≤ candidates[i] ≤ 40", "1 ≤ target ≤ 40"],
    className: "Solution",
    methodName: "combinationSum",
    parameters: [
      { name: "candidates", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Each combination ascending; combinations in lexicographic order.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { candidates: [2, 3, 6, 7], target: 7 }, expectedOutput: [[2, 2, 3], [7]] },
      { id: 2, inputs: { candidates: [2, 3, 5], target: 8 }, expectedOutput: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { candidates: [2], target: 1 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { candidates: [3], target: 9 }, expectedOutput: [[3, 3, 3]], isHidden: true },
      { id: 5, inputs: { candidates: [7, 3, 2], target: 5 }, expectedOutput: [[2, 3]], isHidden: true },
      { id: 6, inputs: { candidates: [4, 5], target: 3 }, expectedOutput: [], isHidden: true },
    ],
    learn: {
      intuition:
        "Reuse is allowed, so after picking a candidate you may pick it again — but never go back to an earlier one, or you would produce the same combination in a different order. Staying at or after the current index is what enforces uniqueness.",
      approach: [
        "Sort the candidates so the output order falls out naturally.",
        "Recurse carrying a start index and the remaining target.",
        "At each step, either take the current candidate and recurse with the SAME index, or move to the next index.",
        "Record when the remainder reaches 0, and prune when it goes negative.",
      ],
      bruteForce: { idea: "Enumerate every multiset and filter.", time: "exponential", space: "O(target)" },
      optimal: { idea: "Backtracking with a start index and pruning.", time: "O(2^target)", space: "O(target)" },
      pitfalls: [
        "Recursing with index + 1 after taking forbids reuse, which this problem allows.",
        "Recursing from 0 rather than the start index yields [2,3] and [3,2] as separate answers.",
        "Sorting first both prunes earlier and gives the required output order.",
      ],
      javaToolkit: ["Backtracking with a start index", "Take-with-reuse vs skip", "Pruning on a negative remainder"],
    },
  },

  "combination-sum-2": {
    slug: "combination-sum-2",
    title: "Combination Sum II",
    description:
      "Candidates may repeat, and each may be used at most ONCE. Return every unique combination summing to the target, each sorted ascending, with the combinations in ascending lexicographic order.",
    constraints: ["1 ≤ candidates.length ≤ 100", "1 ≤ candidates[i] ≤ 50", "1 ≤ target ≤ 30"],
    className: "Solution",
    methodName: "combinationSum2",
    parameters: [
      { name: "candidates", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        // Each candidate used at most once. No duplicate combinations.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { candidates: [10, 1, 2, 7, 6, 1, 5], target: 8 }, expectedOutput: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] },
      { id: 2, inputs: { candidates: [2, 5, 2, 1, 2], target: 5 }, expectedOutput: [[1, 2, 2], [5]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { candidates: [1], target: 1 }, expectedOutput: [[1]], isHidden: true },
      { id: 4, inputs: { candidates: [1, 1], target: 3 }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { candidates: [2, 2, 2], target: 4 }, expectedOutput: [[2, 2]], isHidden: true },
      { id: 6, inputs: { candidates: [3, 1, 3, 5, 1, 1], target: 8 }, expectedOutput: [[1, 1, 1, 5], [1, 1, 3, 3], [3, 5]], isHidden: true },
    ],
    learn: {
      intuition:
        "Two changes from the previous problem: advance past the taken element so it cannot repeat, and skip duplicate VALUES at the same recursion depth. The second is what stops [1,1,6] appearing twice when there are two 1s.",
      approach: [
        "Sort the candidates so equal values sit together.",
        "Loop i from the start index; skip when i > start and candidates[i] equals candidates[i - 1].",
        "Take candidates[i] and recurse from i + 1.",
        "Break out of the loop once the candidate exceeds the remaining target.",
      ],
      bruteForce: { idea: "Generate all subsets and deduplicate with a set.", time: "O(2^n × n)", space: "O(2^n)" },
      optimal: { idea: "Sort, then skip duplicates at each depth.", time: "O(2^n × n)", space: "O(n)" },
      pitfalls: [
        "Skipping whenever candidates[i] equals candidates[i-1] without the i > start guard wrongly forbids [1,1,6].",
        "Recursing from i rather than i + 1 reintroduces reuse.",
        "[2,2,2] with target 4 must give exactly one [2,2] — a hidden case checks it.",
      ],
      javaToolkit: ["Sorting to group duplicates", "The i > start duplicate skip", "Early break on a sorted array"],
    },
  },

  "subset-sum-1": {
    slug: "subset-sum-1",
    title: "Subset Sum I",
    description: "Return the sum of every subset of the array, sorted ascending.",
    constraints: ["0 ≤ nums.length ≤ 15", "0 ≤ nums[i] ≤ 10^4"],
    className: "Solution",
    methodName: "subsetSums",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> subsetSums(int[] nums) {
        // All 2^n subset sums, sorted ascending.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 3] }, expectedOutput: [0, 2, 3, 5], explanation: "Sums of [], [2], [3] and [2,3]." },
      { id: 2, inputs: { nums: [5, 2, 1] }, expectedOutput: [0, 1, 2, 3, 5, 6, 7, 8] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [] }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { nums: [0] }, expectedOutput: [0, 0], isHidden: true },
      { id: 5, inputs: { nums: [1, 1] }, expectedOutput: [0, 1, 1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "There are exactly 2^n subsets and this problem wants every sum, including duplicates. So generate them all and sort — no deduplication.",
      approach: [
        "Recurse over the index carrying a running sum.",
        "At the end of the array, record the sum.",
        "Take and skip at every index, then sort the collected sums.",
      ],
      optimal: { idea: "Enumerate all subset sums, then sort.", time: "O(2^n log(2^n))", space: "O(2^n)" },
      pitfalls: [
        "The empty subset contributes a 0 that must appear.",
        "Duplicate sums are kept — [1,1] gives four values, not three.",
        "A zero in the input doubles the count of every sum, which the [0] case shows.",
      ],
      javaToolkit: ["take / skip recursion", "Collections.sort", "Keeping duplicates deliberately"],
    },
  },

  "subset-sum-2": {
    slug: "subset-sum-2",
    title: "Subset Sum II (Unique Subsets)",
    description:
      "The array may contain duplicates. Return every UNIQUE subset, each sorted ascending, with the subsets in ascending lexicographic order.",
    constraints: ["1 ≤ nums.length ≤ 10", "-10 ≤ nums[i] ≤ 10"],
    className: "Solution",
    methodName: "subsetsWithDup",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        // Unique subsets, each ascending, in lexicographic order.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 2] }, expectedOutput: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
      { id: 2, inputs: { nums: [0] }, expectedOutput: [[], [0]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 1] }, expectedOutput: [[], [1], [1, 1]], isHidden: true },
      { id: 4, inputs: { nums: [4, 4, 4, 1, 4] }, expectedOutput: [[], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4], [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]], isHidden: true },
      { id: 5, inputs: { nums: [-1, 0] }, expectedOutput: [[], [-1], [-1, 0], [0]], isHidden: true },
    ],
    learn: {
      intuition:
        "Same duplicate-skipping rule as Combination Sum II: sort so equal values are adjacent, then at each depth take a given value only from its first occurrence. Every subset is recorded on entry, which produces lexicographic order.",
      approach: [
        "Sort the array.",
        "At each recursion, record the current subset immediately.",
        "Loop i from start, skipping when i > start and nums[i] equals nums[i - 1].",
        "Take nums[i], recurse from i + 1, then undo.",
      ],
      bruteForce: { idea: "Generate all 2^n subsets and deduplicate with a set of sorted lists.", time: "O(2^n × n log n)", space: "O(2^n × n)" },
      optimal: {
        idea: "The same duplicate skip as Combination Sum II, but recording at every node rather than only on a sum match.",
        time: "O(2^n × n)",
        space: "O(n)",
      },
      pitfalls: [
        "Recording only at the deepest level misses every intermediate subset.",
        "Without sorting first, equal values are not adjacent and the skip rule cannot work.",
        "Negative values are fine as long as you sort — the [-1,0] case checks it.",
      ],
      javaToolkit: ["Recording at every node", "Duplicate skip at each depth", "Backtracking with undo"],
    },
  },

  "combination-sum-3": {
    slug: "combination-sum-3",
    title: "Combination Sum III",
    description:
      "Return every combination of exactly k distinct digits from 1 to 9 summing to n. Each combination ascending, combinations in ascending lexicographic order.",
    constraints: ["2 ≤ k ≤ 9", "1 ≤ n ≤ 60"],
    className: "Solution",
    methodName: "combinationSum3",
    parameters: [
      { name: "k", type: "int" },
      { name: "n", type: "int" },
    ],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        // Digits 1-9, each used at most once.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { k: 3, n: 7 }, expectedOutput: [[1, 2, 4]] },
      { id: 2, inputs: { k: 3, n: 9 }, expectedOutput: [[1, 2, 6], [1, 3, 5], [2, 3, 4]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { k: 4, n: 1 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { k: 9, n: 45 }, expectedOutput: [[1, 2, 3, 4, 5, 6, 7, 8, 9]], isHidden: true },
      { id: 5, inputs: { k: 2, n: 18 }, expectedOutput: [], isHidden: true },
      { id: 6, inputs: { k: 2, n: 17 }, expectedOutput: [[8, 9]], isHidden: true },
    ],
    learn: {
      intuition:
        "A tightly bounded search: only nine candidates, each usable once, and a fixed size. Both constraints prune hard, so the tree stays tiny.",
      approach: [
        "Recurse carrying the next digit to consider, the count used and the remaining sum.",
        "Record when count reaches k and the remainder is exactly 0.",
        "Loop the digit from the start value up to 9, taking it and recursing from digit + 1.",
        "Prune when the remainder goes negative or too few digits remain.",
      ],
      optimal: { idea: "Bounded backtracking over the digits 1-9.", time: "O(C(9,k))", space: "O(k)" },
      pitfalls: [
        "Both conditions must hold at the base case — the right count with a non-zero remainder is not an answer.",
        "The maximum reachable sum with k digits is limited, so many (k, n) pairs have no solution at all.",
        "Digits cannot repeat, so always recurse from digit + 1.",
      ],
      javaToolkit: ["Bounded backtracking", "Dual base-case conditions", "Pruning on remainder and count"],
    },
  },

  "letter-combinations-phone": {
    slug: "letter-combinations-phone",
    title: "Letter Combinations of a Phone Number",
    description:
      "Given digits 2-9, return every letter combination the number could spell, using the standard phone keypad, in ascending lexicographic order. An empty input gives an empty list.",
    constraints: ["0 ≤ digits.length ≤ 4", "digits contains only 2-9"],
    className: "Solution",
    methodName: "letterCombinations",
    parameters: [{ name: "digits", type: "String" }],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> letterCombinations(String digits) {
        // 2=abc 3=def 4=ghi 5=jkl 6=mno 7=pqrs 8=tuv 9=wxyz
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { digits: "23" }, expectedOutput: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] },
      { id: 2, inputs: { digits: "2" }, expectedOutput: ["a", "b", "c"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { digits: "" }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { digits: "79" }, expectedOutput: ["pw", "px", "py", "pz", "qw", "qx", "qy", "qz", "rw", "rx", "ry", "rz", "sw", "sx", "sy", "sz"], isHidden: true },
      { id: 5, inputs: { digits: "9" }, expectedOutput: ["w", "x", "y", "z"], isHidden: true },
    ],
    learn: {
      intuition:
        "A cartesian product expressed as recursion: one level per digit, branching over that digit's letters. Because each keypad string is already in alphabetical order, taking them in order gives lexicographic output.",
      approach: [
        "Map each digit to its letters.",
        "Recurse over the digit index, appending one letter per level.",
        "Record when the index reaches the end of the input.",
      ],
      optimal: { idea: "Backtracking over one digit per level.", time: "O(4^n × n)", space: "O(n)" },
      pitfalls: [
        "An empty input must give an empty list, not a list containing an empty string.",
        "7 and 9 have four letters where the rest have three — a hidden case covers both.",
        "An iterative queue-based build works equally well and produces the same order.",
      ],
      javaToolkit: ["Digit-to-letters mapping", "Cartesian product by recursion", "StringBuilder with undo"],
    },
  },

  "palindrome-partitioning": {
    slug: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    description:
      "Return every way to split the string so that each piece is a palindrome. Pieces stay in order; return the partitions in the order a left-to-right backtracking search finds them, taking the shortest first piece first.",
    constraints: ["1 ≤ s.length ≤ 16", "Lowercase English letters"],
    className: "Solution",
    methodName: "partition",
    parameters: [{ name: "s", type: "String" }],
    returnType: "List<List<String>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<String>> partition(String s) {
        // Try the shortest first piece first.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "aab" }, expectedOutput: [["a", "a", "b"], ["aa", "b"]] },
      { id: 2, inputs: { s: "a" }, expectedOutput: [["a"]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "ab" }, expectedOutput: [["a", "b"]], isHidden: true },
      { id: 4, inputs: { s: "aaa" }, expectedOutput: [["a", "a", "a"], ["a", "aa"], ["aa", "a"], ["aaa"]], isHidden: true },
      { id: 5, inputs: { s: "abba" }, expectedOutput: [["a", "b", "b", "a"], ["a", "bb", "a"], ["abba"]], isHidden: true },
    ],
    learn: {
      intuition:
        "At each position, try every prefix of the remainder; whenever a prefix is a palindrome, commit to it and recurse on what is left. Trying shorter prefixes first fixes the output order.",
      approach: [
        "Recurse over the start index.",
        "Base case: start reaches the end — record the current pieces.",
        "For each end from start, check whether the substring is a palindrome; if so, take it and recurse from end + 1.",
        "Undo after each branch.",
      ],
      bruteForce: { idea: "Generate all 2^(n-1) cut positions and validate each partition.", time: "O(2^n × n²)", space: "O(n)" },
      optimal: { idea: "Backtracking that only commits to palindromic prefixes.", time: "O(2^n × n)", space: "O(n)" },
      pitfalls: [
        "Trying longer prefixes first yields the right partitions in the wrong order.",
        "Precomputing an isPalindrome table removes the repeated O(n) checks.",
        "Every single character is a palindrome, so a partition always exists.",
      ],
      javaToolkit: ["Backtracking over cut points", "Palindrome checking with two pointers", "Choice ordering fixes output order"],
    },
  },

  "word-search": {
    slug: "word-search",
    title: "Word Search",
    description:
      "Return whether the word can be spelled by moving between orthogonally adjacent cells of the grid, without reusing a cell within a single path.",
    constraints: ["1 ≤ rows, cols ≤ 6", "1 ≤ word.length ≤ 15"],
    className: "Solution",
    methodName: "exist",
    parameters: [
      { name: "board", type: "char[][]" },
      { name: "word", type: "String" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean exist(char[][] board, String word) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { board: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], word: "ABCCED" }, expectedOutput: true },
      { id: 2, inputs: { board: [["A", "B"], ["C", "D"]], word: "ABCD" }, expectedOutput: false, explanation: "B and C are not adjacent." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { board: [["A"]], word: "A" }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { board: [["A"]], word: "AA" }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { board: [["A", "A"]], word: "AAA" }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { board: [["C", "A", "A"], ["A", "A", "A"], ["B", "C", "D"]], word: "AAB" }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Depth-first search from every cell, matching one character per step. The essential detail is marking a cell as used on the way in and UNMARKING it on the way out, so a different path may reuse it.",
      approach: [
        "For every cell matching the first character, start a search.",
        "At depth i, if the cell matches word[i], mark it, try all four neighbours at i + 1, then unmark.",
        "Succeed when i reaches the word's length.",
      ],
      bruteForce: { idea: "Enumerate every path of the word's length.", time: "far worse", space: "O(n)" },
      optimal: { idea: "DFS with backtracking and in-place marking.", time: "O(rows × cols × 4^len)", space: "O(len)" },
      pitfalls: [
        "Failing to unmark on the way out blocks valid paths that reuse the cell later — [A,A] with AAA relies on correct marking.",
        "Marking with a sentinel like '#' avoids a separate visited array, but you must restore the original character.",
        "A word longer than the number of cells can never fit.",
      ],
      javaToolkit: ["DFS with backtracking", "In-place marking and restoring", "Four-direction offsets"],
    },
  },

  "n-queen": {
    slug: "n-queen",
    title: "N-Queens",
    description:
      "Place n queens on an n×n board so none attack each other. Return every solution as a list of board rows using 'Q' and '.', sorted ascending by the rows joined together, so the order is unambiguous.",
    constraints: ["1 ≤ n ≤ 9"],
    className: "Solution",
    methodName: "solveNQueens",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<List<String>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        // Each solution is n strings of length n using 'Q' and '.'.
        // Sort the solutions ascending by their rows joined together.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 4 }, expectedOutput: [["..Q.", "Q...", "...Q", ".Q.."], [".Q..", "...Q", "Q...", "..Q."]] },
      { id: 2, inputs: { n: 1 }, expectedOutput: [["Q"]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 2 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { n: 3 }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { n: 5 }, expectedOutput: [["....Q", "..Q..", "Q....", "...Q.", ".Q..."], ["....Q", ".Q...", "...Q.", "Q....", "..Q.."], ["...Q.", ".Q...", "....Q", "..Q..", "Q...."], ["...Q.", "Q....", "..Q..", "....Q", ".Q..."], ["..Q..", "....Q", ".Q...", "...Q.", "Q...."], ["..Q..", "Q....", "...Q.", ".Q...", "....Q"], [".Q...", "....Q", "..Q..", "Q....", "...Q."], [".Q...", "...Q.", "Q....", "..Q..", "....Q"], ["Q....", "...Q.", ".Q...", "....Q", "..Q.."], ["Q....", "..Q..", "....Q", ".Q...", "...Q."]], isHidden: true },
    ],
    learn: {
      intuition:
        "Place one queen per column, left to right. Because a column can hold only one queen, you only ever need to check the row and the two diagonals — and each of those is a single array lookup if you index them right.",
      approach: [
        "Recurse over the column index.",
        "For each row, check whether that row and both diagonals are free.",
        "Mark, recurse to the next column, then unmark.",
        "Record when every column is filled.",
      ],
      bruteForce: { idea: "Try every placement of n queens and validate.", time: "C(n², n)", space: "O(n)" },
      optimal: { idea: "Column-by-column backtracking with row and diagonal marks.", time: "O(n!)", space: "O(n)" },
      pitfalls: [
        "The two diagonal keys are row + col and row - col + n - 1; getting either wrong silently accepts attacking queens.",
        "n = 2 and n = 3 have no solutions at all, which is a good sanity check.",
        "Unmarking on the way out is what makes it a search rather than a single attempt.",
        "The solution COUNT is fixed maths — 2 for n=4 and 10 for n=5 — but the order a search finds them in is not, which is why this problem asks you to sort.",
      ],
      javaToolkit: ["Boolean arrays for rows and diagonals", "row + col and row - col + n - 1", "Backtracking with undo"],
    },
  },

  "rat-in-maze": {
    slug: "rat-in-maze",
    title: "Rat in a Maze",
    description:
      "A rat starts at the top-left and must reach the bottom-right, moving only through cells holding 1. Return every path as a string of moves using D, L, R and U, sorted in ascending lexicographic order.",
    constraints: ["1 ≤ n ≤ 5", "The grid is n×n of 0 and 1"],
    className: "Solution",
    methodName: "findPaths",
    parameters: [{ name: "grid", type: "int[][]" }],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> findPaths(int[][] grid) {
        // Moves: D(own), L(eft), R(ight), U(p). Sorted ascending.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { grid: [[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]] }, expectedOutput: ["DDRDRR", "DRDDRR"] },
      { id: 2, inputs: { grid: [[1, 0], [1, 1]] }, expectedOutput: ["DR"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { grid: [[1]] }, expectedOutput: [""], isHidden: true },
      { id: 4, inputs: { grid: [[0, 1], [1, 1]] }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { grid: [[1, 1], [1, 0]] }, expectedOutput: [], isHidden: true },
      { id: 6, inputs: { grid: [[1, 1], [1, 1]] }, expectedOutput: ["DR", "RD"], isHidden: true },
    ],
    learn: {
      intuition:
        "DFS from the start, recording the moves taken. Trying the directions in alphabetical order — D, L, R, U — makes the collected paths come out sorted with no sorting step.",
      approach: [
        "Return nothing immediately if the start or destination cell is blocked.",
        "Mark the current cell visited, then try D, L, R and U in that order.",
        "Append the move letter, recurse, and undo both the letter and the mark.",
        "Record the path string on reaching the bottom-right.",
      ],
      optimal: { idea: "DFS with backtracking, directions tried alphabetically.", time: "O(4^(n²))", space: "O(n²)" },
      pitfalls: [
        "A 1×1 grid means you are already there, so the answer is a single empty string — not an empty list.",
        "Forgetting to unmark on the way out finds only one path.",
        "Trying directions in another order needs an explicit sort afterwards.",
      ],
      javaToolkit: ["DFS on a grid", "Direction ordering for sorted output", "Visited marking with undo"],
    },
  },

  "word-break": {
    slug: "word-break",
    title: "Word Break",
    description: "Return whether the string can be segmented into a sequence of one or more dictionary words. Words may be reused.",
    constraints: ["1 ≤ s.length ≤ 300", "1 ≤ dictionary size ≤ 1000"],
    className: "Solution",
    methodName: "wordBreak",
    parameters: [
      { name: "s", type: "String" },
      { name: "dict", type: "String[]" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public boolean wordBreak(String s, String[] dict) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "leetcode", dict: ["leet", "code"] }, expectedOutput: true },
      { id: 2, inputs: { s: "catsandog", dict: ["cats", "dog", "sand", "and", "cat"] }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a", dict: ["a"] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { s: "aaaaaaa", dict: ["aaaa", "aaa"] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { s: "ab", dict: ["a"] }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { s: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", dict: ["a", "aa", "aaa", "aaaa"] }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Plain recursion re-solves the same suffixes an exponential number of times. Remembering the answer for each starting index collapses that to one computation per position — the step from backtracking to dynamic programming.",
      approach: [
        "Put the dictionary in a HashSet.",
        "Recurse over the start index; true when it reaches the end.",
        "For each end, if the prefix is a word and the remainder breaks, return true.",
        "Cache the result per start index.",
      ],
      bruteForce: { idea: "Try every split without caching.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Recursion with memoisation, or bottom-up DP.", time: "O(n² × wordLength)", space: "O(n)" },
      pitfalls: [
        "Without memoisation the last hidden case — thirty a's followed by a b — takes exponential time and hits the time limit.",
        "A Set lookup is O(1); scanning the dictionary array per prefix adds a factor you do not need.",
        "Reuse is allowed, so a word may appear many times.",
      ],
      javaToolkit: ["HashSet for the dictionary", "Memoisation by start index", "Recursion into DP"],
    },
  },

  "m-coloring": {
    slug: "m-coloring",
    title: "M-Coloring Problem",
    description:
      "Given a graph as an adjacency matrix, return whether its vertices can be coloured with at most m colours so that no edge joins two vertices of the same colour.",
    constraints: ["1 ≤ vertices ≤ 10", "1 ≤ m ≤ 10"],
    className: "Solution",
    methodName: "graphColoring",
    parameters: [
      { name: "graph", type: "int[][]" },
      { name: "m", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean graphColoring(int[][] graph, int m) {
        // graph[i][j] == 1 means i and j are adjacent.
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { graph: [[0, 1, 1, 1], [1, 0, 1, 0], [1, 1, 0, 1], [1, 0, 1, 0]], m: 3 }, expectedOutput: true },
      { id: 2, inputs: { graph: [[0, 1, 1, 1], [1, 0, 1, 1], [1, 1, 0, 1], [1, 1, 1, 0]], m: 3 }, expectedOutput: false, explanation: "Four mutually adjacent vertices need four colours." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { graph: [[0]], m: 1 }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { graph: [[0, 1], [1, 0]], m: 1 }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { graph: [[0, 1], [1, 0]], m: 2 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { graph: [[0, 0], [0, 0]], m: 1 }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Assign colours one vertex at a time, and before committing check only the neighbours already coloured. If no colour fits, undo and let the previous vertex try something else.",
      approach: [
        "Recurse over the vertex index; success when every vertex is coloured.",
        "For each colour 1..m, check it against all coloured neighbours.",
        "Assign, recurse, and undo on failure.",
      ],
      bruteForce: { idea: "Try all m^v assignments and validate each.", time: "O(m^v × v²)", space: "O(v)" },
      optimal: { idea: "Backtracking that validates before descending.", time: "O(m^v)", space: "O(v)" },
      pitfalls: [
        "Checking only earlier vertices is enough, because later ones are still uncoloured.",
        "A graph with no edges is colourable with a single colour.",
        "Fixing vertex 0's colour cuts the search by a factor of m without losing solutions.",
      ],
      javaToolkit: ["Backtracking over vertices", "Validity check before recursing", "Adjacency matrix traversal"],
    },
  },

  "sudoku-solver": {
    slug: "sudoku-solver",
    title: "Sudoku Solver",
    description:
      "Solve the 9×9 Sudoku in place, where 0 marks an empty cell. Every puzzle given has exactly one solution.",
    constraints: ["The board is 9×9", "Digits 1-9, with 0 for empty", "Exactly one solution exists"],
    className: "Solution",
    methodName: "solveSudoku",
    parameters: [{ name: "board", type: "int[][]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `class Solution {
    public void solveSudoku(int[][] board) {
        // Fill the board in place. 0 marks an empty cell.
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { board: [[5, 3, 0, 0, 7, 0, 0, 0, 0], [6, 0, 0, 1, 9, 5, 0, 0, 0], [0, 9, 8, 0, 0, 0, 0, 6, 0], [8, 0, 0, 0, 6, 0, 0, 0, 3], [4, 0, 0, 8, 0, 3, 0, 0, 1], [7, 0, 0, 0, 2, 0, 0, 0, 6], [0, 6, 0, 0, 0, 0, 2, 8, 0], [0, 0, 0, 4, 1, 9, 0, 0, 5], [0, 0, 0, 0, 8, 0, 0, 7, 9]] },
        expectedOutput: [[5, 3, 4, 6, 7, 8, 9, 1, 2], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7], [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6], [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9]],
        explanation: "The classic worked example.",
      },
      {
        id: 2,
        inputs: { board: [[1, 2, 3, 4, 5, 6, 7, 8, 0], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6], [2, 1, 4, 3, 6, 5, 8, 9, 7], [3, 6, 5, 8, 9, 7, 2, 1, 4], [8, 9, 7, 2, 1, 4, 3, 6, 5], [5, 3, 1, 6, 4, 2, 9, 7, 8], [6, 4, 2, 9, 7, 8, 5, 3, 1], [9, 7, 8, 5, 3, 1, 6, 4, 2]] },
        expectedOutput: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6], [2, 1, 4, 3, 6, 5, 8, 9, 7], [3, 6, 5, 8, 9, 7, 2, 1, 4], [8, 9, 7, 2, 1, 4, 3, 6, 5], [5, 3, 1, 6, 4, 2, 9, 7, 8], [6, 4, 2, 9, 7, 8, 5, 3, 1], [9, 7, 8, 5, 3, 1, 6, 4, 2]],
        explanation: "A single empty cell.",
      },
    ],
    hiddenTestCases: [
      {
        id: 3,
        inputs: { board: [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 8, 5], [0, 0, 1, 0, 2, 0, 0, 0, 0], [0, 0, 0, 5, 0, 7, 0, 0, 0], [0, 0, 4, 0, 0, 0, 1, 0, 0], [0, 9, 0, 0, 0, 0, 0, 0, 0], [5, 0, 0, 0, 0, 0, 0, 7, 3], [0, 0, 2, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 4, 0, 0, 0, 9]] },
        expectedOutput: [[9, 8, 7, 6, 5, 4, 3, 2, 1], [2, 4, 6, 1, 7, 3, 9, 8, 5], [3, 5, 1, 9, 2, 8, 7, 4, 6], [1, 2, 8, 5, 3, 7, 6, 9, 4], [6, 3, 4, 8, 9, 2, 1, 5, 7], [7, 9, 5, 4, 6, 1, 8, 3, 2], [5, 1, 9, 2, 8, 6, 4, 7, 3], [4, 7, 2, 3, 1, 9, 5, 6, 8], [8, 6, 3, 7, 4, 5, 2, 1, 9]],
        isHidden: true,
      },
    ],
    learn: {
      intuition:
        "Find an empty cell, try each digit that does not immediately conflict, and recurse. If nothing works the cell is unsolvable given earlier choices, so undo and let the previous cell try again. The validity check does all the pruning.",
      approach: [
        "Scan for the first cell holding 0; if there is none, the board is solved.",
        "For each digit 1-9, check its row, its column and its 3×3 box.",
        "Place it, recurse, and reset the cell to 0 if the recursion fails.",
      ],
      bruteForce: { idea: "Fill every empty cell arbitrarily and validate the whole board.", time: "9^empty", space: "O(1)" },
      optimal: { idea: "Backtracking with per-placement validity checks.", time: "O(9^empty) worst case, far less in practice", space: "O(empty) call stack" },
      pitfalls: [
        "The box origin is (row / 3) * 3 and (col / 3) * 3 — integer division then multiplication, not row / 3 alone.",
        "Forgetting to reset the cell to 0 on failure leaves the board corrupted for later attempts.",
        "The hidden case is a near-empty board, which is much slower than a well-filled one and rewards good pruning.",
      ],
      javaToolkit: ["Backtracking with undo", "Box index (r/3)*3 + c/3", "Validity checks before descending"],
    },
  },

  "expression-add-operators": {
    slug: "expression-add-operators",
    title: "Expression Add Operators",
    description:
      "Insert +, - or * between the digits of the string, or join digits into a multi-digit number, so the expression evaluates to the target. Return every such expression, sorted ascending lexicographically. Numbers may not have leading zeros.",
    constraints: ["1 ≤ num.length ≤ 10", "num contains only digits", "-2^31 ≤ target ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "addOperators",
    parameters: [
      { name: "num", type: "String" },
      { name: "target", type: "int" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> addOperators(String num, int target) {
        // No leading zeros. Sorted ascending.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { num: "123", target: 6 }, expectedOutput: ["1*2*3", "1+2+3"] },
      { id: 2, inputs: { num: "232", target: 8 }, expectedOutput: ["2*3+2", "2+3*2"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { num: "105", target: 5 }, expectedOutput: ["1*0+5", "10-5"], isHidden: true },
      { id: 4, inputs: { num: "00", target: 0 }, expectedOutput: ["0*0", "0+0", "0-0"], isHidden: true },
      { id: 5, inputs: { num: "3456237490", target: 9191 }, expectedOutput: [], isHidden: true },
      { id: 6, inputs: { num: "1", target: 1 }, expectedOutput: ["1"], isHidden: true },
    ],
    learn: {
      intuition:
        "Addition and subtraction can be applied as you go, but multiplication binds tighter and can override the last operation. Carrying the previous operand alongside the running total lets you undo it and reapply it multiplied.",
      approach: [
        "Recurse over the position, carrying the expression so far, the running value and the previous operand.",
        "For each split, form the number from the digits; stop if it has a leading zero.",
        "At position 0 take the number alone; otherwise branch on +, - and *.",
        "For *, use value - prev + prev × number, which corrects the earlier application.",
      ],
      bruteForce: { idea: "Generate every expression and evaluate each with a parser.", time: "O(4^n × n)", space: "O(n)" },
      optimal: { idea: "Backtracking carrying the previous operand for precedence.", time: "O(4^n)", space: "O(n)" },
      pitfalls: [
        "Multiplication cannot simply multiply the running total — 2+3*2 is 8, not 10. The previous operand is what makes it correct.",
        "\"05\" is not a valid number, but a bare \"0\" is — the \"00\" case checks both.",
        "Intermediate values overflow int; carry everything as long.",
      ],
      javaToolkit: ["Carrying the previous operand", "Leading-zero rejection", "long intermediates"],
    },
  },
}
