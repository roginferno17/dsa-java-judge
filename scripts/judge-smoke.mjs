/**
 * End-to-end smoke test for /api/execute.
 *
 * Exercises the real HTTP route, the sandbox, and the Java harness together.
 * Requires the dev server to be running:  npm run dev
 *
 *   node scripts/judge-smoke.mjs [baseUrl]
 */

const BASE = process.argv[2] || "http://127.0.0.1:3000"
let pass = 0
let fail = 0

const post = async (body) => {
  const res = await fetch(`${BASE}/api/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  let json = null
  try {
    json = await res.json()
  } catch {
    /* non-JSON body */
  }
  return { httpStatus: res.status, ...(json || {}) }
}

const check = (name, ok, detail = "") => {
  if (ok) {
    pass++
    console.log(`  PASS  ${name}${detail ? `  ${detail}` : ""}`)
  } else {
    fail++
    console.log(`  FAIL  ${name}${detail ? `  ${detail}` : ""}`)
  }
}

const fn = (over) => ({
  executionMode: "FUNCTION",
  className: "Solution",
  ...over,
})

// ---------------------------------------------------------------------------

console.log("End-to-end judge smoke test")
console.log("===========================")

// 1. correct and incorrect verdicts
{
  const base = fn({
    methodName: "twoSum",
    parameters: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returnType: "int[]",
    comparison: { orderMatters: false },
    testCases: [
      { inputs: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1] },
      { inputs: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2] },
    ],
  })

  const good = await post({
    ...base,
    code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++)
            for (int j = i + 1; j < nums.length; j++)
                if (nums[i] + nums[j] == target) return new int[]{i, j};
        return new int[0];
    }
}`,
  })
  check("two-sum correct", good.status === "ACCEPTED", `-> ${good.status} ${good.passed}/${good.total}`)

  const bad = await post({
    ...base,
    code: `class Solution {
    public int[] twoSum(int[] nums, int target) { return new int[]{0, 0}; }
}`,
  })
  check(
    "two-sum wrong answer reports real values",
    bad.status === "WRONG_ANSWER" && bad.results?.[0]?.expected === "[0, 1]",
    `-> ${bad.status}, expected="${bad.results?.[0]?.expected}" actual="${bad.results?.[0]?.actual}"`
  )
}

// 2. void / in-place -- impossible to pass before this change
{
  const r = await post(
    fn({
      methodName: "sortColors",
      parameters: [{ name: "nums", type: "int[]" }],
      returnType: "void",
      mutatedArgIndex: 0,
      testCases: [{ inputs: { nums: [2, 0, 2, 1, 1, 0] }, expectedOutput: [0, 0, 1, 1, 2, 2] }],
      code: `class Solution {
    public void sortColors(int[] nums) {
        int lo = 0, mid = 0, hi = nums.length - 1;
        while (mid <= hi) {
            if (nums[mid] == 0) { int t = nums[lo]; nums[lo++] = nums[mid]; nums[mid++] = t; }
            else if (nums[mid] == 1) mid++;
            else { int t = nums[hi]; nums[hi--] = nums[mid]; nums[mid] = t; }
        }
    }
}`,
    })
  )
  check("void in-place (sort-012)", r.status === "ACCEPTED", `-> ${r.status}`)
}

// 3. debug printing must not corrupt the verdict
{
  const r = await post(
    fn({
      methodName: "add",
      parameters: [
        { name: "a", type: "int" },
        { name: "b", type: "int" },
      ],
      returnType: "int",
      testCases: [{ inputs: { a: 2, b: 3 }, expectedOutput: 5 }],
      code: `class Solution {
    public int add(int a, int b) {
        System.out.println("tracing a=" + a);
        return a + b;
    }
}`,
    })
  )
  check(
    "System.out.println survives and is captured",
    r.status === "ACCEPTED" && (r.stdout || "").includes("tracing a=2"),
    `-> ${r.status}, stdout=${JSON.stringify((r.stdout || "").trim())}`
  )
}

// 4. time limit
{
  const t0 = Date.now()
  const r = await post(
    fn({
      methodName: "spin",
      parameters: [{ name: "n", type: "int" }],
      returnType: "int",
      timeoutMs: 3000,
      testCases: [{ inputs: { n: 1 }, expectedOutput: 1 }],
      code: `class Solution {
    public int spin(int n) { while (true) { n++; } }
}`,
    })
  )
  check(
    "infinite loop -> TIME_LIMIT_EXCEEDED",
    r.status === "TIME_LIMIT_EXCEEDED",
    `-> ${r.status} in ${Date.now() - t0}ms`
  )
}

