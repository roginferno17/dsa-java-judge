import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 1 — Learn the Basics (30 problems).
 *
 * The first eleven entries in this step are syntax topics rather than
 * algorithmic problems. Instead of giving them a token harness, each gets a small
 * exercise that genuinely requires the syntax it is teaching, so "Java
 * Collections" actually makes you use a Set and "Functions" actually makes you
 * observe that arrays are passed by reference.
 */
export const step01: Record<string, ProblemMetadata> = {
  // ---------------------------------------------------------------- syntax

  "user-input-output": {
    slug: "user-input-output",
    title: "User Input / Output",
    description:
      "This judge never asks you to read input. Arguments arrive as real Java values and you return a real Java value — no Scanner, no parsing, no printing the answer. Write a method that takes a name and returns a greeting, so you can see the shape every problem here uses.",
    constraints: ["name is a non-empty string of at most 100 characters"],
    className: "Solution",
    methodName: "greet",
    parameters: [{ name: "name", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String greet(String name) {
        // Return "Hello, <name>!" — for example, "Hello, Vishu!"
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { name: "Vishu" }, expectedOutput: "Hello, Vishu!", explanation: "The name is placed between the comma and the exclamation mark." },
      { id: 2, inputs: { name: "Paras" }, expectedOutput: "Hello, Paras!" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { name: "A" }, expectedOutput: "Hello, A!", isHidden: true },
      { id: 4, inputs: { name: "ada lovelace" }, expectedOutput: "Hello, ada lovelace!", isHidden: true },
    ],
    learn: {
      intuition:
        "On most judges you spend the first few lines reading input and the last few printing output. Here you do neither: the value you return IS the answer. That is the same style LeetCode uses, so getting used to it now means less to unlearn later.",
      approach: [
        "Take the parameter as a normal Java variable — it is already a String.",
        "Build the result with + concatenation, or String.format if you prefer.",
        "Return it. Do not print it: System.out.println goes to the Console tab and is ignored when judging.",
      ],
      optimal: { idea: "One concatenation.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Printing the answer instead of returning it. The Console tab shows prints, but the verdict only looks at what you return.",
        "Forgetting the exclamation mark or the space after the comma — string comparison is exact.",
      ],
      javaToolkit: ["String concatenation with +", "String.format(\"Hello, %s!\", name)"],
    },
  },

  "data-types": {
    slug: "data-types",
    title: "Data Types",
    description:
      "int holds roughly ±2.1 billion. Multiply two large ints and the result silently wraps around to a wrong answer instead of raising an error — one of the most common bugs in Java DSA. Return the product of two ints as a long, without losing precision.",
    constraints: ["-2,000,000,000 ≤ a, b ≤ 2,000,000,000"],
    className: "Solution",
    methodName: "product",
    parameters: [
      { name: "a", type: "int" },
      { name: "b", type: "int" },
    ],
    returnType: "long",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public long product(int a, int b) {
        // Careful: a * b is computed as int BEFORE it becomes a long.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: 100000, b: 100000 }, expectedOutput: 10000000000, explanation: "10^10 does not fit in an int. Written as a * b it silently wraps to 1410065408." },
      { id: 2, inputs: { a: 6, b: 7 }, expectedOutput: 42 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: 2000000000, b: 2 }, expectedOutput: 4000000000, isHidden: true },
      { id: 4, inputs: { a: -100000, b: 100000 }, expectedOutput: -10000000000, isHidden: true },
      { id: 5, inputs: { a: 0, b: 2000000000 }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Java decides the type of an expression from its operands, not from where you are putting the result. int * int is an int, and only afterwards does it get widened to long — by which point the overflow has already happened.",
      approach: [
        "Widen at least one operand before multiplying: (long) a * b.",
        "The cast binds tighter than *, so this multiplies a long by an int and produces a long.",
        "Return the result.",
      ],
      optimal: { idea: "Cast one operand, then multiply.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "Writing `long r = a * b;` — the multiplication still happens in int and overflows before the assignment.",
        "Writing `(long)(a * b)` — the parentheses mean you cast the already-wrong int result.",
      ],
      javaToolkit: ["(long) casting", "Integer.MAX_VALUE = 2147483647", "Math.multiplyExact for overflow detection"],
    },
  },

  "if-else-statements": {
    slug: "if-else-statements",
    title: "If Else Statements",
    description:
      "Classify a number as \"positive\", \"negative\" or \"zero\". Simple on purpose: the point is branch coverage — every path must return something, and the boundary case has to be handled deliberately.",
    constraints: ["-10^9 ≤ n ≤ 10^9"],
    className: "Solution",
    methodName: "classify",
    parameters: [{ name: "n", type: "int" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String classify(int n) {
        // Return "positive", "negative" or "zero" (lowercase).
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 7 }, expectedOutput: "positive" },
      { id: 2, inputs: { n: -3 }, expectedOutput: "negative" },
      { id: 3, inputs: { n: 0 }, expectedOutput: "zero", explanation: "Zero is neither positive nor negative, so it needs its own branch." },
    ],
    hiddenTestCases: [
      { id: 4, inputs: { n: 1000000000 }, expectedOutput: "positive", isHidden: true },
      { id: 5, inputs: { n: -1000000000 }, expectedOutput: "negative", isHidden: true },
      { id: 6, inputs: { n: -1 }, expectedOutput: "negative", isHidden: true },
    ],
    learn: {
      intuition:
        "Three outcomes need three branches. The trap is treating zero as an afterthought: `if (n > 0) ... else ...` quietly calls zero negative.",
      approach: [
        "Check n > 0 first and return \"positive\".",
        "Check n < 0 and return \"negative\".",
        "Anything left is zero.",
      ],
      optimal: { idea: "Two comparisons.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "Using >= 0 for positive, which labels zero as positive.",
        "Forgetting a final return — Java refuses to compile a method where some path returns nothing.",
      ],
      javaToolkit: ["if / else if / else", "Comparison operators >, <, ==", "String literals are compared with .equals, not =="],
    },
  },

  "switch-statement": {
    slug: "switch-statement",
    title: "Switch Statement",
    description:
      "Return the number of days in a given month, taking leap years into account. A natural fit for switch, and a good place to see how cases fall through when you forget to break.",
    constraints: ["1 ≤ month ≤ 12"],
    className: "Solution",
    methodName: "daysInMonth",
    parameters: [
      { name: "month", type: "int" },
      { name: "leapYear", type: "boolean" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int daysInMonth(int month, boolean leapYear) {
        // 1 = January ... 12 = December. February has 29 days in a leap year.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { month: 1, leapYear: false }, expectedOutput: 31, explanation: "January always has 31 days." },
      { id: 2, inputs: { month: 2, leapYear: true }, expectedOutput: 29, explanation: "February gains a day in a leap year." },
      { id: 3, inputs: { month: 4, leapYear: false }, expectedOutput: 30 },
    ],
    hiddenTestCases: [
      { id: 4, inputs: { month: 2, leapYear: false }, expectedOutput: 28, isHidden: true },
      { id: 5, inputs: { month: 12, leapYear: true }, expectedOutput: 31, isHidden: true },
      { id: 6, inputs: { month: 9, leapYear: false }, expectedOutput: 30, isHidden: true },
      { id: 7, inputs: { month: 11, leapYear: true }, expectedOutput: 30, isHidden: true },
    ],
    learn: {
      intuition:
        "Only three distinct answers exist — 31, 30, and February's 28 or 29 — so group the months rather than writing twelve separate cases.",
      approach: [
        "Handle month 2 separately: return leapYear ? 29 : 28.",
        "Group the 30-day months (4, 6, 9, 11) into stacked cases.",
        "Everything else is 31.",
      ],
      optimal: { idea: "A switch with grouped cases.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "Forgetting break: execution falls through into the next case and returns the wrong number. Stacked labels like `case 4: case 6:` are deliberate fall-through; a missing break is not.",
        "Assuming every year divisible by 4 is a leap year — here you are told, but the real rule also excludes centuries not divisible by 400.",
      ],
      javaToolkit: ["switch with grouped case labels", "The arrow form: case 4, 6, 9, 11 -> 30;", "Ternary ?:"],
    },
  },

  "arrays-strings-basics": {
    slug: "arrays-strings-basics",
    title: "What are Arrays and Strings?",
    description:
      "Return the first and last element of an array as a two-element array. Introduces indexing from 0, .length on arrays, and creating a new array to return.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "firstAndLast",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public int[] firstAndLast(int[] arr) {
        // Return a new array: {first element, last element}.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [3, 8, 1, 9, 4] }, expectedOutput: [3, 4], explanation: "arr[0] is 3 and arr[arr.length - 1] is 4." },
      { id: 2, inputs: { arr: [10, 20] }, expectedOutput: [10, 20] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [42] }, expectedOutput: [42, 42], isHidden: true },
      { id: 4, inputs: { arr: [-5, 0, 5] }, expectedOutput: [-5, 5], isHidden: true },
    ],
    learn: {
      intuition:
        "Java arrays are zero-indexed and know their own size through .length — a field, not a method, unlike String.length() which is. The last valid index is always length - 1.",
      approach: [
        "Read arr[0].",
        "Read arr[arr.length - 1].",
        "Return them with `new int[]{first, last}`.",
      ],
      optimal: { idea: "Two reads.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "Using arr[arr.length] — that index is one past the end and throws ArrayIndexOutOfBoundsException.",
        "Writing arr.length() on an array or s.length on a String; arrays use the field, Strings use the method.",
        "A single-element array is not a special case: first and last are the same element.",
      ],
      javaToolkit: ["arr.length (field)", "s.length() (method)", "new int[]{a, b}", "Arrays.toString for debugging"],
    },
  },

  "for-loops": {
    slug: "for-loops",
    title: "For Loops",
    description:
      "Return the sum of all integers from 1 to n using a loop. The formula would be faster, but the exercise is the loop: initialise, condition, increment, and an accumulator that survives each iteration.",
    constraints: ["1 ≤ n ≤ 100000"],
    className: "Solution",
    methodName: "sumTo",
    parameters: [{ name: "n", type: "int" }],
    returnType: "long",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public long sumTo(int n) {
        // Add up 1 + 2 + ... + n with a for loop.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5 }, expectedOutput: 15, explanation: "1 + 2 + 3 + 4 + 5 = 15." },
      { id: 2, inputs: { n: 1 }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 100 }, expectedOutput: 5050, isHidden: true },
      { id: 4, inputs: { n: 100000 }, expectedOutput: 5000050000, isHidden: true },
      { id: 5, inputs: { n: 2 }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "A for loop bundles three things: where the counter starts, how long to keep going, and how it changes. The accumulator has to live outside the loop, or it is destroyed on every iteration.",
      approach: [
        "Declare `long sum = 0;` before the loop.",
        "Loop `for (int i = 1; i <= n; i++)` — note <= so n itself is included.",
        "Add i to sum each pass, then return sum.",
      ],
      bruteForce: { idea: "Loop from 1 to n adding each value.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "n * (n + 1) / 2 gives the same answer with no loop.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "Declaring sum inside the loop, which resets it every iteration.",
        "Using i < n instead of i <= n, which silently drops the last term.",
        "Returning int: the largest case here sums to 5,000,050,000, well past int range.",
      ],
      javaToolkit: ["for (int i = 0; i < n; i++)", "Compound assignment sum += i", "long for large totals"],
    },
  },

  "while-loops": {
    slug: "while-loops",
    title: "While Loops",
    description:
      "Count the steps the Collatz process takes to reach 1: halve even numbers, and turn odd numbers into 3n + 1. You cannot know the number of iterations in advance, which is exactly when a while loop beats a for loop.",
    constraints: ["1 ≤ n ≤ 1000000"],
    className: "Solution",
    methodName: "collatzSteps",
    parameters: [{ name: "n", type: "int" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int collatzSteps(int n) {
        // While n != 1: if n is even, halve it; otherwise n = 3n + 1.
        // Return how many steps that took.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 1 }, expectedOutput: 0, explanation: "Already 1, so no steps are needed." },
      { id: 2, inputs: { n: 6 }, expectedOutput: 8, explanation: "6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 is eight steps." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 2 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { n: 27 }, expectedOutput: 111, isHidden: true },
      { id: 5, inputs: { n: 1000000 }, expectedOutput: 152, isHidden: true },
    ],
    learn: {
      intuition:
        "A for loop suits a known number of iterations. Here the count is what you are computing, so you loop on a condition instead and stop when it stops being true.",
      approach: [
        "Keep a counter starting at 0, and work on a long copy of n.",
        "While the value is not 1: halve it if even, otherwise multiply by 3 and add 1. Increment the counter each time.",
        "Return the counter.",
      ],
      optimal: { idea: "Follow the sequence until it hits 1.", time: "O(steps)", space: "O(1)" },
      pitfalls: [
        "Forgetting to change n inside the loop, which hangs forever — the judge reports Time Limit Exceeded.",
        "3n + 1 can exceed int range for large n partway through even though the input fits; use long for the working value.",
        "n = 1 must return 0, not 1: the loop body never runs.",
      ],
      javaToolkit: ["while (condition) { }", "n % 2 == 0 for evenness", "do-while when the body must run at least once"],
    },
  },

  functions: {
    slug: "functions",
    title: "Functions (Pass by Reference and Value)",
    description:
      "Double every element of an array in place and return nothing. Java always passes by value — but for an array the value is a reference, so the caller sees your changes. Primitives behave differently, and confusing the two causes real bugs.",
    constraints: ["1 ≤ arr.length ≤ 10^4", "-10^8 ≤ arr[i] ≤ 10^8"],
    className: "Solution",
    methodName: "doubleAll",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void doubleAll(int[] arr) {
        // Modify arr itself. Do not create and return a new array.

    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 2, 3] }, expectedOutput: [2, 4, 6], explanation: "The same array object is changed; nothing is returned." },
      { id: 2, inputs: { arr: [-4, 0, 5] }, expectedOutput: [-8, 0, 10] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [0] }, expectedOutput: [0], isHidden: true },
      { id: 4, inputs: { arr: [100000000] }, expectedOutput: [200000000], isHidden: true },
      { id: 5, inputs: { arr: [7, 7, 7, 7] }, expectedOutput: [14, 14, 14, 14], isHidden: true },
    ],
    learn: {
      intuition:
        "Java is always pass-by-value, but for objects and arrays the value copied is the reference. Your method gets its own arrow pointing at the same array, so writing through it is visible to the caller — while reassigning the parameter itself is not.",
      approach: [
        "Loop over every index of arr.",
        "Write arr[i] = arr[i] * 2.",
        "Return nothing — the judge checks the array you were handed.",
      ],
      optimal: { idea: "One pass, writing in place.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Building a new array and assigning it to the parameter: `arr = newArr;` only moves your local arrow and the caller sees nothing.",
        "Expecting the same behaviour from an int parameter — `n = n * 2` inside a method never affects the caller.",
      ],
      javaToolkit: ["Arrays are reference types", "Primitives are copied by value", "In-place mutation with arr[i] = ..."],
    },
  },

  "time-complexity": {
    slug: "time-complexity",
    title: "Time Complexity",
    description:
      "Count how many pairs in the array sum to a target. The obvious nested loop is O(n²) and will time out on the largest hidden case; a single pass with a frequency map is O(n). This is complexity you can feel rather than just read about.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i], target ≤ 10^9"],
    className: "Solution",
    methodName: "countPairs",
    parameters: [
      { name: "arr", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "long",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public long countPairs(int[] arr, int target) {
        // Count index pairs (i, j) with i < j and arr[i] + arr[j] == target.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 5, 7, -1], target: 6 }, expectedOutput: 2, explanation: "(1,5) and (7,-1) both sum to 6." },
      { id: 2, inputs: { arr: [1, 1, 1, 1], target: 2 }, expectedOutput: 6, explanation: "Every one of the six pairs of ones sums to 2." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1], target: 2 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { arr: [0, 0, 0], target: 0 }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { arr: [-1000000000, 1000000000], target: 0 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "For each element you need to know how many earlier elements equal target - element. Rechecking the whole prefix each time is O(n²); remembering counts as you go answers the same question in O(1) per element.",
      approach: [
        "Keep a HashMap from value to how many times it has been seen.",
        "For each element x, add the current count of target - x to the answer.",
        "Then record x in the map. Doing it in this order stops an element pairing with itself.",
      ],
      bruteForce: { idea: "Two nested loops over every pair.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "One pass with a frequency map.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Adding x to the map before looking up its complement, which counts x with itself.",
        "Returning int: with 10^5 equal values the pair count exceeds int range.",
        "target - x can overflow int when both are near the limits; compute it as a long.",
      ],
      javaToolkit: ["HashMap<Integer, Integer>", "map.getOrDefault(key, 0)", "map.merge(key, 1, Integer::sum)"],
    },
  },

  patterns: {
    slug: "patterns",
    title: "Patterns",
    description:
      "Build a right-aligned triangle of stars as an array of strings. Pattern problems are really nested-loop practice: the outer loop is the row, the inner loops decide what goes in it.",
    constraints: ["1 ≤ n ≤ 100"],
    className: "Solution",
    methodName: "rightTriangle",
    parameters: [{ name: "n", type: "int" }],
    returnType: "String[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public String[] rightTriangle(int n) {
        // Row i (1-based) has (n - i) spaces then i stars.
        // n = 3 gives ["  *", " **", "***"]
        return new String[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 3 }, expectedOutput: ["  *", " **", "***"], explanation: "Row 1 has two spaces and one star; row 3 has no spaces and three stars." },
      { id: 2, inputs: { n: 1 }, expectedOutput: ["*"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 2 }, expectedOutput: [" *", "**"], isHidden: true },
      { id: 4, inputs: { n: 5 }, expectedOutput: ["    *", "   **", "  ***", " ****", "*****"], isHidden: true },
    ],
    learn: {
      intuition:
        "Every row is the same shape with different counts: some spaces, then some stars. Write down the relationship between the row number and each count before writing any code — that is the whole difficulty.",
      approach: [
        "For row i from 1 to n, append (n - i) spaces.",
        "Then append i stars.",
        "Store each finished row in a String[] of length n.",
      ],
      optimal: { idea: "Nested loops building each row.", time: "O(n²)", space: "O(n²)" },
      pitfalls: [
        "Concatenating with += inside a loop builds a new String every time; StringBuilder avoids that.",
        "Off-by-one from mixing 0-based loops with a 1-based row count. Pick one and stay with it.",
        "Trailing spaces — rows end at the last star.",
      ],
      javaToolkit: ["StringBuilder.append", "\"*\".repeat(count) (Java 11+)", "Nested for loops"],
    },
  },

  "java-collections": {
    slug: "java-collections",
    title: "Java Collections",
    description:
      "Return the distinct values of an array, sorted ascending, as a List<Integer>. A tour of the three collection types you will use constantly: a Set to deduplicate, a List to hold the answer, and Collections.sort to order it.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "uniqueSorted",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> uniqueSorted(int[] arr) {
        // Remove duplicates, then return the values in ascending order.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [3, 1, 3, 7, 1] }, expectedOutput: [1, 3, 7], explanation: "Duplicates collapse and what remains is sorted." },
      { id: 2, inputs: { arr: [5, 5, 5] }, expectedOutput: [5] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [1] }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { arr: [-2, 0, -2, 9, 0] }, expectedOutput: [-2, 0, 9], isHidden: true },
      { id: 5, inputs: { arr: [3, 2, 1] }, expectedOutput: [1, 2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "A Set answers \"have I seen this?\" in constant time and refuses duplicates by definition. Once deduplicated, sorting is one call. A TreeSet would do both at once, at O(log n) per insert.",
      approach: [
        "Add every element to a HashSet<Integer>.",
        "Copy the set into `new ArrayList<>(set)`.",
        "Call Collections.sort on the list and return it.",
      ],
      bruteForce: { idea: "For each element scan the output list to see whether it is already there.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "HashSet to deduplicate, then sort.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "A HashSet has no order — you must sort afterwards, even if small tests happen to come out sorted.",
        "list.remove(int) removes by INDEX while list.remove(Integer) removes by VALUE. This bites almost everyone once.",
        "Autoboxing int to Integer has a cost; for very hot loops prefer primitive arrays.",
      ],
      javaToolkit: ["HashSet<Integer>", "new ArrayList<>(collection)", "Collections.sort(list)", "TreeSet for sorted-on-insert"],
    },
  },

  // ------------------------------------------------------------ basic math

  "count-digits": {
    slug: "count-digits",
    title: "Count Digits",
    description: "Return how many digits a non-negative integer has.",
    constraints: ["0 ≤ n ≤ 10^9"],
    className: "Solution",
    methodName: "countDigits",
    parameters: [{ name: "n", type: "int" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countDigits(int n) {
        // 0 has one digit.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 12345 }, expectedOutput: 5 },
      { id: 2, inputs: { n: 7 }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { n: 1000000000 }, expectedOutput: 10, isHidden: true },
      { id: 5, inputs: { n: 10 }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "Dividing by 10 removes the last digit. Count how many times you can do that before nothing is left.",
      approach: [
        "Handle 0 up front: it has one digit but the loop below would count none.",
        "While n > 0, divide n by 10 and increment a counter.",
        "Return the counter.",
      ],
      optimal: { idea: "Repeated integer division, or (int) Math.log10(n) + 1.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Returning 0 for input 0 — the classic missed edge case here.",
        "Math.log10(0) is negative infinity, so the logarithm shortcut needs the same special case.",
      ],
      javaToolkit: ["Integer division n / 10", "String.valueOf(n).length()", "Math.log10"],
    },
  },

  "reverse-a-number": {
    slug: "reverse-a-number",
    title: "Reverse a Number",
    description:
      "Return the digits of a signed 32-bit integer reversed. If the reversed value would fall outside the 32-bit signed range, return 0.",
    constraints: ["-2^31 ≤ n ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "reverse",
    parameters: [{ name: "x", type: "int" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int reverse(int x) {
        // Return 0 if the reversed number overflows a 32-bit int.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { x: 123 }, expectedOutput: 321 },
      { id: 2, inputs: { x: -123 }, expectedOutput: -321, explanation: "The sign is preserved." },
      { id: 3, inputs: { x: 120 }, expectedOutput: 21, explanation: "A trailing zero disappears when reversed." },
    ],
    hiddenTestCases: [
      { id: 4, inputs: { x: 0 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { x: 1534236469 }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { x: -2147483648 }, expectedOutput: 0, isHidden: true },
      { id: 7, inputs: { x: 7 }, expectedOutput: 7, isHidden: true },
    ],
    learn: {
      intuition:
        "Peel the last digit off with % 10 and push it onto the end of a growing result with result * 10 + digit. The only real difficulty is noticing overflow before it happens.",
      approach: [
        "Accumulate into a long so the intermediate value cannot wrap.",
        "While x != 0: take x % 10, do result = result * 10 + digit, then x /= 10.",
        "After the loop, return 0 if the result falls outside Integer.MIN_VALUE..MAX_VALUE, else cast to int.",
      ],
      optimal: { idea: "Digit-by-digit with an overflow check.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Accumulating in an int: the overflow you are meant to detect has already destroyed the value.",
        "-2147483648 has no positive counterpart, so Math.abs on it returns itself. Working in long sidesteps this.",
        "In Java, % keeps the sign of the dividend, so -123 % 10 is -3 and the sign takes care of itself.",
      ],
      javaToolkit: ["% and / for digits", "Integer.MAX_VALUE / MIN_VALUE", "long for intermediates"],
    },
  },

  "check-palindrome": {
    slug: "check-palindrome",
    title: "Check Palindrome",
    description:
      "Decide whether an integer reads the same forwards and backwards. Negative numbers are never palindromes because of the leading minus sign.",
    constraints: ["-2^31 ≤ x ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "isPalindrome",
    parameters: [{ name: "x", type: "int" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isPalindrome(int x) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { x: 121 }, expectedOutput: true },
      { id: 2, inputs: { x: -121 }, expectedOutput: false, explanation: "Reversed it reads 121-, which is not the same." },
      { id: 3, inputs: { x: 10 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 4, inputs: { x: 0 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { x: 1000021 }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { x: 1221 }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { x: 2147483647 }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Reverse the number and compare. Reversing only half avoids overflow entirely, but with a long accumulator the straightforward version is fine.",
      approach: [
        "Return false immediately for any negative number.",
        "Reverse the digits into a long.",
        "Return whether the reversal equals the original.",
      ],
      optimal: { idea: "Reverse and compare, or reverse only half the digits.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Forgetting the negative case.",
        "Any positive number ending in 0 cannot be a palindrome unless it is 0 itself.",
        "Reversing into an int can overflow on large inputs and produce a bogus comparison.",
      ],
      javaToolkit: ["Digit extraction with % and /", "long accumulator", "String reversal with StringBuilder.reverse"],
    },
  },

  "gcd-or-hcf": {
    slug: "gcd-or-hcf",
    title: "GCD or HCF",
    description:
      "Return the greatest common divisor of two non-negative integers. Euclid's algorithm turns this from a search into a handful of modulo operations.",
    constraints: ["0 ≤ a, b ≤ 10^9", "a and b are not both zero"],
    className: "Solution",
    methodName: "gcd",
    parameters: [
      { name: "a", type: "int" },
      { name: "b", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int gcd(int a, int b) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { a: 12, b: 18 }, expectedOutput: 6, explanation: "6 is the largest number dividing both." },
      { id: 2, inputs: { a: 7, b: 13 }, expectedOutput: 1, explanation: "Coprime numbers have a GCD of 1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { a: 0, b: 5 }, expectedOutput: 5, isHidden: true },
      { id: 4, inputs: { a: 1000000000, b: 500000000 }, expectedOutput: 500000000, isHidden: true },
      { id: 5, inputs: { a: 17, b: 17 }, expectedOutput: 17, isHidden: true },
      { id: 6, inputs: { a: 270, b: 192 }, expectedOutput: 6, isHidden: true },
    ],
    learn: {
      intuition:
        "Any number dividing both a and b also divides their remainder, so gcd(a, b) equals gcd(b, a % b). Repeating that shrinks the numbers fast until one becomes zero, and the other is the answer.",
      approach: [
        "While b is not 0, replace (a, b) with (b, a % b).",
        "Return a.",
      ],
      bruteForce: { idea: "Try every divisor from min(a, b) downwards.", time: "O(min(a, b))", space: "O(1)" },
      optimal: { idea: "Euclid's algorithm.", time: "O(log min(a, b))", space: "O(1)" },
      pitfalls: [
        "Subtracting instead of taking the remainder still works but degrades badly when the numbers are very far apart.",
        "gcd(0, n) is n — the loop already handles it, but check it if you write the recursion yourself.",
      ],
      javaToolkit: ["The % operator", "Recursion: return b == 0 ? a : gcd(b, a % b)", "BigInteger.gcd for huge values"],
    },
  },

  "armstrong-numbers": {
    slug: "armstrong-numbers",
    title: "Armstrong Numbers",
    description:
      "An Armstrong number equals the sum of its own digits each raised to the power of the number of digits — 153 = 1³ + 5³ + 3³. Decide whether n is one.",
    constraints: ["0 ≤ n ≤ 10^9"],
    className: "Solution",
    methodName: "isArmstrong",
    parameters: [{ name: "n", type: "int" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isArmstrong(int n) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 153 }, expectedOutput: true, explanation: "1³ + 5³ + 3³ = 1 + 125 + 27 = 153." },
      { id: 2, inputs: { n: 154 }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 9474 }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { n: 0 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { n: 9 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { n: 10 }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "The exponent is the digit count, so you need two passes: one to count the digits, another to raise each digit to that power and total them.",
      approach: [
        "Count the digits of n.",
        "Walk the digits again, adding digit^count to a running total.",
        "Return whether the total equals n.",
      ],
      optimal: { idea: "Two passes over the digits.", time: "O(log n)", space: "O(1)" },
      pitfalls: [
        "Math.pow returns a double; rounding errors can make the comparison fail. Multiply in a loop, or round carefully.",
        "Destroying n while looping and then having nothing to compare against — keep a copy.",
        "Every single-digit number, 0 included, is trivially an Armstrong number.",
      ],
      javaToolkit: ["Integer division and modulo", "Integer exponentiation by loop", "Beware Math.pow returning double"],
    },
  },

  "print-all-divisors": {
    slug: "print-all-divisors",
    title: "Print All Divisors",
    description:
      "Return every divisor of n in ascending order. Checking up to n works, but only up to √n is needed — divisors come in pairs.",
    constraints: ["1 ≤ n ≤ 10^9"],
    className: "Solution",
    methodName: "divisors",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> divisors(int n) {
        // Ascending order.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 36 }, expectedOutput: [1, 2, 3, 4, 6, 9, 12, 18, 36] },
      { id: 2, inputs: { n: 7 }, expectedOutput: [1, 7], explanation: "A prime has exactly two divisors." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1 }, expectedOutput: [1], isHidden: true },
      { id: 4, inputs: { n: 16 }, expectedOutput: [1, 2, 4, 8, 16], isHidden: true },
      { id: 5, inputs: { n: 100 }, expectedOutput: [1, 2, 4, 5, 10, 20, 25, 50, 100], isHidden: true },
    ],
    learn: {
      intuition:
        "If i divides n then so does n / i. That pairs every small divisor with a large one, so you only ever need to search as far as √n.",
      approach: [
        "Loop i from 1 while i * i <= n.",
        "When i divides n, record i, and also record n / i unless it equals i.",
        "Sort the collected divisors before returning.",
      ],
      bruteForce: { idea: "Test every number from 1 to n.", time: "O(n)", space: "O(d)" },
      optimal: { idea: "Search to √n and take divisors in pairs.", time: "O(√n)", space: "O(d)" },
      pitfalls: [
        "Adding the perfect square root twice — 6 × 6 = 36 must contribute a single 6.",
        "Using i <= Math.sqrt(n) invites floating-point edge cases; i * i <= n stays in integers.",
        "The pair trick produces divisors out of order, so sorting at the end is required.",
      ],
      javaToolkit: ["Loop condition i * i <= n", "ArrayList<Integer>", "Collections.sort"],
    },
  },

  "check-for-prime": {
    slug: "check-for-prime",
    title: "Check for Prime",
    description:
      "Decide whether n is prime. A prime has exactly two distinct divisors, 1 and itself — which immediately rules out 0 and 1.",
    constraints: ["0 ≤ n ≤ 10^9"],
    className: "Solution",
    methodName: "isPrime",
    parameters: [{ name: "n", type: "int" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isPrime(int n) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 13 }, expectedOutput: true },
      { id: 2, inputs: { n: 1 }, expectedOutput: false, explanation: "1 has only one divisor, so it is not prime." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: false, isHidden: true },
      { id: 4, inputs: { n: 2 }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { n: 999999937 }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { n: 1000000000 }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { n: 9 }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "If n has a divisor larger than √n, the matching co-divisor is smaller than √n. So finding no divisor up to √n proves there is none at all.",
      approach: [
        "Return false for n < 2.",
        "Loop i from 2 while i * i <= n; return false the moment i divides n.",
        "If the loop finishes, n is prime.",
      ],
      bruteForce: { idea: "Test every candidate from 2 to n - 1.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Trial division up to √n.", time: "O(√n)", space: "O(1)" },
      pitfalls: [
        "Treating 1 as prime — the single most common mistake here.",
        "Looping to n / 2, which still passes small tests but is far slower than √n on the 10^9 case.",
        "2 is prime and is the only even prime; make sure your loop does not exclude it.",
      ],
      javaToolkit: ["i * i <= n loop bound", "Early return", "Sieve of Eratosthenes for many queries"],
    },
  },

  // -------------------------------------------------------------- recursion

  "recursion-print-n-times": {
    slug: "recursion-print-n-times",
    title: "Understand Recursion by Printing N Times",
    description:
      "Return a list containing the string \"Hello\" repeated n times, built recursively rather than with a loop. The exercise is seeing the base case stop the descent.",
    constraints: ["0 ≤ n ≤ 1000"],
    className: "Solution",
    methodName: "repeatHello",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> repeatHello(int n) {
        // Use recursion, not a loop.
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 3 }, expectedOutput: ["Hello", "Hello", "Hello"] },
      { id: 2, inputs: { n: 1 }, expectedOutput: ["Hello"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { n: 1000 }, expectedOutput: Array(1000).fill("Hello"), isHidden: true },
    ],
    learn: {
      intuition:
        "Every recursive method needs two things: a base case that returns without recursing, and a recursive step that moves closer to it. Miss the base case and you get a StackOverflowError instead of an answer.",
      approach: [
        "Write a helper taking the remaining count and the list being filled.",
        "If the count is 0, return — this is the base case.",
        "Otherwise add \"Hello\", then call the helper with count - 1.",
      ],
      optimal: { idea: "Linear recursion.", time: "O(n)", space: "O(n) call stack" },
      pitfalls: [
        "No base case, or one that can never be reached, causing a stack overflow. The judge names this explicitly when it happens.",
        "n = 0 must produce an empty list, not one entry.",
        "Java's default stack handles a few thousand frames; deep recursion on large inputs needs a loop instead.",
      ],
      javaToolkit: ["Base case then recursive step", "Helper methods with extra parameters", "StackOverflowError"],
    },
  },

  "print-name-n-times": {
    slug: "print-name-n-times",
    title: "Print Name N Times Using Recursion",
    description: "Return a list with the given name repeated n times, built recursively.",
    constraints: ["0 ≤ n ≤ 1000", "name is 1 to 50 characters"],
    className: "Solution",
    methodName: "repeatName",
    parameters: [
      { name: "name", type: "String" },
      { name: "n", type: "int" },
    ],
    returnType: "List<String>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<String> repeatName(String name, int n) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { name: "Paras", n: 2 }, expectedOutput: ["Paras", "Paras"] },
      { id: 2, inputs: { name: "Vishu", n: 1 }, expectedOutput: ["Vishu"] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { name: "x", n: 0 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { name: "ab", n: 5 }, expectedOutput: ["ab", "ab", "ab", "ab", "ab"], isHidden: true },
    ],
    learn: {
      intuition:
        "Identical in shape to the previous problem, with one extra value carried down the recursion. Parameters that do not change still have to be passed along.",
      approach: [
        "Base case: n == 0, return.",
        "Add the name, then recurse with n - 1.",
      ],
      optimal: {
        idea: "Linear recursion carrying the name down each call.",
        time: "O(n)",
        space: "O(n) call stack, plus O(len) per stored string",
      },
      pitfalls: [
        "Forgetting to pass name down to the recursive call.",
        "Decrementing the wrong variable, so the base case is never reached.",
      ],
      javaToolkit: ["Recursive helper", "Passing invariant parameters through the recursion"],
    },
  },

  "print-1-to-n": {
    slug: "print-1-to-n",
    title: "Print 1 to N Using Recursion",
    description:
      "Return the numbers 1 through n in ascending order, using recursion. The order you build the list in is the whole lesson.",
    constraints: ["0 ≤ n ≤ 1000"],
    className: "Solution",
    methodName: "oneToN",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> oneToN(int n) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5 }, expectedOutput: [1, 2, 3, 4, 5] },
      { id: 2, inputs: { n: 1 }, expectedOutput: [1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { n: 3 }, expectedOutput: [1, 2, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "You can count down and still produce ascending output: recurse to n - 1 FIRST, then add n. The additions then happen on the way back up the stack, in increasing order.",
      approach: [
        "Base case: n == 0, return.",
        "Recurse on n - 1.",
        "After that call returns, add n to the list.",
      ],
      optimal: { idea: "Recurse first, append after.", time: "O(n)", space: "O(n) call stack" },
      pitfalls: [
        "Adding n before recursing, which produces the list in reverse.",
        "Counting up with an extra parameter also works; just be consistent about where the append happens.",
      ],
      javaToolkit: ["Work done after the recursive call", "Call-stack unwinding order"],
    },
  },

  "print-n-to-1": {
    slug: "print-n-to-1",
    title: "Print N to 1 Using Recursion",
    description:
      "Return the numbers n down to 1, using recursion. The mirror image of the previous problem — and the difference is exactly one line's position.",
    constraints: ["0 ≤ n ≤ 1000"],
    className: "Solution",
    methodName: "nToOne",
    parameters: [{ name: "n", type: "int" }],
    returnType: "List<Integer>",
    comparison: { type: "list", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public List<Integer> nToOne(int n) {
        return new ArrayList<>();
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5 }, expectedOutput: [5, 4, 3, 2, 1] },
      { id: 2, inputs: { n: 1 }, expectedOutput: [1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: [], isHidden: true },
      { id: 4, inputs: { n: 2 }, expectedOutput: [2, 1], isHidden: true },
    ],
    learn: {
      intuition:
        "Add n first, then recurse. The work now happens on the way down instead of on the way back up, and the order flips.",
      approach: [
        "Base case: n == 0, return.",
        "Add n to the list.",
        "Recurse on n - 1.",
      ],
      optimal: { idea: "Append before recursing.", time: "O(n)", space: "O(n) call stack" },
      pitfalls: [
        "Compare this directly with the previous problem: the only change is whether the append comes before or after the recursive call.",
      ],
      javaToolkit: ["Work done before the recursive call", "Head vs tail recursion"],
    },
  },

  "sum-first-n-numbers": {
    slug: "sum-first-n-numbers",
    title: "Sum of First N Numbers",
    description: "Return 1 + 2 + ... + n using recursion rather than a loop or the closed-form formula.",
    constraints: ["0 ≤ n ≤ 10000"],
    className: "Solution",
    methodName: "sumN",
    parameters: [{ name: "n", type: "int" }],
    returnType: "long",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public long sumN(int n) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5 }, expectedOutput: 15 },
      { id: 2, inputs: { n: 1 }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { n: 10000 }, expectedOutput: 50005000, isHidden: true },
      { id: 5, inputs: { n: 100 }, expectedOutput: 5050, isHidden: true },
    ],
    learn: {
      intuition:
        "The sum to n is n plus the sum to n - 1. That sentence is the code. The base case is that the sum to 0 is 0.",
      approach: [
        "If n <= 0, return 0.",
        "Otherwise return n + sumN(n - 1).",
      ],
      bruteForce: { idea: "Recursive definition.", time: "O(n)", space: "O(n) call stack" },
      optimal: { idea: "n * (n + 1) / 2, no recursion at all.", time: "O(1)", space: "O(1)" },
      pitfalls: [
        "Returning int: at n = 10000 the total is 50,005,000, which fits, but the habit of using long for sums is worth forming now.",
        "10,000 stack frames is close to Java's default limit — a good illustration of why recursion is not free.",
      ],
      javaToolkit: ["Recursive accumulation", "The n(n+1)/2 identity", "Stack depth limits"],
    },
  },

  "factorial-of-n": {
    slug: "factorial-of-n",
    title: "Factorial of N",
    description:
      "Return n! — the product of every integer from 1 to n. Factorials explode fast: 21! already exceeds a 64-bit long, so the constraint here keeps it inside a long.",
    constraints: ["0 ≤ n ≤ 20"],
    className: "Solution",
    methodName: "factorial",
    parameters: [{ name: "n", type: "int" }],
    returnType: "long",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public long factorial(int n) {
        // 0! is 1.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 5 }, expectedOutput: 120, explanation: "5 × 4 × 3 × 2 × 1 = 120." },
      { id: 2, inputs: { n: 0 }, expectedOutput: 1, explanation: "0! is defined as 1." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { n: 20 }, expectedOutput: 2432902008176640000, isHidden: true },
      { id: 5, inputs: { n: 10 }, expectedOutput: 3628800, isHidden: true },
    ],
    learn: {
      intuition:
        "n! is n times (n-1)!, with 0! defined as 1. The definition translates into code almost word for word.",
      approach: [
        "If n <= 1, return 1.",
        "Otherwise return n * factorial(n - 1).",
      ],
      optimal: { idea: "Recursive or iterative product.", time: "O(n)", space: "O(n) recursive, O(1) iterative" },
      pitfalls: [
        "Returning int overflows at 13!. Even long only reaches 20!, which is why the constraint stops there.",
        "Forgetting that 0! is 1, not 0.",
      ],
      javaToolkit: ["long range: about 9.2 × 10^18", "BigInteger for larger factorials", "Recursion vs iteration"],
    },
  },

  "reverse-array-recursion": {
    slug: "reverse-array-recursion",
    title: "Reverse an Array",
    description:
      "Reverse an array in place using recursion — no new array, and nothing returned. Two pointers move towards each other, swapping as they go.",
    constraints: ["1 ≤ arr.length ≤ 10^4"],
    className: "Solution",
    methodName: "reverseArray",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "void",
    mutatedArgIndex: 0,
    comparison: { type: "array", orderMatters: true },
    starterCode: `class Solution {
    public void reverseArray(int[] arr) {
        // Reverse arr itself. Return nothing.

    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 2, 3, 4, 5] }, expectedOutput: [5, 4, 3, 2, 1] },
      { id: 2, inputs: { arr: [1, 2] }, expectedOutput: [2, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [7] }, expectedOutput: [7], isHidden: true },
      { id: 4, inputs: { arr: [1, 2, 3] }, expectedOutput: [3, 2, 1], isHidden: true },
      { id: 5, inputs: { arr: [-1, 0, 1, 2] }, expectedOutput: [2, 1, 0, -1], isHidden: true },
    ],
    learn: {
      intuition:
        "Swap the outermost pair, then solve the same problem on everything inside. When the pointers meet or cross, the array is reversed.",
      approach: [
        "Write a helper taking left and right indices.",
        "If left >= right, return.",
        "Swap arr[left] and arr[right], then recurse with left + 1 and right - 1.",
      ],
      optimal: { idea: "Two pointers converging.", time: "O(n)", space: "O(n) call stack, O(1) iteratively" },
      pitfalls: [
        "Stopping at left > right only: with an even length the pointers cross without ever being equal, so use >=.",
        "Building a reversed copy instead of swapping in place — the judge checks the array you were given.",
        "Odd lengths leave a middle element untouched, which is correct.",
      ],
      javaToolkit: ["In-place swap via a temp variable", "Two-pointer technique", "Helper method with index parameters"],
    },
  },

  "string-palindrome-recursion": {
    slug: "string-palindrome-recursion",
    title: "Check if a String is a Palindrome",
    description:
      "Decide recursively whether a string reads the same in both directions. Compare only letters and digits, and ignore case.",
    constraints: ["0 ≤ s.length ≤ 10^4"],
    className: "Solution",
    methodName: "isPalindrome",
    parameters: [{ name: "s", type: "String" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean isPalindrome(String s) {
        // Ignore case, and skip anything that is not a letter or digit.
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "A man, a plan, a canal: Panama" }, expectedOutput: true, explanation: "Stripped down it reads amanaplanacanalpanama." },
      { id: 2, inputs: { s: "race a car" }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "" }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { s: ".," }, expectedOutput: true, isHidden: true },
      { id: 5, inputs: { s: "a" }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { s: "0P" }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Compare the outermost characters and then solve the same problem on the middle. The wrinkle is that non-alphanumeric characters have to be skipped before comparing.",
      approach: [
        "Use two indices, left and right.",
        "Advance left past any non-alphanumeric character; retreat right the same way.",
        "If the lowercased characters differ, return false; otherwise recurse inwards.",
        "When left >= right, everything matched.",
      ],
      optimal: { idea: "Two pointers with skipping.", time: "O(n)", space: "O(n) recursive, O(1) iteratively" },
      pitfalls: [
        "\"0P\" is a classic trap: '0' and 'P' differ by 32 in ASCII, so a careless case-insensitive comparison wrongly matches them.",
        "Skipping characters without re-checking the bounds, which walks off the end of the string.",
        "An empty string is a palindrome.",
      ],
      javaToolkit: ["Character.isLetterOrDigit", "Character.toLowerCase", "s.charAt(i)", "Two-pointer with skips"],
    },
  },

  "fibonacci-number": {
    slug: "fibonacci-number",
    title: "Fibonacci Number",
    description:
      "Return the nth Fibonacci number, where F(0) = 0, F(1) = 1, and each later term is the sum of the two before it. The naive recursion is exponential; the constraint here makes that impossible to ignore.",
    constraints: ["0 ≤ n ≤ 90"],
    className: "Solution",
    methodName: "fib",
    parameters: [{ name: "n", type: "int" }],
    returnType: "long",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public long fib(int n) {
        // Plain recursion will be far too slow for n = 90.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { n: 2 }, expectedOutput: 1, explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1." },
      { id: 2, inputs: { n: 10 }, expectedOutput: 55 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { n: 0 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { n: 1 }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { n: 90 }, expectedOutput: 2880067194370816120, isHidden: true },
      { id: 6, inputs: { n: 50 }, expectedOutput: 12586269025, isHidden: true },
    ],
    learn: {
      intuition:
        "Writing fib(n) = fib(n-1) + fib(n-2) directly recomputes the same values an enormous number of times — fib(90) that way would take longer than your lifetime. Keeping only the last two values makes it a single loop.",
      approach: [
        "Return n directly when n < 2.",
        "Track two variables holding F(i-2) and F(i-1).",
        "Loop from 2 to n, sliding the pair forward each step, and return the later one.",
      ],
      bruteForce: { idea: "Plain double recursion.", time: "O(2^n)", space: "O(n)" },
      optimal: { idea: "Iterate keeping only the last two values.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "F(47) already overflows int, so the return type must be long.",
        "Memoisation also works and is a good first taste of dynamic programming, but the two-variable loop needs no extra space at all.",
        "Getting the base cases backwards: F(0) is 0 and F(1) is 1.",
      ],
      javaToolkit: ["Iterative sliding pair", "long for large values", "Memoisation with an array"],
    },
  },

  // ---------------------------------------------------------------- hashing

  "hashing-theory": {
    slug: "hashing-theory",
    title: "Hashing Theory",
    description:
      "Answer several \"how many times does x appear?\" queries over one array. Rescanning per query is O(n × q); building a frequency map once makes every query O(1). This is what hashing buys you.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "1 ≤ queries.length ≤ 10^5", "-10^9 ≤ values ≤ 10^9"],
    className: "Solution",
    methodName: "countOccurrences",
    parameters: [
      { name: "arr", type: "int[]" },
      { name: "queries", type: "int[]" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] countOccurrences(int[] arr, int[] queries) {
        // One answer per query, in the same order.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 2, 2, 3, 3, 3], queries: [1, 3, 5] }, expectedOutput: [1, 3, 0], explanation: "1 appears once, 3 appears three times, 5 never." },
      { id: 2, inputs: { arr: [7], queries: [7, 7] }, expectedOutput: [1, 1] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [5, 5, 5], queries: [5] }, expectedOutput: [3], isHidden: true },
      { id: 4, inputs: { arr: [1, 2, 3], queries: [4, 5, 6] }, expectedOutput: [0, 0, 0], isHidden: true },
      { id: 5, inputs: { arr: [-1, -1, 0], queries: [-1, 0, 1] }, expectedOutput: [2, 1, 0], isHidden: true },
    ],
    learn: {
      intuition:
        "Pay once to build a lookup table, then answer every question instantly. Hashing trades memory for time, and here that trade turns 10^10 operations into 2 × 10^5.",
      approach: [
        "Walk the array once, incrementing a HashMap counter per value.",
        "For each query, read the count out of the map, defaulting to 0.",
        "Collect the answers into an int[] in query order.",
      ],
      bruteForce: { idea: "Scan the whole array for every query.", time: "O(n × q)", space: "O(1)" },
      optimal: { idea: "Build a frequency map once, then look up.", time: "O(n + q)", space: "O(n)" },
      pitfalls: [
        "map.get returns null for a missing key, and unboxing that null throws a NullPointerException. Use getOrDefault.",
        "An int[] counter indexed by value only works when values are small and non-negative; these can be negative and huge.",
        "Answers must come back in the order the queries were given.",
      ],
      javaToolkit: ["HashMap<Integer, Integer>", "map.getOrDefault(k, 0)", "map.merge(k, 1, Integer::sum)"],
    },
  },

  "count-frequencies": {
    slug: "count-frequencies",
    title: "Counting Frequencies of Array Elements",
    description:
      "Return each distinct value with how many times it occurs, sorted ascending by value. Each row of the result is a pair: {value, count}.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "frequencies",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "int[][]",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[][] frequencies(int[] arr) {
        // Each row is {value, count}, sorted ascending by value.
        return new int[0][0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 2, 2, 3] }, expectedOutput: [[1, 1], [2, 2], [3, 1]], explanation: "1 once, 2 twice, 3 once — ordered by value." },
      { id: 2, inputs: { arr: [4, 4, 4] }, expectedOutput: [[4, 3]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [9] }, expectedOutput: [[9, 1]], isHidden: true },
      { id: 4, inputs: { arr: [3, 1, 2] }, expectedOutput: [[1, 1], [2, 1], [3, 1]], isHidden: true },
      { id: 5, inputs: { arr: [-5, -5, 0] }, expectedOutput: [[-5, 2], [0, 1]], isHidden: true },
    ],
    learn: {
      intuition:
        "Counting is a HashMap. The only extra work is turning the map into a sorted 2D array, since a HashMap has no order of its own.",
      approach: [
        "Count every value into a HashMap.",
        "Copy the keys into a list and sort them.",
        "Build an int[keys][2] filling each row with the value and its count.",
      ],
      optimal: { idea: "Count with a map, then sort the keys.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "Relying on HashMap iteration order — it is not sorted and not even stable across runs.",
        "A TreeMap keeps keys sorted automatically and skips the separate sort, at O(log n) per insert.",
        "Rows must be {value, count} in that order.",
      ],
      javaToolkit: ["HashMap and TreeMap", "map.entrySet()", "new int[rows][2]", "Collections.sort"],
    },
  },

  "highest-lowest-frequency": {
    slug: "highest-lowest-frequency",
    title: "Find the Highest and Lowest Frequency Element",
    description:
      "Return two values: the element that appears most often, and the one that appears least often. If several tie, return the smallest such value.",
    constraints: ["1 ≤ arr.length ≤ 10^5", "-10^9 ≤ arr[i] ≤ 10^9"],
    className: "Solution",
    methodName: "highestLowestFrequency",
    parameters: [{ name: "arr", type: "int[]" }],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] highestLowestFrequency(int[] arr) {
        // Return {mostFrequent, leastFrequent}.
        // On a tie, prefer the smaller value.
        return new int[0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arr: [1, 2, 2, 3, 3, 3] }, expectedOutput: [3, 1], explanation: "3 appears most often; 1 appears least often." },
      { id: 2, inputs: { arr: [1, 1, 2, 2] }, expectedOutput: [1, 1], explanation: "Both appear twice, so the smaller value wins both answers." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arr: [5] }, expectedOutput: [5, 5], isHidden: true },
      { id: 4, inputs: { arr: [-1, -1, 4] }, expectedOutput: [-1, 4], isHidden: true },
      { id: 5, inputs: { arr: [2, 2, 1, 1, 3] }, expectedOutput: [1, 3], isHidden: true },
    ],
    learn: {
      intuition:
        "Count once, then make a single pass over the counts tracking two running bests. The tie rule is what makes this more than a one-liner: you must compare values as well as counts.",
      approach: [
        "Build a frequency map.",
        "Walk the entries keeping the best and worst so far.",
        "Replace the current best when the count is higher, or when the count ties and the value is smaller. Mirror that for the least frequent.",
      ],
      optimal: { idea: "Count, then one pass over the entries.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Ignoring the tie rule and returning whichever entry the map happened to yield first — that answer is not reproducible.",
        "With a single distinct value, both answers are that same value.",
        "Initialise from the first entry rather than from 0, since values can be negative.",
      ],
      javaToolkit: ["HashMap frequency counting", "Map.Entry getKey/getValue", "Tracking two running extremes"],
    },
  },
}
