import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 11 — Heap problems (13).
 *
 * The recurring move is a heap of BOUNDED size. Keeping only the k best seen so
 * far turns an O(n log n) sort into O(n log k), and — more importantly — works on
 * a stream, where sorting is not an option at all.
 */
export const step11Problems: Record<string, ProblemMetadata> = {
  "kth-largest-element": {
    slug: "kth-largest-element",
    title: "Kth Largest Element in an Array",
    description:
      "Return the kth largest element, counting duplicates as separate elements — so in [3,2,3,1,2,4,5,5,6] the 4th largest is 4.",
    constraints: ["1 ≤ k ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
    className: "Solution",
    methodName: "findKthLargest",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 2, 1, 5, 6, 4], k: 2 }, expectedOutput: 5 },
      { id: 2, inputs: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }, expectedOutput: 4, explanation: "Descending: 6,5,5,4 — duplicates each take a place." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [2, 2, 2], k: 2 }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { nums: [7, 6, 5, 4, 3, 2, 1], k: 7 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [-1, -2, -3], k: 1 }, expectedOutput: -1, isHidden: true },
      { id: 7, inputs: { nums: [5, 1, 5, 1, 5], k: 3 }, expectedOutput: 5, isHidden: true },
    ],
    learn: {
      intuition:
        "You do not need the whole array sorted, only the k largest — and of those, only the smallest. A MIN-heap capped at size k holds exactly that set, and its root is the answer.",
      approach: [
        "Push each value into a min-heap.",
        "When the heap exceeds k, poll — that removes the smallest of the k + 1 best, which cannot be the answer.",
        "The root at the end is the kth largest.",
      ],
      bruteForce: { idea: "Sort and index from the end.", time: "O(n log n)", space: "O(1)" },
      optimal: { idea: "Min-heap of size k, or quickselect for O(n) average.", time: "O(n log k)", space: "O(k)" },
      pitfalls: [
        "The instinct is a MAX-heap; the right answer is a min-heap, because you want to discard the weakest of the leaders.",
        "Duplicates occupy separate ranks — [5,1,5,1,5] with k = 3 is 5, not 1.",
        "Quickselect is O(n) on average but O(n²) in the worst case unless the pivot is randomised.",
      ],
      javaToolkit: ["PriorityQueue<Integer> capped at k", "Why a min-heap finds the largest", "Quickselect as the alternative"],
    },
  },

  "kth-smallest-element": {
    slug: "kth-smallest-element",
    title: "Kth Smallest Element in an Array",
    description: "Return the kth smallest element, counting duplicates as separate elements.",
    constraints: ["1 ≤ k ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
    className: "Solution",
    methodName: "findKthSmallest",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int findKthSmallest(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [7, 10, 4, 3, 20, 15], k: 3 }, expectedOutput: 7 },
      { id: 2, inputs: { nums: [7, 10, 4, 3, 20, 15], k: 4 }, expectedOutput: 10 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [3, 3, 3], k: 3 }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3, 4, 5], k: 5 }, expectedOutput: 5, isHidden: true },
      { id: 6, inputs: { nums: [-5, -1, -3], k: 2 }, expectedOutput: -3, isHidden: true },
      { id: 7, inputs: { nums: [9, 9, 1, 1], k: 2 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "The mirror of the previous problem, so the heap flips too: a MAX-heap capped at k holds the k smallest seen, and its root is the largest of them — the kth smallest.",
      approach: [
        "Push each value into a max-heap.",
        "When the heap exceeds k, poll away the largest.",
        "The root at the end is the answer.",
      ],
      bruteForce: { idea: "Sort and index from the front.", time: "O(n log n)", space: "O(1)" },
      optimal: { idea: "Max-heap of size k.", time: "O(n log k)", space: "O(k)" },
      pitfalls: [
        "Java's PriorityQueue is a MIN-heap by default; pass Collections.reverseOrder() for the max version.",
        "Negating every value and reusing a min-heap works too, but overflows at Integer.MIN_VALUE.",
        "Duplicates take separate ranks here as well.",
      ],
      javaToolkit: ["PriorityQueue with a reverse comparator", "Bounded heap", "The min/max mirror"],
    },
  },

  "sort-k-sorted": {
    slug: "sort-k-sorted",
    title: "Sort a Nearly Sorted (K-Sorted) Array",
    description:
      "Every element sits at most k positions away from where it belongs in sorted order. Return the fully sorted array, doing better than a general sort.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "0 ≤ k < nums.length", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "sortKSorted",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] sortKSorted(int[] nums, int k) {
        // Aim for O(n log k), not O(n log n).
        return nums;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [6, 5, 3, 2, 8, 10, 9], k: 3 }, expectedOutput: [2, 3, 5, 6, 8, 9, 10] },
      { id: 2, inputs: { nums: [10, 9, 8, 7, 4, 70, 60, 50], k: 4 }, expectedOutput: [4, 7, 8, 9, 10, 50, 60, 70] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 2, 3], k: 0 }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 4, inputs: { nums: [2, 1], k: 1 }, expectedOutput: [1, 2], isHidden: true },
      { id: 5, inputs: { nums: [3, 3, 3, 3], k: 2 }, expectedOutput: [3, 3, 3, 3], isHidden: true },
      { id: 6, inputs: { nums: [5, 4, 3, 2, 1], k: 4 }, expectedOutput: [1, 2, 3, 4, 5], isHidden: true },
      { id: 7, inputs: { nums: [-1, -3, -2], k: 2 }, expectedOutput: [-3, -2, -1], isHidden: true },
    ],
    learn: {
      intuition:
        "If every element is within k of its final home, then the smallest remaining value is always inside the next k + 1 candidates. A min-heap of that size therefore always has the next output at its root.",
      approach: [
        "Push the first k + 1 elements into a min-heap.",
        "Repeatedly poll the root into the output and push the next input element.",
        "Drain whatever is left in the heap.",
      ],
      bruteForce: { idea: "Sort the whole array.", time: "O(n log n)", space: "O(1)" },
      optimal: { idea: "Min-heap of size k + 1.", time: "O(n log k)", space: "O(k)" },
      pitfalls: [
        "The heap holds k + 1 elements, not k — an element k positions away still has to be reachable.",
        "k = 0 means the array is already sorted, and the heap degenerates to size 1.",
        "Forgetting to drain the heap truncates the output.",
      ],
      javaToolkit: ["Bounded min-heap over a stream", "Why k + 1 is the right size", "Draining at the end"],
    },
  },

  "merge-m-sorted-lists": {
    slug: "merge-m-sorted-lists",
    title: "Merge M Sorted Lists",
    description:
      "Given m ascending lists, return one ascending list holding all their elements. Lists may be empty, and the whole input may be empty.",
    constraints: ["0 ≤ m ≤ 10^4", "0 ≤ total elements ≤ 10^5", "-10^9 ≤ value ≤ 10^9"],
    className: "Solution",
    methodName: "mergeSorted",
    parameters: [{ name: "lists", type: "int[][]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] mergeSorted(int[][] lists) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] }, expectedOutput: [1, 1, 2, 3, 4, 4, 5, 6] },
      { id: 2, inputs: { lists: [[], [1]] }, expectedOutput: [1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { lists: [] }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { lists: [[]] }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { lists: [[1, 2, 3]] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 6, inputs: { lists: [[-5, 0], [-3], [10]] }, expectedOutput: [-5, -3, 0, 10], isHidden: true },
      { id: 7, inputs: { lists: [[2, 2], [2, 2]] }, expectedOutput: [2, 2, 2, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "The next value overall is always the smallest among the current heads of the m lists. A heap holding just those m heads answers that in O(log m), and refills itself as each list advances.",
      approach: [
        "Push (value, listIndex, position) for the head of every non-empty list.",
        "Poll the smallest, append it, and push that list's next element if it has one.",
        "Repeat until the heap empties.",
      ],
      bruteForce: { idea: "Concatenate everything and sort.", time: "O(N log N)", space: "O(N)" },
      optimal: { idea: "Min-heap over the m list heads.", time: "O(N log m)", space: "O(m)" },
      pitfalls: [
        "Empty lists must be skipped when seeding, or you index past the end immediately.",
        "The heap entry has to carry which list it came from, so you know where to refill.",
        "Pairwise merging is also O(N log m) if you merge in a balanced tree — merging one at a time is O(N × m).",
      ],
      javaToolkit: ["PriorityQueue<int[]> with a comparator", "k-way merge", "Tracking origin alongside value"],
    },
  },

  "replace-by-rank": {
    slug: "replace-by-rank",
    title: "Replace Each Element by Its Rank",
    description:
      "Replace every element by its rank: 1 for the smallest distinct value, 2 for the next, and so on. Equal values share a rank.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "replaceByRank",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] replaceByRank(int[] nums) {
        // Equal values share a rank; ranks are consecutive from 1.
        return nums;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [20, 15, 26, 2, 98, 6] }, expectedOutput: [4, 3, 5, 1, 6, 2] },
      { id: 2, inputs: { nums: [2, 2, 1, 6] }, expectedOutput: [2, 2, 1, 3], explanation: "The two 2s share rank 2, and 6 gets 3, not 4." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [5] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { nums: [7, 7, 7] }, expectedOutput: [1, 1, 1], isHidden: true },
      { id: 5, inputs: { nums: [-1, -5, 0] }, expectedOutput: [2, 1, 3], isHidden: true },
      { id: 6, inputs: { nums: [3, 1, 2] }, expectedOutput: [3, 1, 2], isHidden: true },
      { id: 7, inputs: { nums: [10, 20, 10, 20] }, expectedOutput: [1, 2, 1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Rank is position in the sorted order of the DISTINCT values, so collect the distinct values, sort them, and map each back. This is coordinate compression, which reappears constantly.",
      approach: [
        "Copy the values into a sorted structure that discards duplicates, such as a TreeSet.",
        "Walk it in order, assigning consecutive ranks into a map.",
        "Rebuild the output by looking each original value up.",
      ],
      bruteForce: { idea: "For each element, count how many distinct values are smaller.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Sort the distinct values and map back.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "Ranks skip nothing: [2,2,1,6] gives [2,2,1,3], not [2,2,1,4].",
        "Sorting a copy is essential — sorting the input destroys the positions you must write back to.",
        "Negative values are ordinary here; nothing about rank cares about sign.",
      ],
      javaToolkit: ["TreeSet or sort-plus-dedupe", "HashMap<Integer, Integer> for the mapping", "Coordinate compression"],
    },
  },

  "task-scheduler": {
    slug: "task-scheduler",
    title: "Task Scheduler",
    description:
      "Each character of the string is one task. A CPU runs one task per interval, and two runs of the SAME task must be separated by at least n intervals; idle intervals are allowed. Return the fewest intervals needed to run everything.",
    constraints: ["1 ≤ tasks.length ≤ 10^4", "tasks consists of uppercase English letters", "0 ≤ n ≤ 100"],
    className: "Solution",
    methodName: "leastInterval",
    parameters: [
      { name: "tasks", type: "String" },
      { name: "n", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int leastInterval(String tasks, int n) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { tasks: "AAABBB", n: 2 }, expectedOutput: 8, explanation: "A B _ A B _ A B — two idles are unavoidable." },
      { id: 2, inputs: { tasks: "AAABBB", n: 0 }, expectedOutput: 6, explanation: "No cooldown, so nothing idles." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { tasks: "A", n: 5 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { tasks: "AAAA", n: 3 }, expectedOutput: 13, isHidden: true },
      { id: 5, inputs: { tasks: "ABCDEFG", n: 2 }, expectedOutput: 7, isHidden: true },
      { id: 6, inputs: { tasks: "AAABBBCCC", n: 2 }, expectedOutput: 9, isHidden: true },
      { id: 7, inputs: { tasks: "AABBCCDD", n: 1 }, expectedOutput: 8, isHidden: true },
    ],
    learn: {
      intuition:
        "The most frequent task sets the skeleton: its occurrences carve out (maxCount - 1) gaps of length n, and everything else fills those gaps. Either the gaps absorb the rest — giving a formula — or there are so many distinct tasks that nothing ever idles, and the answer is simply the task count.",
      approach: [
        "Count each task; let maxCount be the highest and tiesAtMax how many tasks share it.",
        "The skeleton needs (maxCount - 1) × (n + 1) + tiesAtMax intervals.",
        "The answer is the larger of that and tasks.length.",
      ],
      bruteForce: { idea: "Simulate with a max-heap and a cooldown queue.", time: "O(total × log 26)", space: "O(26)" },
      optimal: { idea: "Counting formula on the most frequent task.", time: "O(total)", space: "O(26)" },
      pitfalls: [
        "The max with tasks.length is not optional — with many distinct tasks the formula UNDER-counts. For \"AABBCCDD\" with n = 1 it gives 6, but there are 8 tasks and no interval ever idles, so the answer is 8.",
        "Several tasks can tie for the maximum, and each needs a slot in the final block.",
        "n = 0 means no cooldown, so the answer is just the number of tasks.",
      ],
      javaToolkit: ["int[26] frequency count", "The (maxCount - 1) × (n + 1) + ties formula", "Max-heap simulation as the alternative"],
    },
  },

  "hands-of-straights": {
    slug: "hands-of-straights",
    title: "Hand of Straights",
    description:
      "Return whether the hand can be split entirely into groups of exactly groupSize cards, each group being consecutive integers.",
    constraints: ["1 ≤ hand.length ≤ 10^4", "1 ≤ groupSize ≤ hand.length", "0 ≤ hand[i] ≤ 10^9"],
    className: "Solution",
    methodName: "isNStraightHand",
    parameters: [
      { name: "hand", type: "int[]" },
      { name: "groupSize", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { hand: [1, 2, 3, 6, 2, 3, 4, 7, 8], groupSize: 3 }, expectedOutput: true, explanation: "[1,2,3], [2,3,4] and [6,7,8]." },
      { id: 2, inputs: { hand: [1, 2, 3, 4, 5], groupSize: 4 }, expectedOutput: false, explanation: "5 does not divide into groups of 4." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { hand: [1], groupSize: 1 }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { hand: [1, 1, 2, 2, 3, 3], groupSize: 3 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { hand: [1, 2, 4, 5], groupSize: 2 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { hand: [1, 2, 3, 5], groupSize: 2 }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { hand: [8, 10, 12], groupSize: 3 }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "The smallest remaining card has no smaller partner, so it MUST start a group — that removes all choice and makes greedy correct. Take it, demand the next groupSize - 1 consecutive values, and repeat.",
      approach: [
        "Fail immediately if the hand size is not divisible by groupSize.",
        "Count the cards in a TreeMap so the smallest key is always reachable.",
        "Repeatedly take the smallest key, decrement it and the next groupSize - 1 values, and fail if any is missing.",
      ],
      bruteForce: { idea: "Try every way of forming the first group.", time: "exponential", space: "O(n)" },
      optimal: { idea: "Greedy from the smallest remaining card, over a TreeMap.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "The divisibility check is the cheapest possible early exit.",
        "Entries whose count hits 0 must be removed, or firstKey returns a card you no longer hold.",
        "Duplicates are legitimate: [1,1,2,2,3,3] forms two identical groups.",
      ],
      javaToolkit: ["TreeMap<Integer, Integer>", "firstKey", "Greedy from the forced smallest element"],
    },
  },

  "design-twitter": {
    slug: "design-twitter",
    title: "Design Twitter",
    description:
      "Replay a log of operations. \"postTweet\" (userId, tweetId), \"follow\" (followerId, followeeId) and \"unfollow\" (followerId, followeeId) return \"null\". \"getNewsFeed\" (userId) returns the ten most recent tweet ids from that user and everyone they follow, newest first, as a comma-separated string — \"\" when the feed is empty. Users always see their own tweets.",
    constraints: ["1 ≤ ops.length ≤ 3 × 10^4", "1 ≤ userId, tweetId ≤ 10^4", "Unfollowing a user you do not follow is a no-op"],
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
        // Feed: up to 10 ids, newest first, joined by commas.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: {
          ops: ["postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"],
          args: [[1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]],
        },
        expectedOutput: ["null", "5", "null", "null", "6,5", "null", "5"],
        explanation: "After following user 2, their newer tweet leads the feed; unfollowing removes it again.",
      },
      { id: 2, inputs: { ops: ["getNewsFeed"], args: [[9]] }, expectedOutput: [""] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ops: ["postTweet", "getNewsFeed"], args: [[1, 1], [1]] }, expectedOutput: ["null", "1"], isHidden: true },
      { id: 4, inputs: { ops: ["follow", "getNewsFeed"], args: [[1, 1], [1]] }, expectedOutput: ["null", ""], isHidden: true },
      { id: 5, inputs: { ops: ["postTweet", "postTweet", "postTweet", "getNewsFeed"], args: [[1, 1], [1, 2], [1, 3], [1]] }, expectedOutput: ["null", "null", "null", "3,2,1"], isHidden: true },
      { id: 6, inputs: { ops: ["unfollow", "postTweet", "getNewsFeed"], args: [[1, 2], [1, 7], [1]] }, expectedOutput: ["null", "null", "7"], isHidden: true },
      {
        id: 7,
        inputs: {
          ops: ["postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "getNewsFeed"],
          args: [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1]],
        },
        expectedOutput: ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "11,10,9,8,7,6,5,4,3,2"],
        isHidden: true,
      },
    ],
    learn: {
      intuition:
        "Every tweet needs a global timestamp so tweets from different users can be ordered against each other. The feed is then a merge of several time-ordered lists, keeping only the ten newest — the k-way merge from merge-m-sorted-lists, bounded at 10.",
      approach: [
        "Keep a per-user list of (timestamp, tweetId) and a per-user set of followees.",
        "postTweet appends with an incrementing counter.",
        "getNewsFeed collects the user's own list plus each followee's, and merges by timestamp descending — a heap over the list tails, or simply collecting and sorting, since only 10 are needed.",
      ],
      bruteForce: { idea: "Gather every relevant tweet and sort all of them.", time: "O(T log T) per feed", space: "O(T)" },
      optimal: { idea: "Bounded k-way merge over per-user timelines.", time: "O(f log f + 10 log f)", space: "O(users + tweets)" },
      pitfalls: [
        "A user's own tweets are always in their feed, whether or not they follow themselves — case 4 checks the reverse: following yourself with no tweets is still an empty feed.",
        "unfollow on a non-followee must be a silent no-op, not an error.",
        "The feed caps at 10 even when far more tweets exist.",
        "Ordering by tweetId instead of by timestamp works only by accident on small inputs.",
      ],
      javaToolkit: ["A global timestamp counter", "Map<Integer, List<int[]>> timelines", "Map<Integer, Set<Integer>> follows"],
    },
  },

  "connect-n-ropes": {
    slug: "connect-n-ropes",
    title: "Connect N Ropes With Minimal Cost",
    description:
      "Joining two ropes costs the sum of their lengths and produces one rope of that length. Return the minimum total cost to join every rope into one. A single rope costs 0.",
    constraints: ["1 ≤ ropes.length ≤ 10^5", "1 ≤ ropes[i] ≤ 10^5"],
    className: "Solution",
    methodName: "minCost",
    parameters: [{ name: "ropes", type: "int[]" }],
    returnType: "long",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public long minCost(int[] ropes) {
        // The total can exceed an int.
        return 0L;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { ropes: [4, 3, 2, 6] }, expectedOutput: 29, explanation: "Join 2+3=5, then 4+5=9, then 6+9=15 — total 5+9+15." },
      { id: 2, inputs: { ropes: [1, 2, 3, 4, 5] }, expectedOutput: 33 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ropes: [5] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { ropes: [1, 1] }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { ropes: [1, 1, 1, 1] }, expectedOutput: 8, isHidden: true },
      { id: 6, inputs: { ropes: [100000, 100000, 100000] }, expectedOutput: 500000, isHidden: true },
      { id: 7, inputs: { ropes: [20, 4, 8, 2] }, expectedOutput: 54, isHidden: true },
    ],
    learn: {
      intuition:
        "Every join re-adds the lengths already joined, so a rope's length is counted once per join it survives. Joining the two SHORTEST first keeps the big ropes out of as many sums as possible — this is Huffman coding in miniature.",
      approach: [
        "Put every length into a min-heap.",
        "While more than one remains, poll two, add their sum to the total, and push the sum back.",
        "Return the total.",
      ],
      bruteForce: { idea: "Try every join order.", time: "O(n!)", space: "O(n)" },
      optimal: { idea: "Greedily join the two smallest, via a min-heap.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "The total exceeds int with 10^5 ropes of length 10^5 — accumulate in long.",
        "Joining in input order, or largest-first, gives a larger total; the greedy choice is what is being tested.",
        "One rope needs no joins at all, so the cost is 0.",
      ],
      javaToolkit: ["PriorityQueue<Integer>", "Huffman-style greedy", "long accumulation"],
    },
  },

  "kth-largest-stream": {
    slug: "kth-largest-stream",
    title: "Kth Largest Element in a Stream",
    description:
      "Start from the values in nums, then add each value of adds one at a time. After every addition, report the kth largest value seen so far, counting duplicates separately. Return one answer per addition, in order. Every reported position is guaranteed to exist.",
    constraints: ["1 ≤ k ≤ 10^4", "0 ≤ nums.length ≤ 10^4", "1 ≤ adds.length ≤ 10^4", "-10^4 ≤ value ≤ 10^4"],
    className: "Solution",
    methodName: "kthLargestStream",
    parameters: [
      { name: "k", type: "int" },
      { name: "nums", type: "int[]" },
      { name: "adds", type: "int[]" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] kthLargestStream(int k, int[] nums, int[] adds) {
        // One answer per element of adds.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { k: 3, nums: [4, 5, 8, 2], adds: [3, 5, 10, 9, 4] }, expectedOutput: [4, 5, 5, 8, 8] },
      { id: 2, inputs: { k: 1, nums: [], adds: [1, 2, 3] }, expectedOutput: [1, 2, 3], explanation: "With k = 1 the answer is simply the running maximum." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { k: 2, nums: [0], adds: [-1, 1, -2, -4, 3] }, expectedOutput: [-1, 0, 0, 0, 1], isHidden: true },
      { id: 4, inputs: { k: 1, nums: [5], adds: [1] }, expectedOutput: [5], isHidden: true },
      { id: 5, inputs: { k: 2, nums: [7, 7], adds: [7] }, expectedOutput: [7], isHidden: true },
      { id: 6, inputs: { k: 3, nums: [1, 2, 3], adds: [4, 5] }, expectedOutput: [2, 3], isHidden: true },
      { id: 7, inputs: { k: 4, nums: [1, 2, 3, 4], adds: [0, 5] }, expectedOutput: [1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Re-sorting after every addition is wasteful, and on a real stream impossible. A min-heap capped at k holds exactly the k largest seen; anything that falls out can never come back, so its root is always the current answer.",
      approach: [
        "Seed the heap with nums, polling whenever it exceeds k.",
        "For each addition, offer it and poll if the heap now exceeds k.",
        "Record the root after each addition.",
      ],
      bruteForce: { idea: "Sort everything after each addition.", time: "O(m × n log n)", space: "O(n)" },
      optimal: { idea: "Min-heap capped at k.", time: "O((n + m) log k)", space: "O(k)" },
      pitfalls: [
        "The heap must be capped after EVERY offer, seeding included, or it grows to full size and the root is wrong.",
        "Duplicates take separate slots — three 7s with k = 2 still answer 7.",
        "A value smaller than the current root still has to be offered and immediately discarded; skipping the offer is fine, but only if the size is already k.",
      ],
      javaToolkit: ["Bounded min-heap", "Streaming versus batch", "Why discarded values never return"],
    },
  },

  "max-sum-combination": {
    slug: "max-sum-combination",
    title: "Maximum Sum Combination",
    description:
      "From two arrays of equal length, consider all n² sums a[i] + b[j]. Return the k largest of them in descending order. Sums from different index pairs count separately even when they are equal.",
    constraints: ["1 ≤ n ≤ 10^4", "1 ≤ k ≤ min(n², 10^4)", "-10^9 ≤ values ≤ 10^9"],
    className: "Solution",
    methodName: "maxSumCombinations",
    parameters: [
      { name: "a", type: "int[]" },
      { name: "b", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] maxSumCombinations(int[] a, int[] b, int k) {
        // k largest sums, descending. Do not build all n^2 of them.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: [3, 2], b: [1, 4], k: 2 }, expectedOutput: [7, 6], explanation: "3+4=7 and 2+4=6 are the two largest." },
      { id: 2, inputs: { a: [1, 4, 2, 3], b: [2, 5, 1, 6], k: 3 }, expectedOutput: [10, 9, 9] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: [1], b: [1], k: 1 }, expectedOutput: [2], isHidden: true },
      { id: 4, inputs: { a: [1, 1], b: [1, 1], k: 4 }, expectedOutput: [2, 2, 2, 2], isHidden: true },
      { id: 5, inputs: { a: [-1, -2], b: [-3, -4], k: 2 }, expectedOutput: [-4, -5], isHidden: true },
      { id: 6, inputs: { a: [5, 1], b: [5, 1], k: 3 }, expectedOutput: [10, 6, 6], isHidden: true },
      { id: 7, inputs: { a: [1, 2, 3], b: [4, 5, 6], k: 5 }, expectedOutput: [9, 8, 8, 7, 7], isHidden: true },
    ],
    learn: {
      intuition:
        "Sort both arrays descending and the largest sum is a[0] + b[0]. Every candidate for the next largest is a neighbour of a pair already taken, so a max-heap seeded with the top pair and expanded outwards reaches the k largest without ever materialising n² sums.",
      approach: [
        "Sort both arrays descending.",
        "Push (a[0] + b[0], 0, 0) into a max-heap keyed by the sum, and keep a visited set of index pairs.",
        "Pop k times; after each pop, push (i + 1, j) and (i, j + 1) if unvisited and in range.",
      ],
      bruteForce: { idea: "Build all n² sums and sort.", time: "O(n² log n)", space: "O(n²)" },
      optimal: { idea: "Max-heap over neighbouring index pairs.", time: "O(n log n + k log k)", space: "O(k)" },
      pitfalls: [
        "Without the visited set, (i+1, j+1) is reached twice and duplicates the wrong sums.",
        "Equal sums from different pairs are separate answers — [1,1] and [1,1] with k = 4 gives four 2s.",
        "n² is 10^8 at the upper bound, so the brute force is not merely slow, it does not fit.",
      ],
      javaToolkit: ["PriorityQueue with a reverse comparator", "HashSet of encoded index pairs", "Expanding a frontier instead of enumerating"],
    },
  },

  "find-median-stream": {
    slug: "find-median-stream",
    title: "Find Median From a Data Stream",
    description:
      "Insert the values one at a time and return the median after each insertion. With an even count the median is the mean of the two middle values.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^5 ≤ nums[i] ≤ 10^5"],
    className: "Solution",
    methodName: "runningMedian",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "double[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public double[] runningMedian(int[] nums) {
        // One median per insertion.
        return new double[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3] }, expectedOutput: [1.0, 1.5, 2.0], explanation: "After two values the median is their mean." },
      { id: 2, inputs: { nums: [5] }, expectedOutput: [5.0] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [2, 2, 2, 2] }, expectedOutput: [2.0, 2.0, 2.0, 2.0], isHidden: true },
      { id: 4, inputs: { nums: [-1, -2, -3, -4] }, expectedOutput: [-1.0, -1.5, -2.0, -2.5], isHidden: true },
      { id: 5, inputs: { nums: [6, 10, 2, 6, 5, 0] }, expectedOutput: [6.0, 8.0, 6.0, 6.0, 6.0, 5.5], isHidden: true },
      { id: 6, inputs: { nums: [1, 100000] }, expectedOutput: [1.0, 50000.5], isHidden: true },
      { id: 7, inputs: { nums: [3, 1, 2] }, expectedOutput: [3.0, 2.0, 2.0], isHidden: true },
    ],
    learn: {
      intuition:
        "Split the data in half: a max-heap for the lower half and a min-heap for the upper. The two roots sit either side of the middle, so the median is one root or the mean of both — and neither half ever needs sorting.",
      approach: [
        "Push into the max-heap, then move its root into the min-heap, so the halves stay ordered relative to each other.",
        "If the min-heap is now larger, move its root back — this keeps the max-heap either equal in size or one larger.",
        "The median is the max-heap's root when the total is odd, otherwise the mean of the two roots.",
      ],
      bruteForce: { idea: "Keep a sorted list and insert each value in place.", time: "O(n) per insert", space: "O(n)" },
      optimal: { idea: "Two heaps balanced around the middle.", time: "O(log n) per insert", space: "O(n)" },
      pitfalls: [
        "Pushing straight into whichever heap looks smaller breaks the ordering between halves; always push-then-transfer.",
        "The mean of two ints must be computed in double — (a + b) / 2 in int arithmetic silently truncates.",
        "Two ints near 10^5 do not overflow, but (a + b) with values near Integer.MAX_VALUE would; casting first is the safe habit.",
      ],
      javaToolkit: ["Two PriorityQueues", "Push-then-transfer rebalancing", "Casting before the average"],
    },
  },

  "k-most-frequent": {
    slug: "k-most-frequent",
    title: "K Most Frequent Elements",
    description:
      "Return the k most frequent values, ordered by frequency descending; when two values occur equally often, the smaller value comes first.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "1 ≤ k ≤ number of distinct values", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "topKFrequent",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Frequency descending; ties broken by the smaller value first.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 1, 1, 2, 2, 3], k: 2 }, expectedOutput: [1, 2] },
      { id: 2, inputs: { nums: [4, 4, 5, 5, 6], k: 2 }, expectedOutput: [4, 5], explanation: "4 and 5 both appear twice, so the smaller comes first." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 1 }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { nums: [3, 2, 1], k: 3 }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 5, inputs: { nums: [-1, -1, 2, 2, 3], k: 2 }, expectedOutput: [-1, 2], isHidden: true },
      { id: 6, inputs: { nums: [5, 5, 5, 5], k: 1 }, expectedOutput: [5], isHidden: true },
      { id: 7, inputs: { nums: [1, 2, 3, 1, 2, 1], k: 3 }, expectedOutput: [1, 2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Count first, then rank. With the counts in hand this is 'k largest' over the distinct values, so a bounded heap does it in O(d log k) without sorting all of them.",
      approach: [
        "Count occurrences in a HashMap.",
        "Push each distinct value into a min-heap ordered by count ascending, with the LARGER value first on a tie so the wrong one is discarded.",
        "Cap the heap at k, then read it out and sort the survivors by count descending, value ascending.",
      ],
      bruteForce: { idea: "Sort all distinct values by count.", time: "O(d log d)", space: "O(d)" },
      optimal: { idea: "Bounded heap on counts, or bucket sort by frequency for O(n).", time: "O(n + d log k)", space: "O(d)" },
      pitfalls: [
        "The tie-break has to be stated, or [4,4,5,5,6] with k = 2 has two defensible answers — this problem fixes it as smaller-value-first.",
        "The comparator inside a bounded min-heap must be the REVERSE of the output order, since the heap discards its root.",
        "Bucket sort by frequency is O(n) and avoids heaps entirely: frequency can be at most n.",
      ],
      javaToolkit: ["HashMap counts", "PriorityQueue with a two-key comparator", "Bucket sort by frequency"],
    },
  },
}
