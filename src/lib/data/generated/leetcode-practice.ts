/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/fetch-leetcode.mjs from the hand-written mapping in
 * src/lib/data/leetcode-map.ts, joined against LeetCode's public problem
 * catalogue. Titles and difficulties come from the catalogue, so they cannot
 * drift from the real problem, and a slug that does not exist fails the build
 * rather than shipping a dead link.
 *
 * Regenerate with:
 *
 *   node scripts/fetch-leetcode.mjs --refresh
 *
 * The running app never contacts leetcode.com; these are plain links.
 *
 * Generated: 2026-09-08
 * Catalogue size: 4046
 * Curriculum problems linked: 284
 */

import type { PracticeLink } from "@/lib/types/practice"

export const leetcodePractice: Record<string, PracticeLink[]> = {
  "reverse-a-number": [
    {
      "platform": "LEETCODE",
      "title": "Reverse Integer",
      "url": "https://leetcode.com/problems/reverse-integer/",
      "difficulty": "MEDIUM"
    }
  ],
  "check-palindrome": [
    {
      "platform": "LEETCODE",
      "title": "Palindrome Number",
      "url": "https://leetcode.com/problems/palindrome-number/",
      "difficulty": "EASY"
    }
  ],
  "gcd-or-hcf": [
    {
      "platform": "LEETCODE",
      "title": "Find Greatest Common Divisor of Array",
      "url": "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
      "difficulty": "EASY",
      "note": "Same Euclidean GCD, applied across an array."
    }
  ],
  "check-for-prime": [
    {
      "platform": "LEETCODE",
      "title": "Count Primes",
      "url": "https://leetcode.com/problems/count-primes/",
      "difficulty": "MEDIUM",
      "note": "Primality testing scaled up to a sieve — Step 8 returns to this."
    }
  ],
  "fibonacci-number": [
    {
      "platform": "LEETCODE",
      "title": "Fibonacci Number",
      "url": "https://leetcode.com/problems/fibonacci-number/",
      "difficulty": "EASY"
    }
  ],
  "reverse-array-recursion": [
    {
      "platform": "LEETCODE",
      "title": "Reverse String",
      "url": "https://leetcode.com/problems/reverse-string/",
      "difficulty": "EASY"
    }
  ],
  "string-palindrome-recursion": [
    {
      "platform": "LEETCODE",
      "title": "Valid Palindrome",
      "url": "https://leetcode.com/problems/valid-palindrome/",
      "difficulty": "EASY"
    }
  ],
  "highest-lowest-frequency": [
    {
      "platform": "LEETCODE",
      "title": "Top K Frequent Elements",
      "url": "https://leetcode.com/problems/top-k-frequent-elements/",
      "difficulty": "MEDIUM",
      "note": "The same frequency map, then asked for the top k rather than one."
    }
  ],
  "merge-sort": [
    {
      "platform": "LEETCODE",
      "title": "Sort an Array",
      "url": "https://leetcode.com/problems/sort-an-array/",
      "difficulty": "MEDIUM",
      "note": "Accepts any O(n log n) sort — write merge sort here."
    }
  ],
  "quick-sort": [
    {
      "platform": "LEETCODE",
      "title": "Sort an Array",
      "url": "https://leetcode.com/problems/sort-an-array/",
      "difficulty": "MEDIUM",
      "note": "Accepts any O(n log n) sort — write quicksort here."
    }
  ],
  "check-sorted-array": [
    {
      "platform": "LEETCODE",
      "title": "Check if Array Is Sorted and Rotated",
      "url": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
      "difficulty": "EASY"
    }
  ],
  "remove-duplicates-sorted": [
    {
      "platform": "LEETCODE",
      "title": "Remove Duplicates from Sorted Array",
      "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
      "difficulty": "EASY"
    }
  ],
  "left-rotate-one": [
    {
      "platform": "LEETCODE",
      "title": "Rotate Array",
      "url": "https://leetcode.com/problems/rotate-array/",
      "difficulty": "MEDIUM",
      "note": "The general case; rotating by one is k = 1."
    }
  ],
  "left-rotate-d": [
    {
      "platform": "LEETCODE",
      "title": "Rotate Array",
      "url": "https://leetcode.com/problems/rotate-array/",
      "difficulty": "MEDIUM"
    }
  ],
  "move-zeros-end": [
    {
      "platform": "LEETCODE",
      "title": "Move Zeroes",
      "url": "https://leetcode.com/problems/move-zeroes/",
      "difficulty": "EASY"
    }
  ],
  "find-missing-number": [
    {
      "platform": "LEETCODE",
      "title": "Missing Number",
      "url": "https://leetcode.com/problems/missing-number/",
      "difficulty": "EASY"
    }
  ],
  "max-consecutive-ones": [
    {
      "platform": "LEETCODE",
      "title": "Max Consecutive Ones",
      "url": "https://leetcode.com/problems/max-consecutive-ones/",
      "difficulty": "EASY"
    }
  ],
  "find-unique-number": [
    {
      "platform": "LEETCODE",
      "title": "Single Number",
      "url": "https://leetcode.com/problems/single-number/",
      "difficulty": "EASY"
    }
  ],
  "two-sum": [
    {
      "platform": "LEETCODE",
      "title": "Two Sum",
      "url": "https://leetcode.com/problems/two-sum/",
      "difficulty": "EASY"
    }
  ],
  "sort-012": [
    {
      "platform": "LEETCODE",
      "title": "Sort Colors",
      "url": "https://leetcode.com/problems/sort-colors/",
      "difficulty": "MEDIUM"
    }
  ],
  "majority-element": [
    {
      "platform": "LEETCODE",
      "title": "Majority Element",
      "url": "https://leetcode.com/problems/majority-element/",
      "difficulty": "EASY"
    }
  ],
  "kadanes-algorithm": [
    {
      "platform": "LEETCODE",
      "title": "Maximum Subarray",
      "url": "https://leetcode.com/problems/maximum-subarray/",
      "difficulty": "MEDIUM"
    }
  ],
  "max-subarray-extended": [
    {
      "platform": "LEETCODE",
      "title": "Maximum Subarray",
      "url": "https://leetcode.com/problems/maximum-subarray/",
      "difficulty": "MEDIUM",
      "note": "Same problem; the extension is returning the subarray's bounds too."
    }
  ],
  "stock-buy-sell": [
    {
      "platform": "LEETCODE",
      "title": "Best Time to Buy and Sell Stock",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      "difficulty": "EASY"
    }
  ],
  "rearrange-alternating": [
    {
      "platform": "LEETCODE",
      "title": "Rearrange Array Elements by Sign",
      "url": "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
      "difficulty": "MEDIUM"
    }
  ],
  "next-permutation": [
    {
      "platform": "LEETCODE",
      "title": "Next Permutation",
      "url": "https://leetcode.com/problems/next-permutation/",
      "difficulty": "MEDIUM"
    }
  ],
  "longest-consecutive-sequence": [
    {
      "platform": "LEETCODE",
      "title": "Longest Consecutive Sequence",
      "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
      "difficulty": "MEDIUM"
    }
  ],
  "set-matrix-zeros": [
    {
      "platform": "LEETCODE",
      "title": "Set Matrix Zeroes",
      "url": "https://leetcode.com/problems/set-matrix-zeroes/",
      "difficulty": "MEDIUM"
    }
  ],
  "rotate-matrix-90": [
    {
      "platform": "LEETCODE",
      "title": "Rotate Image",
      "url": "https://leetcode.com/problems/rotate-image/",
      "difficulty": "MEDIUM"
    }
  ],
  "spiral-matrix": [
    {
      "platform": "LEETCODE",
      "title": "Spiral Matrix",
      "url": "https://leetcode.com/problems/spiral-matrix/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-subarrays-sum": [
    {
      "platform": "LEETCODE",
      "title": "Subarray Sum Equals K",
      "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
      "difficulty": "MEDIUM"
    }
  ],
  "pascals-triangle": [
    {
      "platform": "LEETCODE",
      "title": "Pascal's Triangle",
      "url": "https://leetcode.com/problems/pascals-triangle/",
      "difficulty": "EASY"
    }
  ],
  "majority-element-n3": [
    {
      "platform": "LEETCODE",
      "title": "Majority Element II",
      "url": "https://leetcode.com/problems/majority-element-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "three-sum": [
    {
      "platform": "LEETCODE",
      "title": "3Sum",
      "url": "https://leetcode.com/problems/3sum/",
      "difficulty": "MEDIUM"
    }
  ],
  "four-sum": [
    {
      "platform": "LEETCODE",
      "title": "4Sum",
      "url": "https://leetcode.com/problems/4sum/",
      "difficulty": "MEDIUM"
    }
  ],
  "largest-subarray-0-sum": [
    {
      "platform": "LEETCODE",
      "title": "Contiguous Array",
      "url": "https://leetcode.com/problems/contiguous-array/",
      "difficulty": "MEDIUM",
      "note": "The 0/1 case of the same prefix-sum-in-a-map idea."
    }
  ],
  "merge-overlapping-intervals": [
    {
      "platform": "LEETCODE",
      "title": "Merge Intervals",
      "url": "https://leetcode.com/problems/merge-intervals/",
      "difficulty": "MEDIUM"
    }
  ],
  "merge-sorted-arrays": [
    {
      "platform": "LEETCODE",
      "title": "Merge Sorted Array",
      "url": "https://leetcode.com/problems/merge-sorted-array/",
      "difficulty": "EASY"
    }
  ],
  "repeating-missing": [
    {
      "platform": "LEETCODE",
      "title": "Set Mismatch",
      "url": "https://leetcode.com/problems/set-mismatch/",
      "difficulty": "EASY"
    }
  ],
  "reverse-pairs": [
    {
      "platform": "LEETCODE",
      "title": "Reverse Pairs",
      "url": "https://leetcode.com/problems/reverse-pairs/",
      "difficulty": "HARD"
    }
  ],
  "max-product-subarray": [
    {
      "platform": "LEETCODE",
      "title": "Maximum Product Subarray",
      "url": "https://leetcode.com/problems/maximum-product-subarray/",
      "difficulty": "MEDIUM"
    }
  ],
  "binary-search-x": [
    {
      "platform": "LEETCODE",
      "title": "Binary Search",
      "url": "https://leetcode.com/problems/binary-search/",
      "difficulty": "EASY"
    }
  ],
  "lower-bound": [
    {
      "platform": "LEETCODE",
      "title": "Search Insert Position",
      "url": "https://leetcode.com/problems/search-insert-position/",
      "difficulty": "EASY",
      "note": "Lower bound by another name."
    }
  ],
  "upper-bound": [
    {
      "platform": "LEETCODE",
      "title": "Search Insert Position",
      "url": "https://leetcode.com/problems/search-insert-position/",
      "difficulty": "EASY",
      "note": "Upper bound is the same search with a > instead of a >=."
    }
  ],
  "search-insert-position": [
    {
      "platform": "LEETCODE",
      "title": "Search Insert Position",
      "url": "https://leetcode.com/problems/search-insert-position/",
      "difficulty": "EASY"
    }
  ],
  "first-last-occurrence": [
    {
      "platform": "LEETCODE",
      "title": "Find First and Last Position of Element in Sorted Array",
      "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-occurrences": [
    {
      "platform": "LEETCODE",
      "title": "Find First and Last Position of Element in Sorted Array",
      "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      "difficulty": "MEDIUM",
      "note": "The count is last - first + 1."
    }
  ],
  "search-rotated-1": [
    {
      "platform": "LEETCODE",
      "title": "Search in Rotated Sorted Array",
      "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      "difficulty": "MEDIUM"
    }
  ],
  "search-rotated-2": [
    {
      "platform": "LEETCODE",
      "title": "Search in Rotated Sorted Array II",
      "url": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "min-rotated-sorted": [
    {
      "platform": "LEETCODE",
      "title": "Find Minimum in Rotated Sorted Array",
      "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-rotations": [
    {
      "platform": "LEETCODE",
      "title": "Find Minimum in Rotated Sorted Array",
      "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      "difficulty": "MEDIUM",
      "note": "The rotation count is the index of the minimum."
    }
  ],
  "single-element-sorted": [
    {
      "platform": "LEETCODE",
      "title": "Single Element in a Sorted Array",
      "url": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
      "difficulty": "MEDIUM"
    }
  ],
  "find-peak-element": [
    {
      "platform": "LEETCODE",
      "title": "Find Peak Element",
      "url": "https://leetcode.com/problems/find-peak-element/",
      "difficulty": "MEDIUM"
    }
  ],
  "square-root": [
    {
      "platform": "LEETCODE",
      "title": "Sqrt(x)",
      "url": "https://leetcode.com/problems/sqrtx/",
      "difficulty": "EASY"
    }
  ],
  "koko-eating-bananas": [
    {
      "platform": "LEETCODE",
      "title": "Koko Eating Bananas",
      "url": "https://leetcode.com/problems/koko-eating-bananas/",
      "difficulty": "MEDIUM"
    }
  ],
  "min-days-bouquets": [
    {
      "platform": "LEETCODE",
      "title": "Minimum Number of Days to Make m Bouquets",
      "url": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
      "difficulty": "MEDIUM"
    }
  ],
  "smallest-divisor": [
    {
      "platform": "LEETCODE",
      "title": "Find the Smallest Divisor Given a Threshold",
      "url": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
      "difficulty": "MEDIUM"
    }
  ],
  "ship-packages": [
    {
      "platform": "LEETCODE",
      "title": "Capacity To Ship Packages Within D Days",
      "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
      "difficulty": "MEDIUM"
    }
  ],
  "kth-missing-positive": [
    {
      "platform": "LEETCODE",
      "title": "Kth Missing Positive Number",
      "url": "https://leetcode.com/problems/kth-missing-positive-number/",
      "difficulty": "EASY"
    }
  ],
  "aggressive-cows": [
    {
      "platform": "LEETCODE",
      "title": "Magnetic Force Between Two Balls",
      "url": "https://leetcode.com/problems/magnetic-force-between-two-balls/",
      "difficulty": "MEDIUM",
      "note": "Aggressive Cows with the story changed — maximise the minimum gap."
    }
  ],
  "book-allocation": [
    {
      "platform": "LEETCODE",
      "title": "Split Array Largest Sum",
      "url": "https://leetcode.com/problems/split-array-largest-sum/",
      "difficulty": "HARD",
      "note": "Identical: minimise the largest contiguous group."
    }
  ],
  "split-array-largest-sum": [
    {
      "platform": "LEETCODE",
      "title": "Split Array Largest Sum",
      "url": "https://leetcode.com/problems/split-array-largest-sum/",
      "difficulty": "HARD"
    }
  ],
  "painters-partition": [
    {
      "platform": "LEETCODE",
      "title": "Split Array Largest Sum",
      "url": "https://leetcode.com/problems/split-array-largest-sum/",
      "difficulty": "HARD",
      "note": "Identical: minimise the largest contiguous group."
    }
  ],
  "median-two-sorted": [
    {
      "platform": "LEETCODE",
      "title": "Median of Two Sorted Arrays",
      "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      "difficulty": "HARD"
    }
  ],
  "search-2d-matrix": [
    {
      "platform": "LEETCODE",
      "title": "Search a 2D Matrix",
      "url": "https://leetcode.com/problems/search-a-2d-matrix/",
      "difficulty": "MEDIUM"
    }
  ],
  "search-row-col-sorted": [
    {
      "platform": "LEETCODE",
      "title": "Search a 2D Matrix II",
      "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "find-peak-2d": [
    {
      "platform": "LEETCODE",
      "title": "Find a Peak Element II",
      "url": "https://leetcode.com/problems/find-a-peak-element-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "remove-outer-parenthesis": [
    {
      "platform": "LEETCODE",
      "title": "Remove Outermost Parentheses",
      "url": "https://leetcode.com/problems/remove-outermost-parentheses/",
      "difficulty": "EASY"
    }
  ],
  "reverse-words-palindrome": [
    {
      "platform": "LEETCODE",
      "title": "Reverse Words in a String",
      "url": "https://leetcode.com/problems/reverse-words-in-a-string/",
      "difficulty": "MEDIUM"
    }
  ],
  "largest-odd-number": [
    {
      "platform": "LEETCODE",
      "title": "Largest Odd Number in String",
      "url": "https://leetcode.com/problems/largest-odd-number-in-string/",
      "difficulty": "EASY"
    }
  ],
  "longest-common-prefix": [
    {
      "platform": "LEETCODE",
      "title": "Longest Common Prefix",
      "url": "https://leetcode.com/problems/longest-common-prefix/",
      "difficulty": "EASY"
    }
  ],
  "isomorphic-string": [
    {
      "platform": "LEETCODE",
      "title": "Isomorphic Strings",
      "url": "https://leetcode.com/problems/isomorphic-strings/",
      "difficulty": "EASY"
    }
  ],
  "string-rotation": [
    {
      "platform": "LEETCODE",
      "title": "Rotate String",
      "url": "https://leetcode.com/problems/rotate-string/",
      "difficulty": "EASY"
    }
  ],
  "anagram-check": [
    {
      "platform": "LEETCODE",
      "title": "Valid Anagram",
      "url": "https://leetcode.com/problems/valid-anagram/",
      "difficulty": "EASY"
    }
  ],
  "sort-by-frequency": [
    {
      "platform": "LEETCODE",
      "title": "Sort Characters By Frequency",
      "url": "https://leetcode.com/problems/sort-characters-by-frequency/",
      "difficulty": "MEDIUM"
    }
  ],
  "max-nesting-depth": [
    {
      "platform": "LEETCODE",
      "title": "Maximum Nesting Depth of the Parentheses",
      "url": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/",
      "difficulty": "EASY"
    }
  ],
  "roman-integer": [
    {
      "platform": "LEETCODE",
      "title": "Roman to Integer",
      "url": "https://leetcode.com/problems/roman-to-integer/",
      "difficulty": "EASY"
    }
  ],
  "implement-atoi": [
    {
      "platform": "LEETCODE",
      "title": "String to Integer (atoi)",
      "url": "https://leetcode.com/problems/string-to-integer-atoi/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-substrings": [
    {
      "platform": "LEETCODE",
      "title": "Subarrays with K Different Integers",
      "url": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
      "difficulty": "HARD",
      "note": "The exactly-k counting trick, on numbers instead of letters."
    }
  ],
  "longest-palindrome-substring": [
    {
      "platform": "LEETCODE",
      "title": "Longest Palindromic Substring",
      "url": "https://leetcode.com/problems/longest-palindromic-substring/",
      "difficulty": "MEDIUM"
    }
  ],
  "reverse-every-word": [
    {
      "platform": "LEETCODE",
      "title": "Reverse Words in a String III",
      "url": "https://leetcode.com/problems/reverse-words-in-a-string-iii/",
      "difficulty": "EASY"
    }
  ],
  "delete-node-ll": [
    {
      "platform": "LEETCODE",
      "title": "Delete Node in a Linked List",
      "url": "https://leetcode.com/problems/delete-node-in-a-linked-list/",
      "difficulty": "MEDIUM"
    }
  ],
  "middle-linked-list": [
    {
      "platform": "LEETCODE",
      "title": "Middle of the Linked List",
      "url": "https://leetcode.com/problems/middle-of-the-linked-list/",
      "difficulty": "EASY"
    }
  ],
  "reverse-ll-iterative": [
    {
      "platform": "LEETCODE",
      "title": "Reverse Linked List",
      "url": "https://leetcode.com/problems/reverse-linked-list/",
      "difficulty": "EASY"
    }
  ],
  "reverse-ll-recursive": [
    {
      "platform": "LEETCODE",
      "title": "Reverse Linked List",
      "url": "https://leetcode.com/problems/reverse-linked-list/",
      "difficulty": "EASY",
      "note": "Same problem — write the recursive version."
    }
  ],
  "detect-loop-ll": [
    {
      "platform": "LEETCODE",
      "title": "Linked List Cycle",
      "url": "https://leetcode.com/problems/linked-list-cycle/",
      "difficulty": "EASY"
    }
  ],
  "starting-point-loop": [
    {
      "platform": "LEETCODE",
      "title": "Linked List Cycle II",
      "url": "https://leetcode.com/problems/linked-list-cycle-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "length-loop-ll": [
    {
      "platform": "LEETCODE",
      "title": "Linked List Cycle II",
      "url": "https://leetcode.com/problems/linked-list-cycle-ii/",
      "difficulty": "MEDIUM",
      "note": "Find the entry point first; the length falls out of one more lap."
    }
  ],
  "palindrome-ll": [
    {
      "platform": "LEETCODE",
      "title": "Palindrome Linked List",
      "url": "https://leetcode.com/problems/palindrome-linked-list/",
      "difficulty": "EASY"
    }
  ],
  "segregate-odd-even": [
    {
      "platform": "LEETCODE",
      "title": "Odd Even Linked List",
      "url": "https://leetcode.com/problems/odd-even-linked-list/",
      "difficulty": "MEDIUM"
    }
  ],
  "remove-nth-back": [
    {
      "platform": "LEETCODE",
      "title": "Remove Nth Node From End of List",
      "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      "difficulty": "MEDIUM"
    }
  ],
  "delete-middle-node": [
    {
      "platform": "LEETCODE",
      "title": "Delete the Middle Node of a Linked List",
      "url": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/",
      "difficulty": "MEDIUM"
    }
  ],
  "sort-linked-list": [
    {
      "platform": "LEETCODE",
      "title": "Sort List",
      "url": "https://leetcode.com/problems/sort-list/",
      "difficulty": "MEDIUM"
    }
  ],
  "sort-012-ll": [
    {
      "platform": "LEETCODE",
      "title": "Sort List",
      "url": "https://leetcode.com/problems/sort-list/",
      "difficulty": "MEDIUM",
      "note": "The general sort; with only three values, relinking beats it."
    }
  ],
  "intersection-y-ll": [
    {
      "platform": "LEETCODE",
      "title": "Intersection of Two Linked Lists",
      "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
      "difficulty": "EASY"
    }
  ],
  "add-two-numbers-ll": [
    {
      "platform": "LEETCODE",
      "title": "Add Two Numbers",
      "url": "https://leetcode.com/problems/add-two-numbers/",
      "difficulty": "MEDIUM"
    }
  ],
  "remove-duplicates-dll": [
    {
      "platform": "LEETCODE",
      "title": "Remove Duplicates from Sorted List",
      "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
      "difficulty": "EASY",
      "note": "Singly linked, but the same walk."
    }
  ],
  "reverse-k-group": [
    {
      "platform": "LEETCODE",
      "title": "Reverse Nodes in k-Group",
      "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
      "difficulty": "HARD"
    }
  ],
  "rotate-linked-list": [
    {
      "platform": "LEETCODE",
      "title": "Rotate List",
      "url": "https://leetcode.com/problems/rotate-list/",
      "difficulty": "MEDIUM"
    }
  ],
  "clone-random-pointer": [
    {
      "platform": "LEETCODE",
      "title": "Copy List with Random Pointer",
      "url": "https://leetcode.com/problems/copy-list-with-random-pointer/",
      "difficulty": "MEDIUM"
    }
  ],
  "recursive-atoi": [
    {
      "platform": "LEETCODE",
      "title": "String to Integer (atoi)",
      "url": "https://leetcode.com/problems/string-to-integer-atoi/",
      "difficulty": "MEDIUM",
      "note": "Same problem — write it recursively."
    }
  ],
  "pow-x-n": [
    {
      "platform": "LEETCODE",
      "title": "Pow(x, n)",
      "url": "https://leetcode.com/problems/powx-n/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-good-numbers": [
    {
      "platform": "LEETCODE",
      "title": "Count Good Numbers",
      "url": "https://leetcode.com/problems/count-good-numbers/",
      "difficulty": "MEDIUM"
    }
  ],
  "generate-parenthesis": [
    {
      "platform": "LEETCODE",
      "title": "Generate Parentheses",
      "url": "https://leetcode.com/problems/generate-parentheses/",
      "difficulty": "MEDIUM"
    }
  ],
  "print-subsequences": [
    {
      "platform": "LEETCODE",
      "title": "Subsets",
      "url": "https://leetcode.com/problems/subsets/",
      "difficulty": "MEDIUM"
    }
  ],
  "combination-sum": [
    {
      "platform": "LEETCODE",
      "title": "Combination Sum",
      "url": "https://leetcode.com/problems/combination-sum/",
      "difficulty": "MEDIUM"
    }
  ],
  "combination-sum-2": [
    {
      "platform": "LEETCODE",
      "title": "Combination Sum II",
      "url": "https://leetcode.com/problems/combination-sum-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "subset-sum-1": [
    {
      "platform": "LEETCODE",
      "title": "Subsets",
      "url": "https://leetcode.com/problems/subsets/",
      "difficulty": "MEDIUM",
      "note": "Generate the subsets, then sum each."
    }
  ],
  "subset-sum-2": [
    {
      "platform": "LEETCODE",
      "title": "Subsets II",
      "url": "https://leetcode.com/problems/subsets-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "combination-sum-3": [
    {
      "platform": "LEETCODE",
      "title": "Combination Sum III",
      "url": "https://leetcode.com/problems/combination-sum-iii/",
      "difficulty": "MEDIUM"
    }
  ],
  "letter-combinations-phone": [
    {
      "platform": "LEETCODE",
      "title": "Letter Combinations of a Phone Number",
      "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
      "difficulty": "MEDIUM"
    }
  ],
  "palindrome-partitioning": [
    {
      "platform": "LEETCODE",
      "title": "Palindrome Partitioning",
      "url": "https://leetcode.com/problems/palindrome-partitioning/",
      "difficulty": "MEDIUM"
    }
  ],
  "word-search": [
    {
      "platform": "LEETCODE",
      "title": "Word Search",
      "url": "https://leetcode.com/problems/word-search/",
      "difficulty": "MEDIUM"
    }
  ],
  "n-queen": [
    {
      "platform": "LEETCODE",
      "title": "N-Queens",
      "url": "https://leetcode.com/problems/n-queens/",
      "difficulty": "HARD"
    }
  ],
  "rat-in-maze": [
    {
      "platform": "LEETCODE",
      "title": "Unique Paths III",
      "url": "https://leetcode.com/problems/unique-paths-iii/",
      "difficulty": "HARD",
      "note": "Grid backtracking with blocked cells — the same shape as the maze."
    }
  ],
  "word-break": [
    {
      "platform": "LEETCODE",
      "title": "Word Break",
      "url": "https://leetcode.com/problems/word-break/",
      "difficulty": "MEDIUM"
    }
  ],
  "sudoku-solver": [
    {
      "platform": "LEETCODE",
      "title": "Sudoku Solver",
      "url": "https://leetcode.com/problems/sudoku-solver/",
      "difficulty": "HARD"
    }
  ],
  "expression-add-operators": [
    {
      "platform": "LEETCODE",
      "title": "Expression Add Operators",
      "url": "https://leetcode.com/problems/expression-add-operators/",
      "difficulty": "HARD"
    }
  ],
  "power-of-two": [
    {
      "platform": "LEETCODE",
      "title": "Power of Two",
      "url": "https://leetcode.com/problems/power-of-two/",
      "difficulty": "EASY"
    }
  ],
  "count-set-bits": [
    {
      "platform": "LEETCODE",
      "title": "Number of 1 Bits",
      "url": "https://leetcode.com/problems/number-of-1-bits/",
      "difficulty": "EASY"
    }
  ],
  "divide-without-ops": [
    {
      "platform": "LEETCODE",
      "title": "Divide Two Integers",
      "url": "https://leetcode.com/problems/divide-two-integers/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-bits-flip": [
    {
      "platform": "LEETCODE",
      "title": "Minimum Bit Flips to Convert Number",
      "url": "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
      "difficulty": "EASY"
    }
  ],
  "odd-occurrence": [
    {
      "platform": "LEETCODE",
      "title": "Single Number",
      "url": "https://leetcode.com/problems/single-number/",
      "difficulty": "EASY"
    }
  ],
  "power-set-bit": [
    {
      "platform": "LEETCODE",
      "title": "Subsets",
      "url": "https://leetcode.com/problems/subsets/",
      "difficulty": "MEDIUM",
      "note": "Same enumeration — do it with bitmasks rather than recursion."
    }
  ],
  "xor-l-to-r": [
    {
      "platform": "LEETCODE",
      "title": "XOR Operation in an Array",
      "url": "https://leetcode.com/problems/xor-operation-in-an-array/",
      "difficulty": "EASY",
      "note": "Warm-up for the prefix-XOR identity."
    }
  ],
  "two-odd-occurrence": [
    {
      "platform": "LEETCODE",
      "title": "Single Number III",
      "url": "https://leetcode.com/problems/single-number-iii/",
      "difficulty": "MEDIUM"
    }
  ],
  "sieve-of-eratosthenes": [
    {
      "platform": "LEETCODE",
      "title": "Count Primes",
      "url": "https://leetcode.com/problems/count-primes/",
      "difficulty": "MEDIUM"
    }
  ],
  "power-n-x": [
    {
      "platform": "LEETCODE",
      "title": "Pow(x, n)",
      "url": "https://leetcode.com/problems/powx-n/",
      "difficulty": "MEDIUM"
    }
  ],
  "stack-using-queue": [
    {
      "platform": "LEETCODE",
      "title": "Implement Stack using Queues",
      "url": "https://leetcode.com/problems/implement-stack-using-queues/",
      "difficulty": "EASY"
    }
  ],
  "queue-using-stack": [
    {
      "platform": "LEETCODE",
      "title": "Implement Queue using Stacks",
      "url": "https://leetcode.com/problems/implement-queue-using-stacks/",
      "difficulty": "EASY"
    }
  ],
  "balanced-parenthesis": [
    {
      "platform": "LEETCODE",
      "title": "Valid Parentheses",
      "url": "https://leetcode.com/problems/valid-parentheses/",
      "difficulty": "EASY"
    }
  ],
  "min-stack": [
    {
      "platform": "LEETCODE",
      "title": "Min Stack",
      "url": "https://leetcode.com/problems/min-stack/",
      "difficulty": "MEDIUM"
    }
  ],
  "next-greater-element": [
    {
      "platform": "LEETCODE",
      "title": "Next Greater Element I",
      "url": "https://leetcode.com/problems/next-greater-element-i/",
      "difficulty": "EASY"
    }
  ],
  "next-greater-element-2": [
    {
      "platform": "LEETCODE",
      "title": "Next Greater Element II",
      "url": "https://leetcode.com/problems/next-greater-element-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "trapping-rainwater": [
    {
      "platform": "LEETCODE",
      "title": "Trapping Rain Water",
      "url": "https://leetcode.com/problems/trapping-rain-water/",
      "difficulty": "HARD"
    }
  ],
  "sum-subarray-min": [
    {
      "platform": "LEETCODE",
      "title": "Sum of Subarray Minimums",
      "url": "https://leetcode.com/problems/sum-of-subarray-minimums/",
      "difficulty": "MEDIUM"
    }
  ],
  "asteroid-collision": [
    {
      "platform": "LEETCODE",
      "title": "Asteroid Collision",
      "url": "https://leetcode.com/problems/asteroid-collision/",
      "difficulty": "MEDIUM"
    }
  ],
  "sum-subarray-ranges": [
    {
      "platform": "LEETCODE",
      "title": "Sum of Subarray Ranges",
      "url": "https://leetcode.com/problems/sum-of-subarray-ranges/",
      "difficulty": "MEDIUM"
    }
  ],
  "remove-k-digits": [
    {
      "platform": "LEETCODE",
      "title": "Remove K Digits",
      "url": "https://leetcode.com/problems/remove-k-digits/",
      "difficulty": "MEDIUM"
    }
  ],
  "largest-rectangle-histogram": [
    {
      "platform": "LEETCODE",
      "title": "Largest Rectangle in Histogram",
      "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
      "difficulty": "HARD"
    }
  ],
  "maximal-rectangles": [
    {
      "platform": "LEETCODE",
      "title": "Maximal Rectangle",
      "url": "https://leetcode.com/problems/maximal-rectangle/",
      "difficulty": "HARD"
    }
  ],
  "sliding-window-max": [
    {
      "platform": "LEETCODE",
      "title": "Sliding Window Maximum",
      "url": "https://leetcode.com/problems/sliding-window-maximum/",
      "difficulty": "HARD"
    }
  ],
  "stock-span": [
    {
      "platform": "LEETCODE",
      "title": "Online Stock Span",
      "url": "https://leetcode.com/problems/online-stock-span/",
      "difficulty": "MEDIUM"
    }
  ],
  "lru-cache": [
    {
      "platform": "LEETCODE",
      "title": "LRU Cache",
      "url": "https://leetcode.com/problems/lru-cache/",
      "difficulty": "MEDIUM"
    }
  ],
  "lfu-cache": [
    {
      "platform": "LEETCODE",
      "title": "LFU Cache",
      "url": "https://leetcode.com/problems/lfu-cache/",
      "difficulty": "HARD"
    }
  ],
  "longest-substring-no-repeat": [
    {
      "platform": "LEETCODE",
      "title": "Longest Substring Without Repeating Characters",
      "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      "difficulty": "MEDIUM"
    }
  ],
  "max-consecutive-ones-3": [
    {
      "platform": "LEETCODE",
      "title": "Max Consecutive Ones III",
      "url": "https://leetcode.com/problems/max-consecutive-ones-iii/",
      "difficulty": "MEDIUM"
    }
  ],
  "fruit-into-baskets": [
    {
      "platform": "LEETCODE",
      "title": "Fruit Into Baskets",
      "url": "https://leetcode.com/problems/fruit-into-baskets/",
      "difficulty": "MEDIUM"
    }
  ],
  "longest-repeating-replacement": [
    {
      "platform": "LEETCODE",
      "title": "Longest Repeating Character Replacement",
      "url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
      "difficulty": "MEDIUM"
    }
  ],
  "binary-subarray-sum": [
    {
      "platform": "LEETCODE",
      "title": "Binary Subarrays With Sum",
      "url": "https://leetcode.com/problems/binary-subarrays-with-sum/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-nice-subarrays": [
    {
      "platform": "LEETCODE",
      "title": "Count Number of Nice Subarrays",
      "url": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
      "difficulty": "MEDIUM"
    }
  ],
  "substring-all-three": [
    {
      "platform": "LEETCODE",
      "title": "Number of Substrings Containing All Three Characters",
      "url": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
      "difficulty": "MEDIUM"
    }
  ],
  "max-points-cards": [
    {
      "platform": "LEETCODE",
      "title": "Maximum Points You Can Obtain from Cards",
      "url": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
      "difficulty": "MEDIUM"
    }
  ],
  "subarray-k-different": [
    {
      "platform": "LEETCODE",
      "title": "Subarrays with K Different Integers",
      "url": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
      "difficulty": "HARD"
    }
  ],
  "min-window-substring": [
    {
      "platform": "LEETCODE",
      "title": "Minimum Window Substring",
      "url": "https://leetcode.com/problems/minimum-window-substring/",
      "difficulty": "HARD"
    }
  ],
  "kth-largest-element": [
    {
      "platform": "LEETCODE",
      "title": "Kth Largest Element in an Array",
      "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      "difficulty": "MEDIUM"
    }
  ],
  "kth-smallest-element": [
    {
      "platform": "LEETCODE",
      "title": "Kth Largest Element in an Array",
      "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      "difficulty": "MEDIUM",
      "note": "The kth smallest is the (n - k + 1)th largest — flip the comparator."
    }
  ],
  "merge-m-sorted-lists": [
    {
      "platform": "LEETCODE",
      "title": "Merge k Sorted Lists",
      "url": "https://leetcode.com/problems/merge-k-sorted-lists/",
      "difficulty": "HARD"
    }
  ],
  "replace-by-rank": [
    {
      "platform": "LEETCODE",
      "title": "Rank Transform of an Array",
      "url": "https://leetcode.com/problems/rank-transform-of-an-array/",
      "difficulty": "EASY"
    }
  ],
  "task-scheduler": [
    {
      "platform": "LEETCODE",
      "title": "Task Scheduler",
      "url": "https://leetcode.com/problems/task-scheduler/",
      "difficulty": "MEDIUM"
    }
  ],
  "hands-of-straights": [
    {
      "platform": "LEETCODE",
      "title": "Hand of Straights",
      "url": "https://leetcode.com/problems/hand-of-straights/",
      "difficulty": "MEDIUM"
    }
  ],
  "design-twitter": [
    {
      "platform": "LEETCODE",
      "title": "Design Twitter",
      "url": "https://leetcode.com/problems/design-twitter/",
      "difficulty": "MEDIUM"
    }
  ],
  "kth-largest-stream": [
    {
      "platform": "LEETCODE",
      "title": "Kth Largest Element in a Stream",
      "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
      "difficulty": "EASY"
    }
  ],
  "find-median-stream": [
    {
      "platform": "LEETCODE",
      "title": "Find Median from Data Stream",
      "url": "https://leetcode.com/problems/find-median-from-data-stream/",
      "difficulty": "HARD"
    }
  ],
  "k-most-frequent": [
    {
      "platform": "LEETCODE",
      "title": "Top K Frequent Elements",
      "url": "https://leetcode.com/problems/top-k-frequent-elements/",
      "difficulty": "MEDIUM"
    }
  ],
  "assign-cookies": [
    {
      "platform": "LEETCODE",
      "title": "Assign Cookies",
      "url": "https://leetcode.com/problems/assign-cookies/",
      "difficulty": "EASY"
    }
  ],
  "min-coins-greedy": [
    {
      "platform": "LEETCODE",
      "title": "Coin Change",
      "url": "https://leetcode.com/problems/coin-change/",
      "difficulty": "MEDIUM",
      "note": "Where greedy breaks: with coins {1,3,4} and amount 6 it takes three, not two."
    }
  ],
  "lemonade-change": [
    {
      "platform": "LEETCODE",
      "title": "Lemonade Change",
      "url": "https://leetcode.com/problems/lemonade-change/",
      "difficulty": "EASY"
    }
  ],
  "valid-parenthesis-checker": [
    {
      "platform": "LEETCODE",
      "title": "Valid Parenthesis String",
      "url": "https://leetcode.com/problems/valid-parenthesis-string/",
      "difficulty": "MEDIUM"
    }
  ],
  "n-meetings-room": [
    {
      "platform": "LEETCODE",
      "title": "Non-overlapping Intervals",
      "url": "https://leetcode.com/problems/non-overlapping-intervals/",
      "difficulty": "MEDIUM",
      "note": "The same activity-selection greedy, counting what you must drop."
    }
  ],
  "jump-game": [
    {
      "platform": "LEETCODE",
      "title": "Jump Game",
      "url": "https://leetcode.com/problems/jump-game/",
      "difficulty": "MEDIUM"
    }
  ],
  "jump-game-2": [
    {
      "platform": "LEETCODE",
      "title": "Jump Game II",
      "url": "https://leetcode.com/problems/jump-game-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "candy": [
    {
      "platform": "LEETCODE",
      "title": "Candy",
      "url": "https://leetcode.com/problems/candy/",
      "difficulty": "HARD"
    }
  ],
  "lru-page-replacement": [
    {
      "platform": "LEETCODE",
      "title": "LRU Cache",
      "url": "https://leetcode.com/problems/lru-cache/",
      "difficulty": "MEDIUM",
      "note": "The eviction policy, as a data structure."
    }
  ],
  "insert-interval": [
    {
      "platform": "LEETCODE",
      "title": "Insert Interval",
      "url": "https://leetcode.com/problems/insert-interval/",
      "difficulty": "MEDIUM"
    }
  ],
  "merge-intervals": [
    {
      "platform": "LEETCODE",
      "title": "Merge Intervals",
      "url": "https://leetcode.com/problems/merge-intervals/",
      "difficulty": "MEDIUM"
    }
  ],
  "non-overlapping-intervals": [
    {
      "platform": "LEETCODE",
      "title": "Non-overlapping Intervals",
      "url": "https://leetcode.com/problems/non-overlapping-intervals/",
      "difficulty": "MEDIUM"
    }
  ],
  "preorder-traversal": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Preorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
      "difficulty": "EASY"
    }
  ],
  "inorder-traversal": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Inorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
      "difficulty": "EASY"
    }
  ],
  "postorder-traversal": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Postorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
      "difficulty": "EASY"
    }
  ],
  "level-order-traversal": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Level Order Traversal",
      "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      "difficulty": "MEDIUM"
    }
  ],
  "iterative-preorder": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Preorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
      "difficulty": "EASY",
      "note": "Same problem — write it with an explicit stack."
    }
  ],
  "iterative-inorder": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Inorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
      "difficulty": "EASY",
      "note": "Same problem — write it with an explicit stack."
    }
  ],
  "postorder-2-stack": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Postorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
      "difficulty": "EASY",
      "note": "Same problem — write it with two stacks."
    }
  ],
  "postorder-1-stack": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Postorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
      "difficulty": "EASY",
      "note": "Same problem — write it with one stack."
    }
  ],
  "height-binary-tree": [
    {
      "platform": "LEETCODE",
      "title": "Maximum Depth of Binary Tree",
      "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
      "difficulty": "EASY"
    }
  ],
  "height-balanced": [
    {
      "platform": "LEETCODE",
      "title": "Balanced Binary Tree",
      "url": "https://leetcode.com/problems/balanced-binary-tree/",
      "difficulty": "EASY"
    }
  ],
  "diameter-binary-tree": [
    {
      "platform": "LEETCODE",
      "title": "Diameter of Binary Tree",
      "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
      "difficulty": "EASY"
    }
  ],
  "max-path-sum": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Maximum Path Sum",
      "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
      "difficulty": "HARD"
    }
  ],
  "identical-trees": [
    {
      "platform": "LEETCODE",
      "title": "Same Tree",
      "url": "https://leetcode.com/problems/same-tree/",
      "difficulty": "EASY"
    }
  ],
  "zigzag-traversal": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Zigzag Level Order Traversal",
      "url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
      "difficulty": "MEDIUM"
    }
  ],
  "vertical-traversal": [
    {
      "platform": "LEETCODE",
      "title": "Vertical Order Traversal of a Binary Tree",
      "url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
      "difficulty": "HARD"
    }
  ],
  "top-view": [
    {
      "platform": "LEETCODE",
      "title": "Vertical Order Traversal of a Binary Tree",
      "url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
      "difficulty": "HARD",
      "note": "Top view is the first node in each vertical column."
    }
  ],
  "bottom-view": [
    {
      "platform": "LEETCODE",
      "title": "Vertical Order Traversal of a Binary Tree",
      "url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
      "difficulty": "HARD",
      "note": "Bottom view is the last node in each vertical column."
    }
  ],
  "right-left-view": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Right Side View",
      "url": "https://leetcode.com/problems/binary-tree-right-side-view/",
      "difficulty": "MEDIUM"
    }
  ],
  "symmetric-tree": [
    {
      "platform": "LEETCODE",
      "title": "Symmetric Tree",
      "url": "https://leetcode.com/problems/symmetric-tree/",
      "difficulty": "EASY"
    }
  ],
  "root-to-node-path": [
    {
      "platform": "LEETCODE",
      "title": "Binary Tree Paths",
      "url": "https://leetcode.com/problems/binary-tree-paths/",
      "difficulty": "EASY",
      "note": "All root-to-leaf paths; one root-to-node path is the same walk."
    }
  ],
  "lca-binary-tree": [
    {
      "platform": "LEETCODE",
      "title": "Lowest Common Ancestor of a Binary Tree",
      "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
      "difficulty": "MEDIUM"
    }
  ],
  "max-width-binary-tree": [
    {
      "platform": "LEETCODE",
      "title": "Maximum Width of Binary Tree",
      "url": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
      "difficulty": "MEDIUM"
    }
  ],
  "nodes-distance-k": [
    {
      "platform": "LEETCODE",
      "title": "All Nodes Distance K in Binary Tree",
      "url": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
      "difficulty": "MEDIUM"
    }
  ],
  "burn-binary-tree": [
    {
      "platform": "LEETCODE",
      "title": "Amount of Time for Binary Tree to Be Infected",
      "url": "https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-complete-tree": [
    {
      "platform": "LEETCODE",
      "title": "Count Complete Tree Nodes",
      "url": "https://leetcode.com/problems/count-complete-tree-nodes/",
      "difficulty": "MEDIUM"
    }
  ],
  "construct-inorder-preorder": [
    {
      "platform": "LEETCODE",
      "title": "Construct Binary Tree from Preorder and Inorder Traversal",
      "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
      "difficulty": "MEDIUM"
    }
  ],
  "construct-postorder-inorder": [
    {
      "platform": "LEETCODE",
      "title": "Construct Binary Tree from Inorder and Postorder Traversal",
      "url": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
      "difficulty": "MEDIUM"
    }
  ],
  "search-bst": [
    {
      "platform": "LEETCODE",
      "title": "Search in a Binary Search Tree",
      "url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
      "difficulty": "EASY"
    }
  ],
  "insert-bst": [
    {
      "platform": "LEETCODE",
      "title": "Insert into a Binary Search Tree",
      "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
      "difficulty": "MEDIUM"
    }
  ],
  "delete-bst": [
    {
      "platform": "LEETCODE",
      "title": "Delete Node in a BST",
      "url": "https://leetcode.com/problems/delete-node-in-a-bst/",
      "difficulty": "MEDIUM"
    }
  ],
  "kth-element-bst": [
    {
      "platform": "LEETCODE",
      "title": "Kth Smallest Element in a BST",
      "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
      "difficulty": "MEDIUM"
    }
  ],
  "validate-bst": [
    {
      "platform": "LEETCODE",
      "title": "Validate Binary Search Tree",
      "url": "https://leetcode.com/problems/validate-binary-search-tree/",
      "difficulty": "MEDIUM"
    }
  ],
  "lca-bst": [
    {
      "platform": "LEETCODE",
      "title": "Lowest Common Ancestor of a Binary Search Tree",
      "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
      "difficulty": "MEDIUM"
    }
  ],
  "pair-sum-bst": [
    {
      "platform": "LEETCODE",
      "title": "Two Sum IV - Input is a BST",
      "url": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
      "difficulty": "EASY"
    }
  ],
  "bst-to-greater-sum": [
    {
      "platform": "LEETCODE",
      "title": "Binary Search Tree to Greater Sum Tree",
      "url": "https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/",
      "difficulty": "MEDIUM"
    }
  ],
  "recover-bst": [
    {
      "platform": "LEETCODE",
      "title": "Recover Binary Search Tree",
      "url": "https://leetcode.com/problems/recover-binary-search-tree/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-bst-range": [
    {
      "platform": "LEETCODE",
      "title": "Range Sum of BST",
      "url": "https://leetcode.com/problems/range-sum-of-bst/",
      "difficulty": "EASY"
    }
  ],
  "connected-components": [
    {
      "platform": "LEETCODE",
      "title": "Number of Provinces",
      "url": "https://leetcode.com/problems/number-of-provinces/",
      "difficulty": "MEDIUM"
    }
  ],
  "number-provinces": [
    {
      "platform": "LEETCODE",
      "title": "Number of Provinces",
      "url": "https://leetcode.com/problems/number-of-provinces/",
      "difficulty": "MEDIUM"
    }
  ],
  "flood-fill": [
    {
      "platform": "LEETCODE",
      "title": "Flood Fill",
      "url": "https://leetcode.com/problems/flood-fill/",
      "difficulty": "EASY"
    }
  ],
  "number-of-islands": [
    {
      "platform": "LEETCODE",
      "title": "Number of Islands",
      "url": "https://leetcode.com/problems/number-of-islands/",
      "difficulty": "MEDIUM"
    }
  ],
  "rotting-oranges": [
    {
      "platform": "LEETCODE",
      "title": "Rotting Oranges",
      "url": "https://leetcode.com/problems/rotting-oranges/",
      "difficulty": "MEDIUM"
    }
  ],
  "surrounded-regions": [
    {
      "platform": "LEETCODE",
      "title": "Surrounded Regions",
      "url": "https://leetcode.com/problems/surrounded-regions/",
      "difficulty": "MEDIUM"
    }
  ],
  "clone-graph": [
    {
      "platform": "LEETCODE",
      "title": "Clone Graph",
      "url": "https://leetcode.com/problems/clone-graph/",
      "difficulty": "MEDIUM"
    }
  ],
  "detect-cycle-undirected": [
    {
      "platform": "LEETCODE",
      "title": "Redundant Connection",
      "url": "https://leetcode.com/problems/redundant-connection/",
      "difficulty": "MEDIUM",
      "note": "Finds the edge that closes a cycle — the same union-find check."
    }
  ],
  "detect-cycle-directed": [
    {
      "platform": "LEETCODE",
      "title": "Course Schedule",
      "url": "https://leetcode.com/problems/course-schedule/",
      "difficulty": "MEDIUM",
      "note": "Feasible exactly when the prerequisite graph is acyclic."
    }
  ],
  "shortest-path-undirected": [
    {
      "platform": "LEETCODE",
      "title": "Shortest Path in Binary Matrix",
      "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
      "difficulty": "MEDIUM",
      "note": "Unweighted shortest path, on a grid rather than an edge list."
    }
  ],
  "word-ladder": [
    {
      "platform": "LEETCODE",
      "title": "Word Ladder",
      "url": "https://leetcode.com/problems/word-ladder/",
      "difficulty": "HARD"
    }
  ],
  "dijkstra": [
    {
      "platform": "LEETCODE",
      "title": "Network Delay Time",
      "url": "https://leetcode.com/problems/network-delay-time/",
      "difficulty": "MEDIUM"
    }
  ],
  "shortest-path-binary-matrix": [
    {
      "platform": "LEETCODE",
      "title": "Shortest Path in Binary Matrix",
      "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
      "difficulty": "MEDIUM"
    }
  ],
  "cheapest-flights": [
    {
      "platform": "LEETCODE",
      "title": "Cheapest Flights Within K Stops",
      "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
      "difficulty": "MEDIUM"
    }
  ],
  "prims-mst": [
    {
      "platform": "LEETCODE",
      "title": "Min Cost to Connect All Points",
      "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
      "difficulty": "MEDIUM"
    }
  ],
  "kruskal-mst": [
    {
      "platform": "LEETCODE",
      "title": "Min Cost to Connect All Points",
      "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
      "difficulty": "MEDIUM",
      "note": "Same MST — sort the edges and union-find instead of growing one tree."
    }
  ],
  "bridges-graph": [
    {
      "platform": "LEETCODE",
      "title": "Critical Connections in a Network",
      "url": "https://leetcode.com/problems/critical-connections-in-a-network/",
      "difficulty": "HARD"
    }
  ],
  "topological-sort": [
    {
      "platform": "LEETCODE",
      "title": "Course Schedule II",
      "url": "https://leetcode.com/problems/course-schedule-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "course-schedule": [
    {
      "platform": "LEETCODE",
      "title": "Course Schedule",
      "url": "https://leetcode.com/problems/course-schedule/",
      "difficulty": "MEDIUM"
    }
  ],
  "climbing-stairs": [
    {
      "platform": "LEETCODE",
      "title": "Climbing Stairs",
      "url": "https://leetcode.com/problems/climbing-stairs/",
      "difficulty": "EASY"
    }
  ],
  "house-robber": [
    {
      "platform": "LEETCODE",
      "title": "House Robber",
      "url": "https://leetcode.com/problems/house-robber/",
      "difficulty": "MEDIUM"
    }
  ],
  "house-robber-2": [
    {
      "platform": "LEETCODE",
      "title": "House Robber II",
      "url": "https://leetcode.com/problems/house-robber-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "max-sum-non-adjacent": [
    {
      "platform": "LEETCODE",
      "title": "House Robber",
      "url": "https://leetcode.com/problems/house-robber/",
      "difficulty": "MEDIUM",
      "note": "House Robber with negatives allowed."
    }
  ],
  "unique-paths": [
    {
      "platform": "LEETCODE",
      "title": "Unique Paths",
      "url": "https://leetcode.com/problems/unique-paths/",
      "difficulty": "MEDIUM"
    }
  ],
  "unique-paths-2": [
    {
      "platform": "LEETCODE",
      "title": "Unique Paths II",
      "url": "https://leetcode.com/problems/unique-paths-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "min-path-sum": [
    {
      "platform": "LEETCODE",
      "title": "Minimum Path Sum",
      "url": "https://leetcode.com/problems/minimum-path-sum/",
      "difficulty": "MEDIUM"
    }
  ],
  "min-path-triangle": [
    {
      "platform": "LEETCODE",
      "title": "Triangle",
      "url": "https://leetcode.com/problems/triangle/",
      "difficulty": "MEDIUM"
    }
  ],
  "cherry-pickup": [
    {
      "platform": "LEETCODE",
      "title": "Cherry Pickup II",
      "url": "https://leetcode.com/problems/cherry-pickup-ii/",
      "difficulty": "HARD"
    }
  ],
  "longest-common-subsequence": [
    {
      "platform": "LEETCODE",
      "title": "Longest Common Subsequence",
      "url": "https://leetcode.com/problems/longest-common-subsequence/",
      "difficulty": "MEDIUM"
    }
  ],
  "longest-palindromic-subsequence": [
    {
      "platform": "LEETCODE",
      "title": "Longest Palindromic Subsequence",
      "url": "https://leetcode.com/problems/longest-palindromic-subsequence/",
      "difficulty": "MEDIUM"
    }
  ],
  "longest-palindromic-substring-dp": [
    {
      "platform": "LEETCODE",
      "title": "Longest Palindromic Substring",
      "url": "https://leetcode.com/problems/longest-palindromic-substring/",
      "difficulty": "MEDIUM"
    }
  ],
  "edit-distance": [
    {
      "platform": "LEETCODE",
      "title": "Edit Distance",
      "url": "https://leetcode.com/problems/edit-distance/",
      "difficulty": "MEDIUM"
    }
  ],
  "partition-equal-subset": [
    {
      "platform": "LEETCODE",
      "title": "Partition Equal Subset Sum",
      "url": "https://leetcode.com/problems/partition-equal-subset-sum/",
      "difficulty": "MEDIUM"
    }
  ],
  "coin-change": [
    {
      "platform": "LEETCODE",
      "title": "Coin Change",
      "url": "https://leetcode.com/problems/coin-change/",
      "difficulty": "MEDIUM"
    }
  ],
  "target-sum": [
    {
      "platform": "LEETCODE",
      "title": "Target Sum",
      "url": "https://leetcode.com/problems/target-sum/",
      "difficulty": "MEDIUM"
    }
  ],
  "coin-change-2": [
    {
      "platform": "LEETCODE",
      "title": "Coin Change II",
      "url": "https://leetcode.com/problems/coin-change-ii/",
      "difficulty": "MEDIUM"
    }
  ],
  "stock-buy-sell-dp": [
    {
      "platform": "LEETCODE",
      "title": "Best Time to Buy and Sell Stock",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      "difficulty": "EASY"
    }
  ],
  "stock-cooldown": [
    {
      "platform": "LEETCODE",
      "title": "Best Time to Buy and Sell Stock with Cooldown",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
      "difficulty": "MEDIUM"
    }
  ],
  "stock-fee": [
    {
      "platform": "LEETCODE",
      "title": "Best Time to Buy and Sell Stock with Transaction Fee",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
      "difficulty": "MEDIUM"
    }
  ],
  "stock-3": [
    {
      "platform": "LEETCODE",
      "title": "Best Time to Buy and Sell Stock III",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
      "difficulty": "HARD"
    }
  ],
  "stock-4": [
    {
      "platform": "LEETCODE",
      "title": "Best Time to Buy and Sell Stock IV",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
      "difficulty": "HARD"
    }
  ],
  "longest-increasing-subsequence": [
    {
      "platform": "LEETCODE",
      "title": "Longest Increasing Subsequence",
      "url": "https://leetcode.com/problems/longest-increasing-subsequence/",
      "difficulty": "MEDIUM"
    }
  ],
  "lis-binary-search": [
    {
      "platform": "LEETCODE",
      "title": "Longest Increasing Subsequence",
      "url": "https://leetcode.com/problems/longest-increasing-subsequence/",
      "difficulty": "MEDIUM",
      "note": "Same problem — get it to O(n log n)."
    }
  ],
  "largest-square-matrix": [
    {
      "platform": "LEETCODE",
      "title": "Maximal Square",
      "url": "https://leetcode.com/problems/maximal-square/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-squares": [
    {
      "platform": "LEETCODE",
      "title": "Count Square Submatrices with All Ones",
      "url": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/",
      "difficulty": "MEDIUM"
    }
  ],
  "implement-trie": [
    {
      "platform": "LEETCODE",
      "title": "Implement Trie (Prefix Tree)",
      "url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
      "difficulty": "MEDIUM"
    }
  ],
  "implement-trie-2": [
    {
      "platform": "LEETCODE",
      "title": "Design Add and Search Words Data Structure",
      "url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
      "difficulty": "MEDIUM",
      "note": "The same trie, asked to do more."
    }
  ],
  "longest-common-prefix-trie": [
    {
      "platform": "LEETCODE",
      "title": "Longest Common Prefix",
      "url": "https://leetcode.com/problems/longest-common-prefix/",
      "difficulty": "EASY"
    }
  ],
  "max-xor-two-numbers": [
    {
      "platform": "LEETCODE",
      "title": "Maximum XOR of Two Numbers in an Array",
      "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
      "difficulty": "MEDIUM"
    }
  ],
  "max-xor-element": [
    {
      "platform": "LEETCODE",
      "title": "Maximum XOR With an Element From Array",
      "url": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
      "difficulty": "HARD"
    }
  ],
  "kmp-algorithm": [
    {
      "platform": "LEETCODE",
      "title": "Find the Index of the First Occurrence in a String",
      "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
      "difficulty": "EASY",
      "note": "The problem KMP exists to solve."
    }
  ],
  "rabin-karp": [
    {
      "platform": "LEETCODE",
      "title": "Repeated String Match",
      "url": "https://leetcode.com/problems/repeated-string-match/",
      "difficulty": "MEDIUM",
      "note": "Substring search where a rolling hash pays off."
    }
  ],
  "longest-palindrome-advanced": [
    {
      "platform": "LEETCODE",
      "title": "Longest Palindromic Substring",
      "url": "https://leetcode.com/problems/longest-palindromic-substring/",
      "difficulty": "MEDIUM",
      "note": "Same problem — get it to O(n) with Manacher's."
    }
  ],
  "min-insert-palindrome": [
    {
      "platform": "LEETCODE",
      "title": "Minimum Insertion Steps to Make a String Palindrome",
      "url": "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
      "difficulty": "HARD"
    }
  ],
  "count-and-say": [
    {
      "platform": "LEETCODE",
      "title": "Count and Say",
      "url": "https://leetcode.com/problems/count-and-say/",
      "difficulty": "MEDIUM"
    }
  ],
  "repeated-string-match": [
    {
      "platform": "LEETCODE",
      "title": "Repeated String Match",
      "url": "https://leetcode.com/problems/repeated-string-match/",
      "difficulty": "MEDIUM"
    }
  ],
  "longest-happy-prefix": [
    {
      "platform": "LEETCODE",
      "title": "Longest Happy Prefix",
      "url": "https://leetcode.com/problems/longest-happy-prefix/",
      "difficulty": "HARD"
    }
  ],
  "shortest-palindrome": [
    {
      "platform": "LEETCODE",
      "title": "Shortest Palindrome",
      "url": "https://leetcode.com/problems/shortest-palindrome/",
      "difficulty": "HARD"
    }
  ],
  "string-rotation-advanced": [
    {
      "platform": "LEETCODE",
      "title": "Rotate String",
      "url": "https://leetcode.com/problems/rotate-string/",
      "difficulty": "EASY"
    }
  ],
  "min-platforms": [
    {
      "platform": "LEETCODE",
      "title": "Car Pooling",
      "url": "https://leetcode.com/problems/car-pooling/",
      "difficulty": "MEDIUM",
      "note": "The same sweep over overlapping intervals, counting the peak."
    }
  ],
  "longest-subarray-sum-k": [
    {
      "platform": "LEETCODE",
      "title": "Subarray Sum Equals K",
      "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
      "difficulty": "MEDIUM",
      "note": "Counts them rather than measuring the longest, but the same prefix-sum map."
    }
  ],
  "add-one-ll": [
    {
      "platform": "LEETCODE",
      "title": "Plus One",
      "url": "https://leetcode.com/problems/plus-one/",
      "difficulty": "EASY",
      "note": "The same carry, on an array instead of a list."
    }
  ],
  "count-inversions": [
    {
      "platform": "LEETCODE",
      "title": "Global and Local Inversions",
      "url": "https://leetcode.com/problems/global-and-local-inversions/",
      "difficulty": "MEDIUM"
    }
  ],
  "longest-common-substring": [
    {
      "platform": "LEETCODE",
      "title": "Maximum Length of Repeated Subarray",
      "url": "https://leetcode.com/problems/maximum-length-of-repeated-subarray/",
      "difficulty": "MEDIUM"
    }
  ],
  "subset-sum-target": [
    {
      "platform": "LEETCODE",
      "title": "Partition Equal Subset Sum",
      "url": "https://leetcode.com/problems/partition-equal-subset-sum/",
      "difficulty": "MEDIUM"
    }
  ],
  "knapsack-01": [
    {
      "platform": "LEETCODE",
      "title": "Ones and Zeroes",
      "url": "https://leetcode.com/problems/ones-and-zeroes/",
      "difficulty": "MEDIUM"
    }
  ],
  "articulation-point": [
    {
      "platform": "LEETCODE",
      "title": "Critical Connections in a Network",
      "url": "https://leetcode.com/problems/critical-connections-in-a-network/",
      "difficulty": "HARD"
    }
  ],
  "shortest-path-dag": [
    {
      "platform": "LEETCODE",
      "title": "Parallel Courses III",
      "url": "https://leetcode.com/problems/parallel-courses-iii/",
      "difficulty": "HARD"
    }
  ],
  "merge-two-bsts": [
    {
      "platform": "LEETCODE",
      "title": "All Elements in Two Binary Search Trees",
      "url": "https://leetcode.com/problems/all-elements-in-two-binary-search-trees/",
      "difficulty": "MEDIUM"
    }
  ],
  "count-distinct-substrings": [
    {
      "platform": "LEETCODE",
      "title": "Count Unique Characters of All Substrings of a Given String",
      "url": "https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/",
      "difficulty": "HARD"
    }
  ]
}
