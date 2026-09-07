#!/usr/bin/env bash
# Standalone smoke test for the Java harness.
# Compiles __Driver__ once, then runs each fixture and checks the emitted verdict.
# Usage: bash scripts/driver-smoke.sh
set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="${TMPDIR:-/tmp}/judge-smoke-$$"
SENTINEL="__JUDGE_RESULT__"
PASS=0
FAIL=0

mkdir -p "$WORK"
cp "$ROOT/src/lib/executor/java/__Driver__.java" "$WORK/"
( cd "$WORK" && javac __Driver__.java 2>&1 ) || { echo "driver failed to compile"; exit 1; }

# run_case <name> <expected-status> <solution-java> <testcases-json>
run_case() {
  local name="$1" want="$2" sol="$3" json="$4"
  local dir="$WORK/case"
  rm -rf "$dir"; mkdir -p "$dir"
  cp "$WORK"/*.class "$dir/"
  printf '%s' "$sol"  > "$dir/Solution.java"
  printf '%s' "$json" > "$dir/__testcases__.json"

  if ! ( cd "$dir" && javac -cp . Solution.java 2>"$dir/javac.err" ); then
    if [ "$want" = "COMPILATION_ERROR" ]; then
      echo "  PASS  $name (javac rejected as expected)"; PASS=$((PASS+1)); return
    fi
    echo "  FAIL  $name -- solution did not compile:"; sed 's/^/        /' "$dir/javac.err"
    FAIL=$((FAIL+1)); return
  fi

  local out got
  out="$( cd "$dir" && java -Xmx256m -cp . __Driver__ 2>&1 )"
  local verdict="${out##*$SENTINEL}"
  got="$(printf '%s' "$verdict" | sed -n 's/.*"status":"\([A-Z_]*\)".*/\1/p')"

  if [ "$got" = "$want" ]; then
    echo "  PASS  $name -> $got"; PASS=$((PASS+1))
  else
    echo "  FAIL  $name -> got '${got:-<none>}', want '$want'"
    printf '%s\n' "$verdict" | head -c 600 | sed 's/^/        /'; echo
    FAIL=$((FAIL+1))
  fi
  LAST_VERDICT="$verdict"
  LAST_RAW="$out"
}

echo "Java harness smoke test"
echo "======================="

# --- 1. baseline: int[] with orderMatters:false -----------------------------
run_case "two-sum correct" ACCEPTED \
'class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++)
            for (int j = i + 1; j < nums.length; j++)
                if (nums[i] + nums[j] == target) return new int[]{i, j};
        return new int[0];
    }
}' \
'{"className":"Solution","methodName":"twoSum","parameterTypes":["int[]","int"],"returnType":"int[]","orderMatters":false,
  "testCases":[{"inputs":[[2,7,11,15],9],"expected":[0,1],"inputDisplay":"nums = [2,7,11,15], target = 9"},
               {"inputs":[[3,2,4],6],"expected":[1,2],"inputDisplay":"nums = [3,2,4], target = 6"}]}'

run_case "two-sum wrong answer" WRONG_ANSWER \
'class Solution {
    public int[] twoSum(int[] nums, int target) { return new int[]{0, 0}; }
}' \
'{"className":"Solution","methodName":"twoSum","parameterTypes":["int[]","int"],"returnType":"int[]","orderMatters":false,
  "testCases":[{"inputs":[[2,7,11,15],9],"expected":[0,1],"inputDisplay":"x"}]}'

# --- 2. void / in-place (impossible before this change) ---------------------
run_case "sort-012 void in-place" ACCEPTED \
'class Solution {
    public void sortColors(int[] nums) {
        int lo = 0, mid = 0, hi = nums.length - 1;
        while (mid <= hi) {
            if (nums[mid] == 0) { int t = nums[lo]; nums[lo++] = nums[mid]; nums[mid++] = t; }
            else if (nums[mid] == 1) mid++;
            else { int t = nums[hi]; nums[hi--] = nums[mid]; nums[mid] = t; }
        }
    }
}' \
'{"className":"Solution","methodName":"sortColors","parameterTypes":["int[]"],"returnType":"void","mutatedArgIndex":0,"orderMatters":true,
  "testCases":[{"inputs":[[2,0,2,1,1,0]],"expected":[0,0,1,1,2,2],"inputDisplay":"nums = [2,0,2,1,1,0]"},
               {"inputs":[[2,0,1]],"expected":[0,1,2],"inputDisplay":"nums = [2,0,1]"}]}'

