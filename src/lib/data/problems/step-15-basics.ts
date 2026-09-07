import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 15 — Graph basics, BFS and DFS (13).
 *
 * Conventions used throughout the step, so every answer is unique:
 *   - Vertices are numbered 0 to n - 1.
 *   - `edges` is a list of pairs [u, v], or triples [u, v, w] where weights matter.
 *   - Build adjacency lists with each vertex's neighbours in ASCENDING order.
 *     Traversal output depends on that, so it is fixed rather than left to
 *     whatever order the edges happen to arrive in.
 *   - Grids use 0 and 1 rather than characters, and the mapping is stated per
 *     problem.
 *
 * BFS and DFS differ in one line — a queue instead of a stack — but not in
 * purpose: BFS finds the FEWEST edges to each vertex, DFS does not.
 */
export const step15Basics: Record<string, ProblemMetadata> = {
  "graph-types": {
    slug: "graph-types",
    title: "Graphs and Their Types",
    description:
      "Given an UNDIRECTED graph on n vertices, return the degree of each vertex in order. A self-loop [u, u] contributes 2 to u's degree, and parallel edges each count.",
    constraints: ["1 ≤ n ≤ 10^4", "0 ≤ edges.length ≤ 10^5", "0 ≤ u, v < n"],
    className: "Solution",
    methodName: "degrees",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] degrees(int n, int[][] edges) {
        // A self-loop adds 2 to that vertex.
        return new int[n];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 4, edges: [[0, 1], [1, 2], [2, 3]] }, expectedOutput: [1, 2, 2, 1], explanation: "A path graph: the ends have degree 1, the middles 2." },
      { id: 2, inputs: { n: 3, edges: [[0, 0]] }, expectedOutput: [2, 0, 0], explanation: "A self-loop uses both of its endpoints on the same vertex." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { n: 3, edges: [[0, 1], [0, 1]] }, expectedOutput: [2, 2, 0], isHidden: true },
      { id: 5, inputs: { n: 4, edges: [[0, 1], [1, 2], [2, 0], [3, 3]] }, expectedOutput: [2, 2, 2, 2], isHidden: true },
      { id: 6, inputs: { n: 2, edges: [] }, expectedOutput: [0, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "Degree counts edge ENDPOINTS at a vertex, not neighbours. That distinction is the whole problem: a self-loop has both its endpoints on one vertex, and two parallel edges are two edges, not one.",
      approach: [
        "Start every count at 0.",
        "For each edge, increment u and increment v — a self-loop naturally gets both increments.",
      ],
      optimal: { idea: "One pass over the edge list.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "Special-casing a self-loop to add 1 gives the wrong answer; the standard definition is 2.",
        "In a DIRECTED graph the single count splits into in-degree and out-degree, which several later problems depend on.",
        "The sum of all degrees is always twice the number of edges — a useful sanity check.",
      ],
      javaToolkit: ["Degree versus neighbour count", "Directed in-degree and out-degree", "The handshake identity"],
    },
  },

  "graph-representation": {
    slug: "graph-representation",
    title: "Graph Representation",
    description:
      "Given an UNDIRECTED graph, return its adjacency list: one row per vertex holding that vertex's neighbours in ASCENDING order. Include duplicates from parallel edges, and list a self-loop once.",
    constraints: ["1 ≤ n ≤ 1000", "0 ≤ edges.length ≤ 5000", "0 ≤ u, v < n"],
    className: "Solution",
    methodName: "adjacencyList",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> adjacencyList(int n, int[][] edges) {
        // One row per vertex, neighbours ascending. A self-loop appears once.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 4, edges: [[0, 1], [0, 2], [1, 3]] }, expectedOutput: [[1, 2], [0, 3], [0], [1]] },
      { id: 2, inputs: { n: 2, edges: [] }, expectedOutput: [[], []] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [[0, 0]] }, expectedOutput: [[0]], isHidden: true },
      { id: 4, inputs: { n: 3, edges: [[2, 0], [1, 0]] }, expectedOutput: [[1, 2], [0], [0]], isHidden: true },
      { id: 5, inputs: { n: 3, edges: [[0, 1], [0, 1]] }, expectedOutput: [[1, 1], [0, 0], []], isHidden: true },
      { id: 6, inputs: { n: 3, edges: [[0, 1], [1, 2], [2, 0]] }, expectedOutput: [[1, 2], [0, 2], [0, 1]], isHidden: true },
    ],
    learn: {
      intuition:
        "An adjacency list stores only the edges that exist, so it costs O(n + E) rather than the matrix's O(n²). For the sparse graphs most problems use, that is the difference between fitting in memory and not.",
      approach: [
        "Create n empty lists.",
        "For each edge, add v to u's list and u to v's — except a self-loop, which is added once.",
        "Sort each list.",
      ],
      bruteForce: { idea: "Build an n × n adjacency matrix and read the rows.", time: "O(n²)", space: "O(n²)" },
      optimal: { idea: "Array of lists, sorted per vertex.", time: "O(n + E log E)", space: "O(n + E)" },
      pitfalls: [
        "Adding a self-loop twice makes the vertex appear as its own neighbour twice, which breaks traversals that assume each edge is listed once per direction.",
        "For a DIRECTED graph only u gets v, never the reverse — this is the single most common graph bug.",
        "Sorting is not required by the data structure; it is required here so the answer is unique.",
      ],
      javaToolkit: ["List<List<Integer>> adjacency", "Adding both directions", "Adjacency list versus matrix trade-off"],
    },
  },

  "connected-components": {
    slug: "connected-components",
    title: "Connected Components",
    description: "Return how many connected components an undirected graph has. Isolated vertices count as components.",
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ edges.length ≤ 2 × 10^5"],
    className: "Solution",
    methodName: "countComponents",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int countComponents(int n, int[][] edges) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5, edges: [[0, 1], [1, 2], [3, 4]] }, expectedOutput: 2 },
      { id: 2, inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]] }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { n: 4, edges: [] }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { n: 3, edges: [[0, 0], [1, 1]] }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { n: 6, edges: [[0, 1], [2, 3], [4, 5]] }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { n: 4, edges: [[0, 1], [1, 2], [2, 0]] }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "Start a traversal from every vertex not yet visited; each fresh start is one component. Whether that traversal is BFS, DFS or a union-find merge makes no difference to the count.",
      approach: [
        "Build the adjacency list and a visited array.",
        "For each vertex 0 to n - 1: if unvisited, increment the count and traverse its whole component.",
        "Return the count.",
      ],
      bruteForce: { idea: "Check reachability between every pair.", time: "O(n² × (n + E))", space: "O(n)" },
      optimal: { idea: "One traversal per unvisited vertex, or disjoint-set union.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "A vertex with no edges is still a component — case 4 is four of them.",
        "A self-loop connects nothing new, so it does not reduce the count.",
        "Union-find gives the same answer as n minus the number of successful merges, which is worth writing once.",
      ],
      javaToolkit: ["Visited array", "Outer loop over all vertices", "Disjoint-set union as the alternative"],
    },
  },

  "bfs-graph": {
    slug: "bfs-graph",
    title: "BFS of a Graph",
    description:
      "Return the breadth-first traversal of an undirected graph starting at vertex 0, visiting each vertex's neighbours in ASCENDING order. Only the component containing 0 is reported.",
    constraints: ["1 ≤ n ≤ 10^4", "0 ≤ edges.length ≤ 2 × 10^4"],
    className: "Solution",
    methodName: "bfs",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> bfs(int n, int[][] edges) {
        // Start at 0; neighbours in ascending order.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5, edges: [[0, 1], [0, 2], [1, 3], [2, 4]] }, expectedOutput: [0, 1, 2, 3, 4] },
      { id: 2, inputs: { n: 4, edges: [[0, 3], [0, 1]] }, expectedOutput: [0, 1, 3], explanation: "Neighbours of 0 are visited in ascending order, and 2 is unreachable." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { n: 3, edges: [] }, expectedOutput: [0], isHidden: true },
      { id: 5, inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]] }, expectedOutput: [0, 1, 2, 3, 4], isHidden: true },
      { id: 6, inputs: { n: 6, edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]] }, expectedOutput: [0, 1, 2, 3, 4, 5], isHidden: true },
      { id: 7, inputs: { n: 4, edges: [[0, 1], [1, 0], [0, 2]] }, expectedOutput: [0, 1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "BFS explores in rings: everything one edge away, then everything two edges away, and so on. The queue is what enforces that, and it is why BFS — and not DFS — finds shortest paths in an unweighted graph.",
      approach: [
        "Build the adjacency list with sorted neighbours.",
        "Mark 0 visited and enqueue it.",
        "Poll a vertex, append it to the output, and enqueue each unvisited neighbour, marking it visited AS IT IS ENQUEUED.",
      ],
      optimal: { idea: "Queue plus a visited array.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "Mark a vertex visited when you ENQUEUE it, not when you dequeue it — otherwise a vertex with two neighbours in the same ring is queued twice and appears twice in the output.",
        "Only vertices reachable from 0 appear, so a disconnected graph gives a short list.",
        "A duplicate edge must not produce a duplicate visit, which case 7 checks.",
      ],
      javaToolkit: ["Queue<Integer> via ArrayDeque", "Visited-on-enqueue", "Sorted adjacency for determinism"],
    },
  },

  "dfs-graph": {
    slug: "dfs-graph",
    title: "DFS of a Graph",
    description:
      "Return the depth-first traversal of an undirected graph starting at vertex 0, visiting each vertex's neighbours in ASCENDING order. Only the component containing 0 is reported.",
    constraints: ["1 ≤ n ≤ 10^4", "0 ≤ edges.length ≤ 2 × 10^4"],
    className: "Solution",
    methodName: "dfs",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> dfs(int n, int[][] edges) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5, edges: [[0, 1], [0, 2], [1, 3], [2, 4]] }, expectedOutput: [0, 1, 3, 2, 4], explanation: "DFS follows 0 to 1 to 3 before backtracking to 2." },
      { id: 2, inputs: { n: 4, edges: [[0, 3], [0, 1]] }, expectedOutput: [0, 1, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { n: 3, edges: [] }, expectedOutput: [0], isHidden: true },
      { id: 5, inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]] }, expectedOutput: [0, 1, 2, 3, 4], isHidden: true },
      { id: 6, inputs: { n: 6, edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]] }, expectedOutput: [0, 1, 3, 4, 2, 5], isHidden: true },
      { id: 7, inputs: { n: 4, edges: [[0, 1], [0, 2], [1, 2], [2, 3]] }, expectedOutput: [0, 1, 2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "DFS commits: it follows one branch as far as it goes before considering any alternative. Compare case 1 with the BFS problem on the same graph — same vertices, a completely different order.",
      approach: [
        "Build the adjacency list with sorted neighbours.",
        "Recurse from 0: mark visited, append, then recurse into each unvisited neighbour in order.",
      ],
      optimal: { idea: "Recursion plus a visited array.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "The visited check must happen before recursing, or a cycle loops forever.",
        "Recursion depth reaches n on a path graph; an explicit stack avoids the risk, but pushing neighbours in REVERSE order is then needed to match the recursive order.",
        "DFS order is not shortest-path order, which is the substantive difference from BFS.",
      ],
      javaToolkit: ["Recursive DFS", "Visited-before-recurse", "Explicit stack with reversed pushes"],
    },
  },

  "number-provinces": {
    slug: "number-provinces",
    title: "Number of Provinces",
    description:
      "Given an n × n adjacency MATRIX where isConnected[i][j] is 1 when cities i and j are directly connected, return the number of provinces — groups of cities connected directly or indirectly.",
    constraints: ["1 ≤ n ≤ 200", "isConnected[i][j] is 0 or 1", "isConnected[i][i] is 1", "The matrix is symmetric"],
    className: "Solution",
    methodName: "findCircleNum",
    parameters: [{ name: "isConnected", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int findCircleNum(int[][] isConnected) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { isConnected: [[1, 1, 0], [1, 1, 0], [0, 0, 1]] }, expectedOutput: 2 },
      { id: 2, inputs: { isConnected: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] }, expectedOutput: 3 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { isConnected: [[1]] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { isConnected: [[1, 1], [1, 1]] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { isConnected: [[1, 0, 1], [0, 1, 0], [1, 0, 1]] }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { isConnected: [[1, 1, 0, 0], [1, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 1]] }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "This is connected-components with the graph handed over as a matrix instead of an edge list. Recognising that is the entire problem; the algorithm is unchanged.",
      approach: [
        "Treat row i as the neighbours of city i.",
        "For each unvisited city, traverse its whole province and increment the count.",
      ],
      bruteForce: { idea: "Compute the transitive closure of the matrix.", time: "O(n³)", space: "O(n²)" },
      optimal: { idea: "Traversal per unvisited city over the matrix rows.", time: "O(n²)", space: "O(n)" },
      pitfalls: [
        "The diagonal is always 1 and means nothing; a self-connection joins no one.",
        "Reading the matrix costs O(n²) whatever you do, so union-find does not improve the asymptotics here.",
        "Because the matrix is symmetric, visiting j from i is enough — there is no need to also check i from j.",
      ],
      javaToolkit: ["Matrix rows as adjacency", "Reusing components counting", "Symmetric matrix assumptions"],
    },
  },

  "flood-fill": {
    slug: "flood-fill",
    title: "Flood Fill",
    description:
      "Starting at (sr, sc), repaint that pixel and every pixel connected to it 4-directionally through pixels of the SAME original colour. Return the resulting image.",
    constraints: ["1 ≤ rows, cols ≤ 50", "0 ≤ colour values ≤ 2^16", "0 ≤ sr < rows", "0 ≤ sc < cols"],
    className: "Solution",
    methodName: "floodFill",
    parameters: [
      { name: "image", type: "int[][]" },
      { name: "sr", type: "int" },
      { name: "sc", type: "int" },
      { name: "newColor", type: "int" },
    ],
    returnType: "int[][]",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        // Four directions only.
        return image;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { image: [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr: 1, sc: 1, newColor: 2 }, expectedOutput: [[2, 2, 2], [2, 2, 0], [2, 0, 1]] },
      { id: 2, inputs: { image: [[0, 0, 0], [0, 0, 0]], sr: 0, sc: 0, newColor: 0 }, expectedOutput: [[0, 0, 0], [0, 0, 0]], explanation: "Repainting to the same colour must terminate." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { image: [[5]], sr: 0, sc: 0, newColor: 9 }, expectedOutput: [[9]], isHidden: true },
      { id: 4, inputs: { image: [[1, 2], [3, 4]], sr: 0, sc: 0, newColor: 7 }, expectedOutput: [[7, 2], [3, 4]], isHidden: true },
      { id: 5, inputs: { image: [[1, 1], [1, 1]], sr: 1, sc: 1, newColor: 3 }, expectedOutput: [[3, 3], [3, 3]], isHidden: true },
      { id: 6, inputs: { image: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], sr: 1, sc: 1, newColor: 2 }, expectedOutput: [[0, 2, 0], [2, 2, 2], [0, 2, 0]], isHidden: true },
    ],
    learn: {
      intuition:
        "A grid is a graph whose vertices are cells and whose edges join orthogonal neighbours of the same colour. Flood fill is then just a traversal that repaints as it goes.",
      approach: [
        "Record the starting colour and return immediately if it already equals the new one.",
        "DFS or BFS from (sr, sc), repainting any in-bounds neighbour whose colour matches the original.",
      ],
      optimal: { idea: "Grid traversal with in-place repainting.", time: "O(rows × cols)", space: "O(rows × cols)" },
      pitfalls: [
        "Without the same-colour early return, repainting to the original colour never marks progress and the traversal never ends — case 2 exists for exactly that.",
        "The repaint itself acts as the visited mark, so no separate visited array is needed.",
        "Diagonals do not connect; only the four orthogonal directions do.",
      ],
      javaToolkit: ["Grid as an implicit graph", "Direction arrays", "Repainting as the visited mark"],
    },
  },

  "number-of-islands": {
    slug: "number-of-islands",
    title: "Number of Islands",
    description:
      "The grid holds 1 for land and 0 for water. Return the number of islands — groups of land cells connected 4-directionally.",
    constraints: ["1 ≤ rows, cols ≤ 300", "grid[i][j] is 0 or 1"],
    className: "Solution",
    methodName: "numIslands",
    parameters: [{ name: "grid", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int numIslands(int[][] grid) {
        // 1 is land, 0 is water. Four directions.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { grid: [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]] }, expectedOutput: 3 },
      { id: 2, inputs: { grid: [[1, 1, 1], [1, 1, 1]] }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { grid: [[0]] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { grid: [[1]] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { grid: [[1, 0, 1], [0, 1, 0], [1, 0, 1]] }, expectedOutput: 5, isHidden: true },
      { id: 6, inputs: { grid: [[0, 0], [0, 0]] }, expectedOutput: 0, isHidden: true },
      { id: 7, inputs: { grid: [[1, 1, 1, 1, 0], [1, 1, 0, 1, 0], [1, 1, 0, 0, 0], [0, 0, 0, 0, 0]] }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Connected components again, this time on a grid. Each traversal started from an unvisited land cell sinks one entire island, so the number of starts is the answer.",
      approach: [
        "Scan every cell.",
        "On unvisited land, increment the count and traverse the whole island, marking cells visited.",
      ],
      bruteForce: { idea: "Compare every pair of land cells for connectivity.", time: "O((rows × cols)²)", space: "O(rows × cols)" },
      optimal: { idea: "Traversal from each unvisited land cell.", time: "O(rows × cols)", space: "O(rows × cols)" },
      pitfalls: [
        "Marking visited by overwriting the grid with 0 works and saves memory, but mutates the input — fine here, rude in real code.",
        "Diagonal touching does not connect: case 5 is five separate islands, not one.",
        "Bounds must be checked before every access, in all four directions.",
      ],
      javaToolkit: ["Scan-and-sink", "Direction arrays", "In-place visited marking"],
    },
  },

  "rotting-oranges": {
    slug: "rotting-oranges",
    title: "Rotting Oranges",
    description:
      "Each cell holds 0 for empty, 1 for a fresh orange and 2 for a rotten one. Every minute, a rotten orange rots its 4-directional fresh neighbours. Return the minutes until no fresh orange remains, or -1 if that never happens.",
    constraints: ["1 ≤ rows, cols ≤ 10", "grid[i][j] is 0, 1 or 2"],
    className: "Solution",
    methodName: "orangesRotting",
    parameters: [{ name: "grid", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int orangesRotting(int[][] grid) {
        // -1 when some fresh orange is unreachable.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] }, expectedOutput: 4 },
      { id: 2, inputs: { grid: [[2, 1, 1], [0, 1, 1], [1, 0, 1]] }, expectedOutput: -1, explanation: "The bottom-left orange has no rotten neighbour it can ever reach." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { grid: [[0, 2]] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { grid: [[0]] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { grid: [[1]] }, expectedOutput: -1, isHidden: true },
      { id: 6, inputs: { grid: [[2, 2], [1, 1]] }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { grid: [[2, 1, 1], [1, 1, 1], [0, 1, 2]] }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "The rot spreads one ring per minute from EVERY rotten orange at once — a multi-source BFS. Seeding the queue with all of them at the start makes the minute count simply the number of BFS levels.",
      approach: [
        "Enqueue every rotten cell and count the fresh ones.",
        "Process the queue level by level, rotting fresh neighbours and decrementing the fresh count; each completed level is one minute.",
        "Return the minutes if no fresh oranges remain, otherwise -1.",
      ],
      bruteForce: { idea: "Simulate minute by minute, rescanning the whole grid each time.", time: "O((rows × cols)²)", space: "O(1)" },
      optimal: { idea: "Multi-source BFS.", time: "O(rows × cols)", space: "O(rows × cols)" },
      pitfalls: [
        "A grid with no fresh oranges is 0 minutes, not -1 — cases 3 and 4 check both empty and already-rotten grids.",
        "Counting levels naively gives one too many, because the final level rots nothing; count completed EXPANSIONS instead.",
        "BFS from one source at a time gives the wrong answer; all sources start simultaneously.",
      ],
      javaToolkit: ["Multi-source BFS", "Level-by-level expansion", "Counting remaining targets"],
    },
  },

  "surrounded-regions": {
    slug: "surrounded-regions",
    title: "Surrounded Regions",
    description:
      "The board holds 0 for 'O' and 1 for 'X'. Flip every 0 that is NOT connected 4-directionally to a 0 on the border. Return the resulting board.",
    constraints: ["1 ≤ rows, cols ≤ 200", "board[i][j] is 0 or 1"],
    className: "Solution",
    methodName: "solve",
    parameters: [{ name: "board", type: "int[][]" }],
    returnType: "int[][]",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[][] solve(int[][] board) {
        // 0 is 'O', 1 is 'X'. Border-connected 0s survive.
        return board;
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { board: [[1, 1, 1, 1], [1, 0, 0, 1], [1, 1, 0, 1], [1, 0, 1, 1]] },
        expectedOutput: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 1, 1]],
        explanation: "The lone 0 on the bottom border survives; the enclosed ones do not.",
      },
      { id: 2, inputs: { board: [[0]] }, expectedOutput: [[0]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { board: [[1]] }, expectedOutput: [[1]], isHidden: true },
      { id: 4, inputs: { board: [[0, 0], [0, 0]] }, expectedOutput: [[0, 0], [0, 0]], isHidden: true },
      { id: 5, inputs: { board: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] }, expectedOutput: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], isHidden: true },
      { id: 6, inputs: { board: [[1, 0, 1], [1, 0, 1], [1, 1, 1]] }, expectedOutput: [[1, 0, 1], [1, 0, 1], [1, 1, 1]], isHidden: true },
      { id: 7, inputs: { board: [[0, 1, 1], [1, 0, 1], [1, 1, 0]] }, expectedOutput: [[0, 1, 1], [1, 1, 1], [1, 1, 0]], isHidden: true },
    ],
    learn: {
      intuition:
        "Testing whether each region is enclosed is awkward; inverting the question is not. Find what SURVIVES — everything reachable from a border 0 — and flip all the rest. One traversal from the border replaces one traversal per region.",
      approach: [
        "Traverse from every 0 on the four borders, marking reached cells as safe.",
        "Sweep the board: every unmarked 0 becomes 1, every marked cell becomes 0 again.",
      ],
      bruteForce: { idea: "For each region, traverse it and test whether it touches the border.", time: "O(rows × cols)", space: "O(rows × cols)" },
      optimal: { idea: "Border-seeded traversal, then flip the rest.", time: "O(rows × cols)", space: "O(rows × cols)" },
      pitfalls: [
        "A 0 diagonally adjacent to a border 0 is NOT connected to it — case 7's middle cell is flipped for that reason.",
        "A region touching the border anywhere survives entirely, however large it is.",
        "Using a temporary marker value avoids a second array but must be undone in the final sweep.",
      ],
      javaToolkit: ["Inverting the question", "Border-seeded traversal", "Temporary marker values"],
    },
  },

  "clone-graph": {
    slug: "clone-graph",
    title: "Clone a Graph",
    description:
      "Build the undirected graph from n and edges, produce a DEEP COPY of it — every node newly allocated — and return the copy's adjacency list with each vertex's neighbours in ASCENDING order. Vertices are labelled 0 to n - 1.",
    constraints: ["1 ≤ n ≤ 100", "0 ≤ edges.length ≤ 1000", "No self-loops or duplicate edges"],
    className: "Solution",
    methodName: "cloneGraph",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> cloneGraph(int n, int[][] edges) {
        // Build the graph as node objects, deep-copy it, then describe the copy.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 4, edges: [[0, 1], [0, 3], [1, 2], [2, 3]] }, expectedOutput: [[1, 3], [0, 2], [1, 3], [0, 2]] },
      { id: 2, inputs: { n: 1, edges: [] }, expectedOutput: [[]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 2, edges: [[0, 1]] }, expectedOutput: [[1], [0]], isHidden: true },
      { id: 4, inputs: { n: 3, edges: [] }, expectedOutput: [[], [], []], isHidden: true },
      { id: 5, inputs: { n: 3, edges: [[0, 1], [1, 2], [2, 0]] }, expectedOutput: [[1, 2], [0, 2], [0, 1]], isHidden: true },
      { id: 6, inputs: { n: 5, edges: [[0, 1], [2, 3]] }, expectedOutput: [[1], [0], [3], [2], []], isHidden: true },
    ],
    learn: {
      intuition:
        "A graph copy cannot be made in one pass, because a node's neighbour may not exist yet when you reach it. Keep a map from original to copy: create a node the first time you meet it, reuse it every time after, and the cycles take care of themselves.",
      approach: [
        "Build the original graph as node objects with neighbour lists.",
        "Traverse it. On reaching a node, create its copy if the map does not have one, then recurse into each neighbour and attach the returned copies.",
        "Read the copy's adjacency list back out, sorting each row.",
      ],
      bruteForce: { idea: "Copy all nodes first, then wire the edges in a second pass.", time: "O(n + E)", space: "O(n)" },
      optimal: { idea: "Single traversal with an original-to-copy map.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "Without the map, a cycle makes the copy recurse forever — the map is both the memo and the visited set.",
        "Reusing the original nodes produces something that prints correctly but is not a copy.",
        "Disconnected components need the traversal restarted, which case 6 checks.",
      ],
      javaToolkit: ["Map<Node, Node> as memo and visited", "Copy-on-first-visit", "Restarting for disconnected components"],
    },
  },

  "detect-cycle-undirected": {
    slug: "detect-cycle-undirected",
    title: "Detect a Cycle in an Undirected Graph",
    description:
      "Return whether the undirected graph contains a cycle. There are no self-loops or duplicate edges, and the graph may be disconnected.",
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ edges.length ≤ 10^5", "No self-loops or parallel edges"],
    className: "Solution",
    methodName: "hasCycle",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public boolean hasCycle(int n, int[][] edges) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 4, edges: [[0, 1], [1, 2], [2, 3], [3, 0]] }, expectedOutput: true },
      { id: 2, inputs: { n: 4, edges: [[0, 1], [1, 2], [2, 3]] }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [] }, expectedOutput: false, isHidden: true },
      { id: 4, inputs: { n: 3, edges: [[0, 1], [1, 2], [0, 2]] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { n: 5, edges: [[0, 1], [2, 3], [3, 4], [4, 2]] }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { n: 2, edges: [[0, 1]] }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { n: 6, edges: [[0, 1], [1, 2], [3, 4]] }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "In an undirected graph every edge can be walked back along, so meeting an already-visited vertex is only a cycle if you did not arrive from it. Carrying the PARENT through the traversal is what distinguishes the two.",
      approach: [
        "Traverse each component, passing the vertex you came from.",
        "A visited neighbour that is not the parent closes a cycle.",
        "Restart from every unvisited vertex so disconnected components are covered.",
      ],
      bruteForce: { idea: "Remove edges one at a time and test connectivity.", time: "O(E × (n + E))", space: "O(n)" },
      optimal: { idea: "DFS with a parent check, or union-find on the edges.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "Without the parent check every single edge looks like a cycle.",
        "The cycle may be in a component that does not contain vertex 0, which case 5 checks.",
        "Union-find is often cleaner here: an edge whose endpoints already share a root closes a cycle.",
      ],
      javaToolkit: ["DFS carrying a parent", "Disjoint-set union", "Restarting per component"],
    },
  },

  "detect-cycle-directed": {
    slug: "detect-cycle-directed",
    title: "Detect a Cycle in a Directed Graph",
    description:
      "Return whether the directed graph contains a cycle. Each edge [u, v] goes from u to v only. The graph may be disconnected.",
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ edges.length ≤ 10^5"],
    className: "Solution",
    methodName: "hasCycle",
    parameters: [
      { name: "n", type: "int" },
      { name: "edges", type: "int[][]" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public boolean hasCycle(int n, int[][] edges) {
        // Directed: [u, v] means u -> v only.
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 3, edges: [[0, 1], [1, 2], [2, 0]] }, expectedOutput: true },
      { id: 2, inputs: { n: 3, edges: [[0, 1], [0, 2], [1, 2]] }, expectedOutput: false, explanation: "Two routes to the same vertex are not a cycle in a directed graph." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, edges: [[0, 0]] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { n: 2, edges: [[0, 1], [1, 0]] }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { n: 4, edges: [[0, 1], [1, 2], [2, 3]] }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { n: 5, edges: [[0, 1], [2, 3], [3, 4], [4, 2]] }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { n: 4, edges: [] }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Direction changes the test entirely. A cycle exists only if you reach a vertex that is still ON the current path — one whose exploration has begun but not finished. Two visited states are not enough; you need three, or equivalently a separate on-path flag.",
      approach: [
        "DFS marking each vertex as in-progress on entry and done on exit.",
        "Reaching an in-progress vertex means a cycle; reaching a done one means nothing.",
        "Restart from every unvisited vertex.",
      ],
      bruteForce: { idea: "Search for a path from v back to u for every edge.", time: "O(E × (n + E))", space: "O(n)" },
      optimal: { idea: "DFS with in-progress and done states, or Kahn's algorithm.", time: "O(n + E)", space: "O(n)" },
      pitfalls: [
        "The undirected parent trick does NOT transfer — case 2 has two paths to vertex 2 and no cycle at all.",
        "The in-progress flag must be cleared on the way out, or unrelated branches report false cycles.",
        "Kahn's algorithm gives the same answer: if fewer than n vertices come off the queue, a cycle exists.",
      ],
      javaToolkit: ["Three-colour DFS", "Clearing the on-path flag on exit", "Kahn's algorithm as the alternative"],
    },
  },
}
