import { ProblemMetadata } from "@/lib/types/judge"
import { curriculum } from "@/lib/data/curriculum"

export const problemRegistry: Record<string, ProblemMetadata> = {
  "two-sum": {
    slug: "two-sum",
    title: "Two Sum",
    className: "Solution",
    methodName: "twoSum",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: false },
    starterCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { nums: [2, 7, 11, 15], target: 9 },
        expectedOutput: [0, 1],
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        id: 2,
        inputs: { nums: [3, 2, 4], target: 6 },
        expectedOutput: [1, 2],
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
      {
        id: 3,
        inputs: { nums: [3, 3], target: 6 },
        expectedOutput: [0, 1],
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
      },
    ],
    hiddenTestCases: [
      {
        id: 4,
        inputs: { nums: [-1, -2, -3, -4, -5], target: -8 },
        expectedOutput: [2, 4],
        isHidden: true,
      },
      {
        id: 5,
        inputs: { nums: [0, 4, 3, 0], target: 0 },
        expectedOutput: [0, 3],
        isHidden: true,
      },
    ],
  },

  "largest-element-array": {
    slug: "largest-element-array",
    title: "Largest Element in an Array",
    className: "Solution",
    methodName: "largest",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int largest(int[] arr) {
        // Write your solution here
        
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { arr: [1, 8, 7, 56, 90] },
        expectedOutput: 90,
        explanation: "The largest element in the given array is 90.",
      },
      {
        id: 2,
        inputs: { arr: [5, 5, 5, 5] },
        expectedOutput: 5,
        explanation: "The largest element in the given array is 5.",
      },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [-10, -5, -2, -20] }, expectedOutput: -2, isHidden: true },
      { id: 4, inputs: { arr: [100] }, expectedOutput: 100, isHidden: true },
    ],
  },

  "second-largest-element": {
    slug: "second-largest-element",
    title: "Second Largest Element in an Array",
    className: "Solution",
    methodName: "getSecondLargest",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int getSecondLargest(int[] arr) {
        // Return -1 if no second largest exists
        
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { arr: [12, 35, 1, 10, 34, 1] },
        expectedOutput: 34,
        explanation: "The largest is 35 and the second largest is 34.",
      },
      {
        id: 2,
        inputs: { arr: [10, 10, 10] },
        expectedOutput: -1,
        explanation: "All elements are equal, so no second largest exists.",
      },
    ],
  },

  "check-sorted-array": {
    slug: "check-sorted-array",
    title: "Check if Array is Sorted",
    className: "Solution",
    methodName: "check",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean check(int[] nums) {
        // Return true if array is sorted (or sorted and rotated), false otherwise
        
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { nums: [3, 4, 5, 1, 2] },
        expectedOutput: true,
      },
      {
        id: 2,
        inputs: { nums: [2, 1, 3, 4] },
        expectedOutput: false,
      },
      {
        id: 3,
        inputs: { nums: [1, 2, 3] },
        expectedOutput: true,
      },
    ],
  },

  "remove-duplicates-sorted": {
    slug: "remove-duplicates-sorted",
    title: "Remove Duplicates from Sorted Array",
    className: "Solution",
    methodName: "removeDuplicates",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Return k, the number of unique elements
        
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { nums: [1, 1, 2] },
        expectedOutput: 2,
      },
      {
        id: 2,
        inputs: { nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] },
        expectedOutput: 5,
      },
    ],
  },

  "kadanes-algorithm": {
    slug: "kadanes-algorithm",
    title: "Maximum Subarray Sum (Kadane's Algorithm)",
    className: "Solution",
    methodName: "maxSubArray",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
        expectedOutput: 6,
        explanation: "The subarray [4, -1, 2, 1] has the largest sum 6.",
      },
      {
        id: 2,
        inputs: { nums: [1] },
        expectedOutput: 1,
      },
      {
        id: 3,
        inputs: { nums: [5, 4, -1, 7, 8] },
        expectedOutput: 23,
      },
    ],
  },

  "stock-buy-sell": {
    slug: "stock-buy-sell",
    title: "Best Time to Buy and Sell Stock",
    className: "Solution",
    methodName: "maxProfit",
    parameters: [{ name: "prices", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your solution here
        
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { prices: [7, 1, 5, 3, 6, 4] },
        expectedOutput: 5,
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
      },
      {
        id: 2,
        inputs: { prices: [7, 6, 4, 3, 1] },
        expectedOutput: 0,
        explanation: "In this case, no transactions are done and the max profit = 0.",
      },
    ],
  },

  "find-missing-number": {
    slug: "find-missing-number",
    title: "Missing Number",
    className: "Solution",
    methodName: "missingNumber",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int missingNumber(int[] nums) {
        // Write your solution here
        
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { nums: [3, 0, 1] },
        expectedOutput: 2,
      },
      {
        id: 2,
        inputs: { nums: [0, 1] },
        expectedOutput: 2,
      },
      {
        id: 3,
        inputs: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] },
        expectedOutput: 8,
      },
    ],
  },

  "check-palindrome": {
    slug: "check-palindrome",
    title: "Palindrome Number",
    className: "Solution",
    methodName: "isPalindrome",
    parameters: [{ name: "x", type: "int" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your solution here
        
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { x: 121 }, expectedOutput: true },
      { id: 2, inputs: { x: -121 }, expectedOutput: false },
      { id: 3, inputs: { x: 10 }, expectedOutput: false },
    ],
  },

  "reverse-a-number": {
    slug: "reverse-a-number",
    title: "Reverse Integer",
    className: "Solution",
    methodName: "reverse",
    parameters: [{ name: "x", type: "int" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int reverse(int x) {
        // Write your solution here
        
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { x: 123 }, expectedOutput: 321 },
      { id: 2, inputs: { x: -123 }, expectedOutput: -321 },
      { id: 3, inputs: { x: 120 }, expectedOutput: 21 },
    ],
  },

  "fibonacci-number": {
    slug: "fibonacci-number",
    title: "Fibonacci Number",
    className: "Solution",
    methodName: "fib",
    parameters: [{ name: "n", type: "int" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int fib(int n) {
        // Write your solution here
        
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 2 }, expectedOutput: 1 },
      { id: 2, inputs: { n: 3 }, expectedOutput: 2 },
      { id: 3, inputs: { n: 4 }, expectedOutput: 3 },
    ],
  },

  "sort-012": {
    slug: "sort-012",
    title: "Sort Colors (Sort 0s, 1s and 2s)",
    className: "Solution",
    methodName: "sortColors",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "void",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void sortColors(int[] nums) {
        // Sort the array in-place
        
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { nums: [2, 0, 2, 1, 1, 0] },
        expectedOutput: [0, 0, 1, 1, 2, 2],
      },
      {
        id: 2,
        inputs: { nums: [2, 0, 1] },
        expectedOutput: [0, 1, 2],
      },
    ],
  },
}

