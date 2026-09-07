import java.io.*;
import java.lang.reflect.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

// ============================================================
// Standard DSA helper structures, visible to user solutions.
// ============================================================
class ListNode {
    public int val;
    public ListNode next;
    /** Used by flattening problems, where each node heads a sorted sub-list. */
    public ListNode bottom;
    /** Used by deep-copy problems; points anywhere in the list, or is null. */
    public ListNode random;
    public ListNode() {}
    public ListNode(int val) { this.val = val; }
    public ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

/** Doubly linked list node. Step 6 needs prev as well as next. */
class DoublyListNode {
    public int val;
    public DoublyListNode next;
    public DoublyListNode prev;
    public DoublyListNode() {}
    public DoublyListNode(int val) { this.val = val; }
    public DoublyListNode(int val, DoublyListNode prev, DoublyListNode next) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode() {}
    public TreeNode(int val) { this.val = val; }
    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Universal reflection test harness.
 *
 * Reads __testcases__.json, invokes the user's method once per case, and emits a
 * single JSON verdict on stdout prefixed by RESULT_SENTINEL.
 *
 * Anything the user prints with System.out goes to a capture buffer instead and is
 * returned under "stdout", so a debug println can never corrupt the verdict JSON.
 */
public class __Driver__ {

    /** Verdict marker. The Node side splits on this; everything before it is user output. */
    static final String RESULT_SENTINEL = "__JUDGE_RESULT__";

    /** Cap captured output so a runaway print loop can't exhaust memory. */
    static final int MAX_CAPTURED_OUTPUT = 64 * 1024;

    static PrintStream realOut;
    static ByteArrayOutputStream captureBuffer;

    public static void main(String[] args) {
        realOut = System.out;
        captureBuffer = new ByteArrayOutputStream();

        try {
            String content = readFile(new File("__testcases__.json"));
            SimpleJson.JsonObject config = SimpleJson.parse(content).asObject();

            String className = config.getString("className", "Solution");
            String methodName = config.getString("methodName", "solve");
            String returnType = config.getString("returnType", "int[]");
            boolean orderMatters = config.getBoolean("orderMatters", true);
            int mutatedArgIndex = (int) config.getNumber("mutatedArgIndex", 0);
            boolean stopOnFirstFailure = config.getBoolean("stopOnFirstFailure", false);

            List<String> paramTypes = new ArrayList<>();
            for (SimpleJson.JsonValue pv : config.getArray("parameterTypes").values) {
                paramTypes.add(pv.asString());
            }
            SimpleJson.JsonArray testCases = config.getArray("testCases");

            Class<?> clazz;
            try {
                clazz = Class.forName(className);
            } catch (ClassNotFoundException e) {
                emitError("Class '" + className + "' not found. Your class must be named '"
                        + className + "'.", "COMPILATION_ERROR");
                return;
            }

            Method targetMethod = findMethod(clazz, methodName, paramTypes);
            if (targetMethod == null) {
                emitError(buildMethodNotFoundError(clazz, methodName, paramTypes), "RUNTIME_ERROR");
                return;
            }
            targetMethod.setAccessible(true);

            // For void methods the answer is an argument mutated in place; compare it
            // against its own declared type rather than against "void".
            boolean isVoid = "void".equals(returnType) || targetMethod.getReturnType() == void.class;
            String effectiveType = returnType;
            if (isVoid && mutatedArgIndex >= 0 && mutatedArgIndex < paramTypes.size()) {
                effectiveType = paramTypes.get(mutatedArgIndex);
            }

            int passedCount = 0;
            int totalCount = testCases.values.size();
            List<String> resultsJson = new ArrayList<>();
            long totalStart = System.currentTimeMillis();
            String runtimeError = null;

            for (int i = 0; i < totalCount; i++) {
                SimpleJson.JsonObject tc = testCases.values.get(i).asObject();
                SimpleJson.JsonArray inputsArr = tc.getArray("inputs");
                SimpleJson.JsonValue expectedVal = tc.get("expected");
                String inputDisplay = tc.getString("inputDisplay", inputsArr.toString());
                boolean hidden = tc.getBoolean("hidden", false);

                Object solutionInstance;
                try {
                    Constructor<?> ctor = clazz.getDeclaredConstructor();
                    ctor.setAccessible(true);
                    solutionInstance = ctor.newInstance();
                } catch (NoSuchMethodException nsme) {
                    emitError("Class '" + className + "' needs a no-argument constructor.",
                            "RUNTIME_ERROR");
                    return;
                }

                Object[] javaArgs = new Object[paramTypes.size()];
                try {
                    for (int p = 0; p < paramTypes.size(); p++) {
                        SimpleJson.JsonValue raw = p < inputsArr.values.size()
                                ? inputsArr.values.get(p)
                                : new SimpleJson.JsonNull();
                        javaArgs[p] = convertToJavaType(raw, paramTypes.get(p));
                    }
                } catch (Exception convEx) {
                    emitError("Could not build arguments for test case " + (i + 1) + ": "
                            + convEx.getMessage(), "RUNTIME_ERROR");
                    return;
                }

                long testStart = System.currentTimeMillis();
                Object actualResult;

                // Capture user prints only around the actual invocation.
                System.setOut(new PrintStream(captureBuffer, true, StandardCharsets.UTF_8));
                try {
                    actualResult = targetMethod.invoke(solutionInstance, javaArgs);
                    if (isVoid) {
                        actualResult = (mutatedArgIndex >= 0 && mutatedArgIndex < javaArgs.length)
                                ? javaArgs[mutatedArgIndex]
                                : null;
                    }
                } catch (InvocationTargetException ite) {
                    System.setOut(realOut);
                    Throwable cause = ite.getCause() != null ? ite.getCause() : ite;
                    // An OOM raised inside the solution arrives wrapped here, so it has
                    // to be unwrapped or it gets misreported as a plain runtime error.
                    if (cause instanceof OutOfMemoryError) {
                        emitError("Out of memory -- the solution allocated more than the memory limit.",
                                "MEMORY_LIMIT_EXCEEDED");
                        return;
                    }
                    runtimeError = formatException(cause, className);
                    resultsJson.add(caseJson(false, hidden, inputDisplay,
                            Canon.of(expectedVal).render(), "Runtime Error",
                            runtimeError, System.currentTimeMillis() - testStart));
                    break;
                } catch (IllegalArgumentException iae) {
                    System.setOut(realOut);
                    emitError(describeArgMismatch(targetMethod, paramTypes, javaArgs), "RUNTIME_ERROR");
                    return;
                } catch (IllegalAccessException iae) {
                    System.setOut(realOut);
                    emitError("Method '" + methodName + "' is not accessible. Make it public.",
                            "RUNTIME_ERROR");
                    return;
                } finally {
                    System.setOut(realOut);
                }

                long testTime = System.currentTimeMillis() - testStart;
                Canon actual = Canon.of(actualResult);
                Canon expected = Canon.of(expectedVal);
                boolean passed = Canon.equal(actual, expected, orderMatters, effectiveType);
                if (passed) passedCount++;

                resultsJson.add(caseJson(passed, hidden, inputDisplay, expected.render(),
                        actual.render(), null, testTime));

                if (!passed && stopOnFirstFailure) break;
            }

            long totalTime = System.currentTimeMillis() - totalStart;
            String status;
            if (runtimeError != null) {
                status = "RUNTIME_ERROR";
            } else if (passedCount == totalCount) {
                status = "ACCEPTED";
            } else {
                status = "WRONG_ANSWER";
            }
            emitResult(status, passedCount, totalCount, resultsJson, totalTime, runtimeError);

        } catch (Throwable t) {
            System.setOut(realOut);
            if (t instanceof StackOverflowError) {
                emitError("Stack overflow -- your recursion never reached its base case.",
                        "RUNTIME_ERROR");
            } else if (t instanceof OutOfMemoryError) {
                emitError("Out of memory -- the solution allocated more than the memory limit.",
                        "MEMORY_LIMIT_EXCEEDED");
            } else {
                StringWriter sw = new StringWriter();
                t.printStackTrace(new PrintWriter(sw));
                emitError("Harness failure: " + t + "\n" + sw, "RUNTIME_ERROR");
            }
        }
        // Don't let a stray non-daemon thread started by user code hang the JVM.
        System.exit(0);
    }

