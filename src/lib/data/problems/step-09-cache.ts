import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 9 — Cache design (2).
 *
 * Both use the same operation-log shape as the implementation group, with the
 * capacity passed separately. "get" takes one argument and returns the value or
 * -1; "put" takes two and returns "null".
 */
export const step09Cache: Record<string, ProblemMetadata> = {
  "lru-cache": {
    slug: "lru-cache",
    title: "LRU Cache",
    description:
      "Build a cache holding at most `capacity` entries. \"get\" returns the value for a key or -1 when absent; \"put\" inserts or updates. When the cache is full, an insert evicts the LEAST RECENTLY USED key — both get and put count as a use. Both operations must be O(1). Return one entry per operation: the value for get, \"null\" for put.",
    constraints: ["0 ≤ capacity ≤ 3000", "1 ≤ ops.length ≤ 10^4", "0 ≤ key, value ≤ 10^6"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "capacity", type: "int" },
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(int capacity, String[] ops, int[][] args) {
        // "get" -> args[i][0]; "put" -> args[i][0], args[i][1].
        // Both operations must be O(1).
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: {
          capacity: 2,
          ops: ["put", "put", "get", "put", "get", "put", "get", "get", "get"],
          args: [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
        },
        expectedOutput: ["null", "null", "1", "null", "-1", "null", "-1", "3", "4"],
        explanation: "Reading key 1 makes key 2 the least recently used, so inserting 3 evicts 2.",
      },
      {
        id: 2,
        inputs: { capacity: 1, ops: ["put", "put", "get", "get"], args: [[1, 1], [2, 2], [1], [2]] },
        expectedOutput: ["null", "null", "-1", "2"],
      },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { capacity: 2, ops: ["get"], args: [[1]] }, expectedOutput: ["-1"], isHidden: true },
      { id: 4, inputs: { capacity: 2, ops: ["put", "put", "get"], args: [[1, 1], [1, 2], [1]] }, expectedOutput: ["null", "null", "2"], isHidden: true },
      { id: 5, inputs: { capacity: 2, ops: ["put", "put", "get", "put", "get"], args: [[1, 1], [2, 2], [1], [3, 3], [2]] }, expectedOutput: ["null", "null", "1", "null", "-1"], isHidden: true },
      { id: 6, inputs: { capacity: 0, ops: ["put", "get"], args: [[1, 1], [1]] }, expectedOutput: ["null", "-1"], isHidden: true },
      { id: 7, inputs: { capacity: 2, ops: ["put", "put", "put", "get", "get", "get"], args: [[1, 1], [2, 2], [3, 3], [1], [2], [3]] }, expectedOutput: ["null", "null", "null", "-1", "2", "3"], isHidden: true },
    ],
    learn: {
      intuition:
        "Two requirements pull against each other: find a key instantly, and know instantly which key is oldest. A HashMap does the first and a doubly linked list the second, so combine them — the map stores keys mapped to NODES, and the list keeps them in recency order.",
      approach: [
        "Doubly linked list with dummy head and tail sentinels; most recent sits next to head.",
        "get: look up the node, unlink it and reinsert after head, return its value.",
        "put: update and move to the front if present; otherwise insert and, if now over capacity, remove the node before tail and drop its key from the map.",
      ],
      bruteForce: { idea: "Keep timestamps and scan for the oldest on eviction.", time: "O(n) per eviction", space: "O(n)" },
      optimal: { idea: "HashMap of key to node, plus a doubly linked list.", time: "O(1) per operation", space: "O(capacity)" },
      pitfalls: [
        "Evicting the tail node without removing its key from the map leaves a dangling entry that later returns a stale value.",
        "A get is a USE and must refresh recency — case 5 fails immediately otherwise.",
        "Capacity 0 stores nothing at all.",
        "A singly linked list cannot unlink a node in O(1); the backward pointer is what makes this work.",
      ],
      javaToolkit: ["HashMap<Integer, Node>", "Doubly linked list with sentinels", "LinkedHashMap with accessOrder as the shortcut"],
    },
  },

  "lfu-cache": {
    slug: "lfu-cache",
    title: "LFU Cache",
    description:
      "Build a cache holding at most `capacity` entries. \"get\" returns the value for a key or -1 when absent; \"put\" inserts or updates. When the cache is full, an insert evicts the LEAST FREQUENTLY USED key, breaking ties by evicting the least recently used among them. A key's use count rises on every successful get and on every put to it. Return the value for get and \"null\" for put.",
    constraints: ["0 ≤ capacity ≤ 10^4", "1 ≤ ops.length ≤ 10^4", "0 ≤ key, value ≤ 10^6"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "capacity", type: "int" },
      { name: "ops", type: "String[]" },
      { name: "args", type: "int[][]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(int capacity, String[] ops, int[][] args) {
        // Evict the least frequently used; break ties by least recently used.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: {
          capacity: 2,
          ops: ["put", "put", "get", "put", "get", "get", "put", "get", "get", "get"],
          args: [[1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]],
        },
        expectedOutput: ["null", "null", "1", "null", "-1", "3", "null", "-1", "3", "4"],
        explanation: "Reading key 1 lifts its count to 2, so key 2 is evicted first. Later key 3 has the highest count and survives.",
      },
      {
        id: 2,
        inputs: { capacity: 1, ops: ["put", "get", "put", "get", "get"], args: [[1, 1], [1], [2, 2], [1], [2]] },
        expectedOutput: ["null", "1", "null", "-1", "2"],
        explanation: "With capacity 1 the incoming key always wins, however popular the sitting one was.",
      },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { capacity: 0, ops: ["put", "get"], args: [[0, 0], [0]] }, expectedOutput: ["null", "-1"], isHidden: true },
      { id: 4, inputs: { capacity: 2, ops: ["put", "put", "put", "get", "get", "get"], args: [[1, 1], [2, 2], [3, 3], [1], [2], [3]] }, expectedOutput: ["null", "null", "null", "-1", "2", "3"], isHidden: true },
      { id: 5, inputs: { capacity: 2, ops: ["put", "put", "get", "get", "put", "get", "get"], args: [[1, 1], [2, 2], [2], [2], [3, 3], [1], [3]] }, expectedOutput: ["null", "null", "2", "2", "null", "-1", "3"], isHidden: true },
      { id: 6, inputs: { capacity: 2, ops: ["put", "put", "get"], args: [[1, 1], [1, 5], [1]] }, expectedOutput: ["null", "null", "5"], isHidden: true },
      { id: 7, inputs: { capacity: 3, ops: ["put", "put", "put", "get", "put", "get", "get"], args: [[1, 1], [2, 2], [3, 3], [1], [4, 4], [2], [4]] }, expectedOutput: ["null", "null", "null", "1", "null", "-1", "4"], isHidden: true },
    ],
    learn: {
      intuition:
        "LRU needed one ordering; LFU needs two — by count, and by recency within a count. Bucket the keys BY COUNT, and keep each bucket internally in recency order. Then evicting means going to the smallest non-empty bucket and taking its oldest entry.",
      approach: [
        "Keep a map from key to (value, count), and a map from count to an access-ordered set of keys.",
        "Track the smallest live count. A use moves the key from bucket c to bucket c + 1; if bucket c empties and was the minimum, the minimum becomes c + 1.",
        "On insert into a full cache, evict the oldest key in the minimum bucket, then add the new key with count 1 and reset the minimum to 1.",
      ],
      bruteForce: { idea: "Scan every entry for the lowest count on eviction.", time: "O(n) per eviction", space: "O(n)" },
      optimal: { idea: "Count buckets of access-ordered key sets, plus a running minimum count.", time: "O(1) per operation", space: "O(capacity)" },
      pitfalls: [
        "Tie-breaking is the whole difficulty: equal counts must fall back to least-recently-used, which is why each bucket needs its own ordering.",
        "After an insert the minimum count is always 1 — forgetting to reset it evicts the wrong key next time.",
        "A put to an EXISTING key is a use and raises its count; it is not a fresh insert.",
        "Capacity 0 stores nothing.",
      ],
      javaToolkit: ["HashMap plus LinkedHashSet buckets", "A running minimum frequency", "Two-level ordering"],
    },
  },
}