/**
 * Helper to convert camelCase from hyphen-separated slugs
 */
function slugToCamelCase(slug: string): string {
  const parts = slug.split("-")
  if (parts.length === 0) return "solve"
  return (
    parts[0] +
    parts
      .slice(1)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("")
  )
}

/**
 * Retrieve problem metadata or dynamically generate standard LeetCode function signature
 */
export function getProblemMetadata(slug: string): ProblemMetadata {
  if (problemRegistry[slug]) {
    return problemRegistry[slug]
  }

  // Find problem in curriculum to get title
  let foundTitle = "Problem"
  for (const step of curriculum) {
    for (const topic of step.topics) {
      const p = topic.problems.find((pr) => pr.slug === slug)
      if (p) {
        foundTitle = p.title
        break
      }
    }
  }

  const methodName = slugToCamelCase(slug)

  // Default fallback metadata
  return {
    slug,
    title: foundTitle,
    description: "Given the method signature below, implement the required algorithm and return the computed answer.",
    className: "Solution",
    methodName,
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] ${methodName}(int[] nums) {
        // Write your solution here
        return nums;
    }
}`,
    sampleTestCases: [
      {
        id: 1,
        inputs: { nums: [1, 2, 3, 4] },
        expectedOutput: [1, 2, 3, 4],
      },
    ],
  }
}
