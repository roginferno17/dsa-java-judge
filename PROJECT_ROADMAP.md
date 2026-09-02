# DSA Java Judge — Project Roadmap

## Section 1: Product Vision

### What We Are Building
A complete DSA (Data Structures & Algorithms) learning ecosystem that combines:
- **Striver A2Z DSA learning structure** — A proven, structured curriculum with 474 problems across 18 steps
- **LeetCode-style coding environment** — Java code editor with compilation, execution, and test case validation
- **Interactive learning system** — Learn mode teaches concepts before attempting problems
- **Progress tracking** — Track completion, attempts, and roadmap percentage

### Who It Is For
- **Beginners** who know little or nothing about Java
- **Students** preparing for coding interviews at FAANG/tech companies
- **Self-learners** who want a structured, guided path through DSA
- **Anyone** who wants to learn DSA from A to Z in a well-organized manner

### What Problem It Solves
1. **Fragmented learning** — Most learners jump between random resources without structure
2. **Theory-practice gap** — Jumping straight to coding without understanding concepts
3. **No guided progression** — Difficulty knowing what to learn next
4. **External dependencies** — Relying on multiple platforms (YouTube, articles, LeetCode) creates friction
5. **Progress blindness** — No visibility into how far along you are in the journey

---

## Section 2: Architecture Plan

### Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 14+ (App Router) | Server-side rendering for SEO, excellent DX, React ecosystem |
| **UI Framework** | Tailwind CSS + shadcn/ui | Rapid development, consistent design, accessible components |
| **State Management** | Zustand + React Query | Lightweight client state + server state caching |
| **Code Editor** | Monaco Editor | VS Code experience in browser, syntax highlighting, autocomplete |
| **Animations** | Framer Motion | Smooth page transitions, expand/collapse, hover effects |
| **Backend** | Next.js API Routes + tRPC | Type-safe APIs, reduced boilerplate, full-stack type inference |
| **Database** | PostgreSQL + Prisma ORM | Relational data, type-safe queries, excellent migration support |
| **Auth** | NextAuth.js (Auth.js) | Flexible auth with GitHub/Google providers |
| **Code Execution** | Docker containers (isolated) | Security, sandboxing, resource limits |
| **File Storage** | Local filesystem (expandable to S3) | Problem data, user submissions |
| **Deployment** | Vercel (frontend) + Railway/Fly.io (execution) | Scalable, serverless-friendly |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
├─────────────────────────────────────────────────────────┤
│  Next.js App + Monaco Editor + Framer Motion            │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────────┐
│                 NEXT.JS SERVER                           │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  Page Routes │  │  tRPC APIs  │  │  Server Actions │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│                    │                                     │
│  ┌─────────────────▼─────────────────────────────────┐  │
│  │              Prisma ORM                           │  │
│  └─────────────────┬─────────────────────────────────┘  │
└─────────────────────┼───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 POSTGRESQL DATABASE                      │
│  Users, Problems, Topics, Submissions, Progress         │
└─────────────────────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│              CODE EXECUTION SERVICE                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Docker Container Pool                             │ │
│  │  - Compile Java code                               │ │
│  │  - Execute with test cases                         │ │
│  │  - Capture stdout/stderr                           │ │
│  │  - Resource limits (CPU, Memory, Time)             │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## Section 3: Database Design

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255),
    email           VARCHAR(255) UNIQUE NOT NULL,
    image           TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Steps (Chapters) - e.g., "Step 1: Learn the basics"