    // ============================================================
    // Canonical value model: normalise both sides, then compare.
    // Replaces the old per-returnType switch, whose default branch fell
    // through to Object.toString() -- an identity hash for arrays.
    // ============================================================
    static class Canon {
        enum Kind { NULL, BOOL, NUM, STR, ARR }

        Kind kind;
        boolean bool;
        double num;
        boolean integral;
        String str;
        List<Canon> items;

        static Canon nul() { Canon c = new Canon(); c.kind = Kind.NULL; return c; }
        static Canon of(boolean b) { Canon c = new Canon(); c.kind = Kind.BOOL; c.bool = b; return c; }
        static Canon of(String s) { Canon c = new Canon(); c.kind = Kind.STR; c.str = s; return c; }
        static Canon num(double d, boolean integral) {
            Canon c = new Canon(); c.kind = Kind.NUM; c.num = d; c.integral = integral; return c;
        }
        static Canon arr(List<Canon> xs) { Canon c = new Canon(); c.kind = Kind.ARR; c.items = xs; return c; }

        /** Normalise an arbitrary Java value produced by the user's method. */
        static Canon of(Object o) {
            if (o == null) return nul();
            if (o instanceof Boolean) return of(((Boolean) o).booleanValue());
            if (o instanceof Character) return of(String.valueOf(((Character) o).charValue()));
            if (o instanceof String) return of((String) o);
            if (o instanceof Integer || o instanceof Long || o instanceof Short || o instanceof Byte) {
                return num(((Number) o).doubleValue(), true);
            }
            if (o instanceof Double || o instanceof Float) {
                return num(((Number) o).doubleValue(), false);
            }
            if (o instanceof ListNode) {
                // Identity-based visited set rather than a counter: a returned list
                // may legitimately still contain a cycle, and walking it forever
                // would hang the judge instead of reporting an answer.
                List<Canon> xs = new ArrayList<>();
                Set<ListNode> seen = Collections.newSetFromMap(new IdentityHashMap<>());
                ListNode cur = (ListNode) o;
                while (cur != null && seen.add(cur)) {
                    xs.add(num(cur.val, true));
                    cur = cur.next;
                }
                return arr(xs);
            }
            if (o instanceof DoublyListNode) {
                List<Canon> xs = new ArrayList<>();
                Set<DoublyListNode> seen = Collections.newSetFromMap(new IdentityHashMap<>());
                DoublyListNode cur = (DoublyListNode) o;
                while (cur != null && seen.add(cur)) {
                    xs.add(num(cur.val, true));
                    cur = cur.next;
                }
                return arr(xs);
            }
            if (o instanceof TreeNode) return arr(levelOrder((TreeNode) o));
            if (o.getClass().isArray()) {
                int n = Array.getLength(o);
                List<Canon> xs = new ArrayList<>(n);
                for (int i = 0; i < n; i++) xs.add(of(Array.get(o, i)));
                return arr(xs);
            }
            if (o instanceof Collection) {
                List<Canon> xs = new ArrayList<>();
                for (Object e : (Collection<?>) o) xs.add(of(e));
                return arr(xs);
            }
            return of(String.valueOf(o));
        }

