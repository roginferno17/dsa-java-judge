import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 9 — Stack and queue implementation (8).
 *
 * Six of these ask you to design a data structure rather than compute an answer,
 * which a single-method judge cannot express directly. They use the standard
 * operation-log shape instead: you are handed a list of operation names and their
 * arguments, and you return what each call produced — "null" for the ones that
 * return nothing. Build the structure inside the method and drive it from the log.
 */
export const step09Design: Record<string, ProblemMetadata> = {
  "stack-using-arrays": {
    slug: "stack-using-arrays",
    title: "Implement a Stack Using Arrays",
    description:
      "Build a stack backed by an array and replay a log of operations. Supported operations are \"push\" (one argument), \"pop\", \"top\" and \"size\". Return one entry per operation: \"null\" for push, and the value otherwise. On an empty stack, pop and top both give -1.",
    constraints: ["1 ≤ ops.length ≤ 10^4", "-10^9 ≤ pushed value ≤ 10^9", "args[i] matches the operation's arity"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        // Build an array-backed stack here and replay the operation log.
        // "null" for push; the value for pop, top and size.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { ops: ["push", "push", "top", "pop", "size"], args: [[5], [9], [], [], []] },
        expectedOutput: ["null", "null", "9", "9", "1"],
        explanation: "9 was pushed last, so it is on top and pops first, leaving one element.",
      },
      {
        id: 2,
        inputs: { ops: ["pop", "top", "size"], args: [[], [], []] },
        expectedOutput: ["-1", "-1", "0"],
        explanation: "An empty stack answers -1 rather than crashing.",
      },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["push", "pop", "pop"], args: [[1], [], []] }, expectedOutput: ["null", "1", "-1"], isHidden: true },
      { id: 4, inputs: { ops: ["push", "push", "push", "pop", "top"], args: [[1], [2], [3], [], []] }, expectedOutput: ["null", "null", "null", "3", "2"], isHidden: true },
      { id: 5, inputs: { ops: ["size"], args: [[]] }, expectedOutput: ["0"], isHidden: true },
      { id: 6, inputs: { ops: ["push", "push", "pop", "push", "top", "size"], args: [[7], [8], [], [4], [], []] }, expectedOutput: ["null", "null", "8", "null", "4", "2"], isHidden: true },
    ],
    learn: {
      intuition:
        "A stack is an array plus one integer. That integer — the index of the next free slot — is the whole data structure; push writes there and steps forward, pop steps back and reads. Nothing is ever shifted, which is why every operation is O(1).",
      approach: [
        "Keep an array and a top index starting at -1 (or a size starting at 0).",
        "push: increment first, then write.",
        "pop: read, then decrement, after checking the stack is not empty.",
        "top: read without moving. size: return the count directly.",
      ],
      optimal: { idea: "Array plus a top index.", time: "O(1) per operation", space: "O(n)" },
      pitfalls: [
        "Popping an empty stack must be checked; here it returns -1 rather than throwing.",
        "Off-by-one between 'top is the last index' and 'top is the next free slot' — pick one convention and hold it.",
        "A fixed array eventually overflows; grow it (Arrays.copyOf, doubling) or size it from the operation count.",
      ],
      javaToolkit: ["int[] with a top index", "Arrays.copyOf for growth", "ArrayDeque as the real-world choice"],
    },
  },

  "queue-using-arrays": {
    slug: "queue-using-arrays",
    title: "Implement a Queue Using Arrays",
    description:
      "Build a queue backed by an array and replay a log of operations. Supported operations are \"push\" (one argument), \"pop\", \"peek\" and \"size\". Return one entry per operation: \"null\" for push, and the value otherwise. On an empty queue, pop and peek both give -1.",
    constraints: ["1 ≤ ops.length ≤ 10^4", "-10^9 ≤ pushed value ≤ 10^9"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        // First in, first out. Aim for O(1) per operation.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { ops: ["push", "push", "peek", "pop", "size"], args: [[5], [9], [], [], []] },
        expectedOutput: ["null", "null", "5", "5", "1"],
        explanation: "5 arrived first, so it is at the front and leaves first.",
      },
      {
        id: 2,
        inputs: { ops: ["pop", "peek", "size"], args: [[], [], []] },
        expectedOutput: ["-1", "-1", "0"],
      },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["push", "pop", "pop"], args: [[1], [], []] }, expectedOutput: ["null", "1", "-1"], isHidden: true },
      { id: 4, inputs: { ops: ["push", "push", "pop", "push", "peek", "size"], args: [[1], [2], [], [3], [], []] }, expectedOutput: ["null", "null", "1", "null", "2", "2"], isHidden: true },
      { id: 5, inputs: { ops: ["push", "pop", "push", "pop", "size"], args: [[4], [], [6], [], []] }, expectedOutput: ["null", "4", "null", "6", "0"], isHidden: true },
      { id: 6, inputs: { ops: ["size", "peek"], args: [[], []] }, expectedOutput: ["0", "-1"], isHidden: true },
    ],
    learn: {
      intuition:
        "A queue removes from the front, and shifting every element left after each pop would be O(n). Instead move a front index forward and let the array wrap around — the elements never move, only the two indices do.",
      approach: [
        "Keep an array, a front index, and a count.",
        "push: write at (front + count) % capacity and increment the count.",
        "pop: read at front, advance front by one modulo the capacity, decrement the count.",
        "peek reads front without advancing.",
      ],
      bruteForce: { idea: "Shift everything left on each pop.", time: "O(n) per pop", space: "O(n)" },
      optimal: { idea: "Circular buffer with front and count.", time: "O(1) per operation", space: "O(n)" },
      pitfalls: [
        "Tracking front and rear without a count makes full and empty look identical — store the count.",
        "Forgetting the % capacity wrap wastes the front of the array and overflows early.",
        "Emptiness must be checked before every pop and peek.",
      ],
      javaToolkit: ["Circular buffer arithmetic", "% capacity", "ArrayDeque / LinkedList as the real-world choice"],
    },
  },

  "stack-using-ll": {
    slug: "stack-using-ll",
    title: "Implement a Stack Using a Linked List",
    description:
      "Build a stack backed by a singly linked list and replay a log of operations: \"push\" (one argument), \"pop\", \"top\" and \"size\". Return one entry per operation — \"null\" for push, the value otherwise. On an empty stack, pop and top give -1.",
    constraints: ["1 ≤ ops.length ≤ 10^4", "-10^9 ≤ pushed value ≤ 10^9"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        // Use your own node class, not java.util.Stack.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { ops: ["push", "push", "top", "pop", "size"], args: [[2], [3], [], [], []] },
        expectedOutput: ["null", "null", "3", "3", "1"],
      },
      { id: 2, inputs: { ops: ["top", "pop"], args: [[], []] }, expectedOutput: ["-1", "-1"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["push", "pop", "size"], args: [[9], [], []] }, expectedOutput: ["null", "9", "0"], isHidden: true },
      { id: 4, inputs: { ops: ["push", "push", "push", "pop", "pop", "top"], args: [[1], [2], [3], [], [], []] }, expectedOutput: ["null", "null", "null", "3", "2", "1"], isHidden: true },
      { id: 5, inputs: { ops: ["push", "size", "push", "size"], args: [[0], [], [0], []] }, expectedOutput: ["null", "1", "null", "2"], isHidden: true },
      { id: 6, inputs: { ops: ["pop", "push", "top"], args: [[], [-5], []] }, expectedOutput: ["-1", "null", "-5"], isHidden: true },
    ],
    learn: {
      intuition:
        "Inserting at the HEAD of a linked list is O(1) and needs no shifting, and the head is exactly where a stack wants to work. That makes the head the top, and both push and pop become a single pointer reassignment.",
      approach: [
        "Define a node with a value and a next pointer; keep a head reference and a size counter.",
        "push: make a new node whose next is the current head, then move head to it.",
        "pop: read head's value and move head to head.next.",
        "top reads head without moving it.",
      ],
      optimal: { idea: "Head insertion and removal on a singly linked list.", time: "O(1) per operation", space: "O(n)" },
      pitfalls: [
        "Pushing at the TAIL needs a walk or a tail pointer, and popping from the tail on a singly linked list is O(n) — the head is the right end.",
        "Keep the size in a counter; recomputing it by walking makes size O(n).",
        "Every pop and top needs a null head check.",
      ],
      javaToolkit: ["A private static nested Node class", "Head insertion", "Null checks on an empty list"],
    },
  },

  "queue-using-ll": {
    slug: "queue-using-ll",
    title: "Implement a Queue Using a Linked List",
    description:
      "Build a queue backed by a singly linked list and replay a log of operations: \"push\" (one argument), \"pop\", \"peek\" and \"size\". Return one entry per operation — \"null\" for push, the value otherwise. On an empty queue, pop and peek give -1.",
    constraints: ["1 ≤ ops.length ≤ 10^4", "-10^9 ≤ pushed value ≤ 10^9"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        // Keep both ends so every operation stays O(1).
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { ops: ["push", "push", "peek", "pop", "size"], args: [[2], [3], [], [], []] },
        expectedOutput: ["null", "null", "2", "2", "1"],
      },
      { id: 2, inputs: { ops: ["peek", "pop"], args: [[], []] }, expectedOutput: ["-1", "-1"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["push", "pop", "push", "peek"], args: [[1], [], [2], []] }, expectedOutput: ["null", "1", "null", "2"], isHidden: true },
      { id: 4, inputs: { ops: ["push", "push", "pop", "pop", "pop"], args: [[4], [5], [], [], []] }, expectedOutput: ["null", "null", "4", "5", "-1"], isHidden: true },
      { id: 5, inputs: { ops: ["size", "push", "size"], args: [[], [7], []] }, expectedOutput: ["0", "null", "1"], isHidden: true },
      { id: 6, inputs: { ops: ["push", "pop", "peek", "size"], args: [[-3], [], [], []] }, expectedOutput: ["null", "-3", "-1", "0"], isHidden: true },
    ],
    learn: {
      intuition:
        "A queue works at both ends, so a single head pointer is not enough — reaching the tail would mean walking the list. Keeping a tail pointer as well makes both ends O(1): push at the tail, pop from the head.",
      approach: [
        "Keep head, tail and a size counter.",
        "push: link the new node after tail and move tail to it; if the queue was empty, set head too.",
        "pop: read head's value and move head forward; when head becomes null, clear tail as well.",
      ],
      bruteForce: { idea: "Head-only list, walking to the tail on every push.", time: "O(n) per push", space: "O(n)" },
      optimal: { idea: "Head and tail pointers.", time: "O(1) per operation", space: "O(n)" },
      pitfalls: [
        "The classic bug: popping the last element leaves tail dangling at a removed node, so the next push resurrects it. Clear tail when head goes null.",
        "The first push must set both head and tail.",
        "Popping from the tail of a singly linked list is O(n) — that is why push goes there and pop does not.",
      ],
      javaToolkit: ["Head and tail pointers", "Clearing tail on the last pop", "Nested Node class"],
    },
  },

  "stack-using-queue": {
    slug: "stack-using-queue",
    title: "Implement a Stack Using Queues",
    description:
      "Implement last-in-first-out behaviour using only queue operations — add at the back, remove from the front, peek at the front, check emptiness. Replay a log of \"push\" (one argument), \"pop\", \"top\" and \"empty\". Return \"null\" for push, the value for pop and top, and \"true\"/\"false\" for empty. pop and top are only called on a non-empty stack.",
    constraints: ["1 ≤ ops.length ≤ 100", "-10^9 ≤ pushed value ≤ 10^9"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        // Only queue operations: offer, poll, peek, isEmpty.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { ops: ["push", "push", "top", "pop", "empty"], args: [[1], [2], [], [], []] },
        expectedOutput: ["null", "null", "2", "2", "false"],
        explanation: "2 went in last but must come out first — the reversal is the whole exercise.",
      },
      { id: 2, inputs: { ops: ["empty"], args: [[]] }, expectedOutput: ["true"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["push", "pop", "empty"], args: [[5], [], []] }, expectedOutput: ["null", "5", "true"], isHidden: true },
      { id: 4, inputs: { ops: ["push", "push", "push", "pop", "top", "pop", "pop", "empty"], args: [[1], [2], [3], [], [], [], [], []] }, expectedOutput: ["null", "null", "null", "3", "2", "2", "1", "true"], isHidden: true },
      { id: 5, inputs: { ops: ["push", "push", "pop", "push", "top"], args: [[7], [8], [], [9], []] }, expectedOutput: ["null", "null", "8", "null", "9"], isHidden: true },
      { id: 6, inputs: { ops: ["push", "top", "top"], args: [[-1], [], []] }, expectedOutput: ["null", "-1", "-1"], isHidden: true },
    ],
    learn: {
      intuition:
        "A queue hands back its oldest element, a stack its newest — so one of push or pop has to do the reversing. The tidiest choice is to make push expensive: after adding the new element at the back, rotate every OLDER element around behind it, so the newest sits at the front where the queue will hand it back first.",
      approach: [
        "Keep one queue.",
        "push: offer the value, then poll-and-offer the other size - 1 elements so the new one reaches the front.",
        "pop and top then become the queue's own poll and peek.",
      ],
      bruteForce: { idea: "Two queues, moving everything across on each pop.", time: "O(n) per pop", space: "O(n)" },
      optimal: { idea: "One queue, rotating on push.", time: "O(n) push, O(1) pop and top", space: "O(n)" },
      pitfalls: [
        "Capture the size BEFORE the rotation loop; it changes as you go and an unfixed bound loops forever.",
        "Rotate size - 1 elements, not size, or you undo the rotation entirely.",
        "Reaching for Deque's push/pop is cheating — the point is doing it with queue operations only.",
      ],
      javaToolkit: ["Queue<Integer> via LinkedList", "offer / poll / peek", "Rotating a queue"],
    },
  },

  "queue-using-stack": {
    slug: "queue-using-stack",
    title: "Implement a Queue Using Stacks",
    description:
      "Implement first-in-first-out behaviour using only stack operations — push, pop, peek at the top, check emptiness. Replay a log of \"push\" (one argument), \"pop\", \"peek\" and \"empty\". Return \"null\" for push, the value for pop and peek, and \"true\"/\"false\" for empty. pop and peek are only called on a non-empty queue.",
    constraints: ["1 ≤ ops.length ≤ 100", "-10^9 ≤ pushed value ≤ 10^9"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        // Two stacks. Aim for amortised O(1).
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { ops: ["push", "push", "peek", "pop", "empty"], args: [[1], [2], [], [], []] },
        expectedOutput: ["null", "null", "1", "1", "false"],
        explanation: "1 arrived first, so it leaves first.",
      },
      { id: 2, inputs: { ops: ["empty"], args: [[]] }, expectedOutput: ["true"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["push", "pop", "empty"], args: [[5], [], []] }, expectedOutput: ["null", "5", "true"], isHidden: true },
      { id: 4, inputs: { ops: ["push", "push", "pop", "push", "pop", "pop", "empty"], args: [[1], [2], [], [3], [], [], []] }, expectedOutput: ["null", "null", "1", "null", "2", "3", "true"], isHidden: true },
      { id: 5, inputs: { ops: ["push", "peek", "push", "peek"], args: [[4], [], [6], []] }, expectedOutput: ["null", "4", "null", "4"], isHidden: true },
      { id: 6, inputs: { ops: ["push", "pop", "push", "peek", "empty"], args: [[-2], [], [-3], [], []] }, expectedOutput: ["null", "-2", "null", "-3", "false"], isHidden: true },
    ],
    learn: {
      intuition:
        "Pouring one stack into another reverses it, and reversing last-in-first-out gives first-in-first-out. So keep an input stack for arrivals and an output stack for departures, and pour across only when the output stack has run dry.",
      approach: [
        "push always goes onto the input stack.",
        "pop and peek: if the output stack is empty, move every element across, then take from the output stack.",
        "empty is true when both stacks are empty.",
      ],
      bruteForce: { idea: "Move everything across on every single operation.", time: "O(n) per operation", space: "O(n)" },
      optimal: { idea: "Two stacks, transferring lazily.", time: "amortised O(1)", space: "O(n)" },
      pitfalls: [
        "Transferring while the output stack still has elements scrambles the order — only pour when it is empty.",
        "Each element moves across at most once in its lifetime, which is what makes the amortised cost O(1) despite the O(n) worst case.",
        "empty must consult both stacks.",
      ],
      javaToolkit: ["Two Deque<Integer> stacks", "Lazy transfer", "Amortised analysis"],
    },
  },

  "balanced-parenthesis": {
    slug: "balanced-parenthesis",
    title: "Check for Balanced Parentheses",
    description:
      "Given a string of only the characters ( ) [ ] { }, return whether every bracket is closed by the matching type in the correct order.",
    constraints: ["0 ≤ s.length ≤ 10^4", "s contains only ()[]{}"],
    className: "Solution",
    methodName: "isBalanced",
    parameters: [{ name: "s", type: "String" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public boolean isBalanced(String s) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "{[()]}" }, expectedOutput: true, explanation: "Each bracket closes in the reverse order it opened." },
      { id: 2, inputs: { s: "([)]" }, expectedOutput: false, explanation: "The ) tries to close a [ — right order, wrong type." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "" }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { s: "(" }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { s: ")(" }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { s: "()[]{}" }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { s: "]" }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "A closing bracket must match the most recent unmatched opening one — 'most recent' is the definition of a stack. Push every opener; on a closer, the top must be its partner.",
      approach: [
        "Push each opening bracket.",
        "On a closing bracket, fail if the stack is empty or its top is not the matching opener; otherwise pop.",
        "At the end, balanced means the stack is empty.",
      ],
      bruteForce: { idea: "Repeatedly delete adjacent matched pairs until nothing changes.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "One stack, one pass.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Forgetting the final empty check accepts \"(\", which has no error mid-scan.",
        "Popping without checking for an empty stack throws on \")(\".",
        "Counting brackets instead of stacking them accepts \"([)]\" — type and order both matter.",
      ],
      javaToolkit: ["Deque<Character> as a stack", "s.toCharArray()", "A switch or a small pair map"],
    },
  },

  "min-stack": {
    slug: "min-stack",
    title: "Implement a Min Stack",
    description:
      "Build a stack that also reports its smallest element in O(1). Replay a log of \"push\" (one argument), \"pop\", \"top\" and \"getMin\". Return \"null\" for push and pop, and the value for top and getMin. top and getMin are only called on a non-empty stack.",
    constraints: ["1 ≤ ops.length ≤ 3 × 10^4", "-2^31 ≤ pushed value ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, int[][] args) {
        // getMin must be O(1), not a scan.
        // Note: pop returns "null" here, it does not report the removed value.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { ops: ["push", "push", "push", "getMin", "pop", "top", "getMin"], args: [[-2], [0], [-3], [], [], [], []] },
        expectedOutput: ["null", "null", "null", "-3", "null", "0", "-2"],
        explanation: "Removing -3 restores the previous minimum, -2 — the stack remembers its own history.",
      },
      { id: 2, inputs: { ops: ["push", "getMin", "top"], args: [[4], [], []] }, expectedOutput: ["null", "4", "4"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["push", "push", "pop", "getMin"], args: [[5], [3], [], []] }, expectedOutput: ["null", "null", "null", "5"], isHidden: true },
      { id: 4, inputs: { ops: ["push", "push", "push", "pop", "getMin"], args: [[2], [2], [2], [], []] }, expectedOutput: ["null", "null", "null", "null", "2"], isHidden: true },
      { id: 5, inputs: { ops: ["push", "push", "getMin", "pop", "getMin"], args: [[-2147483648], [1], [], [], []] }, expectedOutput: ["null", "null", "-2147483648", "null", "-2147483648"], isHidden: true },
      { id: 6, inputs: { ops: ["push", "push", "push", "getMin", "pop", "getMin"], args: [[3], [1], [1], [], [], []] }, expectedOutput: ["null", "null", "null", "1", "null", "1"], isHidden: true },
    ],
    learn: {
      intuition:
        "Scanning for the minimum is O(n), and one variable cannot survive a pop — remove the current minimum and the previous one is gone. The fix is to remember a minimum PER LEVEL, so each pop restores the one that was true before that push.",
      approach: [
        "Keep a second stack of minima alongside the main one.",
        "push: also push min(value, current minimum), or the value itself when empty.",
        "pop: pop both stacks together. getMin reads the top of the minimum stack.",
      ],
      bruteForce: { idea: "Scan the stack on every getMin.", time: "O(n) per getMin", space: "O(n)" },
      optimal: { idea: "A parallel stack of running minima.", time: "O(1) per operation", space: "O(n)" },
      pitfalls: [
        "Pushing onto the minimum stack only when the value is strictly smaller breaks on duplicates — pop one of two equal minima and the record vanishes. Push every time, or count duplicates.",
        "The two stacks must stay the same height, so pop them together.",
        "The single-stack encoded-value trick overflows with values near the int limits, which a hidden case exercises.",
      ],
      javaToolkit: ["Two parallel stacks", "Math.min against the current top", "Why duplicates break the strict version"],
    },
  },
}
