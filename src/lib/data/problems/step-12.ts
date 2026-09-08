import type { ProblemMetadata } from "@/lib/types/judge"

/**
 * Step 12 — Greedy Algorithms (16).
 *
 * A greedy algorithm commits to the locally best choice and never reconsiders. It
 * is only correct when that choice provably cannot rule out an optimal answer, and
 * for most of these the whole difficulty is deciding what "best" means: earliest
 * finish, highest ratio, latest deadline. When no such argument exists the problem
 * belongs in Step 16 instead, and jump-game-2 versus the coin problem here is a
 * good illustration of the boundary.
 */
export const step12: Record<string, ProblemMetadata> = {
  "assign-cookies": {
    slug: "assign-cookies",
    title: "Assign Cookies",
    description:
      "Each child has a greed factor and each cookie a size. A child is content when given a cookie at least as big as their greed, and each child gets at most one cookie. Return the greatest number of content children.",
    constraints: ["0 ≤ greed.length, sizes.length ≤ 5 × 10^4", "1 ≤ values ≤ 2^31 - 1"],
    className: "Solution",
    methodName: "findContentChildren",
    parameters: [
      { name: "greed", type: "int[]" },
      { name: "sizes", type: "int[]" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int findContentChildren(int[] greed, int[] sizes) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { greed: [1, 2, 3], sizes: [1, 1] }, expectedOutput: 1, explanation: "Only the child with greed 1 can be satisfied." },
      { id: 2, inputs: { greed: [1, 2], sizes: [1, 2, 3] }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { greed: [], sizes: [1, 2] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { greed: [1, 1], sizes: [] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { greed: [10, 9, 8, 7], sizes: [5, 6, 7, 8] }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { greed: [1, 1, 1], sizes: [1, 1, 1] }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { greed: [5], sizes: [1, 2, 3] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "Spend the smallest cookie that will do. Handing a big cookie to a modest child wastes it on someone a small cookie would have satisfied, and can never make the total larger — so sort both sides and walk them together.",
      approach: [
        "Sort greed and sizes ascending.",
        "Walk two pointers: if the current cookie satisfies the current child, count it and advance both.",
        "Otherwise advance only the cookie pointer — this cookie is too small for anyone remaining.",
      ],
      bruteForce: { idea: "Try every assignment of cookies to children.", time: "exponential", space: "O(n)" },
      optimal: { idea: "Sort both, then two pointers.", time: "O(n log n)", space: "O(1)" },
      pitfalls: [
        "Matching the largest cookies to the greediest children first also works, but must be written carefully; smallest-first is easier to get right.",
        "Either array may be empty, giving 0.",
        "The comparison is ≥, not >: a cookie exactly equal to the greed satisfies the child.",
      ],
      javaToolkit: ["Arrays.sort on both inputs", "Two pointers over sorted arrays", "Exchange argument for greedy correctness"],
    },
  },

  "fractional-knapsack": {
    slug: "fractional-knapsack",
    title: "Fractional Knapsack",
    description:
      "Items may be broken into arbitrary fractions. Return the greatest total value that fits in a knapsack of the given capacity, rounded to six decimal places.",
    constraints: ["1 ≤ n ≤ 10^5", "1 ≤ capacity ≤ 10^9", "1 ≤ value[i], weight[i] ≤ 10^4"],
    className: "Solution",
    methodName: "fractionalKnapsack",
    parameters: [
      { name: "values", type: "int[]" },
      { name: "weights", type: "int[]" },
      { name: "capacity", type: "int" },
    ],
    returnType: "double",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public double fractionalKnapsack(int[] values, int[] weights, int capacity) {
        // Items are divisible.
        return 0.0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { values: [60, 100, 120], weights: [10, 20, 30], capacity: 50 }, expectedOutput: 240.0, explanation: "Take items 1 and 2 whole, then two thirds of item 3." },
      { id: 2, inputs: { values: [10], weights: [5], capacity: 10 }, expectedOutput: 10.0, explanation: "The knapsack is bigger than everything available." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { values: [10], weights: [20], capacity: 10 }, expectedOutput: 5.0, isHidden: true },
      { id: 4, inputs: { values: [1, 1], weights: [1, 1], capacity: 1 }, expectedOutput: 1.0, isHidden: true },
      { id: 5, inputs: { values: [100, 60], weights: [20, 10], capacity: 15 }, expectedOutput: 85.0, isHidden: true },
      { id: 6, inputs: { values: [5, 5, 5], weights: [1, 1, 1], capacity: 2 }, expectedOutput: 10.0, isHidden: true },
      { id: 7, inputs: { values: [10], weights: [4], capacity: 1 }, expectedOutput: 2.5, isHidden: true },
    ],
    learn: {
      intuition:
        "Because items divide, only density matters — value per unit weight. Filling with the densest material first is optimal, and the last item is simply cut to fit.",
      approach: [
        "Sort the items by value / weight descending.",
        "Take whole items while they fit, subtracting from the remaining capacity.",
        "Take the fractional part of the first item that does not fit, then stop.",
      ],
      bruteForce: { idea: "Try every subset and fraction.", time: "unbounded", space: "O(n)" },
      optimal: { idea: "Sort by density, fill greedily.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "The 0/1 version — where items cannot be split — is NOT solvable this way and needs dynamic programming. Divisibility is what licenses the greedy choice.",
        "Compare densities in double, or by cross-multiplying; integer division silently rounds every ratio to 0 or 1.",
        "Answers are compared with a tolerance, so exact decimal formatting is not required.",
      ],
      javaToolkit: ["Sorting by a computed ratio", "Comparator.comparingDouble", "Why 0/1 knapsack is different"],
    },
  },

  "min-coins-greedy": {
    slug: "min-coins-greedy",
    title: "Minimum Coins (Greedy)",
    description:
      "Given a canonical coin system — one where taking the largest coin that fits is always optimal — return the fewest coins summing to the amount. Coins are unlimited and given ascending. Every test uses a canonical system, so a greedy answer is correct.",
    constraints: ["1 ≤ coins.length ≤ 20", "0 ≤ amount ≤ 10^9", "coins is ascending and canonical"],
    className: "Solution",
    methodName: "minCoins",
    parameters: [
      { name: "coins", type: "int[]" },
      { name: "amount", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int minCoins(int[] coins, int amount) {
        // The system is canonical, so largest-first is optimal.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { coins: [1, 2, 5, 10, 20, 50, 100, 500, 1000], amount: 121 }, expectedOutput: 3, explanation: "100 + 20 + 1." },
      { id: 2, inputs: { coins: [1, 5, 10, 25], amount: 30 }, expectedOutput: 2, explanation: "25 + 5." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { coins: [1, 2, 5], amount: 0 }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { coins: [1], amount: 7 }, expectedOutput: 7, isHidden: true },
      { id: 5, inputs: { coins: [1, 5, 10, 25], amount: 99 }, expectedOutput: 9, isHidden: true },
      { id: 6, inputs: { coins: [1, 2, 5, 10, 20, 50, 100, 500, 1000], amount: 1000000000 }, expectedOutput: 1000000, isHidden: true },
      { id: 7, inputs: { coins: [1, 3, 9, 27], amount: 26 }, expectedOutput: 6, isHidden: true },
    ],
    learn: {
      intuition:
        "In a canonical system a larger coin can always replace some combination of smaller ones without increasing the count, so taking the biggest coin that fits never costs anything.",
      approach: [
        "Walk the coins from largest to smallest.",
        "Take amount / coin of each and subtract, accumulating the count.",
        "Stop when the amount reaches 0.",
      ],
      bruteForce: { idea: "Search every combination.", time: "exponential", space: "O(amount)" },
      optimal: { idea: "Largest-first division, valid because the system is canonical.", time: "O(number of coins)", space: "O(1)" },
      pitfalls: [
        "Greedy is WRONG for arbitrary coin systems: with {1, 3, 4} and amount 6 it takes 4+1+1 = 3 coins when 3+3 = 2 is better. The constraint here is what makes it safe, and Step 16 handles the general case.",
        "Subtract in bulk with division rather than one coin at a time, or an amount of 10^9 loops forever.",
        "An amount of 0 needs no coins.",
      ],
      javaToolkit: ["Integer division for bulk subtraction", "Canonical coin systems", "The counterexample that breaks greedy"],
    },
  },

  "lemonade-change": {
    slug: "lemonade-change",
    title: "Lemonade Change",
    description:
      "Each customer buys a lemonade costing 5 and pays with a 5, 10 or 20 note. You start with nothing and must give correct change to every customer in order. Return whether that is possible.",
    constraints: ["1 ≤ bills.length ≤ 10^5", "bills[i] is 5, 10 or 20"],
    className: "Solution",
    methodName: "lemonadeChange",
    parameters: [{ name: "bills", type: "int[]" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean lemonadeChange(int[] bills) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { bills: [5, 5, 5, 10, 20] }, expectedOutput: true },
      { id: 2, inputs: { bills: [5, 5, 10, 10, 20] }, expectedOutput: false, explanation: "The 20 needs 15 in change, and only one 5 is left." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { bills: [5] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { bills: [10] }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { bills: [5, 5, 5, 5, 20, 20] }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { bills: [5, 5, 10, 20] }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { bills: [5, 5, 5, 10, 5, 20] }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "Change for 20 can be 10 + 5 or 5 + 5 + 5. Prefer the first: fives are needed for both kinds of change while tens are needed for neither, so spending a ten first keeps the more useful notes.",
      approach: [
        "Track how many 5s and 10s you hold.",
        "A 5 needs no change. A 10 needs one 5.",
        "A 20 takes a 10 and a 5 if possible, otherwise three 5s; fail if neither is available.",
      ],
      bruteForce: { idea: "Search over which change to give each customer.", time: "exponential", space: "O(n)" },
      optimal: { idea: "Greedily spend the largest usable note.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Giving three 5s when a 10 is available is the losing move; case 5 punishes it.",
        "There is no need to count 20s — they can never be given as change.",
        "The first customer must pay with a 5, or you fail immediately.",
      ],
      javaToolkit: ["Two counters", "Preferring the note with fewer uses", "Greedy exchange reasoning"],
    },
  },

  "valid-parenthesis-checker": {
    slug: "valid-parenthesis-checker",
    title: "Valid Parenthesis String",
    description:
      "The string contains '(', ')' and '*', where each '*' may stand for '(', ')' or an empty string. Return whether some substitution makes the string balanced.",
    constraints: ["0 ≤ s.length ≤ 100", "s contains only '(', ')' and '*'"],
    className: "Solution",
    methodName: "checkValidString",
    parameters: [{ name: "s", type: "String" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean checkValidString(String s) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { s: "(*)" }, expectedOutput: true, explanation: "The star becomes empty." },
      { id: 2, inputs: { s: "(*))" }, expectedOutput: true, explanation: "The star becomes an opening bracket." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { s: "" }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { s: "(" }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { s: "*" }, expectedOutput: true, isHidden: true },
      { id: 6, inputs: { s: ")(" }, expectedOutput: false, isHidden: true },
      { id: 7, inputs: { s: "(((((*)))))" }, expectedOutput: true, isHidden: true },
      { id: 8, inputs: { s: "(((((()))))" }, expectedOutput: false, isHidden: true },
    ],
    learn: {
      intuition:
        "Rather than deciding what each star is, track the RANGE of possible open-bracket counts. A star can push the count up, down, or leave it, so carry a low and a high bound and ask whether zero is reachable at the end.",
      approach: [
        "Keep low and high, both starting at 0.",
        "'(' increments both; ')' decrements both; '*' decrements low and increments high.",
        "Clamp low at 0 — a negative count is not a real state. If high ever goes negative, there are too many closers, so fail.",
        "Succeed when low reaches 0 at the end.",
      ],
      bruteForce: { idea: "Try all three meanings for every star.", time: "O(3^stars)", space: "O(n)" },
      optimal: { idea: "Track the reachable range of open counts.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "Forgetting to clamp low at 0 lets it drift negative and wrongly accepts strings like \")(\".",
        "high going negative is fatal and must return immediately, not merely clamp.",
        "Ending with low > 0 means unmatched openers remain, so the answer is false.",
      ],
      javaToolkit: ["Range tracking instead of case analysis", "Math.max clamping", "Two-stack solution as the alternative"],
    },
  },

  "n-meetings-room": {
    slug: "n-meetings-room",
    title: "N Meetings in One Room",
    description:
      "Given the start and end times of meetings, return the greatest number that can run in a single room without overlapping. A meeting ending at time t and another starting at t do NOT overlap.",
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ start[i] < end[i] ≤ 10^9"],
    className: "Solution",
    methodName: "maxMeetings",
    parameters: [
      { name: "start", type: "int[]" },
      { name: "end", type: "int[]" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int maxMeetings(int[] start, int[] end) {
        // Touching at a boundary is not an overlap.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { start: [1, 3, 0, 5, 8, 5], end: [2, 4, 6, 7, 9, 9] }, expectedOutput: 4, explanation: "The meetings ending at 2, 4, 7 and 9 fit together." },
      { id: 2, inputs: { start: [10, 12, 20], end: [20, 25, 30] }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { start: [1], end: [2] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { start: [0, 0, 0], end: [10, 10, 10] }, expectedOutput: 1, isHidden: true },
      { id: 5, inputs: { start: [1, 2, 3], end: [2, 3, 4] }, expectedOutput: 3, isHidden: true },
      { id: 6, inputs: { start: [0, 1], end: [5, 2] }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { start: [1, 3, 5, 7], end: [10, 4, 6, 8] }, expectedOutput: 3, isHidden: true },
    ],
    learn: {
      intuition:
        "Finishing early leaves the most room for everything after, so sort by END time and take any meeting that starts once the room is free. Sorting by start or by duration both fail — one long early meeting can swallow several short ones.",
      approach: [
        "Pair each start with its end and sort by end ascending.",
        "Track when the room becomes free, starting at negative infinity.",
        "Take a meeting when its start is at least that time, then update it to that meeting's end.",
      ],
      bruteForce: { idea: "Try every subset and check for overlaps.", time: "O(2^n × n)", space: "O(n)" },
      optimal: { idea: "Sort by finish time, take greedily.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "Sorting by START is the classic wrong answer, and so is sorting by duration: one long early meeting blocks several short ones that would all have fitted. Earliest FINISH is the choice with a proof behind it.",
        "The boundary rule matters: with ends 2,3,4 and starts 1,2,3 all three fit.",
        "The comparison is ≥ against the free time, not >.",
      ],
      javaToolkit: ["Sorting an index array by a key", "Activity selection", "Why earliest-finish is optimal"],
    },
  },

  "jump-game": {
    slug: "jump-game",
    title: "Jump Game",
    description:
      "Each entry is the maximum number of steps you may jump forward from that index. Starting at index 0, return whether the last index is reachable.",
    constraints: ["1 ≤ nums.length ≤ 10^4", "0 ≤ nums[i] ≤ 10^5"],
    className: "Solution",
    methodName: "canJump",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "boolean",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public boolean canJump(int[] nums) {
        return false;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 3, 1, 1, 4] }, expectedOutput: true },
      { id: 2, inputs: { nums: [3, 2, 1, 0, 4] }, expectedOutput: false, explanation: "Every route stalls on the 0 at index 3." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [0] }, expectedOutput: true, isHidden: true },
      { id: 4, inputs: { nums: [0, 1] }, expectedOutput: false, isHidden: true },
      { id: 5, inputs: { nums: [1, 0, 1, 0] }, expectedOutput: false, isHidden: true },
      { id: 6, inputs: { nums: [2, 0, 0] }, expectedOutput: true, isHidden: true },
      { id: 7, inputs: { nums: [5, 0, 0, 0, 0, 0] }, expectedOutput: true, isHidden: true },
    ],
    learn: {
      intuition:
        "The exact route never matters, only how far you can possibly get. Sweep left to right carrying the furthest reachable index; if you ever stand beyond it, the path is broken.",
      approach: [
        "Track reach, starting at 0.",
        "At each index i, fail if i is beyond reach; otherwise update reach to max(reach, i + nums[i]).",
        "Succeed if the loop finishes.",
      ],
      bruteForce: { idea: "Search every jump sequence.", time: "exponential", space: "O(n)" },
      optimal: { idea: "Track the furthest reachable index in one pass.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "A single element is always a success — you are already at the end.",
        "Zeros are only fatal when reach does not already extend past them, as [2,0,0] shows.",
        "Walking backwards from the end also works, but the forward sweep is simpler.",
      ],
      javaToolkit: ["Running maximum reach", "One-pass feasibility check", "Greedy over reachability"],
    },
  },

  "jump-game-2": {
    slug: "jump-game-2",
    title: "Jump Game II",
    description:
      "The last index is guaranteed reachable. Return the minimum number of jumps needed to get there from index 0.",
    constraints: ["1 ≤ nums.length ≤ 10^4", "0 ≤ nums[i] ≤ 1000", "The last index is always reachable"],
    className: "Solution",
    methodName: "minJumps",
    parameters: [{ name: "nums", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `class Solution {
    public int minJumps(int[] nums) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { nums: [2, 3, 1, 1, 4] }, expectedOutput: 2, explanation: "Index 0 to 1, then 1 to 4." },
      { id: 2, inputs: { nums: [2, 3, 0, 1, 4] }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { nums: [0] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { nums: [1, 1, 1, 1] }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { nums: [5, 1, 1, 1, 1, 1] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { nums: [1, 2, 3] }, expectedOutput: 2, isHidden: true },
      { id: 7, inputs: { nums: [7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3] }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "Think in levels, exactly like breadth-first search on a line. Everything reachable in one jump is level 1, everything reachable from those is level 2, and so on — so scan the current level, note the furthest index it reaches, and increment the count when you cross the boundary.",
      approach: [
        "Track jumps, currentEnd (the end of this level) and farthest.",
        "For each i up to n - 2, update farthest to max(farthest, i + nums[i]).",
        "When i reaches currentEnd, increment jumps and set currentEnd to farthest.",
      ],
      bruteForce: { idea: "Dynamic programming over minimum jumps to each index.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Level-by-level greedy sweep.", time: "O(n)", space: "O(1)" },
      pitfalls: [
        "The loop must stop at n - 2; touching the last index would count one jump too many.",
        "A single element needs 0 jumps.",
        "Greedily taking the largest jump available is NOT the same algorithm and gives wrong answers — what matters is the furthest index reachable from anywhere in the current level, not from the current index.",
      ],
      javaToolkit: ["Level-based sweep", "currentEnd and farthest", "BFS reasoning without a queue"],
    },
  },

  "min-platforms": {
    slug: "min-platforms",
    title: "Minimum Number of Platforms",
    description:
      "Given arrival and departure times for trains at a station, return the fewest platforms needed so no train waits. A train arriving at exactly the moment another departs still needs its own platform.",
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ arrival[i] ≤ departure[i] ≤ 10^9"],
    className: "Solution",
    methodName: "minPlatforms",
    parameters: [
      { name: "arrival", type: "int[]" },
      { name: "departure", type: "int[]" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int minPlatforms(int[] arrival, int[] departure) {
        // Arriving exactly at a departure time still needs a platform.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { arrival: [900, 940, 950, 1100, 1500, 1800], departure: [910, 1200, 1120, 1130, 1900, 2000] }, expectedOutput: 3 },
      { id: 2, inputs: { arrival: [900, 1100, 1235], departure: [1000, 1200, 1240] }, expectedOutput: 1, explanation: "The trains never overlap." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { arrival: [1], departure: [2] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { arrival: [0, 0, 0], departure: [1, 1, 1] }, expectedOutput: 3, isHidden: true },
      { id: 5, inputs: { arrival: [100, 200], departure: [200, 300] }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { arrival: [1, 2, 3], departure: [10, 11, 12] }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { arrival: [5, 5], departure: [5, 5] }, expectedOutput: 2, isHidden: true },
    ],
    learn: {
      intuition:
        "The answer is the largest number of trains present at any one moment. Sorting arrivals and departures SEPARATELY and merging them turns the whole timetable into a sequence of +1 and -1 events, whose running maximum is the answer.",
      approach: [
        "Sort arrivals and departures independently — the pairing does not matter, only the counts do.",
        "Walk both with two pointers; take the earlier event each time.",
        "An arrival increments the count, a departure decrements it. Track the maximum.",
      ],
      bruteForce: { idea: "For each train, count how many others overlap it.", time: "O(n²)", space: "O(1)" },
      optimal: { idea: "Sort both sides, sweep as +1/-1 events.", time: "O(n log n)", space: "O(1)" },
      pitfalls: [
        "Breaking the pairing feels wrong but is exactly right — only the overlap COUNT matters at each instant.",
        "The boundary rule decides ties: process the arrival first when times are equal, which case 5 checks.",
        "A difference array works when times are small and bounded, but not at 10^9.",
      ],
      javaToolkit: ["Sorting both arrays independently", "Two-pointer event sweep", "Running maximum of a counter"],
    },
  },

  "job-sequencing": {
    slug: "job-sequencing",
    title: "Job Sequencing With Deadlines",
    description:
      "Each job takes one unit of time, has a deadline and a profit, and earns its profit only if it finishes by its deadline. One job runs at a time. Return {jobs completed, total profit}.",
    constraints: ["1 ≤ n ≤ 10^5", "1 ≤ deadline[i] ≤ n", "1 ≤ profit[i] ≤ 10^4"],
    className: "Solution",
    methodName: "jobScheduling",
    parameters: [
      { name: "deadlines", type: "int[]" },
      { name: "profits", type: "int[]" },
    ],
    returnType: "int[]",
    comparison: { type: "array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[] jobScheduling(int[] deadlines, int[] profits) {
        // Return {count, totalProfit}.
        return new int[]{ 0, 0 };
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { deadlines: [4, 1, 1, 1], profits: [20, 10, 40, 30] }, expectedOutput: [2, 60], explanation: "Run the profit-40 job in slot 1 and the profit-20 job by its deadline of 4." },
      { id: 2, inputs: { deadlines: [2, 1, 2, 1, 1], profits: [100, 19, 27, 25, 15] }, expectedOutput: [2, 127] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { deadlines: [1], profits: [5] }, expectedOutput: [1, 5], isHidden: true },
      { id: 4, inputs: { deadlines: [1, 1, 1], profits: [1, 2, 3] }, expectedOutput: [1, 3], isHidden: true },
      { id: 5, inputs: { deadlines: [3, 3, 3], profits: [5, 5, 5] }, expectedOutput: [3, 15], isHidden: true },
      { id: 6, inputs: { deadlines: [2, 2, 2, 2], profits: [1, 2, 3, 4] }, expectedOutput: [2, 7], isHidden: true },
      { id: 7, inputs: { deadlines: [1, 2, 3, 4], profits: [1, 1, 1, 1] }, expectedOutput: [4, 4], isHidden: true },
    ],
    learn: {
      intuition:
        "Sort by profit descending and place each job in the LATEST free slot at or before its deadline. Taking a late slot keeps the early ones free for jobs with tight deadlines, which is the whole trick.",
      approach: [
        "Sort the jobs by profit descending.",
        "Keep a boolean array of slots up to the largest deadline.",
        "For each job, scan backwards from its deadline for a free slot; take the first one found and add the profit.",
      ],
      bruteForce: { idea: "Try every ordering of jobs.", time: "O(n!)", space: "O(n)" },
      optimal: { idea: "Profit-descending with latest-free-slot placement; a disjoint-set makes the scan near O(1).", time: "O(n log n + n × maxDeadline) naive, O(n log n) with DSU", space: "O(maxDeadline)" },
      pitfalls: [
        "Placing a job in the EARLIEST free slot blocks tight-deadline jobs later and loses profit.",
        "Sorting by deadline rather than profit is the other common wrong answer.",
        "Slots are 1-indexed by deadline, so size the array accordingly.",
      ],
      javaToolkit: ["Sorting by a secondary key", "Boolean slot array scanned backwards", "Disjoint-set for the fast version"],
    },
  },

  candy: {
    slug: "candy",
    title: "Candy",
    description:
      "Children stand in a line, each with a rating. Every child gets at least one candy, and a child with a strictly higher rating than a neighbour must get more candies than that neighbour. Return the fewest candies needed.",
    constraints: ["1 ≤ ratings.length ≤ 2 × 10^4", "0 ≤ ratings[i] ≤ 2 × 10^4"],
    className: "Solution",
    methodName: "candy",
    parameters: [{ name: "ratings", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int candy(int[] ratings) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { ratings: [1, 0, 2] }, expectedOutput: 5, explanation: "2, 1, 2 candies." },
      { id: 2, inputs: { ratings: [1, 2, 2] }, expectedOutput: 4, explanation: "1, 2, 1 — equal ratings impose no constraint on each other." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { ratings: [1] }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { ratings: [1, 2, 3, 4, 5] }, expectedOutput: 15, isHidden: true },
      { id: 5, inputs: { ratings: [5, 4, 3, 2, 1] }, expectedOutput: 15, isHidden: true },
      { id: 6, inputs: { ratings: [2, 2, 2, 2] }, expectedOutput: 4, isHidden: true },
      { id: 7, inputs: { ratings: [1, 3, 2, 2, 1] }, expectedOutput: 7, isHidden: true },
    ],
    learn: {
      intuition:
        "Each child faces two constraints, one from the left neighbour and one from the right, and they cannot both be satisfied in a single pass. Handle them separately — one sweep each way — then take the maximum per child, which satisfies both at once.",
      approach: [
        "Left to right: if a rating exceeds its left neighbour, give one more than that neighbour, else give 1.",
        "Right to left: if a rating exceeds its right neighbour, its candy must exceed that neighbour's; take the maximum with what it already has.",
        "Sum the results.",
      ],
      bruteForce: { idea: "Start everyone at 1 and repeatedly patch violations until stable.", time: "O(n²)", space: "O(n)" },
      optimal: { idea: "Two sweeps, then the per-child maximum.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "The second sweep must take a MAXIMUM, not overwrite — overwriting destroys the left constraint.",
        "Equal ratings impose nothing: [1,2,2] is 1+2+1 = 4, not 6.",
        "A single left-to-right pass handles descending runs incorrectly, which case 5 exposes.",
      ],
      javaToolkit: ["Two-directional sweeps", "Math.max to combine constraints", "Separating coupled constraints"],
    },
  },

  "shortest-job-first": {
    slug: "shortest-job-first",
    title: "Shortest Job First Scheduling",
    description:
      "All processes arrive at time 0 with the given burst times. Under non-preemptive shortest-job-first scheduling, return the average waiting time truncated to an integer — the sum of waiting times divided by the number of processes, using integer division.",
    constraints: ["1 ≤ n ≤ 10^5", "1 ≤ burst[i] ≤ 10^4"],
    className: "Solution",
    methodName: "averageWaitingTime",
    parameters: [{ name: "burst", type: "int[]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int averageWaitingTime(int[] burst) {
        // Integer division at the end.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { burst: [4, 3, 7, 1, 2] }, expectedOutput: 4, explanation: "Run 1, 2, 3, 4, 7; waits are 0, 1, 3, 6, 10, summing to 20 over 5 processes." },
      { id: 2, inputs: { burst: [1] }, expectedOutput: 0 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { burst: [5, 5] }, expectedOutput: 2, isHidden: true },
      { id: 4, inputs: { burst: [1, 2, 3, 4] }, expectedOutput: 2, isHidden: true },
      { id: 5, inputs: { burst: [10, 1, 1 ] }, expectedOutput: 1, isHidden: true },
      { id: 6, inputs: { burst: [2, 2, 2, 2] }, expectedOutput: 3, isHidden: true },
      { id: 7, inputs: { burst: [100, 1] }, expectedOutput: 0, isHidden: true },
    ],
    learn: {
      intuition:
        "A process's burst time is added to the wait of everyone still queued behind it, so a long job early costs far more than a long job late. Running the shortest first therefore minimises the total wait — provably optimal, unlike most scheduling heuristics.",
      approach: [
        "Sort the burst times ascending.",
        "Walk them keeping a running clock; each process waits for the clock's current value.",
        "Sum the waits and divide by n using integer division.",
      ],
      bruteForce: { idea: "Try every execution order.", time: "O(n!)", space: "O(n)" },
      optimal: { idea: "Sort ascending and accumulate.", time: "O(n log n)", space: "O(1)" },
      pitfalls: [
        "The last process's burst never contributes to anyone's wait, so it must not be added to the clock after it runs — or add it and simply not count it.",
        "The total wait can exceed int at the upper constraint; accumulate in long before dividing.",
        "This is truncating division, so [100,1] gives 0 rather than 0.5.",
      ],
      javaToolkit: ["Arrays.sort", "Running clock accumulation", "long before integer division"],
    },
  },

  "lru-page-replacement": {
    slug: "lru-page-replacement",
    title: "LRU Page Replacement",
    description:
      "Process the page references in order against a memory holding at most `frames` pages. A reference to a page already in memory is a hit; otherwise it is a fault, and if memory is full the LEAST RECENTLY USED page is evicted. Return the number of page faults.",
    constraints: ["1 ≤ pages.length ≤ 10^5", "1 ≤ frames ≤ 100", "0 ≤ pages[i] ≤ 10^6"],
    className: "Solution",
    methodName: "pageFaults",
    parameters: [
      { name: "pages", type: "int[]" },
      { name: "frames", type: "int" },
    ],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int pageFaults(int[] pages, int frames) {
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { pages: [7, 0, 1, 2, 0, 3, 0, 4], frames: 3 }, expectedOutput: 6, explanation: "Two of the eight references are hits." },
      { id: 2, inputs: { pages: [1, 2, 3], frames: 3 }, expectedOutput: 3, explanation: "Every page is new; nothing is evicted." },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { pages: [1, 1, 1], frames: 1 }, expectedOutput: 1, isHidden: true },
      { id: 4, inputs: { pages: [1, 2, 1, 2], frames: 1 }, expectedOutput: 4, isHidden: true },
      { id: 5, inputs: { pages: [1, 2, 3, 1, 2, 3], frames: 2 }, expectedOutput: 6, isHidden: true },
      { id: 6, inputs: { pages: [5], frames: 4 }, expectedOutput: 1, isHidden: true },
      { id: 7, inputs: { pages: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], frames: 4 }, expectedOutput: 8, isHidden: true },
    ],
    learn: {
      intuition:
        "The same structure as the LRU cache from Step 9, counting rather than returning. A LinkedHashSet in access order does the bookkeeping: re-inserting a page moves it to the most-recent end, and the first element is always the eviction candidate.",
      approach: [
        "Keep the resident pages in a set that preserves access order.",
        "On a hit, refresh the page's position and count nothing.",
        "On a fault, increment the counter; if memory is full, remove the oldest, then insert.",
      ],
      bruteForce: { idea: "Scan for the least recently used page on every fault.", time: "O(n × frames)", space: "O(frames)" },
      optimal: { idea: "Access-ordered set or a HashMap plus a doubly linked list.", time: "O(n)", space: "O(frames)" },
      pitfalls: [
        "A HIT must still refresh recency, or the eviction order goes wrong — case 7 depends on it.",
        "The first `frames` distinct pages are all faults even though nothing is evicted.",
        "Belady's optimal algorithm evicts the page used furthest in the FUTURE and does better, but needs the whole reference string up front; LRU only looks backwards.",
      ],
      javaToolkit: ["LinkedHashSet with access order", "Refreshing on a hit", "LRU versus Belady's optimal"],
    },
  },

  "insert-interval": {
    slug: "insert-interval",
    title: "Insert Interval",
    description:
      "Given non-overlapping intervals sorted by start, insert a new interval and merge where necessary. Return the result sorted by start.",
    constraints: ["0 ≤ intervals.length ≤ 10^4", "intervals[i] = [start, end] with start ≤ end", "-10^9 ≤ values ≤ 10^9"],
    className: "Solution",
    methodName: "insert",
    parameters: [
      { name: "intervals", type: "int[][]" },
      { name: "newInterval", type: "int[]" },
    ],
    returnType: "int[][]",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        return new int[0][0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { intervals: [[1, 3], [6, 9]], newInterval: [2, 5] }, expectedOutput: [[1, 5], [6, 9]] },
      { id: 2, inputs: { intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval: [4, 8] }, expectedOutput: [[1, 2], [3, 10], [12, 16]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { intervals: [], newInterval: [5, 7] }, expectedOutput: [[5, 7]], isHidden: true },
      { id: 4, inputs: { intervals: [[1, 5]], newInterval: [2, 3] }, expectedOutput: [[1, 5]], isHidden: true },
      { id: 5, inputs: { intervals: [[1, 5]], newInterval: [6, 8] }, expectedOutput: [[1, 5], [6, 8]], isHidden: true },
      { id: 6, inputs: { intervals: [[3, 5]], newInterval: [1, 2] }, expectedOutput: [[1, 2], [3, 5]], isHidden: true },
      { id: 7, inputs: { intervals: [[1, 2], [5, 6]], newInterval: [2, 5] }, expectedOutput: [[1, 6]], isHidden: true },
    ],
    learn: {
      intuition:
        "The input is already sorted, so the answer has three parts: everything strictly before the new interval, one merged block, and everything strictly after. No sorting is needed at all.",
      approach: [
        "Copy intervals ending before the new one starts.",
        "While an interval starts at or before the new one's end, absorb it by widening the new interval's bounds.",
        "Append the merged interval, then copy the remainder.",
      ],
      bruteForce: { idea: "Append the new interval, sort, and run a full merge.", time: "O(n log n)", space: "O(n)" },
      optimal: { idea: "Three-phase single pass.", time: "O(n)", space: "O(n)" },
      pitfalls: [
        "Touching intervals merge here: [1,2] and [2,5] become [1,5], as case 7 shows.",
        "An empty input still returns the new interval on its own.",
        "The new interval may sit entirely before everything, so the first phase can copy nothing.",
      ],
      javaToolkit: ["Three-phase scan", "Merging by widening bounds", "List<int[]> then toArray"],
    },
  },

  "merge-intervals": {
    slug: "merge-intervals",
    title: "Merge Intervals",
    description:
      "Merge every set of overlapping intervals and return the result sorted by start. Intervals that merely touch — one ending where the next begins — count as overlapping.",
    constraints: ["1 ≤ intervals.length ≤ 10^4", "intervals[i] = [start, end] with start ≤ end", "-10^9 ≤ values ≤ 10^9"],
    className: "Solution",
    methodName: "merge",
    parameters: [{ name: "intervals", type: "int[][]" }],
    returnType: "int[][]",
    comparison: { type: "deep_array", orderMatters: true },
    starterCode: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        // Touching intervals merge.
        return new int[0][0];
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] }, expectedOutput: [[1, 6], [8, 10], [15, 18]] },
      { id: 2, inputs: { intervals: [[1, 4], [4, 5]] }, expectedOutput: [[1, 5]] },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { intervals: [[1, 2]] }, expectedOutput: [[1, 2]], isHidden: true },
      { id: 4, inputs: { intervals: [[5, 6], [1, 2]] }, expectedOutput: [[1, 2], [5, 6]], isHidden: true },
      { id: 5, inputs: { intervals: [[1, 10], [2, 3], [4, 5]] }, expectedOutput: [[1, 10]], isHidden: true },
      { id: 6, inputs: { intervals: [[1, 1], [2, 2]] }, expectedOutput: [[1, 1], [2, 2]], isHidden: true },
      { id: 7, inputs: { intervals: [[2, 3], [1, 4]] }, expectedOutput: [[1, 4]], isHidden: true },
    ],
    learn: {
      intuition:
        "Sorting by start makes overlap a purely local question: once ordered, an interval can only overlap the block currently being built, never anything earlier. One pass then suffices.",
      approach: [
        "Sort by start ascending.",
        "Hold a current block; for each interval, extend the block's end if it starts within it, otherwise emit the block and start a new one.",
        "Emit the final block.",
      ],
      bruteForce: { idea: "Repeatedly merge any overlapping pair until stable.", time: "O(n³)", space: "O(n)" },
      optimal: { idea: "Sort by start, then a single merging pass.", time: "O(n log n)", space: "O(n)" },
      pitfalls: [
        "Extending must take max(end, current end) — a fully contained interval like [2,3] inside [1,10] must not shrink the block.",
        "Touching counts as overlapping here, so [1,4] and [4,5] become [1,5]. Some variants say otherwise; the description settles it.",
        "The last block is easy to forget after the loop.",
      ],
      javaToolkit: ["Arrays.sort with a comparator on int[]", "Math.max when extending", "Emit-on-gap structure"],
    },
  },

  "non-overlapping-intervals": {
    slug: "non-overlapping-intervals",
    title: "Non-Overlapping Intervals",
    description:
      "Return the minimum number of intervals to remove so the rest do not overlap. Intervals that only touch at an endpoint are NOT overlapping.",
    constraints: ["1 ≤ intervals.length ≤ 10^5", "intervals[i] = [start, end] with start < end", "-5 × 10^4 ≤ values ≤ 5 × 10^4"],
    className: "Solution",
    methodName: "eraseOverlapIntervals",
    parameters: [{ name: "intervals", type: "int[][]" }],
    returnType: "int",
    comparison: { type: "scalar" },
    starterCode: `import java.util.*;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        // Touching at an endpoint is not an overlap.
        return 0;
    }
}`,
    sampleTestCases: [
      { id: 1, inputs: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] }, expectedOutput: 1, explanation: "Removing [1,3] leaves three intervals that only touch." },
      { id: 2, inputs: { intervals: [[1, 2], [1, 2], [1, 2]] }, expectedOutput: 2 },
    ],
    hiddenTestCases: [
      { id: 3, inputs: { intervals: [[1, 2]] }, expectedOutput: 0, isHidden: true },
      { id: 4, inputs: { intervals: [[1, 2], [2, 3]] }, expectedOutput: 0, isHidden: true },
      { id: 5, inputs: { intervals: [[1, 100], [11, 22], [1, 11], [2, 12]] }, expectedOutput: 2, isHidden: true },
      { id: 6, inputs: { intervals: [[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]] }, expectedOutput: 2, isHidden: true },
      { id: 7, inputs: { intervals: [[-1, 1], [0, 2], [1, 3]] }, expectedOutput: 1, isHidden: true },
    ],
    learn: {
      intuition:
        "Removing the fewest is keeping the most, which is activity selection again: sort by END time and greedily keep every interval that starts at or after the last kept one ends. The answer is the total minus what you kept.",
      approach: [
        "Sort by end ascending.",
        "Track the end of the last kept interval, starting at negative infinity.",
        "Keep an interval when its start is at or after that; count the rest as removals.",
      ],
      bruteForce: { idea: "Try every subset and check for overlaps.", time: "O(2^n × n)", space: "O(n)" },
      optimal: { idea: "Sort by end, greedily keep — activity selection.", time: "O(n log n)", space: "O(1)" },
      pitfalls: [
        "Sorting by START is wrong: [0,2],[1,3],[2,4],[3,5],[4,6] then keeps too few. Earliest END is what is provably optimal.",
        "Touching is allowed, so the comparison is ≥, not >.",
        "Counting removals directly is easy to get off by one; count what you keep and subtract.",
      ],
      javaToolkit: ["Sort by end time", "Activity selection", "Counting kept, not removed"],
    },
  },
}