        /** Normalise an expected value parsed from JSON. */
        static Canon of(SimpleJson.JsonValue v) {
            if (v == null || v instanceof SimpleJson.JsonNull) return nul();
            if (v instanceof SimpleJson.JsonBoolean) return of(v.asBoolean());
            if (v instanceof SimpleJson.JsonString) return of(v.asString());
            if (v instanceof SimpleJson.JsonNumber) {
                double d = v.asNumber();
                return num(d, d == Math.rint(d) && !Double.isInfinite(d));
            }
            if (v instanceof SimpleJson.JsonArray) {
                List<Canon> xs = new ArrayList<>();
                for (SimpleJson.JsonValue e : ((SimpleJson.JsonArray) v).values) xs.add(of(e));
                return arr(xs);
            }
            return of(v.toString());
        }

        static List<Canon> levelOrder(TreeNode root) {
            List<Canon> out = new ArrayList<>();
            if (root == null) return out;
            // LinkedList, not ArrayDeque: null children are enqueued as real
            // placeholders and ArrayDeque forbids null elements.
            Queue<TreeNode> q = new LinkedList<>();
            q.add(root);
            List<TreeNode> seen = new ArrayList<>();
            while (!q.isEmpty()) {
                TreeNode n = q.poll();
                seen.add(n);
                if (n != null) {
                    q.add(n.left);
                    q.add(n.right);
                }
                if (seen.size() > 100000) break;
            }
            for (TreeNode n : seen) out.add(n == null ? nul() : num(n.val, true));
            while (!out.isEmpty() && out.get(out.size() - 1).kind == Kind.NULL) {
                out.remove(out.size() - 1);
            }
            return out;
        }

        /** Human-readable form shown in the results panel. */
        String render() {
            switch (kind) {
                case NULL: return "null";
                case BOOL: return String.valueOf(bool);
                case STR:  return str;
                case NUM:  return integral ? String.valueOf((long) num) : trimDouble(num);
                default:
                    StringBuilder sb = new StringBuilder("[");
                    for (int i = 0; i < items.size(); i++) {
                        if (i > 0) sb.append(", ");
                        Canon it = items.get(i);
                        sb.append(it.kind == Kind.STR ? "\"" + it.str + "\"" : it.render());
                    }
                    return sb.append("]").toString();
            }
        }

        /** Order-independent sort key. */
        String key() { return render(); }

        static String trimDouble(double d) {
            String s = String.valueOf(d);
            return s.endsWith(".0") ? s.substring(0, s.length() - 2) : s;
        }

        static boolean equal(Canon a, Canon b, boolean orderMatters, String type) {
            // A null head and an empty list mean the same thing for linked/tree returns.
            boolean nullish = type != null
                    && (type.contains("ListNode") || type.contains("TreeNode")
                        || type.contains("DoublyListNode"));
            if (nullish) {
                if (a.kind == Kind.NULL && b.kind == Kind.ARR && b.items.isEmpty()) return true;
                if (b.kind == Kind.NULL && a.kind == Kind.ARR && a.items.isEmpty()) return true;
            }
            // char[] vs "abc": accept either spelling.
            if (a.kind == Kind.ARR && b.kind == Kind.STR) return b.str.equals(joinChars(a));
            if (b.kind == Kind.ARR && a.kind == Kind.STR) return a.str.equals(joinChars(b));
            return deepEqual(a, b, orderMatters);
        }

        /** Join an array of single-char strings, or null if it is not one. */
        static String joinChars(Canon arr) {
            StringBuilder sb = new StringBuilder();
            for (Canon c : arr.items) {
                if (c.kind != Kind.STR) return null;
                sb.append(c.str);
            }
            return sb.toString();
        }

        static boolean deepEqual(Canon a, Canon b, boolean orderMatters) {
            if (a.kind != b.kind) {
                // Tolerate 1 vs "1" only where it is unambiguous.
                if (a.kind == Kind.NUM && b.kind == Kind.STR) return a.render().equals(b.str);
                if (b.kind == Kind.NUM && a.kind == Kind.STR) return b.render().equals(a.str);
                return false;
            }
            switch (a.kind) {
                case NULL: return true;
                case BOOL: return a.bool == b.bool;
                case STR:  return a.str.equals(b.str);
                case NUM:
                    if (a.integral && b.integral) return (long) a.num == (long) b.num;
                    return Math.abs(a.num - b.num) < 1e-6;
                default:
                    if (a.items.size() != b.items.size()) return false;
                    List<Canon> xs = a.items, ys = b.items;
                    if (!orderMatters) {
                        xs = new ArrayList<>(xs);
                        ys = new ArrayList<>(ys);
                        Comparator<Canon> byKey = Comparator.comparing(Canon::key);
                        xs.sort(byKey);
                        ys.sort(byKey);
                    }
                    for (int i = 0; i < xs.size(); i++) {
                        // Order only matters at the level the caller asked about.
                        if (!deepEqual(xs.get(i), ys.get(i), true)) return false;
                    }
                    return true;
            }
        }
    }

