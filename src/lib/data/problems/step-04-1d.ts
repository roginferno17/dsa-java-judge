import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 4 — Binary search on 1D arrays (13 problems).
 *
 * Almost every bug in this step is one of three things: an overflowing midpoint,
 * a loop bound that is off by one, or forgetting which half is guaranteed sorted.
 * The hidden cases are chosen to catch exactly those.
 */
export const step04OneD: Record<string, ProblemMetadata> = {
  "binary-search-x": {
    slug: "binary-search-x",
    title: "Binary Search to Find X in a Sorted Array",
    description:
      "The array is sorted ascending with distinct values. Return the index of target, or -1 if it is absent. Must run in O(log n).",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums is sorted ascending", "-10^9 ≤ nums[i], target ≤ 10^9"],
    className: "Solution",
    methodName: "search",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [-1, 0, 3, 5, 9, 12], target: 9 }, expectedOutput: 4 },
      { id: 2, inputs: { nums: [-1, 0, 3, 5, 9, 12], target: 2 }, expectedOutput: -1, explanation: "Absent, so -1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [5], target: 5 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [5], target: 3 }, expectedOutput: -1, isHidden: true },
      { id: 5, inputs: { nums: [1, 2], target: 2 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [-1000000000, 1000000000], target: -1000000000 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Sortedness means one comparison against the middle eliminates half the array. Repeating that gives log n steps instead of n.",
      approach: [
        "Keep low = 0 and high = n - 1.",
        "While low <= high, compute mid and compare nums[mid] with target.",
        "Equal means done; smaller means search the right half; larger means the left.",
      ],
      bruteForce: { idea: "Scan every element.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Halve the search range each step.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "mid = (low + high) / 2 overflows once the indices are large; use low + (high - low) / 2.",
        "Using low < high instead of <= misses the case where the range shrinks to one element.",
        "Setting low = mid rather than mid + 1 loops forever, which shows up as Time Limit Exceeded.",
      ],
      javaToolkit: ["low + (high - low) / 2", "while (low <= high)", "Arrays.binarySearch"],
    },
  },

  "lower-bound": {
    slug: "lower-bound",
    title: "Implement Lower Bound",
    description:
      "Return the smallest index i such that nums[i] >= target. If no element qualifies, return nums.length. The array is sorted ascending and may contain duplicates.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums is sorted ascending"],
    className: "Solution",
    methodName: "lowerBound",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int lowerBound(int[] nums, int target) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 2, 3], target: 2 }, expectedOutput: 1, explanation: "The FIRST 2 sits at index 1." },
      { id: 2, inputs: { nums: [3, 5, 8, 15, 19], target: 9 }, expectedOutput: 3, explanation: "15 is the first value not below 9." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 2, 3], target: 4 }, expectedOutput: 3, isHidden: true },
      { id: 4, inputs: { nums: [1, 2, 3], target: 0 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [2, 2, 2], target: 2 }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { nums: [1], target: 1 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Rather than hunting for an exact match, keep the best candidate found so far and keep trying to beat it by searching further left. That handles duplicates and absence in one shape of loop.",
      approach: [
        "Set ans = n so that \"nothing qualifies\" is the default.",
        "While low <= high: if nums[mid] >= target, record mid as the answer and move high to mid - 1.",
        "Otherwise move low to mid + 1. Return ans.",
      ],
      optimal: { idea: "Binary search remembering the leftmost qualifying index.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Returning -1 when nothing qualifies; the specification says n.",
        "Stopping at the first index where nums[mid] >= target without continuing left, which finds *a* qualifying index rather than the smallest.",
        "Confusing this with upper bound: lower bound uses >=, upper bound uses >.",
      ],
      javaToolkit: ["Answer-tracking binary search", "Default answer of n"],
    },
  },

  "upper-bound": {
    slug: "upper-bound",
    title: "Implement Upper Bound",
    description:
      "Return the smallest index i such that nums[i] > target — strictly greater. If no element qualifies, return nums.length.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums is sorted ascending"],
    className: "Solution",
    methodName: "upperBound",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int upperBound(int[] nums, int target) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 2, 3], target: 2 }, expectedOutput: 3, explanation: "The first value strictly above 2 is the 3 at index 3." },
      { id: 2, inputs: { nums: [3, 5, 8, 15, 19], target: 8 }, expectedOutput: 3 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 2, 3], target: 3 }, expectedOutput: 3, isHidden: true },
      { id: 4, inputs: { nums: [1, 2, 3], target: 0 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [2, 2, 2], target: 2 }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { nums: [5], target: 4 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Identical to lower bound with one character changed: > instead of >=. That single change moves the answer past every copy of the target rather than to the first of them.",
      approach: [
        "Set ans = n.",
        "While low <= high: if nums[mid] > target, record mid and search left.",
        "Otherwise search right. Return ans.",
      ],
      optimal: { idea: "Binary search for the first strictly-greater index.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Using >= turns this back into lower bound — the [2,2,2] case distinguishes them: lower bound gives 0, upper bound gives 3.",
        "upperBound - lowerBound is the count of occurrences, which the counting problem in this step relies on.",
      ],
      javaToolkit: ["Strict comparison >", "Answer-tracking binary search"],
    },
  },

  "search-insert-position": {
    slug: "search-insert-position",
    title: "Search Insert Position",
    description:
      "Return the index of target if present. If absent, return the index where it would be inserted to keep the array sorted.",
    constraints: ["1 ≤ nums.length ≤ 10^4", "nums is sorted ascending with distinct values"],
    className: "Solution",
    methodName: "searchInsert",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int searchInsert(int[] nums, int target) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 3, 5, 6], target: 5 }, expectedOutput: 2 },
      { id: 2, inputs: { nums: [1, 3, 5, 6], target: 2 }, expectedOutput: 1, explanation: "2 would sit between 1 and 3, at index 1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 3, 5, 6], target: 7 }, expectedOutput: 4, isHidden: true },
      { id: 4, inputs: { nums: [1, 3, 5, 6], target: 0 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [1], target: 1 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "This is lower bound under another name. The first index whose value is not less than the target is exactly where the target belongs, whether or not it is already there.",
      approach: ["Run a lower-bound search for target.", "Return it directly — no special case is needed."],
      optimal: { idea: "Lower bound.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Handling present and absent separately when one lower bound covers both.",
        "Inserting after the end must give index n, not n - 1.",
      ],
      javaToolkit: ["Lower bound as a building block"],
    },
  },

  "floor-ceil-sorted": {
    slug: "floor-ceil-sorted",
    title: "Floor and Ceil in a Sorted Array",
    description:
      "Return {floor, ceil} for x. The floor is the largest value <= x, the ceil the smallest value >= x. Use -1 where no such value exists.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums is sorted ascending", "0 ≤ nums[i], x ≤ 10^9"],
    className: "Solution",
    methodName: "floorCeil",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "x", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] floorCeil(int[] nums, int x) {
        // Return {floor, ceil}; use -1 when one does not exist.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 4, 4, 7, 8, 10], x: 5 }, expectedOutput: [4, 7], explanation: "4 is the largest value at most 5; 7 is the smallest at least 5." },
      { id: 2, inputs: { nums: [3, 4, 4, 7], x: 4 }, expectedOutput: [4, 4], explanation: "When x is present it is both floor and ceil." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [5, 6, 7], x: 1 }, expectedOutput: [-1, 5], isHidden: true },
      { id: 4, inputs: { nums: [1, 2, 3], x: 9 }, expectedOutput: [3, -1], isHidden: true },
      { id: 5, inputs: { nums: [4], x: 4 }, expectedOutput: [4, 4], isHidden: true },
    ],
    learn: {
      intuition:
        "Two independent binary searches, each remembering the best candidate so far — one reaching down, the other up. The ceil is exactly the lower bound's value.",
      approach: [
        "Search for floor: when nums[mid] <= x, record it and move right.",
        "Search for ceil: when nums[mid] >= x, record it and move left.",
        "Return both, using -1 wherever nothing was recorded.",
      ],
      bruteForce: { idea: "Scan the array tracking both.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Two answer-tracking binary searches.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Returning indices instead of values.",
        "x smaller than everything has no floor; x larger than everything has no ceil — both are hidden cases.",
        "When x is present, floor and ceil are both x.",
      ],
      javaToolkit: ["Answer-tracking binary search", "Running two searches over one array"],
    },
  },

  "first-last-occurrence": {
    slug: "first-last-occurrence",
    title: "First and Last Occurrence of a Number",
    description:
      "The sorted array may contain duplicates. Return {firstIndex, lastIndex} for target, or {-1, -1} if it is absent.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums is sorted ascending"],
    className: "Solution",
    methodName: "searchRange",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [5, 7, 7, 8, 8, 10], target: 8 }, expectedOutput: [3, 4] },
      { id: 2, inputs: { nums: [5, 7, 7, 8, 8, 10], target: 6 }, expectedOutput: [-1, -1], explanation: "Absent." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], target: 1 }, expectedOutput: [0, 0], isHidden: true },
      { id: 4, inputs: { nums: [2, 2, 2, 2], target: 2 }, expectedOutput: [0, 3], isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3], target: 3 }, expectedOutput: [2, 2], isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3], target: 0 }, expectedOutput: [-1, -1], isHidden: true },
    ],
    learn: {
      intuition:
        "Lower bound gives the first occurrence directly. Upper bound minus one gives the last. Both are O(log n), so finding the whole range costs no more than finding one element.",
      approach: [
        "Compute lb = lowerBound(target).",
        "If lb == n or nums[lb] != target, the value is absent — return {-1, -1}.",
        "Otherwise return {lb, upperBound(target) - 1}.",
      ],
      bruteForce: { idea: "Find any occurrence then walk outwards.", time: "O(n) when all values are equal", space: "O(1)" },
      optimal: { idea: "Lower bound and upper bound.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Walking outwards from a match is O(n) on an all-equal array — a hidden case checks this.",
        "Forgetting to confirm nums[lb] actually equals target before trusting the bound.",
      ],
      javaToolkit: ["lowerBound and upperBound as helpers", "Reusing one primitive twice"],
    },
  },

  "count-occurrences": {
    slug: "count-occurrences",
    title: "Count Occurrences in a Sorted Array",
    description: "Return how many times target appears in the sorted array.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums is sorted ascending"],
    className: "Solution",
    methodName: "countOccurrences",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countOccurrences(int[] nums, int target) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 4, 4, 4, 6], target: 4 }, expectedOutput: 3 },
      { id: 2, inputs: { nums: [2, 4, 6], target: 5 }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 1, 1, 1], target: 1 }, expectedOutput: 4, isHidden: true },
      { id: 4, inputs: { nums: [7], target: 7 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 3], target: 4 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "The occurrences of a value form one contiguous block in a sorted array. Upper bound minus lower bound is exactly the width of that block, and it is 0 when the value is absent — no special case needed.",
      approach: ["Compute upperBound(target) - lowerBound(target).", "Return it."],
      bruteForce: { idea: "Count with a linear scan.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Difference of the two bounds.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Adding an absence check is harmless but unnecessary — the subtraction already yields 0.",
        "Mixing up which bound to subtract gives a negative count.",
      ],
      javaToolkit: ["upperBound - lowerBound", "Composing binary search primitives"],
    },
  },

  "search-rotated-1": {
    slug: "search-rotated-1",
    title: "Search in Rotated Sorted Array I",
    description:
      "The array was sorted ascending with distinct values, then rotated at an unknown pivot. Return the index of target, or -1. Must run in O(log n).",
    constraints: ["1 ≤ nums.length ≤ 5000", "All values are distinct"],
    className: "Solution",
    methodName: "search",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }, expectedOutput: 4 },
      { id: 2, inputs: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }, expectedOutput: -1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1], target: 1 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [1, 3], target: 3 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [3, 1], target: 1 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [5, 1, 2, 3, 4], target: 5 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Cut anywhere and at least one of the two halves is still properly sorted. Identify which one, check whether the target lies inside its range, and discard the other half.",
      approach: [
        "Compute mid. If nums[mid] == target you are done.",
        "If nums[low] <= nums[mid] the left half is sorted: go left when target sits between nums[low] and nums[mid], otherwise right.",
        "Otherwise the right half is sorted: apply the mirror test.",
      ],
      bruteForce: { idea: "Linear scan.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Binary search on whichever half is sorted.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Using < instead of <= when testing nums[low] <= nums[mid] breaks on two-element ranges.",
        "The range test must be inclusive on the sorted end you are comparing against.",
        "An unrotated array must still work — rotation by zero is allowed.",
      ],
      javaToolkit: ["Identifying the sorted half", "Inclusive range containment tests"],
    },
  },

  "search-rotated-2": {
    slug: "search-rotated-2",
    title: "Search in Rotated Sorted Array II",
    description:
      "As before, but duplicates are now allowed. Return whether target is present. Duplicates break the usual halving trick in one specific case.",
    constraints: ["1 ≤ nums.length ≤ 5000", "Duplicates are permitted"],
    className: "Solution",
    methodName: "search",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean search(int[] nums, int target) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 5, 6, 0, 0, 1, 2], target: 0 }, expectedOutput: true },
      { id: 2, inputs: { nums: [2, 5, 6, 0, 0, 1, 2], target: 3 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 0, 1, 1, 1], target: 0 }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { nums: [1, 1, 1, 1, 1], target: 2 }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { nums: [1], target: 1 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { nums: [3, 1, 2, 3, 3, 3, 3], target: 2 }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "When nums[low], nums[mid] and nums[high] are all equal you cannot tell which side is sorted. The only safe move is to shrink the window by one from each end and try again — which is why the worst case degrades to O(n).",
      approach: [
        "Handle the equal-ends case first: when nums[low] == nums[mid] == nums[high], increment low and decrement high.",
        "Otherwise proceed exactly as in part I.",
        "Return true on a match, false when the range empties.",
      ],
      bruteForce: { idea: "Linear scan.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Binary search with an ambiguity escape.", time: "O(log n) average, O(n) worst", space: "O(1)" },
      pitfalls: [
        "Omitting the ambiguity case makes [1,0,1,1,1] fail — that is a hidden case here.",
        "Shrinking only one side is not enough; both ends must move.",
        "You genuinely cannot do better than O(n) worst case with duplicates, so do not try.",
      ],
      javaToolkit: ["Handling the ambiguous window", "Shrinking both bounds"],
    },
  },

  "min-rotated-sorted": {
    slug: "min-rotated-sorted",
    title: "Find Minimum in a Rotated Sorted Array",
    description:
      "The array was sorted ascending with distinct values, then rotated. Return the smallest value, in O(log n).",
    constraints: ["1 ≤ nums.length ≤ 5000", "All values are distinct"],
    className: "Solution",
    methodName: "findMin",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int findMin(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [3, 4, 5, 1, 2] }, expectedOutput: 1 },
      { id: 2, inputs: { nums: [4, 5, 6, 7, 0, 1, 2] }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 2, 3] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [2, 1] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [1] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [11, 13, 15, 17] }, expectedOutput: 11, isHidden: true },
    ],
    learn: {
      intuition:
        "The minimum is the one place where the ascending order breaks. Comparing the middle with the right end tells you which side that break is on, without ever needing the target.",
      approach: [
        "While low < high, compute mid.",
        "If nums[mid] > nums[high] the break is to the right, so low = mid + 1.",
        "Otherwise the break is at mid or left of it, so high = mid.",
        "When low == high that index holds the minimum.",
      ],
      bruteForce: { idea: "Scan for the smallest value.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Binary search comparing mid with the right end.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Comparing with nums[low] instead of nums[high] needs extra cases; comparing with the right end is cleaner.",
        "Using low <= high with high = mid loops forever.",
        "An unrotated array must return its first element.",
      ],
      javaToolkit: ["while (low < high) with high = mid", "Comparing against the right boundary"],
    },
  },

  "count-rotations": {
    slug: "count-rotations",
    title: "How Many Times Has the Array Been Rotated",
    description:
      "The array was sorted ascending with distinct values, then rotated left some number of times. Return that number, which equals the index of the minimum.",
    constraints: ["1 ≤ nums.length ≤ 5000", "All values are distinct"],
    className: "Solution",
    methodName: "countRotations",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countRotations(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [4, 5, 6, 7, 0, 1, 2] }, expectedOutput: 4, explanation: "The minimum 0 sits at index 4, so the array was rotated four times." },
      { id: 2, inputs: { nums: [1, 2, 3] }, expectedOutput: 0, explanation: "Unrotated." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [2, 1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { nums: [3, 4, 5, 1, 2] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Rotating left by k moves the original first element to index n - k, which puts the minimum at index k. So the rotation count is just the index of the minimum.",
      approach: ["Run the same binary search as finding the minimum.", "Return the index rather than the value."],
      optimal: { idea: "Binary search for the index of the minimum.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Returning the value instead of the index.",
        "An unrotated array gives 0, not n.",
      ],
      javaToolkit: ["Reusing the minimum search", "Returning an index"],
    },
  },

  "single-element-sorted": {
    slug: "single-element-sorted",
    title: "Single Element in a Sorted Array",
    description:
      "Every value appears exactly twice except one, which appears once. The array is sorted. Return that value in O(log n) time and O(1) space.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums.length is odd", "nums is sorted ascending"],
    className: "Solution",
    methodName: "singleNonDuplicate",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int singleNonDuplicate(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 1, 2, 3, 3, 4, 4, 8, 8] }, expectedOutput: 2 },
      { id: 2, inputs: { nums: [3, 3, 7, 7, 10, 11, 11] }, expectedOutput: 10 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [1, 1, 2] }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { nums: [1, 2, 2] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [1, 1, 2, 2, 3] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Before the single element, every pair starts at an even index. After it, every pair starts at an odd index. That flip is what binary search can detect — XOR with 1 turns any index into its partner.",
      approach: [
        "Search on low = 0, high = n - 1 with mid forced even (mid -= mid & 1) or use mid ^ 1 as the partner.",
        "If nums[mid] == nums[mid ^ 1] the single element is to the right, so low = mid + 1.",
        "Otherwise it is at mid or to the left, so high = mid.",
      ],
      bruteForce: { idea: "XOR every element, or scan in pairs.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Binary search on the pairing parity.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "XOR over the whole array is correct but O(n), and the problem asks for O(log n).",
        "Forgetting to align mid to an even index, which breaks the partner comparison.",
        "A single-element array is the answer itself.",
      ],
      javaToolkit: ["mid ^ 1 to find a pair partner", "Parity-based binary search"],
    },
  },

  "find-peak-element": {
    slug: "find-peak-element",
    title: "Find Peak Element",
    description:
      "A peak is any element strictly greater than both neighbours; the ends only need to beat their single neighbour. Return the index of any peak, in O(log n). Assume nums[-1] and nums[n] are negative infinity, and that no two adjacent values are equal.",
    constraints: ["1 ≤ nums.length ≤ 1000", "No two adjacent values are equal"],
    className: "Solution",
    methodName: "findPeakElement",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int findPeakElement(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3, 1] }, expectedOutput: 2, explanation: "3 at index 2 beats both neighbours." },
      { id: 2, inputs: { nums: [1, 3, 5, 6, 4] }, expectedOutput: 3, explanation: "6 is the only value beating both its neighbours." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [1, 2] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [2, 1] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3, 4, 5] }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "You can binary search without the array being sorted. If nums[mid] < nums[mid + 1] you are on a rising slope, and a peak must exist somewhere to the right; if it is falling, a peak exists to the left or at mid. Either way half the array goes.",
      approach: [
        "While low < high, compare nums[mid] with nums[mid + 1].",
        "Rising means low = mid + 1; falling means high = mid.",
        "When low == high that index is a peak.",
      ],
      bruteForce: { idea: "Scan checking each element against its neighbours.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Binary search following the upward slope.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Reading nums[mid + 1] when mid is the last index — the low < high bound is what prevents it.",
        "Several peaks can exist in general. Every test here has exactly one, so any correct method agrees.",
        "A strictly increasing array peaks at the last element.",
      ],
      javaToolkit: ["Binary search without sortedness", "while (low < high) with high = mid"],
    },
  },
}