run_case "void in-place detects a wrong answer" WRONG_ANSWER \
'class Solution {
    public void sortColors(int[] nums) { /* deliberately does nothing */ }
}' \
'{"className":"Solution","methodName":"sortColors","parameterTypes":["int[]"],"returnType":"void","mutatedArgIndex":0,
  "testCases":[{"inputs":[[2,0,1]],"expected":[0,1,2],"inputDisplay":"x"}]}'

run_case "void mutating arg 1, not arg 0" ACCEPTED \
'class Solution {
    public void merge(int[] a, int m, int[] b, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (j >= 0) a[k--] = (i >= 0 && a[i] > b[j]) ? a[i--] : b[j--];
    }
}' \
'{"className":"Solution","methodName":"merge","parameterTypes":["int[]","int","int[]","int"],"returnType":"void","mutatedArgIndex":0,
  "testCases":[{"inputs":[[1,2,3,0,0,0],3,[2,5,6],3],"expected":[1,2,2,3,5,6],"inputDisplay":"x"}]}'

# --- 3. return types that always failed before ------------------------------
run_case "char[] return" ACCEPTED \
'class Solution {
    public char[] reverse(char[] s) {
        for (int i = 0, j = s.length - 1; i < j; i++, j--) { char t = s[i]; s[i] = s[j]; s[j] = t; }
        return s;
    }
}' \
'{"className":"Solution","methodName":"reverse","parameterTypes":["char[]"],"returnType":"char[]",
  "testCases":[{"inputs":[["h","e","l","l","o"]],"expected":["o","l","l","e","h"],"inputDisplay":"x"}]}'

run_case "List<String> return" ACCEPTED \
'import java.util.*;
class Solution {
    public List<String> pick(String[] xs) { return new ArrayList<>(Arrays.asList(xs)); }
}' \
'{"className":"Solution","methodName":"pick","parameterTypes":["String[]"],"returnType":"List<String>",
  "testCases":[{"inputs":[["ab","cd"]],"expected":["ab","cd"],"inputDisplay":"x"}]}'

run_case "List<List<String>> return" ACCEPTED \
'import java.util.*;
class Solution {
    public List<List<String>> group(List<List<String>> in) { return in; }
}' \
'{"className":"Solution","methodName":"group","parameterTypes":["List<List<String>>"],"returnType":"List<List<String>>",
  "testCases":[{"inputs":[[["a","b"],["c"]]],"expected":[["a","b"],["c"]],"inputDisplay":"x"}]}'

run_case "TreeNode return" ACCEPTED \
'class Solution {
    public TreeNode invert(TreeNode root) {
        if (root == null) return null;
        TreeNode t = root.left; root.left = root.right; root.right = t;
        invert(root.left); invert(root.right);
        return root;
    }
}' \
'{"className":"Solution","methodName":"invert","parameterTypes":["TreeNode"],"returnType":"TreeNode",
  "testCases":[{"inputs":[[4,2,7,1,3,6,9]],"expected":[4,7,2,9,6,3,1],"inputDisplay":"x"}]}'

run_case "ListNode return" ACCEPTED \
'class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        while (head != null) { ListNode n = head.next; head.next = prev; prev = head; head = n; }
        return prev;
    }
}' \
'{"className":"Solution","methodName":"reverseList","parameterTypes":["ListNode"],"returnType":"ListNode",
  "testCases":[{"inputs":[[1,2,3]],"expected":[3,2,1],"inputDisplay":"x"}]}'

run_case "ListNode null head vs expected []" ACCEPTED \
'class Solution {
    public ListNode reverseList(ListNode head) { return head; }
}' \
'{"className":"Solution","methodName":"reverseList","parameterTypes":["ListNode"],"returnType":"ListNode",
  "testCases":[{"inputs":[[]],"expected":[],"inputDisplay":"empty"}]}'

