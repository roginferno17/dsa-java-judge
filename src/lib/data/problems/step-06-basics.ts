import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 6 — Singly and doubly linked list basics (9 problems).
 *
 * The judge hands you a real ListNode or DoublyListNode built from the input
 * array, and reads back whatever list you return. Nothing here needs you to
 * define the node class yourself, so the exercise is purely pointer handling.
 */
export const step06Basics: Record<string, ProblemMetadata> = {
  "intro-linked-list": {
    slug: "intro-linked-list",
    title: "Introduction to Linked Lists",
    description:
      "Build a linked list from the given values and return it. The judge already hands you a ListNode with a val and a next, so this is about seeing the structure rather than defining it: walk an array, chain the nodes, return the head.",
    constraints: ["0 ≤ values.length ≤ 10^4"],
    className: "Solution",
    methodName: "build",
    parameters: [{ name: "values", type: "int[]" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode build(int[] values) {
        // ListNode has: int val; ListNode next;
        // Return the head, or null for an empty array.
        return null;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { values: [1, 2, 3, 4] }, expectedOutput: [1, 2, 3, 4], explanation: "Four nodes chained head to tail." },
      { id: 2, inputs: { values: [7] }, expectedOutput: [7] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { values: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { values: [1, 1, 1] }, expectedOutput: [1, 1, 1], isHidden: true },
      { id: 5, inputs: { values: [-5, 0, 5] }, expectedOutput: [-5, 0, 5], isHidden: true },
    ],
    learn: {
      intuition:
        "A linked list is nodes holding a value and a reference to the next one. Unlike an array there is no indexing — you reach the fifth element only by walking through four others — but inserting in the middle costs nothing once you are there.",
      approach: [
        "Use a dummy node so you never special-case the head.",
        "Walk the array creating a node per value and appending it.",
        "Return dummy.next, which is null automatically for an empty input.",
      ],
      optimal: { idea: "One pass building the chain.", time: "O(n)", space: "O(n) for the nodes" },
      pitfalls: [
        "Returning the tail instead of the head — you must keep a reference to the first node.",
        "An empty array must return null, which the dummy pattern gives you for free.",
        "Forgetting to advance the cursor leaves every node pointing at the same successor.",
      ],
      javaToolkit: ["Dummy node pattern", "ListNode.val and ListNode.next", "Keeping head and cursor separate"],
    },
  },

  "insert-node-ll": {
    slug: "insert-node-ll",
    title: "Insert a Node in a Linked List",
    description:
      "Insert a new node holding value at index position, counting from 0, and return the head. If position is 0 the node becomes the new head; if it is at or past the length, append at the end.",
    constraints: ["0 ≤ list length ≤ 10^4", "0 ≤ position ≤ 10^4"],
    className: "Solution",
    methodName: "insert",
    parameters: [
      { name: "head", type: "ListNode" },
      { name: "position", type: "int" },
      { name: "value", type: "int" },
    ],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode insert(ListNode head, int position, int value) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 4], position: 2, value: 3 }, expectedOutput: [1, 2, 3, 4], explanation: "The new node lands at index 2, pushing 4 along." },
      { id: 2, inputs: { head: [2, 3], position: 0, value: 1 }, expectedOutput: [1, 2, 3], explanation: "Position 0 makes it the new head." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [], position: 0, value: 5 }, expectedOutput: [5], isHidden: true },
      { id: 4, inputs: { head: [1], position: 5, value: 9 }, expectedOutput: [1, 9], isHidden: true },
      { id: 5, inputs: { head: [1, 2], position: 2, value: 3 }, expectedOutput: [1, 2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "To insert at index i you must be holding the node at i - 1, because you can only change a link you can reach. Inserting at the head has no predecessor, which is exactly what a dummy node solves.",
      approach: [
        "Create a dummy whose next is the head.",
        "Walk forward position steps from the dummy, stopping early if the list ends.",
        "Splice the new node in between the cursor and its successor.",
        "Return dummy.next.",
      ],
      optimal: { idea: "Dummy node plus a walk to the predecessor.", time: "O(position)", space: "O(1)" },
      pitfalls: [
        "Special-casing position 0 works but is exactly what the dummy removes.",
        "Setting the new node's next AFTER rewiring the predecessor loses the rest of the list — order matters.",
        "Walking past the end throws; stop when the cursor's next is null.",
      ],
      javaToolkit: ["Dummy node", "Splicing: node.next = cur.next; cur.next = node", "Bounded traversal"],
    },
  },

  "delete-node-ll": {
    slug: "delete-node-ll",
    title: "Delete a Node in a Linked List",
    description:
      "Delete the node at index position, counting from 0, and return the head. If position is out of range, return the list unchanged.",
    constraints: ["0 ≤ list length ≤ 10^4", "0 ≤ position ≤ 10^4"],
    className: "Solution",
    methodName: "deleteAt",
    parameters: [
      { name: "head", type: "ListNode" },
      { name: "position", type: "int" },
    ],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode deleteAt(ListNode head, int position) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4], position: 1 }, expectedOutput: [1, 3, 4] },
      { id: 2, inputs: { head: [1, 2, 3], position: 0 }, expectedOutput: [2, 3], explanation: "Deleting the head returns the second node." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1], position: 0 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [1, 2], position: 5 }, expectedOutput: [1, 2], isHidden: true },
      { id: 5, inputs: { head: [], position: 0 }, expectedOutput: [], isHidden: true },
      { id: 6, inputs: { head: [1, 2, 3], position: 2 }, expectedOutput: [1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Deletion means making the predecessor skip over the target. As with insertion, the head has no predecessor, and a dummy node supplies one.",
      approach: [
        "Dummy whose next is the head.",
        "Walk position steps to reach the predecessor.",
        "If the successor exists, point past it.",
        "Return dummy.next.",
      ],
      optimal: {
        idea: "The same dummy-node walk as insertion, but relinking past a node rather than into a gap.",
        time: "O(position)",
        space: "O(1)",
      },
      pitfalls: [
        "Deleting the only node must yield an empty list, which the judge shows as [].",
        "An out-of-range position must leave the list untouched rather than throwing.",
        "Java garbage-collects the orphaned node; there is nothing to free by hand.",
      ],
      javaToolkit: ["Dummy node", "cur.next = cur.next.next", "Null guards before dereferencing"],
    },
  },

  "length-linked-list": {
    slug: "length-linked-list",
    title: "Find the Length of a Linked List",
    description: "Return the number of nodes in the list. The traversal pattern here is the basis of nearly every later problem.",
    constraints: ["0 ≤ list length ≤ 10^5"],
    className: "Solution",
    methodName: "length",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int length(ListNode head) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4, 5] }, expectedOutput: 5 },
      { id: 2, inputs: { head: [] }, expectedOutput: 0, explanation: "An empty list has length 0." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { head: [1, 1, 1, 1] }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "A linked list has no length field, so counting means walking. That walk — cursor, loop while non-null, advance — is the shape of almost every list algorithm you will write.",
      approach: ["Start a cursor at the head.", "While it is not null, count and advance.", "Return the count."],
      optimal: { idea: "One traversal.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Looping on cur.next != null undercounts by one and throws on an empty list.",
        "Forgetting to advance the cursor loops forever, which shows up as Time Limit Exceeded.",
      ],
      javaToolkit: ["while (cur != null)", "cur = cur.next", "The standard traversal idiom"],
    },
  },

  "search-element-ll": {
    slug: "search-element-ll",
    title: "Search for an Element in a Linked List",
    description: "Return whether the value appears anywhere in the list.",
    constraints: ["0 ≤ list length ≤ 10^5", "-10^9 ≤ values ≤ 10^9"],
    className: "Solution",
    methodName: "search",
    parameters: [
      { name: "head", type: "ListNode" },
      { name: "key", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean search(ListNode head, int key) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4], key: 3 }, expectedOutput: true },
      { id: 2, inputs: { head: [1, 2, 3], key: 9 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [], key: 1 }, expectedOutput: false, isHidden: true },
      { id: 4, inputs: { head: [5], key: 5 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { head: [-1, -2], key: -2 }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Without indexing there is no binary search to reach for, even if the list were sorted — you cannot jump to the middle. Linear traversal is the only option.",
      approach: ["Walk from the head.", "Return true on a match.", "Return false once the walk ends."],
      optimal: { idea: "Linear traversal with an early return.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "An empty list must return false rather than throwing.",
        "A sorted linked list still cannot be binary searched, because reaching the midpoint costs O(n).",
      ],
      javaToolkit: ["Traversal with early return", "Null-safe loop condition"],
    },
  },

  "intro-dll": {
    slug: "intro-dll",
    title: "Introduction to Doubly Linked Lists",
    description:
      "Build a doubly linked list from the values and return its head, with every prev and next correctly wired. The judge verifies the forward order, and the hidden cases check that prev is genuinely connected by asking you to walk back.",
    constraints: ["0 ≤ values.length ≤ 10^4"],
    className: "Solution",
    methodName: "build",
    parameters: [{ name: "values", type: "int[]" }],
    returnType: "DoublyListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public DoublyListNode build(int[] values) {
        // DoublyListNode has: int val; DoublyListNode next; DoublyListNode prev;
        return null;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { values: [1, 2, 3] }, expectedOutput: [1, 2, 3] },
      { id: 2, inputs: { values: [4] }, expectedOutput: [4], explanation: "A single node has null on both sides." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { values: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { values: [1, 2] }, expectedOutput: [1, 2], isHidden: true },
      { id: 5, inputs: { values: [-1, 0, 1, 2] }, expectedOutput: [-1, 0, 1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "A doubly linked list adds a backward link, which makes deletion O(1) once you hold the node — you no longer need its predecessor, because the node knows it.",
      approach: [
        "Track head and tail.",
        "For each value, create a node; if the list is empty it becomes both, otherwise link it after the tail in both directions.",
        "Return the head.",
      ],
      optimal: { idea: "One pass wiring both directions.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Setting next without prev leaves a list that walks forward but not back.",
        "The head's prev and the tail's next must both stay null.",
        "An empty input returns null.",
      ],
      javaToolkit: ["DoublyListNode.prev and .next", "Tracking head and tail", "Bidirectional wiring"],
    },
  },

  "insert-node-dll": {
    slug: "insert-node-dll",
    title: "Insert a Node in a Doubly Linked List",
    description:
      "Insert a node holding value at index position and return the head, keeping every prev and next correct. Position 0 makes it the new head; a position at or past the length appends.",
    constraints: ["0 ≤ list length ≤ 10^4", "0 ≤ position ≤ 10^4"],
    className: "Solution",
    methodName: "insert",
    parameters: [
      { name: "head", type: "DoublyListNode" },
      { name: "position", type: "int" },
      { name: "value", type: "int" },
    ],
    returnType: "DoublyListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public DoublyListNode insert(DoublyListNode head, int position, int value) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 4], position: 2, value: 3 }, expectedOutput: [1, 2, 3, 4] },
      { id: 2, inputs: { head: [2, 3], position: 0, value: 1 }, expectedOutput: [1, 2, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [], position: 0, value: 7 }, expectedOutput: [7], isHidden: true },
      { id: 4, inputs: { head: [1], position: 9, value: 2 }, expectedOutput: [1, 2], isHidden: true },
      { id: 5, inputs: { head: [1, 2], position: 1, value: 9 }, expectedOutput: [1, 9, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Four links change on a mid-list insert rather than two: the new node's prev and next, and the pointers of the nodes on either side. Getting one of the four wrong usually still looks right walking forwards.",
      approach: [
        "Walk to the node currently at position, or to the tail if the list is shorter.",
        "Wire the new node's prev and next to its neighbours.",
        "Update those neighbours to point back at it, guarding for nulls at the ends.",
        "Return the possibly-new head.",
      ],
      optimal: { idea: "Walk, then rewire four links.", time: "O(position)", space: "O(1)" },
      pitfalls: [
        "Inserting at the head means the old head's prev must be updated and the head reference returned.",
        "Appending at the tail leaves the new node's next as null — do not point it anywhere.",
        "Wiring only next produces a list that reads correctly forwards and is broken backwards.",
      ],
      javaToolkit: ["Four-link rewiring", "Null guards at both ends", "Returning a possibly-new head"],
    },
  },

  "delete-node-dll": {
    slug: "delete-node-dll",
    title: "Delete a Node in a Doubly Linked List",
    description:
      "Delete the node at index position and return the head, keeping prev and next correct. An out-of-range position leaves the list unchanged.",
    constraints: ["0 ≤ list length ≤ 10^4", "0 ≤ position ≤ 10^4"],
    className: "Solution",
    methodName: "deleteAt",
    parameters: [
      { name: "head", type: "DoublyListNode" },
      { name: "position", type: "int" },
    ],
    returnType: "DoublyListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public DoublyListNode deleteAt(DoublyListNode head, int position) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3], position: 1 }, expectedOutput: [1, 3] },
      { id: 2, inputs: { head: [1, 2, 3], position: 0 }, expectedOutput: [2, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1], position: 0 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [1, 2], position: 1 }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { head: [1, 2], position: 7 }, expectedOutput: [1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "This is where the backward link earns its keep. Holding the node is enough — you reach its predecessor through prev instead of walking from the head again.",
      approach: [
        "Walk to the target node, returning unchanged if the position is out of range.",
        "Link its prev and next to each other, guarding for null at either end.",
        "If the deleted node was the head, return its successor.",
      ],
      optimal: { idea: "Relink the neighbours around the target.", time: "O(position)", space: "O(1)" },
      pitfalls: [
        "Deleting the head requires returning the new one; returning the old head leaks the deleted node back in.",
        "Deleting the tail must leave the new tail's next as null.",
        "Deleting the only node yields an empty list.",
      ],
      javaToolkit: ["node.prev.next = node.next", "Null guards at both ends", "Returning a possibly-new head"],
    },
  },

  "reverse-dll": {
    slug: "reverse-dll",
    title: "Reverse a Doubly Linked List",
    description: "Reverse the list and return the new head, with every prev and next correct in the reversed order.",
    constraints: ["0 ≤ list length ≤ 10^5"],
    className: "Solution",
    methodName: "reverse",
    parameters: [{ name: "head", type: "DoublyListNode" }],
    returnType: "DoublyListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public DoublyListNode reverse(DoublyListNode head) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4] }, expectedOutput: [4, 3, 2, 1] },
      { id: 2, inputs: { head: [1, 2] }, expectedOutput: [2, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [5] }, expectedOutput: [5], isHidden: true },
      { id: 5, inputs: { head: [1, 1, 2] }, expectedOutput: [2, 1, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Reversing a doubly linked list is just swapping prev and next at every node. Do that everywhere and the list reads backwards — the old tail becomes the head.",
      approach: [
        "Walk the list, swapping each node's prev and next.",
        "Move forward using the node's NEW prev, which is where next used to point.",
        "The last node you touched is the new head.",
      ],
      bruteForce: { idea: "Collect the values, then rebuild.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Swap prev and next at every node.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "After swapping, next points backwards, so advancing with node.next walks the wrong way.",
        "Returning the original head returns the tail of the reversed list.",
        "An empty list returns null.",
      ],
      javaToolkit: ["Swapping prev and next", "Advancing via the swapped pointer", "Tracking the final node"],
    },
  },
}
