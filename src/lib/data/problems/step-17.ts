import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 17 — Tries (6).
 *
 * A trie stores a set of strings as a tree of characters, so a shared prefix is
 * stored once and every lookup costs the length of the KEY rather than the size
 * of the set. The last two problems apply the same idea to numbers, walking their
 * bits from the top down — which is what turns an O(n²) XOR search into O(n × 32).
 *
 * The two implementation problems use the operation-log shape: you are handed a
 * list of operation names and string arguments, and return one entry per call —
 * "null" where the real API returns nothing.
 */
export const step17: Record<string, ProblemMetadata> = {
  "implement-trie": {
    slug: "implement-trie",
    title: "Implement a Trie (Prefix Tree)",
    description:
      "Replay a log of operations against a trie: \"insert\" adds a word and returns \"null\"; \"search\" returns \"true\" or \"false\" for an exact word; \"startsWith\" returns \"true\" or \"false\" for a prefix. Each operation takes one lowercase string argument.",
    constraints: ["1 ≤ ops.length ≤ 3 × 10^4", "1 ≤ argument length ≤ 2000", "Lowercase English letters"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "String[]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, String[] args) {
        // Build the trie yourself; a HashSet would defeat the exercise.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { ops: ["insert", "search", "search", "startsWith", "insert", "search"], args: ["apple", "apple", "app", "app", "app", "app"] },
        expectedOutput: ["null", "true", "false", "true", "null", "true"],
        explanation: "\"app\" is a prefix of \"apple\" long before it is inserted as a word in its own right.",
      },
      { id: 2, inputs: { ops: ["search", "startsWith"], args: ["a", "a"] }, expectedOutput: ["false", "false"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["insert", "search"], args: ["a", "a"] }, expectedOutput: ["null", "true"], isHidden: true },
      { id: 4, inputs: { ops: ["insert", "startsWith", "search"], args: ["abc", "abcd", "abcd"] }, expectedOutput: ["null", "false", "false"], isHidden: true },
      { id: 5, inputs: { ops: ["insert", "insert", "search", "search"], args: ["ab", "abc", "ab", "abc"] }, expectedOutput: ["null", "null", "true", "true"], isHidden: true },
      { id: 6, inputs: { ops: ["insert", "insert", "search"], args: ["abc", "abc", "abc"] }, expectedOutput: ["null", "null", "true"], isHidden: true },
      { id: 7, inputs: { ops: ["insert", "startsWith", "startsWith"], args: ["hello", "he", "hell"] }, expectedOutput: ["null", "true", "true"], isHidden: true },
    ],
    learn: {
      intuition:
        "Every node stands for a prefix, and its 26 links are the characters that may follow. Storing \"apple\" and \"app\" therefore costs one chain, not two strings — and both lookups are a walk down that chain.",
      approach: [
        "A node holds 26 child references and a boolean marking the end of a word.",
        "insert: walk the characters, creating missing children, and mark the last node.",
        "search: walk, and succeed only if the walk completes AND the final node is marked.",
        "startsWith: walk, and succeed if it completes at all.",
      ],
      bruteForce: { idea: "Keep the words in a list and scan for every query.", time: "O(words × length)", space: "O(total length)" },
      optimal: { idea: "26-way trie.", time: "O(length) per operation", space: "O(total length)" },
      pitfalls: [
        "search and startsWith differ ONLY in the end-of-word check — dropping it makes search accept every prefix.",
        "A HashSet answers search in O(1) but cannot answer startsWith without scanning everything, which is the reason the trie exists.",
        "Inserting the same word twice must not break anything; the end marker is a boolean, not a counter — that is the next problem.",
      ],
      javaToolkit: ["A node with a 26-child array", "The end-of-word flag", "Trie versus HashSet"],
    },
  },

  "implement-trie-2": {
    slug: "implement-trie-2",
    title: "Implement a Trie With Counts",
    description:
      "A trie that counts duplicates. \"insert\" adds one occurrence and returns \"null\"; \"erase\" removes one occurrence and returns \"null\"; \"countWordsEqualTo\" returns how many times that exact word is stored; \"countWordsStartingWith\" returns how many stored words have that prefix. erase is only called on a word that is present.",
    constraints: ["1 ≤ ops.length ≤ 3 × 10^4", "1 ≤ argument length ≤ 2000", "Lowercase English letters"],
    className: "Solution",
    methodName: "run",
    parameters: [
      { name: "ops", type: "String[]" },
      { name: "args", type: "String[]" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> run(String[] ops, String[] args) {
        // Counts, not flags.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: {
          ops: ["insert", "insert", "countWordsEqualTo", "countWordsStartingWith", "erase", "countWordsEqualTo", "countWordsStartingWith"],
          args: ["apple", "apple", "apple", "app", "apple", "apple", "app"],
        },
        expectedOutput: ["null", "null", "2", "2", "null", "1", "1"],
      },
      { id: 2, inputs: { ops: ["countWordsEqualTo", "countWordsStartingWith"], args: ["x", "x"] }, expectedOutput: ["0", "0"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["insert", "countWordsEqualTo"], args: ["a", "a"] }, expectedOutput: ["null", "1"], isHidden: true },
      { id: 4, inputs: { ops: ["insert", "insert", "countWordsStartingWith"], args: ["ab", "ac", "a"] }, expectedOutput: ["null", "null", "2"], isHidden: true },
      { id: 5, inputs: { ops: ["insert", "erase", "countWordsEqualTo", "countWordsStartingWith"], args: ["ab", "ab", "ab", "a"] }, expectedOutput: ["null", "null", "0", "0"], isHidden: true },
      { id: 6, inputs: { ops: ["insert", "insert", "countWordsEqualTo", "countWordsEqualTo"], args: ["ab", "abc", "ab", "abc"] }, expectedOutput: ["null", "null", "1", "1"], isHidden: true },
      { id: 7, inputs: { ops: ["insert", "insert", "insert", "erase", "countWordsStartingWith"], args: ["aa", "aa", "ab", "aa", "a"] }, expectedOutput: ["null", "null", "null", "null", "2"], isHidden: true },
    ],
    learn: {
      intuition:
        "Replace the end-of-word FLAG with two counters per node: how many words end here, and how many pass through. Every query then reads one number after a single walk, and erase simply decrements along the path.",
      approach: [
        "Each node holds endCount and passCount alongside its children.",
        "insert: increment passCount at every node on the path and endCount at the last.",
        "erase: decrement the same counters along the path.",
        "The two count queries walk to the node and read endCount or passCount.",
      ],
      bruteForce: { idea: "Keep a HashMap of word counts and scan the keys for prefix queries.", time: "O(distinct words × length)", space: "O(total)" },
      optimal: { idea: "Trie with pass and end counters.", time: "O(length) per operation", space: "O(total length)" },
      pitfalls: [
        "countWordsStartingWith reads passCount, not endCount — case 4 has two words sharing a prefix that neither of them equals.",
        "A word that is a prefix of another still has its own endCount, which case 6 checks.",
        "Erasing must decrement the whole path, not only the final node, or prefix counts drift out of step.",
      ],
      javaToolkit: ["Counters instead of flags", "passCount versus endCount", "Decrementing along a path"],
    },
  },

  "longest-common-prefix-trie": {
    slug: "longest-common-prefix-trie",
    title: "Longest Common Prefix",
    description: "Return the longest prefix shared by every string in the array, or \"\" if there is none.",
    constraints: ["1 ≤ strs.length ≤ 200", "0 ≤ strs[i].length ≤ 200", "Lowercase English letters"],
    className: "Solution",
    methodName: "longestCommonPrefix",
    parameters: [{ name: "strs", type: "String[]" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { strs: ["flower", "flow", "flight"] }, expectedOutput: "fl" },
      { id: 2, inputs: { strs: ["dog", "racecar", "car"] }, expectedOutput: "" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { strs: ["a"] }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { strs: ["", "abc"] }, expectedOutput: "", isHidden: true },
      { id: 5, inputs: { strs: ["abc", "abc", "abc"] }, expectedOutput: "abc", isHidden: true },
      { id: 6, inputs: { strs: ["ab", "abc"] }, expectedOutput: "ab", isHidden: true },
      { id: 7, inputs: { strs: ["reflower", "flow", "flight"] }, expectedOutput: "", isHidden: true },
    ],
    learn: {
      intuition:
        "Insert every word into a trie and the answer is the chain from the root that stays single-child and word-free. In practice a direct character-by-character comparison is simpler and uses no memory, which is why it is the version to write.",
      approach: [
        "Take the first string as a candidate prefix.",
        "Walk the remaining strings, comparing character by character and stopping at the first mismatch or end of string.",
        "The shortest surviving prefix is the answer.",
      ],
      bruteForce: { idea: "Test every prefix of the first string against all the others.", time: "O(n × m²)", space: "O(1)" },
      optimal: { idea: "Character-wise vertical scan, or a trie walk.", time: "O(total characters)", space: "O(1)" },
      pitfalls: [
        "An empty string anywhere forces an empty answer — case 4.",
        "The scan must stop at the SHORTEST string, or it reads past the end of one.",
        "The trie version stops the moment a node has more than one child OR marks the end of a word; forgetting the second condition overshoots on case 6.",
      ],
      javaToolkit: ["Vertical character scan", "Trie chain walk", "Guarding against the shortest string"],
    },
  },

  "count-distinct-substrings": {
    slug: "count-distinct-substrings",
    title: "Count Distinct Substrings",
    description: "Return how many DISTINCT non-empty substrings the string has.",
    constraints: ["1 ≤ s.length ≤ 1000", "Lowercase English letters"],
    className: "Solution",
    methodName: "countDistinctSubstrings",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countDistinctSubstrings(String s) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "ababa" }, expectedOutput: 9, explanation: "a, b, ab, ba, aba, bab, abab, baba, ababa." },
      { id: 2, inputs: { s: "abc" }, expectedOutput: 6 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { s: "aa" }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { s: "aaaa" }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { s: "abab" }, expectedOutput: 7, isHidden: true },
      { id: 7, inputs: { s: "abcd" }, expectedOutput: 10, isHidden: true },
    ],
    learn: {
      intuition:
        "Every substring is a prefix of some suffix. Insert all n suffixes into a trie and each NEW node created is exactly one distinct substring — the trie does the deduplication for you, with no set of strings ever materialised.",
      approach: [
        "For each starting index, walk forward from the root creating nodes as needed.",
        "Count each node created.",
        "Return the count.",
      ],
      bruteForce: { idea: "Put every substring into a HashSet.", time: "O(n³) with hashing the strings", space: "O(n³)" },
      optimal: { idea: "Suffix trie, counting created nodes.", time: "O(n²)", space: "O(n²)" },
      pitfalls: [
        "The root is not a substring, so it must not be counted.",
        "A string of n identical characters has exactly n distinct substrings, not n(n+1)/2 — case 5.",
        "A suffix automaton counts the same thing in O(n), but the trie is the one that makes the reasoning visible.",
      ],
      javaToolkit: ["Suffix trie", "Counting created nodes", "Why every substring is a prefix of a suffix"],
    },
  },

  "max-xor-two-numbers": {
    slug: "max-xor-two-numbers",
    title: "Maximum XOR of Two Numbers in an Array",
    description: "Return the largest value of nums[i] XOR nums[j] over all pairs, where i and j may be equal.",
    constraints: ["1 ≤ nums.length ≤ 2 × 10^5", "0 ≤ nums[i] ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "findMaximumXOR",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int findMaximumXOR(int[] nums) {
        // Aim for better than O(n^2).
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 10, 5, 25, 2, 8] }, expectedOutput: 28, explanation: "5 XOR 25." },
      { id: 2, inputs: { nums: [0] }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 2] }, expectedOutput: 3, isHidden: true },
      { id: 4, inputs: { nums: [8, 10, 2] }, expectedOutput: 10, isHidden: true },
      { id: 5, inputs: { nums: [7, 7, 7] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { nums: [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70] }, expectedOutput: 127, isHidden: true },
      { id: 7, inputs: { nums: [2147483647, 0] }, expectedOutput: 2147483647, isHidden: true },
    ],
    learn: {
      intuition:
        "XOR is largest when the high bits differ, so build a trie over the BITS of each number, most significant first. Then for any value, greedily walk towards the OPPOSITE bit at every level — that path is the best partner available.",
      approach: [
        "Insert every number into a binary trie, 31 bits from the top down.",
        "For each number, walk the trie preferring the opposite bit at each level and falling back when that branch is empty.",
        "Track the best XOR found.",
      ],
      bruteForce: { idea: "Try every pair.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Binary trie with a greedy opposite-bit walk.", time: "O(n × 31)", space: "O(n × 31)" },
      pitfalls: [
        "The bits must be walked from the MOST significant end; starting at bit 0 makes the greedy choice meaningless.",
        "Values fit in 31 bits under the constraint, so the sign bit never participates — using 32 would read a bit that is always 0.",
        "All-equal values give 0, since every pair cancels.",
      ],
      javaToolkit: ["Binary trie over bits", "Greedy opposite-bit descent", "Most-significant-bit-first ordering"],
    },
  },

  "max-xor-element": {
    slug: "max-xor-element",
    title: "Maximum XOR With an Element From the Array",
    description:
      "Each query is a pair [x, m]. Return the largest value of x XOR nums[j] over elements nums[j] that are at most m, or -1 when no element qualifies. Answer the queries in the order given.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "1 ≤ queries.length ≤ 10^5", "0 ≤ nums[i], x, m ≤ 10^9"],
    className: "Solution",
    methodName: "maximizeXor",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "queries", type: "int[][]" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] maximizeXor(int[] nums, int[][] queries) {
        // -1 when every element exceeds m.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [0, 1, 2, 3, 4], queries: [[3, 1], [1, 3], [5, 6]] }, expectedOutput: [3, 3, 7] },
      { id: 2, inputs: { nums: [5, 2, 4, 6, 6, 3], queries: [[12, 4], [8, 1], [6, 3]] }, expectedOutput: [15, -1, 5] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], queries: [[1, 0]] }, expectedOutput: [-1], isHidden: true },
      { id: 4, inputs: { nums: [1], queries: [[1, 1]] }, expectedOutput: [0], isHidden: true },
      { id: 5, inputs: { nums: [0], queries: [[5, 0]] }, expectedOutput: [5], isHidden: true },
      { id: 6, inputs: { nums: [2, 4], queries: [[3, 3], [3, 5]] }, expectedOutput: [1, 7], isHidden: true },
      { id: 7, inputs: { nums: [10, 20, 30], queries: [[15, 100]] }, expectedOutput: [27], isHidden: true },
    ],
    learn: {
      intuition:
        "The trie walk from the previous problem cannot respect a ceiling on the element. The fix is to remove the ceiling from the walk entirely: sort both the numbers and the QUERIES by their limit, then insert numbers into the trie only as the limit rises — so everything in the trie is already eligible.",
      approach: [
        "Sort nums ascending, and sort the query indices by m ascending.",
        "Walk the queries in that order, inserting every number at most m before answering.",
        "Answer with the greedy opposite-bit walk, or -1 if the trie is still empty.",
        "Write each answer back to its ORIGINAL position.",
      ],
      bruteForce: { idea: "Scan the whole array for every query.", time: "O(n × q)", space: "O(1)" },
      optimal: { idea: "Offline processing: sort by limit and insert incrementally.", time: "O((n + q) log + q × 31)", space: "O(n × 31)" },
      pitfalls: [
        "Answers must be returned in the ORIGINAL query order, so the sorted order has to carry each query's index.",
        "An empty trie means no element qualifies, which is the -1 case rather than an XOR of 0.",
        "Values reach 10^9, so 30 bits are needed; 20 would silently truncate.",
      ],
      javaToolkit: ["Offline query processing", "Sorting queries while keeping their indices", "Incremental trie insertion"],
    },
  },
}
