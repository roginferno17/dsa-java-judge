<div align="center">

<!-- Local High-Res Hero Banner -->
<img src="public/hero-banner.svg" width="100%" alt="DSA Java Judge Banner" />

<br/>

<!-- Animated Typing Tagline -->
<a href="https://github.com/roginferno17/dsa-java-judge">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=19&duration=2600&pause=1000&color=F59E0B&center=true&vCenter=true&width=650&height=45&lines=%E2%9A%A1+True+LeetCode-Style+Method+Execution;%F0%9F%93%9A+474+Curated+Striver+A2Z+DSA+Problems;%F0%9F%9A%80+Zero+Scanner+Boilerplate+%E2%80%A2+Pure+Algorithms;%F0%9F%92%BE+100%25+Offline+Progress+File+Sync;%E2%9C%A8+One-Click+Windows+Desktop+Launcher" alt="Typing Tagline" />
</a>

<br/>

<!-- Modern Tech Badges Grid -->
<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://www.oracle.com/java/"><img src="https://img.shields.io/badge/Java%2021-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://microsoft.github.io/monaco-editor/"><img src="https://img.shields.io/badge/Monaco%20Editor-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Monaco" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge" alt="License" /></a>
</p>

<!-- Quick Navigation Matrix -->
<p align="center">
  <a href="#-key-features"><b>🌟 Features</b></a> •
  <a href="#-quick-start"><b>🚀 Quick Start</b></a> •
  <a href="#-execution-engine--architecture"><b>⚙️ Execution Engine</b></a> •
  <a href="#-striver-a2z-curriculum"><b>🗺️ Roadmap</b></a> •
  <a href="#-supported-java-data-structures--types"><b>☕ Type System</b></a> •
  <a href="#-tech-stack"><b>🛠️ Tech Stack</b></a>
</p>

</div>

---

## 💡 Overview

**DSA Java Judge** is a desktop-ready online coding judge crafted specifically for mastering Data Structures & Algorithms in **Java**.

Built directly around the popular **Striver A2Z DSA Sheet** (474 problems across 18 progressive steps), it delivers a native **LeetCode-style function execution experience**. You write pure algorithms inside your method signature — the sandbox handles reflection invocation, argument deserialization, return-value evaluation, and error diagnostics automatically.

---

## 🌟 Key Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🎯 True LeetCode-Style Execution</h3>
      <ul>
        <li><b>Zero Scanner Boilerplate</b>: Arguments (<code>int[]</code>, <code>int[][]</code>, <code>ListNode</code>, <code>TreeNode</code>) pass directly into your method.</li>
        <li><b>Return-Value Judging</b>: Evaluates method return values with deep type comparison.</li>
        <li><b>Complete State Isolation</b>: Instantiates a fresh <code>new Solution()</code> instance per testcase.</li>
        <li><b>Precise Diagnostics</b>: Differentiates <code>Accepted</code>, <code>Wrong Answer</code>, <code>Compilation Error</code> (with lines), and <code>Runtime Error</code>.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>📚 Striver A2Z Sheet (474 Problems)</h3>
      <ul>
        <li><b>18 Progressive Steps</b>: From Basics & Sorting to Trees, Graphs, DP, and Tries.</li>
        <li><b>Dual Mode Workspace</b>:
          <ul>
            <li>📖 <b>Learn Mode</b>: Concept guides, intuition, complexity analysis.</li>
            <li>⚡ <b>Test Mode</b>: Monaco IDE with interactive testcase inspector.</li>
          </ul>
        </li>
        <li><b>Interactive Completion Bubbles</b>: One-click checkmark toggling with real-time progress calculations.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>📐 Resizable Split IDE</h3>
      <ul>
        <li><b>Horizontal Divider</b>: Drag between Problem Description and Code Editor.</li>
        <li><b>Vertical Divider</b>: Drag between Monaco Editor and Test Results.</li>
        <li><b>Independent Scrollbars</b>: Code and results scroll smoothly inside their panels.</li>
        <li><b>VS Code Monaco Engine</b>: Bracket pair colorization, line highlighting, and code auto-formatting.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>💾 100% Offline & File-Based Sync</h3>
      <ul>
        <li><b>Zero Cloud Lock-in</b>: No external databases or OAuth required.</li>
        <li><b>Automatic Disk Sync</b>: Real-time sync to <code>user_data/progress.json</code>.</li>
        <li><b>One-Click Desktop Launcher</b>: Double-click <code>JavaJudge.bat</code> to boot the local server and open your browser automatically.</li>
        <li><b>Backup & Restore</b>: One-click JSON backup export.</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 Quick Start

