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
  <a href="#-start-here--what-just-changed"><b>👋 Start Here</b></a> •
  <a href="#-getting-started"><b>🚀 Getting Started</b></a> •
  <a href="#-key-features"><b>🌟 Features</b></a> •
  <a href="#-execution-engine--architecture"><b>⚙️ Execution Engine</b></a> •
  <a href="#-striver-a2z-curriculum"><b>🗺️ Roadmap</b></a> •
  <a href="#-supported-java-data-structures--types"><b>☕ Type System</b></a> •
  <a href="#-development"><b>🛠️ Development</b></a>
</p>

</div>

---

## 👋 Start here — what just changed

Hi Vishu. The project has had a large pass over it, merged into `main` as a single commit
(`Merge judge-fixes`). If anything looks wrong, `git revert -m 1 <that commit>` undoes all of it in
one step.

**The short version:** the judge was giving wrong verdicts, and 386 of the 398 problems were
placeholders. Both are fixed.

| | Before | Now |
| :-- | :-- | :-- |
| Problems with a real statement and tests | 12 | **398** |
| Reference solutions | 0 | **398**, committed and run by the gate |
| `void` in-place problems (`sortColors`, `rotate`, `merge`) | impossible to pass | fixed |
| Returning `char[]`, `TreeNode`, `List<String>`… | always marked wrong | fixed |
| `System.out.println` while debugging | turned a pass into a runtime error | captured in a Console tab |
| Light mode | unreachable in any stylesheet | works |

### After pulling

```bash
git pull
npm install          # five unused packages were removed; node_modules will be stale
npm run dev
```

Your progress is safe — see *Upgrading an existing checkout* below. `user_data/` is no longer
tracked by git, so we stop clobbering each other's progress on every pull.

### Checking it rather than trusting it

Nothing here asks to be taken on faith. Every claim above has a script behind it:

```bash
bash scripts/driver-smoke.sh                                            # 19 harness tests, no server
node --import ./scripts/register-alias.mjs scripts/events-smoke.mjs     # 17 streak/log tests
npm run dev                                                             # the two below need this
node --import ./scripts/register-alias.mjs scripts/judge-smoke.mjs      # 13 end-to-end judge tests
node --import ./scripts/register-alias.mjs scripts/verify-step.mjs 13   # any step, 01 to 18
node --import ./scripts/register-alias.mjs scripts/verify-java-guide.mjs
```

`verify-step.mjs` is the one worth understanding. Per problem it requires the **starter code to
compile AND fail its own tests** — a green run on untouched starter code would mean the test proves
nothing — and the committed reference solution to pass every sample and hidden case. No step shipped
until it passed.

Expected outputs were also computed by brute force **independently of the reference solution**,
before that solution was written, because otherwise a wrong solution and a wrong expected value
agree with each other. That caught real mistakes: a Dijkstra distance, a diagonal grid path with no
three-cell route, a BST test case that no single two-value swap could produce, and a jump-game input
that violated the problem's own reachability guarantee.

### Where to look first

- `src/lib/executor/sandbox.ts` and `src/lib/executor/java/__Driver__.java` — the judge fixes.
- `src/lib/data/problems/` — the 398 problems, one module per step.
- `scripts/verify-step.mjs` — the gate.
- `src/app/learn/java/` — the Java syntax track, if you want the language side first.

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

### Optional: a `dsa` command you can type anywhere

Run this once, from the repo:

```bash
powershell -ExecutionPolicy Bypass -File scripts\install-command.ps1
```

Then, from any folder in any terminal:

| | |
| :-- | :-- |
| `dsa` | start it — or just open the browser if it is already running |
| `dsa here` | run in the current terminal so you can see the logs; Ctrl+C stops it |
| `dsa stop` | stop a server left running in the background |
| `dsa help` | the above, plus the repo path and port in use |

`dsa` on an already-running server takes about half a second and does not restart it, so it is
safe to type whenever you want the app in front of you.

<details>
<summary><b>What the installer touches</b></summary>

<br/>

Three things, none of them needing admin rights:

