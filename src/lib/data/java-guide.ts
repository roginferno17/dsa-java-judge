/**
 * A short Java reference aimed at exactly one thing: writing the solutions in
 * this curriculum. It is not a Java course. Everything here is something that
 * either comes up constantly in DSA problems, or silently gives a wrong answer.
 *
 * Every snippet is runnable — the Run button sends it through the same sandbox
 * the judge uses — and every one has an `expectedOutput` that
 * scripts/verify-java-guide.mjs checks. A page here cannot teach code that does
 * not compile, or that prints something other than what the text claims.
 */

export interface Snippet {
  title: string
  /** A complete class named Main with a main method; run as-is. */
  code: string
  /** Exact stdout, newline-separated. The verifier compares against this. */
  expectedOutput: string
  /** What to notice. Rendered under the output. */
  note?: string
}

export interface JavaLesson {
  slug: string
  title: string
  /** One sentence on why this matters for solving problems. */
  summary: string
  /** Prose paragraphs, rendered in order above the snippets. */
  body: string[]
  snippets: Snippet[]
  /** Short reminders, rendered as a list at the end. */
  remember: string[]
}

export const javaGuide: JavaLesson[] = [
  {
    slug: "types-and-overflow",
    title: "Types and Overflow",
    summary:
      "The single most common source of a wrong answer that looks right: an int that quietly wrapped past its maximum.",
    body: [
      "An int in Java holds values from -2,147,483,648 to 2,147,483,647 — a little over two billion. Go past the top and it does not error, it WRAPS around to the bottom. No exception, no warning, just a negative number where a large positive one should be.",
      "This matters more than it sounds. A sum of 10^5 array elements each up to 10^5 reaches 10^10, which is five times past the int limit. So does a product of two values near 10^5. Whenever a problem's constraints multiply out past two billion, the accumulator has to be a long.",
      "The trap has a second half: the arithmetic happens at the type of the OPERANDS, not the type you assign into. Assigning an int multiplication to a long does not save you — the multiplication already overflowed before the assignment happened. Cast one operand first.",
      "Integer division truncates toward zero rather than rounding, and the % operator keeps the sign of the left-hand side. Both differ from what people expect, and both come up in binary search and in parity checks.",
    ],
    snippets: [
      {
        title: "Overflow is silent",
        code: `public class Main {
    public static void main(String[] args) {
        int big = Integer.MAX_VALUE;
        System.out.println(big);
        System.out.println(big + 1);
        System.out.println((long) big + 1);
    }
}`,
        expectedOutput: "2147483647\n-2147483648\n2147483648",
        note: "Adding 1 to the largest int gives the smallest one. Casting a single operand to long before the addition is what fixes it.",
      },
      {
        title: "The assignment does not save you",
        code: `public class Main {
    public static void main(String[] args) {
        int a = 100000;
        int b = 100000;

        long wrong = a * b;          // multiplied as int, THEN widened
        long right = (long) a * b;   // multiplied as long

        System.out.println(wrong);
        System.out.println(right);
    }
}`,
        expectedOutput: "1410065408\n10000000000",
        note: "Both lines assign into a long. Only the second one computes in long — the cast has to be on an operand, not on the result.",
      },
      {
        title: "Division truncates, % keeps the sign",
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println(7 / 2);
        System.out.println(-7 / 2);
        System.out.println(-7 % 2);
        System.out.println(-7 & 1);

        int lo = 0, hi = 2000000000;
        System.out.println((lo + hi) / 2);          // fine here
        System.out.println(lo + (hi - lo) / 2);     // safe even when both are huge
    }
}`,
        expectedOutput: "3\n-3\n-1\n1\n1000000000\n1000000000",
        note: "-7 / 2 is -3, not -4: truncation goes toward zero. And -7 % 2 is -1, which is why a parity check should use & 1 rather than % 2 == 1.",
      },
      {
        title: "char is a number",
        code: `public class Main {
    public static void main(String[] args) {
        char c = 'e';
        System.out.println(c - 'a');
        System.out.println((char) ('a' + 3));
        System.out.println('a' + 3);
    }
}`,
        expectedOutput: "4\nd\n100",
        note: "c - 'a' is the standard way to index a 26-slot counting array. Note that 'a' + 3 is an int unless you cast it back — printing it without the cast gives 100.",
      },
    ],
    remember: [
      "If the constraints multiply past ~2 × 10^9, accumulate in long.",
      "Cast an OPERAND, not the result: (long) a * b, never (long) (a * b).",
      "n % 2 == 1 is false for negative odd numbers; (n & 1) != 0 is not.",
      "lo + (hi - lo) / 2 never overflows; (lo + hi) / 2 can.",
    ],
  },

  {
    slug: "arrays",
    title: "Arrays",
    summary:
      "Fixed-size, zero-indexed, and printed uselessly by default — the last of which wastes an afternoon exactly once.",
    body: [
      "An array's length is fixed at creation and read with .length — a field, not a method, unlike String's .length(). Elements start at their type's zero value: 0 for int, false for boolean, null for objects.",
      "Printing an array directly gives something like [I@1b6d3586: the type followed by an identity hash. That is not the contents. Arrays.toString does one dimension and Arrays.deepToString does nested ones.",
      "Arrays.sort on primitives uses a dual-pivot quicksort and cannot take a comparator. To sort descending, either sort ascending and reverse, or box to Integer[] and pass Collections.reverseOrder() — boxing is the price of a comparator.",
      "Assignment copies the REFERENCE, not the contents. Two names for one array is the cause of a whole class of confusing bugs; .clone() or Arrays.copyOf gives a real copy.",
    ],
    snippets: [
      {
        title: "Printing, filling, copying",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] a = { 5, 2, 9, 1 };
        System.out.println(Arrays.toString(a));

        int[] filled = new int[4];
        Arrays.fill(filled, -1);
        System.out.println(Arrays.toString(filled));

        int[] grown = Arrays.copyOf(a, 6);
        System.out.println(Arrays.toString(grown));

        int[] slice = Arrays.copyOfRange(a, 1, 3);
        System.out.println(Arrays.toString(slice));
    }
}`,
        expectedOutput: "[5, 2, 9, 1]\n[-1, -1, -1, -1]\n[5, 2, 9, 1, 0, 0]\n[2, 9]",
        note: "copyOf pads with the zero value. copyOfRange is inclusive of the start and exclusive of the end, like substring.",
      },
      {
        title: "A reference is not a copy",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] original = { 1, 2, 3 };

        int[] alias = original;      // same array, two names
        int[] copy = original.clone();

        alias[0] = 99;
        copy[1] = 99;

        System.out.println(Arrays.toString(original));
        System.out.println(Arrays.toString(alias));
        System.out.println(Arrays.toString(copy));
    }
}`,
        expectedOutput: "[99, 2, 3]\n[99, 2, 3]\n[1, 99, 3]",
        note: "Writing through alias changed original. This is also why a method that sorts its parameter has changed the caller's array.",
      },
      {
        title: "Sorting, ascending and descending",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] a = { 5, 2, 9, 1 };
        Arrays.sort(a);
        System.out.println(Arrays.toString(a));

        // Descending needs boxing, because a comparator needs objects.
        Integer[] boxed = { 5, 2, 9, 1 };
        Arrays.sort(boxed, Collections.reverseOrder());
        System.out.println(Arrays.toString(boxed));

        // Sorting rows of a 2D array by their second column.
        int[][] pairs = { {1, 9}, {2, 3}, {3, 5} };
        Arrays.sort(pairs, (x, y) -> Integer.compare(x[1], y[1]));
        System.out.println(Arrays.deepToString(pairs));
    }
}`,
        expectedOutput: "[1, 2, 5, 9]\n[9, 5, 2, 1]\n[[2, 3], [3, 5], [1, 9]]",
        note: "int[][] is an array of int[] OBJECTS, so it can take a comparator directly — no boxing needed there.",
      },
      {
        title: "Two dimensions, and ragged rows",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[][] grid = new int[2][3];
        grid[1][2] = 7;
        System.out.println(Arrays.deepToString(grid));
        System.out.println(grid.length + " rows, " + grid[0].length + " columns");

        // Rows can have different lengths; each is its own array.
        int[][] ragged = new int[3][];
        for (int i = 0; i < 3; i++) ragged[i] = new int[i + 1];
        System.out.println(Arrays.deepToString(ragged));
    }
}`,
        expectedOutput: "[[0, 0, 0], [0, 0, 7]]\n2 rows, 3 columns\n[[0], [0, 0], [0, 0, 0]]",
        note: "grid.length is the number of rows and grid[0].length the columns — getting these the wrong way round is the classic 2D bug.",
      },
    ],
    remember: [
      "array.length is a field; string.length() and list.size() are methods.",
      "System.out.println(array) prints a hash, not the contents. Use Arrays.toString.",
      "Arrays.sort cannot take a comparator on primitives — box, or sort and reverse.",
      "Assignment aliases; clone() and Arrays.copyOf copy.",
    ],
  },

  {
    slug: "strings",
    title: "Strings and StringBuilder",
    summary:
      "Strings never change. Every 'modification' allocates a new one, which turns an innocent loop into O(n²).",
    body: [
      "A Java String is immutable. s += c does not append to s — it builds an entirely new string containing the old contents plus one character, and points s at that. Doing it n times copies 1 + 2 + … + n characters, which is O(n²).",
      "StringBuilder is the mutable version: append is amortised O(1), and toString at the end costs one copy. Any loop that builds a string should use it. The habit costs nothing when n is small and saves the solution when n is 10^5.",
      "Comparison is the other trap. == on strings compares references. Short literals often share one object because of interning, so == appears to work in small tests and then fails on a string built at runtime. Always use .equals.",
      "substring(a, b) is inclusive of a and exclusive of b, and since Java 7 it COPIES rather than sharing the backing array — so calling it inside a loop is O(length) each time, not O(1).",
    ],
    snippets: [
      {
        title: "Building a string: the slow way and the right way",
        code: `public class Main {
    public static void main(String[] args) {
        // Fine for three characters, quadratic for a hundred thousand.
        String slow = "";
        for (char c = 'a'; c <= 'c'; c++) slow += c;
        System.out.println(slow);

        StringBuilder sb = new StringBuilder();
        for (char c = 'a'; c <= 'c'; c++) sb.append(c);
        System.out.println(sb.toString());

        sb.reverse();
        System.out.println(sb);
        System.out.println(sb.length());
    }
}`,
        expectedOutput: "abc\nabc\ncba\n3",
        note: "Both print the same thing. Only one of them still finishes when the loop runs 10^5 times.",
      },
      {
        title: "== compares references",
        code: `public class Main {
    public static void main(String[] args) {
        String a = "hello";
        String b = "hello";
        String c = new String("hello");
        String d = "hel" + args.length;   // built at runtime

        System.out.println(a == b);
        System.out.println(a == c);
        System.out.println(a.equals(c));
        System.out.println(d.equals("hel0"));
    }
}`,
        expectedOutput: "true\nfalse\ntrue\ntrue",
        note: "a == b is true only because both literals were interned into one object. That coincidence is exactly what makes the bug survive testing.",
      },
      {
        title: "Characters, substrings and splitting",
        code: `public class Main {
    public static void main(String[] args) {
        String s = "banana";

        System.out.println(s.charAt(2));
        System.out.println(s.substring(1, 4));
        System.out.println(s.indexOf('n'));
        System.out.println(s.contains("nan"));

        char[] chars = s.toCharArray();
        chars[0] = 'B';
        System.out.println(new String(chars));
        System.out.println(s);
    }
}`,
        expectedOutput: "n\nana\n2\ntrue\nBanana\nbanana",
        note: "toCharArray gives a mutable copy — writing to it leaves the original string untouched, which is exactly what immutability means.",
      },
      {
        title: "Counting characters",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        String s = "mississippi";

        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;

        System.out.println(count['s' - 'a']);
        System.out.println(count['i' - 'a']);

        // The same thing with a map, for non-letter alphabets.
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) counts.merge(c, 1, Integer::sum);
        System.out.println(counts.get('p'));
    }
}`,
        expectedOutput: "4\n4\n2",
        note: "An int[26] indexed by c - 'a' is faster and simpler than a map whenever the alphabet is known to be lowercase letters.",
      },
    ],
    remember: [
      "Never build a string with += in a loop. Use StringBuilder.",
      "Compare with .equals, never ==.",
      "substring copies, so it is O(length) — do not call it inside a tight loop.",
      "int[26] indexed by c - 'a' beats a HashMap when the alphabet is fixed.",
    ],
  },

  {
    slug: "collections",
    title: "Lists, Maps and Sets",
    summary:
      "The three containers that appear in almost every solution, and the methods worth knowing by name.",
    body: [
      "ArrayList is a growable array: O(1) to get by index and to add at the end, O(n) to insert or remove in the middle. Use size(), not length. Removing from the end is cheap, which is why backtracking removes the LAST element.",
      "HashMap gives O(1) average lookup. getOrDefault and merge remove most of the null-checking that otherwise clutters counting code. Iterating a HashMap gives no order guarantee at all; use a TreeMap when order matters, or LinkedHashMap for insertion order.",
      "HashSet is a HashMap with no values, and its add returns whether the element was actually new — a fact that turns duplicate detection into one line.",
      "One rule underlies all three: they hold OBJECTS, never primitives. A List<int> does not compile. That boxing is where the next lesson's traps come from.",
    ],
    snippets: [
      {
        title: "ArrayList basics",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);

        System.out.println(list);
        System.out.println(list.size());
        System.out.println(list.get(1));

        list.remove(list.size() - 1);   // cheap: removing from the end
        System.out.println(list);

        List<Integer> fixed = Arrays.asList(3, 1, 2);
        List<Integer> sorted = new ArrayList<>(fixed);
        Collections.sort(sorted);
        System.out.println(sorted);
    }
}`,
        expectedOutput: "[10, 20, 30]\n3\n20\n[10, 20]\n[1, 2, 3]",
        note: "Arrays.asList gives a FIXED-SIZE view — add or remove on it throws. Copy it into a new ArrayList first.",
      },
      {
        title: "HashMap: getOrDefault and merge",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> counts = new HashMap<>();

        for (String word : new String[]{ "a", "b", "a", "c", "a" }) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        System.out.println(counts.get("a"));

        Map<String, Integer> same = new HashMap<>();
        for (String word : new String[]{ "a", "b", "a", "c", "a" }) {
            same.merge(word, 1, Integer::sum);
        }
        System.out.println(same.get("a"));

        System.out.println(counts.containsKey("z"));
        System.out.println(counts.get("z"));
        System.out.println(counts.getOrDefault("z", 0));
    }
}`,
        expectedOutput: "3\n3\nfalse\nnull\n0",
        note: "get on a missing key returns null, and assigning that to an int throws a NullPointerException. getOrDefault is the fix.",
      },
      {
        title: "HashSet, and add as a test",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Set<Integer> seen = new HashSet<>();
        int[] nums = { 1, 2, 3, 2, 1 };

        List<Integer> duplicates = new ArrayList<>();
        for (int n : nums) {
            if (!seen.add(n)) duplicates.add(n);   // add returns false if present
        }
        System.out.println(seen.size());
        System.out.println(duplicates);
    }
}`,
        expectedOutput: "3\n[2, 1]",
        note: "add returning a boolean means duplicate detection needs no separate contains call.",
      },
      {
        title: "Ordered maps, when order matters",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> hash = new HashMap<>();
        Map<Integer, String> tree = new TreeMap<>();
        for (int k : new int[]{ 3, 1, 2 }) {
            hash.put(k, "v" + k);
            tree.put(k, "v" + k);
        }
        System.out.println(tree.keySet());
        System.out.println(((TreeMap<Integer, String>) tree).firstKey());
        System.out.println(hash.size() == tree.size());
    }
}`,
        expectedOutput: "[1, 2, 3]\n1\ntrue",
        note: "A TreeMap keeps keys sorted and costs O(log n) per operation. HashMap's iteration order is unspecified — never rely on it, even when it looks sorted.",
      },
    ],
    remember: [
      "list.size(), array.length, string.length() — three different spellings.",
      "map.get on a missing key is null; getOrDefault avoids the NullPointerException.",
      "set.add returns false when the element was already there.",
      "Arrays.asList is fixed-size; wrap it in new ArrayList<>(…) to modify it.",
    ],
  },

  {
    slug: "deque-and-heap",
    title: "Deques and Priority Queues",
    summary:
      "One class covers both stack and queue; another answers 'what is the smallest thing here' in O(log n).",
    body: [
      "ArrayDeque is the right choice for both a stack and a queue. push/pop/peek treat it as a stack from the front; offer/poll/peek treat it as a queue. It is faster than the legacy Stack class, which is synchronised for no reason you need.",
      "It has one sharp edge: ArrayDeque REJECTS null. That is usually a feature, but it means a level-order tree walk that enqueues null children as markers must use LinkedList instead.",
      "PriorityQueue is a binary heap, and a MIN-heap by default — the smallest element comes out first. For a max-heap, pass Collections.reverseOrder(), or a comparator.",
      "Two things surprise people about PriorityQueue. Iterating or printing it does NOT give sorted order; only repeated poll does. And it has no decrease-key, which is why Dijkstra implementations push duplicates and skip stale entries when they pop.",
    ],
    snippets: [
      {
        title: "One class, two data structures",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        System.out.println(stack.pop() + " " + stack.peek());

        Deque<Integer> queue = new ArrayDeque<>();
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        System.out.println(queue.poll() + " " + queue.peek());
    }
}`,
        expectedOutput: "3 2\n1 2",
        note: "push/pop work at the front, offer/poll add at the back and remove from the front. Mixing the two families in one structure is a good way to confuse yourself.",
      },
      {
        title: "ArrayDeque rejects null",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<String> ok = new LinkedList<>();
        ok.offer(null);
        System.out.println("LinkedList accepted null: " + (ok.size() == 1));

        try {
            Deque<String> strict = new ArrayDeque<>();
            strict.offer(null);
            System.out.println("no exception");
        } catch (NullPointerException e) {
            System.out.println("ArrayDeque threw NullPointerException");
        }
    }
}`,
        expectedOutput: "LinkedList accepted null: true\nArrayDeque threw NullPointerException",
        note: "This is why a BFS that pushes null children as level markers has to use LinkedList.",
      },
      {
        title: "Min-heap, max-heap, and a comparator",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> min = new PriorityQueue<>();
        PriorityQueue<Integer> max = new PriorityQueue<>(Collections.reverseOrder());
        for (int v : new int[]{ 5, 1, 4 }) { min.offer(v); max.offer(v); }
        System.out.println(min.peek() + " " + max.peek());

        // Rows of {id, cost}, ordered by cost.
        PriorityQueue<int[]> byCost =
            new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
        byCost.offer(new int[]{ 1, 50 });
        byCost.offer(new int[]{ 2, 10 });
        byCost.offer(new int[]{ 3, 30 });
        System.out.println(byCost.poll()[0]);
    }
}`,
        expectedOutput: "1 5\n2",
        note: "Integer.compare rather than a - b: subtraction overflows when the values are far apart, and the comparator then reports the wrong order.",
      },
      {
        title: "Iterating a heap is not sorted",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int v : new int[]{ 5, 1, 4, 2 }) pq.offer(v);

        StringBuilder drained = new StringBuilder();
        while (!pq.isEmpty()) drained.append(pq.poll()).append(' ');
        System.out.println(drained.toString().trim());
    }
}`,
        expectedOutput: "1 2 4 5",
        note: "Polling gives sorted order. Printing the queue directly shows the heap's internal array, which only guarantees that a parent beats its children.",
      },
    ],
    remember: [
      "ArrayDeque for both stacks and queues — but it throws on null.",
      "PriorityQueue is a MIN-heap; reverseOrder() makes it a max-heap.",
      "Comparators: Integer.compare(a, b), never a - b.",
      "Only poll gives sorted order out of a heap.",
    ],
  },

  {
    slug: "boxing-traps",
    title: "Boxing Traps",
    summary:
      "Integer is an object and int is not, and the three places that difference silently changes your answer.",
    body: [
      "Collections cannot hold primitives, so every int put into a List or Map becomes an Integer object. Java hides the conversion, which is convenient right up until it is not.",
      "The first trap is ==. On Integer objects it compares references. Java caches the values -128 to 127, so two Integers holding 100 are the same object and == is true; two holding 1000 are not, and == is false. A test with small numbers passes and the real input fails.",
      "The second is List<Integer>.remove. There are two overloads — remove(int index) and remove(Object). Passing an int calls the INDEX one. Removing the value 2 from a list actually removes whatever is at position 2.",
      "The third is unboxing null. map.get on a missing key returns null, and assigning that to an int throws a NullPointerException from a line that contains no visible method call.",
    ],
    snippets: [
      {
        title: "== on Integer depends on the value",
        code: `public class Main {
    public static void main(String[] args) {
        Integer a = 100, b = 100;
        Integer c = 1000, d = 1000;

        System.out.println(a == b);
        System.out.println(c == d);
        System.out.println(c.equals(d));

        int primitive = 1000;
        System.out.println(c == primitive);   // unboxes, so this compares values
    }
}`,
        expectedOutput: "true\nfalse\ntrue\ntrue",
        note: "The first two lines differ only in magnitude. That is the whole bug: small test values sit inside the cache and compare equal by accident.",
      },
      {
        title: "remove(int) removes by index",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> byIndex = new ArrayList<>(Arrays.asList(10, 20, 30));
        byIndex.remove(2);                       // index 2
        System.out.println(byIndex);

        List<Integer> byValue = new ArrayList<>(Arrays.asList(10, 20, 30));
        byValue.remove(Integer.valueOf(20));     // the value 20
        System.out.println(byValue);
    }
}`,
        expectedOutput: "[10, 20]\n[10, 30]",
        note: "Same method name, same-looking argument, completely different behaviour. Integer.valueOf(x) forces the object overload.",
      },
      {
        title: "Unboxing null",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> counts = new HashMap<>();
        counts.put("a", 1);

        try {
            int missing = counts.get("z");       // null, unboxed to int
            System.out.println(missing);
        } catch (NullPointerException e) {
            System.out.println("NullPointerException on unboxing");
        }

        int safe = counts.getOrDefault("z", 0);
        System.out.println(safe);
    }
}`,
        expectedOutput: "NullPointerException on unboxing\n0",
        note: "The exception comes from the assignment, which is why the stack trace points at a line with no obvious call in it.",
      },
      {
        title: "Sorting with a comparator that overflows",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Integer[] values = { Integer.MIN_VALUE, 1, Integer.MAX_VALUE };

        // a - b overflows: MIN_VALUE - 1 wraps to a positive number.
        System.out.println(Integer.MIN_VALUE - 1 > 0);

        Arrays.sort(values, (a, b) -> Integer.compare(a, b));
        System.out.println(Arrays.toString(values));
    }
}`,
        expectedOutput: "true\n[-2147483648, 1, 2147483647]",
        note: "The first line shows why a - b is not a safe comparator: it claims the smallest int is greater than 1.",
      },
    ],
    remember: [
      "Compare boxed values with .equals, or unbox one side first.",
      "list.remove(2) removes index 2; list.remove(Integer.valueOf(2)) removes the value.",
      "map.get can return null; assigning it to an int throws.",
      "Comparators use Integer.compare, never subtraction.",
    ],
  },

  {
    slug: "recursion",
    title: "Recursion and the Call Stack",
    summary:
      "Every recursive call is a frame on a stack with a fixed size, and every one needs a way to stop.",
    body: [
      "A recursive method needs two things: a base case that returns without recursing, and a recursive step that makes the problem strictly smaller. Missing either gives a StackOverflowError, which in this judge is reported as exactly that — it almost always means a base case that never fires.",
      "Java's default stack is around 512 KB to 1 MB, which is roughly 10,000 to 20,000 frames of a simple method. That matters: a recursive walk over a 10^5-node degenerate tree or linked list will overflow, and has to be rewritten with an explicit stack.",
      "Backtracking has one rule that causes most of its bugs: whatever you add before recursing must be removed after. Adding to a shared list and forgetting to remove leaves stale entries in every later branch.",
      "The other rule is about what you store. Adding the working list itself to the results stores a REFERENCE, so every stored 'answer' changes as the walk continues and they all end up identical. Store a copy.",
    ],
    snippets: [
      {
        title: "Base case and recursive step",
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println(factorial(5));
        System.out.println(fib(10));
    }

    static long factorial(int n) {
        if (n <= 1) return 1;              // base case
        return n * factorial(n - 1);       // strictly smaller
    }

    static int fib(int n) {
        if (n < 2) return n;
        return fib(n - 1) + fib(n - 2);
    }
}`,
        expectedOutput: "120\n55",
        note: "fib here recomputes the same values exponentially often. Memoising it is the whole idea behind Step 16.",
      },
      {
        title: "Backtracking: add, recurse, remove",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<List<Integer>> out = new ArrayList<>();
        subsets(new int[]{ 1, 2 }, 0, new ArrayList<>(), out);
        System.out.println(out);
    }

    static void subsets(int[] a, int i, List<Integer> cur, List<List<Integer>> out) {
        if (i == a.length) {
            out.add(new ArrayList<>(cur));   // a COPY, not cur itself
            return;
        }
        subsets(a, i + 1, cur, out);         // skip

        cur.add(a[i]);
        subsets(a, i + 1, cur, out);         // take
        cur.remove(cur.size() - 1);          // undo
    }
}`,
        expectedOutput: "[[], [2], [1], [1, 2]]",
        note: "Remove the last element after the recursive call, and store a copy rather than cur. Dropping either line breaks it in a way that is hard to read from the output.",
      },
      {
        title: "What happens without the copy",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> working = new ArrayList<>();
        List<List<Integer>> stored = new ArrayList<>();

        working.add(1);
        stored.add(working);                 // stores a reference
        working.add(2);
        stored.add(new ArrayList<>(working)); // stores a copy

        working.add(3);
        System.out.println(stored.get(0));
        System.out.println(stored.get(1));
    }
}`,
        expectedOutput: "[1, 2, 3]\n[1, 2]",
        note: "The first entry was stored when the list held only 1, and now reads [1, 2, 3]. Every 'result' in a backtracking solution goes wrong this way at once.",
      },
      {
        title: "Depth is bounded",
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println(depth(0, 5000));

        try {
            unbounded(0);
        } catch (StackOverflowError e) {
            System.out.println("StackOverflowError");
        }
    }

    static int depth(int at, int limit) {
        if (at == limit) return at;
        return depth(at + 1, limit);
    }

    static int unbounded(int n) {
        return unbounded(n + 1);   // no base case
    }
}`,
        expectedOutput: "5000\nStackOverflowError",
        note: "5,000 frames is comfortable; the missing base case is not. Java does not eliminate tail calls, so even the simple form above consumes a frame per call.",
      },
    ],
    remember: [
      "Every recursion needs a base case and a strictly smaller step.",
      "A StackOverflowError almost always means the base case never fires.",
      "Around 10^4 frames is the practical depth limit — deeper needs an explicit stack.",
      "In backtracking: undo after recursing, and store a copy of the working list.",
    ],
  },
]

export function getJavaLesson(slug: string): JavaLesson | null {
  return javaGuide.find((lesson) => lesson.slug === slug) ?? null
}
