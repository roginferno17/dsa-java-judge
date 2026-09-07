<div align="center">

<!-- Local High-Res Hero Banner -->
<img src="public/hero-banner.svg" width="100%" alt="DSA Java Judge Banner" />

<br/>

<!-- Animated Typing Tagline -->
<a href="https://github.com/roginferno17/dsa-java-judge">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=19&duration=2600&pause=1000&color=F59E0B&center=true&vCenter=true&width=650&height=45&lines=%E2%9A%A1+True+LeetCode-Style+Method+Execution;%F0%9F%93%9A+398+Striver+A2Z+DSA+Problems;%F0%9F%9A%80+Zero+Scanner+Boilerplate+%E2%80%A2+Pure+Algorithms;%F0%9F%92%BE+100%25+Offline+Progress+%26+Streak+Tracking;%E2%9C%A8+One-Click+Windows+Desktop+Launcher" alt="Typing Tagline" />
</a>

<br/>

<!-- Modern Tech Badges Grid -->
<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://www.oracle.com/java/"><img src="https://img.shields.io/badge/Java%2017%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://microsoft.github.io/monaco-editor/"><img src="https://img.shields.io/badge/Monaco%20Editor-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Monaco" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge" alt="License" /></a>
</p>

<!-- Quick Navigation Matrix -->
<p align="center">
  <a href="#-getting-started"><b>🚀 Getting Started</b></a> •
  <a href="#-key-features"><b>🌟 Features</b></a> •
  <a href="#-execution-engine--architecture"><b>⚙️ Execution Engine</b></a> •
  <a href="#-striver-a2z-curriculum"><b>🗺️ Roadmap</b></a> •
  <a href="#-supported-java-data-structures--types"><b>☕ Type System</b></a> •
  <a href="#-development"><b>🛠️ Development</b></a>
</p>

</div>

---

## 💡 Overview

**DSA Java Judge** is a local, offline coding judge built for learning **Java syntax and DSA at the
same time** — the goal being to get comfortable enough to work through LeetCode and Codeforces on
your own.

It follows the **Striver A2Z DSA Sheet** (398 problems across 18 steps) and gives you a
LeetCode-style function execution experience: you write the algorithm inside a method signature and
the sandbox handles reflection invocation, argument deserialization, return-value comparison and
error diagnostics.

Everything runs on your machine. No account, no database, no network calls.

---

## 🚀 Getting Started

### Requirements

