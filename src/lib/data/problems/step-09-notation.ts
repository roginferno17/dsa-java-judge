import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 9 — Infix, prefix and postfix conversion (6).
 *
 * Shared conventions across all six, so no answer is ambiguous:
 *   - Operands are single alphanumeric characters; the expression has no spaces.
 *   - Operators are + - * / ^ with the usual precedence: ^ highest, then * and /,
 *     then + and -.
 *   - + - * / are left-associative; ^ is right-associative.
 *   - Every infix OUTPUT is fully parenthesised, one pair per operation, so there
 *     is exactly one correct string.
 */
export const step09Notation: Record<string, ProblemMetadata> = {
  "infix-to-postfix": {
    slug: "infix-to-postfix",
    title: "Infix to Postfix Conversion",
    description:
      "Convert an infix expression to postfix (reverse Polish). Operands are single alphanumeric characters; operators are + - * / ^ with the usual precedence, left-associative except for ^, which is right-associative. Parentheses may appear in the input; the output has none.",
    constraints: ["1 ≤ s.length ≤ 10^4", "s contains only alphanumerics, + - * / ^ and parentheses", "s is a valid expression"],
    className: "Solution",
    methodName: "infixToPostfix",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public String infixToPostfix(String s) {
        // ^ is right-associative; + - * / are left-associative.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "a+b*c" }, expectedOutput: "abc*+", explanation: "* binds tighter, so b and c combine first." },
      { id: 2, inputs: { s: "(a+b)*c" }, expectedOutput: "ab+c*", explanation: "The parentheses force the addition first." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "a+b+c" }, expectedOutput: "ab+c+", isHidden: true },
      { id: 5, inputs: { s: "a^b^c" }, expectedOutput: "abc^^", isHidden: true },
      { id: 6, inputs: { s: "a+b*(c^d-e)^(f+g*h)-i" }, expectedOutput: "abcd^e-fgh*+^*+i-", isHidden: true },
      { id: 7, inputs: { s: "((a))" }, expectedOutput: "a", isHidden: true },
    ],
    learn: {
      intuition:
        "Postfix needs no parentheses because the order of the operators already encodes precedence. Dijkstra's shunting-yard gets there in one pass: operands go straight to the output, while operators wait on a stack until something of lower or equal precedence forces them out.",
      approach: [
        "Scan left to right. Append operands to the output immediately.",
        "On '(' push it. On ')' pop to the output until the matching '(' and discard it.",
        "On an operator, first pop every stacked operator with GREATER precedence, plus those with EQUAL precedence when the current one is left-associative. Then push it.",
        "At the end, pop whatever remains.",
      ],
      bruteForce: { idea: "Fully parenthesise, then recursively convert.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Shunting-yard, one pass.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Popping on equal precedence for ^ makes it left-associative and gives ab^c^ instead of abc^^ — a hidden case checks exactly this.",
        "'(' must never be popped by precedence; it only leaves on a matching ')'.",
        "Do not emit the parentheses themselves.",
      ],
      javaToolkit: ["Deque<Character> as a stack", "A precedence helper", "StringBuilder for the output"],
    },
  },

  "infix-to-prefix": {
    slug: "infix-to-prefix",
    title: "Infix to Prefix Conversion",
    description:
      "Convert an infix expression to prefix (Polish notation). Same conventions as infix-to-postfix: single-character operands, + - * / ^ with the usual precedence, left-associative except ^.",
    constraints: ["1 ≤ s.length ≤ 10^4", "s contains only alphanumerics, + - * / ^ and parentheses", "s is a valid expression"],
    className: "Solution",
    methodName: "infixToPrefix",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public String infixToPrefix(String s) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "a+b*c" }, expectedOutput: "+a*bc" },
      { id: 2, inputs: { s: "(a+b)*c" }, expectedOutput: "*+abc" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "a-b-c" }, expectedOutput: "--abc", isHidden: true },
      { id: 5, inputs: { s: "a^b^c" }, expectedOutput: "^a^bc", isHidden: true },
      { id: 6, inputs: { s: "(a-b/c)*(a/k-l)" }, expectedOutput: "*-a/bc-/akl", isHidden: true },
      { id: 7, inputs: { s: "x+y*z/w+u" }, expectedOutput: "++x/*yzwu", isHidden: true },
    ],
    learn: {
      intuition:
        "Prefix is postfix read from the other end. Reverse the expression, convert to postfix, and reverse again — as long as you flip the brackets on the way in and flip the associativity rule, since reversal turns left-associative into right-associative.",
      approach: [
        "Reverse the string, swapping every '(' with ')' and vice versa.",
        "Run shunting-yard on it, but treat + - * / as RIGHT-associative and ^ as left-associative — the reversal inverts both.",
        "Reverse the postfix result to get the prefix expression.",
      ],
      bruteForce: { idea: "Build the expression tree, then walk it in pre-order.", time: "O(n)", space: "O(n)" },
      optimal: { idea: "Reverse, convert to postfix with flipped associativity, reverse.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Forgetting to swap the brackets when reversing turns valid input into nonsense.",
        "Keeping the original associativity gives -a-bc instead of --abc for a-b-c — the reversal flips it.",
        "A tree-based solution is easier to reason about and just as fast if the trick feels slippery.",
      ],
      javaToolkit: ["StringBuilder.reverse", "Bracket swapping", "Associativity under reversal"],
    },
  },

  "prefix-to-infix": {
    slug: "prefix-to-infix",
    title: "Prefix to Infix Conversion",
    description:
      "Convert a prefix expression to FULLY PARENTHESISED infix — one pair of brackets around every operation, so \"+a*bc\" becomes \"(a+(b*c))\". A lone operand gets no brackets.",
    constraints: ["1 ≤ s.length ≤ 10^4", "s is a valid prefix expression over single-character operands"],
    className: "Solution",
    methodName: "prefixToInfix",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public String prefixToInfix(String s) {
        // Fully parenthesised: one pair per operation.
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "*+ab-cd" }, expectedOutput: "((a+b)*(c-d))" },
      { id: 2, inputs: { s: "+a*bc" }, expectedOutput: "(a+(b*c))" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "--abc" }, expectedOutput: "((a-b)-c)", isHidden: true },
      { id: 5, inputs: { s: "^a^bc" }, expectedOutput: "(a^(b^c))", isHidden: true },
      { id: 6, inputs: { s: "*-a/bc-/akl" }, expectedOutput: "((a-(b/c))*((a/k)-l))", isHidden: true },
    ],
    learn: {
      intuition:
        "In prefix an operator comes before both its operands, so scanning from the RIGHT means both operands are already built by the time you meet their operator. A stack of completed sub-expressions is all you need.",
      approach: [
        "Scan right to left.",
        "Push each operand as a one-character string.",
        "On an operator, pop two — the first popped is the LEFT operand — and push \"(\" + left + op + right + \")\".",
        "The single remaining entry is the answer.",
      ],
      optimal: { idea: "Right-to-left scan with a stack of strings.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The operand order is the opposite of the postfix version: scanning right to left, the FIRST pop is the left operand. Getting it backwards silently produces (b-a).",
        "A lone operand must come back unbracketed.",
        "Repeated string concatenation is O(n²) on long inputs; build with StringBuilder if it matters.",
      ],
      javaToolkit: ["Deque<String>", "Right-to-left scan", "Operand order on pop"],
    },
  },

  "prefix-to-postfix": {
    slug: "prefix-to-postfix",
    title: "Prefix to Postfix Conversion",
    description: "Convert a prefix expression to postfix. Operands are single alphanumeric characters.",
    constraints: ["1 ≤ s.length ≤ 10^4", "s is a valid prefix expression"],
    className: "Solution",
    methodName: "prefixToPostfix",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public String prefixToPostfix(String s) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "*+ab-cd" }, expectedOutput: "ab+cd-*" },
      { id: 2, inputs: { s: "+a*bc" }, expectedOutput: "abc*+" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "--abc" }, expectedOutput: "ab-c-", isHidden: true },
      { id: 5, inputs: { s: "^a^bc" }, expectedOutput: "abc^^", isHidden: true },
      { id: 6, inputs: { s: "*-a/bc-/akl" }, expectedOutput: "abc/-ak/l-*", isHidden: true },
    ],
    learn: {
      intuition:
        "The same right-to-left stack walk as prefix-to-infix, with a different assembly rule. Both notations are unambiguous, so no brackets are ever needed — just concatenate the two operands and put the operator last.",
      approach: [
        "Scan right to left, pushing operands.",
        "On an operator, pop two (first popped is the left operand) and push left + right + op.",
        "Return the single remaining entry.",
      ],
      optimal: { idea: "Right-to-left scan with a string stack.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Same operand-order trap as prefix-to-infix — the first pop is the LEFT operand.",
        "No brackets belong in the output; postfix encodes the order positionally.",
        "Scanning left to right does not work: an operator arrives before its operands exist.",
      ],
      javaToolkit: ["Deque<String>", "Right-to-left scan", "Postfix assembly order"],
    },
  },

  "postfix-to-infix": {
    slug: "postfix-to-infix",
    title: "Postfix to Infix Conversion",
    description:
      "Convert a postfix expression to FULLY PARENTHESISED infix — one pair of brackets around every operation. A lone operand gets no brackets.",
    constraints: ["1 ≤ s.length ≤ 10^4", "s is a valid postfix expression"],
    className: "Solution",
    methodName: "postfixToInfix",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public String postfixToInfix(String s) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "ab*c+" }, expectedOutput: "((a*b)+c)" },
      { id: 2, inputs: { s: "abc*+" }, expectedOutput: "(a+(b*c))" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "ab+cd+*" }, expectedOutput: "((a+b)*(c+d))", isHidden: true },
      { id: 5, inputs: { s: "abc^^" }, expectedOutput: "(a^(b^c))", isHidden: true },
      { id: 6, inputs: { s: "ab-c-" }, expectedOutput: "((a-b)-c)", isHidden: true },
    ],
    learn: {
      intuition:
        "In postfix an operator comes after both its operands, so a plain left-to-right scan already has them ready. This is the same shape as evaluating postfix, except you build a string instead of a number.",
      approach: [
        "Scan left to right, pushing operands.",
        "On an operator, pop two — the FIRST popped is the RIGHT operand here — and push \"(\" + left + op + right + \")\".",
        "Return the single remaining entry.",
      ],
      optimal: { idea: "Left-to-right scan with a string stack.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The operand order is the mirror of the prefix version: scanning left to right, the first pop is the RIGHT operand. This is the single most common bug in the whole group.",
        "The brackets are what make the answer unique — a minimally-bracketed version would have several valid forms.",
        "A lone operand comes back unbracketed.",
      ],
      javaToolkit: ["Deque<String>", "Left-to-right scan", "Right operand pops first"],
    },
  },

  "postfix-to-prefix": {
    slug: "postfix-to-prefix",
    title: "Postfix to Prefix Conversion",
    description: "Convert a postfix expression to prefix. Operands are single alphanumeric characters.",
    constraints: ["1 ≤ s.length ≤ 10^4", "s is a valid postfix expression"],
    className: "Solution",
    methodName: "postfixToPrefix",
    parameters: [{ name: "s", type: "String" }],
    returnType: "String",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public String postfixToPrefix(String s) {
        return "";
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "ab+cd-*" }, expectedOutput: "*+ab-cd" },
      { id: 2, inputs: { s: "abc*+" }, expectedOutput: "+a*bc" },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "a" }, expectedOutput: "a", isHidden: true },
      { id: 4, inputs: { s: "ab-c-" }, expectedOutput: "--abc", isHidden: true },
      { id: 5, inputs: { s: "abc^^" }, expectedOutput: "^a^bc", isHidden: true },
      { id: 6, inputs: { s: "abc/-ak/l-*" }, expectedOutput: "*-a/bc-/akl", isHidden: true },
    ],
    learn: {
      intuition:
        "Left-to-right with a string stack again — only the assembly changes. Put the operator first and the two operands after it, in their original left-then-right order.",
      approach: [
        "Scan left to right, pushing operands.",
        "On an operator, pop two (first popped is the RIGHT operand) and push op + left + right.",
        "Return the single remaining entry.",
      ],
      optimal: { idea: "Left-to-right scan, assembling operator-first.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "First pop is the right operand — the same trap as postfix-to-infix.",
        "This is the exact inverse of prefix-to-postfix, which is worth checking by running one on the other's output.",
        "All four conversions share one skeleton; only scan direction and assembly differ, so learn the skeleton rather than four recipes.",
      ],
      javaToolkit: ["Deque<String>", "Prefix assembly order", "The four conversions as one pattern"],
    },
  },
}
