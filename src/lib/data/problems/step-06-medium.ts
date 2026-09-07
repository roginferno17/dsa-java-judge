import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 6 — Medium linked list problems (18).
 *
 * The slow/fast pointer pair does most of the work in this group: it finds the
 * middle, detects a cycle, locates the cycle's entry, measures the cycle, and
 * reaches the nth node from the end. Learning it once pays for the whole step.
 */
export const step06Medium: Record<string, ProblemMetadata> = {
  "middle-linked-list": {
    slug: "middle-linked-list",
    title: "Middle of a Linked List",
    description:
      "Return the middle node. With an even number of nodes there are two middles, and you should return the SECOND one.",
    constraints: ["1 ≤ list length ≤ 10^5"],
    className: "Solution",
    methodName: "middleNode",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode middleNode(ListNode head) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4, 5] }, expectedOutput: [3, 4, 5], explanation: "Returning a node means the judge sees it and everything after it." },
      { id: 2, inputs: { head: [1, 2, 3, 4, 5, 6] }, expectedOutput: [4, 5, 6], explanation: "Even length, so the second middle." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { head: [1, 2] }, expectedOutput: [2], isHidden: true },
      { id: 5, inputs: { head: [1, 2, 3] }, expectedOutput: [2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Send one pointer twice as fast as the other. When the fast one reaches the end, the slow one is exactly halfway — one pass instead of counting first and walking again.",
      approach: [
        "Start slow and fast at the head.",
        "While fast and fast.next are both non-null, advance slow by one and fast by two.",
        "Return slow.",
      ],
      bruteForce: { idea: "Count the nodes, then walk to n / 2.", time: "O(n) but two passes", space: "O(1)" },
      optimal: { idea: "Tortoise and hare.", time: "O(n) in one pass", space: "O(1)" },
      pitfalls: [
        "Checking fast != null alone throws when fast.next is null; you need both.",
        "The loop condition decides which middle you land on for even lengths — this problem wants the second.",
        "Returning a node returns the whole tail from it, which is what the expected output shows.",
      ],
      javaToolkit: ["Slow and fast pointers", "while (fast != null && fast.next != null)"],
    },
  },

  "reverse-ll-iterative": {
    slug: "reverse-ll-iterative",
    title: "Reverse a Linked List (Iterative)",
    description: "Reverse the list and return the new head, using a loop.",
    constraints: ["0 ≤ list length ≤ 5000"],
    className: "Solution",
    methodName: "reverseList",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode reverseList(ListNode head) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4, 5] }, expectedOutput: [5, 4, 3, 2, 1] },
      { id: 2, inputs: { head: [1, 2] }, expectedOutput: [2, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { head: [1, 1, 2] }, expectedOutput: [2, 1, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Flip each node's next to point backwards. The only difficulty is that flipping destroys the link you were about to follow, so you must save it first.",
      approach: [
        "Keep prev = null and cur = head.",
        "Each step: save cur.next, point cur.next at prev, move prev to cur and cur to the saved node.",
        "Return prev when cur becomes null.",
      ],
      optimal: { idea: "Three-pointer iterative reversal.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Reassigning cur.next before saving the successor strands the rest of the list.",
        "Returning head returns the tail of the reversed list; return prev.",
        "An empty list returns null, which the loop handles without a special case.",
      ],
      javaToolkit: ["prev / cur / next triple", "Saving before overwriting"],
    },
  },

  "reverse-ll-recursive": {
    slug: "reverse-ll-recursive",
    title: "Reverse a Linked List (Recursive)",
    description: "Reverse the list and return the new head, using recursion rather than a loop.",
    constraints: ["0 ≤ list length ≤ 5000"],
    className: "Solution",
    methodName: "reverseList",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode reverseList(ListNode head) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3] }, expectedOutput: [3, 2, 1] },
      { id: 2, inputs: { head: [1, 2] }, expectedOutput: [2, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [7] }, expectedOutput: [7], isHidden: true },
      { id: 5, inputs: { head: [1, 2, 3, 4] }, expectedOutput: [4, 3, 2, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Assume the rest of the list is already reversed. Then the only thing left to fix is the link between the head and the node after it — make that node point back at the head, and cut the head's own next.",
      approach: [
        "Base case: an empty list or a single node is already reversed.",
        "Recurse on head.next and keep the returned new head.",
        "Set head.next.next = head, then head.next = null.",
        "Return the new head unchanged all the way up.",
      ],
      bruteForce: { idea: "The iterative version.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Recursive reversal, fixing one link per frame.", time: "O(n)", space: "O(n) call stack" },
      pitfalls: [
        "Forgetting head.next = null leaves a two-node cycle at the end of the list.",
        "Returning head rather than the recursively obtained new head returns the wrong node.",
        "Recursion depth equals the list length, so the iterative version is safer for very long lists.",
      ],
      javaToolkit: ["Recursion returning an unchanged value up the stack", "head.next.next = head"],
    },
  },

  "detect-loop-ll": {
    slug: "detect-loop-ll",
    title: "Detect a Loop in a Linked List",
    description:
      "Return whether the list contains a cycle. The input is given as [[values], pos], where pos is the index the tail links back to, or -1 for no cycle.",
    constraints: ["0 ≤ list length ≤ 10^4", "-1 ≤ pos < list length"],
    className: "Solution",
    methodName: "hasCycle",
    parameters: [{ name: "head", type: "ListNodeCyclic" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean hasCycle(ListNode head) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [[3, 2, 0, -4], 1] }, expectedOutput: true, explanation: "The tail links back to index 1, so the list loops." },
      { id: 2, inputs: { head: [[1, 2], -1] }, expectedOutput: false, explanation: "-1 means the tail ends normally." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [[1], 0] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { head: [[1], -1] }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { head: [[1, 2], 0] }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { head: [[], -1] }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "On a circular track a faster runner eventually laps a slower one. If the list loops, a pointer moving two steps closes the gap on one moving a single step by exactly one node per iteration, so they must meet.",
      approach: [
        "Start slow and fast at the head.",
        "Advance slow by one and fast by two.",
        "If they ever hold the same node, there is a cycle; if fast reaches null, there is not.",
      ],
      bruteForce: { idea: "Store visited nodes in a HashSet.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Floyd's tortoise and hare.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Comparing values rather than node identity reports a false cycle on repeated values — compare with ==, not equals.",
        "A single node pointing at itself is a cycle, which is a hidden case here.",
        "The pointers must be compared AFTER moving, not before, or they match immediately at the head.",
      ],
      javaToolkit: ["Floyd's cycle detection", "Reference comparison with ==", "HashSet as the O(n)-space fallback"],
    },
  },

  "starting-point-loop": {
    slug: "starting-point-loop",
    title: "Find the Starting Point of a Loop",
    description:
      "Return the value of the node where the cycle begins, or -1 if there is no cycle. Input is [[values], pos].",
    constraints: ["0 ≤ list length ≤ 10^4", "Node values are distinct"],
    className: "Solution",
    methodName: "detectCycleStart",
    parameters: [{ name: "head", type: "ListNodeCyclic" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int detectCycleStart(ListNode head) {
        // Return the value at the cycle's entry, or -1.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [[3, 2, 0, -4], 1] }, expectedOutput: 2, explanation: "The cycle starts at index 1, whose value is 2." },
      { id: 2, inputs: { head: [[1, 2], -1] }, expectedOutput: -1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [[1], 0] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { head: [[5, 6, 7], 0] }, expectedOutput: 5, isHidden: true },
      { id: 5, inputs: { head: [[1, 2, 3], 2] }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { head: [[], -1] }, expectedOutput: -1, isHidden: true },
    ],
    learn: {
      intuition:
        "Once the two pointers meet, the distance from the head to the cycle entry equals the distance from the meeting point to that entry, going forward. So resetting one pointer to the head and advancing both at the same speed makes them meet exactly at the entry.",
      approach: [
        "Detect the cycle with Floyd's and note the meeting node.",
        "Return -1 if no meeting happened.",
        "Move one pointer back to the head, then advance both one step at a time.",
        "They meet at the cycle's first node.",
      ],
      bruteForce: { idea: "HashSet of visited nodes; the first repeat is the entry.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Floyd's, then walk both pointers at equal speed.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Advancing the reset pointer at double speed breaks the equal-distance argument.",
        "A cycle starting at index 0 means the entry is the head itself.",
        "Detect first, then find the entry — the meeting point is almost never the entry.",
      ],
      javaToolkit: ["Floyd's phase two", "The equal-distance property", "Resetting one pointer to the head"],
    },
  },

  "length-loop-ll": {
    slug: "length-loop-ll",
    title: "Length of the Loop in a Linked List",
    description: "Return the number of nodes in the cycle, or 0 if there is no cycle. Input is [[values], pos].",
    constraints: ["0 ≤ list length ≤ 10^4"],
    className: "Solution",
    methodName: "loopLength",
    parameters: [{ name: "head", type: "ListNodeCyclic" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int loopLength(ListNode head) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [[1, 2, 3, 4, 5], 1] }, expectedOutput: 4, explanation: "Nodes 2, 3, 4 and 5 form the loop." },
      { id: 2, inputs: { head: [[1, 2], -1] }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [[1], 0] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { head: [[1, 2, 3], 0] }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { head: [[1, 2, 3], 2] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { head: [[], -1] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "The meeting point is guaranteed to be inside the cycle, so walking forward from it until you return to it counts the cycle exactly once. No need to find the entry first.",
      approach: [
        "Run Floyd's until the pointers meet, or return 0 if they never do.",
        "From the meeting node, walk forward counting until you reach it again.",
      ],
      bruteForce: { idea: "HashMap from node to visit index; the difference gives the length.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Count a full lap from the meeting point.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Start the count at 1 for the meeting node itself, or you are one short.",
        "A self-loop has length 1.",
        "You do not need the cycle's entry for this — a common overcomplication.",
      ],
      javaToolkit: ["Floyd's meeting point", "Counting a lap", "do-while for count-at-least-one"],
    },
  },

  "palindrome-ll": {
    slug: "palindrome-ll",
    title: "Check if a Linked List Is a Palindrome",
    description: "Return whether the list reads the same forwards and backwards.",
    constraints: ["1 ≤ list length ≤ 10^5"],
    className: "Solution",
    methodName: "isPalindrome",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isPalindrome(ListNode head) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 2, 1] }, expectedOutput: true },
      { id: 2, inputs: { head: [1, 2] }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { head: [1, 2, 1] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { head: [1, 1, 2, 1] }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { head: [1, 2, 3, 2, 1] }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "You cannot walk backwards, so make the second half walk forwards instead: find the middle, reverse the back half, then compare the two halves in step.",
      approach: [
        "Find the middle with slow and fast pointers.",
        "Reverse the list from the middle onwards.",
        "Walk the original head and the reversed half together, comparing values.",
        "Stop when the reversed half runs out, which handles odd lengths naturally.",
      ],
      bruteForce: { idea: "Copy the values into an ArrayList and use two pointers.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Reverse the second half in place, then compare.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Comparing until BOTH halves end fails on odd lengths; stop when the shorter one does.",
        "The middle node belongs to neither half for odd lengths and can be ignored.",
        "This mutates the input; restoring it afterwards is polite if the caller reuses the list.",
      ],
      javaToolkit: ["Find middle then reverse", "Comparing two halves", "Composing earlier problems"],
    },
  },

  "segregate-odd-even": {
    slug: "segregate-odd-even",
    title: "Segregate Odd and Even Nodes",
    description:
      "Group the nodes at odd POSITIONS first, then those at even positions, keeping their relative order. Positions count from 1, so the head is odd.",
    constraints: ["0 ≤ list length ≤ 10^4"],
    className: "Solution",
    methodName: "oddEvenList",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode oddEvenList(ListNode head) {
        // Group by POSITION, not by value.
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4, 5] }, expectedOutput: [1, 3, 5, 2, 4], explanation: "Positions 1, 3, 5 come first, then 2 and 4." },
      { id: 2, inputs: { head: [2, 1, 3, 5, 6, 4, 7] }, expectedOutput: [2, 3, 6, 7, 1, 5, 4] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { head: [1, 2] }, expectedOutput: [1, 2], isHidden: true },
      { id: 6, inputs: { head: [1, 2, 3] }, expectedOutput: [1, 3, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Build two chains at once as you walk, then join them. Because you always append to the end of each chain, the relative order is preserved for free.",
      approach: [
        "Keep an odd cursor at the head and an even cursor at head.next, remembering the even head.",
        "Repeatedly link odd.next = even.next and advance, then even.next = odd.next and advance.",
        "Finally join the odd tail to the saved even head.",
      ],
      optimal: { idea: "Weave two chains in one pass.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "This groups by POSITION, not by whether the value is odd — the second sample makes that unmistakable.",
        "Losing the even head before the join leaves you unable to reattach it.",
        "Lists of length 0, 1 and 2 need no work at all.",
      ],
      javaToolkit: ["Two interleaved cursors", "Saving a head before rewiring", "Position-based grouping"],
    },
  },

  "remove-nth-back": {
    slug: "remove-nth-back",
    title: "Remove the Nth Node From the End",
    description: "Remove the nth node counting from the end and return the head. n is always valid.",
    constraints: ["1 ≤ list length ≤ 30", "1 ≤ n ≤ list length"],
    className: "Solution",
    methodName: "removeNthFromEnd",
    parameters: [
      { name: "head", type: "ListNode" },
      { name: "n", type: "int" },
    ],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 4, 5], n: 2 }, expectedOutput: [1, 2, 3, 5], explanation: "The second from the end is 4." },
      { id: 2, inputs: { head: [1], n: 1 }, expectedOutput: [], explanation: "Removing the only node empties the list." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1, 2], n: 1 }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { head: [1, 2], n: 2 }, expectedOutput: [2], isHidden: true },
      { id: 5, inputs: { head: [1, 2, 3], n: 3 }, expectedOutput: [2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Give one pointer an n-node head start. When the leader reaches the end, the follower is exactly n from the end — so a fixed gap converts a backwards question into a forwards one.",
      approach: [
        "Dummy node in front of the head so removing the head needs no special case.",
        "Advance a fast pointer n + 1 steps from the dummy.",
        "Advance both until fast is null; slow now sits just before the target.",
        "Relink past it and return dummy.next.",
      ],
      bruteForce: { idea: "Count the length, then walk to length - n.", time: "O(n) in two passes", space: "O(1)" },
      optimal: { idea: "Two pointers with a fixed gap, one pass.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Removing the head is the case that breaks naive solutions; the dummy handles it.",
        "Advancing fast by n instead of n + 1 leaves slow on the target rather than before it.",
        "Removing the only node must give an empty list.",
      ],
      javaToolkit: ["Fixed-gap two pointers", "Dummy node", "One-pass from-the-end indexing"],
    },
  },

  "delete-middle-node": {
    slug: "delete-middle-node",
    title: "Delete the Middle Node",
    description:
      "Delete the middle node and return the head. With an even number of nodes, delete the second of the two middles. A single-node list becomes empty.",
    constraints: ["1 ≤ list length ≤ 10^5"],
    className: "Solution",
    methodName: "deleteMiddle",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode deleteMiddle(ListNode head) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 3, 4, 7, 1, 2, 6] }, expectedOutput: [1, 3, 4, 1, 2, 6], explanation: "7 sits in the middle of seven nodes." },
      { id: 2, inputs: { head: [1, 2, 3, 4] }, expectedOutput: [1, 2, 4], explanation: "Even length, so the second middle (3) goes." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [1, 2] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { head: [1, 2, 3] }, expectedOutput: [1, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Finding the middle is the easy half; deleting it needs its PREDECESSOR. Track one node behind the slow pointer as you go.",
      approach: [
        "Handle the single-node case by returning null.",
        "Run slow and fast, keeping a prev pointer one behind slow.",
        "When fast finishes, link prev past slow.",
      ],
      optimal: { idea: "Tortoise and hare with a trailing pointer.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Finding the middle without tracking prev leaves you unable to unlink it.",
        "A single node has no predecessor, so return null directly.",
        "Which middle goes for even lengths depends on where the loop starts — this problem wants the second.",
      ],
      javaToolkit: ["Slow, fast and prev", "Deleting via the predecessor"],
    },
  },

  "sort-linked-list": {
    slug: "sort-linked-list",
    title: "Sort a Linked List",
    description: "Sort the list ascending and return the new head. Aim for O(n log n) time and constant extra space.",
    constraints: ["0 ≤ list length ≤ 5 × 10^4", "-10^5 ≤ values ≤ 10^5"],
    className: "Solution",
    methodName: "sortList",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode sortList(ListNode head) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [4, 2, 1, 3] }, expectedOutput: [1, 2, 3, 4] },
      { id: 2, inputs: { head: [-1, 5, 3, 4, 0] }, expectedOutput: [-1, 0, 3, 4, 5] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { head: [2, 1] }, expectedOutput: [1, 2], isHidden: true },
      { id: 6, inputs: { head: [3, 3, 3] }, expectedOutput: [3, 3, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Merge sort suits linked lists far better than arrays: merging needs only pointer rewiring, so the O(n) auxiliary array that merge sort normally needs disappears entirely. Quicksort, by contrast, needs random access it cannot have.",
      approach: [
        "Split the list in half using slow and fast pointers, cutting the link at the middle.",
        "Sort each half recursively.",
        "Merge the two sorted halves by relinking nodes, using a dummy to simplify the head.",
      ],
      bruteForce: { idea: "Copy values to an array, sort, write back.", time: "O(n log n)", space: "O(n)" },
      optimal: { idea: "Merge sort with in-place relinking.", time: "O(n log n)", space: "O(log n) call stack" },
      pitfalls: [
        "Forgetting to sever the link at the split point makes the recursion never terminate.",
        "The split must give each half at least one node, or a two-element list recurses forever.",
        "Take from the left half on ties to keep the sort stable.",
      ],
      javaToolkit: ["Merge sort on lists", "Splitting with slow and fast", "Merging by relinking"],
    },
  },

  "sort-012-ll": {
    slug: "sort-012-ll",
    title: "Sort a Linked List of 0s, 1s and 2s",
    description:
      "Every value is 0, 1 or 2. Sort the list by changing the LINKS rather than the values, and return the head.",
    constraints: ["0 ≤ list length ≤ 10^5", "Values are 0, 1 or 2"],
    className: "Solution",
    methodName: "sortZeroOneTwo",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode sortZeroOneTwo(ListNode head) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 2, 1, 0, 2, 0] }, expectedOutput: [0, 0, 1, 1, 2, 2, 2] },
      { id: 2, inputs: { head: [2, 0, 1] }, expectedOutput: [0, 1, 2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [0] }, expectedOutput: [0], isHidden: true },
      { id: 5, inputs: { head: [2, 2, 2] }, expectedOutput: [2, 2, 2], isHidden: true },
      { id: 6, inputs: { head: [1, 0] }, expectedOutput: [0, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "With only three possible values you do not need comparisons at all. Deal each node onto one of three chains, then concatenate — the linked-list answer to the Dutch National Flag problem.",
      approach: [
        "Create three dummy heads for zeros, ones and twos.",
        "Walk the list appending each node to the matching chain.",
        "Join the three chains, skipping any that are empty, and terminate the last one with null.",
      ],
      bruteForce: { idea: "Count each value, then overwrite the node values.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Three chains, then concatenate.", time: "O(n) in one pass", space: "O(1)" },
      pitfalls: [
        "Forgetting to null-terminate the final chain leaves a cycle back into the original list.",
        "Counting and overwriting values is easier but the problem explicitly asks you to relink.",
        "An empty middle chain must be skipped, not joined blindly.",
      ],
      javaToolkit: ["Three dummy heads", "Chain concatenation", "Null-terminating the tail"],
    },
  },

  "intersection-y-ll": {
    slug: "intersection-y-ll",
    title: "Find the Intersection Point of Two Linked Lists",
    description:
      "Two lists share a common suffix. Return the value at the first shared node, or -1 if they never meet. Input is the two lists plus the length of the shared suffix, which the judge uses to build them.",
    constraints: ["0 ≤ lengths ≤ 10^4"],
    className: "Solution",
    methodName: "getIntersectionValue",
    parameters: [
      { name: "a", type: "int[]" },
      { name: "b", type: "int[]" },
      { name: "common", type: "int[]" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int getIntersectionValue(int[] a, int[] b, int[] common) {
        // Build both lists sharing the same 'common' tail nodes, then find
        // where they meet. Return -1 when common is empty.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: [4, 1], b: [5, 6, 1], common: [8, 4, 5] }, expectedOutput: 8, explanation: "Both lists join at the node holding 8." },
      { id: 2, inputs: { a: [1, 2], b: [3], common: [] }, expectedOutput: -1, explanation: "No shared suffix." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: [], b: [], common: [7] }, expectedOutput: 7, isHidden: true },
      { id: 4, inputs: { a: [1], b: [], common: [2, 3] }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { a: [], b: [1, 2, 3], common: [9] }, expectedOutput: 9, isHidden: true },
      { id: 6, inputs: { a: [1], b: [2], common: [] }, expectedOutput: -1, isHidden: true },
    ],
    learn: {
      intuition:
        "Walk both lists, and when one ends jump to the other's head. Both pointers then travel lenA + lenB nodes in total, so they arrive at the junction together regardless of the two prefix lengths.",
      approach: [
        "Build the two lists sharing the same tail node objects.",
        "Start one pointer on each head.",
        "Advance both; whenever one hits null, move it to the OTHER list's head.",
        "They meet at the junction, or both reach null together when there is none.",
      ],
      bruteForce: { idea: "Put every node of one list in a HashSet, then scan the other.", time: "O(n + m)", space: "O(n)" },
      optimal: { idea: "Two pointers that switch lists at the end.", time: "O(n + m)", space: "O(1)" },
      pitfalls: [
        "Comparing values instead of node identity finds a false junction whenever a value repeats.",
        "The switch must happen at null, not at the last node, or the lengths do not balance.",
        "With no shared suffix both pointers become null on the same step, which terminates the loop.",
      ],
      javaToolkit: ["Two-pointer list switching", "Reference equality", "Shared tail construction"],
    },
  },

  "add-one-ll": {
    slug: "add-one-ll",
    title: "Add One to a Number Represented by a Linked List",
    description:
      "The list holds the digits of a number, most significant first. Add one and return the resulting list.",
    constraints: ["1 ≤ list length ≤ 10^5", "Each value is a digit 0-9", "No leading zeros unless the number is 0"],
    className: "Solution",
    methodName: "addOne",
    parameters: [{ name: "head", type: "ListNode" }],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode addOne(ListNode head) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3] }, expectedOutput: [1, 2, 4] },
      { id: 2, inputs: { head: [9, 9, 9] }, expectedOutput: [1, 0, 0, 0], explanation: "The carry propagates all the way and adds a new leading digit." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [0] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { head: [9] }, expectedOutput: [1, 0], isHidden: true },
      { id: 5, inputs: { head: [1, 9, 9] }, expectedOutput: [2, 0, 0], isHidden: true },
      { id: 6, inputs: { head: [8] }, expectedOutput: [9], isHidden: true },
    ],
    learn: {
      intuition:
        "Addition carries from the least significant digit, which is the TAIL here — the wrong end to start from. Reversing the list puts the carry at the front, and reversing back restores the order.",
      approach: [
        "Reverse the list.",
        "Walk it adding the carry, starting at 1, and writing each digit modulo 10.",
        "If a carry survives the walk, append a new node.",
        "Reverse back and return.",
      ],
      bruteForce: { idea: "Recurse to the tail and carry back up the call stack.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Reverse, add, reverse back.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "All nines needs an extra leading digit — the answer is longer than the input.",
        "Stopping as soon as a digit is below 9 works but only after you have reversed; from the head it is wrong.",
        "The recursive version is elegant but uses O(n) stack on a 10^5 list.",
      ],
      javaToolkit: ["Reverse-operate-reverse", "Carry propagation", "Appending a leading digit"],
    },
  },

  "add-two-numbers-ll": {
    slug: "add-two-numbers-ll",
    title: "Add Two Numbers in Linked Lists",
    description:
      "Both lists hold digits in REVERSE order, least significant first. Add the numbers and return the sum in the same reversed form.",
    constraints: ["1 ≤ list lengths ≤ 100", "Each value is a digit 0-9"],
    className: "Solution",
    methodName: "addTwoNumbers",
    parameters: [
      { name: "l1", type: "ListNode" },
      { name: "l2", type: "ListNode" },
    ],
    returnType: "ListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Digits are least-significant first, which is convenient here.
        return null;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { l1: [2, 4, 3], l2: [5, 6, 4] }, expectedOutput: [7, 0, 8], explanation: "342 + 465 = 807, written backwards." },
      { id: 2, inputs: { l1: [9, 9], l2: [1] }, expectedOutput: [0, 0, 1], explanation: "99 + 1 = 100." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { l1: [0], l2: [0] }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { l1: [5], l2: [5] }, expectedOutput: [0, 1], isHidden: true },
      { id: 5, inputs: { l1: [1, 2, 3], l2: [9] }, expectedOutput: [0, 3, 3], isHidden: true },
      { id: 6, inputs: { l1: [9, 9, 9], l2: [9, 9, 9] }, expectedOutput: [8, 9, 9, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "The reversed storage is a gift: the heads are the least significant digits, so you add left to right exactly as you would on paper, carrying forward.",
      approach: [
        "Dummy head, cursor, and a carry starting at 0.",
        "While either list remains or a carry is pending, sum the available digits plus the carry.",
        "Append sum % 10 and set carry to sum / 10.",
        "Return dummy.next.",
      ],
      optimal: { idea: "Single pass with carry propagation.", time: "O(max(n, m))", space: "O(max(n, m))" },
      pitfalls: [
        "Stopping when both lists end drops a final carry — 5 + 5 must produce two nodes.",
        "The lists can differ in length, so treat a missing digit as 0 rather than stopping.",
        "Converting to numbers and back overflows for 100-digit inputs.",
      ],
      javaToolkit: ["Carry loop condition including the carry", "Dummy head", "Treating a missing digit as 0"],
    },
  },

  "delete-key-dll": {
    slug: "delete-key-dll",
    title: "Delete All Occurrences of a Key in a Doubly Linked List",
    description: "Remove every node holding the given key and return the head, keeping prev and next correct.",
    constraints: ["0 ≤ list length ≤ 10^5"],
    className: "Solution",
    methodName: "deleteAllOccurrences",
    parameters: [
      { name: "head", type: "DoublyListNode" },
      { name: "key", type: "int" },
    ],
    returnType: "DoublyListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public DoublyListNode deleteAllOccurrences(DoublyListNode head, int key) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 3, 2, 4], key: 2 }, expectedOutput: [1, 3, 4] },
      { id: 2, inputs: { head: [2, 2, 2], key: 2 }, expectedOutput: [], explanation: "Every node matches, so the list empties." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1, 2, 3], key: 9 }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 4, inputs: { head: [], key: 1 }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { head: [2, 1], key: 2 }, expectedOutput: [1], isHidden: true },
      { id: 6, inputs: { head: [1, 2], key: 2 }, expectedOutput: [1], isHidden: true },
    ],
    learn: {
      intuition:
        "One pass, relinking around each match. The head is the awkward case, because deleting it changes what you must return — so capture the successor before unlinking.",
      approach: [
        "Walk the list holding the current node.",
        "On a match, link prev and next to each other, guarding for null at either end, and move the head if it was the head.",
        "Advance using a saved reference to the successor.",
      ],
      optimal: { idea: "Single pass relinking around matches.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Advancing via cur.next AFTER unlinking reads a pointer you just changed; save it first.",
        "Consecutive matches at the head each move the head again.",
        "Deleting every node must return null.",
      ],
      javaToolkit: ["Saving the successor before unlinking", "Head reassignment", "Null guards at both ends"],
    },
  },

  "pairs-sum-dll": {
    slug: "pairs-sum-dll",
    title: "Find Pairs With a Given Sum in a Sorted Doubly Linked List",
    description:
      "The list is sorted ascending. Return every pair summing to the target, each pair as {smaller, larger}, ordered by the smaller value ascending.",
    constraints: ["0 ≤ list length ≤ 10^4", "The list is sorted ascending"],
    className: "Solution",
    methodName: "findPairs",
    parameters: [
      { name: "head", type: "DoublyListNode" },
      { name: "target", type: "int" },
    ],
    returnType: "int[][]",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `class Solution {
    public int[][] findPairs(DoublyListNode head, int target) {
        return new int[0][0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 2, 4, 5, 6, 8, 9], target: 7 }, expectedOutput: [[1, 6], [2, 5]] },
      { id: 2, inputs: { head: [1, 2, 3], target: 100 }, expectedOutput: [], explanation: "No pair reaches the target." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [1, 2], target: 3 }, expectedOutput: [[1, 2]], isHidden: true },
      { id: 4, inputs: { head: [], target: 1 }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { head: [5], target: 10 }, expectedOutput: [], isHidden: true },
      { id: 6, inputs: { head: [1, 1, 2, 2], target: 3 }, expectedOutput: [[1, 2], [1, 2]], isHidden: true },
    ],
    learn: {
      intuition:
        "The backward link makes a two-pointer sweep possible on a list, which it would not be on a singly linked one. Start at both ends and close in exactly as you would on a sorted array.",
      approach: [
        "Walk to the tail using next.",
        "With one pointer at the head and one at the tail, compare their sum with the target.",
        "Too small means advance the left pointer; too large means retreat the right one via prev.",
        "On a match, record the pair and move both inwards.",
      ],
      bruteForce: { idea: "Check every pair.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Two pointers from both ends, using prev.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "The loop must stop when the pointers meet or cross, or an element pairs with itself.",
        "Duplicate values legitimately produce duplicate pairs here — one hidden case relies on it.",
        "This is only possible because prev exists; a singly linked list would need the values copied out.",
      ],
      javaToolkit: ["Two pointers using prev", "Walking to the tail first", "Sorted-list pair finding"],
    },
  },

  "remove-duplicates-dll": {
    slug: "remove-duplicates-dll",
    title: "Remove Duplicates From a Sorted Doubly Linked List",
    description: "The list is sorted ascending. Keep one node per distinct value and return the head.",
    constraints: ["0 ≤ list length ≤ 10^5", "The list is sorted ascending"],
    className: "Solution",
    methodName: "removeDuplicates",
    parameters: [{ name: "head", type: "DoublyListNode" }],
    returnType: "DoublyListNode",
    comparison: { type: "linked_list" },
    starterCode: `class Solution {
    public DoublyListNode removeDuplicates(DoublyListNode head) {
        return head;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { head: [1, 1, 1, 2, 3, 4] }, expectedOutput: [1, 2, 3, 4] },
      { id: 2, inputs: { head: [1, 1, 2, 2, 3] }, expectedOutput: [1, 2, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { head: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { head: [1, 1, 1] }, expectedOutput: [1], isHidden: true },
      { id: 5, inputs: { head: [1, 2, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 6, inputs: { head: [-1, -1, 0] }, expectedOutput: [-1, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "Because the list is sorted, duplicates are always adjacent. Hold a node and skip forward past every equal successor, then relink once.",
      approach: [
        "Walk the list with a cursor.",
        "From each node, advance a scout past every node holding the same value.",
        "Link the cursor to the scout in both directions, then move to the scout.",
      ],
      optimal: { idea: "Skip runs of equal values, relinking once per run.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Updating next without prev leaves the backward chain pointing at removed nodes.",
        "The final node's next must stay null.",
        "This relies on sortedness; unsorted input would need a HashSet.",
      ],
      javaToolkit: ["Skipping runs", "Bidirectional relinking", "Adjacent-duplicate removal"],
    },
  },
}
