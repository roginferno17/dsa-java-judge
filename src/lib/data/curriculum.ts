// ============================================================
// STRIVER A2Z DSA CURRICULUM DATA
// Based on: https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z
// Total Problems: 474 (152 Easy, 186 Medium, 136 Hard)
// ============================================================

export interface TopicData {
  title: string
  slug: string
  problems: ProblemData[]
}

export interface ProblemData {
  number: number
  title: string
  slug: string
  difficulty: "EASY" | "MEDIUM" | "HARD"
  description?: string
  examples?: { input: string; output: string; explanation?: string }[]
  constraints?: { text: string }[]
}

export interface StepData {
  stepNumber: number
  title: string
  slug: string
  description: string
  topics: TopicData[]
}

export const curriculum: StepData[] = [
  // ============================================================
  // STEP 1: LEARN THE BASICS
  // ============================================================
  {
    stepNumber: 1,
    title: "Learn the Basics",
    slug: "learn-the-basics",
    description: "Master the fundamental concepts of programming including data types, control flow, arrays, recursion, and hashing.",
    topics: [
      {
        title: "User Input / Output",
        slug: "user-input-output",
        problems: [
          { number: 1, title: "User Input / Output", slug: "user-input-output", difficulty: "EASY" },
        ],
      },
      {
        title: "Data Types",
        slug: "data-types",
        problems: [
          { number: 2, title: "Data Types", slug: "data-types", difficulty: "EASY" },
        ],
      },
      {
        title: "If Else Statements",
        slug: "if-else-statements",
        problems: [
          { number: 3, title: "If Else statements", slug: "if-else-statements", difficulty: "EASY" },
        ],
      },
      {
        title: "Switch Statement",
        slug: "switch-statement",
        problems: [
          { number: 4, title: "Switch Statement", slug: "switch-statement", difficulty: "EASY" },
        ],
      },
      {
        title: "Arrays and Strings Basics",
        slug: "arrays-strings-basics",
        problems: [
          { number: 5, title: "What are arrays, strings?", slug: "arrays-strings-basics", difficulty: "EASY" },
        ],
      },
      {
        title: "For Loops",
        slug: "for-loops",
        problems: [
          { number: 6, title: "For loops", slug: "for-loops", difficulty: "EASY" },
        ],
      },
      {
        title: "While Loops",
        slug: "while-loops",
        problems: [
          { number: 7, title: "While loops", slug: "while-loops", difficulty: "EASY" },
        ],
      },
      {
        title: "Functions",
        slug: "functions",
        problems: [
          { number: 8, title: "Functions (Pass by Reference and Value)", slug: "functions", difficulty: "EASY" },
        ],
      },
      {
        title: "Time Complexity",
        slug: "time-complexity",
        problems: [
          { number: 9, title: "Time Complexity", slug: "time-complexity", difficulty: "EASY" },
        ],
      },
      {
        title: "Patterns",
        slug: "patterns",
        problems: [
          { number: 10, title: "Patterns", slug: "patterns", difficulty: "EASY" },
        ],
      },
      {
        title: "Java Collections",
        slug: "java-collections",
        problems: [
          { number: 11, title: "Java Collections", slug: "java-collections", difficulty: "EASY" },
        ],
      },
      {
        title: "Basic Math Problems",
        slug: "basic-math-problems",
        problems: [
          { number: 12, title: "Count Digits", slug: "count-digits", difficulty: "EASY" },
          { number: 13, title: "Reverse a Number", slug: "reverse-a-number", difficulty: "EASY" },
          { number: 14, title: "Check Palindrome", slug: "check-palindrome", difficulty: "EASY" },
          { number: 15, title: "GCD Or HCF", slug: "gcd-or-hcf", difficulty: "EASY" },
          { number: 16, title: "Armstrong Numbers", slug: "armstrong-numbers", difficulty: "EASY" },
          { number: 17, title: "Print all Divisors", slug: "print-all-divisors", difficulty: "EASY" },
          { number: 18, title: "Check for Prime", slug: "check-for-prime", difficulty: "EASY" },
        ],
      },
      {
        title: "Recursion Basics",
        slug: "recursion-basics",
        problems: [
          { number: 19, title: "Understand recursion by print something N times", slug: "recursion-print-n-times", difficulty: "EASY" },
          { number: 20, title: "Print name N times using recursion", slug: "print-name-n-times", difficulty: "EASY" },
          { number: 21, title: "Print 1 to N using recursion", slug: "print-1-to-n", difficulty: "EASY" },
          { number: 22, title: "Print N to 1 using recursion", slug: "print-n-to-1", difficulty: "EASY" },
          { number: 23, title: "Sum of first N numbers", slug: "sum-first-n-numbers", difficulty: "EASY" },
          { number: 24, title: "Factorial of N numbers", slug: "factorial-of-n", difficulty: "EASY" },
          { number: 25, title: "Reverse an array", slug: "reverse-array-recursion", difficulty: "EASY" },
          { number: 26, title: "Check if a string is palindrome or not", slug: "string-palindrome-recursion", difficulty: "MEDIUM" },
          { number: 27, title: "Fibonacci Number", slug: "fibonacci-number", difficulty: "EASY" },
        ],
      },
      {
        title: "Hashing",
        slug: "hashing",
        problems: [
          { number: 28, title: "Hashing Theory", slug: "hashing-theory", difficulty: "MEDIUM" },
          { number: 29, title: "Counting frequencies of array elements", slug: "count-frequencies", difficulty: "EASY" },
          { number: 30, title: "Find the highest/lowest frequency element", slug: "highest-lowest-frequency", difficulty: "EASY" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 2: LEARN IMPORTANT SORTING TECHNIQUES
  // ============================================================
  {
    stepNumber: 2,
    title: "Learn Important Sorting Techniques",
    slug: "sorting-techniques",
    description: "Master essential sorting algorithms from basic to advanced.",
    topics: [
      {
        title: "Sorting Algorithms",
        slug: "sorting-algorithms",
        problems: [
          { number: 31, title: "Selection Sort", slug: "selection-sort", difficulty: "EASY" },
          { number: 32, title: "Bubble Sort", slug: "bubble-sort", difficulty: "EASY" },
          { number: 33, title: "Insertion Sort", slug: "insertion-sort", difficulty: "EASY" },
          { number: 34, title: "Merge Sort", slug: "merge-sort", difficulty: "MEDIUM" },
          { number: 35, title: "Recursive Bubble Sort", slug: "recursive-bubble-sort", difficulty: "EASY" },
          { number: 36, title: "Recursive Insertion Sort", slug: "recursive-insertion-sort", difficulty: "EASY" },
          { number: 37, title: "Quick Sort", slug: "quick-sort", difficulty: "EASY" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 3: ARRAYS [EASY -> MEDIUM -> HARD]
  // ============================================================
  {
    stepNumber: 3,
    title: "Arrays",
    slug: "arrays",
    description: "Master array manipulation from easy to hard problems including matrix operations.",
    topics: [
      {
        title: "Easy Array Problems",
        slug: "easy-array-problems",
        problems: [
          { number: 38, title: "Largest Element in an Array", slug: "largest-element-array", difficulty: "EASY" },
          { number: 39, title: "Second Largest Element in an Array without sorting", slug: "second-largest-element", difficulty: "EASY" },
          { number: 40, title: "Check if the array is sorted", slug: "check-sorted-array", difficulty: "EASY" },
          { number: 41, title: "Remove duplicates from Sorted array", slug: "remove-duplicates-sorted", difficulty: "EASY" },
          { number: 42, title: "Left Rotate an array by one place", slug: "left-rotate-one", difficulty: "EASY" },
          { number: 43, title: "Left rotate an array by D places", slug: "left-rotate-d", difficulty: "EASY" },
          { number: 44, title: "Move Zeros to end", slug: "move-zeros-end", difficulty: "EASY" },
          { number: 45, title: "Linear Search", slug: "linear-search", difficulty: "EASY" },
          { number: 46, title: "Find the Union", slug: "find-union", difficulty: "MEDIUM" },
          { number: 47, title: "Find missing number in an array", slug: "find-missing-number", difficulty: "EASY" },
          { number: 48, title: "Maximum Consecutive Ones", slug: "max-consecutive-ones", difficulty: "EASY" },
          { number: 49, title: "Find the number that appears once, and other numbers twice", slug: "find-unique-number", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Medium Array Problems",
        slug: "medium-array-problems",
        problems: [
          { number: 50, title: "Longest subarray with given sum K(positives)", slug: "longest-subarray-sum-k", difficulty: "MEDIUM" },
          { number: 51, title: "Longest subarray with sum K (Positives + Negatives)", slug: "longest-subarray-sum-k-neg", difficulty: "MEDIUM" },
          { number: 52, title: "2Sum Problem", slug: "two-sum", difficulty: "MEDIUM" },
          { number: 53, title: "Sort an array of 0's 1's and 2's", slug: "sort-012", difficulty: "MEDIUM" },
          { number: 54, title: "Majority Element (>n/2 times)", slug: "majority-element", difficulty: "EASY" },
          { number: 55, title: "Kadane's Algorithm, maximum subarray sum", slug: "kadanes-algorithm", difficulty: "EASY" },
          { number: 56, title: "Subarray with maximum subarray sum (extended version)", slug: "max-subarray-extended", difficulty: "MEDIUM" },
          { number: 57, title: "Stock Buy and Sell", slug: "stock-buy-sell", difficulty: "EASY" },
          { number: 58, title: "Rearrange the array in alternating positive and negative items", slug: "rearrange-alternating", difficulty: "MEDIUM" },
          { number: 59, title: "Next Permutation", slug: "next-permutation", difficulty: "MEDIUM" },
          { number: 60, title: "Leaders in an Array problem", slug: "leaders-in-array", difficulty: "EASY" },
          { number: 61, title: "Longest Consecutive Sequence in an Array", slug: "longest-consecutive-sequence", difficulty: "MEDIUM" },
          { number: 62, title: "Set Matrix Zeros", slug: "set-matrix-zeros", difficulty: "MEDIUM" },
          { number: 63, title: "Rotate Matrix by 90 degrees", slug: "rotate-matrix-90", difficulty: "MEDIUM" },
          { number: 64, title: "Print the matrix in spiral manner", slug: "spiral-matrix", difficulty: "MEDIUM" },
          { number: 65, title: "Count subarrays with given sum", slug: "count-subarrays-sum", difficulty: "EASY" },
          { number: 66, title: "Pascal's Triangle", slug: "pascals-triangle", difficulty: "MEDIUM" },
          { number: 67, title: "Majority Element (n/3 times)", slug: "majority-element-n3", difficulty: "MEDIUM" },
          { number: 68, title: "3-Sum Problem", slug: "three-sum", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Hard Array Problems",
        slug: "hard-array-problems",
        problems: [
          { number: 69, title: "4-Sum Problem", slug: "four-sum", difficulty: "HARD" },
          { number: 70, title: "Largest Subarray with 0 Sum", slug: "largest-subarray-0-sum", difficulty: "MEDIUM" },
          { number: 71, title: "Count number of subarrays with given xor K", slug: "count-subarrays-xor-k", difficulty: "HARD" },
          { number: 72, title: "Merge Overlapping Subintervals", slug: "merge-overlapping-intervals", difficulty: "MEDIUM" },
          { number: 73, title: "Merge two sorted arrays without extra space", slug: "merge-sorted-arrays", difficulty: "MEDIUM" },
          { number: 74, title: "Find the repeating and missing number", slug: "repeating-missing", difficulty: "HARD" },
          { number: 75, title: "Count Inversions", slug: "count-inversions", difficulty: "HARD" },
          { number: 76, title: "Reverse Pairs", slug: "reverse-pairs", difficulty: "HARD" },
          { number: 77, title: "Maximum Product Subarray", slug: "max-product-subarray", difficulty: "EASY" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 4: BINARY SEARCH [1D, 2D ARRAYS, SEARCH SPACE]
  // ============================================================
  {
    stepNumber: 4,
    title: "Binary Search",
    slug: "binary-search",
    description: "Master binary search on 1D arrays, 2D arrays, and search space problems.",
    topics: [
      {
        title: "Binary Search on 1D Arrays",
        slug: "binary-search-1d",
        problems: [
          { number: 78, title: "Binary Search to find X in sorted array", slug: "binary-search-x", difficulty: "EASY" },
          { number: 79, title: "Implement Lower Bound", slug: "lower-bound", difficulty: "EASY" },
          { number: 80, title: "Implement Upper Bound", slug: "upper-bound", difficulty: "EASY" },
          { number: 81, title: "Search Insert Position", slug: "search-insert-position", difficulty: "EASY" },
          { number: 82, title: "Floor/Ceil in Sorted Array", slug: "floor-ceil-sorted", difficulty: "MEDIUM" },
          { number: 83, title: "Find first or last occurrence of a given number in a sorted arr", slug: "first-last-occurrence", difficulty: "EASY" },
          { number: 84, title: "Count occurrences of a number in a sorted array with duplicates", slug: "count-occurrences", difficulty: "EASY" },
          { number: 85, title: "Search in Rotated Sorted Array I", slug: "search-rotated-1", difficulty: "MEDIUM" },
          { number: 86, title: "Search in Rotated Sorted Array II", slug: "search-rotated-2", difficulty: "MEDIUM" },
          { number: 87, title: "Find minimum in Rotated Sorted Array", slug: "min-rotated-sorted", difficulty: "MEDIUM" },
          { number: 88, title: "Find out how many times has an array been rotated", slug: "count-rotations", difficulty: "EASY" },
          { number: 89, title: "Single element in a Sorted Array", slug: "single-element-sorted", difficulty: "EASY" },
          { number: 90, title: "Find peak element", slug: "find-peak-element", difficulty: "HARD" },
        ],
      },
      {
        title: "Binary Search on Search Space",
        slug: "binary-search-space",
        problems: [
          { number: 91, title: "Find square root of a number in log n", slug: "square-root", difficulty: "MEDIUM" },
          { number: 92, title: "Find the Nth root of a number using binary search", slug: "nth-root", difficulty: "MEDIUM" },
          { number: 93, title: "Koko Eating Bananas", slug: "koko-eating-bananas", difficulty: "HARD" },
          { number: 94, title: "Minimum days to make M bouquets", slug: "min-days-bouquets", difficulty: "HARD" },
          { number: 95, title: "Find the smallest Divisor", slug: "smallest-divisor", difficulty: "EASY" },
          { number: 96, title: "Capacity to Ship Packages within D Days", slug: "ship-packages", difficulty: "HARD" },
          { number: 97, title: "Kth Missing Positive Number", slug: "kth-missing-positive", difficulty: "EASY" },
          { number: 98, title: "Aggressive Cows", slug: "aggressive-cows", difficulty: "HARD" },
          { number: 99, title: "Book Allocation Problem", slug: "book-allocation", difficulty: "HARD" },
          { number: 100, title: "Split array - Largest Sum", slug: "split-array-largest-sum", difficulty: "HARD" },
          { number: 101, title: "Painter's partition", slug: "painters-partition", difficulty: "HARD" },
          { number: 102, title: "Minimize Max Distance to Gas Station", slug: "minimize-max-distance", difficulty: "HARD" },
          { number: 103, title: "Median of 2 sorted arrays", slug: "median-two-sorted", difficulty: "HARD" },
          { number: 104, title: "Kth element of 2 sorted arrays", slug: "kth-element-two-sorted", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Binary Search on 2D Arrays",
        slug: "binary-search-2d",
        problems: [
          { number: 105, title: "Find the row with maximum number of 1's", slug: "row-max-ones", difficulty: "EASY" },
          { number: 106, title: "Search in a 2D matrix", slug: "search-2d-matrix", difficulty: "MEDIUM" },
          { number: 107, title: "Search in a row and column wise sorted matrix", slug: "search-row-col-sorted", difficulty: "MEDIUM" },
          { number: 108, title: "Find Peak Element (2D Matrix)", slug: "find-peak-2d", difficulty: "HARD" },
          { number: 109, title: "Matrix Median", slug: "matrix-median", difficulty: "HARD" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 5: STRINGS [BASIC AND MEDIUM]
  // ============================================================
  {
    stepNumber: 5,
    title: "Strings",
    slug: "strings",
    description: "Master string manipulation from basic to medium difficulty problems.",
    topics: [
      {
        title: "String Problems",
        slug: "string-problems",
        problems: [
          { number: 110, title: "Remove outermost Paranthesis", slug: "remove-outer-parenthesis", difficulty: "EASY" },
          { number: 111, title: "Reverse words in a given string / Palindrome Check", slug: "reverse-words-palindrome", difficulty: "EASY" },
          { number: 112, title: "Largest odd number in a string", slug: "largest-odd-number", difficulty: "EASY" },
          { number: 113, title: "Longest Common Prefix", slug: "longest-common-prefix", difficulty: "EASY" },
          { number: 114, title: "Isomorphic String", slug: "isomorphic-string", difficulty: "EASY" },
          { number: 115, title: "check whether one string is a rotation of another", slug: "string-rotation", difficulty: "MEDIUM" },
          { number: 116, title: "Check if two strings are anagram of each other", slug: "anagram-check", difficulty: "MEDIUM" },
          { number: 117, title: "Sort Characters by frequency", slug: "sort-by-frequency", difficulty: "EASY" },
          { number: 118, title: "Maximum Nesting Depth of Paranthesis", slug: "max-nesting-depth", difficulty: "EASY" },
          { number: 119, title: "Roman Number to Integer and vice versa", slug: "roman-integer", difficulty: "EASY" },
          { number: 120, title: "Implement Atoi", slug: "implement-atoi", difficulty: "MEDIUM" },
          { number: 121, title: "Count Number of Substrings", slug: "count-substrings", difficulty: "MEDIUM" },
          { number: 122, title: "Longest Palindromic Substring [Do it without DP]", slug: "longest-palindrome-substring", difficulty: "HARD" },
          { number: 123, title: "Sum of Beauty of all substring", slug: "beauty-all-substrings", difficulty: "MEDIUM" },
          { number: 124, title: "Reverse Every Word in A String", slug: "reverse-every-word", difficulty: "EASY" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 6: LINKEDLIST [SINGLE LL, DOUBLE LL, MEDIUM, HARD]
  // ============================================================
  {
    stepNumber: 6,
    title: "LinkedList",
    slug: "linkedlist",
    description: "Master linked list operations from basic traversal to complex manipulations.",
    topics: [
      {
        title: "Singly Linked List Basics",
        slug: "singly-linked-list-basics",
        problems: [
          { number: 125, title: "Introduction to LinkedList, learn about struct, and node", slug: "intro-linked-list", difficulty: "EASY" },
          { number: 126, title: "Inserting a node in LinkedList", slug: "insert-node-ll", difficulty: "EASY" },
          { number: 127, title: "Deleting a node in LinkedList", slug: "delete-node-ll", difficulty: "MEDIUM" },
          { number: 128, title: "Find the length of the linkedlist [learn traversal]", slug: "length-linked-list", difficulty: "EASY" },
          { number: 129, title: "Search an element in the LL", slug: "search-element-ll", difficulty: "EASY" },
        ],
      },
      {
        title: "Doubly Linked List",
        slug: "doubly-linked-list",
        problems: [
          { number: 130, title: "Introduction to DLL, learn about struct, and node", slug: "intro-dll", difficulty: "EASY" },
          { number: 131, title: "Insert a node in DLL", slug: "insert-node-dll", difficulty: "EASY" },
          { number: 132, title: "Delete a node in DLL", slug: "delete-node-dll", difficulty: "MEDIUM" },
          { number: 133, title: "Reverse a DLL", slug: "reverse-dll", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Medium LinkedList Problems",
        slug: "medium-linked-list",
        problems: [
          { number: 134, title: "Middle of a LinkedList [TortoiseHare Method]", slug: "middle-linked-list", difficulty: "EASY" },
          { number: 135, title: "Reverse a LinkedList [Iterative]", slug: "reverse-ll-iterative", difficulty: "EASY" },
          { number: 136, title: "Reverse a LL [Recursive]", slug: "reverse-ll-recursive", difficulty: "EASY" },
          { number: 137, title: "Detect a loop in LL", slug: "detect-loop-ll", difficulty: "MEDIUM" },
          { number: 138, title: "Find the starting point in LL", slug: "starting-point-loop", difficulty: "MEDIUM" },
          { number: 139, title: "Length of Loop in LL", slug: "length-loop-ll", difficulty: "EASY" },
          { number: 140, title: "Check if LL is palindrome or not", slug: "palindrome-ll", difficulty: "MEDIUM" },
          { number: 141, title: "Segregate odd and even nodes in LL", slug: "segregate-odd-even", difficulty: "MEDIUM" },
          { number: 142, title: "Remove Nth node from the back of the LL", slug: "remove-nth-back", difficulty: "MEDIUM" },
          { number: 143, title: "Delete the middle node of LL", slug: "delete-middle-node", difficulty: "MEDIUM" },
          { number: 144, title: "Sort LL", slug: "sort-linked-list", difficulty: "MEDIUM" },
          { number: 145, title: "Sort a LL of 0's 1's and 2's by changing links", slug: "sort-012-ll", difficulty: "MEDIUM" },
          { number: 146, title: "Find the intersection point of Y LL", slug: "intersection-y-ll", difficulty: "MEDIUM" },
          { number: 147, title: "Add 1 to a number represented by LL", slug: "add-one-ll", difficulty: "MEDIUM" },
          { number: 148, title: "Add 2 numbers in LL", slug: "add-two-numbers-ll", difficulty: "MEDIUM" },
          { number: 149, title: "Delete all occurrences of a key in DLL", slug: "delete-key-dll", difficulty: "MEDIUM" },
          { number: 150, title: "Find pairs with given sum in DLL", slug: "pairs-sum-dll", difficulty: "MEDIUM" },
          { number: 151, title: "Remove duplicates from sorted DLL", slug: "remove-duplicates-dll", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Hard LinkedList Problems",
        slug: "hard-linked-list",
        problems: [
          { number: 152, title: "Reverse LL in group of given size K", slug: "reverse-k-group", difficulty: "HARD" },
          { number: 153, title: "Rotate a LL", slug: "rotate-linked-list", difficulty: "MEDIUM" },
          { number: 154, title: "Flattening of LL", slug: "flatten-linked-list", difficulty: "HARD" },
          { number: 155, title: "Clone a Linked List with random and next pointer", slug: "clone-random-pointer", difficulty: "HARD" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 7: RECURSION [PATTERN WISE]
  // ============================================================
  {
    stepNumber: 7,
    title: "Recursion",
    slug: "recursion",
    description: "Master recursion patterns from basic to advanced backtracking problems.",
    topics: [
      {
        title: "Basic Recursion Problems",
        slug: "basic-recursion",
        problems: [
          { number: 156, title: "Recursive Implementation of atoi()", slug: "recursive-atoi", difficulty: "HARD" },
          { number: 157, title: "Pow(x, n)", slug: "pow-x-n", difficulty: "MEDIUM" },
          { number: 158, title: "Count Good numbers", slug: "count-good-numbers", difficulty: "EASY" },
          { number: 159, title: "Sort a stack using recursion", slug: "sort-stack-recursion", difficulty: "MEDIUM" },
          { number: 160, title: "Reverse a stack using recursion", slug: "reverse-stack-recursion", difficulty: "EASY" },
          { number: 161, title: "Generate all binary strings", slug: "generate-binary-strings", difficulty: "MEDIUM" },
          { number: 162, title: "Generate Paranthesis", slug: "generate-parenthesis", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Subsequence Patterns",
        slug: "subsequence-patterns",
        problems: [
          { number: 163, title: "Print all subsequences/Power Set", slug: "print-subsequences", difficulty: "MEDIUM" },
          { number: 164, title: "Learn All Patterns of Subsequences (Theory)", slug: "subsequence-patterns", difficulty: "MEDIUM" },
          { number: 165, title: "Count all subsequences with sum K", slug: "count-subsequences-sum-k", difficulty: "HARD" },
          { number: 166, title: "Check if there exists a subsequence with sum K", slug: "exists-subsequence-sum-k", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Combination and Subset Problems",
        slug: "combination-subset",
        problems: [
          { number: 167, title: "Combination Sum", slug: "combination-sum", difficulty: "MEDIUM" },
          { number: 168, title: "Combination Sum-II", slug: "combination-sum-2", difficulty: "MEDIUM" },
          { number: 169, title: "Subset Sum-I", slug: "subset-sum-1", difficulty: "MEDIUM" },
          { number: 170, title: "Subset Sum-II", slug: "subset-sum-2", difficulty: "MEDIUM" },
          { number: 171, title: "Combination Sum - III", slug: "combination-sum-3", difficulty: "HARD" },
          { number: 172, title: "Letter Combinations of a Phone number", slug: "letter-combinations-phone", difficulty: "MEDIUM" },
          { number: 173, title: "Palindrome Partitioning", slug: "palindrome-partitioning", difficulty: "MEDIUM" },
          { number: 174, title: "Word Search", slug: "word-search", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Hard Recursion / Backtracking",
        slug: "hard-recursion-backtracking",
        problems: [
          { number: 175, title: "N Queen", slug: "n-queen", difficulty: "HARD" },
          { number: 176, title: "Rat in a Maze", slug: "rat-in-maze", difficulty: "HARD" },
          { number: 177, title: "Word Break", slug: "word-break", difficulty: "MEDIUM" },
          { number: 178, title: "M Coloring Problem", slug: "m-coloring", difficulty: "HARD" },
          { number: 179, title: "Sudoko Solver", slug: "sudoku-solver", difficulty: "HARD" },
          { number: 180, title: "Expression Add Operators", slug: "expression-add-operators", difficulty: "HARD" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 8: BIT MANIPULATION [CONCEPTS & PROBLEMS]
  // ============================================================
  {
    stepNumber: 8,
    title: "Bit Manipulation",
    slug: "bit-manipulation",
    description: "Master bit manipulation concepts and solve related problems.",
    topics: [
      {
        title: "Bit Manipulation Concepts",
        slug: "bit-manipulation-concepts",
        problems: [
          { number: 181, title: "Introduction to Bit Manipulation [Theory]", slug: "intro-bit-manipulation", difficulty: "EASY" },
          { number: 182, title: "Check if the i-th bit is set or not", slug: "check-ith-bit", difficulty: "EASY" },
          { number: 183, title: "Check if a number is odd or not", slug: "check-odd-even", difficulty: "EASY" },
          { number: 184, title: "Check if a number is power of 2 or not", slug: "power-of-two", difficulty: "EASY" },
          { number: 185, title: "Count the number of set bits", slug: "count-set-bits", difficulty: "EASY" },
          { number: 186, title: "Set/Unset the rightmost unset bit", slug: "rightmost-unset-bit", difficulty: "EASY" },
          { number: 187, title: "Swap two numbers", slug: "swap-two-numbers", difficulty: "EASY" },
          { number: 188, title: "Divide two integers w/o using multiplication, division and mod", slug: "divide-without-ops", difficulty: "MEDIUM" },
          { number: 189, title: "Count number of bits to be flipped to convert A to B", slug: "count-bits-flip", difficulty: "MEDIUM" },
          { number: 190, title: "Find the number that appears odd number of times", slug: "odd-occurrence", difficulty: "EASY" },
        ],
      },
      {
        title: "Bit Manipulation Problems",
        slug: "bit-manipulation-problems",
        problems: [
          { number: 191, title: "Power Set", slug: "power-set-bit", difficulty: "MEDIUM" },
          { number: 192, title: "Find xor of numbers from L to R", slug: "xor-l-to-r", difficulty: "EASY" },
          { number: 193, title: "Find the two numbers appearing odd number of times", slug: "two-odd-occurrence", difficulty: "EASY" },
          { number: 194, title: "Print Prime Factors of a Number", slug: "prime-factors", difficulty: "EASY" },
          { number: 195, title: "All Divisors of a Number", slug: "all-divisors", difficulty: "EASY" },
          { number: 196, title: "Sieve of Eratosthenes", slug: "sieve-of-eratosthenes", difficulty: "MEDIUM" },
          { number: 197, title: "Find Prime Factorisation of a Number using Sieve", slug: "prime-factorisation-sieve", difficulty: "MEDIUM" },
          { number: 198, title: "Power(n, x)", slug: "power-n-x", difficulty: "MEDIUM" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 9: STACK AND QUEUES
  // ============================================================
  {
    stepNumber: 9,
    title: "Stack and Queues",
    slug: "stack-and-queues",
    description: "Master stack and queue data structures with implementation and problem-solving.",
    topics: [
      {
        title: "Stack & Queue Implementation",
        slug: "stack-queue-implementation",
        problems: [
          { number: 199, title: "Implement Stack using Arrays", slug: "stack-using-arrays", difficulty: "EASY" },
          { number: 200, title: "Implement Queue using Arrays", slug: "queue-using-arrays", difficulty: "EASY" },
          { number: 201, title: "Implement Stack using Queue", slug: "stack-using-queue", difficulty: "MEDIUM" },
          { number: 202, title: "Implement Queue using Stack", slug: "queue-using-stack", difficulty: "MEDIUM" },
          { number: 203, title: "Implement stack using Linkedlist", slug: "stack-using-ll", difficulty: "EASY" },
          { number: 204, title: "Implement queue using Linkedlist", slug: "queue-using-ll", difficulty: "MEDIUM" },
          { number: 205, title: "Check for balanced paranthesis", slug: "balanced-parenthesis", difficulty: "MEDIUM" },
          { number: 206, title: "Implement Min Stack", slug: "min-stack", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Infix / Prefix / Postfix Conversions",
        slug: "infix-prefix-postfix",
        problems: [
          { number: 207, title: "Infix to Postfix Conversion using Stack", slug: "infix-to-postfix", difficulty: "MEDIUM" },
          { number: 208, title: "Prefix to Infix Conversion", slug: "prefix-to-infix", difficulty: "MEDIUM" },
          { number: 209, title: "Prefix to Postfix Conversion", slug: "prefix-to-postfix", difficulty: "MEDIUM" },
          { number: 210, title: "Postfix to Prefix Conversion", slug: "postfix-to-prefix", difficulty: "MEDIUM" },
          { number: 211, title: "Postfix to Infix", slug: "postfix-to-infix", difficulty: "MEDIUM" },
          { number: 212, title: "Convert Infix To Prefix Notation", slug: "infix-to-prefix", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Monotonic Stack Problems",
        slug: "monotonic-stack",
        problems: [
          { number: 213, title: "Next Greater Element", slug: "next-greater-element", difficulty: "EASY" },
          { number: 214, title: "Next Greater Element 2", slug: "next-greater-element-2", difficulty: "MEDIUM" },
          { number: 215, title: "Next Smaller Element", slug: "next-smaller-element", difficulty: "EASY" },
          { number: 216, title: "Number of NGEs to the right", slug: "number-of-nges", difficulty: "EASY" },
          { number: 217, title: "Trapping Rainwater", slug: "trapping-rainwater", difficulty: "HARD" },
          { number: 218, title: "Sum of subarray minimum", slug: "sum-subarray-min", difficulty: "MEDIUM" },
          { number: 219, title: "Asteroid Collision", slug: "asteroid-collision", difficulty: "MEDIUM" },
          { number: 220, title: "Sum of subarray ranges", slug: "sum-subarray-ranges", difficulty: "MEDIUM" },
          { number: 221, title: "Remove k Digits", slug: "remove-k-digits", difficulty: "MEDIUM" },
          { number: 222, title: "Largest rectangle in a histogram", slug: "largest-rectangle-histogram", difficulty: "MEDIUM" },
          { number: 223, title: "Maximal Rectangles", slug: "maximal-rectangles", difficulty: "HARD" },
          { number: 224, title: "Sliding Window maximum", slug: "sliding-window-max", difficulty: "HARD" },
          { number: 225, title: "Stock span problem", slug: "stock-span", difficulty: "MEDIUM" },
          { number: 226, title: "The Celebrity Problem", slug: "celebrity-problem", difficulty: "HARD" },
        ],
      },
      {
        title: "Cache Design",
        slug: "cache-design",
        problems: [
          { number: 227, title: "LRU cache (IMPORTANT)", slug: "lru-cache", difficulty: "HARD" },
          { number: 228, title: "LFU cache", slug: "lfu-cache", difficulty: "HARD" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 10: SLIDING WINDOW & TWO POINTER COMBINED PROBLEMS
  // ============================================================
  {
    stepNumber: 10,
    title: "Sliding Window & Two Pointer",
    slug: "sliding-window-two-pointer",
    description: "Master sliding window and two pointer techniques for efficient array/string problems.",
    topics: [
      {
        title: "Sliding Window & Two Pointer Problems",
        slug: "sliding-window-problems",
        problems: [
          { number: 229, title: "Longest Substring Without Repeating Characters", slug: "longest-substring-no-repeat", difficulty: "MEDIUM" },
          { number: 230, title: "Max Consecutive Ones III", slug: "max-consecutive-ones-3", difficulty: "MEDIUM" },
          { number: 231, title: "Fruit Into Baskets", slug: "fruit-into-baskets", difficulty: "MEDIUM" },
          { number: 232, title: "Longest repeating character replacement", slug: "longest-repeating-replacement", difficulty: "MEDIUM" },
          { number: 233, title: "Binary subarray with sum", slug: "binary-subarray-sum", difficulty: "EASY" },
          { number: 234, title: "Count number of nice subarrays", slug: "count-nice-subarrays", difficulty: "MEDIUM" },
          { number: 235, title: "Number of substring containing all three characters", slug: "substring-all-three", difficulty: "MEDIUM" },
          { number: 236, title: "Maximum point you can obtain from cards", slug: "max-points-cards", difficulty: "MEDIUM" },
          { number: 237, title: "Longest Substring with At Most K Distinct Characters", slug: "longest-substring-k-distinct", difficulty: "MEDIUM" },
          { number: 238, title: "Subarray with k different integers", slug: "subarray-k-different", difficulty: "HARD" },
          { number: 239, title: "Minimum Window Substring", slug: "min-window-substring", difficulty: "HARD" },
          { number: 240, title: "Minimum Window Subsequence", slug: "min-window-subsequence", difficulty: "HARD" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 11: HEAPS [LEARNING, MEDIUM, HARD]
  // ============================================================
  {
    stepNumber: 11,
    title: "Heaps",
    slug: "heaps",
    description: "Master priority queues and heap data structures with practical problems.",
    topics: [
      {
        title: "Heap Basics",
        slug: "heap-basics",
        problems: [
          { number: 241, title: "Introduction to Priority Queues using Binary Heaps", slug: "intro-priority-queue", difficulty: "MEDIUM" },
          { number: 242, title: "Min Heap and Max Heap Implementation", slug: "heap-implementation", difficulty: "MEDIUM" },
          { number: 243, title: "Check if an array represents a min-heap or not", slug: "check-min-heap", difficulty: "MEDIUM" },
          { number: 244, title: "Convert min Heap to max Heap", slug: "convert-min-to-max", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Medium Heap Problems",
        slug: "medium-heap",
        problems: [
          { number: 245, title: "Kth largest element in an array [use priority queue]", slug: "kth-largest-element", difficulty: "EASY" },
          { number: 246, title: "Kth smallest element in an array [use priority queue]", slug: "kth-smallest-element", difficulty: "EASY" },
          { number: 247, title: "Sort K sorted array", slug: "sort-k-sorted", difficulty: "EASY" },
          { number: 248, title: "Merge M sorted Lists", slug: "merge-m-sorted-lists", difficulty: "HARD" },
          { number: 249, title: "Replace each array element by its corresponding rank", slug: "replace-by-rank", difficulty: "EASY" },
          { number: 250, title: "Task Scheduler", slug: "task-scheduler", difficulty: "MEDIUM" },
          { number: 251, title: "Hands of Straights", slug: "hands-of-straights", difficulty: "MEDIUM" },
          { number: 252, title: "Design twitter", slug: "design-twitter", difficulty: "MEDIUM" },
          { number: 253, title: "Connect n ropes with minimal cost", slug: "connect-n-ropes", difficulty: "MEDIUM" },
          { number: 254, title: "Kth largest element in a stream of running integers", slug: "kth-largest-stream", difficulty: "EASY" },
          { number: 255, title: "Maximum Sum Combination", slug: "max-sum-combination", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Hard Heap Problems",
        slug: "hard-heap",
        problems: [
          { number: 256, title: "Find Median from Data Stream", slug: "find-median-stream", difficulty: "HARD" },
          { number: 257, title: "K most frequent elements", slug: "k-most-frequent", difficulty: "MEDIUM" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 12: GREEDY ALGORITHMS [EASY, MEDIUM/HARD]
  // ============================================================
  {
    stepNumber: 12,
    title: "Greedy Algorithms",
    slug: "greedy-algorithms",
    description: "Master greedy algorithm strategies with classic optimization problems.",
    topics: [
      {
        title: "Greedy Problems",
        slug: "greedy-problems",
        problems: [
          { number: 258, title: "Assign Cookies", slug: "assign-cookies", difficulty: "EASY" },
          { number: 259, title: "Fractional Knapsack Problem", slug: "fractional-knapsack", difficulty: "MEDIUM" },
          { number: 260, title: "Greedy algorithm to find minimum number of coins", slug: "min-coins-greedy", difficulty: "MEDIUM" },
          { number: 261, title: "Lemonade Change", slug: "lemonade-change", difficulty: "EASY" },
          { number: 262, title: "Valid Paranthesis Checker", slug: "valid-parenthesis-checker", difficulty: "MEDIUM" },
          { number: 263, title: "N meetings in one room", slug: "n-meetings-room", difficulty: "MEDIUM" },
          { number: 264, title: "Jump Game", slug: "jump-game", difficulty: "MEDIUM" },
          { number: 265, title: "Jump Game 2", slug: "jump-game-2", difficulty: "MEDIUM" },
          { number: 266, title: "Minimum number of platforms required for a railway", slug: "min-platforms", difficulty: "MEDIUM" },
          { number: 267, title: "Job sequencing Problem", slug: "job-sequencing", difficulty: "MEDIUM" },
          { number: 268, title: "Candy", slug: "candy", difficulty: "HARD" },
          { number: 269, title: "Program for Shortest Job First (or SJF) CPU Scheduling", slug: "shortest-job-first", difficulty: "MEDIUM" },
          { number: 270, title: "Program for LRU Page Replacement Algorithm", slug: "lru-page-replacement", difficulty: "MEDIUM" },
          { number: 271, title: "Insert Interval", slug: "insert-interval", difficulty: "MEDIUM" },
          { number: 272, title: "Merge Intervals", slug: "merge-intervals", difficulty: "MEDIUM" },
          { number: 273, title: "Non-overlapping Intervals", slug: "non-overlapping-intervals", difficulty: "MEDIUM" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 13: BINARY TREES [TRAVERSALS, MEDIUM AND HARD PROBLEMS]
  // ============================================================
  {
    stepNumber: 13,
    title: "Binary Trees",
    slug: "binary-trees",
    description: "Master binary tree traversals, properties, and advanced problems.",
    topics: [
      {
        title: "Tree Traversals",
        slug: "tree-traversals",
        problems: [
          { number: 274, title: "Introduction to Trees", slug: "intro-trees", difficulty: "EASY" },
          { number: 275, title: "Binary Tree Representation in Java", slug: "binary-tree-java", difficulty: "EASY" },
          { number: 276, title: "Binary Tree Traversals in Binary Tree", slug: "binary-tree-traversals", difficulty: "EASY" },
          { number: 277, title: "Preorder Traversal of Binary Tree", slug: "preorder-traversal", difficulty: "EASY" },
          { number: 278, title: "Inorder Traversal of Binary Tree", slug: "inorder-traversal", difficulty: "EASY" },
          { number: 279, title: "Post-order Traversal of Binary Tree", slug: "postorder-traversal", difficulty: "EASY" },
          { number: 280, title: "Level order Traversal / Level order traversal in spiral form", slug: "level-order-traversal", difficulty: "EASY" },
          { number: 281, title: "Iterative Preorder Traversal of Binary Tree", slug: "iterative-preorder", difficulty: "EASY" },
          { number: 282, title: "Iterative Inorder Traversal of Binary Tree", slug: "iterative-inorder", difficulty: "EASY" },
          { number: 283, title: "Post-order Traversal of Binary Tree using 2 stack", slug: "postorder-2-stack", difficulty: "EASY" },
          { number: 284, title: "Post-order Traversal of Binary Tree using 1 stack", slug: "postorder-1-stack", difficulty: "MEDIUM" },
          { number: 285, title: "Preorder, Inorder, and Postorder Traversal in one Traversal", slug: "all-traversals-one", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Medium Tree Problems",
        slug: "medium-tree",
        problems: [
          { number: 286, title: "Height of a Binary Tree", slug: "height-binary-tree", difficulty: "MEDIUM" },
          { number: 287, title: "Check if the Binary tree is height-balanced or not", slug: "height-balanced", difficulty: "MEDIUM" },
          { number: 288, title: "Diameter of Binary Tree", slug: "diameter-binary-tree", difficulty: "MEDIUM" },
          { number: 289, title: "Maximum path sum", slug: "max-path-sum", difficulty: "HARD" },
          { number: 290, title: "Check if two trees are identical or not", slug: "identical-trees", difficulty: "MEDIUM" },
          { number: 291, title: "Zig Zag Traversal of Binary Tree", slug: "zigzag-traversal", difficulty: "EASY" },
          { number: 292, title: "Boundary Traversal of Binary Tree", slug: "boundary-traversal", difficulty: "MEDIUM" },
          { number: 293, title: "Vertical Order Traversal of Binary Tree", slug: "vertical-traversal", difficulty: "EASY" },
          { number: 294, title: "Top View of Binary Tree", slug: "top-view", difficulty: "EASY" },
          { number: 295, title: "Bottom View of Binary Tree", slug: "bottom-view", difficulty: "MEDIUM" },
          { number: 296, title: "Right/Left View of Binary Tree", slug: "right-left-view", difficulty: "MEDIUM" },
          { number: 297, title: "Symmetric Binary Tree", slug: "symmetric-tree", difficulty: "MEDIUM" },
          { number: 298, title: "Root to Node Path in Binary Tree", slug: "root-to-node-path", difficulty: "MEDIUM" },
          { number: 299, title: "LCA in Binary Tree", slug: "lca-binary-tree", difficulty: "MEDIUM" },
          { number: 300, title: "Maximum width of a Binary Tree", slug: "max-width-binary-tree", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Hard Tree Problems",
        slug: "hard-tree",
        problems: [
          { number: 301, title: "Check for Children Sum Property", slug: "children-sum-property", difficulty: "HARD" },
          { number: 302, title: "Print all the Nodes at a distance of K in a Binary Tree", slug: "nodes-distance-k", difficulty: "MEDIUM" },
          { number: 303, title: "Minimum time taken to BURN the Binary Tree from a Node", slug: "burn-binary-tree", difficulty: "HARD" },
          { number: 304, title: "Count total Nodes in a COMPLETE Binary Tree", slug: "count-complete-tree", difficulty: "MEDIUM" },
          { number: 305, title: "Requirements needed to construct a Unique Binary Tree | Theory", slug: "unique-tree-theory", difficulty: "MEDIUM" },
          { number: 306, title: "Construct Binary Tree from inorder and preorder", slug: "construct-inorder-preorder", difficulty: "HARD" },
          { number: 307, title: "Construct the Binary Tree from Postorder and Inorder Traversal", slug: "construct-postorder-inorder", difficulty: "HARD" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 14: BST
  // ============================================================
  {
    stepNumber: 14,
    title: "BST",
    slug: "bst",
    description: "Master Binary Search Trees with search, insert, delete, and advanced problems.",
    topics: [
      {
        title: "BST Basics",
        slug: "bst-basics",
        problems: [
          { number: 308, title: "Introduction to BST", slug: "intro-bst", difficulty: "EASY" },
          { number: 309, title: "Search in BST", slug: "search-bst", difficulty: "EASY" },
          { number: 310, title: "Find the Inorder Successor/Predecessor in BST", slug: "inorder-successor-predecessor", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Medium BST Problems",
        slug: "medium-bst",
        problems: [
          { number: 311, title: "Insert a Node in BST", slug: "insert-bst", difficulty: "EASY" },
          { number: 312, title: "Delete a Node in BST", slug: "delete-bst", difficulty: "MEDIUM" },
          { number: 313, title: "Kth Smallest/Largest Element in BST", slug: "kth-element-bst", difficulty: "MEDIUM" },
          { number: 314, title: "Validate BST", slug: "validate-bst", difficulty: "MEDIUM" },
          { number: 315, title: "LCA of Two Nodes in BST", slug: "lca-bst", difficulty: "MEDIUM" },
          { number: 316, title: "Floor in a BST", slug: "floor-bst", difficulty: "EASY" },
          { number: 317, title: "Ceil in a BST", slug: "ceil-bst", difficulty: "EASY" },
          { number: 318, title: "Find a pair with a given sum in BST", slug: "pair-sum-bst", difficulty: "MEDIUM" },
          { number: 319, title: "BST to Greater Sum Tree", slug: "bst-to-greater-sum", difficulty: "MEDIUM" },
          { number: 320, title: "Recover BST | Correct BST with two nodes swapped", slug: "recover-bst", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Hard BST Problems",
        slug: "hard-bst",
        problems: [
          { number: 321, title: "Merge Two BSTs", slug: "merge-two-bsts", difficulty: "HARD" },
          { number: 322, title: "Count BST nodes that lie in a given range", slug: "count-bst-range", difficulty: "MEDIUM" },
          { number: 323, title: "Inorder Predecessor and Successor in BST", slug: "predecessor-successor", difficulty: "MEDIUM" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 15: GRAPHS
  // ============================================================
  {
    stepNumber: 15,
    title: "Graphs",
    slug: "graphs",
    description: "Master graph algorithms including BFS, DFS, shortest paths, and spanning trees.",
    topics: [
      {
        title: "Graph Basics",
        slug: "graph-basics",
        problems: [
          { number: 324, title: "Graph and Types", slug: "graph-types", difficulty: "EASY" },
          { number: 325, title: "Graph Representation | C++/Java/Python", slug: "graph-representation", difficulty: "EASY" },
          { number: 326, title: "Connected Components", slug: "connected-components", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "BFS and DFS",
        slug: "bfs-dfs",
        problems: [
          { number: 327, title: "BFS of Graph", slug: "bfs-graph", difficulty: "MEDIUM" },
          { number: 328, title: "DFS of Graph", slug: "dfs-graph", difficulty: "MEDIUM" },
          { number: 329, title: "Number of Provinces", slug: "number-provinces", difficulty: "MEDIUM" },
          { number: 330, title: "Flood Fill Algorithm", slug: "flood-fill", difficulty: "MEDIUM" },
          { number: 331, title: "Number of Islands", slug: "number-of-islands", difficulty: "MEDIUM" },
          { number: 332, title: "Rotting Oranges", slug: "rotting-oranges", difficulty: "MEDIUM" },
          { number: 333, title: "Surrounded Regions", slug: "surrounded-regions", difficulty: "MEDIUM" },
          { number: 334, title: "Clone Graph", slug: "clone-graph", difficulty: "MEDIUM" },
          { number: 335, title: "Detect a cycle in an Undirected Graph", slug: "detect-cycle-undirected", difficulty: "MEDIUM" },
          { number: 336, title: "Detect a cycle in a Directed Graph", slug: "detect-cycle-directed", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Shortest Path Algorithms",
        slug: "shortest-path",
        problems: [
          { number: 337, title: "Shortest Path in Undirected Graph", slug: "shortest-path-undirected", difficulty: "MEDIUM" },
          { number: 338, title: "Shortest Path in Directed Acyclic Graph", slug: "shortest-path-dag", difficulty: "MEDIUM" },
          { number: 339, title: "Word Ladder", slug: "word-ladder", difficulty: "HARD" },
          { number: 340, title: "Dijkstra's Algorithm", slug: "dijkstra", difficulty: "MEDIUM" },
          { number: 341, title: "Shortest Path in Binary Matrix", slug: "shortest-path-binary-matrix", difficulty: "HARD" },
          { number: 342, title: "Cheapest Flights Within K Stops", slug: "cheapest-flights", difficulty: "HARD" },
        ],
      },
      {
        title: "MST and Advanced Graph",
        slug: "mst-advanced",
        problems: [
          { number: 343, title: "Minimum Spanning Tree - Prim's Algorithm", slug: "prims-mst", difficulty: "MEDIUM" },
          { number: 344, title: "Minimum Spanning Tree - Kruskal's Algorithm", slug: "kruskal-mst", difficulty: "MEDIUM" },
          { number: 345, title: "Bridges in Graph", slug: "bridges-graph", difficulty: "HARD" },
          { number: 346, title: "Articulation Point", slug: "articulation-point", difficulty: "HARD" },
          { number: 347, title: "Topological Sort", slug: "topological-sort", difficulty: "MEDIUM" },
          { number: 348, title: "Course Schedule", slug: "course-schedule", difficulty: "MEDIUM" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 16: DYNAMIC PROGRAMMING
  // ============================================================
  {
    stepNumber: 16,
    title: "Dynamic Programming",
    slug: "dynamic-programming",
    description: "Master dynamic programming from 1D to 2D and advanced optimization problems.",
    topics: [
      {
        title: "1D DP",
        slug: "1d-dp",
        problems: [
          { number: 349, title: "Climbing Stairs", slug: "climbing-stairs", difficulty: "EASY" },
          { number: 350, title: "House Robber", slug: "house-robber", difficulty: "MEDIUM" },
          { number: 351, title: "House Robber II", slug: "house-robber-2", difficulty: "MEDIUM" },
          { number: 352, title: "Maximum Sum of Non-Adjacent Elements", slug: "max-sum-non-adjacent", difficulty: "MEDIUM" },
          { number: 353, title: "Ninja's Training", slug: "ninjas-training", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "2D DP",
        slug: "2d-dp",
        problems: [
          { number: 354, title: "Unique Paths", slug: "unique-paths", difficulty: "MEDIUM" },
          { number: 355, title: "Unique Paths II", slug: "unique-paths-2", difficulty: "MEDIUM" },
          { number: 356, title: "Minimum Path Sum", slug: "min-path-sum", difficulty: "MEDIUM" },
          { number: 357, title: "Minimum Path Sum in Triangle", slug: "min-path-triangle", difficulty: "MEDIUM" },
          { number: 358, title: "Cherry Pickup", slug: "cherry-pickup", difficulty: "HARD" },
        ],
      },
      {
        title: "DP on Strings",
        slug: "dp-strings",
        problems: [
          { number: 359, title: "Longest Common Subsequence", slug: "longest-common-subsequence", difficulty: "MEDIUM" },
          { number: 360, title: "Longest Common Substring", slug: "longest-common-substring", difficulty: "MEDIUM" },
          { number: 361, title: "Longest Palindromic Subsequence", slug: "longest-palindromic-subsequence", difficulty: "MEDIUM" },
          { number: 362, title: "Longest Palindromic Substring", slug: "longest-palindromic-substring-dp", difficulty: "MEDIUM" },
          { number: 363, title: "Edit Distance", slug: "edit-distance", difficulty: "HARD" },
        ],
      },
      {
        title: "DP on Subsequence / Knapsack",
        slug: "dp-knapsack",
        problems: [
          { number: 364, title: "Subset Sum Equal to Target", slug: "subset-sum-target", difficulty: "MEDIUM" },
          { number: 365, title: "Partition Equal Subset Sum", slug: "partition-equal-subset", difficulty: "MEDIUM" },
          { number: 366, title: "Partition with Given Difference", slug: "partition-given-difference", difficulty: "MEDIUM" },
          { number: 367, title: "Count Subsets with Sum K", slug: "count-subsets-sum-k", difficulty: "MEDIUM" },
          { number: 368, title: "0/1 Knapsack", slug: "knapsack-01", difficulty: "MEDIUM" },
          { number: 369, title: "Coin Change", slug: "coin-change", difficulty: "MEDIUM" },
          { number: 370, title: "Target Sum", slug: "target-sum", difficulty: "MEDIUM" },
          { number: 371, title: "Coin Change II", slug: "coin-change-2", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "DP on Stocks",
        slug: "dp-stocks",
        problems: [
          { number: 372, title: "Stock Buy and Sell", slug: "stock-buy-sell-dp", difficulty: "MEDIUM" },
          { number: 373, title: "Stock Buy and Sell - Cooldown", slug: "stock-cooldown", difficulty: "MEDIUM" },
          { number: 374, title: "Stock Buy and Sell with Transaction Fee", slug: "stock-fee", difficulty: "MEDIUM" },
          { number: 375, title: "Stock Buy and Sell III", slug: "stock-3", difficulty: "HARD" },
          { number: 376, title: "Stock Buy and Sell IV", slug: "stock-4", difficulty: "HARD" },
        ],
      },
      {
        title: "DP on LIS",
        slug: "dp-lis",
        problems: [
          { number: 377, title: "Longest Increasing Subsequence", slug: "longest-increasing-subsequence", difficulty: "MEDIUM" },
          { number: 378, title: "Print Longest Increasing Subsequence", slug: "print-lis", difficulty: "MEDIUM" },
          { number: 379, title: "Longest Increasing Subsequence - Binary Search", slug: "lis-binary-search", difficulty: "MEDIUM" },
          { number: 380, title: "Longest Common Subsequence with gaps", slug: "lcs-gaps", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "DP on Squares / Rectangles",
        slug: "dp-squares",
        problems: [
          { number: 381, title: "Largest Square in Matrix", slug: "largest-square-matrix", difficulty: "MEDIUM" },
          { number: 382, title: "Count Square Submatrices with All Ones", slug: "count-squares", difficulty: "MEDIUM" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 17: TRIES
  // ============================================================
  {
    stepNumber: 17,
    title: "Tries",
    slug: "tries",
    description: "Master trie data structure for prefix-based string operations.",
    topics: [
      {
        title: "Trie Basics",
        slug: "trie-basics",
        problems: [
          { number: 383, title: "Implement Trie (Prefix Tree)", slug: "implement-trie", difficulty: "MEDIUM" },
          { number: 384, title: "Implement Trie - 2 (Prefix Tree)", slug: "implement-trie-2", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Trie Problems",
        slug: "trie-problems",
        problems: [
          { number: 385, title: "Longest Common Prefix", slug: "longest-common-prefix-trie", difficulty: "EASY" },
          { number: 386, title: "Count Distinct Substrings in a String", slug: "count-distinct-substrings", difficulty: "MEDIUM" },
          { number: 387, title: "Maximum XOR of Two Numbers in an Array", slug: "max-xor-two-numbers", difficulty: "MEDIUM" },
          { number: 388, title: "Maximum XOR With an Element From Array", slug: "max-xor-element", difficulty: "HARD" },
        ],
      },
    ],
  },

  // ============================================================
  // STEP 18: ADVANCED STRINGS (OPTIONAL)
  // ============================================================
  {
    stepNumber: 18,
    title: "Advanced Strings",
    slug: "advanced-strings",
    description: "Advanced string algorithms including pattern matching and suffix structures.",
    topics: [
      {
        title: "String Matching Algorithms",
        slug: "string-matching",
        problems: [
          { number: 389, title: "KMP Algorithm / LPS Array", slug: "kmp-algorithm", difficulty: "MEDIUM" },
          { number: 390, title: "Rabin-Karp Algorithm", slug: "rabin-karp", difficulty: "MEDIUM" },
          { number: 391, title: "Z-Algorithm", slug: "z-algorithm", difficulty: "MEDIUM" },
        ],
      },
      {
        title: "Advanced String Problems",
        slug: "advanced-string-problems",
        problems: [
          { number: 392, title: "Longest Palindromic Substring (Advanced)", slug: "longest-palindrome-advanced", difficulty: "HARD" },
          { number: 393, title: "Minimum Characters to be Inserted to Make a Palindrome", slug: "min-insert-palindrome", difficulty: "HARD" },
          { number: 394, title: "Count and Say", slug: "count-and-say", difficulty: "MEDIUM" },
          { number: 395, title: "Repeated String Match", slug: "repeated-string-match", difficulty: "MEDIUM" },
          { number: 396, title: "Longest Happy Prefix", slug: "longest-happy-prefix", difficulty: "MEDIUM" },
          { number: 397, title: "Shortest Palindrome", slug: "shortest-palindrome", difficulty: "HARD" },
          { number: 398, title: "Check if String is a Rotation of Another (Advanced)", slug: "string-rotation-advanced", difficulty: "MEDIUM" },
        ],
      },
    ],
  },
]

// Helper to get all problems flattened
export function getAllProblems(): (ProblemData & { stepNumber: number; topicSlug: string })[] {
  const problems: (ProblemData & { stepNumber: number; topicSlug: string })[] = []
  for (const step of curriculum) {
    for (const topic of step.topics) {
      for (const problem of topic.problems) {
        problems.push({
          ...problem,
          stepNumber: step.stepNumber,
          topicSlug: topic.slug,
        })
      }
    }
  }
  return problems
}

// Helper to get problem count per step
export function getStepProblemCount(stepNumber: number): number {
  const step = curriculum.find(s => s.stepNumber === stepNumber)
  if (!step) return 0
  return step.topics.reduce((acc, topic) => acc + topic.problems.length, 0)
}

// Helper to get total problem count
export function getTotalProblemCount(): number {
  return curriculum.reduce((acc, step) => {
    return acc + step.topics.reduce((topicAcc, topic) => topicAcc + topic.problems.length, 0)
  }, 0)
}