    // ============================================================
    // Method resolution
    // ============================================================
    private static Method findMethod(Class<?> clazz, String name, List<String> paramTypes) {
        Method fallback = null;
        for (Method m : clazz.getDeclaredMethods()) {
            if (!m.getName().equals(name) || m.getParameterCount() != paramTypes.size()) continue;
            if (matchesSignature(m, paramTypes)) return m;
            if (fallback == null) fallback = m;
        }
        // Same name and arity but types we could not confirm -- better than failing outright.
        return fallback;
    }

    private static boolean matchesSignature(Method m, List<String> paramTypes) {
        Class<?>[] params = m.getParameterTypes();
        for (int i = 0; i < params.length; i++) {
            if (!isTypeCompatible(params[i], paramTypes.get(i))) return false;
        }
        return true;
    }

    private static boolean isTypeCompatible(Class<?> pc, String typeName) {
        switch (typeName) {
            case "int":       return pc == int.class || pc == Integer.class;
            case "long":      return pc == long.class || pc == Long.class;
            case "double":    return pc == double.class || pc == Double.class;
            case "float":     return pc == float.class || pc == Float.class;
            case "boolean":   return pc == boolean.class || pc == Boolean.class;
            case "char":      return pc == char.class || pc == Character.class;
            case "String":    return pc == String.class;
            case "int[]":     return pc == int[].class;
            case "long[]":    return pc == long[].class;
            case "double[]":  return pc == double[].class;
            case "boolean[]": return pc == boolean[].class;
            case "char[]":    return pc == char[].class;
            case "String[]":  return pc == String[].class;
            case "int[][]":     return pc == int[][].class;
            case "char[][]":    return pc == char[][].class;
            case "String[][]":  return pc == String[][].class;
            case "boolean[][]": return pc == boolean[][].class;
            case "double[][]":  return pc == double[][].class;
            case "ListNode":
            case "ListNodeCyclic":
            case "ListNodeNested":
            case "ListNodeRandom":
                return pc.getSimpleName().equals("ListNode");
            case "DoublyListNode":
                return pc.getSimpleName().equals("DoublyListNode");
            case "TreeNode":  return pc.getSimpleName().equals("TreeNode");
            default:
                if (typeName.startsWith("List")) return List.class.isAssignableFrom(pc);
                // Unknown type: do not blanket-accept, or we bind the wrong overload.
                return false;
        }
    }

    private static String buildMethodNotFoundError(Class<?> clazz, String name, List<String> paramTypes) {
        StringBuilder sb = new StringBuilder();
        sb.append("No method '").append(name).append("(");
        for (int i = 0; i < paramTypes.size(); i++) {
            if (i > 0) sb.append(", ");
            sb.append(paramTypes.get(i));
        }
        sb.append(")' in class '").append(clazz.getSimpleName()).append("'.");
        Method[] declared = clazz.getDeclaredMethods();
        if (declared.length == 0) {
            sb.append("\nThe class has no methods yet.");
        } else {
            sb.append("\n\nMethods found:");
            for (Method m : declared) {
                sb.append("\n  ").append(m.getReturnType().getSimpleName()).append(" ")
                  .append(m.getName()).append("(");
                Class<?>[] pts = m.getParameterTypes();
                for (int j = 0; j < pts.length; j++) {
                    if (j > 0) sb.append(", ");
                    sb.append(pts[j].getSimpleName());
                }
                sb.append(")");
            }
            sb.append("\n\nCheck the method name, parameter types and order against the signature above.");
        }
        return sb.toString();
    }

    private static String describeArgMismatch(Method m, List<String> declared, Object[] args) {
        StringBuilder sb = new StringBuilder("Argument type mismatch calling '" + m.getName() + "'.");
        Class<?>[] pts = m.getParameterTypes();
        for (int i = 0; i < pts.length; i++) {
            String got = (i < args.length && args[i] != null)
                    ? args[i].getClass().getSimpleName() : "null";
            String want = pts[i].getSimpleName();
            String spec = i < declared.size() ? declared.get(i) : "?";
            sb.append("\n  parameter ").append(i + 1).append(": your method takes ").append(want)
              .append(", the problem supplies ").append(spec).append(" (built as ").append(got).append(")");
        }
        return sb.toString();
    }

