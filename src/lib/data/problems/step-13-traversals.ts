import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 13 — Tree traversals (12).
 *
 * Trees are given and returned in LeetCode's level-order form: children are listed
 * row by row and null marks a missing child, so [1,2,3,null,4] is a root 1 with a
 * left child 2 whose only child is a right child 4, and a right child 3.
 *
 * The three depth-first orders differ only in WHEN the node itself is visited —
 * before its children, between them, or after them. Everything else is identical,
 * which is worth seeing before memorising three separate procedures.
 */
export const step13Traversals: Record<string, ProblemMetadata> = {
  "intro-trees": {
    slug: "intro-trees",
    title: "Introduction to Trees",
    description:
      "Return {total nodes, leaf nodes, internal nodes} for the tree. A leaf has no children; an internal node has at least one.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "treeStats",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] treeStats(TreeNode root) {
        // TreeNode has int val, TreeNode left, TreeNode right.
        return new int[]{ 0, 0, 0 };
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, null, 6] }, expectedOutput: [6, 3, 3], explanation: "4, 5 and 6 are leaves; 1, 2 and 3 have children." },
      { id: 2, inputs: { root: [1] }, expectedOutput: [1, 1, 0], explanation: "A lone root is a leaf." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [0, 0, 0], isHidden: true },
      { id: 4, inputs: { root: [1, 2] }, expectedOutput: [2, 1, 1], isHidden: true },
      { id: 5, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [3, 1, 2], isHidden: true },
      { id: 6, inputs: { root: [1, 2, 3] }, expectedOutput: [3, 2, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Almost every tree question has the same shape: solve it for the left subtree, solve it for the right, and combine. The base case is the null node, and getting that right is most of the battle.",
      approach: [
        "Return zeros for a null node.",
        "Recurse on both children and add the results.",
        "Add one to the total, and one to either the leaf or the internal count depending on whether both children are null.",
      ],
      optimal: { idea: "One recursive walk.", time: "O(n)", space: "O(height) for the call stack" },
      pitfalls: [
        "A node with exactly ONE child is internal, not a leaf — case 5 is a chain of them.",
        "The empty tree gives all zeros; forgetting it is the usual null-pointer crash.",
        "Recursion depth is the tree's height, which for a degenerate chain equals the node count.",
      ],
      javaToolkit: ["Recursive tree walk", "The null base case", "Combining subtree results"],
    },
  },

  "binary-tree-java": {
    slug: "binary-tree-java",
    title: "Binary Tree Representation in Java",
    description:
      "Return a DEEP COPY of the tree — every node newly allocated, none shared with the input. The judge compares the returned tree by structure and values.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "copyTree",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "TreeNode",
    comparison: { type: "tree" },
    starterCode: `class Solution {
    public TreeNode copyTree(TreeNode root) {
        // Allocate new nodes; do not return the input.
        return null;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, null, 6] }, expectedOutput: [1, 2, 3, 4, 5, null, 6] },
      { id: 2, inputs: { root: [7] }, expectedOutput: [7] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [1, null, 2, null, 3], isHidden: true },
      { id: 5, inputs: { root: [1, 2, null, 3] }, expectedOutput: [1, 2, null, 3], isHidden: true },
      { id: 6, inputs: { root: [-1, -2, -3] }, expectedOutput: [-1, -2, -3], isHidden: true },
    ],
    learn: {
      intuition:
        "A binary tree in Java is just a class holding a value and two references. Copying it is the smallest possible exercise in building one: allocate a node, then attach copies of the two subtrees.",
      approach: [
        "Return null for a null node.",
        "Create a new node with the same value.",
        "Set its left to a copy of the left subtree and its right to a copy of the right.",
      ],
      optimal: { idea: "Recursive allocation.", time: "O(n)", space: "O(n) for the copy plus O(height) stack" },
      pitfalls: [
        "Returning the input directly passes the value comparison but is not a copy — the point is allocating nodes.",
        "The tree is printed level by level with null for missing children and trailing nulls dropped, which is worth reading once before debugging output.",
        "Shape matters as well as values: [1,2] and [1,null,2] are different trees.",
      ],
      javaToolkit: ["A node class with two references", "new TreeNode(val)", "Structural recursion"],
    },
  },

  "binary-tree-traversals": {
    slug: "binary-tree-traversals",
    title: "Binary Tree Traversals",
    description:
      "Return three lists: the preorder, inorder and postorder traversals, in that order. Write each as its own recursive walk.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "allTraversals",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> allTraversals(TreeNode root) {
        // [preorder, inorder, postorder]
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { root: [1, 2, 3, 4, 5, null, 6] },
        expectedOutput: [[1, 2, 4, 5, 3, 6], [4, 2, 5, 1, 3, 6], [4, 5, 2, 6, 3, 1]],
        explanation: "The three orders differ only in when the node itself is emitted.",
      },
      { id: 2, inputs: { root: [1] }, expectedOutput: [[1], [1], [1]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [[], [], []], isHidden: true },
      { id: 4, inputs: { root: [1, 2, 3] }, expectedOutput: [[1, 2, 3], [2, 1, 3], [2, 3, 1]], isHidden: true },
      { id: 5, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [[1, 2, 3], [1, 2, 3], [3, 2, 1]], isHidden: true },
      { id: 6, inputs: { root: [1, 2, null, 3] }, expectedOutput: [[1, 2, 3], [3, 2, 1], [3, 2, 1]], isHidden: true },
    ],
    learn: {
      intuition:
        "One walk, three moments. Left and right are always visited in that order; the only variable is whether the node emits itself before, between or after them.",
      approach: [
        "Preorder: emit, recurse left, recurse right.",
        "Inorder: recurse left, emit, recurse right.",
        "Postorder: recurse left, recurse right, emit.",
      ],
      optimal: { idea: "Three recursive walks.", time: "O(n) each", space: "O(height)" },
      pitfalls: [
        "For a right-leaning chain preorder and inorder coincide, which makes case 5 a poor test of whether you have them right — case 6 separates them.",
        "The empty tree gives three empty lists, not an empty outer list.",
        "Passing the output list down as a parameter avoids merging results at every level.",
      ],
      javaToolkit: ["Recursive helpers writing into a shared list", "The three emit positions", "List<List<Integer>>"],
    },
  },

  "preorder-traversal": {
    slug: "preorder-traversal",
    title: "Preorder Traversal",
    description: "Return the preorder traversal: node, then left subtree, then right subtree.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "preorder",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> preorder(TreeNode root) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, null, 2, 3] }, expectedOutput: [1, 2, 3] },
      { id: 2, inputs: { root: [3, 1, 2] }, expectedOutput: [3, 1, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [1, 2, 4, 5, 3, 6, 7], isHidden: true },
      { id: 6, inputs: { root: [5, 4, null, 3, null, 2] }, expectedOutput: [5, 4, 3, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Preorder sees a node before anything beneath it, which makes it the natural order for COPYING or serialising a tree — the parent exists before its children are needed.",
      approach: ["Emit the node, recurse left, recurse right.", "Return immediately on null."],
      optimal: { idea: "Recursive node-first walk.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "A preorder sequence alone does not determine a tree; the shape is lost without nulls or a second traversal.",
        "The left subtree is fully finished before the right begins — it is depth-first, not level by level.",
        "Left-leaning chains push the recursion depth to n.",
      ],
      javaToolkit: ["Node-first recursion", "Why preorder serialises well", "O(height) stack space"],
    },
  },

  "inorder-traversal": {
    slug: "inorder-traversal",
    title: "Inorder Traversal",
    description: "Return the inorder traversal: left subtree, then node, then right subtree.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "inorder",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> inorder(TreeNode root) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, null, 2, 3] }, expectedOutput: [1, 3, 2] },
      { id: 2, inputs: { root: [2, 1, 3] }, expectedOutput: [1, 2, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [4, 2, 5, 1, 6, 3, 7], isHidden: true },
      { id: 6, inputs: { root: [1, 2, null, 3] }, expectedOutput: [3, 2, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Inorder reads the tree left to right as it appears on the page. On a binary search tree that yields sorted output, which is why so many BST problems reduce to an inorder walk.",
      approach: ["Recurse left, emit the node, recurse right.", "Return immediately on null."],
      optimal: { idea: "Recursive left-node-right walk.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "Emitting before recursing left silently turns this into preorder.",
        "The sorted-output property holds only for a BST, not for an arbitrary binary tree.",
        "Morris traversal achieves O(1) space by temporarily rewiring right pointers, at the cost of mutating the tree mid-walk.",
      ],
      javaToolkit: ["Left-node-right recursion", "Inorder on a BST is sorted", "Morris traversal as the O(1)-space option"],
    },
  },

  "postorder-traversal": {
    slug: "postorder-traversal",
    title: "Postorder Traversal",
    description: "Return the postorder traversal: left subtree, then right subtree, then node.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "postorder",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> postorder(TreeNode root) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, null, 2, 3] }, expectedOutput: [3, 2, 1] },
      { id: 2, inputs: { root: [2, 1, 3] }, expectedOutput: [1, 3, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [4, 5, 2, 6, 7, 3, 1], isHidden: true },
      { id: 6, inputs: { root: [1, 2, 3] }, expectedOutput: [2, 3, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Postorder finishes both children before the node, so it is the order for anything that must AGGREGATE upward — heights, sums, deletions. The node acts only once its subtrees have reported.",
      approach: ["Recurse left, recurse right, emit the node.", "Return immediately on null."],
      optimal: { idea: "Recursive children-first walk.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "The root is always LAST, which is a quick sanity check on your output.",
        "Freeing or deleting a tree must be postorder; any other order drops references to subtrees still needed.",
        "Almost every 'compute something about each subtree' problem in this step is postorder underneath.",
      ],
      javaToolkit: ["Children-first recursion", "Bottom-up aggregation", "Root last"],
    },
  },

  "level-order-traversal": {
    slug: "level-order-traversal",
    title: "Level Order Traversal",
    description: "Return the values level by level, top to bottom and left to right within each level.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "levelOrder",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // One inner list per level.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [3, 9, 20, null, null, 15, 7] }, expectedOutput: [[3], [9, 20], [15, 7]] },
      { id: 2, inputs: { root: [1] }, expectedOutput: [[1]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1, 2, 3, 4, 5, null, 6] }, expectedOutput: [[1], [2, 3], [4, 5, 6]], isHidden: true },
      { id: 5, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [[1], [2], [3]], isHidden: true },
      { id: 6, inputs: { root: [1, 2] }, expectedOutput: [[1], [2]], isHidden: true },
    ],
    learn: {
      intuition:
        "Level order is breadth-first search on a tree. The trick that makes the LEVELS visible is capturing the queue's size before draining it — that count is exactly the width of the current level.",
      approach: [
        "Push the root into a queue, returning an empty list if it is null.",
        "While the queue is non-empty, record its size, poll that many nodes into one level list, and enqueue their non-null children.",
        "Append each level list to the result.",
      ],
      bruteForce: { idea: "Compute the height, then collect each depth with a separate walk.", time: "O(n × height)", space: "O(n)" },
      optimal: { idea: "BFS with a per-level size snapshot.", time: "O(n)", space: "O(width)" },
      pitfalls: [
        "Reading the queue size inside the inner loop instead of before it mixes levels together — the size changes as you enqueue.",
        "The empty tree returns an empty outer list, not a list containing an empty list.",
        "ArrayDeque rejects null, so never enqueue a null child.",
      ],
      javaToolkit: ["Queue<TreeNode> via ArrayDeque", "Snapshotting the level size", "BFS on a tree"],
    },
  },

  "iterative-preorder": {
    slug: "iterative-preorder",
    title: "Iterative Preorder Traversal",
    description: "Return the preorder traversal WITHOUT recursion, using an explicit stack.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "preorderIterative",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> preorderIterative(TreeNode root) {
        // Use a Deque, not recursion.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, null, 6] }, expectedOutput: [1, 2, 4, 5, 3, 6] },
      { id: 2, inputs: { root: [1, null, 2] }, expectedOutput: [1, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [1, 2, 4, 5, 3, 6, 7], isHidden: true },
      { id: 6, inputs: { root: [1, 2, null, 3, null, 4] }, expectedOutput: [1, 2, 3, 4], isHidden: true },
    ],
    learn: {
      intuition:
        "The call stack is doing one job — remembering what to come back to — and a stack of nodes does the same explicitly. Preorder is the easiest to convert because the node is emitted the moment it is popped.",
      approach: [
        "Push the root, if any.",
        "While the stack is non-empty, pop a node and emit it.",
        "Push the RIGHT child first, then the left, so the left is popped next.",
      ],
      optimal: { idea: "Explicit stack, right pushed before left.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "Pushing left before right reverses the traversal — this is the whole exercise.",
        "Never push null children; ArrayDeque throws on them.",
        "Iteration removes the stack-overflow risk on a degenerate 10^4-deep tree, which is the real reason to know it.",
      ],
      javaToolkit: ["Deque<TreeNode> as a stack", "Right-before-left push order", "Replacing recursion with an explicit stack"],
    },
  },

  "iterative-inorder": {
    slug: "iterative-inorder",
    title: "Iterative Inorder Traversal",
    description: "Return the inorder traversal WITHOUT recursion, using an explicit stack.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "inorderIterative",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> inorderIterative(TreeNode root) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, null, 6] }, expectedOutput: [4, 2, 5, 1, 3, 6] },
      { id: 2, inputs: { root: [1, null, 2, 3] }, expectedOutput: [1, 3, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [4, 2, 5, 1, 6, 3, 7], isHidden: true },
      { id: 6, inputs: { root: [1, 2, null, 3] }, expectedOutput: [3, 2, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Inorder cannot emit on push, because the left subtree must finish first. So push the whole left spine, then pop-emit-and-turn-right, repeating from wherever you land.",
      approach: [
        "Keep a current pointer starting at the root and an empty stack.",
        "While current is non-null or the stack is non-empty: push current and go left until current is null.",
        "Then pop, emit it, and set current to its right child.",
      ],
      optimal: { idea: "Stack plus a current pointer, descending left then turning right.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "The loop condition needs BOTH clauses; stopping when current is null ends the walk after the first left spine.",
        "The right child is assigned to current rather than pushed — pushing it duplicates work.",
        "Emit on POP, not on push; pushing is only bookkeeping.",
      ],
      javaToolkit: ["Stack plus a current pointer", "Descend-left-then-turn-right", "Emitting on pop"],
    },
  },

  "postorder-2-stack": {
    slug: "postorder-2-stack",
    title: "Iterative Postorder Using Two Stacks",
    description: "Return the postorder traversal WITHOUT recursion, using two stacks.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "postorderTwoStacks",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> postorderTwoStacks(TreeNode root) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, null, 6] }, expectedOutput: [4, 5, 2, 6, 3, 1] },
      { id: 2, inputs: { root: [1, null, 2] }, expectedOutput: [2, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [4, 5, 2, 6, 7, 3, 1], isHidden: true },
      { id: 6, inputs: { root: [1, 2, null, 3] }, expectedOutput: [3, 2, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Postorder is left-right-node. Reverse it and you get node-right-left — which is preorder with the children swapped. So run that easy traversal into a second stack, then read it back out.",
      approach: [
        "Run an iterative preorder pushing LEFT before right, so the order is node-right-left.",
        "Instead of emitting, push each popped node onto a second stack.",
        "Drain the second stack into the output.",
      ],
      optimal: { idea: "Modified preorder collected in reverse.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The push order is the mirror of iterative preorder — left first here, right first there.",
        "The second stack costs O(n) space rather than O(height); the one-stack version fixes that.",
        "Collecting into a list and reversing it at the end is the same idea without the second stack object.",
      ],
      javaToolkit: ["Two Deques", "Reversal as a traversal trick", "Collections.reverse as an alternative"],
    },
  },

  "postorder-1-stack": {
    slug: "postorder-1-stack",
    title: "Iterative Postorder Using One Stack",
    description: "Return the postorder traversal WITHOUT recursion, using a single stack.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "postorderOneStack",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> postorderOneStack(TreeNode root) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 2, 3, 4, 5, null, 6] }, expectedOutput: [4, 5, 2, 6, 3, 1] },
      { id: 2, inputs: { root: [1, 2, 3] }, expectedOutput: [2, 3, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [4, 5, 2, 6, 7, 3, 1], isHidden: true },
      { id: 6, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [3, 2, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "With one stack the problem is knowing whether you are arriving at a node or returning to it. Tracking the LAST node emitted answers that: if it was the current node's right child, both subtrees are done and the node can be emitted.",
      approach: [
        "Descend left pushing as you go.",
        "Peek at the top. If it has an unvisited right child, move there and descend again.",
        "Otherwise pop and emit it, and record it as the last emitted node.",
      ],
      optimal: { idea: "One stack plus a lastVisited marker.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "Without the lastVisited check the right subtree is re-entered forever.",
        "PEEK before deciding — popping too early loses the node you still need.",
        "This version uses O(height) space rather than the two-stack version's O(n), which is the only reason to prefer it.",
      ],
      javaToolkit: ["peek versus pop", "A lastVisited pointer", "Distinguishing descent from return"],
    },
  },

  "all-traversals-one": {
    slug: "all-traversals-one",
    title: "All Three Traversals in One Pass",
    description:
      "Return the preorder, inorder and postorder traversals, computed in a SINGLE iterative pass rather than three separate walks.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^4 ≤ node value ≤ 10^4"],
    className: "Solution",
    methodName: "allInOnePass",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> allInOnePass(TreeNode root) {
        // [preorder, inorder, postorder] from one traversal.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { root: [1, 2, 3, 4, 5, null, 6] },
        expectedOutput: [[1, 2, 4, 5, 3, 6], [4, 2, 5, 1, 3, 6], [4, 5, 2, 6, 3, 1]],
      },
      { id: 2, inputs: { root: [1, 2] }, expectedOutput: [[1, 2], [2, 1], [2, 1]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: [[], [], []], isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: [[1], [1], [1]], isHidden: true },
      { id: 5, inputs: { root: [1, 2, 3, 4, 5, 6, 7] }, expectedOutput: [[1, 2, 4, 5, 3, 6, 7], [4, 2, 5, 1, 6, 3, 7], [4, 5, 2, 6, 7, 3, 1]], isHidden: true },
      { id: 6, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [[1, 2, 3], [1, 2, 3], [3, 2, 1]], isHidden: true },
    ],
    learn: {
      intuition:
        "A recursive walk touches every node exactly three times — on the way in, between the children, and on the way out. Storing a visit COUNTER alongside each stacked node makes those three moments explicit, and each one feeds a different list.",
      approach: [
        "Stack pairs of (node, state) starting at (root, 1).",
        "State 1: emit to preorder, bump the state to 2, push the left child at state 1.",
        "State 2: emit to inorder, bump to 3, push the right child at state 1.",
        "State 3: emit to postorder and pop.",
      ],
      bruteForce: { idea: "Three separate recursive walks.", time: "O(3n)", space: "O(height)" },
      optimal: { idea: "One stack of (node, state) pairs.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "The state must be updated on the stacked entry BEFORE the child is pushed, or the parent is revisited in the wrong state.",
        "Only pop at state 3; states 1 and 2 leave the node in place.",
        "This makes concrete what recursion was doing implicitly all along, which is the real payoff.",
      ],
      javaToolkit: ["Deque of int[]{ nodeIndex, state } or a small pair class", "Explicit state machine", "Three lists from one pass"],
    },
  },
}
