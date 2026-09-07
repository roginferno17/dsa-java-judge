import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 4 — Binary search on the answer (14 problems).
 *
 * Every problem here shares one shape. You are not searching an array; you are
 * searching a range of possible answers, and you have a check(x) that is
 * monotonic — false, false, ..., false, true, true, ... The job is to find the
 * boundary. Recognising that shape is the entire skill.
 */
export const step04Space: Record<string, ProblemMetadata> = {
  "square-root": {
    slug: "square-root",
    title: "Square Root of a Number",
    description:
      "Return the integer square root of n — the largest integer whose square does not exceed n. Do it in O(log n), without Math.sqrt.",
    constraints: ["0 ≤ n ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "mySqrt",
    parameters: [{ name: "n", type: "int" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int mySqrt(int n) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 8 }, expectedOutput: 2, explanation: "2² = 4 ≤ 8 but 3² = 9 > 8, so the answer is 2." },
      { id: 2, inputs: { n: 16 }, expectedOutput: 4 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { n: 1 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { n: 2147483647 }, expectedOutput: 46340, isHidden: true },
      { id: 6, inputs: { n: 2 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "The predicate \"x² ≤ n\" is true for every x up to the answer and false after it. That is a sorted boolean sequence, so binary search finds the boundary without ever touching an array.",
      approach: [
        "Search x over 0 .. n.",
        "For each candidate, test whether x × x ≤ n, computing the product as a long.",
        "Keep the largest x that passes.",
      ],
      bruteForce: { idea: "Increment x until x² exceeds n.", time: "O(√n)", space: "O(1)" },
      optimal: { idea: "Binary search on the answer.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "x * x overflows int well before x reaches 46340. Compute it as a long — the Integer.MAX_VALUE case exists to catch this.",
        "Math.sqrt returns a double whose rounding can be off by one at large values.",
        "n = 0 and n = 1 are their own square roots.",
      ],
      javaToolkit: ["(long) x * x", "Answer-tracking binary search", "Monotonic predicate"],
    },
  },

  "nth-root": {
    slug: "nth-root",
    title: "Nth Root of a Number",
    description:
      "Return the integer x such that x^n equals m exactly, or -1 when no such integer exists.",
    constraints: ["1 ≤ n ≤ 30", "1 ≤ m ≤ 10^9"],
    className: "Solution",
    methodName: "nthRoot",
    parameters: [
      { name: "n", type: "int" },
      { name: "m", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int nthRoot(int n, int m) {
        // Return -1 when m is not a perfect nth power.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 3, m: 27 }, expectedOutput: 3, explanation: "3³ = 27." },
      { id: 2, inputs: { n: 4, m: 69 }, expectedOutput: -1, explanation: "No integer raised to the fourth gives 69." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1, m: 5 }, expectedOutput: 5, isHidden: true },
      { id: 4, inputs: { n: 2, m: 1 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { n: 30, m: 1073741824 }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { n: 2, m: 1000000000 }, expectedOutput: -1, isHidden: true },
    ],
    learn: {
      intuition:
        "x^n grows monotonically in x, so binary search applies. The catch is that x^n overflows almost immediately — you must stop multiplying the moment you pass m rather than computing the full power.",
      approach: [
        "Search x over 1 .. m.",
        "Write a helper that multiplies x by itself n times, returning early with 'too big' as soon as the running product exceeds m.",
        "Return x on an exact match, -1 if the search ends without one.",
      ],
      bruteForce: { idea: "Try every x from 1 upward.", time: "O(m × n)", space: "O(1)" },
      optimal: { idea: "Binary search with an overflow-safe power check.", time: "O(n log m)", space: "O(1)" },
      pitfalls: [
        "Computing x^n fully before comparing overflows even a long once n is 30 — the n=30 case is there to catch it.",
        "Math.pow returns a double and loses exactness at these magnitudes.",
        "n = 1 makes the answer m itself.",
      ],
      javaToolkit: ["Early-exit power helper", "long accumulation", "Binary search on the answer"],
    },
  },

  "koko-eating-bananas": {
    slug: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    description:
      "Koko eats from one pile per hour at a chosen speed k, finishing a pile early if it has fewer than k bananas left but never moving on to another pile within the same hour. Return the smallest k that clears every pile within h hours.",
    constraints: ["1 ≤ piles.length ≤ 10^4", "piles.length ≤ h ≤ 10^9", "1 ≤ piles[i] ≤ 10^9"],
    className: "Solution",
    methodName: "minEatingSpeed",
    parameters: [
      { name: "piles", type: "int[]" },
      { name: "h", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        return 1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { piles: [3, 6, 7, 11], h: 8 }, expectedOutput: 4, explanation: "At speed 4 the piles take 1 + 2 + 2 + 3 = 8 hours exactly." },
      { id: 2, inputs: { piles: [30, 11, 23, 4, 20], h: 5 }, expectedOutput: 30, explanation: "With exactly one hour per pile, k must cover the largest pile." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { piles: [1], h: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { piles: [1000000000], h: 2 }, expectedOutput: 500000000, isHidden: true },
      { id: 5, inputs: { piles: [30, 11, 23, 4, 20], h: 6 }, expectedOutput: 23, isHidden: true },
      { id: 6, inputs: { piles: [312884470], h: 968709470 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "If speed k finishes in time then so does any faster speed, and if k is too slow then so is anything slower. That monotonicity is the whole problem — search k rather than simulating.",
      approach: [
        "The answer lies between 1 and the largest pile.",
        "For a candidate k, the hours needed are the sum of ceil(pile / k) over all piles.",
        "If that fits within h, record k and search lower; otherwise search higher.",
      ],
      bruteForce: { idea: "Try every k from 1 to max(piles).", time: "O(n × max)", space: "O(1)" },
      optimal: { idea: "Binary search on the speed.", time: "O(n log max)", space: "O(1)" },
      pitfalls: [
        "Summing hours in an int overflows: 10^4 piles of 10^9 at speed 1 far exceeds int range. Use long.",
        "Integer division truncates — the hours for a pile are (pile + k - 1) / k, not pile / k.",
        "The upper bound must be the largest pile, not the sum; a speed above the largest pile buys nothing.",
      ],
      javaToolkit: ["Ceiling division (a + b - 1) / b", "long accumulator", "Binary search on the answer"],
    },
  },

  "min-days-bouquets": {
    slug: "min-days-bouquets",
    title: "Minimum Days to Make M Bouquets",
    description:
      "bloomDay[i] is the day flower i opens. A bouquet needs k adjacent flowers that have all bloomed. Return the earliest day on which m bouquets can be made, or -1 if it is impossible.",
    constraints: ["1 ≤ bloomDay.length ≤ 10^5", "1 ≤ bloomDay[i] ≤ 10^9", "1 ≤ m, k ≤ 10^6"],
    className: "Solution",
    methodName: "minDays",
    parameters: [
      { name: "bloomDay", type: "int[]" },
      { name: "m", type: "int" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        // Return -1 when there are not enough flowers.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { bloomDay: [1, 10, 3, 10, 2], m: 3, k: 1 }, expectedOutput: 3, explanation: "By day 3 flowers 0, 2 and 4 have bloomed, giving three single-flower bouquets." },
      { id: 2, inputs: { bloomDay: [1, 10, 3, 10, 2], m: 3, k: 2 }, expectedOutput: -1, explanation: "Three bouquets of two need six flowers; only five exist." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { bloomDay: [7, 7, 7, 7, 12, 7, 7], m: 2, k: 3 }, expectedOutput: 12, isHidden: true },
      { id: 4, inputs: { bloomDay: [1], m: 1, k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { bloomDay: [1, 2, 3], m: 1, k: 3 }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { bloomDay: [1000000000, 1000000000], m: 1, k: 1 }, expectedOutput: 1000000000, isHidden: true },
    ],
    learn: {
      intuition:
        "Waiting longer never destroys a bouquet, so \"can I make m bouquets by day d\" is false up to some point and true forever after. Search d, and count bouquets greedily for each candidate.",
      approach: [
        "Reject immediately when m × k exceeds the flower count — compute that product as a long.",
        "Search d between the smallest and largest bloom day.",
        "For a candidate d, sweep the array counting consecutive bloomed flowers; every time the run reaches k, bank a bouquet and reset the run. A flower that has not bloomed resets it too.",
      ],
      bruteForce: { idea: "Try every distinct bloom day.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Binary search on the day.", time: "O(n log(max day))", space: "O(1)" },
      pitfalls: [
        "m × k overflows int when both are near 10^6 — the impossibility check must use long.",
        "Not resetting the run counter after banking a bouquet reuses the same flowers.",
        "The flowers must be ADJACENT, so a non-bloomed flower breaks the run entirely.",
      ],
      javaToolkit: ["Greedy counting inside the predicate", "long for the feasibility product", "Binary search on the answer"],
    },
  },

  "smallest-divisor": {
    slug: "smallest-divisor",
    title: "Find the Smallest Divisor Given a Threshold",
    description:
      "Divide every element by a chosen divisor, rounding each result UP, and sum them. Return the smallest divisor for which that sum does not exceed the threshold.",
    constraints: ["1 ≤ nums.length ≤ 5 × 10^4", "1 ≤ nums[i] ≤ 10^6", "nums.length ≤ threshold ≤ 10^6"],
    className: "Solution",
    methodName: "smallestDivisor",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "threshold", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int smallestDivisor(int[] nums, int threshold) {
        return 1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 5, 9], threshold: 6 }, expectedOutput: 5, explanation: "With 5 the rounded-up quotients are 1+1+1+2 = 5, which fits; with 4 they total 7, which does not." },
      { id: 2, inputs: { nums: [44, 22, 33, 11, 1], threshold: 5 }, expectedOutput: 44 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], threshold: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1, 1, 1], threshold: 3 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [1000000], threshold: 1 }, expectedOutput: 1000000, isHidden: true },
      { id: 6, inputs: { nums: [2, 3, 5, 7, 11], threshold: 11 }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "The same shape as Koko: a larger divisor can only shrink the sum, so the feasibility test is monotonic and you binary search the divisor.",
      approach: [
        "Search the divisor over 1 .. max(nums).",
        "For a candidate, sum ceil(num / divisor) across the array.",
        "If the sum fits within the threshold, record it and search lower.",
      ],
      bruteForce: { idea: "Try every divisor from 1 upward.", time: "O(n × max)", space: "O(1)" },
      optimal: { idea: "Binary search on the divisor.", time: "O(n log max)", space: "O(1)" },
      pitfalls: [
        "Using plain division rounds down and quietly produces a smaller answer than the real one.",
        "The sum can reach 5 × 10^4 × 10^6 at divisor 1, which needs a long.",
        "The largest useful divisor is max(nums); beyond that every quotient is already 1.",
      ],
      javaToolkit: ["Ceiling division", "Binary search on the answer", "Recognising a repeated pattern"],
    },
  },

  "ship-packages": {
    slug: "ship-packages",
    title: "Capacity to Ship Packages Within D Days",
    description:
      "Packages must be shipped in their given order. Each day the ship carries a prefix of what remains, without exceeding its capacity. Return the smallest capacity that clears everything within days days.",
    constraints: ["1 ≤ weights.length ≤ 5 × 10^4", "1 ≤ weights[i] ≤ 500", "1 ≤ days ≤ weights.length"],
    className: "Solution",
    methodName: "shipWithinDays",
    parameters: [
      { name: "weights", type: "int[]" },
      { name: "days", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], days: 5 }, expectedOutput: 15, explanation: "Capacity 15 splits into 1-5, 6-7, 8, 9, 10 — five days." },
      { id: 2, inputs: { weights: [3, 2, 2, 4, 1, 4], days: 3 }, expectedOutput: 6 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { weights: [1, 2, 3, 1, 1], days: 4 }, expectedOutput: 3, isHidden: true },
      { id: 4, inputs: { weights: [5], days: 1 }, expectedOutput: 5, isHidden: true },
      { id: 5, inputs: { weights: [1, 1, 1, 1], days: 4 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { weights: [10, 10, 10], days: 1 }, expectedOutput: 30, isHidden: true },
    ],
    learn: {
      intuition:
        "A bigger ship never needs more days, so days-required is non-increasing in capacity. Binary search the capacity, and for each one greedily pack days by filling until the next package would overflow.",
      approach: [
        "The lower bound is the heaviest single package — anything less can never ship it. The upper bound is the total weight, which ships everything in one day.",
        "For a candidate capacity, sweep the weights accumulating a running load, starting a new day whenever adding the next package would exceed it.",
        "If the day count fits, record the capacity and search lower.",
      ],
      bruteForce: { idea: "Try every capacity from max to sum.", time: "O(n × sum)", space: "O(1)" },
      optimal: { idea: "Binary search on the capacity.", time: "O(n log sum)", space: "O(1)" },
      pitfalls: [
        "Starting the search at 1 rather than max(weights) lets the check consider capacities that can never work.",
        "Order must be preserved — sorting the weights changes the problem entirely.",
        "Greedy packing is provably optimal here, so no cleverness is needed inside the predicate.",
      ],
      javaToolkit: ["Greedy packing predicate", "Bounds from max and sum", "Binary search on the answer"],
    },
  },

  "kth-missing-positive": {
    slug: "kth-missing-positive",
    title: "Kth Missing Positive Number",
    description:
      "The array is strictly increasing and contains positive integers. Return the kth positive integer that is absent from it.",
    constraints: ["1 ≤ arr.length ≤ 1000", "1 ≤ arr[i] ≤ 1000", "1 ≤ k ≤ 1000", "arr is strictly increasing"],
    className: "Solution",
    methodName: "findKthPositive",
    parameters: [
      { name: "arr", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int findKthPositive(int[] arr, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [2, 3, 4, 7, 11], k: 5 }, expectedOutput: 9, explanation: "The missing numbers are 1, 5, 6, 8, 9, 10, ... and the fifth is 9." },
      { id: 2, inputs: { arr: [1, 2, 3, 4], k: 2 }, expectedOutput: 6, explanation: "Nothing is missing below 5, so the missing run starts at 5 and the second is 6." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [2], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { arr: [1], k: 1 }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { arr: [5, 6, 7], k: 4 }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { arr: [1, 3], k: 1 }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "At index i the value arr[i] would be i + 1 if nothing were missing, so arr[i] - (i + 1) counts how many numbers are missing at or before that point. That count only ever grows — which makes it binary-searchable.",
      approach: [
        "Binary search for the first index where arr[i] - (i + 1) >= k.",
        "Let idx be the number of array elements before that boundary.",
        "The answer is idx + k.",
      ],
      bruteForce: { idea: "Walk the positive integers checking membership.", time: "O(n + k)", space: "O(1)" },
      optimal: { idea: "Binary search on the missing count.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "The answer can be smaller than every array element, as when arr = [5,6,7] and k = 4.",
        "Off-by-one in arr[i] - (i + 1) — the +1 is because positive integers start at 1, not 0.",
        "When nothing is missing inside the array, the answer lies past its end.",
      ],
      javaToolkit: ["Missing-count formula arr[i] - (i + 1)", "Binary search on a derived quantity"],
    },
  },

  "aggressive-cows": {
    slug: "aggressive-cows",
    title: "Aggressive Cows",
    description:
      "Place k cows in stalls at the given positions so that the smallest gap between any two cows is as large as possible. Return that largest possible minimum gap.",
    constraints: ["2 ≤ stalls.length ≤ 10^5", "2 ≤ k ≤ stalls.length", "0 ≤ stalls[i] ≤ 10^9"],
    className: "Solution",
    methodName: "aggressiveCows",
    parameters: [
      { name: "stalls", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int aggressiveCows(int[] stalls, int k) {
        // stalls are not necessarily given in order.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { stalls: [0, 3, 4, 7, 10, 9], k: 4 }, expectedOutput: 3, explanation: "Sorted, placing cows at 0, 3, 7 and 10 gives gaps of 3, 4 and 3 — the smallest is 3." },
      { id: 2, inputs: { stalls: [1, 2, 4, 8, 9], k: 3 }, expectedOutput: 3 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { stalls: [1, 2], k: 2 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { stalls: [1, 2, 3, 4, 5], k: 5 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { stalls: [0, 1000000000], k: 2 }, expectedOutput: 1000000000, isHidden: true },
      { id: 6, inputs: { stalls: [10, 1, 2, 7, 5], k: 3 }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "\"Maximise the minimum\" is the signature of binary search on the answer. If a gap of d is achievable then so is any smaller gap, so feasibility is monotonic — search d and check greedily.",
      approach: [
        "Sort the stalls first; the positions arrive unordered.",
        "Search d between 1 and the span from first to last stall.",
        "For a candidate d, place a cow in the first stall and then in every stall at least d beyond the last placement. If you seat k cows, d is feasible.",
      ],
      bruteForce: { idea: "Try every gap from 1 to the span.", time: "O(n × span)", space: "O(1)" },
      optimal: { idea: "Binary search on the gap, greedy placement to check.", time: "O(n log span)", space: "O(1)" },
      pitfalls: [
        "Forgetting to sort — a hidden case supplies deliberately unordered stalls.",
        "Greedy placement is optimal here: putting each cow as early as possible never blocks a later one.",
        "The span can be 10^9, so start the search from the value range rather than from an index range.",
      ],
      javaToolkit: ["Arrays.sort", "Maximise-the-minimum pattern", "Greedy feasibility check"],
    },
  },

  "book-allocation": {
    slug: "book-allocation",
    title: "Book Allocation Problem",
    description:
      "Allocate the books, in their given order, to m students so that each student receives a contiguous block and every book is assigned. Return the smallest possible value of the largest number of pages any student receives, or -1 when there are fewer books than students.",
    constraints: ["1 ≤ books.length ≤ 10^5", "1 ≤ books[i] ≤ 10^5", "1 ≤ m ≤ 10^5"],
    className: "Solution",
    methodName: "allocateBooks",
    parameters: [
      { name: "books", type: "int[]" },
      { name: "m", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int allocateBooks(int[] books, int m) {
        // Return -1 when m exceeds the number of books.
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { books: [12, 34, 67, 90], m: 2 }, expectedOutput: 113, explanation: "Splitting as [12,34,67] and [90] gives 113 and 90; the largest is 113, and no split does better." },
      { id: 2, inputs: { books: [25, 46, 28, 49, 24], m: 4 }, expectedOutput: 71 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { books: [10, 20], m: 3 }, expectedOutput: -1, isHidden: true },
      { id: 4, inputs: { books: [5], m: 1 }, expectedOutput: 5, isHidden: true },
      { id: 5, inputs: { books: [1, 1, 1, 1], m: 4 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { books: [100, 1, 1], m: 2 }, expectedOutput: 100, isHidden: true },
    ],
    learn: {
      intuition:
        "\"Minimise the maximum\" is the mirror of aggressive cows. A larger page limit needs fewer students, so the student count is non-increasing in the limit — binary search the limit.",
      approach: [
        "Return -1 immediately when m exceeds the number of books.",
        "Search the limit between max(books) and sum(books).",
        "For a candidate limit, greedily give each student books until the next one would exceed it, then start a new student. Feasible when the student count is at most m.",
      ],
      bruteForce: { idea: "Try every limit from max to sum.", time: "O(n × sum)", space: "O(1)" },
      optimal: { idea: "Binary search on the page limit.", time: "O(n log sum)", space: "O(1)" },
      pitfalls: [
        "The lower bound must be max(books): no student can take fewer pages than the largest single book.",
        "Books must stay in order, so this is not a partition-into-any-subsets problem.",
        "Split array largest sum and painter's partition are the same problem with different words.",
      ],
      javaToolkit: ["Minimise-the-maximum pattern", "Greedy grouping predicate", "Bounds from max and sum"],
    },
  },

  "split-array-largest-sum": {
    slug: "split-array-largest-sum",
    title: "Split Array — Largest Sum",
    description:
      "Split the array into k non-empty contiguous subarrays so that the largest subarray sum is as small as possible. Return that value.",
    constraints: ["1 ≤ nums.length ≤ 1000", "0 ≤ nums[i] ≤ 10^6", "1 ≤ k ≤ nums.length"],
    className: "Solution",
    methodName: "splitArray",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int splitArray(int[] nums, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [7, 2, 5, 10, 8], k: 2 }, expectedOutput: 18, explanation: "[7,2,5] and [10,8] give sums 14 and 18; every other split is worse." },
      { id: 2, inputs: { nums: [1, 2, 3, 4, 5], k: 2 }, expectedOutput: 9 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1, 4, 4], k: 3 }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { nums: [0, 0, 0], k: 2 }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { nums: [2, 3, 1, 2, 4, 3], k: 5 }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "Word for word the same problem as book allocation, with students renamed subarrays. Recognising that is more valuable than the code.",
      approach: [
        "Search the answer between max(nums) and sum(nums).",
        "For a candidate limit, greedily count how many subarrays are needed if none may exceed it.",
        "Feasible when that count is at most k; record and search lower.",
      ],
      bruteForce: { idea: "Dynamic programming over splits.", time: "O(n² k)", space: "O(nk)" },
      optimal: { idea: "Binary search on the largest allowed sum.", time: "O(n log sum)", space: "O(1)" },
      pitfalls: [
        "Values can be 0, so the lower bound max(nums) can legitimately be 0.",
        "Needing FEWER than k subarrays is still feasible — you can always split further.",
        "The DP solution is correct but far slower, and is the intended contrast here.",
      ],
      javaToolkit: ["Minimise-the-maximum pattern", "Greedy counting predicate"],
    },
  },

  "painters-partition": {
    slug: "painters-partition",
    title: "Painter's Partition",
    description:
      "k painters each paint a contiguous run of boards, taking one unit of time per unit of board length, all working simultaneously. Return the minimum time to paint every board.",
    constraints: ["1 ≤ boards.length ≤ 10^5", "1 ≤ boards[i] ≤ 10^5", "1 ≤ k ≤ 10^5"],
    className: "Solution",
    methodName: "minTime",
    parameters: [
      { name: "boards", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int minTime(int[] boards, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { boards: [5, 5, 5, 5], k: 2 }, expectedOutput: 10, explanation: "Two boards each, so both painters take 10." },
      { id: 2, inputs: { boards: [10, 20, 30, 40], k: 2 }, expectedOutput: 60, explanation: "[10,20,30] and [40] give 60 and 40." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { boards: [5], k: 1 }, expectedOutput: 5, isHidden: true },
      { id: 4, inputs: { boards: [1, 1, 1], k: 5 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { boards: [100, 1, 1, 1], k: 2 }, expectedOutput: 100, isHidden: true },
      { id: 6, inputs: { boards: [2, 2, 2, 2, 2], k: 3 }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "Because everyone paints at once, the finish time is whatever the busiest painter takes. So this is minimise-the-maximum again, identical to book allocation.",
      approach: [
        "Search the time between max(boards) and sum(boards).",
        "For a candidate time, greedily count the painters needed.",
        "Feasible when that count is at most k.",
      ],
      optimal: { idea: "Binary search on the finish time.", time: "O(n log sum)", space: "O(1)" },
      pitfalls: [
        "More painters than boards is fine — the extras simply idle, and the answer is max(boards).",
        "One painter must take the whole sum.",
        "This is the third identical problem in this step; if it does not feel identical, revisit book allocation.",
      ],
      javaToolkit: ["Minimise-the-maximum pattern", "Greedy grouping"],
    },
  },

  "minimize-max-distance": {
    slug: "minimize-max-distance",
    title: "Minimize Max Distance to Gas Station",
    description:
      "Stations sit on a horizontal line at strictly increasing positions. Add k new stations anywhere, including non-integer positions, to minimise the largest gap between adjacent stations. Return that smallest possible largest gap. Answers within 1e-6 are accepted.",
    constraints: ["2 ≤ stations.length ≤ 2000", "0 ≤ stations[i] ≤ 10^8", "1 ≤ k ≤ 10^6", "stations is strictly increasing"],
    className: "Solution",
    methodName: "minMaxDistance",
    parameters: [
      { name: "stations", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "double",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public double minMaxDistance(int[] stations, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { stations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k: 9 }, expectedOutput: 0.5, explanation: "One extra station in each of the nine unit gaps halves them all." },
      { id: 2, inputs: { stations: [1, 13, 17, 23], k: 5 }, expectedOutput: 3.0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { stations: [1, 2], k: 1 }, expectedOutput: 0.5, isHidden: true },
      { id: 4, inputs: { stations: [0, 100], k: 3 }, expectedOutput: 25.0, isHidden: true },
      { id: 5, inputs: { stations: [1, 2, 3], k: 2 }, expectedOutput: 0.5, isHidden: true },
      { id: 6, inputs: { stations: [0, 10, 20], k: 1 }, expectedOutput: 10.0, isHidden: true },
    ],
    learn: {
      intuition:
        "Binary search on a real number rather than an integer. For a candidate gap d, each existing interval of length L needs ceil(L / d) - 1 extra stations. Summing those tells you whether d is achievable within k.",
      approach: [
        "Search d over 0 .. the largest existing gap.",
        "For each candidate, sum the stations required across all intervals.",
        "If the total is at most k, d is feasible — search lower; otherwise search higher.",
        "Run a fixed number of iterations, around 100, rather than looping until equality.",
      ],
      bruteForce: { idea: "Repeatedly split the currently largest gap using a priority queue.", time: "O(k log n)", space: "O(n)" },
      optimal: { idea: "Binary search on a real-valued answer.", time: "O(n × iterations)", space: "O(1)" },
      pitfalls: [
        "Looping while low < high on doubles may never terminate; iterate a fixed number of times instead.",
        "The count for an interval is ceil(L / d) - 1, not ceil(L / d) — the existing station at the end already exists.",
        "Floating-point comparison must use a tolerance, which is why this judge accepts anything within 1e-6.",
      ],
      javaToolkit: ["Binary search on doubles", "Fixed iteration count", "Math.ceil with care around exact multiples"],
    },
  },

  "median-two-sorted": {
    slug: "median-two-sorted",
    title: "Median of Two Sorted Arrays",
    description:
      "Both arrays are sorted ascending. Return the median of their combined contents. Aim for O(log(min(n, m))).",
    constraints: ["0 ≤ a.length, b.length ≤ 1000", "a.length + b.length ≥ 1", "-10^6 ≤ values ≤ 10^6"],
    className: "Solution",
    methodName: "findMedianSortedArrays",
    parameters: [
      { name: "a", type: "int[]" },
      { name: "b", type: "int[]" },
    ],
    returnType: "double",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public double findMedianSortedArrays(int[] a, int[] b) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: [1, 3], b: [2] }, expectedOutput: 2.0, explanation: "Merged this is [1,2,3], whose middle value is 2." },
      { id: 2, inputs: { a: [1, 2], b: [3, 4] }, expectedOutput: 2.5, explanation: "An even total means the average of the two middle values." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: [], b: [1] }, expectedOutput: 1.0, isHidden: true },
      { id: 4, inputs: { a: [2], b: [] }, expectedOutput: 2.0, isHidden: true },
      { id: 5, inputs: { a: [1, 1], b: [1, 1] }, expectedOutput: 1.0, isHidden: true },
      { id: 6, inputs: { a: [0, 0], b: [0, 0] }, expectedOutput: 0.0, isHidden: true },
      { id: 7, inputs: { a: [1, 2, 3, 4, 5], b: [6, 7, 8] }, expectedOutput: 4.5, isHidden: true },
    ],
    learn: {
      intuition:
        "The median splits the combined data into a left half and a right half of known sizes. Choosing how many elements to take from the smaller array fixes how many come from the larger, so you only need to search that one number — and the partition is correct when every left element is at most every right element.",
      approach: [
        "Always binary search over the SHORTER array, taking i elements from it.",
        "The other array then contributes (total + 1) / 2 - i.",
        "Compare the two elements either side of each cut, using ±infinity at the boundaries.",
        "When both cross-comparisons hold, the median comes from the boundary values.",
      ],
      bruteForce: { idea: "Merge both arrays and index the middle.", time: "O(n + m)", space: "O(n + m)" },
      optimal: { idea: "Binary search on the partition of the shorter array.", time: "O(log min(n, m))", space: "O(1)" },
      pitfalls: [
        "Either array can be empty — two hidden cases cover it.",
        "Searching the longer array lets the partner index go out of range.",
        "Use Integer.MIN_VALUE and MAX_VALUE as sentinels when a cut sits at an array edge.",
        "Divide by 2.0, not 2, or the even case truncates.",
      ],
      javaToolkit: ["Partition-based binary search", "Sentinel values at boundaries", "Integer vs floating division"],
    },
  },

  "kth-element-two-sorted": {
    slug: "kth-element-two-sorted",
    title: "Kth Element of Two Sorted Arrays",
    description:
      "Both arrays are sorted ascending. Return the kth smallest value of their combined contents, counting from 1.",
    constraints: ["0 ≤ a.length, b.length ≤ 1000", "1 ≤ k ≤ a.length + b.length"],
    className: "Solution",
    methodName: "kthElement",
    parameters: [
      { name: "a", type: "int[]" },
      { name: "b", type: "int[]" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int kthElement(int[] a, int[] b, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: [2, 3, 6, 7, 9], b: [1, 4, 8, 10], k: 5 }, expectedOutput: 6, explanation: "Merged this is [1,2,3,4,6,7,8,9,10]; the fifth value is 6." },
      { id: 2, inputs: { a: [100, 112, 256, 349, 770], b: [72, 86, 113, 119, 265, 445, 892], k: 7 }, expectedOutput: 256 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: [], b: [5], k: 1 }, expectedOutput: 5, isHidden: true },
      { id: 4, inputs: { a: [1, 2, 3], b: [], k: 3 }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { a: [1, 1], b: [1, 1], k: 4 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { a: [1, 3], b: [2], k: 1 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Identical machinery to the median, with the cut size given to you instead of derived. Take i elements from the shorter array and k - i from the other, then check that the partition is valid.",
      approach: [
        "Binary search i, the count taken from the shorter array, within its valid range.",
        "The other array supplies k - i.",
        "Validate with the same cross-comparisons; the answer is the larger of the two left-hand boundary values.",
      ],
      bruteForce: { idea: "Merge until you have counted k elements.", time: "O(k)", space: "O(1)" },
      optimal: { idea: "Partition-based binary search.", time: "O(log min(n, m))", space: "O(1)" },
      pitfalls: [
        "The range for i is not simply 0..k — it is bounded by the array lengths too.",
        "k is 1-based, so the answer is the kth element, not the one at index k.",
        "Solving this makes the median a two-line wrapper.",
      ],
      javaToolkit: ["Partition-based binary search", "Clamping the search range", "1-based versus 0-based indexing"],
    },
  },
}