    // ============================================================
    // JSON -> Java argument conversion
    // ============================================================
    private static Object convertToJavaType(SimpleJson.JsonValue val, String typeName) {
        boolean isNull = (val == null || val instanceof SimpleJson.JsonNull);
        if (isNull) {
            switch (typeName) {
                case "int":     return 0;
                case "long":    return 0L;
                case "double":  return 0.0d;
                case "float":   return 0.0f;
                case "boolean": return Boolean.FALSE;
                case "char":    return ' ';
                default:        return null;
            }
        }

        switch (typeName) {
            case "int":     return (int) val.asNumber();
            case "long":    return (long) val.asNumber();
            case "double":  return val.asNumber();
            case "float":   return (float) val.asNumber();
            case "boolean": return val.asBoolean();
            case "char": {
                String s = val.asString();
                return s.isEmpty() ? ' ' : s.charAt(0);
            }
            case "String":  return val.asString();

            case "int[]":     return buildIntArray(val);
            case "long[]": {
                SimpleJson.JsonArray a = val.asArray();
                long[] r = new long[a.values.size()];
                for (int i = 0; i < r.length; i++) r[i] = (long) a.values.get(i).asNumber();
                return r;
            }
            case "double[]": {
                SimpleJson.JsonArray a = val.asArray();
                double[] r = new double[a.values.size()];
                for (int i = 0; i < r.length; i++) r[i] = a.values.get(i).asNumber();
                return r;
            }
            case "boolean[]": {
                SimpleJson.JsonArray a = val.asArray();
                boolean[] r = new boolean[a.values.size()];
                for (int i = 0; i < r.length; i++) r[i] = a.values.get(i).asBoolean();
                return r;
            }
            case "char[]":   return buildCharArray(val);
            case "String[]": {
                SimpleJson.JsonArray a = val.asArray();
                String[] r = new String[a.values.size()];
                for (int i = 0; i < r.length; i++) r[i] = a.values.get(i).asString();
                return r;
            }

            case "int[][]": {
                SimpleJson.JsonArray a = val.asArray();
                int[][] r = new int[a.values.size()][];
                for (int i = 0; i < r.length; i++) r[i] = buildIntArray(a.values.get(i));
                return r;
            }
            case "double[][]": {
                SimpleJson.JsonArray a = val.asArray();
                double[][] r = new double[a.values.size()][];
                for (int i = 0; i < r.length; i++) {
                    SimpleJson.JsonArray s = a.values.get(i).asArray();
                    r[i] = new double[s.values.size()];
                    for (int j = 0; j < r[i].length; j++) r[i][j] = s.values.get(j).asNumber();
                }
                return r;
            }
            case "char[][]": {
                SimpleJson.JsonArray a = val.asArray();
                char[][] r = new char[a.values.size()][];
                for (int i = 0; i < r.length; i++) r[i] = buildCharArray(a.values.get(i));
                return r;
            }
            case "String[][]": {
                SimpleJson.JsonArray a = val.asArray();
                String[][] r = new String[a.values.size()][];
                for (int i = 0; i < r.length; i++) {
                    SimpleJson.JsonArray s = a.values.get(i).asArray();
                    r[i] = new String[s.values.size()];
                    for (int j = 0; j < r[i].length; j++) r[i][j] = s.values.get(j).asString();
                }
                return r;
            }
            case "boolean[][]": {
                SimpleJson.JsonArray a = val.asArray();
                boolean[][] r = new boolean[a.values.size()][];
                for (int i = 0; i < r.length; i++) {
                    SimpleJson.JsonArray s = a.values.get(i).asArray();
                    r[i] = new boolean[s.values.size()];
                    for (int j = 0; j < r[i].length; j++) r[i][j] = s.values.get(j).asBoolean();
                }
                return r;
            }

            case "List<Integer>": {
                List<Integer> r = new ArrayList<>();
                for (SimpleJson.JsonValue e : val.asArray().values) r.add((int) e.asNumber());
                return r;
            }
            case "List<Long>": {
                List<Long> r = new ArrayList<>();
                for (SimpleJson.JsonValue e : val.asArray().values) r.add((long) e.asNumber());
                return r;
            }
            case "List<Double>": {
                List<Double> r = new ArrayList<>();
                for (SimpleJson.JsonValue e : val.asArray().values) r.add(e.asNumber());
                return r;
            }
            case "List<Boolean>": {
                List<Boolean> r = new ArrayList<>();
                for (SimpleJson.JsonValue e : val.asArray().values) r.add(e.asBoolean());
                return r;
            }
            case "List<Character>": {
                List<Character> r = new ArrayList<>();
                for (SimpleJson.JsonValue e : val.asArray().values) {
                    String s = e.asString();
                    r.add(s.isEmpty() ? ' ' : s.charAt(0));
                }
                return r;
            }
            case "List<String>": {
                List<String> r = new ArrayList<>();
                for (SimpleJson.JsonValue e : val.asArray().values) r.add(e.asString());
                return r;
            }
            case "List<List<Integer>>": {
                List<List<Integer>> r = new ArrayList<>();
                for (SimpleJson.JsonValue sub : val.asArray().values) {
                    List<Integer> inner = new ArrayList<>();
                    for (SimpleJson.JsonValue e : sub.asArray().values) inner.add((int) e.asNumber());
                    r.add(inner);
                }
                return r;
            }
            case "List<List<String>>": {
                List<List<String>> r = new ArrayList<>();
                for (SimpleJson.JsonValue sub : val.asArray().values) {
                    List<String> inner = new ArrayList<>();
                    for (SimpleJson.JsonValue e : sub.asArray().values) inner.add(e.asString());
                    r.add(inner);
                }
                return r;
            }

            case "ListNode": {
                SimpleJson.JsonArray a = val.asArray();
                if (a.values.isEmpty()) return null;
                ListNode dummy = new ListNode(0), cur = dummy;
                for (SimpleJson.JsonValue e : a.values) {
                    cur.next = new ListNode((int) e.asNumber());
                    cur = cur.next;
                }
                return dummy.next;
            }
            case "DoublyListNode": {
                SimpleJson.JsonArray a = val.asArray();
                if (a.values.isEmpty()) return null;
                DoublyListNode head = null, tail = null;
                for (SimpleJson.JsonValue e : a.values) {
                    DoublyListNode node = new DoublyListNode((int) e.asNumber());
                    if (head == null) { head = node; tail = node; }
                    else { tail.next = node; node.prev = tail; tail = node; }
                }
                return head;
            }
            case "ListNodeCyclic": {
                // Input shape: [[values...], pos]. pos is the index the tail links
                // back to, or -1 for no cycle. A cycle cannot be expressed as a
                // flat array, which is why this needs its own type.
                SimpleJson.JsonArray outer = val.asArray();
                if (outer.values.isEmpty()) return null;
                SimpleJson.JsonArray vals = outer.values.get(0).asArray();
                int pos = outer.values.size() > 1 ? (int) outer.values.get(1).asNumber() : -1;
                if (vals.values.isEmpty()) return null;
                List<ListNode> nodes = new ArrayList<>();
                ListNode dummy = new ListNode(0), cur = dummy;
                for (SimpleJson.JsonValue e : vals.values) {
                    cur.next = new ListNode((int) e.asNumber());
                    cur = cur.next;
                    nodes.add(cur);
                }
                if (pos >= 0 && pos < nodes.size()) cur.next = nodes.get(pos);
                return dummy.next;
            }
            case "ListNodeNested": {
                // Input shape: [[a,b],[c],[d,e,f]]. Each inner array becomes a
                // bottom-linked column; the column heads are joined by next.
                SimpleJson.JsonArray outer = val.asArray();
                if (outer.values.isEmpty()) return null;
                ListNode head = null, prevHead = null;
                for (SimpleJson.JsonValue col : outer.values) {
                    SimpleJson.JsonArray inner = col.asArray();
                    if (inner.values.isEmpty()) continue;
                    ListNode colHead = null, colCur = null;
                    for (SimpleJson.JsonValue e : inner.values) {
                        ListNode node = new ListNode((int) e.asNumber());
                        if (colHead == null) { colHead = node; colCur = node; }
                        else { colCur.bottom = node; colCur = node; }
                    }
                    if (head == null) head = colHead;
                    else prevHead.next = colHead;
                    prevHead = colHead;
                }
                return head;
            }
            case "ListNodeRandom": {
                // Input shape: [[val, randomIndex], ...] with -1 meaning null.
                SimpleJson.JsonArray outer = val.asArray();
                if (outer.values.isEmpty()) return null;
                List<ListNode> nodes = new ArrayList<>();
                for (SimpleJson.JsonValue pair : outer.values) {
                    nodes.add(new ListNode((int) pair.asArray().values.get(0).asNumber()));
                }
                for (int i = 0; i < nodes.size(); i++) {
                    if (i + 1 < nodes.size()) nodes.get(i).next = nodes.get(i + 1);
                    SimpleJson.JsonArray pair = outer.values.get(i).asArray();
                    int r = pair.values.size() > 1 ? (int) pair.values.get(1).asNumber() : -1;
                    if (r >= 0 && r < nodes.size()) nodes.get(i).random = nodes.get(r);
                }
                return nodes.get(0);
            }
            case "TreeNode": {
                SimpleJson.JsonArray a = val.asArray();
                if (a.values.isEmpty() || a.values.get(0) instanceof SimpleJson.JsonNull) return null;
                TreeNode root = new TreeNode((int) a.values.get(0).asNumber());
                Deque<TreeNode> q = new ArrayDeque<>();
                q.add(root);
                int idx = 1;
                while (!q.isEmpty() && idx < a.values.size()) {
                    TreeNode cur = q.poll();
                    if (idx < a.values.size()) {
                        SimpleJson.JsonValue lv = a.values.get(idx++);
                        if (!(lv instanceof SimpleJson.JsonNull)) {
                            cur.left = new TreeNode((int) lv.asNumber());
                            q.add(cur.left);
                        }
                    }
                    if (idx < a.values.size()) {
                        SimpleJson.JsonValue rv = a.values.get(idx++);
                        if (!(rv instanceof SimpleJson.JsonNull)) {
                            cur.right = new TreeNode((int) rv.asNumber());
                            q.add(cur.right);
                        }
                    }
                }
                return root;
            }
            default:
                throw new IllegalArgumentException("Unsupported parameter type '" + typeName + "'");
        }
    }