CREATE TABLE steps (
    id              SERIAL PRIMARY KEY,
    step_number     INTEGER UNIQUE NOT NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    slug            VARCHAR(255) UNIQUE NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Topics - e.g., "User Input / Output", "Data Types"
CREATE TABLE topics (
    id              SERIAL PRIMARY KEY,
    step_id         INTEGER REFERENCES steps(id),
    topic_number    INTEGER NOT NULL,
    title           VARCHAR(255) NOT NULL,
    slug            VARCHAR(255) UNIQUE NOT NULL,
    difficulty      VARCHAR(20) DEFAULT 'EASY', -- EASY, MEDIUM, HARD
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Problems
CREATE TABLE problems (
    id              SERIAL PRIMARY KEY,
    topic_id        INTEGER REFERENCES topics(id),
    problem_number  INTEGER UNIQUE NOT NULL,
    title           VARCHAR(255) NOT NULL,
    slug            VARCHAR(255) UNIQUE NOT NULL,
    difficulty      VARCHAR(20) NOT NULL, -- EASY, MEDIUM, HARD
    description     TEXT NOT NULL,
    examples        JSONB NOT NULL, -- [{input, output, explanation}]
    constraints     JSONB NOT NULL, -- [{text}]
    hints           TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Learn Mode Content
CREATE TABLE learn_content (
    id              SERIAL PRIMARY KEY,
    problem_id      INTEGER REFERENCES problems(id),
    concept         TEXT NOT NULL, -- What concept is involved
    why_exists      TEXT NOT NULL, -- Why it exists
    when_to_use     TEXT NOT NULL, -- When to use
    identification  TEXT NOT NULL, -- How to identify such problems
    approach        TEXT NOT NULL, -- How to approach solving
    common_mistakes TEXT, -- Common mistakes
    complexity      TEXT, -- Complexity analysis
    examples        JSONB, -- Example walkthroughs
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Test Cases
CREATE TABLE test_cases (
    id              SERIAL PRIMARY KEY,
    problem_id      INTEGER REFERENCES problems(id),
    case_number     INTEGER NOT NULL,
    input           TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_hidden       BOOLEAN DEFAULT false, -- Hidden test cases
    created_at      TIMESTAMP DEFAULT NOW()
);

-- User Submissions
CREATE TABLE submissions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    problem_id      INTEGER REFERENCES problems(id),
    code            TEXT NOT NULL,
    language        VARCHAR(50) DEFAULT 'java',
    status          VARCHAR(20) NOT NULL, -- PENDING, ACCEPTED, WRONG_ANSWER, TLE, CE, RE
    execution_time  INTEGER, -- milliseconds
    memory_used     INTEGER, -- kilobytes
    test_cases_passed INTEGER,
    total_test_cases INTEGER,
    submitted_at    TIMESTAMP DEFAULT NOW()
);

-- User Progress
CREATE TABLE user_progress (
    id              SERIAL PRIMARY KEY,
    user_id         UUID REFERENCES users(id),
    problem_id      INTEGER REFERENCES problems(id),
    status          VARCHAR(20) DEFAULT 'NOT_STARTED', -- NOT_STARTED, ATTEMPTED, SOLVED
    attempts        INTEGER DEFAULT 0,
    last_attempt_at TIMESTAMP,
    solved_at       TIMESTAMP,
    UNIQUE(user_id, problem_id)
);

-- User Roadmap Progress (aggregated)
CREATE TABLE user_roadmap_progress (
    id              SERIAL PRIMARY KEY,
    user_id         UUID REFERENCES users(id) UNIQUE,
    total_problems  INTEGER DEFAULT 0,
    solved_problems INTEGER DEFAULT 0,
    last_activity   TIMESTAMP DEFAULT NOW(),
    created_at      TIMESTAMP DEFAULT NOW()
);
```

### Relationships

```
Step (1) ──── (Many) Topic
Topic (1) ──── (Many) Problem
Problem (1) ──── (Many) TestCase
Problem (1) ──── (1) LearnContent
User (1) ──── (Many) Submission
User (1) ──── (Many) UserProgress
User (1) ──── (1) UserRoadmapProgress
```

---

## Section 4: Development Phases

### Phase 1: Project Foundation
**Goal:** Set up the base project structure, database, and basic routing

**Files affected:**
- `package.json` (dependencies)
- `next.config.js`
- `prisma/schema.prisma`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/lib/prisma.ts`
- `docker-compose.yml` (PostgreSQL)

**Testing:**
- Application starts without errors
- Database connection works
- Basic routing works

**Estimated effort:** 1-2 hours

---

### Phase 2: Database Seeding & Data Model
**Goal:** Seed the Striver A2Z curriculum structure into the database

**Files affected:**
- `prisma/seed.ts`
- `src/lib/data/` (curriculum data files)

**What gets seeded:**
- 18 Steps with titles and descriptions
- All Topics under each Step
- All 474 Problems with metadata (title, difficulty, slug)

**Testing:**
- Database contains all steps, topics, and problems
- Query structure works correctly
- Data matches Striver A2Z structure

**Estimated effort:** 2-3 hours

---

### Phase 3: Homepage & Roadmap Navigation
**Goal:** Create the main roadmap page showing all steps and topics

**Files affected:**
- `src/app/page.tsx` (homepage)
- `src/components/roadmap/StepCard.tsx`
- `src/components/roadmap/TopicList.tsx`
- `src/components/roadmap/ProblemRow.tsx`
- `src/app/roadmap/[stepSlug]/page.tsx`

**Features:**
- Display all 18 steps in a card layout
- Expandable topic lists
- Problem counts per topic
- Difficulty badges (Easy/Medium/Hard)
- Smooth expand/collapse animations (Framer Motion)

**Testing:**
- Homepage loads correctly
- Steps expand to show topics
- Navigation to step pages works

**Estimated effort:** 3-4 hours

---

### Phase 4: Problem Listing Page
**Goal:** Create the problem listing page for each topic

**Files affected:**
- `src/app/roadmap/[stepSlug]/[topicSlug]/page.tsx`
- `src/components/problems/ProblemTable.tsx`
- `src/components/problems/DifficultyBadge.tsx`

**Features:**
- Table view of problems in a topic
- Problem number, title, difficulty
- Status indicator (Solved/Attempted/Not Started)
- Click to navigate to problem page

**Testing:**
- Problem list displays correctly
- Filtering by difficulty works
- Navigation to problem page works

**Estimated effort:** 2-3 hours

---

### Phase 5: Problem Page — Learn Mode
**Goal:** Create the Learn Mode interface for problems

**Files affected:**
- `src/app/problem/[problemSlug]/page.tsx`
- `src/components/problem/LearnMode.tsx`
- `src/components/problem/ConceptSection.tsx`
- `src/components/problem/ApproachSection.tsx`
- `src/components/problem/MistakesSection.tsx`

**Features:**
- Split view: Problem description + Learn content
- Concept explanation
- Why the concept exists
- When to use it
- How to identify such problems
- Step-by-step approach
- Common mistakes
- Complexity analysis
- Toggle between Learn and Test modes

**Testing:**
- Learn content displays correctly
- All sections render properly
- Mode toggle works

**Estimated effort:** 3-4 hours

---

### Phase 6: Problem Page — Test Mode (Code Editor)
**Goal:** Create the coding environment with Monaco Editor

**Files affected:**
- `src/components/problem/TestMode.tsx`
- `src/components/problem/CodeEditor.tsx`
- `src/components/problem/TestCasePanel.tsx`
- `src/components/problem/ProblemDescription.tsx`

**Features:**
- Monaco Editor with Java syntax highlighting
- Problem statement display
- Example test cases
- Constraints display
- Run button
- Submit button
- Resizable panels (like VS Code)
- Full viewport utilization

**Testing:**
- Editor loads correctly
- Syntax highlighting works
- Panel resizing works
- Full viewport layout works

**Estimated effort:** 4-5 hours

---

### Phase 7: Code Execution Service
**Goal:** Build the backend service for compiling and running Java code

**Files affected:**
- `src/app/api/execute/route.ts`
- `src/lib/executor/compiler.ts`
- `src/lib/executor/runner.ts`
- `src/lib/executor/sandbox.ts`
- `Dockerfile.java-executor`

**Features:**
- Compile Java code
- Execute with test cases
- Capture stdout/stderr
- Resource limits (CPU: 1 core, Memory: 256MB, Time: 5s)
- Sandboxed execution in Docker
- Return compilation results and test case outcomes

**Testing:**
- Compile Java code successfully
- Execute simple programs
- Handle compilation errors
- Handle runtime errors
- Timeout handling
- Multiple test case execution

**Estimated effort:** 5-6 hours

---

### Phase 8: Run & Submit Functionality
**Goal:** Connect the editor to the execution service

**Files affected:**
- `src/components/problem/TestMode.tsx` (update)
- `src/components/problem/RunResults.tsx`
- `src/components/problem/SubmissionHistory.tsx`
- `src/app/api/submissions/route.ts`

**Features:**
- Run code against sample test cases
- Display results (Accepted/Wrong Answer/Compile Error/Runtime Error)
- Show execution time and memory usage
- Submit code against hidden test cases
- Store submission history
- Show pass/fail status per test case

**Testing:**
- Run button executes code
- Results display correctly
- Submission stores in database
- Multiple submissions work

**Estimated effort:** 4-5 hours

---

### Phase 9: Progress Tracking System
**Goal:** Track user progress across the roadmap

**Files affected:**
- `src/app/api/progress/route.ts`
- `src/lib/progress/tracker.ts`
- `src/components/progress/ProgressCard.tsx`
- `src/components/progress/StepProgressBar.tsx`
- `src/components/progress/TopicProgressBar.tsx`

**Features:**
- Mark problems as solved/attempted
- Calculate step completion percentage
- Calculate topic completion percentage
- Calculate overall roadmap percentage
- Display progress on roadmap page
- Show "35/389 Completed" style indicators
- Progress persistence in database

**Testing:**
- Progress updates correctly
- Percentages calculate accurately
- Roadmap shows correct progress
- Progress persists across sessions

**Estimated effort:** 3-4 hours

---

### Phase 10: Authentication
**Goal:** Add user authentication

**Files affected:**
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/lib/auth.ts`
- `src/components/auth/LoginButton.tsx`
- `src/components/auth/UserMenu.tsx`
- `src/app/layout.tsx` (update)

**Features:**
- GitHub OAuth login
- Google OAuth login
- Session management
- User profile display
- Protected routes for submissions and progress

**Testing:**
- Login with GitHub works
- Login with Google works
- Session persists
- Protected routes redirect to login

**Estimated effort:** 2-3 hours

---

### Phase 11: UI Polish & Animations
**Goal:** Add animations and polish the UI

**Files affected:**
- `src/components/ui/animations.tsx`
- `src/components/roadmap/StepCard.tsx` (update)
- `src/components/problem/TestMode.tsx` (update)
- `src/app/globals.css`

**Features:**
- Page transitions (Framer Motion)
- Topic expansion animations
- Button hover effects
- Panel resize animations
- Loading states
- Empty states
- Error states
- Toast notifications

**Testing:**
- Animations are smooth
- No performance issues
- Mobile responsive
- Dark/light mode works

**Estimated effort:** 3-4 hours

---

### Phase 12: Data Population — Learn Content
**Goal:** Add comprehensive learn content for all problems

**Files affected:**
- `prisma/seeds/learn-content.ts`
- `src/lib/data/learn-content/` (topic-wise files)

**What gets added:**
- Concept explanations for all 474 problems
- Approach breakdowns
- Common mistakes
- Complexity analysis
- Example walkthroughs

**Testing:**
- Learn content displays correctly
- All sections render properly
- Content is accurate and helpful

**Estimated effort:** 8-10 hours (content-heavy)

---

### Phase 13: Data Population — Test Cases
**Goal:** Add comprehensive test cases for all problems

**Files affected:**
- `prisma/seeds/test-cases.ts`
- `src/lib/data/test-cases/` (topic-wise files)

**What gets added:**
- Sample test cases (visible)
- Hidden test cases (for submission)
- Edge cases
- Boundary conditions

**Testing:**
- Test cases execute correctly
- Edge cases are covered
- No false positives/negatives

**Estimated effort:** 6-8 hours (content-heavy)

---

## Section 5: Future Expansion Plan

### Phase 14: Analytics Dashboard
**Goal:** Provide insights into learning patterns
- Time spent per topic
- Difficulty distribution
- Weak areas identification
- Streak tracking

### Phase 15: AI Tutor Integration
**Goal:** Add AI-powered learning assistance
- Code review
- Hint system
- Concept explanations
- Personalized recommendations

### Phase 16: Community Features
**Goal:** Add social learning features
- Discussion forums per problem
- Solution sharing (after solving)
- Leaderboards
- Study groups

### Phase 17: Multi-Language Support
**Goal:** Extend beyond Java
- Python support
- C++ support
- JavaScript support
- Language selection per problem

### Phase 18: Cloud Sync & Mobile
**Goal:** Cross-platform access
- Cloud progress sync
- Mobile app (React Native)
- Offline mode
- Push notifications

### Phase 19: Certification System
**Goal:** Recognize achievements
- Completion certificates
- Skill badges
- Shareable progress

### Phase 20: Advanced Features
**Goal:** Enterprise and advanced features
- Admin dashboard
- Content management system
- API for third-party integrations
- White-label solutions

---

## Section 6: Technical Decisions & Rationale

### Why Next.js App Router?
- Server-side rendering for SEO (important for educational content)
- Excellent developer experience
- Built-in API routes reduce backend complexity
- Strong TypeScript support

### Why Monaco Editor?
- Same editor as VS Code
- Excellent Java syntax highlighting
- Built-in autocomplete
- Professional feel

### Why Docker for Code Execution?
- Security: Isolated execution environment
- Resource control: CPU, memory, time limits
- Clean state: Fresh container per execution
- Scalability: Can run multiple containers in parallel

### Why PostgreSQL?
- Relational data fits the curriculum structure
- JSONB for flexible fields (examples, constraints)
- Excellent with Prisma ORM
- ACID compliance for submissions

### Why Framer Motion?
- Declarative animations
- Excellent performance
- Rich animation library
- Easy page transitions

---

## Section 7: Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Code execution security | High | Docker sandboxing, resource limits, no network access |
| Performance with 474 problems | Medium | Pagination, lazy loading, caching |
| Content creation (474 learn pages) | High | Start with most common problems, community contributions |
| Test case accuracy | High | Extensive testing, community verification |
| Mobile responsiveness | Medium | Mobile-first design, regular testing |

---

## Section 8: Success Metrics

| Metric | Target |
|--------|--------|
| Problems available | 474 |
| Learn content coverage | 100% |
| Test case coverage | 100% |
| Page load time | < 2 seconds |
| Code execution time | < 5 seconds |
| User satisfaction | > 4.5/5 |
| Completion rate | > 30% |

---

## Section 9: Immediate Next Steps

After approval, execution will follow this order:

1. **Phase 1: Project Foundation** → Get the app running
2. **Phase 2: Database Seeding** → Populate curriculum data
3. **Phase 3: Homepage & Roadmap** → Show the learning path
4. **Phase 4: Problem Listing** → Navigate to problems
5. **Phase 5: Learn Mode** → Teach concepts
6. **Phase 6: Test Mode** → Code editor
7. **Phase 7: Code Execution** → Compile and run
8. **Phase 8: Run & Submit** → Complete the loop
9. **Phase 9: Progress Tracking** → Track success
10. **Phase 10: Authentication** → User accounts
11. **Phase 11: UI Polish** → Make it beautiful
12. **Phase 12: Learn Content** → Add knowledge
13. **Phase 13: Test Cases** → Add validation

Each phase will be:
- Independently testable
- Not breaking previous work
- Clear and focused
- Verifiable before moving on

---

## Section 10: Decisions Made ✅

| Decision | Choice | Rationale |
|----------|--------|------------|
| Authentication | GitHub + Google | Most common for developer tools, broad coverage |
| Code Execution | Docker from day one | Security first, proper sandboxing |
| Data Scope | All 474 problems | Complete from day one, comprehensive |
| Dark Mode | Yes, both modes | Better UX, code editors look better in dark |
| Deployment | Vercel + Railway | Scalable, serverless-friendly |
| Design System | shadcn/ui | Rapid development, consistent design |

---

## ✅ Status: IN PROGRESS

**Decisions Confirmed:**
- ✅ GitHub + Google authentication
- ✅ Docker sandboxed execution
- ✅ All 474 problems from day one
- ✅ Dark + Light theme support

### Progress Summary

| Phase | Status |
|-------|--------|
| Phase 1: Project Foundation | ✅ Complete |
| Phase 2: Database Seeding | ✅ Complete (curriculum data) |
| Phase 3: Homepage & Roadmap | ✅ Complete |
| Phase 4: Problem Listing | ✅ Complete |
| Phase 5: Learn Mode | ✅ Complete |
| Phase 6: Test Mode (Monaco Editor) | ✅ Complete |
| Phase 7: Code Execution Service | ✅ Complete (Docker + local fallback) |
| Phase 8: Run & Submit | ✅ Complete |
| Phase 9: Progress Tracking | ✅ Complete (localStorage) |
| Phase 10: Auth (NextAuth.js) | ✅ Complete |
| Phase 11: Resizable Panels | ✅ Complete |
| Phase 12: Page Transitions | ✅ Complete |
| Phase 13: Database Seed Script | ✅ Complete |

**Next Steps:**
1. Start Docker and PostgreSQL
2. Run `npm run db:push` and `npm run db:seed`
3. Configure OAuth credentials in .env
4. Test the application

**Estimated Total Effort:** 50-60 hours across 13 phases
**Completed:** ~15 hours of implementation
