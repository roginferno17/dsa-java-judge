import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 8 — Bit Manipulation (18 problems).
 *
 * Two Java-specific traps run through this whole step. Shifting an int by 32 or
 * more is a no-op rather than zero, because Java masks the shift distance to 5
 * bits. And >> preserves the sign while >>> does not, which matters the moment a
 * negative number appears.
 */
export const step08: Record<string, ProblemMetadata> = {
  "intro-bit-manipulation": {
    slug: "intro-bit-manipulation",
    title: "Introduction to Bit Manipulation",
    description:
      "Return the binary representation of a non-negative integer as a string, without leading zeros. 0 gives \"0\". This is the mental model the rest of the step relies on: a number is a row of bits you can inspect one at a time.",
    constraints: ["0 ≤ n ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "toBinary",
    parameters: [{ name: "n", type: "int" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String toBinary(int n) {
        // No leading zeros. 0 gives "0".
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 13 }, expectedOutput: "1101", explanation: "8 + 4 + 1, so bits 3, 2 and 0 are set." },
      { id: 2, inputs: { n: 1 }, expectedOutput: "1" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: "0", isHidden: true },
      { id: 4, inputs: { n: 2147483647 }, expectedOutput: "1111111111111111111111111111111", isHidden: true },
      { id: 5, inputs: { n: 8 }, expectedOutput: "1000", isHidden: true },
    ],
    learn: {
      intuition:
        "Dividing by 2 and keeping the remainder peels off the lowest bit, exactly as dividing by 10 peels off the lowest decimal digit. The bits come out backwards, so reverse at the end.",
      approach: [
        "Handle 0 explicitly — the loop below produces nothing for it.",
        "While n is non-zero, append n & 1 and shift right by one.",
        "Reverse the collected digits.",
      ],
      optimal: { idea: "Extract bits with & 1 and >>.", time: "O(log n)", space: "O(log n)" },
      pitfalls: [
        "n = 0 must give \"0\", not an empty string.",
        "Integer.toBinaryString does this in one call, but the exercise is seeing the mechanics.",
        "Using n % 2 works for non-negative values; n & 1 is the same thing and works for negatives too.",
      ],
      javaToolkit: ["n & 1 to read the lowest bit", "n >> 1 to drop it", "Integer.toBinaryString", "StringBuilder.reverse"],
    },
  },

  "check-ith-bit": {
    slug: "check-ith-bit",
    title: "Check if the i-th Bit Is Set",
    description: "Return whether bit i of n is 1, counting from 0 at the least significant end.",
    constraints: ["0 ≤ n ≤ 2^31 - 1", "0 ≤ i ≤ 30"],
    className: "Solution",
    methodName: "isBitSet",
    parameters: [
      { name: "n", type: "int" },
      { name: "i", type: "int" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isBitSet(int n, int i) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 13, i: 2 }, expectedOutput: true, explanation: "13 is 1101, and bit 2 is 1." },
      { id: 2, inputs: { n: 13, i: 1 }, expectedOutput: false, explanation: "Bit 1 of 1101 is 0." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0, i: 0 }, expectedOutput: false, isHidden: true },
      { id: 4, inputs: { n: 1, i: 0 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { n: 1073741824, i: 30 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { n: 8, i: 2 }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Shift a single 1 into position i and see whether it lines up with a 1 in n. Masking with & keeps only that bit, so the result is non-zero exactly when the bit is set.",
      approach: [
        "Build the mask 1 << i.",
        "Return whether (n & mask) != 0.",
      ],
      optimal: { idea: "Mask with a shifted 1.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "Comparing (n & mask) == 1 only works for i = 0; the masked value is 2^i, not 1.",
        "Shifting n right by i and checking & 1 is equivalent and equally fine.",
        "1 << 31 is negative in Java, since int is signed — a real consideration at the top bit.",
      ],
      javaToolkit: ["1 << i as a mask", "& to test a bit", "Comparing against 0, not 1"],
    },
  },

  "check-odd-even": {
    slug: "check-odd-even",
    title: "Check if a Number Is Odd",
    description: "Return whether n is odd, using a bitwise test rather than the modulo operator.",
    constraints: ["-2^31 ≤ n ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "isOdd",
    parameters: [{ name: "n", type: "int" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isOdd(int n) {
        // Use a bitwise test, not %.
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 7 }, expectedOutput: true },
      { id: 2, inputs: { n: 8 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: false, isHidden: true },
      { id: 4, inputs: { n: -3 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { n: -4 }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { n: -2147483648 }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Every even number ends in a 0 bit and every odd number in a 1, so the lowest bit IS the parity. Unlike %, this works identically for negative numbers.",
      approach: ["Return (n & 1) != 0."],
      optimal: { idea: "Test the lowest bit.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "n % 2 == 1 is FALSE for negative odd numbers in Java, because % keeps the dividend's sign — -3 % 2 is -1. The & test has no such problem, which is why two hidden cases are negative.",
        "n % 2 != 0 does work, but & 1 states the intent more directly.",
      ],
      javaToolkit: ["n & 1 for parity", "Why % is sign-sensitive in Java"],
    },
  },

  "power-of-two": {
    slug: "power-of-two",
    title: "Check if a Number Is a Power of Two",
    description: "Return whether n is a power of two. Zero and negatives are not.",
    constraints: ["-2^31 ≤ n ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "isPowerOfTwo",
    parameters: [{ name: "n", type: "int" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isPowerOfTwo(int n) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 16 }, expectedOutput: true, explanation: "10000 in binary — exactly one bit set." },
      { id: 2, inputs: { n: 12 }, expectedOutput: false, explanation: "1100 has two bits set." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1 }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { n: 0 }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { n: -16 }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { n: 1073741824 }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "A power of two has exactly one bit set. Subtracting 1 flips that bit off and turns everything below it on, so the two values share no bits at all — n & (n - 1) is 0.",
      approach: ["Return n > 0 && (n & (n - 1)) == 0."],
      bruteForce: { idea: "Divide by 2 while even and check you reach 1.", time: "O(log n)", space: "O(1)" },
      optimal: { idea: "n & (n - 1) == 0 with a positivity guard.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "Without the n > 0 guard, 0 passes because 0 & -1 is 0.",
        "Negative powers of two also pass the mask test, so the guard covers them too.",
        "n & (n - 1) clearing the lowest set bit is a trick reused in the next problem.",
      ],
      javaToolkit: ["n & (n - 1)", "Positivity guard", "Single-set-bit detection"],
    },
  },

  "count-set-bits": {
    slug: "count-set-bits",
    title: "Count the Number of Set Bits",
    description: "Return how many bits of n are 1. Treat n as an unsigned 32-bit pattern, so negatives count their sign bit too.",
    constraints: ["-2^31 ≤ n ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "countSetBits",
    parameters: [{ name: "n", type: "int" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countSetBits(int n) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 13 }, expectedOutput: 3, explanation: "1101 has three ones." },
      { id: 2, inputs: { n: 0 }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: -1 }, expectedOutput: 32, isHidden: true },
      { id: 4, inputs: { n: 2147483647 }, expectedOutput: 31, isHidden: true },
      { id: 5, inputs: { n: 1 }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { n: -2147483648 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Brian Kernighan's trick: n & (n - 1) removes exactly the lowest set bit. Repeat until nothing is left and the number of iterations is the answer, so the loop runs once per SET bit rather than once per bit.",
      approach: [
        "Loop while n is non-zero.",
        "Each iteration, do n = n & (n - 1) and increment a counter.",
        "Return the counter.",
      ],
      bruteForce: { idea: "Test all 32 bit positions.", time: "O(32)", space: "O(1)" },
      optimal: { idea: "Kernighan's, one iteration per set bit.", time: "O(set bits)", space: "O(1)" },
      pitfalls: [
        "Looping with n > 0 never terminates correctly for negatives; n != 0 is the right condition.",
        "Shifting with >> on a negative number fills with 1s and loops forever — use >>> if you shift.",
        "-1 has all 32 bits set, which is a good check that you are treating the pattern as unsigned.",
      ],
      javaToolkit: ["n & (n - 1)", "Integer.bitCount", ">>> versus >>"],
    },
  },

  "rightmost-unset-bit": {
    slug: "rightmost-unset-bit",
    title: "Set the Rightmost Unset Bit",
    description:
      "Return n with its lowest 0 bit flipped to 1. Every non-negative int has one, since the sign bit is always 0.",
    constraints: ["0 ≤ n ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "setRightmostUnsetBit",
    parameters: [{ name: "n", type: "int" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int setRightmostUnsetBit(int n) {
        return n;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 10 }, expectedOutput: 11, explanation: "1010 has its lowest 0 at position 0, giving 1011." },
      { id: 2, inputs: { n: 7 }, expectedOutput: 15, explanation: "0111 has its lowest 0 at position 3, so the answer is 1111." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { n: 5 }, expectedOutput: 7, isHidden: true },
      { id: 5, inputs: { n: 12 }, expectedOutput: 13, isHidden: true },
      { id: 6, inputs: { n: 1 }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "n | (n + 1) sets the lowest zero bit. Adding 1 carries through the trailing ones and lands on the first zero, and ORing merges that into the original.",
      approach: ["Return n | (n + 1)."],
      bruteForce: { idea: "Scan bit positions for the first 0 and OR in that mask.", time: "O(32)", space: "O(1)" },
      optimal: { idea: "n | (n + 1).", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "7 is 0111, so its lowest unset bit is position 3 and the answer is 15 — 'all ones' only applies to a full 32-bit value.",
        "0 has its lowest zero at position 0, giving 1.",
        "This mirrors n & (n - 1), which clears the lowest SET bit.",
      ],
      javaToolkit: ["n | (n + 1)", "Carry propagation through trailing ones"],
    },
  },

  "swap-two-numbers": {
    slug: "swap-two-numbers",
    title: "Swap Two Numbers Without a Temporary",
    description: "Return {b, a} — the two inputs swapped — without using a third variable.",
    constraints: ["-2^31 ≤ a, b ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "swap",
    parameters: [
      { name: "a", type: "int" },
      { name: "b", type: "int" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] swap(int a, int b) {
        // No temporary variable.
        return new int[]{ a, b };
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: 3, b: 7 }, expectedOutput: [7, 3] },
      { id: 2, inputs: { a: -1, b: 5 }, expectedOutput: [5, -1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: 0, b: 0 }, expectedOutput: [0, 0], isHidden: true },
      { id: 4, inputs: { a: 5, b: 5 }, expectedOutput: [5, 5], isHidden: true },
      { id: 5, inputs: { a: 2147483647, b: -2147483648 }, expectedOutput: [-2147483648, 2147483647], isHidden: true },
    ],
    learn: {
      intuition:
        "XOR is its own inverse, so a ^= b; b ^= a; a ^= b walks the two values past each other. Unlike the addition version it never overflows, because XOR discards carries entirely.",
      approach: ["a = a ^ b, then b = a ^ b (recovering the original a), then a = a ^ b (recovering the original b)."],
      optimal: { idea: "Triple XOR.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "The addition trick (a = a + b, ...) overflows for values near the int limits — a hidden case uses exactly those.",
        "XOR-swapping a variable with ITSELF zeroes it; that only matters when swapping array slots by index.",
        "In real code a temporary is clearer and just as fast; this is an exercise in the identity.",
      ],
      javaToolkit: ["XOR swap", "a ^ a == 0", "Why addition overflows and XOR does not"],
    },
  },

  "divide-without-ops": {
    slug: "divide-without-ops",
    title: "Divide Two Integers Without Multiplication or Division",
    description:
      "Return the quotient of dividend by divisor, truncated toward zero, without using *, / or %. If the result exceeds the 32-bit signed range, return Integer.MAX_VALUE.",
    constraints: ["-2^31 ≤ dividend, divisor ≤ 2^31 - 1", "divisor is not 0"],
    className: "Solution",
    methodName: "divide",
    parameters: [
      { name: "dividend", type: "int" },
      { name: "divisor", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int divide(int dividend, int divisor) {
        // No *, / or %.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { dividend: 10, divisor: 3 }, expectedOutput: 3, explanation: "Truncated toward zero." },
      { id: 2, inputs: { dividend: 7, divisor: -3 }, expectedOutput: -2, explanation: "-2.33 truncates to -2, not -3." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { dividend: -2147483648, divisor: -1 }, expectedOutput: 2147483647, isHidden: true },
      { id: 4, inputs: { dividend: 1, divisor: 1 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { dividend: 0, divisor: 5 }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { dividend: -2147483648, divisor: 1 }, expectedOutput: -2147483648, isHidden: true },
      { id: 7, inputs: { dividend: 2147483647, divisor: 2 }, expectedOutput: 1073741823, isHidden: true },
    ],
    learn: {
      intuition:
        "Repeated subtraction is O(quotient) and far too slow. Instead subtract the largest doubling of the divisor that still fits — that is long division in binary, and it finishes in about 31 steps.",
      approach: [
        "Work in long and with absolute values, remembering the sign separately.",
        "For each bit from 31 down to 0, if the divisor shifted left by that many still fits in what remains, subtract it and set that bit of the quotient.",
        "Apply the sign and clamp to the int range.",
      ],
      bruteForce: { idea: "Subtract the divisor repeatedly.", time: "O(quotient)", space: "O(1)" },
      optimal: { idea: "Binary long division by doubling.", time: "O(32)", space: "O(1)" },
      pitfalls: [
        "MIN_VALUE / -1 is 2147483648, which does not fit an int — the only case needing the clamp, and a hidden case checks it.",
        "Math.abs(Integer.MIN_VALUE) is still negative; move to long before negating.",
        "Java truncates toward zero, so 7 / -3 is -2 rather than -3.",
      ],
      javaToolkit: ["Binary long division", "long for the working values", "Clamping to Integer.MAX_VALUE"],
    },
  },

  "count-bits-flip": {
    slug: "count-bits-flip",
    title: "Count Bits to Flip to Convert A to B",
    description: "Return how many bit positions differ between a and b.",
    constraints: ["-2^31 ≤ a, b ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "countBitsToFlip",
    parameters: [
      { name: "a", type: "int" },
      { name: "b", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countBitsToFlip(int a, int b) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: 10, b: 20 }, expectedOutput: 4, explanation: "01010 and 10100 differ in four positions." },
      { id: 2, inputs: { a: 7, b: 7 }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: 0, b: -1 }, expectedOutput: 32, isHidden: true },
      { id: 4, inputs: { a: 1, b: 2 }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { a: -1, b: -1 }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { a: 0, b: 0 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "XOR produces a 1 exactly where two bits differ, so a ^ b is a map of the disagreements. Counting its set bits answers the question directly.",
      approach: ["Compute a ^ b.", "Count the set bits with Kernighan's trick or Integer.bitCount."],
      optimal: { idea: "Count the set bits of a ^ b.", time: "O(set bits)", space: "O(1)" },
      pitfalls: [
        "Comparing bit by bit works but is more code for the same answer.",
        "0 versus -1 differs in all 32 positions, which checks that you handle the sign bit.",
        "The counting loop must use n != 0, not n > 0, for the same reason as count-set-bits.",
      ],
      javaToolkit: ["a ^ b as a difference map", "Integer.bitCount", "Composing two earlier problems"],
    },
  },

  "odd-occurrence": {
    slug: "odd-occurrence",
    title: "Find the Number Appearing an Odd Number of Times",
    description: "Exactly one value appears an odd number of times; every other appears an even number of times. Return it.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "oddOccurrence",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int oddOccurrence(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3, 2, 3, 1, 3] }, expectedOutput: 3, explanation: "3 appears three times; 1 and 2 twice each." },
      { id: 2, inputs: { nums: [5] }, expectedOutput: 5 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 1, 1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { nums: [-2, -2, 7] }, expectedOutput: 7, isHidden: true },
      { id: 5, inputs: { nums: [0, 0, 0] }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { nums: [4, 5, 4, 5, 4] }, expectedOutput: 4, isHidden: true },
    ],
    learn: {
      intuition:
        "XOR of a value with itself is 0, so pairs annihilate. Everything appearing an even number of times cancels completely, leaving only the odd one — the same identity as the single-number problem in Step 3.",
      approach: ["XOR every element into an accumulator starting at 0.", "Return the accumulator."],
      bruteForce: { idea: "Count occurrences in a HashMap.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "XOR the whole array.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "This works for any odd count, not just three — a value appearing five times still leaves one copy.",
        "It relies on exactly one value having an odd count.",
        "Negatives and zero need no special handling, since XOR works on the bit pattern.",
      ],
      javaToolkit: ["XOR cancellation", "Accumulator starting at 0"],
    },
  },

  "power-set-bit": {
    slug: "power-set-bit",
    title: "Power Set Using Bitmasks",
    description:
      "Return every subset of the array, ordered by the bitmask of chosen indices ascending, using bitmask iteration rather than recursion.",
    constraints: ["0 ≤ nums.length ≤ 16"],
    className: "Solution",
    methodName: "powerSet",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> powerSet(int[] nums) {
        // Ordered by index bitmask ascending.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3] }, expectedOutput: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] },
      { id: 2, inputs: { nums: [7] }, expectedOutput: [[], [7]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [] }, expectedOutput: [[]], isHidden: true },
      { id: 4, inputs: { nums: [1, 1] }, expectedOutput: [[], [1], [1], [1, 1]], isHidden: true },
      { id: 5, inputs: { nums: [-1, 0] }, expectedOutput: [[], [-1], [0], [-1, 0]], isHidden: true },
    ],
    learn: {
      intuition:
        "Each subset corresponds to an n-bit number: bit i means index i is included. Counting from 0 to 2^n - 1 therefore enumerates every subset exactly once, with no recursion and no bookkeeping.",
      approach: [
        "Loop mask from 0 to (1 << n) - 1.",
        "For each mask, include index i when bit i is set.",
        "Collect the lists in mask order.",
      ],
      bruteForce: { idea: "Recursive take/skip.", time: "O(2^n × n)", space: "O(n)" },
      optimal: { idea: "Bitmask enumeration.", time: "O(2^n × n)", space: "O(1) beyond the output" },
      pitfalls: [
        "1 << n overflows for n ≥ 31; the constraint keeps n at 16 for that reason.",
        "Duplicate values give duplicate subsets here — this problem does not deduplicate.",
        "An empty input still yields one subset: the empty one.",
      ],
      javaToolkit: ["Bitmask iteration", "(mask >> i) & 1", "1 << n as the count"],
    },
  },

  "xor-l-to-r": {
    slug: "xor-l-to-r",
    title: "XOR of Numbers From L to R",
    description: "Return the XOR of every integer from l to r inclusive.",
    constraints: ["0 ≤ l ≤ r ≤ 10^9"],
    className: "Solution",
    methodName: "xorRange",
    parameters: [
      { name: "l", type: "int" },
      { name: "r", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int xorRange(int l, int r) {
        // A loop is too slow when r reaches 10^9.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { l: 3, r: 9 }, expectedOutput: 2, explanation: "3^4^5^6^7^8^9 = 2." },
      { id: 2, inputs: { l: 1, r: 1 }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { l: 0, r: 0 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { l: 1, r: 4 }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { l: 0, r: 1000000000 }, expectedOutput: 1000000000, isHidden: true },
      { id: 6, inputs: { l: 5, r: 6 }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "XOR from 0 to n follows a four-step cycle depending on n % 4: n, 1, n + 1, 0. Knowing that, the range XOR is prefix(r) ^ prefix(l - 1), because everything below l cancels.",
      approach: [
        "Write a helper for XOR of 0..n using the n % 4 pattern.",
        "Return helper(r) ^ helper(l - 1).",
        "Guard l = 0 so helper(-1) is never needed, or define it as 0.",
      ],
      bruteForce: { idea: "Loop from l to r.", time: "O(r - l)", space: "O(1)" },
      optimal: { idea: "Prefix XOR with the mod-4 pattern.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "A loop is fine for small ranges and times out at 10^9 — one hidden case makes that unmissable.",
        "l = 0 needs care, since prefix(-1) is not covered by the pattern.",
        "The cycle is worth deriving once by hand rather than memorising.",
      ],
      javaToolkit: ["Prefix XOR", "The n % 4 identity", "XOR cancellation over a range"],
    },
  },

  "two-odd-occurrence": {
    slug: "two-odd-occurrence",
    title: "Find the Two Numbers Appearing an Odd Number of Times",
    description:
      "Exactly two values appear an odd number of times; every other appears an even number. Return them as {smaller, larger}.",
    constraints: ["2 ≤ nums.length ≤ 10^5", "-10^9 ≤ nums[i] ≤ 10^9"],
    className: "Solution",
    methodName: "twoOddOccurrences",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] twoOddOccurrences(int[] nums) {
        // Return {smaller, larger}.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [1, 2, 3, 2, 1, 4] }, expectedOutput: [3, 4], explanation: "3 and 4 appear once; 1 and 2 twice each." },
      { id: 2, inputs: { nums: [4, 2] }, expectedOutput: [2, 4] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [1, 1, 1, 2] }, expectedOutput: [1, 2], isHidden: true },
      { id: 4, inputs: { nums: [-1, -1, -1, 5] }, expectedOutput: [-1, 5], isHidden: true },
      { id: 5, inputs: { nums: [0, 7] }, expectedOutput: [0, 7], isHidden: true },
      { id: 6, inputs: { nums: [5, 5, 5, 5, 3, 9] }, expectedOutput: [3, 9], isHidden: true },
    ],
    learn: {
      intuition:
        "XOR everything and you are left with x ^ y for the two odd values. Any bit set in that result is a bit where x and y DIFFER — so partition the array by that one bit and each half contains exactly one of them.",
      approach: [
        "XOR the whole array to get x ^ y.",
        "Isolate its lowest set bit with xy & -xy.",
        "XOR the elements having that bit into one accumulator and the rest into another.",
        "Return the two results in ascending order.",
      ],
      bruteForce: { idea: "Count occurrences in a HashMap.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "XOR, isolate a differing bit, partition.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "x ^ y is never 0, because the two values differ — so a differing bit always exists.",
        "x & -x isolates the lowest set bit and relies on two's complement, which Java uses.",
        "The result must be sorted, or the answer depends on partition order.",
      ],
      javaToolkit: ["x & -x for the lowest set bit", "Partitioning by one bit", "Two XOR accumulators"],
    },
  },

  "prime-factors": {
    slug: "prime-factors",
    title: "Print Prime Factors of a Number",
    description: "Return the distinct prime factors of n in ascending order.",
    constraints: ["1 ≤ n ≤ 10^9"],
    className: "Solution",
    methodName: "primeFactors",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> primeFactors(int n) {
        // Distinct primes, ascending.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 12 }, expectedOutput: [2, 3], explanation: "12 = 2² × 3, and 2 is listed once." },
      { id: 2, inputs: { n: 13 }, expectedOutput: [13], explanation: "A prime is its own only factor." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { n: 100 }, expectedOutput: [2, 5], isHidden: true },
      { id: 5, inputs: { n: 999999937 }, expectedOutput: [999999937], isHidden: true },
      { id: 6, inputs: { n: 64 }, expectedOutput: [2], isHidden: true },
    ],
    learn: {
      intuition:
        "Divide out each factor completely as you find it. That guarantees every factor you meet afterwards is prime, because all its smaller prime divisors are already gone.",
      approach: [
        "For i from 2 while i × i ≤ n: if i divides n, record it once and divide it out entirely.",
        "If anything greater than 1 remains, it is a prime factor too.",
      ],
      bruteForce: { idea: "Test primality of every divisor up to n.", time: "O(n√n)", space: "O(1)" },
      optimal: { idea: "Trial division to √n, dividing each factor out fully.", time: "O(√n)", space: "O(1)" },
      pitfalls: [
        "1 has no prime factors, so the answer is an empty list.",
        "Forgetting the leftover after the loop misses any prime factor larger than √n — the 999999937 case is exactly that.",
        "Recording a factor without dividing it out fully produces duplicates.",
      ],
      javaToolkit: ["Trial division to √n", "Dividing a factor out completely", "The leftover check"],
    },
  },

  "all-divisors": {
    slug: "all-divisors",
    title: "All Divisors of a Number",
    description: "Return every divisor of n in ascending order.",
    constraints: ["1 ≤ n ≤ 10^9"],
    className: "Solution",
    methodName: "allDivisors",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> allDivisors(int n) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 12 }, expectedOutput: [1, 2, 3, 4, 6, 12] },
      { id: 2, inputs: { n: 1 }, expectedOutput: [1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 25 }, expectedOutput: [1, 5, 25], isHidden: true },
      { id: 4, inputs: { n: 13 }, expectedOutput: [1, 13], isHidden: true },
      { id: 5, inputs: { n: 36 }, expectedOutput: [1, 2, 3, 4, 6, 9, 12, 18, 36], isHidden: true },
    ],
    learn: {
      intuition:
        "Divisors come in pairs multiplying to n, so finding one below √n gives its partner for free. That halves the search to √n.",
      approach: [
        "Loop i while i × i ≤ n.",
        "When i divides n, record i and also n / i unless they are equal.",
        "Sort before returning, since the pairs arrive out of order.",
      ],
      bruteForce: { idea: "Test every number up to n.", time: "O(n)", space: "O(d)" },
      optimal: { idea: "Pair divisors around √n.", time: "O(√n)", space: "O(d)" },
      pitfalls: [
        "A perfect square must not record its root twice — 25 gives [1,5,25], not [1,5,5,25].",
        "The pairing produces an unsorted list, so sorting is required.",
        "i × i can overflow int for large n; compare as long or bound i by n / i.",
      ],
      javaToolkit: ["Divisor pairing around √n", "Collections.sort", "Avoiding the double root"],
    },
  },

  "sieve-of-eratosthenes": {
    slug: "sieve-of-eratosthenes",
    title: "Sieve of Eratosthenes",
    description: "Return every prime up to and including n, in ascending order.",
    constraints: ["0 ≤ n ≤ 10^6"],
    className: "Solution",
    methodName: "sieve",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> sieve(int n) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 20 }, expectedOutput: [2, 3, 5, 7, 11, 13, 17, 19] },
      { id: 2, inputs: { n: 2 }, expectedOutput: [2] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { n: 1 }, expectedOutput: [], isHidden: true },
      { id: 5, inputs: { n: 10 }, expectedOutput: [2, 3, 5, 7], isHidden: true },
      { id: 6, inputs: { n: 3 }, expectedOutput: [2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Rather than testing each number for primality, cross out the multiples of each prime as you meet it. Every composite gets crossed out by its smallest prime factor, so whatever survives is prime.",
      approach: [
        "Mark an array of size n + 1 as all prime, then unmark 0 and 1.",
        "For each i while i × i ≤ n, if i is still marked, unmark every multiple starting at i × i.",
        "Collect the still-marked indices.",
      ],
      bruteForce: { idea: "Trial-divide every number up to n.", time: "O(n√n)", space: "O(1)" },
      optimal: { idea: "Sieve of Eratosthenes.", time: "O(n log log n)", space: "O(n)" },
      pitfalls: [
        "0 and 1 are not prime and must be unmarked explicitly.",
        "Starting the inner loop at 2i rather than i × i still works but redoes crossings already done by smaller primes.",
        "i × i overflows int near 10^6 squared — use a long or bound i by n / i.",
      ],
      javaToolkit: ["boolean[] sieve", "Starting the inner loop at i × i", "O(n log log n)"],
    },
  },

  "prime-factorisation-sieve": {
    slug: "prime-factorisation-sieve",
    title: "Prime Factorisation Using a Sieve",
    description:
      "Answer several factorisation queries over the same limit. For each query, return its prime factors WITH multiplicity, ascending. Return one row per query, in the same order.",
    constraints: ["1 ≤ queries.length ≤ 10^4", "1 ≤ queries[i] ≤ 10^5"],
    className: "Solution",
    methodName: "factorise",
    parameters: [{ name: "queries", type: "int[]" }],
    returnType: "List<List<Integer>>",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<List<Integer>> factorise(int[] queries) {
        // Factors WITH multiplicity, ascending, one row per query.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { queries: [12, 13] }, expectedOutput: [[2, 2, 3], [13]], explanation: "12 = 2 × 2 × 3, so 2 appears twice." },
      { id: 2, inputs: { queries: [1] }, expectedOutput: [[]], explanation: "1 has no prime factors." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { queries: [100] }, expectedOutput: [[2, 2, 5, 5]], isHidden: true },
      { id: 4, inputs: { queries: [2, 4, 8] }, expectedOutput: [[2], [2, 2], [2, 2, 2]], isHidden: true },
      { id: 5, inputs: { queries: [99991] }, expectedOutput: [[99991]], isHidden: true },
      { id: 6, inputs: { queries: [1, 1] }, expectedOutput: [[], []], isHidden: true },
    ],
    learn: {
      intuition:
        "A modified sieve can record each number's SMALLEST prime factor instead of just whether it is prime. With that table, factorising any number is a walk: divide by its smallest prime factor and repeat, one step per factor.",
      approach: [
        "Build a smallest-prime-factor table up to the largest query.",
        "For each query, repeatedly divide by its smallest prime factor, recording each one.",
        "Stop when the value reaches 1.",
      ],
      bruteForce: { idea: "Trial-divide each query independently.", time: "O(q√n)", space: "O(1)" },
      optimal: { idea: "Smallest-prime-factor sieve, then O(log n) per query.", time: "O(n log log n + q log n)", space: "O(n)" },
      pitfalls: [
        "1 has no factors, so its row is empty rather than absent.",
        "This wants multiplicity, unlike the earlier distinct-factors problem — 12 gives [2,2,3].",
        "Building the table once is the whole point; rebuilding it per query throws the benefit away.",
      ],
      javaToolkit: ["Smallest prime factor sieve", "Repeated division by spf", "Precompute once, query many"],
    },
  },

  "power-n-x": {
    slug: "power-n-x",
    title: "Power(n, x) With Modular Arithmetic",
    description: "Return n raised to the power x, modulo 1_000_000_007.",
    constraints: ["0 ≤ n ≤ 10^9", "0 ≤ x ≤ 10^18"],
    className: "Solution",
    methodName: "power",
    parameters: [
      { name: "n", type: "long" },
      { name: "x", type: "long" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int power(long n, long x) {
        // Answer modulo 1000000007.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 2, x: 10 }, expectedOutput: 1024 },
      { id: 2, inputs: { n: 5, x: 0 }, expectedOutput: 1, explanation: "Anything to the power 0 is 1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0, x: 5 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { n: 2, x: 1000000000000000000 }, expectedOutput: 719476260, isHidden: true },
      { id: 5, inputs: { n: 1000000000, x: 2 }, expectedOutput: 49, isHidden: true },
      { id: 6, inputs: { n: 1, x: 1000000000000000000 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Binary exponentiation viewed through bits: the exponent's binary expansion says which squarings to multiply in. Squaring the base while walking the exponent's bits reaches 10^18 in about 60 steps.",
      approach: [
        "Start the result at 1 and reduce the base modulo the prime.",
        "While the exponent is non-zero, multiply the result by the base when the lowest bit is set.",
        "Square the base and shift the exponent right each iteration.",
      ],
      bruteForce: { idea: "Multiply n by itself x times.", time: "O(x)", space: "O(1)" },
      optimal: { idea: "Binary exponentiation with modular reduction.", time: "O(log x)", space: "O(1)" },
      pitfalls: [
        "Two values near 10^9 multiply to near 10^18, which fits a long but not an int — every multiply must be long and immediately reduced.",
        "Reduce the base before the loop; 10^9 squared already needs the reduction.",
        "x = 0 gives 1 even when n is 0, by the usual convention.",
      ],
      javaToolkit: ["Binary exponentiation", "Modular multiply in long", "exp >>= 1 and (exp & 1)"],
    },
  },
}