1. Creates `%USERPROFILE%in` if it does not exist.
2. Writes a two-line `dsa.cmd` there that calls `scripts\dsa.cmd` in this repo.
3. Adds `%USERPROFILE%in` to your **user** `Path` if it is not already there.

It does not touch the system-wide `Path` and installs nothing. The shim is deliberately thin — the
real logic lives in `scripts/dsa.cmd` inside the repo, so `git pull` updates the command and you
never rerun the installer.

To undo: delete `%USERPROFILE%in\dsa.cmd`, and remove that folder from your `Path` in the
environment-variables dialog.

</details>

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
        <li><b>Three-mode workspace</b>:
          <ul>
            <li>📖 <b>Learn</b> — intuition, approach, pitfalls, complexity.</li>
            <li>⚡ <b>Test</b> — Monaco editor with a test-case inspector.</li>
            <li>📝 <b>Notes</b> — your own scratchpad, saved to disk.</li>
          </ul>
        </li>
        <li><b>Search across all 398</b> with <kbd>Ctrl</kbd>+<kbd>K</kbd>, filtered by difficulty and status.</li>
        <li><b>One-click completion toggles</b> with live progress.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>☕ Java Syntax Track</h3>
      <ul>
        <li><b>Seven lessons</b> at <code>/learn/java</code>: overflow, arrays, strings, collections, deques and heaps, boxing traps, recursion depth.</li>
        <li><b>28 editable, runnable snippets</b> — change a line and run it in the same sandbox the judge uses.</li>
        <li><b>Gated in CI</b>: every snippet must compile and print exactly what the page claims.</li>
        <li>Aimed at the gap between knowing an algorithm and writing it in Java.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>✅ Verified Content</h3>
      <ul>
        <li><b>398 reference solutions</b> committed under <code>fixtures/solutions/</code>.</li>
        <li><b>Starter code must FAIL</b> its own tests — a green run on untouched starter code would mean the test proves nothing.</li>
        <li><b>Expected outputs checked independently</b> of the reference solution, by brute force, before the solution was written.</li>
        <li>Ambiguous answers are ruled out by stating an ordering, not left to chance.</li>
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

> **Coverage: all 398.** Every problem has a real statement, constraints, a method signature,
> starter code, worked examples, hidden edge cases, and authored teaching notes — plus a reference
> solution committed under `fixtures/solutions/`. Nothing is generated or placeholder.
>
> Each step was gated by `scripts/verify-step.mjs` before it shipped. Per problem, that script
> requires the starter code to compile AND fail its own tests, and the committed reference solution
> to pass every sample and hidden case. A step that does not pass does not ship.

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

Two content gates, both needing the dev server:

```bash
# One curriculum step: starter must compile and FAIL, reference must pass everything
node --import ./scripts/register-alias.mjs scripts/verify-step.mjs 01

# Every snippet in the Java track compiles, runs, and prints what the page claims
node --import ./scripts/register-alias.mjs scripts/verify-java-guide.mjs
```

### Project structure

```text
├── user_data/                    # local progress, notes, settings, activity log (git-ignored)
├── fixtures/solutions/           # a reference solution per problem, run by the gate
├── scripts/                      # test suites and content gates
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── execute/          # compile + run a solution
│   │   │   ├── events/           # append-only activity log
│   │   │   ├── notes/            # per-problem scratchpad notes
│   │   │   ├── progress/         # snapshot read / import / reset
│   │   │   ├── settings/         # settings persistence
│   │   │   └── storage/          # measured disk usage + cleanup
│   │   ├── learn/java/           # Java syntax track, runnable snippets
│   │   ├── problem/[slug]/       # workspace: editor, learn mode, notes, results
│   │   ├── roadmap/              # curriculum, search, step pages
│   │   └── settings/             # settings page
│   ├── components/
│   │   ├── layout/               # shell, local-data menu, back button
│   │   ├── learn/                # runnable Java snippet
│   │   ├── notes/                # per-problem scratchpad
│   │   ├── providers/            # theme provider + pre-hydration script
│   │   ├── search/               # search across all 398 problems
│   │   └── ui/                   # resizable split panels
│   ├── lib/
│   │   ├── data/                 # curriculum, problem metadata, Java guide
│   │   ├── notes/                # notes store
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
