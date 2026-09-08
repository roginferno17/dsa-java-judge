import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 14 — Binary Search Trees (16).
 *
 * A BST is a binary tree with one extra promise: everything in the left subtree is
 * smaller than the node and everything in the right is larger. That promise is
 * what turns a linear search into a descent, and it means an INORDER walk emits
 * the values in sorted order — the single fact behind most of this step.
 *
 * Trees are given and returned in LeetCode's level-order form, and unless a
 * problem says otherwise the values are distinct.
 */
export const step14: Record<string, ProblemMetadata> = {
  "intro-bst": {
    slug: "intro-bst",
    title: "Introduction to Binary Search Trees",
    description:
      "Return {smallest value, largest value, height in nodes} for a non-empty BST, finding the extremes by descending rather than by scanning every node.",
    constraints: ["1 ≤ nodes ≤ 10^4", "-10^5 ≤ node value ≤ 10^5", "The tree is a valid BST"],
    className: "Solution",
    methodName: "bstStats",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] bstStats(TreeNode root) {
        // { minimum, maximum, height in nodes }
        return new int[]{ 0, 0, 0 };
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [8, 3, 10, 1, 6, null, 14] }, expectedOutput: [1, 14, 3] },
      { id: 2, inputs: { root: [5] }, expectedOutput: [5, 5, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [2, 1] }, expectedOutput: [1, 2, 2], isHidden: true },
      { id: 4, inputs: { root: [1, null, 2, null, 3] }, expectedOutput: [1, 3, 3], isHidden: true },
      { id: 5, inputs: { root: [-5, -10, 0] }, expectedOutput: [-10, 0, 2], isHidden: true },
      { id: 6, inputs: { root: [4, 2, 6, 1, 3, 5, 7] }, expectedOutput: [1, 7, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "The BST property makes the extremes trivial: the smallest value is as far LEFT as you can go, the largest as far RIGHT. Neither needs a full traversal. Height, having nothing to do with ordering, still does.",
      approach: [
        "Walk left until there is no left child; that value is the minimum.",
        "Walk right until there is no right child; that value is the maximum.",
        "Compute the height recursively as usual.",
      ],
      bruteForce: { idea: "Traverse everything tracking the extremes.", time: "O(n)", space: "O(height)" },
      optimal: { idea: "Two spine descents plus one height walk.", time: "O(height) for the extremes, O(n) for the height", space: "O(height)" },
      pitfalls: [
        "The minimum is not necessarily a leaf — it can have a right child, as [2,1] does not show but [1,null,2,null,3] hints at.",
        "A BST can still be a chain, so its height is O(n) rather than O(log n) unless it is balanced.",
        "The ordering property says nothing about height, so no shortcut exists there.",
      ],
      javaToolkit: ["Leftmost and rightmost descent", "The BST invariant", "Height versus balance"],
    },
  },

  "search-bst": {
    slug: "search-bst",
    title: "Search in a BST",
    description: "Return whether the target value is present, using the ordering rather than a full traversal.",
    constraints: ["0 ≤ nodes ≤ 5000", "-10^7 ≤ values ≤ 10^7", "The tree is a valid BST"],
    className: "Solution",
    methodName: "searchBST",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "target", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean searchBST(TreeNode root, int target) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [4, 2, 7, 1, 3], target: 2 }, expectedOutput: true },
      { id: 2, inputs: { root: [4, 2, 7, 1, 3], target: 5 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [], target: 1 }, expectedOutput: false, isHidden: true },
      { id: 4, inputs: { root: [1], target: 1 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 14 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 7 }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { root: [-5, -10, 0], target: -10 }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "This is binary search on a tree. Each comparison eliminates an entire subtree, so the work is the tree's HEIGHT rather than its size.",
      approach: [
        "Walk from the root. If the value matches, succeed.",
        "Go left when the target is smaller, right when larger.",
        "Fail when you fall off the tree.",
      ],
      bruteForce: { idea: "Traverse every node.", time: "O(n)", space: "O(height)" },
      optimal: { idea: "Descend by comparison.", time: "O(height)", space: "O(1) iteratively" },
      pitfalls: [
        "O(height) is O(log n) only when the tree is balanced; a chain degrades to O(n).",
        "The iterative version needs no stack at all, unlike a general tree walk.",
        "Getting the comparison backwards searches the wrong subtree and reports a false negative rather than crashing, which makes it hard to spot.",
      ],
      javaToolkit: ["Comparison-driven descent", "Iterative while loop", "O(height) versus O(n)"],
    },
  },

  "inorder-successor-predecessor": {
    slug: "inorder-successor-predecessor",
    title: "Inorder Successor in a BST",
    description:
      "Return the smallest value strictly greater than the target — the target's inorder successor. The target need not be present. Return -1 when no such value exists.",
    constraints: ["0 ≤ nodes ≤ 10^4", "0 ≤ values ≤ 10^5", "The tree is a valid BST"],
    className: "Solution",
    methodName: "inorderSuccessor",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int inorderSuccessor(TreeNode root, int target) {
        // Smallest value strictly greater than target, or -1.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 6 }, expectedOutput: 8 },
      { id: 2, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 14 }, expectedOutput: -1, explanation: "14 is the largest value, so nothing follows it." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [], target: 5 }, expectedOutput: -1, isHidden: true },
      { id: 4, inputs: { root: [2, 1, 3], target: 1 }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 7 }, expectedOutput: 8, isHidden: true },
      { id: 6, inputs: { root: [5], target: 1 }, expectedOutput: 5, isHidden: true },
      { id: 7, inputs: { root: [4, 2, 6, 1, 3, 5, 7], target: 3 }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "Descend as if searching. Every time you turn LEFT you have found a value larger than the target, so remember it — the last such value is the tightest one, and therefore the successor.",
      approach: [
        "Keep a best candidate, initially none.",
        "While the current node exists: if its value is greater than the target, record it and go left; otherwise go right.",
        "Return the recorded candidate, or -1 if none was ever recorded.",
      ],
      bruteForce: { idea: "Collect the inorder traversal and scan it.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Single descent remembering the last left turn.", time: "O(height)", space: "O(1)" },
      pitfalls: [
        "The target does not have to be in the tree — case 5 asks for the successor of an absent value, which rules out the 'find the node then look right' approach.",
        "Strictly greater: a node equal to the target is not its own successor, so equality must go RIGHT.",
        "The predecessor is the exact mirror — record on every right turn instead.",
      ],
      javaToolkit: ["Descent with a remembered candidate", "Handling an absent target", "The predecessor mirror"],
    },
  },

  "insert-bst": {
    slug: "insert-bst",
    title: "Insert a Node into a BST",
    description:
      "Insert the value and return the tree's root, keeping it a valid BST. The value is not already present, and the new node is always added as a LEAF.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^8 ≤ values ≤ 10^8", "The value is absent from the tree"],
    className: "Solution",
    methodName: "insertIntoBST",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "value", type: "int" },
    ],
    returnType: "TreeNode",
    comparison: { type: "tree" },
    starterCode: `class Solution {
    public TreeNode insertIntoBST(TreeNode root, int value) {
        // Insert as a leaf; no rebalancing.
        return root;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [4, 2, 7, 1, 3], value: 5 }, expectedOutput: [4, 2, 7, 1, 3, 5] },
      { id: 2, inputs: { root: [], value: 1 }, expectedOutput: [1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [1], value: 2 }, expectedOutput: [1, null, 2], isHidden: true },
      { id: 4, inputs: { root: [1], value: 0 }, expectedOutput: [1, 0], isHidden: true },
      { id: 5, inputs: { root: [40, 20, 60, 10, 30, 50, 70], value: 25 }, expectedOutput: [40, 20, 60, 10, 30, 50, 70, null, null, 25], isHidden: true },
      { id: 6, inputs: { root: [2, 1, 3], value: 4 }, expectedOutput: [2, 1, 3, null, null, null, 4], isHidden: true },
      { id: 7, inputs: { root: [5, 3, 8], value: 4 }, expectedOutput: [5, 3, 8, null, 4], isHidden: true },
    ],
    learn: {
      intuition:
        "Search for the value. Since it is absent, the search runs off the end of the tree — and that empty slot is precisely where the new node belongs, with no restructuring needed.",
      approach: [
        "Return a fresh node when the current node is null.",
        "Recurse into the left child when the value is smaller, the right when larger.",
        "Reassign the child pointer to the recursive result and return the node.",
      ],
      optimal: { idea: "Descend to the empty slot and attach.", time: "O(height)", space: "O(height) recursively, O(1) iteratively" },
      pitfalls: [
        "The recursive call's result must be ASSIGNED back to root.left or root.right, or the new node is created and dropped.",
        "Inserting into an empty tree returns the new node as the root.",
        "This never rebalances, so inserting sorted values one at a time builds a chain — which is exactly why AVL and red-black trees exist.",
      ],
      javaToolkit: ["Return-the-subtree recursion", "root.left = insert(root.left, v)", "Why unbalanced insertion degrades"],
    },
  },

  "delete-bst": {
    slug: "delete-bst",
    title: "Delete a Node from a BST",
    description:
      "Remove the node holding the given value and return the root, keeping the tree a valid BST. When the node has two children, replace it with its INORDER SUCCESSOR — the smallest value in its right subtree. If the value is absent, return the tree unchanged.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^5 ≤ values ≤ 10^5", "Values are distinct"],
    className: "Solution",
    methodName: "deleteNode",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "key", type: "int" },
    ],
    returnType: "TreeNode",
    comparison: { type: "tree" },
    starterCode: `class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        // Two children: replace with the inorder successor.
        return root;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [5, 3, 6, 2, 4, null, 7], key: 3 }, expectedOutput: [5, 4, 6, 2, null, null, 7] },
      { id: 2, inputs: { root: [5, 3, 6, 2, 4, null, 7], key: 0 }, expectedOutput: [5, 3, 6, 2, 4, null, 7], explanation: "0 is absent, so nothing changes." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [1], key: 1 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { root: [2, 1], key: 2 }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { root: [2, null, 3], key: 2 }, expectedOutput: [3], isHidden: true },
      { id: 6, inputs: { root: [5, 3, 6, 2, 4, null, 7], key: 5 }, expectedOutput: [6, 3, 7, 2, 4], isHidden: true },
      { id: 7, inputs: { root: [50, 30, 70, null, 40, 60, 80], key: 30 }, expectedOutput: [50, 40, 70, null, null, 60, 80], isHidden: true },
    ],
    learn: {
      intuition:
        "Three cases. A leaf just disappears. A node with one child is replaced by that child. A node with two children cannot simply vanish — but its inorder successor is by definition the next value in sorted order, so copying that value in and deleting it from the right subtree preserves the ordering.",
      approach: [
        "Descend by comparison until the key is found.",
        "If either child is null, return the other one.",
        "Otherwise find the leftmost node of the right subtree, copy its value into this node, and delete THAT value from the right subtree.",
      ],
      optimal: { idea: "Case split with successor replacement.", time: "O(height)", space: "O(height)" },
      pitfalls: [
        "Which replacement you choose changes the resulting tree, so the description fixes it as the successor — the predecessor would also be valid but gives a different answer.",
        "The recursive delete on the right subtree is what actually removes the successor node; forgetting it duplicates its value.",
        "Deleting the only node returns an empty tree, not a node with a null value.",
      ],
      javaToolkit: ["Three-case deletion", "Leftmost node of the right subtree", "Recursive reassignment of children"],
    },
  },

  "kth-element-bst": {
    slug: "kth-element-bst",
    title: "Kth Smallest and Largest in a BST",
    description:
      "Return {kth smallest value, kth largest value}. k is 1-based and never exceeds the node count.",
    constraints: ["1 ≤ k ≤ nodes ≤ 10^4", "0 ≤ values ≤ 10^5", "Values are distinct"],
    className: "Solution",
    methodName: "kthElements",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "k", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] kthElements(TreeNode root, int k) {
        // { kth smallest, kth largest }
        return new int[]{ 0, 0 };
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [3, 1, 4, null, 2], k: 1 }, expectedOutput: [1, 4] },
      { id: 2, inputs: { root: [5, 3, 6, 2, 4, null, null, 1], k: 3 }, expectedOutput: [3, 4] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [1], k: 1 }, expectedOutput: [1, 1], isHidden: true },
      { id: 4, inputs: { root: [2, 1, 3], k: 2 }, expectedOutput: [2, 2], isHidden: true },
      { id: 5, inputs: { root: [4, 2, 6, 1, 3, 5, 7], k: 7 }, expectedOutput: [7, 1], isHidden: true },
      { id: 6, inputs: { root: [4, 2, 6, 1, 3, 5, 7], k: 4 }, expectedOutput: [4, 4], isHidden: true },
      { id: 7, inputs: { root: [8, 3, 10, 1, 6, null, 14], k: 2 }, expectedOutput: [3, 10], isHidden: true },
    ],
    learn: {
      intuition:
        "Inorder emits a BST's values in ascending order, so the kth smallest is simply the kth value emitted. The kth LARGEST is the same walk mirrored — right, node, left — and needs no separate idea.",
      approach: [
        "Walk inorder with a counter, stopping at the kth node.",
        "Walk reverse-inorder with a second counter for the kth largest.",
        "Both can stop early once the counter reaches k.",
      ],
      bruteForce: { idea: "Collect the whole inorder list and index into it.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Two counted walks with early exit.", time: "O(height + k)", space: "O(height)" },
      pitfalls: [
        "The kth largest is the (n − k + 1)th smallest, which is an easy off-by-one; the reverse walk avoids the arithmetic entirely.",
        "Without early exit both walks are O(n), which is correct but misses the point.",
        "k is 1-based, so k = 1 is the minimum.",
      ],
      javaToolkit: ["Inorder as a sorted stream", "Reverse inorder", "Counting with early termination"],
    },
  },

  "validate-bst": {
    slug: "validate-bst",
    title: "Validate a Binary Search Tree",
    description:
      "Return whether the tree is a valid BST: every value in a node's left subtree is strictly smaller than it, and every value in its right subtree strictly larger.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-2^31 ≤ node value ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "isValidBST",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isValidBST(TreeNode root) {
        // The whole subtree must obey, not just the immediate children.
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [2, 1, 3] }, expectedOutput: true },
      { id: 2, inputs: { root: [5, 1, 4, null, null, 3, 6] }, expectedOutput: false, explanation: "3 sits in the right subtree of 5 but is smaller than it." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { root: [1] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { root: [10, 5, 15, null, null, 6, 20] }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { root: [2, 2, 2] }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { root: [-2147483648, null, 2147483647] }, expectedOutput: true, isHidden: true },
      { id: 8, inputs: { root: [4, 2, 6, 1, 3, 5, 7] }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Checking each node against its own two children is not enough — a value can respect its parent and still violate a grandparent. Carry a permitted RANGE down instead: entering a left subtree lowers the upper bound, entering a right subtree raises the lower one.",
      approach: [
        "Recurse with a low and high bound, both initially unbounded.",
        "Fail if the node's value is outside them.",
        "Recurse left with the high bound set to this value, and right with the low bound set to it.",
      ],
      bruteForce: { idea: "For each node, scan both subtrees for a violation.", time: "O(n²)", space: "O(height)" },
      optimal: { idea: "Range-bounded recursion, or checking that the inorder walk is strictly increasing.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "The parent-only check passes case 5, where 6 respects its parent 15 but violates its grandparent 10.",
        "Bounds must be Long or nullable Integer, or a node holding Integer.MIN_VALUE is rejected — case 7 exists for that.",
        "Equal values are not allowed on either side, so [2,2,2] is invalid.",
      ],
      javaToolkit: ["Range-passing recursion", "Long bounds to dodge the int extremes", "Inorder-is-increasing as the alternative"],
    },
  },

  "lca-bst": {
    slug: "lca-bst",
    title: "Lowest Common Ancestor in a BST",
    description:
      "Return the value of the lowest node having both p and q as descendants, where a node counts as its own descendant. Both values are present and distinct.",
    constraints: ["2 ≤ nodes ≤ 10^5", "-10^9 ≤ values ≤ 10^9", "p and q are present and distinct"],
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
        // Use the ordering; no full search is needed.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 }, expectedOutput: 6 },
      { id: 2, inputs: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4 }, expectedOutput: 2, explanation: "2 is an ancestor of 4 and counts as its own descendant." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [2, 1], p: 2, q: 1 }, expectedOutput: 2, isHidden: true },
      { id: 4, inputs: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 3, q: 5 }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { root: [4, 2, 6, 1, 3, 5, 7], p: 1, q: 7 }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { root: [4, 2, 6, 1, 3, 5, 7], p: 5, q: 7 }, expectedOutput: 6, isHidden: true },
      { id: 7, inputs: { root: [1, null, 2, null, 3], p: 2, q: 3 }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "The ancestor is the first node where the two values SPLIT. While both are smaller go left, while both are larger go right; the moment they straddle the node — or one equals it — you have arrived.",
      approach: [
        "Walk from the root.",
        "Go left while both values are smaller, right while both are larger.",
        "Return the current node otherwise.",
      ],
      bruteForce: { idea: "The general-tree LCA, ignoring the ordering.", time: "O(n)", space: "O(height)" },
      optimal: { idea: "Descend until the values split.", time: "O(height)", space: "O(1)" },
      pitfalls: [
        "The general binary-tree algorithm still works and is O(n); using the ordering is the point.",
        "A node EQUAL to one of the targets is the answer, since it is its own descendant.",
        "No comparison of p against q is needed — the straddle test covers both orders.",
      ],
      javaToolkit: ["Split-point descent", "Iterative, no stack", "BST ordering as a shortcut"],
    },
  },

  "floor-bst": {
    slug: "floor-bst",
    title: "Floor in a BST",
    description:
      "Return the largest value less than or equal to the target, or -1 when every value is larger. The target need not be present.",
    constraints: ["0 ≤ nodes ≤ 10^5", "0 ≤ values ≤ 10^5", "The tree is a valid BST"],
    className: "Solution",
    methodName: "floorInBST",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int floorInBST(TreeNode root, int target) {
        // Largest value <= target, or -1.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [10, 5, 15, null, null, 12, 30], target: 13 }, expectedOutput: 12 },
      { id: 2, inputs: { root: [10, 5, 15, null, null, 12, 30], target: 15 }, expectedOutput: 15, explanation: "An exact match is its own floor." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [], target: 5 }, expectedOutput: -1, isHidden: true },
      { id: 4, inputs: { root: [10, 5, 15], target: 3 }, expectedOutput: -1, isHidden: true },
      { id: 5, inputs: { root: [10, 5, 15, null, null, 12, 30], target: 100 }, expectedOutput: 30, isHidden: true },
      { id: 6, inputs: { root: [2, 1, 3], target: 1 }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 7 }, expectedOutput: 6, isHidden: true },
    ],
    learn: {
      intuition:
        "Descend as if searching. Every time you move RIGHT you leave behind a value that is ≤ the target, so record it — the last one recorded is the tightest, and therefore the floor.",
      approach: [
        "Keep a best candidate, initially -1.",
        "While the node exists: if its value equals the target, return it; if smaller, record it and go right; otherwise go left.",
        "Return the candidate.",
      ],
      bruteForce: { idea: "Traverse everything keeping the best value ≤ target.", time: "O(n)", space: "O(height)" },
      optimal: { idea: "Descent recording every right turn.", time: "O(height)", space: "O(1)" },
      pitfalls: [
        "The floor INCLUDES an exact match, unlike the strictly-greater successor problem earlier.",
        "-1 is only a usable sentinel because values are non-negative here.",
        "A target beyond the maximum answers with the maximum, not -1 — case 5.",
      ],
      javaToolkit: ["Descent with a remembered candidate", "Inclusive comparison", "Sentinel choice"],
    },
  },

  "ceil-bst": {
    slug: "ceil-bst",
    title: "Ceil in a BST",
    description:
      "Return the smallest value greater than or equal to the target, or -1 when every value is smaller. The target need not be present.",
    constraints: ["0 ≤ nodes ≤ 10^5", "0 ≤ values ≤ 10^5", "The tree is a valid BST"],
    className: "Solution",
    methodName: "ceilInBST",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int ceilInBST(TreeNode root, int target) {
        // Smallest value >= target, or -1.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [10, 5, 15, null, null, 12, 30], target: 13 }, expectedOutput: 15 },
      { id: 2, inputs: { root: [10, 5, 15, null, null, 12, 30], target: 12 }, expectedOutput: 12 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [], target: 5 }, expectedOutput: -1, isHidden: true },
      { id: 4, inputs: { root: [10, 5, 15], target: 100 }, expectedOutput: -1, isHidden: true },
      { id: 5, inputs: { root: [10, 5, 15, null, null, 12, 30], target: 1 }, expectedOutput: 5, isHidden: true },
      { id: 6, inputs: { root: [2, 1, 3], target: 3 }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 7 }, expectedOutput: 8, isHidden: true },
    ],
    learn: {
      intuition:
        "The mirror of the floor. Record on every LEFT turn instead, because moving left leaves behind a value that is ≥ the target.",
      approach: [
        "Keep a best candidate, initially -1.",
        "While the node exists: return on an exact match; if the value is greater, record it and go left; otherwise go right.",
        "Return the candidate.",
      ],
      bruteForce: { idea: "Traverse everything keeping the best value ≥ target.", time: "O(n)", space: "O(height)" },
      optimal: { idea: "Descent recording every left turn.", time: "O(height)", space: "O(1)" },
      pitfalls: [
        "Floor and ceil differ only in the direction recorded; writing one and flipping it is the efficient way to learn both.",
        "The ceil is inclusive, so an exact match returns itself.",
        "A target above the maximum has no ceil, which is what -1 signals.",
      ],
      javaToolkit: ["The floor/ceil mirror", "Recording left turns", "Inclusive bounds"],
    },
  },

  "pair-sum-bst": {
    slug: "pair-sum-bst",
    title: "Find a Pair With a Given Sum in a BST",
    description:
      "Return whether two DIFFERENT nodes hold values summing to the target. Values are distinct.",
    constraints: ["1 ≤ nodes ≤ 10^4", "-10^4 ≤ values ≤ 10^4", "-10^5 ≤ target ≤ 10^5"],
    className: "Solution",
    methodName: "findTarget",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "target", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public boolean findTarget(TreeNode root, int target) {
        // Two different nodes.
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [5, 3, 6, 2, 4, null, 7], target: 9 }, expectedOutput: true, explanation: "2 + 7." },
      { id: 2, inputs: { root: [5, 3, 6, 2, 4, null, 7], target: 28 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [1], target: 2 }, expectedOutput: false, isHidden: true },
      { id: 4, inputs: { root: [2, 1, 3], target: 4 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { root: [2, 1, 3], target: 6 }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { root: [-3, -5, 0], target: -5 }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { root: [4, 2, 6, 1, 3, 5, 7], target: 8 }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Inorder gives a sorted sequence, and 'two values summing to a target' in a sorted sequence is the classic two-pointer problem. Doing it without materialising the list means running an inorder iterator from the left and a reverse-inorder iterator from the right at the same time.",
      approach: [
        "The simple version: collect the inorder list and run two pointers from both ends.",
        "The O(height)-space version: two stack-based iterators, one ascending and one descending.",
        "Move the ascending side when the sum is too small, the descending side when it is too large.",
      ],
      bruteForce: { idea: "For every node, search the tree for target minus its value.", time: "O(n × height)", space: "O(height)" },
      optimal: { idea: "Two pointers on the inorder sequence, or a HashSet in one pass.", time: "O(n)", space: "O(n) or O(height)" },
      pitfalls: [
        "The two nodes must be DIFFERENT, so a single node worth half the target does not count — case 3 checks this.",
        "The HashSet approach is the shortest to write but ignores the BST structure entirely.",
        "The two iterators must never cross, or a pair is counted with itself.",
      ],
      javaToolkit: ["Inorder into a sorted list", "Two pointers", "Ascending and descending stack iterators"],
    },
  },

  "bst-to-greater-sum": {
    slug: "bst-to-greater-sum",
    title: "BST to Greater Sum Tree",
    description:
      "Replace every value by the sum of all values greater than or equal to it in the original tree, and return the modified root.",
    constraints: ["1 ≤ nodes ≤ 100", "0 ≤ values ≤ 100", "Values are distinct"],
    className: "Solution",
    methodName: "convertBST",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "TreeNode",
    comparison: { type: "tree" },
    starterCode: `class Solution {
    public TreeNode convertBST(TreeNode root) {
        // Each value becomes the sum of itself and everything larger.
        return root;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [4, 1, 6, 0, 2, 5, 7, null, null, null, 3, null, null, null, 8] }, expectedOutput: [30, 36, 21, 36, 35, 26, 15, null, null, null, 33, null, null, null, 8] },
      { id: 2, inputs: { root: [1, 0, 2] }, expectedOutput: [3, 3, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [5] }, expectedOutput: [5], isHidden: true },
      { id: 4, inputs: { root: [2, 1, 3] }, expectedOutput: [5, 6, 3], isHidden: true },
      { id: 5, inputs: { root: [0, null, 1] }, expectedOutput: [1, null, 1], isHidden: true },
      { id: 6, inputs: { root: [3, 2, 4, 1] }, expectedOutput: [7, 9, 4, 10], isHidden: true },
      { id: 7, inputs: { root: [10, 5, 15] }, expectedOutput: [25, 30, 15], isHidden: true },
    ],
    learn: {
      intuition:
        "Each node needs the total of everything to its right in sorted order. A REVERSE inorder walk — right, node, left — visits the values in descending order, so a running sum carried along is exactly what each node needs when it is reached.",
      approach: [
        "Keep a running total, initially 0.",
        "Recurse right first, then add the node's value to the total and write the total into the node, then recurse left.",
        "Return the root.",
      ],
      bruteForce: { idea: "For each node, sum every value at least as large.", time: "O(n²)", space: "O(height)" },
      optimal: { idea: "Reverse inorder with a running sum.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "A forward inorder walk gives the sum of everything SMALLER, which is a different tree entirely.",
        "The running total must survive across recursive calls — an instance field or a one-element array, not a local.",
        "The node's own value is included in its new value, so add before writing.",
      ],
      javaToolkit: ["Reverse inorder", "A running accumulator across recursion", "In-place tree modification"],
    },
  },

  "recover-bst": {
    slug: "recover-bst",
    title: "Recover a BST With Two Swapped Nodes",
    description:
      "Exactly two nodes of a valid BST have had their values swapped. Restore the tree by swapping them back and return the root, changing nothing else about the structure.",
    constraints: ["2 ≤ nodes ≤ 1000", "-2^31 ≤ values ≤ 2^31 - 1", "Exactly two values are swapped"],
    className: "Solution",
    methodName: "recoverTree",
    parameters: [{ name: "root", type: "TreeNode" }],
    returnType: "TreeNode",
    comparison: { type: "tree" },
    starterCode: `class Solution {
    public TreeNode recoverTree(TreeNode root) {
        // Swap the two values back; leave the shape alone.
        return root;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [1, 3, null, null, 2] }, expectedOutput: [3, 1, null, null, 2], explanation: "1 and 3 were swapped." },
      { id: 2, inputs: { root: [3, 1, 4, null, null, 2] }, expectedOutput: [2, 1, 4, null, null, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [2, 1, 4, null, 3] }, expectedOutput: [3, 1, 4, null, 2], isHidden: true },
      { id: 4, inputs: { root: [1, 2] }, expectedOutput: [2, 1], isHidden: true },
      { id: 5, inputs: { root: [2, null, 1] }, expectedOutput: [1, null, 2], isHidden: true },
      { id: 6, inputs: { root: [4, 2, 6, 1, 5, 3, 7] }, expectedOutput: [4, 2, 6, 1, 3, 5, 7], isHidden: true },
      { id: 7, inputs: { root: [2, 3, 1] }, expectedOutput: [2, 1, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Inorder should be strictly increasing, so a swap shows up as a descent. Two ADJACENT nodes swapped produce one descent; two distant nodes produce two. Take the first offender from the first descent and the second offender from the last, and swap.",
      approach: [
        "Walk inorder tracking the previously visited node.",
        "On each descent, record the previous node as a candidate if it is the first such descent, and always record the current node as the second candidate.",
        "Swap the two recorded values at the end.",
      ],
      bruteForce: { idea: "Collect inorder, sort it, and find the two mismatched positions.", time: "O(n log n)", space: "O(n)" },
      optimal: { idea: "One inorder walk with two candidate pointers.", time: "O(n)", space: "O(height)" },
      pitfalls: [
        "The adjacent case gives only ONE descent, so the second candidate must be set on every descent, not just the second one.",
        "Cases 4 and 5 swap ADJACENT values in the inorder order, which produces only one descent; cases 6 and 7 swap distant ones and produce two.",
        "Swap the VALUES; rewiring the nodes changes the shape and breaks the tree.",
      ],
      javaToolkit: ["Inorder with a previous pointer", "Two candidate pointers", "One-descent versus two-descent cases"],
    },
  },

  "merge-two-bsts": {
    slug: "merge-two-bsts",
    title: "Merge Two BSTs",
    description:
      "Return every value from both trees in ascending order, keeping duplicates. Do it without sorting at the end.",
    constraints: ["0 ≤ nodes in each tree ≤ 10^4", "-10^5 ≤ values ≤ 10^5"],
    className: "Solution",
    methodName: "mergeBSTs",
    parameters: [
      { name: "a", type: "TreeNode" },
      { name: "b", type: "TreeNode" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> mergeBSTs(TreeNode a, TreeNode b) {
        // Ascending, duplicates kept, no final sort.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: [2, 1, 3], b: [5, 4, 6] }, expectedOutput: [1, 2, 3, 4, 5, 6] },
      { id: 2, inputs: { a: [1], b: [1] }, expectedOutput: [1, 1], explanation: "Duplicates across the two trees are kept." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: [], b: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { a: [], b: [2, 1, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 5, inputs: { a: [5, 3, 7], b: [4, 2, 6] }, expectedOutput: [2, 3, 4, 5, 6, 7], isHidden: true },
      { id: 6, inputs: { a: [10], b: [1, null, 5] }, expectedOutput: [1, 5, 10], isHidden: true },
      { id: 7, inputs: { a: [-5, -10, 0], b: [-3] }, expectedOutput: [-10, -5, -3, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "Each tree's inorder walk is already sorted, so this is merging two sorted sequences — the merge step from merge sort, with the sequences produced by traversals rather than stored in arrays.",
      approach: [
        "Collect each tree's inorder list.",
        "Merge the two with a standard two-pointer pass.",
        "Append whatever remains of the longer one.",
      ],
      bruteForce: { idea: "Concatenate everything and sort.", time: "O(N log N)", space: "O(N)" },
      optimal: { idea: "Two inorder walks, then a linear merge.", time: "O(N)", space: "O(N)" },
      pitfalls: [
        "Sorting at the end is O(N log N) and wastes the ordering the trees already gave you.",
        "Duplicates across trees are kept, so equal values both appear.",
        "Two stack-based iterators merge without materialising either list, at O(height) space.",
      ],
      javaToolkit: ["Inorder to a sorted list", "The merge step from merge sort", "Stack-based BST iterators"],
    },
  },

  "count-bst-range": {
    slug: "count-bst-range",
    title: "Count BST Nodes in a Range",
    description:
      "Return how many values lie in the inclusive range [low, high], pruning subtrees that cannot contain any.",
    constraints: ["0 ≤ nodes ≤ 10^4", "-10^5 ≤ values, low, high ≤ 10^5", "low ≤ high"],
    className: "Solution",
    methodName: "countInRange",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "low", type: "int" },
      { name: "high", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countInRange(TreeNode root, int low, int high) {
        // Inclusive range. Prune subtrees that cannot contribute.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [10, 5, 15, 3, 7, null, 18], low: 7, high: 15 }, expectedOutput: 3, explanation: "7, 10 and 15." },
      { id: 2, inputs: { root: [10, 5, 15, 3, 7, null, 18], low: 1, high: 100 }, expectedOutput: 6 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [], low: 1, high: 5 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { root: [5], low: 5, high: 5 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { root: [5], low: 6, high: 9 }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { root: [4, 2, 6, 1, 3, 5, 7], low: 3, high: 5 }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { root: [-5, -10, 0], low: -10, high: -5 }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "Pruning is the point. A node below the range means its whole LEFT subtree is below too, so skip it entirely; a node above means the right subtree can be skipped. Only nodes that straddle the range need both children explored.",
      approach: [
        "Return 0 for null.",
        "If the value is below low, recurse only right; if above high, recurse only left.",
        "Otherwise count this node and recurse both ways.",
      ],
      bruteForce: { idea: "Visit every node and test the range.", time: "O(n)", space: "O(height)" },
      optimal: { idea: "Range-pruned traversal.", time: "O(height + matches)", space: "O(height)" },
      pitfalls: [
        "Without pruning the answer is still right but the whole tree is walked; the pruning is what is being taught.",
        "The range is inclusive at both ends, which case 4 checks.",
        "Recursing both ways after deciding a node is out of range silently undoes the pruning.",
      ],
      javaToolkit: ["Range pruning", "One-sided recursion", "Output-sensitive complexity"],
    },
  },

  "predecessor-successor": {
    slug: "predecessor-successor",
    title: "Inorder Predecessor and Successor",
    description:
      "Return {predecessor, successor} for the target: the largest value strictly less than it and the smallest strictly greater. Use -1 where no such value exists. The target need not be present.",
    constraints: ["0 ≤ nodes ≤ 10^5", "0 ≤ values ≤ 10^5", "The tree is a valid BST"],
    className: "Solution",
    methodName: "predecessorSuccessor",
    parameters: [
      { name: "root", type: "TreeNode" },
      { name: "target", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] predecessorSuccessor(TreeNode root, int target) {
        // { predecessor, successor }, -1 where absent. Both strict.
        return new int[]{ -1, -1 };
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 6 }, expectedOutput: [3, 8] },
      { id: 2, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 1 }, expectedOutput: [-1, 3], explanation: "1 is the smallest value, so it has no predecessor." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { root: [], target: 5 }, expectedOutput: [-1, -1], isHidden: true },
      { id: 4, inputs: { root: [5], target: 5 }, expectedOutput: [-1, -1], isHidden: true },
      { id: 5, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 7 }, expectedOutput: [6, 8], isHidden: true },
      { id: 6, inputs: { root: [8, 3, 10, 1, 6, null, 14], target: 14 }, expectedOutput: [10, -1], isHidden: true },
      { id: 7, inputs: { root: [4, 2, 6, 1, 3, 5, 7], target: 100 }, expectedOutput: [7, -1], isHidden: true },
    ],
    learn: {
      intuition:
        "Two independent descents, each remembering the last useful turn. The predecessor is the last value seen that was strictly smaller; the successor is the last that was strictly greater.",
      approach: [
        "Descend once keeping the best value strictly less than the target, going right when the node is smaller and left otherwise.",
        "Descend again keeping the best value strictly greater, going left when the node is larger and right otherwise.",
        "Return both, using -1 where nothing was recorded.",
      ],
      bruteForce: { idea: "Collect the inorder list and scan around the target.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Two candidate-remembering descents.", time: "O(height)", space: "O(1)" },
      pitfalls: [
        "Both bounds are STRICT here, so a present target is neither its own predecessor nor its own successor — case 4 makes that unmissable.",
        "This is floor and ceil with the equality removed; reusing those directly gives the wrong answer on an exact match.",
        "A target beyond every value still has a predecessor, as case 7 shows.",
      ],
      javaToolkit: ["Two symmetric descents", "Strict versus inclusive bounds", "Reusing floor/ceil carefully"],
    },
  },
}
