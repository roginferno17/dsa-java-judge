/**
 * Generates the universal Java test harness (__Driver__.java)
 * that compiles and executes Solution methods with typed inputs via reflection.
 */

export function generateJavaDriverSource(): string {
  return `import java.io.*;
import java.lang.reflect.*;
import java.util.*;

// Standard DSA Helper Structures
class ListNode {
    public int val;
    public ListNode next;
    public ListNode() {}
    public ListNode(int val) { this.val = val; }
    public ListNode(int val, ListNode next) { this.val = val; this.next = next; }
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

public class __Driver__ {

    public static void main(String[] args) {
        try {
            // Read __testcases__.json
            File file = new File("__testcases__.json");
            String content = readFile(file);

            SimpleJson.JsonValue root = SimpleJson.parse(content);
            SimpleJson.JsonObject config = root.asObject();

            String className = config.getString("className", "Solution");
            String methodName = config.getString("methodName", "twoSum");
            SimpleJson.JsonArray paramTypesArr = config.getArray("parameterTypes");
            String returnType = config.getString("returnType", "int[]");
            boolean orderMatters = config.getBoolean("orderMatters", true);
            SimpleJson.JsonArray testCases = config.getArray("testCases");

            List<String> paramTypes = new ArrayList<>();
            for (SimpleJson.JsonValue pv : paramTypesArr.values) {
                paramTypes.add(pv.asString());
            }

            // Load Solution class
            Class<?> clazz;
            try {
                clazz = Class.forName(className);
            } catch (ClassNotFoundException e) {
                printError("Class '" + className + "' not found. Please ensure class name matches.", "COMPILATION_ERROR");
                return;
            }

            // Find matching method
            Method targetMethod = findMethod(clazz, methodName, paramTypes, returnType);
            if (targetMethod == null) {
                String errorMsg = buildMethodNotFoundError(clazz, methodName, paramTypes, returnType);
                printError(errorMsg, "RUNTIME_ERROR");
                return;
            }

            targetMethod.setAccessible(true);

            int passedCount = 0;
            int totalCount = testCases.values.size();
            List<String> resultsJson = new ArrayList<>();
            long totalStartTime = System.currentTimeMillis();

            for (int i = 0; i < totalCount; i++) {
                SimpleJson.JsonObject tc = testCases.values.get(i).asObject();
                SimpleJson.JsonArray inputsArr = tc.getArray("inputs");
                SimpleJson.JsonValue expectedVal = tc.get("expected");
                String inputDisplay = tc.getString("inputDisplay", formatInputDisplay(inputsArr));

                // Instantiate fresh Solution per test case (prevent state leakage)
                Object solutionInstance = clazz.getDeclaredConstructor().newInstance();

                // Convert inputs to typed Java arguments
                Object[] javaArgs = new Object[paramTypes.size()];
                for (int p = 0; p < paramTypes.size(); p++) {
                    SimpleJson.JsonValue rawVal = p < inputsArr.values.size() ? inputsArr.values.get(p) : new SimpleJson.JsonNull();
                    javaArgs[p] = convertToJavaType(rawVal, paramTypes.get(p));
                }

                long testStart = System.currentTimeMillis();
                Object actualResult;
                try {
                    actualResult = targetMethod.invoke(solutionInstance, javaArgs);
                    if ("void".equals(returnType) && javaArgs.length > 0) {
                        actualResult = javaArgs[0]; // In-place modified argument
                    }
                } catch (InvocationTargetException ite) {
                    Throwable cause = ite.getCause() != null ? ite.getCause() : ite;
                    String exMsg = formatException(cause, className);
                    resultsJson.add(String.format(
                        "{\\"passed\\":false,\\"input\\":%s,\\"expected\\":%s,\\"actual\\":\\"Runtime Error\\",\\"error\\":%s,\\"executionTimeMs\\":%d}",
                        escapeJson(inputDisplay),
                        escapeJson(serializeToJson(expectedVal)),
                        escapeJson(exMsg),
                        (System.currentTimeMillis() - testStart)
                    ));
                    printResult("RUNTIME_ERROR", passedCount, totalCount, resultsJson, (System.currentTimeMillis() - totalStartTime), exMsg);
                    return;
                }

                long testTime = System.currentTimeMillis() - testStart;
                boolean passed = compareResults(actualResult, expectedVal, returnType, orderMatters);
                if (passed) {
                    passedCount++;
                }

                String actualStr = serializeToJavaObject(actualResult, returnType);
                String expectedStr = serializeJsonValue(expectedVal);

                resultsJson.add(String.format(
                    "{\\"passed\\":%b,\\"input\\":%s,\\"expected\\":%s,\\"actual\\":%s,\\"executionTimeMs\\":%d}",
                    passed,
                    escapeJson(inputDisplay),
                    escapeJson(expectedStr),
                    escapeJson(actualStr),
                    testTime
                ));
            }

            long totalTime = System.currentTimeMillis() - totalStartTime;
            String finalStatus = passedCount == totalCount ? "ACCEPTED" : "WRONG_ANSWER";
            printResult(finalStatus, passedCount, totalCount, resultsJson, totalTime, null);

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            printError("Execution runner failure: " + e.getMessage() + "\\n" + sw.toString(), "RUNTIME_ERROR");
        }
    }

    private static Method findMethod(Class<?> clazz, String name, List<String> paramTypes, String returnType) {
        Method[] methods = clazz.getDeclaredMethods();
        for (Method m : methods) {
            if (m.getName().equals(name) && m.getParameterCount() == paramTypes.size()) {
                if (matchesSignature(m, paramTypes)) {
                    return m;
                }
            }
        }
        return null;
    }

    private static boolean matchesSignature(Method m, List<String> paramTypes) {
        Class<?>[] params = m.getParameterTypes();
        for (int i = 0; i < params.length; i++) {
            String expectedType = paramTypes.get(i);
            if (!isTypeCompatible(params[i], expectedType)) {
                return false;
            }
        }
        return true;
    }

    private static boolean isTypeCompatible(Class<?> paramClass, String typeName) {
        switch (typeName) {
            case "int": return paramClass == int.class || paramClass == Integer.class;
            case "long": return paramClass == long.class || paramClass == Long.class;
            case "double": return paramClass == double.class || paramClass == Double.class;
            case "float": return paramClass == float.class || paramClass == Float.class;
            case "boolean": return paramClass == boolean.class || paramClass == Boolean.class;
            case "char": return paramClass == char.class || paramClass == Character.class;
            case "String": return paramClass == String.class;
            case "int[]": return paramClass == int[].class;
            case "long[]": return paramClass == long[].class;
            case "double[]": return paramClass == double[].class;
            case "boolean[]": return paramClass == boolean[].class;
            case "char[]": return paramClass == char[].class;
            case "String[]": return paramClass == String[].class;
            case "int[][]": return paramClass == int[][].class;
            case "char[][]": return paramClass == char[][].class;
            case "String[][]": return paramClass == String[][].class;
            case "boolean[][]": return paramClass == boolean[][].class;
            case "ListNode": return paramClass.getSimpleName().equals("ListNode");
            case "TreeNode": return paramClass.getSimpleName().equals("TreeNode");
            default:
                if (typeName.startsWith("List")) {
                    return List.class.isAssignableFrom(paramClass);
                }
                return true;
        }
    }

    private static String buildMethodNotFoundError(Class<?> clazz, String name, List<String> paramTypes, String returnType) {
        StringBuilder sb = new StringBuilder();
        sb.append("Required method '").append(name).append("' not found with signature (");
        for (int i = 0; i < paramTypes.size(); i++) {
            if (i > 0) sb.append(", ");
            sb.append(paramTypes.get(i));
        }
        sb.append(") in class '").append(clazz.getSimpleName()).append("'.\\nAvailable methods:");
        for (Method m : clazz.getDeclaredMethods()) {
            sb.append("\\n  - ").append(m.getReturnType().getSimpleName()).append(" ").append(m.getName()).append("(");
            Class<?>[] pts = m.getParameterTypes();
            for (int j = 0; j < pts.length; j++) {
                if (j > 0) sb.append(", ");
                sb.append(pts[j].getSimpleName());
            }
            sb.append(")");
        }
        return sb.toString();
    }

    private static Object convertToJavaType(SimpleJson.JsonValue val, String typeName) {
        if (val == null || val instanceof SimpleJson.JsonNull) {
            return null;
        }

        switch (typeName) {
            case "int":
                return (int) val.asNumber();
            case "long":
                return (long) val.asNumber();
            case "double":
                return (double) val.asNumber();
            case "float":
                return (float) val.asNumber();
            case "boolean":
                return val.asBoolean();
            case "char":
                String s = val.asString();
                return s.length() > 0 ? s.charAt(0) : ' ';
            case "String":
                return val.asString();
            case "int[]": {
                SimpleJson.JsonArray arr = val.asArray();
                int[] res = new int[arr.values.size()];
                for (int i = 0; i < res.length; i++) res[i] = (int) arr.values.get(i).asNumber();
                return res;
            }
            case "long[]": {
                SimpleJson.JsonArray arr = val.asArray();
                long[] res = new long[arr.values.size()];
                for (int i = 0; i < res.length; i++) res[i] = (long) arr.values.get(i).asNumber();
                return res;
            }
            case "double[]": {
                SimpleJson.JsonArray arr = val.asArray();
                double[] res = new double[arr.values.size()];
                for (int i = 0; i < res.length; i++) res[i] = (double) arr.values.get(i).asNumber();
                return res;
            }
            case "boolean[]": {
                SimpleJson.JsonArray arr = val.asArray();
                boolean[] res = new boolean[arr.values.size()];
                for (int i = 0; i < res.length; i++) res[i] = arr.values.get(i).asBoolean();
                return res;
            }
            case "char[]": {
                SimpleJson.JsonArray arr = val.asArray();
                char[] res = new char[arr.values.size()];
                for (int i = 0; i < res.length; i++) {
                    String str = arr.values.get(i).asString();
                    res[i] = str.length() > 0 ? str.charAt(0) : ' ';
                }
                return res;
            }
            case "String[]": {
                SimpleJson.JsonArray arr = val.asArray();
                String[] res = new String[arr.values.size()];
                for (int i = 0; i < res.length; i++) res[i] = arr.values.get(i).asString();
                return res;
            }
            case "int[][]": {
                SimpleJson.JsonArray arr2d = val.asArray();
                int[][] res = new int[arr2d.values.size()][];
                for (int i = 0; i < res.length; i++) {
                    SimpleJson.JsonArray subArr = arr2d.values.get(i).asArray();
                    res[i] = new int[subArr.values.size()];
                    for (int j = 0; j < res[i].length; j++) res[i][j] = (int) subArr.values.get(j).asNumber();
                }
                return res;
            }
            case "char[][]": {
                SimpleJson.JsonArray arr2d = val.asArray();
                char[][] res = new char[arr2d.values.size()][];
                for (int i = 0; i < res.length; i++) {
                    SimpleJson.JsonArray subArr = arr2d.values.get(i).asArray();
                    res[i] = new char[subArr.values.size()];
                    for (int j = 0; j < res[i].length; j++) {
                        String str = subArr.values.get(j).asString();
                        res[i][j] = str.length() > 0 ? str.charAt(0) : ' ';
                    }
                }
                return res;
            }
            case "String[][]": {
                SimpleJson.JsonArray arr2d = val.asArray();
                String[][] res = new String[arr2d.values.size()][];
                for (int i = 0; i < res.length; i++) {
                    SimpleJson.JsonArray subArr = arr2d.values.get(i).asArray();
                    res[i] = new String[subArr.values.size()];
                    for (int j = 0; j < res[i].length; j++) res[i][j] = subArr.values.get(j).asString();
                }
                return res;
            }
            case "List<Integer>": {
                SimpleJson.JsonArray arr = val.asArray();
                List<Integer> res = new ArrayList<>();
                for (SimpleJson.JsonValue item : arr.values) res.add((int) item.asNumber());
                return res;
            }
            case "List<String>": {
                SimpleJson.JsonArray arr = val.asArray();
                List<String> res = new ArrayList<>();
                for (SimpleJson.JsonValue item : arr.values) res.add(item.asString());
                return res;
            }
            case "List<List<Integer>>": {
                SimpleJson.JsonArray arr2d = val.asArray();
                List<List<Integer>> res = new ArrayList<>();
                for (SimpleJson.JsonValue sub : arr2d.values) {
                    SimpleJson.JsonArray subArr = sub.asArray();
                    List<Integer> subList = new ArrayList<>();
                    for (SimpleJson.JsonValue item : subArr.values) subList.add((int) item.asNumber());
                    res.add(subList);
                }
                return res;
            }
            case "ListNode": {
                SimpleJson.JsonArray arr = val.asArray();
                if (arr.values.isEmpty()) return null;
                ListNode dummy = new ListNode(0);
                ListNode curr = dummy;
                for (SimpleJson.JsonValue item : arr.values) {
                    curr.next = new ListNode((int) item.asNumber());
                    curr = curr.next;
                }
                return dummy.next;
            }
            case "TreeNode": {
                SimpleJson.JsonArray arr = val.asArray();
                if (arr.values.isEmpty() || arr.values.get(0) instanceof SimpleJson.JsonNull) return null;
                TreeNode root = new TreeNode((int) arr.values.get(0).asNumber());
                Queue<TreeNode> queue = new LinkedList<>();
                queue.offer(root);
                int idx = 1;
                while (!queue.isEmpty() && idx < arr.values.size()) {
                    TreeNode curr = queue.poll();
                    if (idx < arr.values.size()) {
                        SimpleJson.JsonValue leftVal = arr.values.get(idx++);
                        if (!(leftVal instanceof SimpleJson.JsonNull)) {
                            curr.left = new TreeNode((int) leftVal.asNumber());
                            queue.offer(curr.left);
                        }
                    }
                    if (idx < arr.values.size()) {
                        SimpleJson.JsonValue rightVal = arr.values.get(idx++);
                        if (!(rightVal instanceof SimpleJson.JsonNull)) {
                            curr.right = new TreeNode((int) rightVal.asNumber());
                            queue.offer(curr.right);
                        }
                    }
                }
                return root;
            }
            default:
                return val.asString();
        }
    }

    private static boolean compareResults(Object actual, SimpleJson.JsonValue expected, String returnType, boolean orderMatters) {
        if (actual == null) {
            return expected instanceof SimpleJson.JsonNull;
        }

        switch (returnType) {
            case "int":
                return (int) actual == (int) expected.asNumber();
            case "long":
                return (long) actual == (long) expected.asNumber();
            case "double":
            case "float":
                return Math.abs(((Number) actual).doubleValue() - expected.asNumber()) < 1e-5;
            case "boolean":
                return (boolean) actual == expected.asBoolean();
            case "char":
                return (char) actual == expected.asString().charAt(0);
            case "String":
                return actual.toString().equals(expected.asString());
            case "int[]": {
                int[] act = (int[]) actual;
                SimpleJson.JsonArray expArr = expected.asArray();
                if (act.length != expArr.values.size()) return false;
                if (orderMatters) {
                    for (int i = 0; i < act.length; i++) {
                        if (act[i] != (int) expArr.values.get(i).asNumber()) return false;
                    }
                    return true;
                } else {
                    int[] actSorted = act.clone();
                    int[] expSorted = new int[expArr.values.size()];
                    for (int i = 0; i < expSorted.length; i++) expSorted[i] = (int) expArr.values.get(i).asNumber();
                    Arrays.sort(actSorted);
                    Arrays.sort(expSorted);
                    return Arrays.equals(actSorted, expSorted);
                }
            }
            case "long[]": {
                long[] act = (long[]) actual;
                SimpleJson.JsonArray expArr = expected.asArray();
                if (act.length != expArr.values.size()) return false;
                for (int i = 0; i < act.length; i++) {
                    if (act[i] != (long) expArr.values.get(i).asNumber()) return false;
                }
                return true;
            }
            case "String[]": {
                String[] act = (String[]) actual;
                SimpleJson.JsonArray expArr = expected.asArray();
                if (act.length != expArr.values.size()) return false;
                if (orderMatters) {
                    for (int i = 0; i < act.length; i++) {
                        if (!act[i].equals(expArr.values.get(i).asString())) return false;
                    }
                    return true;
                } else {
                    List<String> actList = new ArrayList<>(Arrays.asList(act));
                    List<String> expList = new ArrayList<>();
                    for (SimpleJson.JsonValue v : expArr.values) expList.add(v.asString());
                    Collections.sort(actList);
                    Collections.sort(expList);
                    return actList.equals(expList);
                }
            }
            case "int[][]": {
                int[][] act = (int[][]) actual;
                SimpleJson.JsonArray expArr = expected.asArray();
                if (act.length != expArr.values.size()) return false;
                for (int i = 0; i < act.length; i++) {
                    SimpleJson.JsonArray subExp = expArr.values.get(i).asArray();
                    if (act[i].length != subExp.values.size()) return false;
                    for (int j = 0; j < act[i].length; j++) {
                        if (act[i][j] != (int) subExp.values.get(j).asNumber()) return false;
                    }
                }
                return true;
            }
            case "List<Integer>": {
                List<?> actList = (List<?>) actual;
                SimpleJson.JsonArray expArr = expected.asArray();
                if (actList.size() != expArr.values.size()) return false;
                for (int i = 0; i < actList.size(); i++) {
                    if (!actList.get(i).equals((int) expArr.values.get(i).asNumber())) return false;
                }
                return true;
            }
            case "List<List<Integer>>": {
                List<?> actList2d = (List<?>) actual;
                SimpleJson.JsonArray expArr = expected.asArray();
                if (actList2d.size() != expArr.values.size()) return false;
                for (int i = 0; i < actList2d.size(); i++) {
                    List<?> subAct = (List<?>) actList2d.get(i);
                    SimpleJson.JsonArray subExp = expArr.values.get(i).asArray();
                    if (subAct.size() != subExp.values.size()) return false;
                    for (int j = 0; j < subAct.size(); j++) {
                        if (!subAct.get(j).equals((int) subExp.values.get(j).asNumber())) return false;
                    }
                }
                return true;
            }
            case "ListNode": {
                ListNode curr = (ListNode) actual;
                SimpleJson.JsonArray expArr = expected.asArray();
                int idx = 0;
                while (curr != null && idx < expArr.values.size()) {
                    if (curr.val != (int) expArr.values.get(idx++).asNumber()) return false;
                    curr = curr.next;
                }
                return curr == null && idx == expArr.values.size();
            }
            default:
                return actual.toString().equals(expected.toString());
        }
    }

    private static String serializeToJavaObject(Object obj, String returnType) {
        if (obj == null) return "null";
        if (obj instanceof int[]) {
            return Arrays.toString((int[]) obj);
        } else if (obj instanceof long[]) {
            return Arrays.toString((long[]) obj);
        } else if (obj instanceof double[]) {
            return Arrays.toString((double[]) obj);
        } else if (obj instanceof boolean[]) {
            return Arrays.toString((boolean[]) obj);
        } else if (obj instanceof char[]) {
            return Arrays.toString((char[]) obj);
        } else if (obj instanceof Object[]) {
            return Arrays.deepToString((Object[]) obj);
        } else if (obj instanceof ListNode) {
            List<Integer> vals = new ArrayList<>();
            ListNode curr = (ListNode) obj;
            while (curr != null) {
                vals.add(curr.val);
                curr = curr.next;
            }
            return vals.toString();
        } else if (obj instanceof TreeNode) {
            List<String> vals = new ArrayList<>();
            Queue<TreeNode> q = new LinkedList<>();
            q.offer((TreeNode) obj);
            while (!q.isEmpty()) {
                TreeNode n = q.poll();
                if (n == null) {
                    vals.add("null");
                } else {
                    vals.add(String.valueOf(n.val));
                    q.offer(n.left);
                    q.offer(n.right);
                }
            }
            // Trim trailing nulls
            while (!vals.isEmpty() && vals.get(vals.size() - 1).equals("null")) {
                vals.remove(vals.size() - 1);
            }
            return vals.toString();
        }
        return obj.toString();
    }

    private static String serializeJsonValue(SimpleJson.JsonValue val) {
        if (val == null || val instanceof SimpleJson.JsonNull) return "null";
        if (val instanceof SimpleJson.JsonArray) {
            SimpleJson.JsonArray arr = (SimpleJson.JsonArray) val;
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < arr.values.size(); i++) {
                if (i > 0) sb.append(", ");
                sb.append(serializeJsonValue(arr.values.get(i)));
            }
            sb.append("]");
            return sb.toString();
        }
        return val.toString();
    }

    private static String serializeToJson(SimpleJson.JsonValue val) {
        return val == null ? "null" : val.toString();
    }

    private static String formatInputDisplay(SimpleJson.JsonArray inputsArr) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < inputsArr.values.size(); i++) {
            if (i > 0) sb.append(", ");
            sb.append(inputsArr.values.get(i).toString());
        }
        return sb.toString();
    }

    private static String formatException(Throwable t, String userClassName) {
        String msg = t.getClass().getName();
        if (t.getMessage() != null) {
            msg += ": " + t.getMessage();
        }
        StackTraceElement[] st = t.getStackTrace();
        for (StackTraceElement elem : st) {
            if (elem.getClassName().contains(userClassName)) {
                msg += "\\n    at " + elem.getClassName() + "." + elem.getMethodName() + "(" + elem.getFileName() + ":" + elem.getLineNumber() + ")";
                break;
            }
        }
        return msg;
    }

    private static void printResult(String status, int passed, int total, List<String> results, long timeMs, String error) {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\\"status\\":\\"").append(status).append("\\",");
        sb.append("\\"passed\\":").append(passed).append(",");
        sb.append("\\"total\\":").append(total).append(",");
        sb.append("\\"executionTimeMs\\":").append(timeMs).append(",");
        if (error != null) {
            sb.append("\\"error\\":").append(escapeJson(error)).append(",");
        }
        sb.append("\\"results\\":[");
        for (int i = 0; i < results.size(); i++) {
            if (i > 0) sb.append(",");
            sb.append(results.get(i));
        }
        sb.append("]}");
        System.out.println(sb.toString());
    }

    private static void printError(String error, String status) {
        System.out.println("{\\"status\\":\\"" + status + "\\",\\"passed\\":0,\\"total\\":0,\\"executionTimeMs\\":0,\\"error\\":" + escapeJson(error) + ",\\"results\\":[]}");
    }

    private static String escapeJson(String s) {
        if (s == null) return "\\"\\"";
        StringBuilder sb = new StringBuilder("\\"");
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '\\\\': sb.append("\\\\\\\\"); break;
                case '\\"': sb.append("\\\\\\\""); break;
                case '\\b': sb.append("\\\\b"); break;
                case '\\f': sb.append("\\\\f"); break;
                case '\\n': sb.append("\\\\n"); break;
                case '\\r': sb.append("\\\\r"); break;
                case '\\t': sb.append("\\\\t"); break;
                default:
                    if (c < ' ') {
                        String hex = "000" + Integer.toHexString(c);
                        sb.append("\\\\u").append(hex.substring(hex.length() - 4));
                    } else {
                        sb.append(c);
                    }
            }
        }
        sb.append("\\"");
        return sb.toString();
    }

    private static String readFile(File f) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(f), "UTF-8"))) {
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\\n");
            }
        }
        return sb.toString();
    }

    // Lightweight pure-Java JSON Parser
    static class SimpleJson {
        abstract static class JsonValue {
            public boolean asBoolean() { return false; }
            public double asNumber() { return 0; }
            public String asString() { return ""; }
            public JsonObject asObject() { return null; }
            public JsonArray asArray() { return null; }
        }

        static class JsonNull extends JsonValue {
            public String toString() { return "null"; }
        }

        static class JsonBoolean extends JsonValue {
            boolean val;
            JsonBoolean(boolean val) { this.val = val; }
            public boolean asBoolean() { return val; }
            public String toString() { return String.valueOf(val); }
        }

        static class JsonNumber extends JsonValue {
            double val;
            JsonNumber(double val) { this.val = val; }
            public double asNumber() { return val; }
            public String toString() {
                if (val == (long) val) return String.valueOf((long) val);
                return String.valueOf(val);
            }
        }

        static class JsonString extends JsonValue {
            String val;
            JsonString(String val) { this.val = val; }
            public String asString() { return val; }
            public String toString() { return "\\"" + val.replace("\\"", "\\\\\\\"") + "\\""; }
        }

        static class JsonArray extends JsonValue {
            List<JsonValue> values = new ArrayList<>();
            public JsonArray asArray() { return this; }
            public String toString() {
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < values.size(); i++) {
                    if (i > 0) sb.append(",");
                    sb.append(values.get(i).toString());
                }
                sb.append("]");
                return sb.toString();
            }
        }

        static class JsonObject extends JsonValue {
            Map<String, JsonValue> map = new LinkedHashMap<>();
            public JsonObject asObject() { return this; }
            public JsonValue get(String key) { return map.get(key); }
            public String getString(String key, String def) {
                JsonValue v = map.get(key);
                return (v instanceof JsonString) ? v.asString() : def;
            }
            public boolean getBoolean(String key, boolean def) {
                JsonValue v = map.get(key);
                return (v instanceof JsonBoolean) ? v.asBoolean() : def;
            }
            public JsonArray getArray(String key) {
                JsonValue v = map.get(key);
                return (v instanceof JsonArray) ? (JsonArray) v : new JsonArray();
            }
            public String toString() {
                StringBuilder sb = new StringBuilder("{");
                int count = 0;
                for (Map.Entry<String, JsonValue> e : map.entrySet()) {
                    if (count++ > 0) sb.append(",");
                    sb.append("\\"").append(e.getKey()).append("\\":").append(e.getValue().toString());
                }
                sb.append("}");
                return sb.toString();
            }
        }

        public static JsonValue parse(String s) {
            return new Parser(s).parseValue();
        }

        static class Parser {
            String s;
            int idx = 0;

            Parser(String s) { this.s = s; }

            void skipWs() {
                while (idx < s.length() && Character.isWhitespace(s.charAt(idx))) idx++;
            }

            JsonValue parseValue() {
                skipWs();
                if (idx >= s.length()) return new JsonNull();
                char c = s.charAt(idx);
                if (c == '{') return parseObject();
                if (c == '[') return parseArray();
                if (c == '"') return parseString();
                if (c == 't' || c == 'f') return parseBoolean();
                if (c == 'n') return parseNull();
                if (c == '-' || Character.isDigit(c)) return parseNumber();
                return new JsonNull();
            }

            JsonObject parseObject() {
                JsonObject obj = new JsonObject();
                idx++; // '{'
                skipWs();
                if (idx < s.length() && s.charAt(idx) == '}') {
                    idx++;
                    return obj;
                }
                while (idx < s.length()) {
                    skipWs();
                    String key = parseString().asString();
                    skipWs();
                    if (idx < s.length() && s.charAt(idx) == ':') idx++;
                    JsonValue val = parseValue();
                    obj.map.put(key, val);
                    skipWs();
                    if (idx < s.length() && s.charAt(idx) == ',') {
                        idx++;
                    } else if (idx < s.length() && s.charAt(idx) == '}') {
                        idx++;
                        break;
                    }
                }
                return obj;
            }

            JsonArray parseArray() {
                JsonArray arr = new JsonArray();
                idx++; // '['
                skipWs();
                if (idx < s.length() && s.charAt(idx) == ']') {
                    idx++;
                    return arr;
                }
                while (idx < s.length()) {
                    JsonValue val = parseValue();
                    arr.values.add(val);
                    skipWs();
                    if (idx < s.length() && s.charAt(idx) == ',') {
                        idx++;
                    } else if (idx < s.length() && s.charAt(idx) == ']') {
                        idx++;
                        break;
                    }
                }
                return arr;
            }

            JsonString parseString() {
                idx++; // '"'
                StringBuilder sb = new StringBuilder();
                while (idx < s.length()) {
                    char c = s.charAt(idx++);
                    if (c == '"') break;
                    if (c == '\\\\' && idx < s.length()) {
                        char next = s.charAt(idx++);
                        if (next == 'n') sb.append('\\n');
                        else if (next == 'r') sb.append('\\r');
                        else if (next == 't') sb.append('\\t');
                        else if (next == 'b') sb.append('\\b');
                        else if (next == 'f') sb.append('\\f');
                        else if (next == '"') sb.append('"');
                        else if (next == '\\\\') sb.append('\\\\');
                        else if (next == 'u' && idx + 4 <= s.length()) {
                            String hex = s.substring(idx, idx + 4);
                            sb.append((char) Integer.parseInt(hex, 16));
                            idx += 4;
                        } else {
                            sb.append(next);
                        }
                    } else {
                        sb.append(c);
                    }
                }
                return new JsonString(sb.toString());
            }

            JsonBoolean parseBoolean() {
                if (s.startsWith("true", idx)) {
                    idx += 4;
                    return new JsonBoolean(true);
                } else if (s.startsWith("false", idx)) {
                    idx += 5;
                    return new JsonBoolean(false);
                }
                return new JsonBoolean(false);
            }

            JsonNull parseNull() {
                if (s.startsWith("null", idx)) idx += 4;
                return new JsonNull();
            }

            JsonNumber parseNumber() {
                int start = idx;
                if (s.charAt(idx) == '-') idx++;
                while (idx < s.length() && (Character.isDigit(s.charAt(idx)) || s.charAt(idx) == '.' || s.charAt(idx) == 'e' || s.charAt(idx) == 'E' || s.charAt(idx) == '+')) {
                    idx++;
                }
                double val = Double.parseDouble(s.substring(start, idx));
                return new JsonNumber(val);
            }
        }
    }
}
`
}