// 5. a slow-but-legal solution must NOT be a false TLE.
//    Compilation used to be charged against the time limit, so this was the bug.
{
  const r = await post(
    fn({
      methodName: "slow",
      parameters: [{ name: "n", type: "int" }],
      returnType: "long",
      timeoutMs: 5000,
      testCases: [{ inputs: { n: 1 }, expectedOutput: 1 }],
      code: `class Solution {
    public long slow(int n) {
        long x = 0;
        for (long i = 0; i < 1200000000L; i++) x += i % 7;
        return 1;
    }
}`,
    })
  )
  check(
    "slow-but-under-limit solution is not a false TLE",
    r.status === "ACCEPTED",
    `-> ${r.status} (judged run took ${r.executionTimeMs}ms, compile excluded)`
  )
}

// 6. memory limit is real now (-Xmx was never passed before)
{
  const r = await post(
    fn({
      methodName: "hog",
      parameters: [{ name: "n", type: "int" }],
      returnType: "int",
      memoryLimitMb: 64,
      timeoutMs: 10000,
      testCases: [{ inputs: { n: 1 }, expectedOutput: 1 }],
      code: `import java.util.*;
class Solution {
    public int hog(int n) {
        List<long[]> keep = new ArrayList<>();
        while (true) keep.add(new long[1024 * 1024]);
    }
}`,
    })
  )
  check(
    "runaway allocation -> MEMORY_LIMIT_EXCEEDED",
    r.status === "MEMORY_LIMIT_EXCEEDED",
    `-> ${r.status}`
  )
}

// 7. compiler errors get a plain-English hint
{
  const r = await post(
    fn({
      methodName: "f",
      parameters: [{ name: "n", type: "int" }],
      returnType: "int",
      testCases: [{ inputs: { n: 1 }, expectedOutput: 1 }],
      code: `class Solution {
    public int f(int n) {
        int x = "not a number";
        return x;
    }
}`,
    })
  )
  check(
    "compile error carries a beginner hint",
    r.status === "COMPILATION_ERROR" && /incompatible types/.test(r.error || ""),
    `-> ${(r.error || "").split("\n")[0]}`
  )
}

// 8. injection / traversal via className
{
  for (const bad of ['A"; calc; "', "../../pwned", "Solution;rm -rf /"]) {
    const r = await post(
      fn({
        className: bad,
        methodName: "f",
        parameters: [],
        returnType: "int",
        testCases: [{ inputs: {}, expectedOutput: 1 }],
        code: "class Solution { public int f() { return 1; } }",
      })
    )
    check(`className ${JSON.stringify(bad)} rejected`, r.httpStatus === 400, `-> HTTP ${r.httpStatus}`)
  }
}

// 9. hidden cases must not leak their input or expected value
{
  const r = await post(
    fn({
      methodName: "dbl",
      parameters: [{ name: "n", type: "int" }],
      returnType: "int",
      testCases: [
        { inputs: { n: 2 }, expectedOutput: 4 },
        { inputs: { n: 21 }, expectedOutput: 42, isHidden: true },
      ],
      code: "class Solution { public int dbl(int n) { return n * 2; } }",
    })
  )
  const hidden = r.results?.find((x) => x.hidden)
  check(
    "hidden case reports a verdict without leaking values",
    r.status === "ACCEPTED" &&
      hidden &&
      hidden.input === "Hidden" &&
      hidden.expected === "Hidden" &&
      !JSON.stringify(r.results).includes("21"),
    `-> ${JSON.stringify(hidden)}`
  )
}

// 10. the cleanup race: intermittent, so one pass proves nothing
{
  const body = fn({
    methodName: "id",
    parameters: [{ name: "n", type: "int" }],
    returnType: "int",
    testCases: [{ inputs: { n: 7 }, expectedOutput: 7 }],
    code: "class Solution { public int id(int n) { return n; } }",
  })
  const runs = await Promise.all(Array.from({ length: 20 }, () => post(body)))
  const bad = runs.filter((r) => r.status !== "ACCEPTED")
  const notFound = runs.filter((r) => /not found/i.test(r.error || ""))
  check(
    "20 consecutive runs, none lost to the cleanup race",
    bad.length === 0,
    `-> ${runs.length - bad.length}/20 ACCEPTED, ${notFound.length} "class not found"`
  )
  if (bad.length) console.log("        first failure:", JSON.stringify(bad[0]).slice(0, 300))
}

console.log("\n===========================")
console.log(`passed: ${pass}   failed: ${fail}`)
process.exit(fail === 0 ? 0 : 1)
