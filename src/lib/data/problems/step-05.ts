import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 5 — Strings (15 problems).
 *
 * The recurring Java lesson here is that String is immutable: building a result
 * with += inside a loop quietly creates a new object every iteration. Almost every
 * problem in this step wants StringBuilder instead.
 */
export const step05: Record<string, ProblemMetadata> = {
  "remove-outer-parenthesis": {
    slug: "remove-outer-parenthesis",
    title: "Remove Outermost Parentheses",
    description:
      "The string is a concatenation of valid parenthesis groups. Remove the outermost pair from each group and return what remains.",
    constraints: ["1 ≤ s.length ≤ 10^5", "s consists only of '(' and ')'", "s is a valid parenthesis string"],
    className: "Solution",
    methodName: "removeOuterParentheses",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String removeOuterParentheses(String s) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "(()())(())" }, expectedOutput: "()()()", explanation: "The groups are (()()) and (()); stripping each outer pair leaves ()() and ()." },
      { id: 2, inputs: { s: "()()" }, expectedOutput: "", explanation: "Both groups are bare pairs, so nothing survives." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "()" }, expectedOutput: "", isHidden: true },
      { id: 4, inputs: { s: "(())" }, expectedOutput: "()", isHidden: true },
      { id: 5, inputs: { s: "((()))" }, expectedOutput: "(())", isHidden: true },
      { id: 6, inputs: { s: "(()())(())(()(()))" }, expectedOutput: "()()()()(())", isHidden: true },
    ],
    learn: {
      intuition:
        "A running depth counter tells you which characters are outermost without ever building a stack. An opening bracket is outermost when the depth is 0 before it; a closing bracket is outermost when the depth is 0 after it.",
      approach: [
        "Walk the string keeping a depth counter.",
        "On '(': append it only if depth > 0, then increment.",
        "On ')': decrement first, then append only if depth > 0.",
      ],
      bruteForce: { idea: "Split into groups by tracking balance, then trim each.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Single pass with a depth counter.", time: "O(n)", space: "O(n) for the output" },
      pitfalls: [
        "Incrementing before the append test on '(' wrongly keeps the outer bracket.",
        "Decrementing after the append test on ')' has the same problem in reverse — the order differs between the two branches.",
        "Building the result with += is O(n²); use StringBuilder.",
      ],
      javaToolkit: ["StringBuilder.append", "Depth counter instead of a stack", "s.charAt(i)"],
    },
  },

  "reverse-words-palindrome": {
    slug: "reverse-words-palindrome",
    title: "Reverse Words in a String",
    description:
      "Return the words of the string in reverse order, separated by exactly one space. Leading, trailing and repeated spaces must all be removed.",
    constraints: ["1 ≤ s.length ≤ 10^4", "s contains letters, digits and spaces"],
    className: "Solution",
    methodName: "reverseWords",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String reverseWords(String s) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "the sky is blue" }, expectedOutput: "blue is sky the" },
      { id: 2, inputs: { s: "  hello world  " }, expectedOutput: "world hello", explanation: "Surrounding spaces are dropped." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a good   example" }, expectedOutput: "example good a", isHidden: true },
      { id: 4, inputs: { s: "single" }, expectedOutput: "single", isHidden: true },
      { id: 5, inputs: { s: "   lots   of   space   " }, expectedOutput: "space of lots", isHidden: true },
      { id: 6, inputs: { s: "a b" }, expectedOutput: "b a", isHidden: true },
    ],
    learn: {
      intuition:
        "Splitting on runs of whitespace rather than single spaces removes the repeated-space problem entirely, and trimming first removes the leading and trailing case.",
      approach: [
        "Trim the string.",
        "Split on the regex \\\\s+ so any run of spaces is one delimiter.",
        "Join the pieces in reverse with a single space.",
      ],
      bruteForce: { idea: "Scan character by character collecting words manually.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "trim, split on whitespace runs, join backwards.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "split(\" \") on a single space leaves empty strings between repeated spaces.",
        "Without trim, splitting a leading-space string produces an empty first element.",
        "String.join is far cleaner than manually managing separators.",
      ],
      javaToolkit: ["s.trim()", "s.split(\"\\\\s+\")", "String.join", "StringBuilder"],
    },
  },

  "largest-odd-number": {
    slug: "largest-odd-number",
    title: "Largest Odd Number in a String",
    description:
      "The string is a sequence of digits. Return the longest prefix that represents an odd number, or an empty string if none exists.",
    constraints: ["1 ≤ num.length ≤ 10^5", "num consists of digits only"],
    className: "Solution",
    methodName: "largestOddNumber",
    parameters: [{ name: "num", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String largestOddNumber(String num) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { num: "52" }, expectedOutput: "5", explanation: "52 is even; trimming to 5 gives the longest odd prefix." },
      { id: 2, inputs: { num: "4206" }, expectedOutput: "", explanation: "Every digit is even, so no odd prefix exists." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { num: "35427" }, expectedOutput: "35427", isHidden: true },
      { id: 4, inputs: { num: "1" }, expectedOutput: "1", isHidden: true },
      { id: 5, inputs: { num: "2" }, expectedOutput: "", isHidden: true },
      { id: 6, inputs: { num: "10133890" }, expectedOutput: "1013389", isHidden: true },
    ],
    learn: {
      intuition:
        "A number is odd exactly when its last digit is odd. So the longest odd prefix ends at the rightmost odd digit — find that index and cut there.",
      approach: [
        "Scan from the right for the first odd digit.",
        "Return the substring from 0 through that index inclusive.",
        "Return an empty string if the scan finds nothing.",
      ],
      bruteForce: { idea: "Test every prefix for oddness.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Find the rightmost odd digit and cut.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Parsing the string as a number overflows immediately — 10^5 digits fit in no numeric type.",
        "substring's end index is exclusive, so it must be index + 1.",
        "Leading zeros are kept as-is; the problem asks for a prefix, not a normalised number.",
      ],
      javaToolkit: ["s.substring(0, end)", "Character digit arithmetic", "Scanning from the right"],
    },
  },

  "longest-common-prefix": {
    slug: "longest-common-prefix",
    title: "Longest Common Prefix",
    description: "Return the longest string that is a prefix of every string in the array, or an empty string if there is none.",
    constraints: ["1 ≤ strs.length ≤ 200", "0 ≤ strs[i].length ≤ 200", "Lowercase English letters"],
    className: "Solution",
    methodName: "longestCommonPrefix",
    parameters: [{ name: "strs", type: "String[]" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { strs: ["flower", "flow", "flight"] }, expectedOutput: "fl" },
      { id: 2, inputs: { strs: ["dog", "racecar", "car"] }, expectedOutput: "", explanation: "Nothing is shared." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { strs: ["a"] }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { strs: ["", "b"] }, expectedOutput: "", isHidden: true },
      { id: 5, inputs: { strs: ["abc", "abc", "abc"] }, expectedOutput: "abc", isHidden: true },
      { id: 6, inputs: { strs: ["ab", "abc"] }, expectedOutput: "ab", isHidden: true },
    ],
    learn: {
      intuition:
        "Sorting the array puts the two most dissimilar strings at the ends. Whatever prefix those two share is shared by everything between them, so one comparison settles it.",
      approach: [
        "Sort the array.",
        "Compare the first and last strings character by character.",
        "Stop at the first mismatch or when either runs out.",
      ],
      bruteForce: { idea: "Compare column by column across all strings.", time: "O(n × m)", space: "O(1)" },
      optimal: { idea: "Sort, then compare only the first and last.", time: "O(n × m log n)", space: "O(1)" },
      pitfalls: [
        "An empty string anywhere forces an empty answer — the loop must respect both lengths.",
        "The vertical scan is actually faster asymptotically; sorting is chosen here for how little code it takes.",
        "A single-element array returns that whole string.",
      ],
      javaToolkit: ["Arrays.sort on String[]", "Math.min on lengths", "charAt comparison"],
    },
  },

  "isomorphic-string": {
    slug: "isomorphic-string",
    title: "Isomorphic Strings",
    description:
      "Two strings are isomorphic when the characters of the first can be replaced to produce the second, with each character mapping to exactly one other and no two characters mapping to the same one. Return whether s and t are isomorphic.",
    constraints: ["1 ≤ s.length ≤ 5 × 10^4", "s.length == t.length"],
    className: "Solution",
    methodName: "isIsomorphic",
    parameters: [
      { name: "s", type: "String" },
      { name: "t", type: "String" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public boolean isIsomorphic(String s, String t) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "egg", t: "add" }, expectedOutput: true, explanation: "e maps to a and g maps to d, consistently." },
      { id: 2, inputs: { s: "foo", t: "bar" }, expectedOutput: false, explanation: "o would have to map to both a and r." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "paper", t: "title" }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { s: "badc", t: "baba" }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { s: "a", t: "a" }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { s: "ab", t: "aa" }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "The mapping must be a bijection, so you need to check it in BOTH directions. One map catches \"this character already maps elsewhere\"; the second catches \"two characters map to the same target\".",
      approach: [
        "Keep two maps, s to t and t to s.",
        "For each position, reject if either map already holds a conflicting entry.",
        "Otherwise record both directions and continue.",
      ],
      bruteForce: { idea: "Compare the pattern of first-occurrence indices in both strings.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Two maps enforcing a bijection.", time: "O(n)", space: "O(1) with fixed-size arrays" },
      pitfalls: [
        "One map alone accepts \"ab\" and \"aa\", which is not isomorphic — that is a hidden case.",
        "int[256] arrays are faster than HashMaps here and just as clear.",
        "Equal lengths are guaranteed, so no length check is needed.",
      ],
      javaToolkit: ["Two-directional mapping", "int[256] as a character map", "Bijection checking"],
    },
  },

  "string-rotation": {
    slug: "string-rotation",
    title: "Check Whether One String Is a Rotation of Another",
    description: "Return whether goal can be obtained by rotating s some number of positions.",
    constraints: ["1 ≤ s.length, goal.length ≤ 100", "Lowercase English letters"],
    className: "Solution",
    methodName: "rotateString",
    parameters: [
      { name: "s", type: "String" },
      { name: "goal", type: "String" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean rotateString(String s, String goal) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "abcde", goal: "cdeab" }, expectedOutput: true, explanation: "Rotating left by two gives cdeab." },
      { id: 2, inputs: { s: "abcde", goal: "abced" }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a", goal: "a" }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { s: "ab", goal: "abc" }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { s: "aa", goal: "aa" }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { s: "abab", goal: "baba" }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Every rotation of s appears somewhere inside s concatenated with itself. So the whole question reduces to a substring check — provided the lengths match.",
      approach: [
        "Return false immediately if the lengths differ.",
        "Return whether (s + s) contains goal.",
      ],
      bruteForce: { idea: "Try all n rotations explicitly.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Check containment in the doubled string.", time: "O(n²) with contains, O(n) with KMP", space: "O(n)" },
      pitfalls: [
        "Without the length check, a shorter goal can be found inside s + s and wrongly accepted.",
        "String.contains uses a naive search; KMP would make this genuinely linear.",
        "A string is a rotation of itself, by zero.",
      ],
      javaToolkit: ["(s + s).contains(goal)", "Length guard", "KMP for the linear version"],
    },
  },

  "anagram-check": {
    slug: "anagram-check",
    title: "Check if Two Strings Are Anagrams",
    description: "Return whether t is a rearrangement of s using exactly the same characters.",
    constraints: ["1 ≤ s.length, t.length ≤ 5 × 10^4", "Lowercase English letters"],
    className: "Solution",
    methodName: "isAnagram",
    parameters: [
      { name: "s", type: "String" },
      { name: "t", type: "String" },
    ],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public boolean isAnagram(String s, String t) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "anagram", t: "nagaram" }, expectedOutput: true },
      { id: 2, inputs: { s: "rat", t: "car" }, expectedOutput: false },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a", t: "ab" }, expectedOutput: false, isHidden: true },
      { id: 4, inputs: { s: "aacc", t: "ccac" }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { s: "a", t: "a" }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { s: "ab", t: "ba" }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Anagrams have identical character counts. A 26-slot array is enough: increment for the first string, decrement for the second, and everything must land back on zero.",
      approach: [
        "Return false if the lengths differ.",
        "Increment counts for s and decrement for t in one loop.",
        "Return whether every count is zero.",
      ],
      bruteForce: { idea: "Sort both strings and compare.", time: "O(n log n)", space: "O(n)" },
      optimal: { idea: "Character frequency counting.", time: "O(n)", space: "O(1) for a fixed alphabet" },
      pitfalls: [
        "The length check is essential: \"a\" and \"ab\" would otherwise pass a naive count comparison.",
        "\"aacc\" and \"ccac\" have equal length and the same character SET but different counts — that is what the counting catches.",
        "For Unicode rather than a-z, a HashMap replaces the fixed array.",
      ],
      javaToolkit: ["int[26] frequency array", "c - 'a' indexing", "Arrays.sort as the simpler fallback"],
    },
  },

  "sort-by-frequency": {
    slug: "sort-by-frequency",
    title: "Sort Characters by Frequency",
    description:
      "Return the string with characters ordered by decreasing frequency. Characters with equal frequency must appear in ascending character order, so the answer is unambiguous.",
    constraints: ["1 ≤ s.length ≤ 5 × 10^5", "Letters and digits"],
    className: "Solution",
    methodName: "frequencySort",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public String frequencySort(String s) {
        // Ties break by ascending character.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "tree" }, expectedOutput: "eert", explanation: "e appears twice; r and t tie at one, so r comes first." },
      { id: 2, inputs: { s: "cccaaa" }, expectedOutput: "aaaccc", explanation: "Both appear three times, so a precedes c." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "Aabb" }, expectedOutput: "bbAa", isHidden: true },
      { id: 5, inputs: { s: "abc" }, expectedOutput: "abc", isHidden: true },
      { id: 6, inputs: { s: "2a554442f544asfasssffffasss" }, expectedOutput: "sssssssffffff44444aaaa55522", isHidden: true },
    ],
    learn: {
      intuition:
        "Count first, then order. The tie rule is what makes the output deterministic — without it, several answers would be equally correct and any judge would be unfair.",
      approach: [
        "Count every character's frequency.",
        "Sort the distinct characters by descending count, then ascending character value.",
        "Append each character its count number of times.",
      ],
      bruteForce: { idea: "Repeatedly find and remove the most frequent character.", time: "O(n × k)", space: "O(k)" },
      optimal: { idea: "Count, sort by (count desc, char asc), rebuild.", time: "O(n + k log k)", space: "O(n)" },
      pitfalls: [
        "Ignoring the tie rule produces a valid-looking answer that fails the tests — read it in the description.",
        "Uppercase and lowercase are distinct characters, and uppercase sorts before lowercase.",
        "Building with += is O(n²) at these lengths; use StringBuilder.",
      ],
      javaToolkit: ["Comparator.comparingInt().thenComparing()", "StringBuilder.repeat or a loop", "Frequency counting"],
    },
  },

  "max-nesting-depth": {
    slug: "max-nesting-depth",
    title: "Maximum Nesting Depth of Parentheses",
    description: "Return the deepest level of nested parentheses in the string. Non-parenthesis characters are ignored.",
    constraints: ["1 ≤ s.length ≤ 100", "s is a valid parenthesis expression"],
    className: "Solution",
    methodName: "maxDepth",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int maxDepth(String s) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "(1+(2*3)+((8)/4))+1" }, expectedOutput: 3, explanation: "The 8 sits three levels deep." },
      { id: 2, inputs: { s: "1+(2*3)/(2-1)" }, expectedOutput: 1 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "1" }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { s: "()" }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { s: "((((1))))" }, expectedOutput: 4, isHidden: true },
      { id: 6, inputs: { s: "(a)(b)(c)" }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Depth rises on an opening bracket and falls on a closing one. The answer is simply the highest value that counter ever reaches — no stack required, because the input is guaranteed valid.",
      approach: [
        "Walk the string with a depth counter.",
        "Increment on '(' and record the maximum; decrement on ')'.",
        "Ignore everything else.",
      ],
      optimal: { idea: "Running depth counter.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Recording the maximum after decrementing rather than after incrementing gives an answer one too low.",
        "A string with no parentheses has depth 0, not 1.",
        "A stack would work but stores information you never read back.",
      ],
      javaToolkit: ["Depth counter", "Math.max", "Counter instead of a stack"],
    },
  },

  "roman-integer": {
    slug: "roman-integer",
    title: "Roman Numeral to Integer",
    description:
      "Convert a Roman numeral to its integer value. A smaller symbol placed before a larger one means subtraction, as in IV for 4 and IX for 9.",
    constraints: ["1 ≤ s.length ≤ 15", "s is a valid Roman numeral in the range 1..3999"],
    className: "Solution",
    methodName: "romanToInt",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int romanToInt(String s) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "MCMXCIV" }, expectedOutput: 1994, explanation: "M=1000, CM=900, XC=90, IV=4." },
      { id: 2, inputs: { s: "LVIII" }, expectedOutput: 58 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "I" }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { s: "IV" }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { s: "MMMCMXCIX" }, expectedOutput: 3999, isHidden: true },
      { id: 6, inputs: { s: "III" }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "You do not need to detect subtractive pairs explicitly. A symbol is subtracted exactly when it is smaller than the one after it, so one comparison per character handles every case.",
      approach: [
        "Map each symbol to its value.",
        "Walk left to right: if this symbol is smaller than the next, subtract it; otherwise add it.",
        "The last symbol is always added.",
      ],
      bruteForce: { idea: "Match the six subtractive pairs first, then the singles.", time: "O(n)", space: "O(1)" },
      optimal: { idea: "Compare each symbol with its successor.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Reading past the end when checking the next symbol — guard the final index.",
        "Hardcoding the six subtractive pairs works but is far more code for the same result.",
        "A switch or a small array beats a HashMap for six fixed symbols.",
      ],
      javaToolkit: ["switch on char", "Lookahead comparison", "Map<Character, Integer>"],
    },
  },

  "implement-atoi": {
    slug: "implement-atoi",
    title: "Implement Atoi",
    description:
      "Convert the leading numeric portion of a string to an int. Skip leading whitespace, accept an optional single sign, read digits until a non-digit, and clamp the result to the 32-bit signed range. Return 0 when no digits are found.",
    constraints: ["0 ≤ s.length ≤ 200"],
    className: "Solution",
    methodName: "myAtoi",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int myAtoi(String s) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "42" }, expectedOutput: 42 },
      { id: 2, inputs: { s: "   -42" }, expectedOutput: -42, explanation: "Leading spaces are skipped and the sign is honoured." },
      { id: 3, inputs: { s: "4193 with words" }, expectedOutput: 4193, explanation: "Reading stops at the first non-digit." },
    ],
    hiddenTestCases: [
      { id: 4, inputs: { s: "words and 987" }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { s: "-91283472332" }, expectedOutput: -2147483648, isHidden: true },
      { id: 6, inputs: { s: "91283472332" }, expectedOutput: 2147483647, isHidden: true },
      { id: 7, inputs: { s: "+-12" }, expectedOutput: 0, isHidden: true },
      { id: 8, inputs: { s: "" }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Less an algorithm than a specification to follow exactly, in order: whitespace, then one optional sign, then digits, then stop. The interesting part is detecting overflow before it happens.",
      approach: [
        "Skip leading spaces.",
        "Read at most one '+' or '-'.",
        "Accumulate digits into a long, and clamp the moment the magnitude passes the int range.",
        "Apply the sign and return.",
      ],
      optimal: { idea: "Single pass following the specification.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Accumulating in an int loses the overflow you are meant to detect; use a long and clamp early.",
        "Two signs in a row, as in \"+-12\", is invalid and must return 0.",
        "Non-digit text BEFORE any digits gives 0, while text after simply stops the read.",
        "The negative limit is -2147483648, whose magnitude exceeds the positive limit by one.",
      ],
      javaToolkit: ["Character.isDigit", "long accumulation with clamping", "Integer.MAX_VALUE / MIN_VALUE"],
    },
  },

  "count-substrings": {
    slug: "count-substrings",
    title: "Count Substrings With Exactly K Distinct Characters",
    description: "Return how many substrings contain exactly k distinct characters.",
    constraints: ["1 ≤ s.length ≤ 10^4", "1 ≤ k ≤ 26", "Lowercase English letters"],
    className: "Solution",
    methodName: "countSubstrings",
    parameters: [
      { name: "s", type: "String" },
      { name: "k", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int countSubstrings(String s, int k) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "aba", k: 2 }, expectedOutput: 3, explanation: "ab, ba and aba each contain exactly two distinct characters." },
      { id: 2, inputs: { s: "abaaca", k: 1 }, expectedOutput: 7 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a", k: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { s: "a", k: 2 }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { s: "aaaa", k: 1 }, expectedOutput: 10, isHidden: true },
      { id: 6, inputs: { s: "abc", k: 3 }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "\"Exactly k\" is hard to slide a window on directly, but \"at most k\" is easy — and exactly k equals atMost(k) minus atMost(k - 1). That subtraction trick shows up constantly in window problems.",
      approach: [
        "Write a helper counting substrings with AT MOST k distinct characters using a sliding window.",
        "Expand the right edge, shrinking from the left whenever the distinct count exceeds k.",
        "Each position contributes (right - left + 1) substrings.",
        "Return atMost(k) - atMost(k - 1).",
      ],
      bruteForce: { idea: "Check every substring.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "atMost(k) - atMost(k-1) with a sliding window.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Trying to maintain an exactly-k window directly is far harder and usually wrong at the edges.",
        "atMost(0) must be 0, which the helper handles naturally.",
        "The (right - left + 1) contribution counts every window ending at right, not just the longest.",
      ],
      javaToolkit: ["Sliding window", "The at-most-minus-at-most trick", "int[26] window counts"],
    },
  },

  "longest-palindrome-substring": {
    slug: "longest-palindrome-substring",
    title: "Longest Palindromic Substring",
    description:
      "Return the longest palindromic substring. If several tie in length, return the one starting earliest. Solve it without dynamic programming.",
    constraints: ["1 ≤ s.length ≤ 1000", "Letters and digits"],
    className: "Solution",
    methodName: "longestPalindrome",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String longestPalindrome(String s) {
        // On a tie, return the earliest-starting one.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "babad" }, expectedOutput: "bab", explanation: "aba is also length 3, but bab starts earlier." },
      { id: 2, inputs: { s: "cbbd" }, expectedOutput: "bb" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "ac" }, expectedOutput: "a", isHidden: true },
      { id: 5, inputs: { s: "aaaa" }, expectedOutput: "aaaa", isHidden: true },
      { id: 6, inputs: { s: "abacdfgdcaba" }, expectedOutput: "aba", isHidden: true },
    ],
    learn: {
      intuition:
        "Every palindrome has a centre. There are 2n - 1 possible centres — one per character and one between each adjacent pair — so try them all and expand outwards while the characters match.",
      approach: [
        "For each index, expand around it as an odd-length centre.",
        "Also expand around the gap between it and the next index, for even-length palindromes.",
        "Keep the longest found, updating only on a STRICT improvement so ties keep the earliest.",
      ],
      bruteForce: { idea: "Check every substring for palindromicity.", time: "O(n³)", space: "O(1)" },
      optimal: { idea: "Expand around all 2n - 1 centres.", time: "O(n²)", space: "O(1)" },
      pitfalls: [
        "Handling only odd centres misses every even-length palindrome — \"cbbd\" catches this.",
        "Updating the answer on >= rather than > returns a later palindrome and breaks the tie rule.",
        "Manacher's algorithm is O(n) but far more code; O(n²) is fine at n = 1000.",
      ],
      javaToolkit: ["Expand around centre", "Two centre types per index", "Strict > for tie-breaking"],
    },
  },

  "beauty-all-substrings": {
    slug: "beauty-all-substrings",
    title: "Sum of Beauty of All Substrings",
    description:
      "The beauty of a string is the highest character frequency minus the lowest, counting only characters that actually appear. Return the total beauty across every substring.",
    constraints: ["1 ≤ s.length ≤ 500", "Lowercase English letters"],
    className: "Solution",
    methodName: "beautySum",
    parameters: [{ name: "s", type: "String" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int beautySum(String s) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "aabcb" }, expectedOutput: 5, explanation: "The substrings with non-zero beauty are aab, aabc, aabcb, abcb and bcb, each contributing 1." },
      { id: 2, inputs: { s: "aabcbaa" }, expectedOutput: 17 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { s: "aa" }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { s: "ab" }, expectedOutput: 0, isHidden: true },
      { id: 6, inputs: { s: "aab" }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Rather than rebuilding counts for every substring, fix the start and extend the end one character at a time, updating a single frequency array incrementally. That turns O(n³) into O(n² × 26).",
      approach: [
        "For each start index, reset a 26-slot frequency array.",
        "Extend the end index, incrementing one count per step.",
        "After each extension, scan the 26 slots for the highest and lowest non-zero counts and add the difference.",
      ],
      bruteForce: { idea: "Recount from scratch for every substring.", time: "O(n³ × 26)", space: "O(1)" },
      optimal: { idea: "Incremental frequency array per starting index.", time: "O(n² × 26)", space: "O(1)" },
      pitfalls: [
        "Characters with a count of zero must be EXCLUDED from the minimum, or the beauty is always max - 0.",
        "A substring of one character, or of all-identical characters, has beauty 0.",
        "Resetting the frequency array for each new start is essential.",
      ],
      javaToolkit: ["int[26] frequency", "Incremental window extension", "Skipping zero counts"],
    },
  },

  "reverse-every-word": {
    slug: "reverse-every-word",
    title: "Reverse Every Word in a String",
    description:
      "Reverse the characters of each word while keeping the words in their original order and preserving the single spaces between them.",
    constraints: ["1 ≤ s.length ≤ 5 × 10^4", "Words are separated by single spaces, with no leading or trailing space"],
    className: "Solution",
    methodName: "reverseEachWord",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public String reverseEachWord(String s) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "Let's take LeetCode contest" }, expectedOutput: "s'teL ekat edoCteeL tsetnoc" },
      { id: 2, inputs: { s: "God Ding" }, expectedOutput: "doG gniD" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "ab cd" }, expectedOutput: "ba dc", isHidden: true },
      { id: 5, inputs: { s: "aaa" }, expectedOutput: "aaa", isHidden: true },
      { id: 6, inputs: { s: "one two three" }, expectedOutput: "eno owt eerht", isHidden: true },
    ],
    learn: {
      intuition:
        "The opposite of the earlier reverse-words problem: word ORDER is preserved and the letters within each word are flipped. Split, reverse each piece, rejoin.",
      approach: [
        "Split on a single space.",
        "Reverse each token with StringBuilder.reverse.",
        "Join with a single space.",
      ],
      optimal: { idea: "Split, reverse each token, join.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Confusing this with reversing the word order — compare the two problems side by side.",
        "The input guarantees single spaces here, so no trimming is needed, unlike the earlier problem.",
        "StringBuilder.reverse mutates and returns itself, so call toString on the result.",
      ],
      javaToolkit: ["s.split(\" \")", "new StringBuilder(word).reverse()", "String.join"],
    },
  },
}