### ⚡ Option 1: One-Click Windows Launcher (Recommended)

Simply double-click the included batch launcher:

```cmd
JavaJudge.bat
```

> 🪄 **What the launcher does automatically:**
> 1. Verifies your local **Node.js** and **Java JDK** (JDK 17+/21).
> 2. Clears any orphaned processes and initializes local storage in `user_data/progress.json`.
> 3. Launches the dev server and **automatically opens your web browser** at `http://localhost:3000`.
> 4. Closing the terminal window immediately stops the background server with zero dangling processes.

---

### 💻 Option 2: Manual Terminal Setup

```bash
# 1. Clone the repository
git clone https://github.com/roginferno17/dsa-java-judge.git
cd dsa-java-judge

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [`http://localhost:3000`](http://localhost:3000) in your browser.

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
                        │               (__Driver__.java)                │
                        ├────────────────────────────────────────────────┤
                        │  1. In-Memory Zero-Dependency JSON Deserializer│
                        │  2. Loads class Solution via Java Reflection   │
                        │  3. Validates Method Signature & Return Type   │
                        │  4. For each test case:                        │
                        │     • Instantiates new Solution()              │
                        │     • Converts arguments (int[], Matrix, etc.) │
                        │     • Invokes method & captures return value   │
                        │     • Deep type-aware equality evaluation      │
                        │  5. Emits JSON execution diagnostics           │
                        └───────────────────────┬────────────────────────┘
                                                │
                                                ▼
                        ┌────────────────────────────────────────────────┐
                        │       Frontend Testcase Results Inspector      │
                        │      (Status, Runtime ms, Tabs, Memory)        │
                        └────────────────────────────────────────────────┘
