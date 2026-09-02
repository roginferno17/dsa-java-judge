<div align="center">

```
   ____  ____    _        _                    _           _             
  |  _ \/ ___|  / \      | | __ ___   ____ _  | |_   _  __| | __ _  ___  
  | | | \___ \ / _ \  _  | |/ _` \ \ / / _` | | | | | |/ _` |/ _` |/ _ \ 
  | |_| |___) / ___ \| |_| | (_| |\ V / (_| | |_| |_| | (_| | (_| |  __/ 
  |____/|____/_/   \_\\___/ \__,_| \_/ \__,_|  \__\__,_|\__,_|\__, |\___| 
                                                             |___/       
```

# ☕ DSA Java Judge

### *A Complete LeetCode-Style Java DSA Platform for the Striver A2Z DSA Sheet*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Java](https://img.shields.io/badge/Java-17%2F21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#-key-features) • [Quick Start](#-quick-start) • [Execution Engine](#-how-the-judge-works) • [Curriculum Roadmap](#-striver-a2z-curriculum) • [Architecture](#-architecture)

---

</div>

## 💡 Overview

**DSA Java Judge** is an interactive, full-stack online coding judge built specifically for mastering Data Structures & Algorithms in **Java**. 

Built directly around the popular **Striver A2Z DSA Sheet** (474 curated problems across 18 progressive steps), it delivers a native **LeetCode-style function execution experience** — allowing you to focus 100% on writing clean algorithms without worrying about `Scanner`, standard input parsing, or boilerplate setup.

---

## ✨ Key Features

### 🎯 True LeetCode-Style Method Execution
- **No `Scanner` or `System.in` required**: Arguments (`int[]`, `int[][]`, `String`, `ListNode`, `TreeNode`, etc.) are automatically parsed and passed directly into your method signature.
- **Return-value evaluation**: Your method's return value is evaluated as the answer with deep, type-aware comparison.
- **Complete state isolation**: Every test case instantiates a fresh `new Solution()` instance to prevent variable state leakage.
- **Instant diagnostics**: Clear separation between `Accepted`, `Wrong Answer`, `Compilation Error` (with line numbers), `Runtime Error` (with stack traces), and `Time Limit Exceeded`.

### 📚 Striver A2Z Complete Curriculum (474 Problems)
- **18 Comprehensive Steps**: From language fundamentals and sorting to Trees, Graphs, Dynamic Programming, and Tries.
- **Dual-Mode Problem Solving**:
  - 📖 **Learn Mode**: Deep concept breakdowns, step-by-step approaches, time/space complexity analysis, and common pitfalls.
  - ⚡ **Test Mode**: Full-featured IDE with syntax highlighting, parameter-aware test case inspector, and instant execution results.
- **Clickable Progress Bubbles**: One-click interactive checkmarks on problem rows that instantly update your progress.

### 💾 100% Local & Offline Progression
- **Zero Cloud / OAuth Dependencies**: Runs completely locally on your computer.
- **Auto-Sync to Disk**: Every solved problem, attempt, and timestamp is persisted in real-time to `user_data/progress.json`.
- **One-Click Backup & Restore**: Export your progress JSON anytime or reset with a single click.

### ⚡ One-Click Windows Launcher (`JavaJudge.bat`)
- Double-click `JavaJudge.bat` to automatically verify prerequisites, start the local development server, and open your browser at `http://localhost:3000`.
- Closing the terminal window instantly stops the background server with zero dangling processes.

---

## 🚀 Quick Start

### Option 1: One-Click Launcher (Windows)

Simply double-click the included batch file:

```cmd
JavaJudge.bat
```

> The launcher will verify Node.js and Java, install dependencies if needed, launch `http://localhost:3000`, and open your default web browser automatically!

### Option 2: Manual Setup

```bash
# 1. Clone the repository
git clone https://github.com/roginferno17/dsa-java-judge.git
cd dsa-java-judge

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000) in your browser.

---

## ⚙️ How the Judge Works

Unlike traditional judges that rely on raw text matching through standard input/output streams, DSA Java Judge uses a typed reflection test harness:

```
┌─────────────────────────────────────────────────────────────┐
│ Problem Definition (Method Name, Types, Return Type)        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ User Solution Code (class Solution { ... })                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Typed Testcase Payload (__testcases__.json)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Sandboxed Java Compiler & Harness (__Driver__.java)         │
│  1. Compiles Solution.java + __Driver__.java                │
│  2. Loads class Solution via Reflection                     │
│  3. Validates Method Signature & Return Type                │
│  4. For each testcase:                                      │
│     - Instantiates fresh new Solution()                     │
│     - Constructs typed Java arguments (int[], Matrix, etc.) │
│     - Invokes method & captures return value                │
│     - Performs deep structural / order-aware comparison     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Structured Results (Passed / Failed / Diagnostics)          │
└─────────────────────────────────────────────────────────────┘
```

### Supported Java Types

| Category | Supported Signatures |
| :--- | :--- |
| **Primitives** | `int`, `long`, `double`, `float`, `boolean`, `char`, `String` |
| **1D Arrays** | `int[]`, `long[]`, `double[]`, `boolean[]`, `char[]`, `String[]` |
| **2D Arrays / Matrices** | `int[][]`, `char[][]`, `String[][]`, `boolean[][]` |
| **Collections** | `List<Integer>`, `List<String>`, `List<List<Integer>>`, `List<List<String>>` |
| **Data Structures** | `ListNode` (Singly Linked List), `TreeNode` (Binary Tree) |
| **In-Place Mutations** | `void` methods (e.g. `sortColors(int[] nums)`, `rotate(int[] nums, int k)`) |

---

## 🗺️ Striver A2Z Curriculum

<details open>
<summary><b>Click to expand the 18 Steps Roadmap</b></summary>

<br>

| Step | Topic | Difficulty | Problems |
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

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer-motion.dev/)
- **Code Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) (VS Code Engine)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with disk persistence middleware
- **Execution Sandbox**: Sandboxed Java (JDK 17+/21) with process isolation & containerized fallback
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
├── user_data/              # Local JSON progress storage (progress.json)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── execute/    # LeetCode-style code execution endpoint
│   │   │   └── progress/   # Local file progress sync endpoint
│   │   ├── problem/[slug]/ # Problem IDE (Monaco editor, test cases, learn mode)
│   │   ├── roadmap/        # Roadmap & step topic detail views
│   │   ├── globals.css     # Dark mode design system tokens
│   │   └── layout.tsx      # Root client layout
│   ├── components/
│   │   ├── auth/           # Local Data badge & disk sync manager
│   │   ├── layout/         # Smooth client page transitions
│   │   └── ui/             # Resizable panels & UI components
│   ├── lib/
│   │   ├── data/           # Curriculum dataset (474 problems) & metadata registry
│   │   ├── executor/       # Java driver harness & execution sandbox
│   │   ├── progress/       # Zustand store with offline sync middleware
│   │   └── types/          # Problem, testcase & judge TypeScript interfaces
├── JavaJudge.bat           # One-click Windows desktop launcher
├── Dockerfile.java         # Optional containerized runner environment
└── package.json
```

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/roginferno17">roginferno17</a></sub>
</div>
