import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 15 — Shortest paths, MSTs and ordering (12).
 *
 * Same conventions as the basics group: vertices 0 to n - 1, edges as [u, v] or
 * [u, v, w], and -1 for "no such path" in a distance array.
 *
 * The choice of algorithm is the lesson here. Unweighted needs only BFS; a DAG
 * needs topological order; non-negative weights need Dijkstra; a bound on the
 * number of EDGES needs Bellman-Ford's relaxation rounds, because Dijkstra
 * optimises total cost and cannot also respect a hop limit.
 */
export const step15Advanced: Record<string, ProblemMetadata> = {
  "shortest-path-undirected": {
    slug: "shortest-path-undirected",
    title: "Shortest Path in an Unweighted Undirected Graph",
    description:
      "Return the fewest edges from src to every vertex, as an array of length n. Use -1 for vertices that cannot be reached; the distance to src itself is 0.",
    constraints: ["1 ≤ n ≤ 10^4", "0 ≤ edges.length ≤ 2 × 10^4", "0 ≤ src < n"],
    className: "Solution",
    methodName: "shortestPath",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
      { name: "src", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] shortestPath(int n, int[][] edges, int src) {
        // Unweighted: every edge costs 1.
        return new int[n];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]], src: 0 }, expectedOutput: [0, 1, 2, 3, 4] },
      { id: 2, inputs: { n: 4, edges: [[0, 1], [1, 2]], src: 0 }, expectedOutput: [0, 1, 2, -1], explanation: "Vertex 3 has no edges at all." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [], src: 0 }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { n: 4, edges: [[0, 1], [0, 2], [1, 3], [2, 3]], src: 0 }, expectedOutput: [0, 1, 1, 2], isHidden: true },
      { id: 5, inputs: { n: 3, edges: [[0, 1], [1, 2]], src: 2 }, expectedOutput: [2, 1, 0], isHidden: true },
      { id: 6, inputs: { n: 5, edges: [[0, 1], [2, 3]], src: 0 }, expectedOutput: [0, 1, -1, -1, -1], isHidden: true },
      { id: 7, inputs: { n: 6, edges: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [4, 5]], src: 0 }, expectedOutput: [0, 1, 1, 2, 3, 4], isHidden: true },
    ],
    learn: {
      intuition:
        "When every edge costs the same, the first time BFS reaches a vertex is along a shortest path — later arrivals can only be longer. No priority queue is needed at all.",
      approach: [
        "Fill the distance array with -1 and set src to 0.",
        "BFS from src; on first reaching a neighbour, set its distance to the current distance plus one.",
      ],
      bruteForce: { idea: "Dijkstra with all weights 1.", time: "O(E log n)", space: "O(n)" },
      optimal: { idea: "Plain BFS.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "Using -1 as both 'unreached' and a sentinel works only because distances are non-negative.",
        "Reaching by DFS gives A path, not the shortest one.",
        "Dijkstra would also be correct but adds a log factor for nothing.",
      ],
      javaToolkit: ["BFS for unweighted shortest paths", "Distance array as the visited marker", "Why first-arrival is optimal"],
    },
  },

  "shortest-path-dag": {
    slug: "shortest-path-dag",
    title: "Shortest Path in a Weighted DAG",
    description:
      "Edges are directed triples [u, v, w] and the graph is acyclic. Return the minimum total weight from src to every vertex, using -1 for unreachable ones. Weights are non-negative.",
    constraints: ["1 ≤ n ≤ 10^4", "0 ≤ edges.length ≤ 10^5", "0 ≤ w ≤ 10^4", "The graph is acyclic"],
    className: "Solution",
    methodName: "shortestPathDAG",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
      { name: "src", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] shortestPathDAG(int n, int[][] edges, int src) {
        // Acyclic: a topological order removes the need for a priority queue.
        return new int[n];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 4, edges: [[0, 1, 2], [0, 2, 1], [2, 1, 1], [1, 3, 3]], src: 0 }, expectedOutput: [0, 2, 1, 5] },
      { id: 2, inputs: { n: 3, edges: [[0, 1, 5]], src: 0 }, expectedOutput: [0, 5, -1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [], src: 0 }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { n: 4, edges: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 10]], src: 0 }, expectedOutput: [0, 1, 2, 3], isHidden: true },
      { id: 5, inputs: { n: 3, edges: [[1, 2, 4]], src: 0 }, expectedOutput: [0, -1, -1], isHidden: true },
      { id: 6, inputs: { n: 5, edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 4, 0]], src: 0 }, expectedOutput: [0, 0, 0, 0, 0], isHidden: true },
      { id: 7, inputs: { n: 6, edges: [[0, 1, 2], [0, 4, 1], [4, 5, 4], [4, 2, 2], [1, 2, 3], [2, 3, 6], [5, 3, 1]], src: 0 }, expectedOutput: [0, 2, 3, 6, 1, 5], isHidden: true },
    ],
    learn: {
      intuition:
        "In a DAG the vertices can be laid out so every edge points forward. Relaxing them in that order means each vertex is finalised before it is ever used, so one linear pass suffices — no priority queue, and negative weights would be fine too.",
      approach: [
        "Compute a topological order of the whole graph.",
        "Set the src distance to 0 and the rest to unreachable.",
        "In topological order, relax every outgoing edge of each reachable vertex.",
      ],
      bruteForce: { idea: "Dijkstra.", time: "O(E log n)", space: "O(n)" },
      optimal: { idea: "Relax in topological order.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "Vertices before src in the topological order stay unreachable and must not be relaxed from.",
        "A greedy shortest-first walk is wrong: case 4's direct edge of weight 10 loses to a three-edge path.",
        "The topological order must cover the whole graph, not only what is reachable, or the loop misses edges.",
      ],
      javaToolkit: ["Topological order as a relaxation order", "Why a DAG needs no priority queue", "Handling unreachable vertices"],
    },
  },

  "word-ladder": {
    slug: "word-ladder",
    title: "Word Ladder",
    description:
      "Change one letter at a time, with every intermediate word appearing in wordList, to turn beginWord into endWord. Return the number of WORDS in the shortest such sequence, counting both ends, or 0 if none exists. beginWord need not be in the list.",
    constraints: ["1 ≤ word length ≤ 10", "1 ≤ wordList.length ≤ 5000", "All words are lowercase and the same length"],
    className: "Solution",
    methodName: "ladderLength",
    parameters: [
      { name: "beginWord", type: "String" },
      { name: "endWord", type: "String" },
      { name: "wordList", type: "String[]" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, String[] wordList) {
        // Count words, not steps. 0 when unreachable.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { beginWord: "hit", endWord: "cog", wordList: ["hot", "dot", "dog", "lot", "log", "cog"] }, expectedOutput: 5, explanation: "hit, hot, dot, dog, cog." },
      { id: 2, inputs: { beginWord: "hit", endWord: "cog", wordList: ["hot", "dot", "dog", "lot", "log"] }, expectedOutput: 0, explanation: "cog is not in the list, so it can never be reached." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { beginWord: "a", endWord: "c", wordList: ["a", "b", "c"] }, expectedOutput: 2, isHidden: true },
      { id: 4, inputs: { beginWord: "hot", endWord: "dog", wordList: ["hot", "dog"] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { beginWord: "ab", endWord: "ab", wordList: ["ab"] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { beginWord: "red", endWord: "tax", wordList: ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"] }, expectedOutput: 4, isHidden: true },
      { id: 7, inputs: { beginWord: "cat", endWord: "dog", wordList: ["cot", "cog", "dog"] }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "The words are vertices and a single-letter change is an edge, so this is unweighted shortest path — BFS. Comparing every pair of words to build the graph is O(N² × L); generating each word's neighbours by substituting every letter is O(N × L × 26), which is far cheaper for a large list.",
      approach: [
        "Put the list in a HashSet and BFS from beginWord.",
        "For each word, try every position with each of the 26 letters; a result present in the set is a neighbour.",
        "Remove words from the set as they are visited, and return the level count on reaching endWord.",
      ],
      bruteForce: { idea: "Build the graph by comparing all pairs of words.", time: "O(N² × L)", space: "O(N²)" },
      optimal: { idea: "BFS with letter-substitution neighbours.", time: "O(N × L × 26)", space: "O(N)" },
      pitfalls: [
        "The answer counts WORDS, so a single-step change is 2 and beginWord equal to endWord is 1.",
        "endWord absent from the list means 0, even when every intermediate step exists — case 2.",
        "Removing a word from the set on first visit is what stops it being revisited; a separate visited set works too.",
      ],
      javaToolkit: ["HashSet for O(1) membership", "Generating neighbours by substitution", "BFS level counting"],
    },
  },

  dijkstra: {
    slug: "dijkstra",
    title: "Dijkstra's Algorithm",
    description:
      "Edges are undirected triples [u, v, w] with non-negative weights. Return the minimum total weight from src to every vertex, using -1 for unreachable ones.",
    constraints: ["1 ≤ n ≤ 10^4", "0 ≤ edges.length ≤ 10^5", "0 ≤ w ≤ 10^4"],
    className: "Solution",
    methodName: "dijkstra",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
      { name: "src", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] dijkstra(int n, int[][] edges, int src) {
        // Undirected, non-negative weights.
        return new int[n];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5, edges: [[0, 1, 4], [0, 2, 1], [2, 1, 2], [1, 3, 1], [2, 3, 5], [3, 4, 3]], src: 0 }, expectedOutput: [0, 3, 1, 4, 7] },
      { id: 2, inputs: { n: 3, edges: [[0, 1, 2]], src: 0 }, expectedOutput: [0, 2, -1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [], src: 0 }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { n: 2, edges: [[0, 1, 0]], src: 0 }, expectedOutput: [0, 0], isHidden: true },
      { id: 5, inputs: { n: 4, edges: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 10]], src: 0 }, expectedOutput: [0, 1, 2, 3], isHidden: true },
      { id: 6, inputs: { n: 3, edges: [[0, 1, 5], [0, 1, 2]], src: 0 }, expectedOutput: [0, 2, -1], isHidden: true },
      { id: 7, inputs: { n: 5, edges: [[0, 1, 4], [0, 2, 1], [2, 1, 2], [1, 3, 1], [2, 3, 5], [3, 4, 3]], src: 4 }, expectedOutput: [7, 4, 6, 3, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "Repeatedly finalise the unfinalised vertex with the smallest known distance. Non-negative weights are what makes that safe: no later path can come back and improve a vertex you have already settled, because every extra edge only adds.",
      approach: [
        "Distances start at infinity except src at 0; push (0, src) into a min-heap keyed by distance.",
        "Pop the smallest; skip it if the popped distance is stale.",
        "Relax each neighbour and push the improved pairs.",
      ],
      bruteForce: { idea: "Scan all vertices for the minimum each round.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Min-heap of (distance, vertex) with lazy deletion.", time: "O(E log n)", space: "O(n + E)" },
      pitfalls: [
        "A NEGATIVE weight breaks the argument entirely and needs Bellman-Ford; this problem guarantees non-negative weights for that reason.",
        "Java's PriorityQueue has no decrease-key, so push duplicates and skip stale pops.",
        "Parallel edges are legitimate — case 6 offers two edges between the same pair and the cheaper must win.",
      ],
      javaToolkit: ["PriorityQueue<int[]> keyed by distance", "Lazy deletion of stale entries", "Why non-negativity matters"],
    },
  },

  "shortest-path-binary-matrix": {
    slug: "shortest-path-binary-matrix",
    title: "Shortest Path in a Binary Matrix",
    description:
      "In an n × n grid, 0 is open and 1 is blocked. Return the number of CELLS on the shortest clear path from the top-left to the bottom-right, moving in any of the 8 directions, or -1 if there is none.",
    constraints: ["1 ≤ n ≤ 100", "grid[i][j] is 0 or 1"],
    className: "Solution",
    methodName: "shortestPathBinaryMatrix",
    parameters: [{ name: "grid", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        // Eight directions. Count cells, not steps.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { grid: [[0, 1], [1, 0]] }, expectedOutput: 2, explanation: "The two corners are diagonally adjacent." },
      { id: 2, inputs: { grid: [[0, 0, 0], [1, 1, 0], [1, 1, 0]] }, expectedOutput: 4 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { grid: [[1, 0, 0], [1, 1, 0], [1, 1, 0]] }, expectedOutput: -1, isHidden: true },
      { id: 4, inputs: { grid: [[0]] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { grid: [[1]] }, expectedOutput: -1, isHidden: true },
      { id: 6, inputs: { grid: [[0, 0], [0, 0]] }, expectedOutput: 2, isHidden: true },
      { id: 7, inputs: { grid: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "Eight directions instead of four changes nothing structurally: every move still costs the same, so BFS still finds the shortest path. Only the direction array grows.",
      approach: [
        "Fail immediately if either corner is blocked.",
        "BFS from (0, 0) with a distance of 1, expanding to all 8 in-bounds open neighbours.",
        "Return the distance on reaching the bottom-right corner, or -1 if the queue empties.",
      ],
      bruteForce: { idea: "DFS every route and keep the shortest.", time: "exponential", space: "O(n²)" },
      optimal: { idea: "8-directional BFS.", time: "O(n²)", space: "O(n²)" },
      pitfalls: [
        "The count is CELLS, so a 1 × 1 open grid answers 1, not 0.",
        "Both the start and the end must be checked for being blocked — case 5 is a single blocked cell.",
        "Diagonal moves cost the same as orthogonal ones here, which is what keeps BFS applicable; unequal costs would need Dijkstra.",
      ],
      javaToolkit: ["Eight-direction arrays", "BFS on a grid", "Counting cells versus steps"],
    },
  },

  "cheapest-flights": {
    slug: "cheapest-flights",
    title: "Cheapest Flights Within K Stops",
    description:
      "Flights are directed triples [from, to, price]. Return the cheapest total price from src to dst using at most k intermediate stops — that is, at most k + 1 flights — or -1 if no such route exists.",
    constraints: ["1 ≤ n ≤ 100", "0 ≤ flights.length ≤ n × (n - 1)", "1 ≤ price ≤ 10^4", "0 ≤ k < n"],
    className: "Solution",
    methodName: "findCheapestPrice",
    parameters: [
      { name: "n", type: "int" },
      { name: "flights", type: "int[][]" },
      { name: "src", type: "int" },
      { name: "dst", type: "int" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        // At most k stops means at most k + 1 flights.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 4, flights: [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], src: 0, dst: 3, k: 1 }, expectedOutput: 700 },
      { id: 2, inputs: { n: 3, flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src: 0, dst: 2, k: 1 }, expectedOutput: 200 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 3, flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src: 0, dst: 2, k: 0 }, expectedOutput: 500, isHidden: true },
      { id: 4, inputs: { n: 2, flights: [], src: 0, dst: 1, k: 1 }, expectedOutput: -1, isHidden: true },
      { id: 5, inputs: { n: 2, flights: [[0, 1, 50]], src: 0, dst: 0, k: 0 }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { n: 4, flights: [[0, 1, 1], [1, 2, 1], [2, 3, 1]], src: 0, dst: 3, k: 1 }, expectedOutput: -1, isHidden: true },
      { id: 7, inputs: { n: 5, flights: [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 1], [4, 2, 1]], src: 0, dst: 2, k: 2 }, expectedOutput: 7, isHidden: true },
    ],
    learn: {
      intuition:
        "Dijkstra optimises total price and will happily use a long cheap route, so it cannot respect the hop limit. Bellman-Ford's structure fits perfectly instead: after r rounds of relaxation the costs are optimal among routes of at most r edges, so run exactly k + 1 rounds.",
      approach: [
        "Costs start at infinity except src at 0.",
        "Repeat k + 1 times: relax every flight, but read from a SNAPSHOT of the previous round's costs.",
        "Return the cost at dst, or -1 if it is still infinite.",
      ],
      bruteForce: { idea: "Enumerate every route with at most k + 1 edges.", time: "exponential", space: "O(n)" },
      optimal: { idea: "Bellman-Ford limited to k + 1 rounds.", time: "O(k × E)", space: "O(n)" },
      pitfalls: [
        "Relaxing in place lets one round use an edge relaxed earlier in the SAME round, silently allowing more hops than the limit — the snapshot copy is essential.",
        "k counts intermediate stops, so k + 1 flights are allowed. Case 3 with k = 0 permits exactly one direct flight.",
        "src equal to dst costs 0 regardless of k.",
      ],
      javaToolkit: ["Bellman-Ford relaxation rounds", "Copying the cost array per round", "Why Dijkstra does not fit"],
    },
  },

  "prims-mst": {
    slug: "prims-mst",
    title: "Minimum Spanning Tree — Prim's Algorithm",
    description:
      "Edges are undirected triples [u, v, w]. Return the total weight of a minimum spanning tree, or -1 if the graph is disconnected. Solve it by GROWING one tree, adding the cheapest edge that leaves it.",
    constraints: ["1 ≤ n ≤ 10^4", "0 ≤ edges.length ≤ 10^5", "0 ≤ w ≤ 10^4"],
    className: "Solution",
    methodName: "minimumSpanningTree",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int minimumSpanningTree(int n, int[][] edges) {
        // Grow one tree from vertex 0. -1 when the graph is disconnected.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5, edges: [[0, 1, 2], [0, 3, 6], [1, 2, 3], [1, 3, 8], [1, 4, 5], [2, 4, 7], [3, 4, 9]] }, expectedOutput: 16 },
      { id: 2, inputs: { n: 3, edges: [[0, 1, 1]] }, expectedOutput: -1, explanation: "Vertex 2 is unreachable, so no spanning tree exists." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { n: 2, edges: [[0, 1, 7]] }, expectedOutput: 7, isHidden: true },
      { id: 5, inputs: { n: 3, edges: [[0, 1, 1], [1, 2, 1], [0, 2, 5]] }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { n: 4, edges: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 1]] }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { n: 4, edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0]] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Keep one growing tree and repeatedly attach the cheapest edge that reaches a vertex outside it. That edge is always safe: it crosses the boundary between the tree and the rest, and the cheapest crossing edge always belongs to some minimum spanning tree.",
      approach: [
        "Start from vertex 0 with a min-heap of (weight, vertex) seeded at (0, 0).",
        "Pop the cheapest; skip it if that vertex is already in the tree, otherwise add the weight and mark it.",
        "Push all its edges to vertices not yet in the tree.",
        "If fewer than n vertices are added, return -1.",
      ],
      bruteForce: { idea: "Try every spanning tree.", time: "exponential", space: "O(n)" },
      optimal: { idea: "Heap-driven Prim's from one starting vertex.", time: "O(E log n)", space: "O(n + E)" },
      pitfalls: [
        "The heap holds edge WEIGHTS, not accumulated distances — that single difference from Dijkstra is the whole algorithm.",
        "A single vertex has an MST of weight 0, not -1.",
        "The disconnected check must count vertices added, not edges used.",
      ],
      javaToolkit: ["PriorityQueue keyed by edge weight", "The cut property", "Prim's versus Dijkstra"],
    },
  },

  "kruskal-mst": {
    slug: "kruskal-mst",
    title: "Minimum Spanning Tree — Kruskal's Algorithm",
    description:
      "Edges are undirected triples [u, v, w]. Return the total weight of a minimum spanning tree, or -1 if the graph is disconnected. Solve it by SORTING the edges and merging components with a disjoint-set structure.",
    constraints: ["1 ≤ n ≤ 10^4", "0 ≤ edges.length ≤ 10^5", "0 ≤ w ≤ 10^4"],
    className: "Solution",
    methodName: "minimumSpanningTree",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int minimumSpanningTree(int n, int[][] edges) {
        // Sort the edges, then union-find. -1 when disconnected.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 4, edges: [[0, 1, 10], [0, 2, 6], [0, 3, 5], [1, 3, 15], [2, 3, 4]] }, expectedOutput: 19 },
      { id: 2, inputs: { n: 4, edges: [[0, 1, 1], [2, 3, 1]] }, expectedOutput: -1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { n: 2, edges: [[0, 1, 3], [0, 1, 9]] }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { n: 5, edges: [[0, 1, 2], [0, 3, 6], [1, 2, 3], [1, 3, 8], [1, 4, 5], [2, 4, 7], [3, 4, 9]] }, expectedOutput: 16, isHidden: true },
      { id: 6, inputs: { n: 3, edges: [[0, 1, 1], [1, 2, 1], [0, 2, 1]] }, expectedOutput: 2, isHidden: true },
      { id: 7, inputs: { n: 3, edges: [[0, 0, 5], [0, 1, 1], [1, 2, 1]] }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "Where Prim's grows one tree, Kruskal's grows a forest. Take the edges cheapest first and keep any that joins two different components; a disjoint-set structure answers 'different components?' in near-constant time.",
      approach: [
        "Sort the edges by weight ascending.",
        "For each edge, union its endpoints; if they were already joined, skip it.",
        "Count accepted edges — n - 1 means success, fewer means the graph is disconnected.",
      ],
      bruteForce: { idea: "Check connectivity from scratch for each candidate edge.", time: "O(E × (n + E))", space: "O(n)" },
      optimal: { idea: "Sort plus union-find with path compression and union by rank.", time: "O(E log E)", space: "O(n)" },
      pitfalls: [
        "Union-find without path compression or ranking degrades towards O(n) per query and loses the benefit.",
        "A self-loop always joins a component to itself and must be skipped — case 7 includes one.",
        "The two MST algorithms can produce different edge SETS when weights tie, but the total weight is always the same, which is why the answer is a number.",
      ],
      javaToolkit: ["Sorting edges by weight", "Disjoint-set union with path compression", "Kruskal's versus Prim's"],
    },
  },

  "bridges-graph": {
    slug: "bridges-graph",
    title: "Bridges in a Graph",
    description:
      "A bridge is an edge whose removal increases the number of connected components. Return all bridges of an undirected graph, each as [min, max], sorted ascending by the first endpoint and then the second. There are no parallel edges or self-loops.",
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ edges.length ≤ 10^5", "No parallel edges or self-loops"],
    className: "Solution",
    methodName: "findBridges",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> findBridges(int n, int[][] edges) {
        // Each bridge as [min, max]; the whole list sorted.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]] }, expectedOutput: [[1, 3], [3, 4]], explanation: "The triangle 0-1-2 has no bridges; the tail does." },
      { id: 2, inputs: { n: 3, edges: [[0, 1], [1, 2], [2, 0]] }, expectedOutput: [] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { n: 2, edges: [[0, 1]] }, expectedOutput: [[0, 1]], isHidden: true },
      { id: 5, inputs: { n: 4, edges: [[0, 1], [1, 2], [2, 3]] }, expectedOutput: [[0, 1], [1, 2], [2, 3]], isHidden: true },
      { id: 6, inputs: { n: 4, edges: [[0, 1], [2, 3]] }, expectedOutput: [[0, 1], [2, 3]], isHidden: true },
      { id: 7, inputs: { n: 6, edges: [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4], [4, 5], [5, 3]] }, expectedOutput: [[1, 3]], isHidden: true },
    ],
    learn: {
      intuition:
        "Run a DFS and give each vertex a discovery TIME. An edge to a child is a bridge exactly when nothing in that child's subtree can reach back above the child — that is, when the subtree's lowest reachable time is strictly greater than the parent's discovery time.",
      approach: [
        "DFS recording a discovery time and a low value for each vertex.",
        "The low value is the minimum of the vertex's own time, its children's low values, and the times of vertices reached by back edges.",
        "The edge to a child is a bridge when the child's low exceeds the parent's discovery time.",
        "Skip the edge back to the immediate parent; sort the collected bridges.",
      ],
      bruteForce: { idea: "Remove each edge and recount components.", time: "O(E × (n + E))", space: "O(n)" },
      optimal: { idea: "Tarjan's bridge-finding DFS.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "The comparison is STRICTLY greater; using ≥ would report the parent edge itself as a bridge.",
        "Every edge of a tree is a bridge, which case 5 checks, and every edge of a cycle is not.",
        "Disconnected graphs need the DFS restarted from each unvisited vertex.",
      ],
      javaToolkit: ["Discovery time and low-link values", "Skipping the parent edge", "Tarjan's algorithm"],
    },
  },

  "articulation-point": {
    slug: "articulation-point",
    title: "Articulation Points",
    description:
      "An articulation point is a vertex whose removal, together with its edges, increases the number of connected components. Return all of them in ascending order, or an empty list if there are none.",
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ edges.length ≤ 10^5", "No parallel edges or self-loops"],
    className: "Solution",
    methodName: "articulationPoints",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> articulationPoints(int n, int[][] edges) {
        // Ascending. Empty list when there are none.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]] }, expectedOutput: [1, 3] },
      { id: 2, inputs: { n: 3, edges: [[0, 1], [1, 2], [2, 0]] }, expectedOutput: [] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { n: 2, edges: [[0, 1]] }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { n: 3, edges: [[0, 1], [1, 2]] }, expectedOutput: [1], isHidden: true },
      { id: 6, inputs: { n: 4, edges: [[0, 1], [2, 3]] }, expectedOutput: [], isHidden: true },
      { id: 7, inputs: { n: 7, edges: [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4], [4, 5], [5, 3], [3, 6]] }, expectedOutput: [1, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "The same DFS as bridges, with the test moved from edges to vertices. A non-root vertex is an articulation point when some child's subtree cannot reach ABOVE it. The root is special: it is one exactly when it has more than one DFS child.",
      approach: [
        "Run the same discovery-time and low-value DFS.",
        "For a non-root vertex, mark it when any child's low is at least its own discovery time.",
        "For the root, mark it when it has two or more DFS children.",
        "Deduplicate and sort.",
      ],
      bruteForce: { idea: "Remove each vertex and recount components.", time: "O(n × (n + E))", space: "O(n)" },
      optimal: { idea: "Tarjan's articulation-point DFS.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "The comparison is ≥ here, not the strict > used for bridges — an endpoint of a non-bridge edge can still be a cut vertex.",
        "The root rule is a genuinely separate case; applying the child test to it reports it wrongly.",
        "A vertex can be flagged by several children, so deduplicate before returning.",
      ],
      javaToolkit: ["Low-link DFS reused", "The special root rule", "Bridges versus cut vertices"],
    },
  },

  "topological-sort": {
    slug: "topological-sort",
    title: "Topological Sort",
    description:
      "Edges are directed [u, v] meaning u must come before v, and the graph is acyclic. Return the LEXICOGRAPHICALLY SMALLEST valid ordering of all n vertices.",
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ edges.length ≤ 10^5", "The graph is acyclic"],
    className: "Solution",
    methodName: "topologicalSort",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> topologicalSort(int n, int[][] edges) {
        // Many orders are valid; return the smallest one lexicographically.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 6, edges: [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]] }, expectedOutput: [4, 5, 0, 2, 3, 1] },
      { id: 2, inputs: { n: 3, edges: [] }, expectedOutput: [0, 1, 2], explanation: "With no constraints the smallest order is simply ascending." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { n: 3, edges: [[2, 1], [1, 0]] }, expectedOutput: [2, 1, 0], isHidden: true },
      { id: 5, inputs: { n: 4, edges: [[1, 0]] }, expectedOutput: [1, 0, 2, 3], isHidden: true },
      { id: 6, inputs: { n: 5, edges: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]] }, expectedOutput: [0, 1, 2, 3, 4], isHidden: true },
      { id: 7, inputs: { n: 4, edges: [[3, 0], [3, 1], [1, 2]] }, expectedOutput: [3, 0, 1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Kahn's algorithm repeatedly takes a vertex with no remaining prerequisites. Any such vertex is valid, so to get the smallest ordering, always take the SMALLEST available one — a min-heap instead of a plain queue.",
      approach: [
        "Compute in-degrees and push every zero-in-degree vertex into a min-heap.",
        "Pop the smallest, append it, and decrement its neighbours' in-degrees, pushing any that reach zero.",
        "Repeat until the heap empties.",
      ],
      bruteForce: { idea: "Generate all permutations and keep the first valid one.", time: "O(n! × E)", space: "O(n)" },
      optimal: { idea: "Kahn's algorithm with a min-heap.", time: "O(n log n + E)", space: "O(n)" },
      pitfalls: [
        "A plain queue gives A valid order but not the smallest — case 5 would then depend on insertion order rather than on the numbers.",
        "Lexicographically smallest is not the same as sorting the result; the constraints still bind.",
        "If the heap empties before all n vertices are emitted, the graph had a cycle — guaranteed not to happen here, but that check is how Kahn's detects one.",
      ],
      javaToolkit: ["In-degree counting", "PriorityQueue instead of a queue", "Kahn's algorithm"],
    },
  },

  "course-schedule": {
    slug: "course-schedule",
    title: "Course Schedule",
    description:
      "Each prerequisite pair [a, b] means course b must be taken before course a. Return whether all numCourses courses can be completed.",
    constraints: ["1 ≤ numCourses ≤ 2000", "0 ≤ prerequisites.length ≤ 5000"],
    className: "Solution",
    methodName: "canFinish",
    parameters: [
      { name: "numCourses", type: "int" },
      { name: "prerequisites", type: "int[][]" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // [a, b] means b before a.
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { numCourses: 2, prerequisites: [[1, 0]] }, expectedOutput: true },
      { id: 2, inputs: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] }, expectedOutput: false, explanation: "Each course requires the other." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { numCourses: 1, prerequisites: [] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { numCourses: 3, prerequisites: [[1, 0], [2, 1], [0, 2]] }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]] }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { numCourses: 2, prerequisites: [[0, 0]] }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { numCourses: 5, prerequisites: [[1, 0], [2, 1], [3, 2], [4, 3]] }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "The courses form a directed graph, and a schedule exists exactly when that graph has no cycle. So this is cycle detection with a story attached.",
      approach: [
        "Build edges from b to a and count in-degrees.",
        "Run Kahn's algorithm, emitting zero-in-degree courses.",
        "If fewer than numCourses come out, a cycle blocked the rest.",
      ],
      bruteForce: { idea: "Search for a path from a course back to itself.", time: "O(n × (n + E))", space: "O(n)" },
      optimal: { idea: "Kahn's algorithm, checking the emitted count.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "The pair order is the standard trap: [a, b] means an edge from b to a, not the other way round.",
        "A self-prerequisite [0, 0] is a one-vertex cycle and makes the schedule impossible.",
        "Courses with no prerequisites at all must still be counted as completed, or a valid schedule looks blocked.",
      ],
      javaToolkit: ["Reading edge direction carefully", "Kahn's count check", "Cycle detection as a feasibility test"],
    },
  },
}