run_case "double[] return" ACCEPTED \
'class Solution {
    public double[] halve(int[] xs) {
        double[] r = new double[xs.length];
        for (int i = 0; i < xs.length; i++) r[i] = xs[i] / 2.0;
        return r;
    }
}' \
'{"className":"Solution","methodName":"halve","parameterTypes":["int[]"],"returnType":"double[]",
  "testCases":[{"inputs":[[1,3]],"expected":[0.5,1.5],"inputDisplay":"x"}]}'

run_case "boolean[][] round trip" ACCEPTED \
'class Solution {
    public boolean[][] pass(boolean[][] g) { return g; }
}' \
'{"className":"Solution","methodName":"pass","parameterTypes":["boolean[][]"],"returnType":"boolean[][]",
  "testCases":[{"inputs":[[[true,false],[false,true]]],"expected":[[true,false],[false,true]],"inputDisplay":"x"}]}'

run_case "char[][] grid round trip" ACCEPTED \
'class Solution {
    public char[][] pass(char[][] g) { return g; }
}' \
'{"className":"Solution","methodName":"pass","parameterTypes":["char[][]"],"returnType":"char[][]",
  "testCases":[{"inputs":[[["X","O"],["O","X"]]],"expected":[["X","O"],["O","X"]],"inputDisplay":"x"}]}'

# --- 4. exponent parsing (1e-5 threw before) --------------------------------
run_case "1e-5 in test data parses" ACCEPTED \
'class Solution {
    public double id(double x) { return x; }
}' \
'{"className":"Solution","methodName":"id","parameterTypes":["double"],"returnType":"double",
  "testCases":[{"inputs":[1e-5],"expected":1e-5,"inputDisplay":"x = 1e-5"}]}'

# --- 5. debug printing must not corrupt the verdict -------------------------
run_case "System.out.println does not break the run" ACCEPTED \
'class Solution {
    public int add(int a, int b) {
        System.out.println("debug: a=" + a + " b=" + b);
        System.out.println("{\"status\":\"HACKED\"}");
        return a + b;
    }
}' \
'{"className":"Solution","methodName":"add","parameterTypes":["int","int"],"returnType":"int",
  "testCases":[{"inputs":[2,3],"expected":5,"inputDisplay":"x"}]}'
echo "        captured stdout: $(printf '%s' "${LAST_VERDICT:-}" | sed -n 's/.*"stdout":"\([^"]*\)".*/\1/p' | head -c 90)"

# --- 6. error reporting -----------------------------------------------------
run_case "runtime exception" RUNTIME_ERROR \
'class Solution {
    public int boom(int[] nums) { return nums[99]; }
}' \
'{"className":"Solution","methodName":"boom","parameterTypes":["int[]"],"returnType":"int",
  "testCases":[{"inputs":[[1,2,3]],"expected":1,"inputDisplay":"x"}]}'
echo "        error said: $(printf '%s' "${LAST_VERDICT:-}" | sed -n 's/.*"error":"\([^"]*\)".*/\1/p' | head -c 120)"

run_case "wrong method name is diagnosed" RUNTIME_ERROR \
'class Solution {
    public int somethingElse(int[] nums) { return 1; }
}' \
'{"className":"Solution","methodName":"expectedName","parameterTypes":["int[]"],"returnType":"int",
  "testCases":[{"inputs":[[1]],"expected":1,"inputDisplay":"x"}]}'

run_case "unbounded recursion is named" RUNTIME_ERROR \
'class Solution {
    public int f(int n) { return f(n + 1); }
}' \
'{"className":"Solution","methodName":"f","parameterTypes":["int"],"returnType":"int",
  "testCases":[{"inputs":[1],"expected":1,"inputDisplay":"x"}]}'
echo "        error said: $(printf '%s' "${LAST_VERDICT:-}" | sed -n 's/.*"error":"\([^"]*\)".*/\1/p' | head -c 120)"

echo
echo "======================="
echo "passed: $PASS   failed: $FAIL"
rm -rf "$WORK"
[ "$FAIL" -eq 0 ]
