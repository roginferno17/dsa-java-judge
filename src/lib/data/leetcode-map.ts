/**
 * Curriculum problem slug -> LeetCode problem slug.
 *
 * Hand-written, because the two naming schemes have nothing in common:
 * kadanes-algorithm is maximum-subarray, sort-012 is sort-colors. There is no
 * rule to derive one from the other.
 *
 * Only the SLUG lives here. Titles, difficulties and whether a problem is
 * Premium are pulled from LeetCode's catalogue by scripts/fetch-leetcode.mjs,
 * so nothing here can drift from the real problem, and a slug that does not
 * exist fails the build instead of shipping a dead link.
 *
 * A problem with no honest equivalent is simply absent. Showing no link beats
 * sending someone to a problem that only half matches — most of Step 1 is Java
 * syntax, and most of the doubly-linked-list work has no LeetCode counterpart
 * at all.
 *
 * Use the object form with a `note` when the target is an ANALOGUE rather than
 * the same problem, so the UI can say so.
 */

type Entry = string | { slug: string; note: string }

export const leetcodeMap: Record<string, Entry | Entry[]> = {
  // ---------------------------------------------------------------- Step 1
  // Mostly language basics with no LeetCode counterpart; only the maths and
  // recursion exercises map onto real problems.
  "reverse-a-number": "reverse-integer",
  "check-palindrome": "palindrome-number",
  "gcd-or-hcf": {
    slug: "find-greatest-common-divisor-of-array",
    note: "Same Euclidean GCD, applied across an array.",
  },
  "check-for-prime": {
    slug: "count-primes",
    note: "Primality testing scaled up to a sieve — Step 8 returns to this.",
  },
  "fibonacci-number": "fibonacci-number",
  "reverse-array-recursion": "reverse-string",
  "string-palindrome-recursion": "valid-palindrome",
  "highest-lowest-frequency": {
    slug: "top-k-frequent-elements",
    note: "The same frequency map, then asked for the top k rather than one.",
  },

  // ---------------------------------------------------------------- Step 2
  // LeetCode has one sorting problem; it accepts any correct O(n log n) sort.
  "merge-sort": { slug: "sort-an-array", note: "Accepts any O(n log n) sort — write merge sort here." },
  "quick-sort": { slug: "sort-an-array", note: "Accepts any O(n log n) sort — write quicksort here." },

  // ---------------------------------------------------------------- Step 3
  "check-sorted-array": "check-if-array-is-sorted-and-rotated",
  "remove-duplicates-sorted": "remove-duplicates-from-sorted-array",
  "left-rotate-one": { slug: "rotate-array", note: "The general case; rotating by one is k = 1." },
  "left-rotate-d": "rotate-array",
  "move-zeros-end": "move-zeroes",
  "find-missing-number": "missing-number",
  "max-consecutive-ones": "max-consecutive-ones",
  "find-unique-number": "single-number",
  "two-sum": "two-sum",
  "sort-012": "sort-colors",
  "majority-element": "majority-element",
  "kadanes-algorithm": "maximum-subarray",
  "max-subarray-extended": {
    slug: "maximum-subarray",
    note: "Same problem; the extension is returning the subarray's bounds too.",
  },
  "stock-buy-sell": "best-time-to-buy-and-sell-stock",
  "rearrange-alternating": "rearrange-array-elements-by-sign",
  "next-permutation": "next-permutation",
  "longest-consecutive-sequence": "longest-consecutive-sequence",
  "set-matrix-zeros": "set-matrix-zeroes",
  "rotate-matrix-90": "rotate-image",
  "spiral-matrix": "spiral-matrix",
  "count-subarrays-sum": "subarray-sum-equals-k",
  "pascals-triangle": "pascals-triangle",
  "majority-element-n3": "majority-element-ii",
  "three-sum": "3sum",
  "four-sum": "4sum",
  "largest-subarray-0-sum": {
    slug: "contiguous-array",
    note: "The 0/1 case of the same prefix-sum-in-a-map idea.",
  },
  "merge-overlapping-intervals": "merge-intervals",
  "merge-sorted-arrays": "merge-sorted-array",
  "repeating-missing": "set-mismatch",
  "reverse-pairs": "reverse-pairs",
  "max-product-subarray": "maximum-product-subarray",

  // ---------------------------------------------------------------- Step 4
  "binary-search-x": "binary-search",
  "lower-bound": { slug: "search-insert-position", note: "Lower bound by another name." },
  "upper-bound": { slug: "search-insert-position", note: "Upper bound is the same search with a > instead of a >=." },
  "search-insert-position": "search-insert-position",
  "first-last-occurrence": "find-first-and-last-position-of-element-in-sorted-array",
  "count-occurrences": {
    slug: "find-first-and-last-position-of-element-in-sorted-array",
    note: "The count is last - first + 1.",
  },
  "search-rotated-1": "search-in-rotated-sorted-array",
  "search-rotated-2": "search-in-rotated-sorted-array-ii",
  "min-rotated-sorted": "find-minimum-in-rotated-sorted-array",
  "count-rotations": {
    slug: "find-minimum-in-rotated-sorted-array",
    note: "The rotation count is the index of the minimum.",
  },
  "single-element-sorted": "single-element-in-a-sorted-array",
  "find-peak-element": "find-peak-element",
  "square-root": "sqrtx",
  "koko-eating-bananas": "koko-eating-bananas",
  "min-days-bouquets": "minimum-number-of-days-to-make-m-bouquets",
  "smallest-divisor": "find-the-smallest-divisor-given-a-threshold",
  "ship-packages": "capacity-to-ship-packages-within-d-days",
  "kth-missing-positive": "kth-missing-positive-number",
  "aggressive-cows": {
    slug: "magnetic-force-between-two-balls",
    note: "Aggressive Cows with the story changed — maximise the minimum gap.",
  },
  "book-allocation": {
    slug: "split-array-largest-sum",
    note: "Identical: minimise the largest contiguous group.",
  },
  "split-array-largest-sum": "split-array-largest-sum",
  "painters-partition": {
    slug: "split-array-largest-sum",
    note: "Identical: minimise the largest contiguous group.",
  },
  "median-two-sorted": "median-of-two-sorted-arrays",
  "search-2d-matrix": "search-a-2d-matrix",
  "search-row-col-sorted": "search-a-2d-matrix-ii",
  "find-peak-2d": "find-a-peak-element-ii",

  // ---------------------------------------------------------------- Step 5
  "remove-outer-parenthesis": "remove-outermost-parentheses",
  "reverse-words-palindrome": "reverse-words-in-a-string",
  "largest-odd-number": "largest-odd-number-in-string",
  "longest-common-prefix": "longest-common-prefix",
  "isomorphic-string": "isomorphic-strings",
  "string-rotation": "rotate-string",
  "anagram-check": "valid-anagram",
  "sort-by-frequency": "sort-characters-by-frequency",
  "max-nesting-depth": "maximum-nesting-depth-of-the-parentheses",
  "roman-integer": "roman-to-integer",
  "implement-atoi": "string-to-integer-atoi",
  "count-substrings": {
    slug: "subarrays-with-k-different-integers",
    note: "The exactly-k counting trick, on numbers instead of letters.",
  },
  "longest-palindrome-substring": "longest-palindromic-substring",
  "reverse-every-word": "reverse-words-in-a-string-iii",

  // ---------------------------------------------------------------- Step 6
  // The doubly-linked-list problems have no LeetCode counterpart and are absent.
  "delete-node-ll": "delete-node-in-a-linked-list",
  "middle-linked-list": "middle-of-the-linked-list",
  "reverse-ll-iterative": "reverse-linked-list",
  "reverse-ll-recursive": { slug: "reverse-linked-list", note: "Same problem — write the recursive version." },
  "detect-loop-ll": "linked-list-cycle",
  "starting-point-loop": "linked-list-cycle-ii",
  "length-loop-ll": {
    slug: "linked-list-cycle-ii",
    note: "Find the entry point first; the length falls out of one more lap.",
  },
  "palindrome-ll": "palindrome-linked-list",
  "segregate-odd-even": "odd-even-linked-list",
  "remove-nth-back": "remove-nth-node-from-end-of-list",
  "delete-middle-node": "delete-the-middle-node-of-a-linked-list",
  "sort-linked-list": "sort-list",
  "sort-012-ll": { slug: "sort-list", note: "The general sort; with only three values, relinking beats it." },
  "intersection-y-ll": "intersection-of-two-linked-lists",
  "add-two-numbers-ll": "add-two-numbers",
  "remove-duplicates-dll": {
    slug: "remove-duplicates-from-sorted-list",
    note: "Singly linked, but the same walk.",
  },
  "reverse-k-group": "reverse-nodes-in-k-group",
  "rotate-linked-list": "rotate-list",
  "clone-random-pointer": "copy-list-with-random-pointer",

  // ---------------------------------------------------------------- Step 7
  "recursive-atoi": { slug: "string-to-integer-atoi", note: "Same problem — write it recursively." },
  "pow-x-n": "powx-n",
  "count-good-numbers": "count-good-numbers",
  "generate-parenthesis": "generate-parentheses",
  "print-subsequences": "subsets",
  "combination-sum": "combination-sum",
  "combination-sum-2": "combination-sum-ii",
  "subset-sum-1": { slug: "subsets", note: "Generate the subsets, then sum each." },
  "subset-sum-2": "subsets-ii",
  "combination-sum-3": "combination-sum-iii",
  "letter-combinations-phone": "letter-combinations-of-a-phone-number",
  "palindrome-partitioning": "palindrome-partitioning",
  "word-search": "word-search",
  "n-queen": "n-queens",
  "rat-in-maze": {
    slug: "unique-paths-iii",
    note: "Grid backtracking with blocked cells — the same shape as the maze.",
  },
  "word-break": "word-break",
  "sudoku-solver": "sudoku-solver",
  "expression-add-operators": "expression-add-operators",

  // ---------------------------------------------------------------- Step 8
  "power-of-two": "power-of-two",
  "count-set-bits": "number-of-1-bits",
  "divide-without-ops": "divide-two-integers",
  "count-bits-flip": "minimum-bit-flips-to-convert-number",
  "odd-occurrence": "single-number",
  "power-set-bit": { slug: "subsets", note: "Same enumeration — do it with bitmasks rather than recursion." },
  "xor-l-to-r": { slug: "xor-operation-in-an-array", note: "Warm-up for the prefix-XOR identity." },
  "two-odd-occurrence": "single-number-iii",
  "sieve-of-eratosthenes": "count-primes",
  "power-n-x": "powx-n",

  // ---------------------------------------------------------------- Step 9
  // The six infix/prefix/postfix conversions have no LeetCode counterpart.
  "stack-using-queue": "implement-stack-using-queues",
  "queue-using-stack": "implement-queue-using-stacks",
  "balanced-parenthesis": "valid-parentheses",
  "min-stack": "min-stack",
  "next-greater-element": "next-greater-element-i",
  "next-greater-element-2": "next-greater-element-ii",
  "trapping-rainwater": "trapping-rain-water",
  "sum-subarray-min": "sum-of-subarray-minimums",
  "asteroid-collision": "asteroid-collision",
  "sum-subarray-ranges": "sum-of-subarray-ranges",
  "remove-k-digits": "remove-k-digits",
  "largest-rectangle-histogram": "largest-rectangle-in-histogram",
  "maximal-rectangles": "maximal-rectangle",
  "sliding-window-max": "sliding-window-maximum",
  "stock-span": "online-stock-span",
  "lru-cache": "lru-cache",
  "lfu-cache": "lfu-cache",

  // ---------------------------------------------------------------- Step 10
  "longest-substring-no-repeat": "longest-substring-without-repeating-characters",
  "max-consecutive-ones-3": "max-consecutive-ones-iii",
  "fruit-into-baskets": "fruit-into-baskets",
  "longest-repeating-replacement": "longest-repeating-character-replacement",
  "binary-subarray-sum": "binary-subarrays-with-sum",
  "count-nice-subarrays": "count-number-of-nice-subarrays",
  "substring-all-three": "number-of-substrings-containing-all-three-characters",
  "max-points-cards": "maximum-points-you-can-obtain-from-cards",
  "subarray-k-different": "subarrays-with-k-different-integers",
  "min-window-substring": "minimum-window-substring",

  // ---------------------------------------------------------------- Step 11
  "kth-largest-element": "kth-largest-element-in-an-array",
  "kth-smallest-element": {
    slug: "kth-largest-element-in-an-array",
    note: "The kth smallest is the (n - k + 1)th largest — flip the comparator.",
  },
  "merge-m-sorted-lists": "merge-k-sorted-lists",
  "replace-by-rank": "rank-transform-of-an-array",
  "task-scheduler": "task-scheduler",
  "hands-of-straights": "hand-of-straights",
  "design-twitter": "design-twitter",
  "kth-largest-stream": "kth-largest-element-in-a-stream",
  "find-median-stream": "find-median-from-data-stream",
  "k-most-frequent": "top-k-frequent-elements",

  // ---------------------------------------------------------------- Step 12
  "assign-cookies": "assign-cookies",
  "min-coins-greedy": {
    slug: "coin-change",
    note: "Where greedy breaks: with coins {1,3,4} and amount 6 it takes three, not two.",
  },
  "lemonade-change": "lemonade-change",
  "valid-parenthesis-checker": "valid-parenthesis-string",
  "n-meetings-room": {
    slug: "non-overlapping-intervals",
    note: "The same activity-selection greedy, counting what you must drop.",
  },
  "jump-game": "jump-game",
  "jump-game-2": "jump-game-ii",
  "candy": "candy",
  "lru-page-replacement": { slug: "lru-cache", note: "The eviction policy, as a data structure." },
  "insert-interval": "insert-interval",
  "merge-intervals": "merge-intervals",
  "non-overlapping-intervals": "non-overlapping-intervals",

  // ---------------------------------------------------------------- Step 13
  "preorder-traversal": "binary-tree-preorder-traversal",
  "inorder-traversal": "binary-tree-inorder-traversal",
  "postorder-traversal": "binary-tree-postorder-traversal",
  "level-order-traversal": "binary-tree-level-order-traversal",
  "iterative-preorder": { slug: "binary-tree-preorder-traversal", note: "Same problem — write it with an explicit stack." },
  "iterative-inorder": { slug: "binary-tree-inorder-traversal", note: "Same problem — write it with an explicit stack." },
  "postorder-2-stack": { slug: "binary-tree-postorder-traversal", note: "Same problem — write it with two stacks." },
  "postorder-1-stack": { slug: "binary-tree-postorder-traversal", note: "Same problem — write it with one stack." },
  "height-binary-tree": "maximum-depth-of-binary-tree",
  "height-balanced": "balanced-binary-tree",
  "diameter-binary-tree": "diameter-of-binary-tree",
  "max-path-sum": "binary-tree-maximum-path-sum",
  "identical-trees": "same-tree",
  "zigzag-traversal": "binary-tree-zigzag-level-order-traversal",
  "vertical-traversal": "vertical-order-traversal-of-a-binary-tree",
  "top-view": {
    slug: "vertical-order-traversal-of-a-binary-tree",
    note: "Top view is the first node in each vertical column.",
  },
  "bottom-view": {
    slug: "vertical-order-traversal-of-a-binary-tree",
    note: "Bottom view is the last node in each vertical column.",
  },
  "right-left-view": "binary-tree-right-side-view",
  "symmetric-tree": "symmetric-tree",
  "root-to-node-path": { slug: "binary-tree-paths", note: "All root-to-leaf paths; one root-to-node path is the same walk." },
  "lca-binary-tree": "lowest-common-ancestor-of-a-binary-tree",
  "max-width-binary-tree": "maximum-width-of-binary-tree",
  "nodes-distance-k": "all-nodes-distance-k-in-binary-tree",
  "burn-binary-tree": "amount-of-time-for-binary-tree-to-be-infected",
  "count-complete-tree": "count-complete-tree-nodes",
  "construct-inorder-preorder": "construct-binary-tree-from-preorder-and-inorder-traversal",
  "construct-postorder-inorder": "construct-binary-tree-from-inorder-and-postorder-traversal",

  // ---------------------------------------------------------------- Step 14
  "search-bst": "search-in-a-binary-search-tree",
  "inorder-successor-predecessor": "inorder-successor-in-bst",
  "insert-bst": "insert-into-a-binary-search-tree",
  "delete-bst": "delete-node-in-a-bst",
  "kth-element-bst": "kth-smallest-element-in-a-bst",
  "validate-bst": "validate-binary-search-tree",
  "lca-bst": "lowest-common-ancestor-of-a-binary-search-tree",
  "pair-sum-bst": "two-sum-iv-input-is-a-bst",
  "bst-to-greater-sum": "binary-search-tree-to-greater-sum-tree",
  "recover-bst": "recover-binary-search-tree",
  "count-bst-range": "range-sum-of-bst",
  "predecessor-successor": "inorder-successor-in-bst",

  // ---------------------------------------------------------------- Step 15
  "connected-components": "number-of-provinces",
  "number-provinces": "number-of-provinces",
  "flood-fill": "flood-fill",
  "number-of-islands": "number-of-islands",
  "rotting-oranges": "rotting-oranges",
  "surrounded-regions": "surrounded-regions",
  "clone-graph": "clone-graph",
  "detect-cycle-undirected": {
    slug: "redundant-connection",
    note: "Finds the edge that closes a cycle — the same union-find check.",
  },
  "detect-cycle-directed": {
    slug: "course-schedule",
    note: "Feasible exactly when the prerequisite graph is acyclic.",
  },
  "shortest-path-undirected": {
    slug: "shortest-path-in-binary-matrix",
    note: "Unweighted shortest path, on a grid rather than an edge list.",
  },
  "word-ladder": "word-ladder",
  "dijkstra": "network-delay-time",
  "shortest-path-binary-matrix": "shortest-path-in-binary-matrix",
  "cheapest-flights": "cheapest-flights-within-k-stops",
  "prims-mst": "min-cost-to-connect-all-points",
  "kruskal-mst": {
    slug: "min-cost-to-connect-all-points",
    note: "Same MST — sort the edges and union-find instead of growing one tree.",
  },
  "bridges-graph": "critical-connections-in-a-network",
  "topological-sort": "course-schedule-ii",
  "course-schedule": "course-schedule",

  // ---------------------------------------------------------------- Step 16
  "climbing-stairs": "climbing-stairs",
  "house-robber": "house-robber",
  "house-robber-2": "house-robber-ii",
  "max-sum-non-adjacent": { slug: "house-robber", note: "House Robber with negatives allowed." },
  "unique-paths": "unique-paths",
  "unique-paths-2": "unique-paths-ii",
  "min-path-sum": "minimum-path-sum",
  "min-path-triangle": "triangle",
  "cherry-pickup": "cherry-pickup-ii",
  "longest-common-subsequence": "longest-common-subsequence",
  "longest-palindromic-subsequence": "longest-palindromic-subsequence",
  "longest-palindromic-substring-dp": "longest-palindromic-substring",
  "edit-distance": "edit-distance",
  "partition-equal-subset": "partition-equal-subset-sum",
  "coin-change": "coin-change",
  "target-sum": "target-sum",
  "coin-change-2": "coin-change-ii",
  "stock-buy-sell-dp": "best-time-to-buy-and-sell-stock",
  "stock-cooldown": "best-time-to-buy-and-sell-stock-with-cooldown",
  "stock-fee": "best-time-to-buy-and-sell-stock-with-transaction-fee",
  "stock-3": "best-time-to-buy-and-sell-stock-iii",
  "stock-4": "best-time-to-buy-and-sell-stock-iv",
  "longest-increasing-subsequence": "longest-increasing-subsequence",
  "lis-binary-search": { slug: "longest-increasing-subsequence", note: "Same problem — get it to O(n log n)." },
  "largest-square-matrix": "maximal-square",
  "count-squares": "count-square-submatrices-with-all-ones",

  // ---------------------------------------------------------------- Step 17
  "implement-trie": "implement-trie-prefix-tree",
  "implement-trie-2": { slug: "design-add-and-search-words-data-structure", note: "The same trie, asked to do more." },
  "longest-common-prefix-trie": "longest-common-prefix",
  "max-xor-two-numbers": "maximum-xor-of-two-numbers-in-an-array",
  "max-xor-element": "maximum-xor-with-an-element-from-array",

  // ---------------------------------------------------------------- Step 18
  "kmp-algorithm": {
    slug: "find-the-index-of-the-first-occurrence-in-a-string",
    note: "The problem KMP exists to solve.",
  },
  "rabin-karp": {
    slug: "repeated-string-match",
    note: "Substring search where a rolling hash pays off.",
  },
  "longest-palindrome-advanced": { slug: "longest-palindromic-substring", note: "Same problem — get it to O(n) with Manacher's." },
  "min-insert-palindrome": "minimum-insertion-steps-to-make-a-string-palindrome",
  "count-and-say": "count-and-say",
  "repeated-string-match": "repeated-string-match",
  "longest-happy-prefix": "longest-happy-prefix",
  "shortest-palindrome": "shortest-palindrome",
  "string-rotation-advanced": "rotate-string",

  // ---- Deliberately included to let the generator decide -------------------
  // These are the right match, but several are LeetCode Premium. Rather than
  // guess, they are listed and the generator reports and drops any that are
  // paywalled — a link nobody can open is worse than no link.
  "celebrity-problem": "find-the-celebrity",
  "longest-substring-k-distinct": "longest-substring-with-at-most-k-distinct-characters",
  "min-window-subsequence": "minimum-window-subsequence",
  "connect-n-ropes": "minimum-cost-to-connect-sticks",
  "min-platforms": {
    slug: "car-pooling",
    note: "The same sweep over overlapping intervals, counting the peak.",
  },
  "boundary-traversal": "boundary-of-binary-tree",
  "longest-subarray-sum-k": {
    slug: "subarray-sum-equals-k",
    note: "Counts them rather than measuring the longest, but the same prefix-sum map.",
  },
  "add-one-ll": { slug: "plus-one", note: "The same carry, on an array instead of a list." },
  "floor-bst": "closest-binary-search-tree-value",
  "count-inversions": "global-and-local-inversions",
  "longest-common-substring": "maximum-length-of-repeated-subarray",
  "subset-sum-target": "partition-equal-subset-sum",
  "knapsack-01": "ones-and-zeroes",
  "articulation-point": "critical-connections-in-a-network",
  "shortest-path-dag": "parallel-courses-iii",
  "merge-two-bsts": "all-elements-in-two-binary-search-trees",
  "ceil-bst": "closest-binary-search-tree-value",
  "count-distinct-substrings": "count-unique-characters-of-all-substrings-of-a-given-string",
}