    private static int[] buildIntArray(SimpleJson.JsonValue v) {
        SimpleJson.JsonArray a = v.asArray();
        int[] r = new int[a.values.size()];
        for (int i = 0; i < r.length; i++) r[i] = (int) a.values.get(i).asNumber();
        return r;
    }

    private static char[] buildCharArray(SimpleJson.JsonValue v) {
        // Accept both ["a","b"] and "ab".
        if (v instanceof SimpleJson.JsonString) return v.asString().toCharArray();
        SimpleJson.JsonArray a = v.asArray();
        char[] r = new char[a.values.size()];
        for (int i = 0; i < r.length; i++) {
            String s = a.values.get(i).asString();
            r[i] = s.isEmpty() ? ' ' : s.charAt(0);
        }
        return r;
    }

    // ============================================================
    // Output
    // ============================================================
    private static String formatException(Throwable t, String userClassName) {
        String msg = t.getClass().getSimpleName();
        if (t.getMessage() != null) msg += ": " + t.getMessage();

        if (t instanceof IndexOutOfBoundsException) {
            msg += "\nYou read or wrote past the end of an array or list. Check your loop bounds.";
        } else if (t instanceof NullPointerException) {
            msg += "\nSomething was null when you used it -- check objects you never assigned.";
        } else if (t instanceof ArithmeticException) {
            msg += "\nUsually a division or modulo by zero.";
        } else if (t instanceof NumberFormatException) {
            msg += "\nA string could not be parsed as a number.";
        } else if (t instanceof ClassCastException) {
            msg += "\nAn object was cast to a type it is not.";
        }

        for (StackTraceElement el : t.getStackTrace()) {
            if (el.getClassName().equals(userClassName)
                    || el.getClassName().startsWith(userClassName + "$")) {
                msg += "\n    at " + el.getClassName() + "." + el.getMethodName()
                     + " (line " + el.getLineNumber() + ")";
                break;
            }
        }
        return msg;
    }

