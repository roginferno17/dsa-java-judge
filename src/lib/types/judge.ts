export type JavaType =
  | "int"
  | "long"
  | "double"
  | "float"
  | "boolean"
  | "char"
  | "String"
  | "int[]"
  | "long[]"
  | "double[]"
  | "boolean[]"
  | "char[]"
  | "String[]"
  | "int[][]"
  | "char[][]"
  | "String[][]"
  | "boolean[][]"
  | "double[][]"
  | "List<Integer>"
  | "List<Long>"
  | "List<Double>"
  | "List<Boolean>"
  | "List<Character>"
  | "List<String>"
  | "List<List<Integer>>"
  | "List<List<String>>"
  | "ListNode"
  | "ListNodeCyclic"
  | "ListNodeNested"
  | "ListNodeRandom"
  | "DoublyListNode"
  | "TreeNode"
  | "void"

export interface ParameterDefinition {
  name: string
  type: JavaType | string
}

export interface ComparisonConfig {
  type?: "scalar" | "array" | "deep_array" | "list" | "linked_list" | "tree"
  /** false when any permutation is acceptable, e.g. Two Sum index pairs. */
  orderMatters?: boolean
}

export interface StructuredTestCase {
  id?: number
  /** Either { nums: [...], target: 9 } or a positional [[...], 9]. */
  inputs: Record<string, unknown> | unknown[]
  expectedOutput: unknown
  explanation?: string
  /** Hidden cases run on Submit only, and never reveal their input or expected value. */
  isHidden?: boolean
}

/** Authored teaching content. Absent fields render nothing -- never synthesised. */
export interface ProblemLearnContent {
  intuition: string
  approach: string[]
  bruteForce?: { idea: string; time: string; space: string }
  optimal: { idea: string; time: string; space: string }
  pitfalls?: string[]
  /** Java classes/methods this problem needs, linking into the Java syntax track. */
  javaToolkit?: string[]
}

export interface ProblemMetadata {
  slug: string
  title: string
  description?: string
  constraints?: string[]
  className: string
  methodName: string
  parameters: ParameterDefinition[]
  returnType: JavaType | string
  /**
   * For void / in-place problems: which argument holds the answer after the call.
   * The judge compares that argument against its own declared type.
   */
  mutatedArgIndex?: number
  comparison?: ComparisonConfig
  starterCode: string
  sampleTestCases: StructuredTestCase[]
  hiddenTestCases?: StructuredTestCase[]
  learn?: ProblemLearnContent
}

export type ExecutionMode = "FUNCTION" | "STDIO"

export interface FunctionExecutionRequest {
  code: string
  className?: string
  methodName: string
  parameters: ParameterDefinition[]
  returnType: string
  mutatedArgIndex?: number
  comparison?: ComparisonConfig
  testCases: StructuredTestCase[]
  timeoutMs?: number
  memoryLimitMb?: number
  stopOnFirstFailure?: boolean
}

export interface TestResultItem {
  id?: number
  passed: boolean
  /** Hidden cases show a verdict only; input/expected/actual are withheld in the UI. */
  hidden?: boolean
  input: string
  expected: string
  actual: string
  error?: string
  executionTimeMs?: number
}

export type JudgeStatus =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "COMPILATION_ERROR"
  | "RUNTIME_ERROR"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"

export interface JudgeExecutionResult {
  status: JudgeStatus
  passed: number
  total: number
  results: TestResultItem[]
  executionTimeMs: number
  memoryUsedMb?: number
  /** Anything the solution printed with System.out, captured away from the verdict. */
  stdout?: string
  stderr?: string
  error?: string
}
