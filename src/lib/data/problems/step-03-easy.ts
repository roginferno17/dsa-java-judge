import type { ProblemMetadata } from "@/lib/types/judge"

/** Step 3 — Easy array problems. */
export const step03Easy: Record<string, ProblemMetadata> = {
  "left-rotate-one": {
    slug: "left-rotate-one",
    title: "Left Rotate an Array by One Place",
    description:
      "Shift every element one position to the left, in place. The first element wraps around to the end.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "rotateLeftByOne",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void rotateLeftByOne(int[] arr) {
        // Rotate in place. Return nothing.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 2, 3, 4, 5] }, expectedOutput: [2, 3, 4, 5, 1], explanation: "1 moves to the back and everything else shifts left." },
      { id: 2, inputs: { arr: [3, 4, 1, 5, 3, 2] }, expectedOutput: [4, 1, 5, 3, 2, 3] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [7] }, expectedOutput: [7], isHidden: true },
      { id: 4, inputs: { arr: [1, 2] }, expectedOutput: [2, 1], isHidden: true },
      { id: 5, inputs: { arr: [0, 0, 0] }, expectedOutput: [0, 0, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "Only one value is at risk of being lost — the first. Save it, slide everything else down a slot, then drop it back at the end.",
      approach: [
        "Store arr[0] in a temporary variable.",
        "For i from 0 to n - 2, copy arr[i + 1] into arr[i].",
        "Write the saved value into arr[n - 1].",
      ],
      optimal: { idea: "Save the head, shift left, restore at the tail.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Overwriting arr[0] before saving it, which loses the value entirely.",
        "Shifting right instead of left, or looping to n - 1 and reading past the end.",
        "A one-element array comes out unchanged.",
      ],
      javaToolkit: ["Temp variable", "Single shifting loop"],
    },
  },

  "left-rotate-d": {
    slug: "left-rotate-d",
    title: "Left Rotate an Array by D Places",
    description:
      "Rotate the array left by d positions, in place. d may exceed the array length, in which case it wraps around.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "0 ≤ d ≤ 10^9"],
    className: "Solution",
    methodName: "rotateLeft",
    parameters: [
      { name: "arr", type: "int[]" },
      { name: "d", type: "int" },
    ],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void rotateLeft(int[] arr, int d) {
        // d can be larger than arr.length.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 2, 3, 4, 5, 6, 7], d: 2 }, expectedOutput: [3, 4, 5, 6, 7, 1, 2] },
      { id: 2, inputs: { arr: [1, 2, 3], d: 4 }, expectedOutput: [2, 3, 1], explanation: "Rotating a length-3 array by 4 is the same as rotating by 1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1, 2, 3], d: 0 }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 4, inputs: { arr: [1, 2, 3], d: 3 }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 5, inputs: { arr: [5], d: 1000000000 }, expectedOutput: [5], isHidden: true },
      { id: 6, inputs: { arr: [1, 2, 3, 4], d: 2 }, expectedOutput: [3, 4, 1, 2], isHidden: true },
    ],
    learn: {
      intuition:
        "Reversing three times does the whole job with no extra memory: reverse the first d, reverse the rest, then reverse everything. The two blocks swap places and each ends up back in order.",
      approach: [
        "Reduce d modulo n first, so a huge d costs nothing.",
        "Reverse arr[0..d-1], then arr[d..n-1].",
        "Reverse the entire array.",
      ],
      bruteForce: { idea: "Copy the first d into a buffer, shift the rest left, append the buffer.", time: "O(n)", space: "O(d)" },
      optimal: { idea: "The three-reversal trick.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Forgetting d %= n, which throws the moment d exceeds the length.",
        "Rotating one place d times is O(n × d) and times out.",
        "d = 0 and d = n must both leave the array unchanged.",
      ],
      javaToolkit: ["Reversing a subrange in place", "Modulo to normalise d", "Two-pointer reversal"],
    },
  },

  "move-zeros-end": {
    slug: "move-zeros-end",
    title: "Move Zeros to End",
    description:
      "Move every zero to the end of the array in place, keeping the relative order of the non-zero values unchanged.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "moveZeroes",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void moveZeroes(int[] nums) {
        // Keep the order of the non-zero values.
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [0, 1, 0, 3, 12] }, expectedOutput: [1, 3, 12, 0, 0], explanation: "1, 3 and 12 keep their relative order." },
      { id: 2, inputs: { nums: [0] }, expectedOutput: [0] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 2, 3] }, expectedOutput: [1, 2, 3], isHidden: true },
      { id: 4, inputs: { nums: [0, 0, 0] }, expectedOutput: [0, 0, 0], isHidden: true },
      { id: 5, inputs: { nums: [1, 0] }, expectedOutput: [1, 0], isHidden: true },
      { id: 6, inputs: { nums: [0, -1, 0, 2] }, expectedOutput: [-1, 2, 0, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "One pointer marks where the next non-zero belongs, the other scans ahead. Whatever is left after the write pointer must be zeros.",
      approach: [
        "Keep a write index at 0.",
        "Scan the array; whenever nums[i] is non-zero, write it at nums[write] and advance write.",
        "Fill from write to the end with zeros.",
      ],
      bruteForce: { idea: "Copy non-zeros into a new array, then pad with zeros.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Two-pointer compaction in place.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Swapping every element with the write pointer also works but does needless writes when there are no zeros.",
        "Sorting or partitioning destroys the required relative order.",
        "All zeros and no zeros must both come out unchanged.",
      ],
      javaToolkit: ["Two-pointer read/write", "Arrays.fill for the tail"],
    },
  },

  "linear-search": {
    slug: "linear-search",
    title: "Linear Search",
    description: "Return the index of the first occurrence of target, or -1 when it is not present.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i], target ≤ 10^9"],
    className: "Solution",
    methodName: "search",
    parameters: [
      { name: "arr", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int search(int[] arr, int target) {
        return -1;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 2, 3, 4, 5], target: 4 }, expectedOutput: 3 },
      { id: 2, inputs: { arr: [1, 2, 3], target: 9 }, expectedOutput: -1, explanation: "Not present, so -1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [5], target: 5 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { arr: [2, 2, 2], target: 2 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { arr: [-1, -2], target: -2 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "With no ordering to exploit there is nothing better than checking each element in turn. Returning at the first match is what makes it the FIRST occurrence.",
      approach: [
        "Loop over the indices.",
        "Return i as soon as arr[i] equals target.",
        "Return -1 if the loop finishes without a match.",
      ],
      optimal: { idea: "Scan until found.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Continuing after a match and returning the last index rather than the first.",
        "Returning the value instead of its index.",
        "Binary search would be faster but is only valid on sorted input.",
      ],
      javaToolkit: ["Early return from a loop", "-1 as a not-found sentinel"],
    },
  },

  "find-union": {
    slug: "find-union",
    title: "Find the Union",
    description:
      "Both arrays are sorted ascending and may contain duplicates. Return their union — every distinct value from either, in ascending order.",
    constraints: ["1 ≤ a.length, b.length ≤ 10^5", "Both arrays are sorted non-decreasing"],
    className: "Solution",
    methodName: "findUnion",
    parameters: [
      { name: "a", type: "int[]" },
      { name: "b", type: "int[]" },
    ],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> findUnion(int[] a, int[] b) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: [1, 2, 3, 4, 5], b: [2, 3, 4, 4, 5] }, expectedOutput: [1, 2, 3, 4, 5] },
      { id: 2, inputs: { a: [1, 1, 1], b: [2, 2] }, expectedOutput: [1, 2], explanation: "Duplicates collapse both within and across the arrays." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: [1], b: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { a: [1, 2], b: [3, 4] }, expectedOutput: [1, 2, 3, 4], isHidden: true },
      { id: 5, inputs: { a: [-2, -1], b: [-1, 0] }, expectedOutput: [-2, -1, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "Both inputs are already sorted, so one merge-style walk produces the answer in order. A HashSet works too, but throws away the ordering you were handed and costs extra memory.",
      approach: [
        "Two pointers, one per array.",
        "Take whichever front value is smaller; on a tie take one value and advance both.",
        "Before appending, skip it if it equals the last value already added.",
        "Drain whichever array still has elements left.",
      ],
      bruteForce: { idea: "Put everything into a TreeSet.", time: "O((n+m) log(n+m))", space: "O(n+m)" },
      optimal: { idea: "Two-pointer merge with duplicate suppression.", time: "O(n + m)", space: "O(1) beyond the output" },
      pitfalls: [
        "Forgetting to drain the remaining tail of one array.",
        "Suppressing duplicates only within each array rather than against the output list.",
        "Advancing only one pointer on a tie, which emits the value twice.",
      ],
      javaToolkit: ["Two-pointer merge", "Comparing against the last appended value", "TreeSet as a simpler fallback"],
    },
  },

  "max-consecutive-ones": {
    slug: "max-consecutive-ones",
    title: "Maximum Consecutive Ones",
    description: "The array contains only 0 and 1. Return the length of the longest run of consecutive 1s.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums[i] is 0 or 1"],
    className: "Solution",
    methodName: "findMaxConsecutiveOnes",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 1, 0, 1, 1, 1] }, expectedOutput: 3, explanation: "The final three 1s form the longest run." },
      { id: 2, inputs: { nums: [1, 0, 1, 1, 0, 1] }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [0] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [1] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { nums: [1, 1, 1] }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { nums: [0, 0, 0] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Keep a running length that grows on every 1 and resets on every 0, remembering the largest it ever reached.",
      approach: [
        "Track current and best, both starting at 0.",
        "On a 1, increment current and update best.",
        "On a 0, reset current to 0.",
      ],
      optimal: { idea: "One pass with a resetting counter.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Updating best only when a 0 is seen misses a run that reaches the end of the array.",
        "Forgetting to reset on a 0 counts every 1 in the array.",
        "An array with no 1s must return 0.",
      ],
      javaToolkit: ["Running counter with reset", "Math.max"],
    },
  },

  "find-unique-number": {
    slug: "find-unique-number",
    title: "Find the Number That Appears Once",
    description:
      "Every value appears exactly twice except one, which appears once. Return that value, in linear time and constant extra space.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "nums.length is odd", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "singleNumber",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int singleNumber(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 2, 1] }, expectedOutput: 1 },
      { id: 2, inputs: { nums: [4, 1, 2, 1, 2] }, expectedOutput: 4 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [7] }, expectedOutput: 7, isHidden: true },
      { id: 4, inputs: { nums: [-1, -1, -3] }, expectedOutput: -3, isHidden: true },
      { id: 5, inputs: { nums: [0, 1, 0] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [1000000000, 5, 1000000000] }, expectedOutput: 5, isHidden: true },
    ],
    learn: {
      intuition:
        "XOR has two properties that solve this outright: a ^ a is 0, and a ^ 0 is a. XOR everything together and each pair cancels itself, leaving only the value with no partner.",
      approach: [
        "Start an accumulator at 0.",
        "XOR every element into it.",
        "Return the accumulator.",
      ],
      bruteForce: { idea: "Count occurrences in a HashMap.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "XOR the whole array.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "This works only because every other value appears exactly twice; three occurrences would break it.",
        "XOR handles negatives correctly — it works on the bit pattern, so no special case is needed.",
      ],
      javaToolkit: ["The ^ operator", "a ^ a == 0", "a ^ 0 == a"],
    },
  },
}