    private static String caseJson(boolean passed, boolean hidden, String input, String expected,
                                   String actual, String error, long ms) {
        StringBuilder sb = new StringBuilder("{");
        sb.append("\"passed\":").append(passed);
        sb.append(",\"hidden\":").append(hidden);
        sb.append(",\"input\":").append(esc(input));
        sb.append(",\"expected\":").append(esc(expected));
        sb.append(",\"actual\":").append(esc(actual));
        if (error != null) sb.append(",\"error\":").append(esc(error));
        sb.append(",\"executionTimeMs\":").append(ms);
        return sb.append("}").toString();
    }

    private static void emitResult(String status, int passed, int total, List<String> results,
                                   long timeMs, String error) {
        StringBuilder sb = new StringBuilder("{");
        sb.append("\"status\":\"").append(status).append("\"");
        sb.append(",\"passed\":").append(passed);
        sb.append(",\"total\":").append(total);
        sb.append(",\"executionTimeMs\":").append(timeMs);
        if (error != null) sb.append(",\"error\":").append(esc(error));
        sb.append(",\"stdout\":").append(esc(capturedOutput()));
        sb.append(",\"results\":[");
        for (int i = 0; i < results.size(); i++) {
            if (i > 0) sb.append(",");
            sb.append(results.get(i));
        }
        sb.append("]}");
        realOut.println(RESULT_SENTINEL + sb);
        realOut.flush();
    }

    private static void emitError(String error, String status) {
        StringBuilder sb = new StringBuilder("{");
        sb.append("\"status\":\"").append(status).append("\"");
        sb.append(",\"passed\":0,\"total\":0,\"executionTimeMs\":0");
        sb.append(",\"error\":").append(esc(error));
        sb.append(",\"stdout\":").append(esc(capturedOutput()));
        sb.append(",\"results\":[]}");
        realOut.println(RESULT_SENTINEL + sb);
        realOut.flush();
    }

    private static String capturedOutput() {
        String s = new String(captureBuffer.toByteArray(), StandardCharsets.UTF_8);
        if (s.length() > MAX_CAPTURED_OUTPUT) {
            s = s.substring(0, MAX_CAPTURED_OUTPUT) + "\n... output truncated ...";
        }
        return s;
    }

    private static String esc(String s) {
        if (s == null) return "\"\"";
        StringBuilder sb = new StringBuilder("\"");
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '\\': sb.append("\\\\"); break;
                case '"':  sb.append("\\\""); break;
                case '\b': sb.append("\\b"); break;
                case '\f': sb.append("\\f"); break;
                case '\n': sb.append("\\n"); break;
                case '\r': sb.append("\\r"); break;
                case '\t': sb.append("\\t"); break;
                default:
                    if (c < ' ') {
                        String hex = "000" + Integer.toHexString(c);
                        sb.append("\\u").append(hex.substring(hex.length() - 4));
                    } else {
                        sb.append(c);
                    }
            }
        }
        return sb.append("\"").toString();
    }

