import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 6 — Hard linked list problems (4).
 *
 * Each of these needs a list shape a flat array cannot express, which is why the
 * harness gained bottom and random pointers.
 */
export const step06Hard: Record<string, ProblemMetadata> = {
  "reverse-k-group": {
    slug: "reverse-k-group",
    title: "Reverse Nodes in Groups of K",
    description:
      "Reverse the list in consecutive groups of k nodes. If the final group has fewer than k nodes, leave it as it is.",
    constraints: ["1 ≤ list length ≤ 5000", "1 ≤ k ≤ list length"],
    className: "Solution",
    methodName: "reverseKGroup",
    parameters: [
      { name: "head", type: "ListNode" },
      { name: "k", type: "int" },
    ],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        // A trailing group shorter than k stays in its original order.
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4, 5], k: 2 }, expectedOutput: [2, 1, 4, 3, 5], explanation: "Two full pairs reverse; the lone 5 is left alone." },
      { id: 2, inputs: { head: [1, 2, 3, 4, 5], k: 3 }, expectedOutput: [3, 2, 1, 4, 5], explanation: "One full group of three; 4 and 5 are too few." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1], k: 1 }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { head: [1, 2, 3, 4], k: 4 }, expectedOutput: [4, 3, 2, 1], isHidden: true },
      { id: 5, inputs: { head: [1, 2, 3], k: 1 }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 6, inputs: { head: [1, 2, 3, 4, 5, 6], k: 2 }, expectedOutput: [2, 1, 4, 3, 6, 5], isHidden: true },
    ],
    learn: {
      intuition:
        "Reversing one group is a problem you have already solved. The work here is bookkeeping: before reversing, check a full group exists, and afterwards reconnect the previous group's tail to the new head and the new tail to whatever follows.",
      approach: [
        "Use a dummy node so the first group's predecessor is uniform with the rest.",
        "From the current group's predecessor, walk k nodes ahead; if you run out, stop and leave the remainder.",
        "Reverse exactly those k nodes, then relink the predecessor to the new head and the new tail to the next group.",
        "Advance the predecessor to that tail and repeat.",
      ],
      bruteForce: { idea: "Copy the values into an array, reverse each block, write back.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Group-wise in-place reversal with relinking.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Checking for a full group AFTER reversing means you have to undo it; check first.",
        "k = 1 must leave the list untouched.",
        "Losing the reference to the node after the group orphans the rest of the list.",
      ],
      javaToolkit: ["Dummy node", "Bounded reversal of exactly k nodes", "Relinking group boundaries"],
    },
  },

  "rotate-linked-list": {
    slug: "rotate-linked-list",
    title: "Rotate a Linked List",
    description:
      "Rotate the list to the right by k places and return the new head. k may exceed the list length.",
    constraints: ["0 ≤ list length ≤ 500", "0 ≤ k ≤ 2 × 10^9"],
    className: "Solution",
    methodName: "rotateRight",
    parameters: [
      { name: "head", type: "ListNode" },
      { name: "k", type: "int" },
    ],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        // k can be far larger than the list.
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4, 5], k: 2 }, expectedOutput: [4, 5, 1, 2, 3], explanation: "The last two nodes move to the front." },
      { id: 2, inputs: { head: [0, 1, 2], k: 4 }, expectedOutput: [2, 0, 1], explanation: "Rotating a length-3 list by 4 is the same as by 1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [], k: 3 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [1], k: 99 }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { head: [1, 2], k: 2 }, expectedOutput: [1, 2], isHidden: true },
      { id: 6, inputs: { head: [1, 2, 3], k: 0 }, expectedOutput: [1, 2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Close the list into a ring, then cut it open at the right place. That turns a fiddly pointer shuffle into one length calculation and one break.",
      approach: [
        "Walk to the tail, counting the length, and link the tail back to the head.",
        "Reduce k modulo the length; a remainder of 0 means no rotation.",
        "Walk length - k steps from the head to find the new tail.",
        "The new head is its successor; sever the link and return.",
      ],
      bruteForce: { idea: "Rotate by one, k times.", time: "O(n × k)", space: "O(1)" },
      optimal: { idea: "Form a ring, then break it at the right point.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Forgetting k %= length loops billions of times for large k.",
        "Failing to sever the ring returns a circular list, which the judge would otherwise walk forever — its cycle guard stops it, but the answer is wrong.",
        "Empty and single-node lists must be handled before the length walk.",
      ],
      javaToolkit: ["Forming and breaking a ring", "Modulo normalisation", "Finding the new tail by offset"],
    },
  },

  "flatten-linked-list": {
    slug: "flatten-linked-list",
    title: "Flatten a Linked List",
    description:
      "Each node heads a sorted sub-list linked by bottom, and the heads are linked by next. Flatten everything into one sorted list linked entirely by bottom, and return its head. Input is given as an array of columns.",
    constraints: ["1 ≤ number of columns ≤ 100", "Each column is sorted ascending"],
    className: "Solution",
    methodName: "flatten",
    parameters: [{ name: "head", type: "ListNodeNested" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode flatten(ListNode head) {
        // ListNode also has a 'bottom' pointer. Return a list linked by bottom.
        // The judge reads the result by following 'next', so set next as you build.
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [[5, 7, 8, 30], [10, 20], [19, 22, 50], [28, 35, 40, 45]] }, expectedOutput: [5, 7, 8, 10, 19, 20, 22, 28, 30, 35, 40, 45, 50] },
      { id: 2, inputs: { head: [[1], [2]] }, expectedOutput: [1, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [[1, 2, 3]] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 4, inputs: { head: [[3], [1], [2]] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 5, inputs: { head: [[1, 1], [1]] }, expectedOutput: [1, 1, 1], isHidden: true },
      { id: 6, inputs: { head: [[5, 10], [1, 2, 3]] }, expectedOutput: [1, 2, 3, 5, 10], isHidden: true },
    ],
    learn: {
      intuition:
        "Every column is already sorted, so this is merging k sorted lists. Merging them pairwise from the right — flatten the rest, then merge the current column into it — keeps the code to one small merge function.",
      approach: [
        "Recurse on head.next until only the last column remains.",
        "Merge the current column into the flattened remainder using a standard two-pointer merge on the bottom links.",
        "Return the merged head, clearing next as you go so the result is a single chain.",
      ],
      bruteForce: { idea: "Collect every value, sort, and rebuild.", time: "O(N log N)", space: "O(N)" },
      optimal: { idea: "Recursive pairwise merge, or a priority queue over the column heads.", time: "O(N × k)", space: "O(k) recursion" },
      pitfalls: [
        "Leaving next pointing at the old columns produces a tangled structure — clear it while merging.",
        "This judge reads the returned list through next, so set both links or set next to the flattened order.",
        "A priority queue over the k heads gives O(N log k), which is better for many columns.",
      ],
      javaToolkit: ["Merging two sorted lists", "Recursive pairwise merge", "The bottom pointer"],
    },
  },

  "clone-random-pointer": {
    slug: "clone-random-pointer",
    title: "Clone a Linked List With Random Pointers",
    description:
      "Each node has a next and a random pointer, where random may point at any node or be null. Return a DEEP COPY as an array of {value, randomIndex} pairs, using -1 when random is null. Input uses the same shape.",
    constraints: ["0 ≤ list length ≤ 1000"],
    className: "Solution",
    methodName: "copyRandomList",
    parameters: [{ name: "head", type: "ListNodeRandom" }],
    returnType: "int[][]",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[][] copyRandomList(ListNode head) {
        // ListNode also has a 'random' pointer.
        // Build a deep copy, then describe it as {value, randomIndex} rows.
        return new int[0][0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [[7, -1], [13, 0], [11, 4], [10, 2], [1, 0]] }, expectedOutput: [[7, -1], [13, 0], [11, 4], [10, 2], [1, 0]], explanation: "The copy has the same shape; node 0's random is null." },
      { id: 2, inputs: { head: [[1, 1], [2, 1]] }, expectedOutput: [[1, 1], [2, 1]], explanation: "Both randoms point at the second node." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [[1, -1]] }, expectedOutput: [[1, -1]], isHidden: true },
      { id: 5, inputs: { head: [[3, 0]] }, expectedOutput: [[3, 0]], isHidden: true },
      { id: 6, inputs: { head: [[1, -1], [2, -1], [3, -1]] }, expectedOutput: [[1, -1], [2, -1], [3, -1]], isHidden: true },
    ],
    learn: {
      intuition:
        "The difficulty is that a random pointer may target a node you have not created yet. Two passes solve it: create every copy first, then wire the pointers once every target exists.",
      approach: [
        "First pass: create a copy of each node and record the original-to-copy mapping.",
        "Second pass: for each original, set copy.next and copy.random using that mapping.",
        "Walk the copied list building {value, randomIndex} rows, where the index comes from a node-to-position map.",
      ],
      bruteForce: { idea: "For each random target, scan the list for its index.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Two passes with a HashMap, or interleave copies into the original chain for O(1) extra space.", time: "O(n)", space: "O(n) or O(1)" },
      pitfalls: [
        "Copying in one pass fails whenever random points forward to an uncreated node.",
        "A shallow copy that reuses the original nodes is not a deep copy, even though it would print identically.",
        "The interleaving trick — weaving copies between originals, then splitting — removes the map entirely and is worth learning.",
      ],
      javaToolkit: ["HashMap<ListNode, ListNode>", "Two-pass construction", "The interleaving trick for O(1) space"],
    },
  },
}
