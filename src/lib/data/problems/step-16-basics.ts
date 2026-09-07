import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 16 — One-dimensional and grid DP (10).
 *
 * Every dynamic-programming solution answers three questions: what a STATE is,
 * how a state is built from smaller ones, and where the recursion bottoms out.
 * The learn blocks in this step name all three explicitly, because that — not the
 * code — is the part that transfers to the next problem.
 *
 * Once a recurrence is written, memoised recursion and a bottom-up table are the
 * same algorithm. The table is usually faster and never overflows the stack.
 */
export const step16Basics: Record<string, ProblemMetadata> = {
  "climbing-stairs": {
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    description:
      "You climb a staircase of n steps, taking 1 or 2 steps at a time. Return how many distinct ways there are to reach the top.",
    constraints: ["1 ≤ n ≤ 45"],
    className: "Solution",
    methodName: "climbStairs",
    parameters: [{ name: "n", type: "int" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int climbStairs(int n) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 2 }, expectedOutput: 2, explanation: "1+1 or 2." },
      { id: 2, inputs: { n: 3 }, expectedOutput: 3, explanation: "1+1+1, 1+2, or 2+1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { n: 5 }, expectedOutput: 8, isHidden: true },
      { id: 5, inputs: { n: 10 }, expectedOutput: 89, isHidden: true },
      { id: 6, inputs: { n: 45 }, expectedOutput: 1836311903, isHidden: true },
    ],
    learn: {
      intuition:
        "The last move onto step n came from step n - 1 or step n - 2, and those two sets of routes are disjoint. So ways(n) = ways(n - 1) + ways(n - 2) — the Fibonacci recurrence, arrived at rather than recognised.",
      approach: [
        "State: ways(i) is the number of routes to step i.",
        "Transition: ways(i) = ways(i - 1) + ways(i - 2).",
        "Base: ways(0) = 1 and ways(1) = 1.",
        "Only the last two values matter, so two variables suffice.",
      ],
      bruteForce: { idea: "Recurse on both moves without memoising.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Bottom-up with two rolling variables.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "ways(0) is 1, not 0 — there is exactly one way to stand still.",
        "The answer at n = 45 is 1836311903, just inside int; n = 46 would overflow.",
        "The plain recursion recomputes the same subproblem exponentially often, which is what memoisation exists to fix.",
      ],
      javaToolkit: ["The Fibonacci recurrence", "Rolling variables instead of an array", "Where the base case comes from"],
    },
  },

  "house-robber": {
    slug: "house-robber",
    title: "House Robber",
    description:
      "Houses stand in a row, each with some money. You cannot rob two ADJACENT houses. Return the most money you can take.",
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 400"],
    className: "Solution",
    methodName: "rob",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int rob(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3, 1] }, expectedOutput: 4, explanation: "Rob houses 0 and 2." },
      { id: 2, inputs: { nums: [2, 7, 9, 3, 1] }, expectedOutput: 12, explanation: "Rob 2, 9 and 1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [5] }, expectedOutput: 5, isHidden: true },
      { id: 4, inputs: { nums: [2, 1, 1, 2] }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { nums: [0, 0, 0] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { nums: [1, 3, 1] }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { nums: [100, 1, 1, 100] }, expectedOutput: 200, isHidden: true },
    ],
    learn: {
      intuition:
        "At each house there are exactly two options: take it and skip its neighbour, or leave it and carry the best from the previous house. The better of those two is the answer up to here.",
      approach: [
        "State: best(i) is the most obtainable from the first i houses.",
        "Transition: best(i) = max(best(i - 1), best(i - 2) + nums[i]).",
        "Base: best(-1) = 0 and best(0) = nums[0].",
      ],
      bruteForce: { idea: "Try every subset of non-adjacent houses.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Take-or-skip DP with two rolling variables.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Alternating houses is not always best: case 4 takes both ends, skipping two in the middle.",
        "The 'skip' branch carries best(i - 1), not best(i - 2) — dropping that loses valid answers.",
        "Two rolling variables replace the array once the recurrence is clear.",
      ],
      javaToolkit: ["Take-or-skip transitions", "Rolling variables", "Why greedy alternation fails"],
    },
  },

  "house-robber-2": {
    slug: "house-robber-2",
    title: "House Robber II",
    description:
      "The houses now stand in a CIRCLE, so the first and last are adjacent. You still cannot rob two adjacent houses. Return the most money you can take.",
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 1000"],
    className: "Solution",
    methodName: "rob",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int rob(int[] nums) {
        // The first and last houses are neighbours.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 3, 2] }, expectedOutput: 3, explanation: "Robbing both 2s is impossible now that they are adjacent." },
      { id: 2, inputs: { nums: [1, 2, 3, 1] }, expectedOutput: 4 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [5] }, expectedOutput: 5, isHidden: true },
      { id: 4, inputs: { nums: [1, 2] }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { nums: [100, 1, 1, 100] }, expectedOutput: 101, isHidden: true },
      { id: 6, inputs: { nums: [200, 3, 140, 20, 10] }, expectedOutput: 340, isHidden: true },
      { id: 7, inputs: { nums: [1, 1, 1, 1] }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "The circle only matters through one fact: the first and last houses cannot both be robbed. So split into two ordinary line problems — one excluding the last house, one excluding the first — and take the better.",
      approach: [
        "Handle n = 1 separately, since both slices would be empty.",
        "Run the linear solution on nums[0..n-2] and on nums[1..n-1].",
        "Return the larger.",
      ],
      bruteForce: { idea: "Try every valid subset around the circle.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Two runs of the linear DP.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "A single house must be returned directly; both slices are empty and would give 0.",
        "Neither slice needs to actually rob its end house — excluding it only forbids it, which is exactly what is wanted.",
        "Trying to patch the linear DP with a circular special case is far more error-prone than running it twice.",
      ],
      javaToolkit: ["Splitting a circular constraint into two linear cases", "Reusing a solved subproblem", "Arrays.copyOfRange"],
    },
  },

  "max-sum-non-adjacent": {
    slug: "max-sum-non-adjacent",
    title: "Maximum Sum of Non-Adjacent Elements",
    description:
      "Choose a set of elements with no two adjacent, and return the largest possible sum. Choosing nothing is allowed, so the answer is never negative.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
    className: "Solution",
    methodName: "maxNonAdjacentSum",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxNonAdjacentSum(int[] nums) {
        // Values may be negative; choosing nothing gives 0.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 1, 4, 9] }, expectedOutput: 11, explanation: "2 + 9." },
      { id: 2, inputs: { nums: [-1, -2, -3] }, expectedOutput: 0, explanation: "Every element hurts, so take nothing." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [5] }, expectedOutput: 5, isHidden: true },
      { id: 4, inputs: { nums: [-5] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [3, -2, 5, -1, 4] }, expectedOutput: 12, isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3, 4, 5] }, expectedOutput: 9, isHidden: true },
      { id: 7, inputs: { nums: [-1, 5, -1] }, expectedOutput: 5, isHidden: true },
    ],
    learn: {
      intuition:
        "House Robber with negative values allowed. The recurrence is unchanged; only the base case moves, because an empty selection is now sometimes the best one.",
      approach: [
        "State: best(i) is the largest non-adjacent sum from the first i elements.",
        "Transition: best(i) = max(best(i - 1), best(i - 2) + nums[i]).",
        "Base: both start at 0 rather than at nums[0].",
      ],
      bruteForce: { idea: "Enumerate every non-adjacent subset.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Same DP, with 0 as the floor.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Seeding with nums[0] forces the first element into the answer and gives -5 for a single negative — case 4 catches it.",
        "Skipping negatives greedily is wrong in general, though it happens to work when they are isolated.",
        "The 'take' branch may still be worth it if a negative bridges two large positives — but only when the two positives are not already reachable, which case 5 tests.",
      ],
      javaToolkit: ["Clamping a DP at 0", "Base cases as the only difference", "Recognising a re-skinned problem"],
    },
  },

  "ninjas-training": {
    slug: "ninjas-training",
    title: "Ninja's Training",
    description:
      "Each row of points holds the merit for three activities on that day. A ninja must not repeat the SAME activity on two consecutive days. Return the maximum total merit.",
    constraints: ["1 ≤ days ≤ 10^5", "points[i].length is 3", "0 ≤ points[i][j] ≤ 100"],
    className: "Solution",
    methodName: "ninjaTraining",
    parameters: [{ name: "points", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int ninjaTraining(int[][] points) {
        // No two consecutive days with the same activity.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { points: [[10, 40, 70], [20, 50, 80], [30, 60, 90]] }, expectedOutput: 210, explanation: "70 + 50 + 90." },
      { id: 2, inputs: { points: [[10, 50, 1]] }, expectedOutput: 50 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { points: [[1, 2, 5], [3, 1, 1], [3, 3, 3]] }, expectedOutput: 11, isHidden: true },
      { id: 4, inputs: { points: [[5, 5, 5], [5, 5, 5]] }, expectedOutput: 10, isHidden: true },
      { id: 5, inputs: { points: [[0, 0, 0]] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { points: [[100, 1, 1], [100, 1, 1], [100, 1, 1]] }, expectedOutput: 201, isHidden: true },
      { id: 7, inputs: { points: [[1, 100, 1], [100, 1, 1], [1, 100, 1]] }, expectedOutput: 300, isHidden: true },
    ],
    learn: {
      intuition:
        "The state needs one extra piece of information beyond the day: which activity was done YESTERDAY. That is the whole lesson — a constraint linking consecutive choices becomes a dimension of the state.",
      approach: [
        "State: best(day, last) is the maximum merit from that day onward given yesterday's activity.",
        "Transition: try each activity different from last, adding its points.",
        "Base: day past the end scores 0.",
        "Bottom-up needs only three values per day, so the table is 3 wide.",
      ],
      bruteForce: { idea: "Try all 3^days schedules.", time: "O(3^days)", space: "O(days)" },
      optimal: { idea: "DP over (day, previous activity).", time: "O(days × 3 × 3)", space: "O(1) with rolling values" },
      pitfalls: [
        "Greedily taking each day's maximum fails as soon as the maximum repeats — case 6 must give up one 100 and take a 1.",
        "The 'no previous activity' case on day 0 needs a fourth marker value, or the DP can be run from the last day backwards.",
        "Only the previous day matters, so the whole table collapses to three rolling numbers.",
      ],
      javaToolkit: ["Adding a dimension for a constraint", "Rolling a 2D table down to a row", "Why greedy fails"],
    },
  },

  "unique-paths": {
    slug: "unique-paths",
    title: "Unique Paths",
    description:
      "A robot starts at the top-left of an m × n grid and can only move right or down. Return how many distinct paths reach the bottom-right corner.",
    constraints: ["1 ≤ m, n ≤ 100", "The answer fits in a 32-bit int"],
    className: "Solution",
    methodName: "uniquePaths",
    parameters: [
      { name: "m", type: "int" },
      { name: "n", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int uniquePaths(int m, int n) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { m: 3, n: 7 }, expectedOutput: 28 },
      { id: 2, inputs: { m: 3, n: 2 }, expectedOutput: 3 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { m: 1, n: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { m: 1, n: 100 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { m: 10, n: 10 }, expectedOutput: 48620, isHidden: true },
      { id: 6, inputs: { m: 2, n: 2 }, expectedOutput: 2, isHidden: true },
      { id: 7, inputs: { m: 7, n: 3 }, expectedOutput: 28, isHidden: true },
    ],
    learn: {
      intuition:
        "Every route into a cell arrives from directly above or directly to the left, and those two sets of routes are disjoint. So the count for a cell is the sum of the two, which is Pascal's triangle laid out on a grid.",
      approach: [
        "State: paths(i, j) is the number of routes to that cell.",
        "Transition: paths(i, j) = paths(i - 1, j) + paths(i, j - 1).",
        "Base: the whole first row and first column are 1.",
      ],
      bruteForce: { idea: "Recurse on both moves.", time: "O(2^(m+n))", space: "O(m + n)" },
      optimal: { idea: "Grid DP, or the binomial coefficient C(m + n - 2, m - 1) directly.", time: "O(m × n)", space: "O(n) with one row" },
      pitfalls: [
        "A single row or column has exactly one path, not zero.",
        "The combinatorial formula is O(m + n) but overflows easily if the factorials are computed before dividing.",
        "One rolling row is enough, since a cell only needs the value above and the one just written.",
      ],
      javaToolkit: ["Grid DP", "One rolling row", "The binomial shortcut"],
    },
  },

  "unique-paths-2": {
    slug: "unique-paths-2",
    title: "Unique Paths II",
    description:
      "Same grid and moves, but a 1 marks an obstacle the robot cannot enter. Return the number of paths from the top-left to the bottom-right, or 0 if none exist.",
    constraints: ["1 ≤ rows, cols ≤ 100", "grid[i][j] is 0 or 1"],
    className: "Solution",
    methodName: "uniquePathsWithObstacles",
    parameters: [{ name: "grid", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        // 1 is an obstacle.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { grid: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] }, expectedOutput: 2 },
      { id: 2, inputs: { grid: [[0, 1], [0, 0]] }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { grid: [[0]] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { grid: [[1]] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { grid: [[0, 0], [0, 1]] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { grid: [[0, 0, 0], [1, 1, 0], [0, 0, 0]] }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { grid: [[1, 0], [0, 0]] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "One line changes: an obstacle contributes 0 routes rather than the sum of its neighbours. Everything downstream then falls to zero automatically, so no separate reachability pass is needed.",
      approach: [
        "State and transition as before.",
        "Set paths(i, j) = 0 whenever the cell is an obstacle.",
        "Fill the first row and column left to right and top to bottom, stopping the run of 1s at the first obstacle.",
      ],
      optimal: { idea: "Grid DP with obstacles zeroed.", time: "O(rows × cols)", space: "O(cols)" },
      pitfalls: [
        "Blindly setting the whole first row to 1 is wrong: everything after an obstacle in that row is unreachable, which case 6 checks.",
        "An obstacle on the start or the end cell makes the answer 0 — cases 4, 5 and 7.",
        "The zero propagates on its own; no explicit 'blocked' flag is needed.",
      ],
      javaToolkit: ["Zeroing a DP cell", "Careful base-row initialisation", "Propagation of zero"],
    },
  },

  "min-path-sum": {
    slug: "min-path-sum",
    title: "Minimum Path Sum",
    description:
      "Each cell holds a non-negative cost. Moving only right or down from the top-left, return the smallest total cost to reach the bottom-right.",
    constraints: ["1 ≤ rows, cols ≤ 200", "0 ≤ grid[i][j] ≤ 200"],
    className: "Solution",
    methodName: "minPathSum",
    parameters: [{ name: "grid", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int minPathSum(int[][] grid) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { grid: [[1, 3, 1], [1, 5, 1], [4, 2, 1]] }, expectedOutput: 7, explanation: "1 → 3 → 1 → 1 → 1." },
      { id: 2, inputs: { grid: [[1, 2, 3], [4, 5, 6]] }, expectedOutput: 12 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { grid: [[5]] }, expectedOutput: 5, isHidden: true },
      { id: 4, inputs: { grid: [[1, 2, 3]] }, expectedOutput: 6, isHidden: true },
      { id: 5, inputs: { grid: [[0, 0], [0, 0]] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { grid: [[1, 100], [1, 1]] }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { grid: [[9, 1, 1], [9, 1, 9], [9, 1, 1]] }, expectedOutput: 13, isHidden: true },
    ],
    learn: {
      intuition:
        "Counting paths becomes minimising over paths by swapping the sum for a minimum. The structure is identical: each cell asks its two predecessors which was cheaper and adds its own cost.",
      approach: [
        "State: cost(i, j) is the cheapest route to that cell.",
        "Transition: cost(i, j) = grid[i][j] + min(cost(i - 1, j), cost(i, j - 1)).",
        "Base: the first row and column accumulate along their single available direction.",
      ],
      bruteForce: { idea: "Try every route.", time: "O(2^(rows+cols))", space: "O(rows + cols)" },
      optimal: { idea: "Grid DP taking the minimum.", time: "O(rows × cols)", space: "O(cols)" },
      pitfalls: [
        "The first row and column have only one predecessor each and must not read a missing neighbour.",
        "Greedily stepping toward the smaller neighbour is not optimal — case 7 needs a route that looks worse early.",
        "Only right and down are allowed; free movement would make this Dijkstra.",
      ],
      javaToolkit: ["Sum-to-minimum substitution", "Boundary handling", "Rolling row"],
    },
  },

  "min-path-triangle": {
    slug: "min-path-triangle",
    title: "Minimum Path Sum in a Triangle",
    description:
      "Row i of the triangle has i + 1 entries. Starting at the apex, each step moves to one of the two entries directly below. Return the smallest total.",
    constraints: ["1 ≤ rows ≤ 200", "-10^4 ≤ value ≤ 10^4"],
    className: "Solution",
    methodName: "minimumTotal",
    parameters: [{ name: "triangle", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int minimumTotal(int[][] triangle) {
        // From index j you may move to j or j + 1 in the next row.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { triangle: [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]] }, expectedOutput: 11, explanation: "2 + 3 + 5 + 1." },
      { id: 2, inputs: { triangle: [[-10]] }, expectedOutput: -10 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { triangle: [[1], [2, 3]] }, expectedOutput: 3, isHidden: true },
      { id: 4, inputs: { triangle: [[1], [2, 3], [4, 5, 6]] }, expectedOutput: 7, isHidden: true },
      { id: 5, inputs: { triangle: [[-1], [2, 3], [1, -1, -3]] }, expectedOutput: -1, isHidden: true },
      { id: 6, inputs: { triangle: [[5], [1, 9], [9, 9, 1]] }, expectedOutput: 15, isHidden: true },
      { id: 7, inputs: { triangle: [[0], [0, 0], [0, 0, 0]] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Working DOWNWARD leaves many possible endings to compare at the end. Working UPWARD from the last row leaves exactly one answer at the apex, and each row only needs the row below it.",
      approach: [
        "Start with the last row as the answer for its own cells.",
        "For each row above, set best(j) = triangle[i][j] + min(below(j), below(j + 1)).",
        "The apex holds the answer.",
      ],
      bruteForce: { idea: "Try all 2^(rows-1) descents.", time: "O(2^rows)", space: "O(rows)" },
      optimal: { idea: "Bottom-up over one rolling row.", time: "O(rows²)", space: "O(rows)" },
      pitfalls: [
        "The two children of index j are j and j + 1, not j - 1 and j + 1 — the triangle is not a centred grid.",
        "Negative values mean the minimum can decrease as you descend, so no early cut-off is safe.",
        "Top-down works too but needs a final scan of the last row.",
      ],
      javaToolkit: ["Bottom-up to avoid a final scan", "Ragged 2D arrays", "Rolling row of length rows"],
    },
  },

  "cherry-pickup": {
    slug: "cherry-pickup",
    title: "Cherry Pickup",
    description:
      "Two robots start at the top-left and top-right of a grid of cherry counts. Each moves down one row per step, shifting its column by -1, 0 or +1. Both collect the cherries they land on, and a cell shared by both is counted once. Return the most cherries collectable.",
    constraints: ["2 ≤ rows ≤ 70", "2 ≤ cols ≤ 70", "0 ≤ grid[i][j] ≤ 100"],
    className: "Solution",
    methodName: "cherryPickup",
    parameters: [{ name: "grid", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int cherryPickup(int[][] grid) {
        // Two robots move down together; a shared cell counts once.
        return 0;
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { grid: [[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]] },
        expectedOutput: 24,
        explanation: "The robots take separate columns and meet nowhere.",
      },
      { id: 2, inputs: { grid: [[1, 1], [1, 1]] }, expectedOutput: 4 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { grid: [[0, 0], [0, 0]] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { grid: [[5, 5], [5, 5]] }, expectedOutput: 20, isHidden: true },
      { id: 5, inputs: { grid: [[1, 0, 0, 0, 0, 0, 1], [2, 0, 0, 0, 0, 3, 0], [2, 0, 9, 0, 0, 0, 0], [0, 3, 0, 5, 4, 0, 0], [1, 0, 2, 3, 0, 0, 6]] }, expectedOutput: 28, isHidden: true },
      { id: 6, inputs: { grid: [[1, 1, 1], [1, 1, 1]] }, expectedOutput: 4, isHidden: true },
      { id: 7, inputs: { grid: [[10, 0, 0], [0, 0, 0], [0, 0, 10]] }, expectedOutput: 20, isHidden: true },
    ],
    learn: {
      intuition:
        "The two robots move in lockstep, so the row index is shared and the state is (row, column of robot A, column of robot B). Running them together is what makes the double-counting rule expressible; running one then the other cannot see where the first went.",
      approach: [
        "State: best(row, a, b) with both robots on that row.",
        "Transition: try all 9 combinations of the two moves, add grid[row][a] plus grid[row][b], counting once when a equals b.",
        "Base: the last row scores its own cells.",
      ],
      bruteForce: { idea: "Try all 9^rows move pairs.", time: "O(9^rows)", space: "O(rows)" },
      optimal: { idea: "3D DP over (row, a, b) with 9 transitions.", time: "O(rows × cols² × 9)", space: "O(cols²)" },
      pitfalls: [
        "Running the best single path twice is wrong: the second robot must avoid re-collecting, and the optimal pair is often two mediocre paths rather than the best one plus a leftover.",
        "The shared-cell rule applies whenever a == b, including at the start if the grid has one column.",
        "Both column indices must stay in bounds independently.",
      ],
      javaToolkit: ["A shared index collapsing two walks into one state", "3D DP tables", "Nine transitions per state"],
    },
  },
}