| | Needed for | Notes |
| :-- | :-- | :-- |
| **Node.js 20+** | running the app | [nodejs.org](https://nodejs.org/) — LTS is fine |
| **JDK 17 or newer** | compiling and running your solutions | [adoptium.net](https://adoptium.net/) — **required**, the judge cannot work without it |

Verify both are on your PATH:

```bash
node -v && javac -version
```

### First run

```bash
npm install
```

Then either double-click **`JavaJudge.bat`** (Windows), or:

```bash
npm run dev
```

The app opens at `http://localhost:3000`.

> The launcher checks Node and the JDK, frees port 3000 if a previous run is stuck on it, starts the
> dev server bound to `127.0.0.1`, and opens your browser once it responds.

---

## 🔄 Upgrading an existing checkout

If you already had this repo cloned, do these two things after pulling:

**1. Reinstall dependencies.** Five unused packages were removed and `package-lock.json` was
regenerated, so your `node_modules` will be stale:

```bash
npm install
```

**2. Make sure you have a JDK.** The launcher used to fall back to a Docker message if `javac` was
missing. Nothing in the app ever used Docker, so a missing JDK is now a hard error with a link to
install one.

Nothing else is needed. Your progress migrates automatically — see below.

<details>
<summary><b>What changed, and why it matters</b></summary>

<br/>

**Your progress is safe and migrates on first launch.** `user_data/progress.json` is now a derived
snapshot; the source of truth is a new append-only `user_data/events.jsonl`. Your existing solved and
attempted marks are replayed into the log automatically the first time the app reads them.

**`user_data/` is no longer tracked by git.** It used to be committed, which meant two people sharing
this repo would hit a conflict on every pull and overwrite each other's progress. Each clone now
keeps its own. Use **Settings → Export** if you want a backup.

**The judge was giving wrong verdicts.** Worth knowing if you had solutions marked wrong that you
believed were right:

- Every `void` in-place problem (`sortColors`, `rotate`, `merge`) was **impossible to pass**.
- Solutions returning `char[]`, `char[][]`, `boolean[][]`, `double[]`, `String[][]`, `TreeNode`,
  `List<String>` or `List<List<String>>` were **always** marked wrong, whatever you wrote.
- A single `System.out.println` for debugging turned a passing run into a runtime error.
- Compilation time counted against the time limit, so slow-but-legal solutions were falsely TLE'd.
- The sandbox sometimes deleted your compiled class while the JVM was still starting, producing an
  intermittent `Class 'Solution' not found`.

If a problem you solved is still marked unsolved, it is worth another try — it may not have been you.

**Light mode now works.** It was previously unreachable: the theme class applied to `<html>` was
never defined in any stylesheet, and the body colour was hardcoded over the theme tokens.

**Auth, Prisma and Docker were removed.** None of it functioned — the session provider was never
mounted, so the sign-in page could not work, and the environment variables used NextAuth v4 names
while v5 was installed. The app was always fully local.

</details>

---

## 🌟 Key Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🎯 LeetCode-Style Execution</h3>
      <ul>
        <li><b>Zero Scanner boilerplate</b>: arguments are passed straight into your method.</li>
        <li><b>Return-value judging</b> with structural comparison across every supported type.</li>
        <li><b>Fresh instance per test case</b>, so state cannot leak between cases.</li>
        <li><b>Console tab</b>: your <code>System.out.println</code> output is captured and shown, never mixed into the verdict.</li>
        <li><b>Readable errors</b>: compiler messages get a plain-English hint, and runtime errors point at your line.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>📚 Striver A2Z Sheet (398 Problems)</h3>
      <ul>
        <li><b>18 progressive steps</b>, from basics and sorting through trees, graphs, DP and tries.</li>
        <li><b>Dual mode workspace</b>:
          <ul>
            <li>📖 <b>Learn</b> — intuition, approach and complexity.</li>
            <li>⚡ <b>Test</b> — Monaco editor with a test-case inspector.</li>
          </ul>
        </li>
        <li><b>One-click completion toggles</b> with live progress.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🎨 Themes &amp; Settings</h3>
      <ul>
        <li><b>Light, Dark, Blue</b>, plus a fully <b>custom</b> palette you can edit colour by colour.</li>
        <li><b>Share a theme</b>: export it as JSON and import it on another machine.</li>
        <li><b>Editor options</b>: font, size, indent, word wrap, minimap, line numbers.</li>
        <li><b>Judge limits</b>: time and memory, actually enforced.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>💾 Offline Progress &amp; Streaks</h3>
      <ul>
        <li><b>No cloud, no account</b>: everything lives in <code>user_data/</code>.</li>
        <li><b>Append-only activity log</b>, so history survives and concurrent updates cannot clobber each other.</li>
        <li><b>Streaks and an activity heatmap</b>, bucketed in your own timezone.</li>
        <li><b>Backup &amp; restore</b> via JSON export and import.</li>
        <li><b>Storage panel</b> showing real on-disk sizes with cleanup buttons.</li>
      </ul>
    </td>
  </tr>
</table>

---

## ⚙️ Execution Engine & Architecture

```
                                  ┌──────────────────────────────┐
                                  │      Problem Metadata        │
                                  │ (Method, Param Types, Return)│
                                  └──────────────┬───────────────┘
                                                 │
                        ┌────────────────────────┴────────────────────────┐
                        ▼                                                 ▼
        ┌──────────────────────────────┐                  ┌──────────────────────────────┐
        │      User Java Solution      │                  │   Structured Testcases JSON  │
        │    class Solution { ... }    │                  │      (__testcases__.json)    │
        └──────────────┬───────────────┘                  └──────────────┬───────────────┘
                       │                                                 │
                       └────────────────────────┬────────────────────────┘
                                                │
                                                ▼
                        ┌────────────────────────────────────────────────┐
                        │       Universal Sandbox Harness Driver         │
                        │        (src/lib/executor/java/…)               │
                        ├────────────────────────────────────────────────┤
                        │  1. Zero-dependency JSON parser                │
                        │  2. Loads class Solution via reflection        │
                        │  3. Resolves the method by name and signature  │
                        │  4. For each test case:                        │
                        │     • fresh new Solution()                     │
                        │     • converts arguments to real Java types    │
                        │     • captures System.out separately           │
                        │     • normalises both sides, then compares     │
                        │  5. Emits JSON after a result sentinel         │
                        └───────────────────────┬────────────────────────┘
                                                │
                                                ▼
                        ┌────────────────────────────────────────────────┐
                        │      Frontend Testcase Results Inspector       │
                        │   (Status • Runtime • Per-case tabs • Console) │
                        └────────────────────────────────────────────────┘
```

**Two details worth knowing.** The driver prints its verdict after a sentinel marker, so anything you
print yourself can never corrupt the result. And comparison normalises both the actual and expected
values into one canonical shape before checking them, rather than switching on the declared return
type — which is what previously made whole categories of correct answers read as wrong.

The harness lives in a real `.java` file, so it compiles and can be tested on its own:

```bash
bash scripts/driver-smoke.sh
```

---

## ☕ Supported Java Data Structures & Types

| Category | Supported |
| :--- | :--- |
| **Primitives** | `int`, `long`, `double`, `float`, `boolean`, `char`, `String` |
| **1D Arrays** | `int[]`, `long[]`, `double[]`, `boolean[]`, `char[]`, `String[]` |
| **2D Arrays** | `int[][]`, `char[][]`, `String[][]`, `boolean[][]`, `double[][]` |
| **Collections** | `List<Integer>`, `List<Long>`, `List<Double>`, `List<Boolean>`, `List<Character>`, `List<String>`, `List<List<Integer>>`, `List<List<String>>` |
| **Linked Lists** | `ListNode` — array in, array out, with an empty list treated as `null` |
| **Binary Trees** | `TreeNode` — level-order with `null` placeholders, trailing nulls trimmed |
| **In-Place Mutation** | `void` methods; the judge compares the argument your method mutates |

---

## 🗺️ Striver A2Z Curriculum

<details open>
<summary><b>18 Steps · 398 Problems · 130 Easy / 208 Medium / 60 Hard</b></summary>

<br>

| Step | Topic | Problems |
| :---: | :--- | :---: |
| **01** | Learn the Basics | 30 |
| **02** | Learn Important Sorting Techniques | 7 |
| **03** | Arrays | 40 |
| **04** | Binary Search | 32 |
| **05** | Strings | 15 |
| **06** | LinkedList | 31 |
| **07** | Recursion | 25 |
| **08** | Bit Manipulation | 18 |
| **09** | Stack and Queues | 30 |
| **10** | Sliding Window & Two Pointer | 12 |
| **11** | Heaps | 17 |
| **12** | Greedy Algorithms | 16 |
| **13** | Binary Trees | 34 |
| **14** | BST | 16 |
| **15** | Graphs | 25 |
| **16** | Dynamic Programming | 34 |
| **17** | Tries | 6 |
| **18** | Advanced Strings | 10 |

</details>

> **Note on coverage.** All 398 problems are listed and trackable, but only some have a full judge
> harness so far — the rest are being written step by step, starting from Step 1. A problem without a
> harness says so plainly rather than showing a placeholder test. **Settings → Curriculum → Hide
> problems without a judge harness** filters them out if you would rather only see what is ready.

---

## 🛠️ Development

```bash
npm run dev     # dev server
npm run build   # production build
npm run lint    # eslint
```

### Tests

There is no test framework; the suites are plain scripts.

```bash
bash scripts/driver-smoke.sh      # Java harness, no server needed
node scripts/events-smoke.mjs     # activity log and streak maths
node scripts/judge-smoke.mjs      # end-to-end, needs `npm run dev` running
```

### Project structure

```text
├── user_data/                    # local progress, settings, activity log (git-ignored)
├── scripts/                      # test suites
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── execute/          # compile + run a solution
│   │   │   ├── events/           # append-only activity log
│   │   │   ├── progress/         # snapshot read / import / reset
│   │   │   ├── settings/         # settings persistence
│   │   │   └── storage/          # measured disk usage + cleanup
│   │   ├── problem/[slug]/       # workspace: editor, learn mode, results
│   │   ├── roadmap/              # curriculum and step pages
│   │   └── settings/             # settings page
│   ├── components/
│   │   ├── layout/               # shell, local-data menu, back button
│   │   ├── providers/            # theme provider + pre-hydration script
│   │   └── ui/                   # resizable split panels
│   ├── lib/
│   │   ├── data/                 # curriculum and problem metadata
│   │   ├── executor/
│   │   │   ├── java/             # __Driver__.java — the reflection harness
│   │   │   └── sandbox.ts        # compile, run, limits, cleanup
│   │   ├── progress/             # activity log, projection, stats
│   │   ├── settings/             # settings model and store
│   │   └── types/                # shared TypeScript types
├── JavaJudge.bat                 # Windows launcher
└── package.json
```

### A note on isolation

Your Java runs as a normal local process with a time limit and a JVM heap cap. It is **not**
sandboxed — it can read and write files and open sockets like any program you run yourself. That is
fine for solving your own practice problems, which is what this is for. The dev server binds to
`127.0.0.1` so the execution endpoint is not reachable from your network.

---

## 📝 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

<img src="public/footer.svg" width="100%" alt="Footer Wave Banner" />

<br/>

<sub>Crafted with passion by <a href="https://github.com/roginferno17"><b>Vishu Khajuria (roginferno17)</b></a></sub>

</div>
