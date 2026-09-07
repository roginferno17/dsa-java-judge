import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 13 — Hard tree problems (7).
 *
 * Two ideas beyond plain recursion appear here. First, a binary tree only has
 * downward links, so any question about DISTANCE in both directions needs parent
 * pointers — after which the tree is an undirected graph and BFS applies. Second,
 * a tree can be reconstructed from two traversals, but only certain pairs.
 */
export const step13Hard: Record<string, ProblemMetadata> = {
  "children-sum-property": {
    slug: "children-sum-property",
    title: "Check for the Children Sum Property",
    description:
      "Return whether every non-leaf node's value equals the sum of its children's values, counting a missing child as 0. Leaves always satisfy the property.",
    constraints: ["0 ≤ nodes ≤ 10^4", "0 ≤ node value ≤ 10^5"],
    className: "Solution",
    methodName: "hasChildrenSum",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean hasChildrenSum(TreeNode root) {
        // A missing child counts as 0.
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [10, 5, 5] }, expectedOutput: true },
      { id: 2, inputs: { root: [1, 2, 3] }, expectedOutput: false, explanation: "1 is not 2 + 3." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { root: [7] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { root: [10, 10] }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { root: [35, 20, 15, 15, 5, 10, 5] }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { root: [10, 5, 4] }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "The property is local — one node against its own two children — so a single walk checking each node in turn settles it. There is nothing to accumulate.",
      approach: [
        "Return true for null and for leaves.",
        "Sum the children's values, treating a missing child as 0.",
        "Fail if the node's value differs; otherwise recurse into both children.",
      ],
      optimal: { idea: "One recursive pass checking each node locally.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "A node with ONE child must equal that child's value, not fail outright — case 5 checks this.",
        "Leaves have no constraint and must not be compared against 0.",
        "The variant that MODIFIES the tree to satisfy the property is a different and harder problem; this one only checks.",
      ],
      javaToolkit: ["Local property checking", "Null-as-zero handling", "Short-circuit &&"],
    },
  },

  "nodes-distance-k": {
    slug: "nodes-distance-k",
    title: "All Nodes at Distance K",
    description:
      "Return the values of every node exactly k edges away from the node holding the target value, in ascending order. Values are distinct and the target is present.",
    constraints: ["1 ≤ nodes ≤ 500", "0 ≤ node value ≤ 500", "Values are distinct", "0 ≤ k ≤ 1000"],
    className: "Solution",
    methodName: "distanceK",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "target", type: "int" },
      { name: "k", type: "int" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> distanceK(TreeNode root, int target, int k) {
        // Ascending order. Distance is measured in both directions.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], target: 5, k: 2 }, expectedOutput: [1, 4, 7] },
      { id: 2, inputs: { root: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], target: 5, k: 0 }, expectedOutput: [5] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [1], target: 1, k: 3 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], target: 5, k: 1 }, expectedOutput: [2, 3, 6], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7], target: 4, k: 3 }, expectedOutput: [3], isHidden: true },
      { id: 6, inputs: { root: [1, 2, 3], target: 1, k: 1 }, expectedOutput: [2, 3], isHidden: true },
      { id: 7, inputs: { root: [1, null, 2, null, 3], target: 3, k: 2 }, expectedOutput: [1], isHidden: true },
    ],
    learn: {
      intuition:
        "Distance runs in both directions, but a binary tree's links only run downward. Give every node a parent pointer and the tree becomes an undirected graph, at which point BFS from the target answers the question directly.",
      approach: [
        "Walk the tree once building a map from each node to its parent.",
        "BFS from the target node, expanding to left child, right child and parent.",
        "Keep a visited set so the search does not walk back on itself; stop after k levels.",
        "Sort the resulting values.",
      ],
      bruteForce: { idea: "For every node, compute its distance to the target from scratch.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Parent pointers plus BFS.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Without a visited set the BFS bounces between a node and its parent forever.",
        "k = 0 answers with the target itself.",
        "A k larger than the tree's reach gives an empty list, not an error.",
        "The output must be sorted, since BFS order depends on how you expand.",
      ],
      javaToolkit: ["Map<TreeNode, TreeNode> of parents", "BFS over three neighbours", "Treating a tree as an undirected graph"],
    },
  },

  "burn-binary-tree": {
    slug: "burn-binary-tree",
    title: "Minimum Time to Burn a Binary Tree",
    description:
      "A fire starts at the node holding the given value and spreads to adjacent nodes — both children and the parent — once per minute. Return the minutes until the whole tree is burnt. Values are distinct and the start node exists.",
    constraints: ["1 ≤ nodes ≤ 10^4", "0 ≤ node value ≤ 10^5", "Values are distinct"],
    className: "Solution",
    methodName: "timeToBurn",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "start", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int timeToBurn(TreeNode root, int start) {
        // Fire spreads to children AND the parent.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, 6, 7], start: 2 }, expectedOutput: 3, explanation: "The far leaves 6 and 7 are three steps away." },
      { id: 2, inputs: { root: [1, 2, 3, 4, 5, 6, 7], start: 1 }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [1], start: 1 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { root: [1, 2], start: 2 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { root: [1, null, 2, null, 3, null, 4], start: 1 }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { root: [1, null, 2, null, 3, null, 4], start: 3 }, expectedOutput: 2, isHidden: true },
      { id: 7, inputs: { root: [1, 2, 3, 4, 5, null, 6], start: 4 }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "The burn time is the greatest distance from the start node to any other node — the same undirected-graph BFS as the previous problem, but counting levels until the queue empties instead of stopping at k.",
      approach: [
        "Build parent pointers and locate the start node.",
        "BFS outward from it, expanding to both children and the parent, with a visited set.",
        "Count how many full levels the BFS completes; that count is the answer.",
      ],
      bruteForce: { idea: "Compute the distance from the start to every node separately.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Parent pointers plus level-counting BFS.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The count is LEVELS COMPLETED, not levels visited: a single node burns in 0 minutes, so the last level must not be counted.",
        "Starting at a leaf can take longer than starting at the root — case 7 takes 4 minutes from a leaf that the root reaches in 2.",
        "Forgetting the parent edge turns this into plain subtree height and undercounts.",
      ],
      javaToolkit: ["Parent map plus BFS", "Counting levels minus one", "Eccentricity of a node"],
    },
  },

  "count-complete-tree": {
    slug: "count-complete-tree",
    title: "Count Nodes in a Complete Binary Tree",
    description:
      "The tree is COMPLETE: every level is full except possibly the last, which is filled left to right. Return the number of nodes, doing better than visiting them all.",
    constraints: ["0 ≤ nodes ≤ 5 × 10^4", "0 ≤ node value ≤ 5 × 10^4", "The tree is complete"],
    className: "Solution",
    methodName: "countNodes",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countNodes(TreeNode root) {
        // Completeness makes a sub-linear count possible.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, 6] }, expectedOutput: 6 },
      { id: 2, inputs: { root: [] }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: 7, isHidden: true },
      { id: 5, inputs: { root: [1, 2] }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { root: [1, 2, 3, 4] }, expectedOutput: 4, isHidden: true },
      { id: 7, inputs: { root: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, expectedOutput: 12, isHidden: true },
    ],
    learn: {
      intuition:
        "Walking every node is O(n) and ignores what completeness gives you. Measure the leftmost and rightmost depths: if they match, the subtree is PERFECT and holds 2^depth - 1 nodes with no recursion at all. Otherwise recurse — and only one of the two children can ever be imperfect.",
      approach: [
        "Measure the left spine's depth and the right spine's depth.",
        "If equal, return (1 << depth) - 1.",
        "Otherwise return 1 + countNodes(left) + countNodes(right).",
      ],
      bruteForce: { idea: "Count every node.", time: "O(n)", space: "O(height)" },
      optimal: { idea: "Perfect-subtree shortcut using left and right spine depths.", time: "O(log² n)", space: "O(log n)" },
      pitfalls: [
        "Two spine measurements cost O(log n) each and happen O(log n) times, which is where O(log² n) comes from.",
        "1 << depth overflows for depths at or above 31 — not reachable here, but the habit matters.",
        "The shortcut relies on completeness; on an arbitrary tree it returns nonsense.",
      ],
      javaToolkit: ["Left and right spine depths", "(1 << d) - 1 for a perfect tree", "O(log² n) reasoning"],
    },
  },

  "unique-tree-theory": {
    slug: "unique-tree-theory",
    title: "Which Traversal Pairs Determine a Unique Tree",
    description:
      "Given two traversal names from \"preorder\", \"inorder\", \"postorder\" and \"levelorder\", return whether knowing both is enough to reconstruct a unique binary tree. Assume all node values are distinct.",
    constraints: ["Each name is one of the four listed", "The two names may be equal"],
    className: "Solution",
    methodName: "determinesUniqueTree",
    parameters: [
      { name: "first", type: "String" },
      { name: "second", type: "String" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean determinesUniqueTree(String first, String second) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { first: "preorder", second: "inorder" }, expectedOutput: true },
      { id: 2, inputs: { first: "preorder", second: "postorder" }, expectedOutput: false, explanation: "Without inorder the left/right split is unknowable." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { first: "inorder", second: "postorder" }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { first: "levelorder", second: "inorder" }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { first: "preorder", second: "levelorder" }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { first: "inorder", second: "inorder" }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { first: "postorder", second: "levelorder" }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Inorder is the one traversal that SPLITS the values into a left group and a right group once you know the root. The other three each only identify the root; two of them together identify the root twice and still leave the split unknown.",
      approach: [
        "Return true exactly when one name is \"inorder\" and the other is a different traversal.",
        "Two copies of the same traversal add nothing, so equal names are false.",
      ],
      optimal: { idea: "Exactly one of the two must be inorder.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "Preorder plus postorder is the famous near-miss: it determines a unique tree only if every node has 0 or 2 children, which is not assumed here.",
        "Level order plus inorder DOES work, for the same reason preorder plus inorder does — level order names the root of every subtree in time.",
        "Two identical traversals are still only one traversal.",
      ],
      javaToolkit: ["What inorder uniquely provides", "The preorder+postorder exception", "String.equals, not ==" ],
    },
  },

  "construct-inorder-preorder": {
    slug: "construct-inorder-preorder",
    title: "Construct a Binary Tree From Preorder and Inorder",
    description:
      "Rebuild and return the tree from its preorder and inorder traversals. Values are distinct and both arrays describe the same tree.",
    constraints: ["0 ≤ n ≤ 3000", "-3000 ≤ value ≤ 3000", "Values are distinct"],
    className: "Solution",
    methodName: "buildTree",
    parameters: [
      { name: "preorder", type: "int[]" },
      { name: "inorder", type: "int[]" },
    ],
    returnType: "TreeNode",
    comparison: { type: "tree" },
    starterCode: `import java.util.*;

class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return null;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7] }, expectedOutput: [3, 9, 20, null, null, 15, 7] },
      { id: 2, inputs: { preorder: [-1], inorder: [-1] }, expectedOutput: [-1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { preorder: [], inorder: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { preorder: [1, 2, 4, 5, 3, 6], inorder: [4, 2, 5, 1, 3, 6] }, expectedOutput: [1, 2, 3, 4, 5, null, 6], isHidden: true },
      { id: 5, inputs: { preorder: [1, 2, 3], inorder: [3, 2, 1] }, expectedOutput: [1, 2, null, 3], isHidden: true },
      { id: 6, inputs: { preorder: [1, 2, 3], inorder: [1, 2, 3] }, expectedOutput: [1, null, 2, null, 3], isHidden: true },
      { id: 7, inputs: { preorder: [1, 2, 4, 5, 3, 6, 7], inorder: [4, 2, 5, 1, 6, 3, 7] }, expectedOutput: [1, 2, 3, 4, 5, 6, 7], isHidden: true },
    ],
    learn: {
      intuition:
        "Preorder's first value is the root. Finding it in inorder splits the remaining values into everything left of the root and everything right — and the SIZE of that left part tells you exactly how much of preorder belongs to the left subtree.",
      approach: [
        "Index the inorder positions in a HashMap so the root can be located in O(1).",
        "Recurse over matching ranges of preorder and inorder.",
        "The left subtree takes the next leftSize preorder values; the right takes the rest.",
      ],
      bruteForce: { idea: "Scan inorder linearly for the root at every level.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Recursive range splitting with an inorder index map.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The preorder index must advance globally, or be derived from the left subtree's size — recomputing it wrongly is the usual bug.",
        "Distinct values are required; duplicates make the root's position in inorder ambiguous.",
        "An empty range means a null child, which is the base case.",
      ],
      javaToolkit: ["HashMap of value to inorder index", "Recursion over index ranges", "Left subtree size as the pivot"],
    },
  },

  "construct-postorder-inorder": {
    slug: "construct-postorder-inorder",
    title: "Construct a Binary Tree From Inorder and Postorder",
    description:
      "Rebuild and return the tree from its inorder and postorder traversals. Values are distinct and both arrays describe the same tree.",
    constraints: ["0 ≤ n ≤ 3000", "-3000 ≤ value ≤ 3000", "Values are distinct"],
    className: "Solution",
    methodName: "buildTree",
    parameters: [
      { name: "inorder", type: "int[]" },
      { name: "postorder", type: "int[]" },
    ],
    returnType: "TreeNode",
    comparison: { type: "tree" },
    starterCode: `import java.util.*;

class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        return null;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { inorder: [9, 3, 15, 20, 7], postorder: [9, 15, 7, 20, 3] }, expectedOutput: [3, 9, 20, null, null, 15, 7] },
      { id: 2, inputs: { inorder: [-1], postorder: [-1] }, expectedOutput: [-1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { inorder: [], postorder: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { inorder: [4, 2, 5, 1, 3, 6], postorder: [4, 5, 2, 6, 3, 1] }, expectedOutput: [1, 2, 3, 4, 5, null, 6], isHidden: true },
      { id: 5, inputs: { inorder: [3, 2, 1], postorder: [3, 2, 1] }, expectedOutput: [1, 2, null, 3], isHidden: true },
      { id: 6, inputs: { inorder: [1, 2, 3], postorder: [3, 2, 1] }, expectedOutput: [1, null, 2, null, 3], isHidden: true },
      { id: 7, inputs: { inorder: [4, 2, 5, 1, 6, 3, 7], postorder: [4, 5, 2, 6, 7, 3, 1] }, expectedOutput: [1, 2, 3, 4, 5, 6, 7], isHidden: true },
    ],
    learn: {
      intuition:
        "Postorder's LAST value is the root — the mirror of preorder's first. Everything else is the same split, except that postorder is consumed from the back, so the RIGHT subtree is built before the left.",
      approach: [
        "Index the inorder positions in a HashMap.",
        "Take the root from the end of the postorder range.",
        "Build the right subtree first, then the left, so the postorder cursor is consumed in the correct order.",
      ],
      bruteForce: { idea: "Scan inorder for the root at every level.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Recursive range splitting consumed from the back.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Building the LEFT subtree first with a shared cursor gives a mirrored, wrong tree — the order of the two recursive calls is the whole difference from the previous problem.",
        "Case 5 and case 6 have the same postorder and differ only in inorder, which is a good check that you are using both arrays.",
        "The empty range is again the null base case.",
      ],
      javaToolkit: ["Consuming postorder from the back", "Right-before-left recursion", "The preorder/postorder mirror"],
    },
  },
}