    private static String readFile(File f) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(new FileInputStream(f), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) sb.append(line).append('\n');
        }
        return sb.toString();
    }

    // ============================================================
    // Minimal dependency-free JSON parser
    // ============================================================
    static class SimpleJson {
        abstract static class JsonValue {
            public boolean asBoolean() { return false; }
            public double asNumber() { return 0; }
            public String asString() { return ""; }
            public JsonObject asObject() { return new JsonObject(); }
            public JsonArray asArray() { return new JsonArray(); }
        }

        static class JsonNull extends JsonValue {
            public String toString() { return "null"; }
        }

        static class JsonBoolean extends JsonValue {
            boolean val;
            JsonBoolean(boolean v) { val = v; }
            public boolean asBoolean() { return val; }
            public String asString() { return String.valueOf(val); }
            public String toString() { return String.valueOf(val); }
        }

        static class JsonNumber extends JsonValue {
            double val;
            JsonNumber(double v) { val = v; }
            public double asNumber() { return val; }
            public boolean asBoolean() { return val != 0; }
            public String asString() { return toString(); }
            public String toString() {
                if (val == Math.rint(val) && !Double.isInfinite(val)) return String.valueOf((long) val);
                return String.valueOf(val);
            }
        }

        static class JsonString extends JsonValue {
            String val;
            JsonString(String v) { val = v; }
            public String asString() { return val; }
            public boolean asBoolean() { return "true".equalsIgnoreCase(val); }
            public double asNumber() {
                try { return Double.parseDouble(val); } catch (Exception e) { return 0; }
            }
            public String toString() { return "\"" + val + "\""; }
        }

        static class JsonArray extends JsonValue {
            List<JsonValue> values = new ArrayList<>();
            public JsonArray asArray() { return this; }
            public String toString() {
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < values.size(); i++) {
                    if (i > 0) sb.append(", ");
                    sb.append(values.get(i));
                }
                return sb.append("]").toString();
            }
        }

        static class JsonObject extends JsonValue {
            Map<String, JsonValue> map = new LinkedHashMap<>();
            public JsonObject asObject() { return this; }
            public JsonValue get(String k) { return map.get(k); }
            public String getString(String k, String d) {
                JsonValue v = map.get(k);
                return (v instanceof JsonString) ? v.asString() : d;
            }
            public boolean getBoolean(String k, boolean d) {
                JsonValue v = map.get(k);
                return (v instanceof JsonBoolean) ? v.asBoolean() : d;
            }
            public double getNumber(String k, double d) {
                JsonValue v = map.get(k);
                return (v instanceof JsonNumber) ? v.asNumber() : d;
            }
            public JsonArray getArray(String k) {
                JsonValue v = map.get(k);
                return (v instanceof JsonArray) ? (JsonArray) v : new JsonArray();
            }
        }

        public static JsonValue parse(String s) { return new Parser(s).parseValue(); }

        static class Parser {
            final String s;
            int idx = 0;
            Parser(String s) { this.s = s; }

            void skipWs() { while (idx < s.length() && Character.isWhitespace(s.charAt(idx))) idx++; }

            JsonValue parseValue() {
                skipWs();
                if (idx >= s.length()) return new JsonNull();
                char c = s.charAt(idx);
                if (c == '{') return parseObject();
                if (c == '[') return parseArray();
                if (c == '"') return parseString();
                if (c == 't' || c == 'f') return parseBoolean();
                if (c == 'n') return parseNull();
                if (c == '-' || c == '+' || Character.isDigit(c)) return parseNumber();
                idx++;
                return new JsonNull();
            }

            JsonObject parseObject() {
                JsonObject o = new JsonObject();
                idx++;
                skipWs();
                if (idx < s.length() && s.charAt(idx) == '}') { idx++; return o; }
                while (idx < s.length()) {
                    skipWs();
                    if (idx >= s.length() || s.charAt(idx) != '"') break;
                    String key = parseString().asString();
                    skipWs();
                    if (idx < s.length() && s.charAt(idx) == ':') idx++;
                    o.map.put(key, parseValue());
                    skipWs();
                    if (idx < s.length() && s.charAt(idx) == ',') { idx++; continue; }
                    if (idx < s.length() && s.charAt(idx) == '}') { idx++; break; }
                    break;
                }
                return o;
            }

            JsonArray parseArray() {
                JsonArray a = new JsonArray();
                idx++;
                skipWs();
                if (idx < s.length() && s.charAt(idx) == ']') { idx++; return a; }
                while (idx < s.length()) {
                    a.values.add(parseValue());
                    skipWs();
                    if (idx < s.length() && s.charAt(idx) == ',') { idx++; continue; }
                    if (idx < s.length() && s.charAt(idx) == ']') { idx++; break; }
                    break;
                }
                return a;
            }

            JsonString parseString() {
                idx++;
                StringBuilder sb = new StringBuilder();
                while (idx < s.length()) {
                    char c = s.charAt(idx++);
                    if (c == '"') break;
                    if (c == '\\' && idx < s.length()) {
                        char n = s.charAt(idx++);
                        switch (n) {
                            case 'n': sb.append('\n'); break;
                            case 'r': sb.append('\r'); break;
                            case 't': sb.append('\t'); break;
                            case 'b': sb.append('\b'); break;
                            case 'f': sb.append('\f'); break;
                            case '"': sb.append('"'); break;
                            case '/': sb.append('/'); break;
                            case '\\': sb.append('\\'); break;
                            case 'u':
                                if (idx + 4 <= s.length()) {
                                    sb.append((char) Integer.parseInt(s.substring(idx, idx + 4), 16));
                                    idx += 4;
                                }
                                break;
                            default: sb.append(n);
                        }
                    } else {
                        sb.append(c);
                    }
                }
                return new JsonString(sb.toString());
            }

            JsonBoolean parseBoolean() {
                if (s.startsWith("true", idx)) { idx += 4; return new JsonBoolean(true); }
                if (s.startsWith("false", idx)) { idx += 5; return new JsonBoolean(false); }
                idx++;
                return new JsonBoolean(false);
            }

            JsonNull parseNull() {
                if (s.startsWith("null", idx)) idx += 4; else idx++;
                return new JsonNull();
            }

            JsonNumber parseNumber() {
                int start = idx;
                if (idx < s.length() && (s.charAt(idx) == '-' || s.charAt(idx) == '+')) idx++;
                while (idx < s.length()) {
                    char c = s.charAt(idx);
                    boolean part = Character.isDigit(c) || c == '.' || c == 'e' || c == 'E';
                    // A sign belongs to the number only straight after an exponent marker.
                    // The previous parser accepted '+' but not '-', so 1e-5 threw.
                    if (!part && (c == '-' || c == '+') && idx > start) {
                        char prev = s.charAt(idx - 1);
                        part = (prev == 'e' || prev == 'E');
                    }
                    if (!part) break;
                    idx++;
                }
                try {
                    return new JsonNumber(Double.parseDouble(s.substring(start, idx)));
                } catch (NumberFormatException e) {
                    return new JsonNumber(0);
                }
            }
        }
    }
}