```

---

## ☕ Supported Java Data Structures & Types

The judge natively parses, passes, and deeply validates all major Java DSA types:

| Category | Supported Types & Signatures |
| :--- | :--- |
| **Primitives** | `int`, `long`, `double`, `float`, `boolean`, `char`, `String` |
| **1D Arrays** | `int[]`, `long[]`, `double[]`, `boolean[]`, `char[]`, `String[]` |
| **2D Arrays & Matrices** | `int[][]`, `char[][]`, `String[][]`, `boolean[][]` |
| **Collections** | `List<Integer>`, `List<String>`, `List<List<Integer>>`, `List<List<String>>` |
| **Linked Lists** | `ListNode` (Singly Linked List with auto deserialization & array conversion) |
| **Binary Trees** | `TreeNode` (Binary Tree with level-order array deserialization) |
| **In-Place Mutations** | `void` methods (e.g. `sortColors(int[] nums)`, `rotate(int[] nums, int k)`) |

---

## 🗺️ Striver A2Z Curriculum

<details open>
<summary><b>Click to expand the 18 Steps Roadmap (474 Problems)</b></summary>

<br>

| Step | Topic | Difficulty | Problem Count |
| :---: | :--- | :---: | :---: |
| **01** | **Learn the Basics** (I/O, Conditionals, Loops, Functions, Time Complexity, Recursion, Hashing) | Easy | 31 |
| **02** | **Important Sorting Techniques** (Selection, Bubble, Insertion, Merge, Quick Sort) | Easy / Med | 7 |
| **03** | **Arrays** (Easy, Medium, Hard - Kadane's, 2Sum, 3Sum, 4Sum, Pascal Triangle, Merge Intervals) | Easy → Hard | 40 |
| **04** | **Binary Search** (1D Arrays, 2D Arrays, Search Space / Optimization) | Easy → Hard | 32 |
| **05** | **Strings** (Basic & Medium - Palindrome, Anagram, Roman, Substring problems) | Easy / Med | 15 |
| **06** | **Linked Lists** (1D, Doubly Linked List, Medium & Hard Problems) | Easy → Hard | 31 |
| **07** | **Recursion & Backtracking** (Subsets, Permutations, N-Queens, Sudoku Solver) | Med / Hard | 21 |
| **08** | **Bit Manipulation** (Basics, Subsets, Single Number variants) | Easy / Med | 14 |
| **09** | **Stacks & Queues** (Monotonic Stack, Infix/Postfix, LRU Cache, Sliding Window Max) | Easy → Hard | 30 |
| **10** | **Sliding Window & Two Pointer** (Longest Substring, Fruits into Baskets) | Med / Hard | 12 |
| **11** | **Heaps & Priority Queues** (Kth Largest, Merge K Sorted Lists, Median in Stream) | Med / Hard | 14 |
| **12** | **Greedy Algorithms** (N Meetings, Jump Game, Job Sequencing, Fractional Knapsack) | Easy → Hard | 15 |
| **13** | **Binary Trees** (Traversals, Views, Diameter, LCA, Serialization) | Easy → Hard | 39 |
| **14** | **Binary Search Trees** (BST Search, Insert, Delete, Validate, LCA, Inorder Successor) | Easy / Med | 16 |
| **15** | **Graphs** (BFS/DFS, Topological Sort, Dijkstra, Bellman-Ford, Floyd-Warshall, MST, Bridges) | Med / Hard | 54 |
| **16** | **Dynamic Programming** (1D, 2D, Grids, Subsequences, Strings, Stocks, MCM, Partition) | Med / Hard | 56 |
| **17** | **Tries** (Prefix Trees, Count Distinct Substrings, Maximum XOR) | Med / Hard | 7 |
| **18** | **Strings (Advanced)** (KMP Algorithm, Z-Function, Rabin-Karp) | Hard | 6 |

</details>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
| :--- | :--- |
| **Framework** | **Next.js 15** (App Router, Turbopack, Server Actions) |
| **Language** | **TypeScript 5** / **Java 21** |
| **UI & Styling** | **Tailwind CSS 4** • **Framer Motion** • **Lucide Icons** |
| **Code Editor** | **Monaco Editor** (`@monaco-editor/react`) with VS Code dark theme |
| **State Management** | **Zustand** with local storage & disk synchronization middleware |
| **Sandbox Execution** | Process-isolated Java execution with reflection test harness & timeout protection |

</div>

---

## 📁 Project Structure

```text
├── user_data/              # Local JSON progression storage (progress.json)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── execute/    # LeetCode-style Java compilation & execution endpoint
│   │   │   └── progress/   # Local disk file progress sync endpoint
│   │   ├── problem/[slug]/ # Problem workspace (Monaco editor, learn mode, test results)
│   │   ├── roadmap/        # Complete curriculum roadmap & step detail pages
│   │   ├── globals.css     # Dark mode tokens & modern glassmorphism styling
│   │   └── layout.tsx      # Root client layout & hydration lifecycle wrapper
│   ├── components/
│   │   ├── auth/           # Local Data badge & disk synchronization popup
│   │   ├── layout/         # Client layout transitions
│   │   └── ui/             # Horizontal & Vertical Resizable split panels
│   ├── lib/
│   │   ├── data/           # Striver A2Z 474 problems curriculum & metadata registry
│   │   ├── executor/       # Reflection driver generator & Java sandbox runner
│   │   ├── progress/       # Zustand store with offline disk persistence
│   │   └── types/          # Problem, testcase & execution TypeScript interfaces
├── JavaJudge.bat           # One-click Windows desktop launcher with auto-browser open
├── Dockerfile.java         # Optional containerized execution environment
└── package.json
```

---

## 📝 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

<img src="public/footer.svg" width="100%" alt="Footer Wave Banner" />

<br/>

<sub>Crafted with passion by <a href="https://github.com/roginferno17"><b>Vishu Khajuria (roginferno17)</b></a></sub>

</div>
