import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 13 — Medium tree problems (15).
 *
 * Most of these are one postorder walk in disguise: each node asks its two
 * subtrees for a summary, combines them, and passes a summary upward. The ones
 * that are not — the views and the width — are level-order walks that also track
 * a horizontal COLUMN index, decreasing to the left and increasing to the right.
 */
export const step13Medium: Record<string, ProblemMetadata> = {
  "height-binary-tree": {
    slug: "height-binary-tree",
    title: "Height of a Binary Tree",
    description:
      "Return the height, counted in NODES on the longest root-to-leaf path. The empty tree has height 0 and a single node has height 1.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "height",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int height(TreeNode root) {
        // Counted in nodes: a single node has height 1.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [3, 9, 20, null, null, 15, 7] }, expectedOutput: 3 },
      { id: 2, inputs: { root: [1] }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { root: [1, null, 2, null, 3, null, 4] }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { root: [1, 2] }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "A tree's height is one more than the taller of its two subtrees. That single sentence is the whole algorithm — the recursion writes itself once the base case is fixed.",
      approach: ["Return 0 for null.", "Return 1 + max(height(left), height(right))."],
      optimal: { idea: "Postorder recursion.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "Height is counted in nodes here; some sources count EDGES, which is one less. The description settles it, and the difference silently breaks the diameter problem later.",
        "A level-order walk counting levels gives the same answer and avoids deep recursion.",
        "A 10^4-node left-leaning chain recurses 10^4 deep, which is fine in Java but worth noticing.",
      ],
      javaToolkit: ["1 + Math.max on subtree results", "Nodes versus edges", "BFS level counting as the iterative version"],
    },
  },

  "height-balanced": {
    slug: "height-balanced",
    title: "Check if a Binary Tree Is Height-Balanced",
    description:
      "A tree is height-balanced when, at EVERY node, the heights of the two subtrees differ by at most 1. Return whether the tree is balanced.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "isBalanced",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isBalanced(TreeNode root) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [3, 9, 20, null, null, 15, 7] }, expectedOutput: true },
      { id: 2, inputs: { root: [1, 2, 2, 3, 3, null, null, 4, 4] }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { root: [1, 2, null, 3] }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { root: [1, 2, 3] }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { root: [1, 2, 3, 4, null, null, 5, 6] }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Computing the height at every node separately re-walks the same subtrees over and over. Instead let one postorder walk return the height AND signal imbalance — use a sentinel like -1 to mean 'already unbalanced below here'.",
      approach: [
        "Recurse for the height of each subtree.",
        "If either returns the sentinel, or the difference exceeds 1, return the sentinel.",
        "Otherwise return 1 + the larger height.",
      ],
      bruteForce: { idea: "For each node, compute both subtree heights from scratch.", time: "O(n²)", space: "O(height)" },
      optimal: { idea: "One postorder walk returning height or a failure sentinel.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "Checking only the ROOT's two subtree heights is wrong; the condition applies at every node, which case 7 exercises.",
        "Once the sentinel appears it must propagate all the way up without being mistaken for a real height.",
        "The empty tree is balanced.",
      ],
      javaToolkit: ["A sentinel return value", "Early propagation of failure", "Avoiding repeated subtree work"],
    },
  },

  "diameter-binary-tree": {
    slug: "diameter-binary-tree",
    title: "Diameter of a Binary Tree",
    description:
      "The diameter is the number of EDGES on the longest path between any two nodes; the path need not pass through the root. Return it. A single node has diameter 0.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "diameter",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int diameter(TreeNode root) {
        // Counted in EDGES.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5] }, expectedOutput: 3, explanation: "The path 4-2-1-3 has three edges." },
      { id: 2, inputs: { root: [1, 2] }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, null, 6] }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { root: [1, null, 2, null, 3, null, 4] }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { root: [1, 2, null, 3, 4, null, null, 5, 6] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Every path has a single highest node. At that node the path is leftHeight + rightHeight edges, so walk once, compute heights bottom-up, and take the best such sum seen anywhere.",
      approach: [
        "Write a height helper that also updates a running maximum.",
        "At each node, the candidate diameter is leftHeight + rightHeight in edges.",
        "Return the running maximum after the walk.",
      ],
      bruteForce: { idea: "For each node, compute both subtree heights separately.", time: "O(n²)", space: "O(height)" },
      optimal: { idea: "One postorder walk with a running maximum.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "The answer is in EDGES, so a single node is 0 and a root with one child is 1. Mixing this up with node-counted height is the standard off-by-one.",
        "The longest path often misses the root entirely — case 7 has its diameter inside the left subtree.",
        "The helper returns a height while the ANSWER lives in a separate variable; returning the diameter from the helper does not compose.",
      ],
      javaToolkit: ["A helper returning one value while accumulating another", "Instance field or int[1] for the running maximum", "Edges versus nodes"],
    },
  },

  "max-path-sum": {
    slug: "max-path-sum",
    title: "Maximum Path Sum",
    description:
      "A path is any sequence of nodes connected parent-to-child, going in any direction but visiting each node at most once, and containing at least one node. Return the largest possible sum of node values along a path.",
    constraints: ["1 ≤ nodes ≤ 3 × 10^4", "-1000 ≤ node value ≤ 1000"],
    className: "Solution",
    methodName: "maxPathSum",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxPathSum(TreeNode root) {
        // Values may be negative.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3] }, expectedOutput: 6, explanation: "2 + 1 + 3." },
      { id: 2, inputs: { root: [-10, 9, 20, null, null, 15, 7] }, expectedOutput: 42, explanation: "15 + 20 + 7, skipping the negative root." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [-3] }, expectedOutput: -3, isHidden: true },
      { id: 4, inputs: { root: [2, -1] }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { root: [-2, -1] }, expectedOutput: -1, isHidden: true },
      { id: 6, inputs: { root: [1, -2, -3, 1, 3, -2, null, -1] }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { root: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1] }, expectedOutput: 48, isHidden: true },
    ],
    learn: {
      intuition:
        "Two different quantities are needed at each node. What a node CONTRIBUTES upward is a straight line — itself plus at most one branch. What it can ANSWER is a bend — itself plus both branches. Compute the second, record it, and return the first.",
      approach: [
        "Recurse for the best downward contribution of each child, clamped at 0 so a negative branch is dropped.",
        "The candidate answer at this node is value + leftGain + rightGain; keep the running maximum.",
        "Return value + max(leftGain, rightGain) upward.",
      ],
      bruteForce: { idea: "Enumerate every path.", time: "O(n²) or worse", space: "O(n)" },
      optimal: { idea: "Postorder returning the best straight-line gain, with a separate running maximum.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "Clamping a child's gain to 0 is what lets negative subtrees be skipped, but the running MAXIMUM must never be clamped — an all-negative tree's answer is its least negative node, as case 5 shows.",
        "Returning the bend value upward is wrong: a parent cannot use a path that already turns.",
        "Initialise the running maximum to Integer.MIN_VALUE, not 0.",
      ],
      javaToolkit: ["Two quantities per node", "Math.max(0, childGain)", "Initialising to Integer.MIN_VALUE"],
    },
  },

  "identical-trees": {
    slug: "identical-trees",
    title: "Check if Two Trees Are Identical",
    description: "Return whether two binary trees have exactly the same structure and the same values in the same positions.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "isSameTree",
    parameters: [
      { name: "p", type: "TreeNode" },
      { name: "q", type: "TreeNode" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { p: [1, 2, 3], q: [1, 2, 3] }, expectedOutput: true },
      { id: 2, inputs: { p: [1, 2], q: [1, null, 2] }, expectedOutput: false, explanation: "Same values, different shape." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { p: [], q: [] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { p: [1], q: [] }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { p: [1, 2, 1], q: [1, 1, 2] }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { p: [1, 2, 3, 4, 5], q: [1, 2, 3, 4, 5] }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { p: [1, 2, 3, 4], q: [1, 2, 3, null, 4] }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Walk both trees in lockstep. Two trees are identical when the roots match and both pairs of subtrees are identical — with the null cases distinguishing 'both absent' from 'one absent'.",
      approach: [
        "If both are null, true. If exactly one is null, false.",
        "If the values differ, false.",
        "Otherwise recurse on the two left children and the two right children.",
      ],
      optimal: { idea: "Simultaneous recursion with null handling.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "Comparing traversals is not enough — case 2 has identical preorders but different shapes.",
        "The 'exactly one null' case must be checked before dereferencing either value.",
        "Mirrored trees are not identical; case 5 checks that.",
      ],
      javaToolkit: ["Lockstep recursion", "Null-null versus null-node", "Why traversal equality is insufficient"],
    },
  },

  "zigzag-traversal": {
    slug: "zigzag-traversal",
    title: "Zigzag Level Order Traversal",
    description:
      "Return the values level by level, alternating direction: the first level left to right, the second right to left, and so on.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "zigzagLevelOrder",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        // Level 0 goes left to right.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [3, 9, 20, null, null, 15, 7] }, expectedOutput: [[3], [20, 9], [15, 7]] },
      { id: 2, inputs: { root: [1] }, expectedOutput: [[1]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1, 2, 3, 4, 5, null, 6] }, expectedOutput: [[1], [3, 2], [4, 5, 6]], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [[1], [3, 2], [4, 5, 6, 7]], isHidden: true },
      { id: 6, inputs: { root: [1, 2] }, expectedOutput: [[1], [2]], isHidden: true },
    ],
    learn: {
      intuition:
        "The traversal itself does not change — only how each level is written down. Collect the level exactly as in level order, then reverse the odd-numbered ones.",
      approach: [
        "Run a standard level-order BFS with a per-level size snapshot.",
        "Keep a boolean that flips each level.",
        "Reverse the level list before appending when the flag says right-to-left.",
      ],
      bruteForce: { idea: "Collect all levels, then reverse alternate ones afterwards.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "BFS with a direction flag.", time: "O(n)", space: "O(width)" },
      pitfalls: [
        "Reversing the QUEUE instead of the level list scrambles the children's order for the next level.",
        "Level 0 is left to right, so the first reversal is at level 1.",
        "Writing into the level list from both ends with an index avoids the reverse entirely.",
      ],
      javaToolkit: ["Collections.reverse", "A direction flag", "Index-from-both-ends as the alternative"],
    },
  },

  "boundary-traversal": {
    slug: "boundary-traversal",
    title: "Boundary Traversal of a Binary Tree",
    description:
      "Return the boundary anti-clockwise: the root, then the left boundary top-down EXCLUDING leaves, then all leaves left to right, then the right boundary bottom-up EXCLUDING leaves. No node appears twice. If the root is a leaf, return just the root.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "boundary",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> boundary(TreeNode root) {
        // root, left boundary (no leaves), leaves L-to-R, right boundary reversed (no leaves)
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { root: [1, 2, 3, 4, 5, 6, 7] },
        expectedOutput: [1, 2, 4, 5, 6, 7, 3],
        explanation: "Root 1, left boundary 2, leaves 4 5 6 7, right boundary 3.",
      },
      { id: 2, inputs: { root: [1] }, expectedOutput: [1], explanation: "A lone root is a leaf, so nothing else is added." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1, 2] }, expectedOutput: [1, 2], isHidden: true },
      { id: 5, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [1, 3, 2], isHidden: true },
      { id: 6, inputs: { root: [1, 2, null, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 7, inputs: { root: [1, 2, 3, 4, 5, null, 6, null, null, 7, 8] }, expectedOutput: [1, 2, 4, 7, 8, 6, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Three independent walks, stitched together. The only real difficulty is not double-counting: a leaf on the left boundary belongs to the leaves pass, so both boundary walks must skip leaves entirely.",
      approach: [
        "Add the root, unless it is a leaf — then return immediately.",
        "Walk down the left boundary from root.left, preferring left and falling back to right, adding non-leaves.",
        "Collect all leaves with any left-to-right depth-first walk.",
        "Walk down the right boundary from root.right the same way, collecting non-leaves, and append them reversed.",
      ],
      bruteForce: { idea: "Collect every node with its position and filter the outline.", time: "O(n log n)", space: "O(n)" },
      optimal: { idea: "Three targeted walks with leaves excluded from the boundaries.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "Excluding leaves from the boundary walks is what prevents duplicates — this is the bug in almost every first attempt.",
        "A boundary walk must fall back to the other child when its preferred one is missing, or it stops early.",
        "A root with no children is a leaf: the answer is just the root, not the root twice.",
      ],
      javaToolkit: ["Three-phase assembly", "Preferred-child descent with fallback", "Collections.reverse on the right boundary"],
    },
  },

  "vertical-traversal": {
    slug: "vertical-traversal",
    title: "Vertical Order Traversal",
    description:
      "Assign the root column 0, a left child its parent's column minus one and a right child plus one. Return one list per column, columns ascending. Within a column, order by depth ascending, and when two nodes share a column AND a depth, by value ascending.",
    constraints: ["0 ≤ nodes ≤ 1000", "-1000 ≤ node value ≤ 1000"],
    className: "Solution",
    methodName: "verticalTraversal",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        // Column, then depth, then value.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [3, 9, 20, null, null, 15, 7] }, expectedOutput: [[9], [3, 15], [20], [7]] },
      { id: 2, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [[4], [2], [1, 5, 6], [3], [7]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [[1]], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 6, 5, 7] }, expectedOutput: [[4], [2], [1, 5, 6], [3], [7]], isHidden: true },
      { id: 6, inputs: { root: [1, 2] }, expectedOutput: [[2], [1]], isHidden: true },
      { id: 7, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [[1], [2], [3]], isHidden: true },
    ],
    learn: {
      intuition:
        "Give every node a (column, depth) coordinate and the whole question becomes a sort. The only subtlety is the tie-break: two nodes can genuinely occupy the same cell, and the rule says the smaller value comes first.",
      approach: [
        "Walk the tree recording (column, depth, value) for every node.",
        "Sort by column, then depth, then value.",
        "Group consecutive equal columns into lists.",
      ],
      bruteForce: { idea: "Find the column range, then re-walk the tree once per column.", time: "O(n × width)", space: "O(n)" },
      optimal: { idea: "Collect coordinates and sort.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "The value tie-break matters — case 5 differs from case 2 only in which of two same-cell nodes is smaller.",
        "A TreeMap keyed by column keeps the columns ordered without a final sort, but the within-column order still needs handling.",
        "Depth-first is fine as long as the sort is done properly; BFS alone does not give the value tie-break.",
      ],
      javaToolkit: ["TreeMap<Integer, ...> for ordered columns", "Multi-key comparators", "Coordinates as the reframing"],
    },
  },

  "top-view": {
    slug: "top-view",
    title: "Top View of a Binary Tree",
    description:
      "Looking down on the tree from above, return the visible nodes left to right. Using the same column numbering as the vertical traversal, that is the SHALLOWEST node in each column, taken in breadth-first order when two tie.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "topView",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> topView(TreeNode root) {
        // First node seen in each column, columns left to right.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [4, 2, 1, 3, 7] },
      { id: 2, inputs: { root: [1, 2, 3] }, expectedOutput: [2, 1, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 6, inputs: { root: [1, 2, 3, null, 4, 5] }, expectedOutput: [2, 1, 3], isHidden: true },
      { id: 7, inputs: { root: [10, 20, 30, 40, 60] }, expectedOutput: [40, 20, 10, 30], isHidden: true },
    ],
    learn: {
      intuition:
        "Each column is visible only through its topmost node, so record the first node BFS meets in each column and ignore the rest.",
      approach: [
        "BFS with a (node, column) queue, starting the root at column 0.",
        "Record a node only if its column has no entry yet.",
        "Read the recorded values in ascending column order.",
      ],
      bruteForce: { idea: "Collect every coordinate, then take the minimum depth per column.", time: "O(n log n)", space: "O(n)" },
      optimal: { idea: "BFS plus a first-seen-per-column map.", time: "O(n log n) for the ordered map", space: "O(n)" },
      pitfalls: [
        "DFS is unreliable here: a preorder walk can reach a column via a DEEPER node first and record the wrong one. BFS visits shallow before deep by construction.",
        "Overwriting the map entry each time gives the bottom view instead.",
        "Columns can be negative, so a plain array indexed by column will not do — use a TreeMap or shift the index.",
      ],
      javaToolkit: ["BFS with a column index", "TreeMap for ordered output", "Why BFS beats DFS here"],
    },
  },

  "bottom-view": {
    slug: "bottom-view",
    title: "Bottom View of a Binary Tree",
    description:
      "Looking up at the tree from below, return the visible nodes left to right — the DEEPEST node in each column, taking the later one in breadth-first order when two tie.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "bottomView",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> bottomView(TreeNode root) {
        // Last node seen in each column, columns left to right.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [4, 2, 6, 3, 7] },
      { id: 2, inputs: { root: [1, 2, 3] }, expectedOutput: [2, 1, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 6, inputs: { root: [1, 2, 3, null, 4, 5] }, expectedOutput: [2, 5, 3], isHidden: true },
      { id: 7, inputs: { root: [20, 8, 22, 5, 3, null, 25, null, null, 10, 14] }, expectedOutput: [5, 10, 3, 14, 25], isHidden: true },
    ],
    learn: {
      intuition:
        "The mirror of the top view, and a smaller change than it looks: keep OVERWRITING each column's entry as BFS goes deeper, so whatever remains is the deepest node in that column.",
      approach: [
        "BFS with a (node, column) queue.",
        "Always write the node into its column's slot, replacing whatever was there.",
        "Read the map in ascending column order.",
      ],
      optimal: { idea: "BFS plus a last-seen-per-column map.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "The only difference from the top view is write-always versus write-once; getting that backwards silently returns the other view.",
        "BFS matters again: the tie-break is 'later in breadth-first order', which a DFS does not reproduce.",
        "Case 6 puts the root, a right child and a left child all in column 0; the deepest one wins, and BFS order breaks the tie among equals.",
      ],
      javaToolkit: ["Overwrite instead of put-if-absent", "TreeMap ordering", "The top/bottom view symmetry"],
    },
  },

  "right-left-view": {
    slug: "right-left-view",
    title: "Right and Left View of a Binary Tree",
    description:
      "Return the nodes visible from one side, top to bottom: the rightmost node of each level when fromRight is true, otherwise the leftmost.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "sideView",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "fromRight", type: "boolean" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> sideView(TreeNode root, boolean fromRight) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, null, 5, null, 4], fromRight: true }, expectedOutput: [1, 3, 4] },
      { id: 2, inputs: { root: [1, 2, 3, null, 5, null, 4], fromRight: false }, expectedOutput: [1, 2, 5] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [], fromRight: true }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1], fromRight: false }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, 2, null, 3], fromRight: true }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 6, inputs: { root: [1, 2, 3, 4, 5, 6, 7], fromRight: true }, expectedOutput: [1, 3, 7], isHidden: true },
      { id: 7, inputs: { root: [1, 2, 3, 4, 5, 6, 7], fromRight: false }, expectedOutput: [1, 2, 4], isHidden: true },
    ],
    learn: {
      intuition:
        "One node per level, so the question is only which end of the level you take. A level-order walk makes it the first or last element of each level list.",
      approach: [
        "Run level-order BFS.",
        "Take the last element of each level for the right view, the first for the left.",
      ],
      bruteForce: { idea: "Collect the full level-order lists and pick an end from each.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "BFS taking one node per level.", time: "O(n)", space: "O(width)" },
      pitfalls: [
        "The visible node at a level is not always a child of the previous visible one — case 5 has a right view running down the LEFT side, because those levels have nothing else.",
        "A recursive version works by visiting the preferred side first and recording the first node seen at each new depth.",
        "The empty tree gives an empty list.",
      ],
      javaToolkit: ["Level-order with end selection", "Depth-first with a first-seen-per-depth rule", "One parameter switching both views"],
    },
  },

  "symmetric-tree": {
    slug: "symmetric-tree",
    title: "Symmetric Binary Tree",
    description: "Return whether the tree is a mirror image of itself about its root.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "isSymmetric",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 2, 3, 4, 4, 3] }, expectedOutput: true },
      { id: 2, inputs: { root: [1, 2, 2, null, 3, null, 3] }, expectedOutput: false, explanation: "Both 3s hang on the right, so the shape is not mirrored." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { root: [1, 2, 2] }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { root: [1, 2, 3] }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { root: [1, 2, 2, 3, null, null, 3] }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Symmetry is a statement about two subtrees, not one, so the recursion takes a PAIR. Two subtrees mirror each other when their roots match and each one's left mirrors the other's right.",
      approach: [
        "An empty tree is symmetric; otherwise compare root.left with root.right.",
        "Two nodes mirror when both are null, or both exist with equal values and left-versus-right matches on both sides.",
      ],
      bruteForce: { idea: "Compare the tree with a mirrored copy.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Paired recursion comparing crosswise.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "The comparison must be CROSSWISE — a.left against b.right and a.right against b.left. Comparing straight across tests for two identical subtrees, which is a different question.",
        "Checking only values gives the wrong answer on case 2, where the shapes differ.",
        "A single-argument recursion cannot express this; the pair is essential.",
      ],
      javaToolkit: ["Two-argument recursion", "Crosswise comparison", "Symmetry versus identity"],
    },
  },

  "root-to-node-path": {
    slug: "root-to-node-path",
    title: "Root to Node Path",
    description:
      "Return the values on the path from the root to the node holding the target value, inclusive. Node values are distinct; return an empty list if the target is absent.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4", "Node values are distinct"],
    className: "Solution",
    methodName: "rootToNodePath",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "target", type: "int" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> rootToNodePath(TreeNode root, int target) {
        // Empty list when the target is not in the tree.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, null, 6], target: 5 }, expectedOutput: [1, 2, 5] },
      { id: 2, inputs: { root: [1, 2, 3], target: 1 }, expectedOutput: [1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [], target: 1 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1, 2, 3], target: 9 }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, null, 6], target: 6 }, expectedOutput: [1, 3, 6], isHidden: true },
      { id: 6, inputs: { root: [1, null, 2, null, 3], target: 3 }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 7, inputs: { root: [5, 4, 8, 11, null, 13, 4, 7, 2], target: 2 }, expectedOutput: [5, 4, 11, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Carry the current path down as you recurse and remove the node again on the way back — backtracking. When the target is found, the path list already holds exactly the answer.",
      approach: [
        "Append the node's value to the path.",
        "Succeed immediately if it is the target; otherwise recurse into both children.",
        "If neither succeeds, remove the value and report failure.",
      ],
      bruteForce: { idea: "Store a parent pointer for every node, then walk upward from the target.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Depth-first with backtracking.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "Forgetting to remove the last element on failure leaves stale nodes in the path.",
        "The recursion must STOP once found, or later branches undo the path you just built.",
        "A missing target gives an empty list, which is different from a path containing only the root.",
      ],
      javaToolkit: ["Backtracking with a shared list", "Returning boolean while filling an output", "list.remove(list.size() - 1)"],
    },
  },

  "lca-binary-tree": {
    slug: "lca-binary-tree",
    title: "Lowest Common Ancestor in a Binary Tree",
    description:
      "Return the value of the lowest node having both p and q as descendants; a node counts as its own descendant. Values are distinct and both p and q are present.",
    constraints: ["2 ≤ nodes ≤ 10^5", "-10^9 ≤ node value ≤ 10^9", "Values are distinct", "p and q both exist"],
    className: "Solution",
    methodName: "lowestCommonAncestor",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "p", type: "int" },
      { name: "q", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        // A node is its own descendant.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 5, q: 1 }, expectedOutput: 3 },
      { id: 2, inputs: { root: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 5, q: 4 }, expectedOutput: 5, explanation: "5 is an ancestor of 4 and counts as its own descendant." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [1, 2], p: 1, q: 2 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { root: [1, 2, 3, 4, 5, null, 6], p: 4, q: 6 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, null, 6], p: 4, q: 5 }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { root: [1, null, 2, null, 3], p: 2, q: 3 }, expectedOutput: 2, isHidden: true },
      { id: 7, inputs: { root: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 7, q: 4 }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "Ask each subtree whether it contains either target. A node whose two subtrees each return something is the meeting point; a node that returns from only one side simply passes that answer up. Finding a target short-circuits, which is what makes 'a node is its own descendant' fall out for free.",
      approach: [
        "Return null for a null node, and the node itself if it matches p or q.",
        "Recurse into both children.",
        "If both return non-null, this node is the answer; otherwise return whichever is non-null.",
      ],
      bruteForce: { idea: "Find both root-to-node paths and compare them for the last shared value.", time: "O(n)", space: "O(height)" },
      optimal: { idea: "Single postorder walk returning the first match found.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "The short-circuit on a match is why case 2 works — 5 returns itself without ever looking for 4 beneath it.",
        "Both targets are guaranteed present; without that guarantee the algorithm would report an ancestor for a target that does not exist.",
        "The path-comparison approach is easier to reason about and worth writing once.",
      ],
      javaToolkit: ["Postorder returning a node", "Short-circuit on match", "Path intersection as the alternative"],
    },
  },

  "max-width-binary-tree": {
    slug: "max-width-binary-tree",
    title: "Maximum Width of a Binary Tree",
    description:
      "The width of a level is the distance between its leftmost and rightmost non-null nodes, counting the null positions BETWEEN them as if the tree were complete. Return the largest width over all levels.",
    constraints: ["1 ≤ nodes ≤ 3000", "-100 ≤ node value ≤ 100"],
    className: "Solution",
    methodName: "widthOfBinaryTree",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        // Gaps between the end nodes count.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 3, 2, 5, 3, null, 9] }, expectedOutput: 4, explanation: "The bottom level spans positions 0 to 3, gaps included." },
      { id: 2, inputs: { root: [1, 3, 2, 5] }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { root: [1, 3, 2, 5, null, null, 9, 6, null, null, 7] }, expectedOutput: 8, isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { root: [1, 2, 3, null, 4, null, 5] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Number the nodes as if the tree were complete — a node at index i has children at 2i + 1 and 2i + 2. Then a level's width is simply its last index minus its first, plus one.",
      approach: [
        "BFS carrying an index with each node, starting the root at 0.",
        "For each level, record the first and last index and take the difference plus one.",
        "Subtract the level's first index from every child index to keep the numbers small.",
      ],
      bruteForce: { idea: "Materialise each level with explicit nulls and measure it.", time: "O(2^height)", space: "O(2^height)" },
      optimal: { idea: "BFS with positional indices, normalised per level.", time: "O(n)", space: "O(width)" },
      pitfalls: [
        "Indices double each level, so without normalising per level they overflow int on a 3000-node skewed tree. Rebasing each level to start at 0 fixes it.",
        "Counting only the non-null nodes gives the wrong answer — the gaps count, which is the whole point.",
        "A right-leaning chain has width 1 at every level, not increasing.",
      ],
      javaToolkit: ["Positional indexing 2i+1 / 2i+2", "Per-level normalisation to avoid overflow", "BFS carrying an index"],
    },
  },
}
