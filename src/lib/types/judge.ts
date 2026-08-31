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
  | "List<Integer>"
  | "List<Long>"
  | "List<String>"
  | "List<List<Integer>>"
  | "List<List<String>>"
  | "ListNode"
  | "TreeNode"
  | "void"

export interface ParameterDefinition {
  name: string
  type: JavaType | string
}

export interface ComparisonConfig {
  type?: "scalar" | "array" | "deep_array" | "list" | "linked_list" | "tree"
  orderMatters?: boolean // e.g. false for Two Sum / permutations if order of elements does not matter
}

export interface StructuredTestCase {
  id?: number
  inputs: Record<string, any> | any[] // e.g. { nums: [2,7,11,15], target: 9 } or [[2,7,11,15], 9]
  expectedOutput: any // e.g. [0, 1] or true or 42
  explanation?: string
  isHidden?: boolean
}

export interface ProblemMetadata {
  slug: string
  title: string
  className: string // Default "Solution"
  methodName: string
  parameters: ParameterDefinition[]
  returnType: JavaType | string
  comparison?: ComparisonConfig
  starterCode: string
  sampleTestCases: StructuredTestCase[]
  hiddenTestCases?: StructuredTestCase[]
}

export type ExecutionMode = "FUNCTION" | "STDIO"

export interface FunctionExecutionRequest {
  code: string
  className?: string
  methodName: string
  parameters: ParameterDefinition[]
  returnType: string
  comparison?: ComparisonConfig
  testCases: StructuredTestCase[]
  timeoutMs?: number
  memoryLimitMb?: number
}

export interface TestResultItem {
  id?: number
  passed: boolean
  input: string
  expected: string
  actual: string
  error?: string
  executionTimeMs?: number
}

export interface JudgeExecutionResult {
  status:
    | "ACCEPTED"
    | "WRONG_ANSWER"
    | "COMPILATION_ERROR"
    | "RUNTIME_ERROR"
    | "TIME_LIMIT_EXCEEDED"
    | "MEMORY_LIMIT_EXCEEDED"
  passed: number
  total: number
  results: TestResultItem[]
  executionTimeMs: number
  memoryUsedMb?: number
  stdout?: string
  stderr?: string
  error?: string
}
