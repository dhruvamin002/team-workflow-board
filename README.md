# Ever Quint — Team WorkFlow Board

A kanban-style task management app built with React and TypeScript.

---

## How to Run

```bash
npm install
npm start
```

Opens at `http://localhost:3000`.

---

## Architecture Overview

### How the App is Structured

```
App
└── TaskProvider          # Global state: tasks + filter/sort
    └── AppContent
        ├── Header        # "New Task" button
        ├── FilterStrip   # Search, status checkboxes, priority & sort selects
        ├── BoardView     # Renders three columns (Backlog / In Progress / Done)
        └── Modal
            └── TaskForm  # Create & edit tasks
```

**State lives in two places:**
- `TaskProvider` — task list (via `useReducer`) and filter/sort state (via `useFilter`)
- `useLocalStorage` — persistence layer; syncs task state to `localStorage` and listens for cross-tab updates via the `storage` event

**Hooks:**
- `useFilter` — manages filter & sort state; syncs to URL query string via `history.replaceState`
- `useLocalStorage` — reads initial data from `localStorage`, exposes a stable `updateItem` callback, and fires a `storage` event listener for cross-tab sync
- `useTasks` — thin wrapper over `TaskProviderContext` for consuming state in components

**Utils (`src/utils/index.ts`):**
- `createTask` / `updateTask` — stamp tasks with `id`, `createdAt`, `updatedAt`
- `parseFilterStateFromSearch` / `buildSearchFromFilterState` — serialize/deserialize filter state to/from URL query params

---

## Rationale for Key Decisions

**State management — Context + useReducer**
Chosen over a library (Redux, Zustand) to keep dependencies minimal for a small app. `useReducer` gives predictable state transitions for task mutations (`CREATE_TASK`, `UPDATE_TASK`, `SET_TASKS`). Filter/sort state is separate (`useFilter`) because it has a different lifecycle — it's URL-driven, not task-driven.

**Component design — uncontrolled inputs**
`TextInput`, `Select`, and `CheckBox` use `defaultValue` / uncontrolled inputs. This keeps form components simple and avoids threading `value` + `onChange` everywhere. The trade-off is the UI doesn't visually reflect state restored from the URL (see Known Limitations).

**Data layer — localStorage + storage event**
No backend. Tasks are persisted to `localStorage` via a `useEffect` in `TaskProvider` that fires on every task change. Cross-tab sync is handled by the native `storage` event in `useLocalStorage`, which only fires in tabs that did *not* make the change — so there's no loop risk.

**URL-based filters**
Filter and sort state is serialized into query params (`q`, `priority`, `status`, `sort`, `dir`) using `history.replaceState` (not `pushState`) so filters are shareable and survive refresh without polluting browser history.

---

## Known Limitations / Trade-offs

- **Uncontrolled inputs don't reflect restored URL state visually** — Priority, Sort By, and Status checkboxes don't show the correct value when the page is loaded with a pre-filled URL. The filter logic itself works correctly; only the visual state of the inputs is wrong. Fixing this requires converting those components to controlled inputs.

- **No localStorage versioning** — Tasks are stored as a plain JSON array with no schema version field. If the data shape changes in a future release, stale data in `localStorage` will silently fail or render incorrectly. A migration layer (reading a `_version` field and transforming old shapes) would be needed before shipping to production.

- **No persistence for filters** — Filter/sort state lives in the URL, not `localStorage`, so it's only preserved if the URL is shared or the tab is refreshed. Closing and reopening the app resets filters.

- **Tasks are in-memory only across tabs** — Cross-tab sync via the `storage` event delivers the full replaced task list (`SET_TASKS`). This means any in-flight optimistic state in one tab is overwritten when another tab saves. Acceptable for this scale; would need conflict resolution in a real collaborative app.

---

## AI Assistance

### Where it was used

**1. URL query string sync (`src/hooks/userFilter.ts`, `src/utils/index.ts`)**
AI generated the initial implementation of `parseFilterStateFromSearch` and `buildSearchFromFilterState` and wired them into `useFilter` with `history.replaceState`.

**What was changed from the suggestion:**
The AI placed both helper functions inline inside `userFilter.ts`. They were moved to `src/utils/index.ts` to keep the hook focused on state logic and make the serialization utilities reusable.

**2. Cross-tab localStorage sync (`src/hooks/useLocalStorage.ts`, `src/components/TaskProvider/index.tsx`)**
The idea to use the native `storage` event for cross-tab sync was proposed by the developer. AI implemented it: adding React state to `useLocalStorage`, wiring the `storage` event listener, adding `SET_TASKS` to the reducer, and adding a `useEffect` in `TaskProvider` to dispatch it when `storageTasks` changes.

**What was changed from the suggestion:**
The overall approach was directed by the developer. AI's initial `useLocalStorage` also included an unnecessary `useState(key)` that was just storing the key string — this was identified as redundant in review and removed, simplifying the hook to use `key` directly.

---

## Example Refactor

**Removing `useState` from `useLocalStorage`**

The initial implementation stored the `key` argument in React state:

```ts
const [state, _] = useState(key)
const currentData = JSON.parse(localStorage.getItem(state) || '[]')
const updateItem = (data) => {
    localStorage.setItem(state, JSON.stringify(data || []))
}
```

`state` here was just a frozen copy of `key` — it never changed and provided no benefit over using `key` directly. After adding `useCallback` to stabilize `updateItem`, it became obvious `useState` was dead weight. It was removed:

```ts
const currentData = JSON.parse(localStorage.getItem(key) || '[]')
const updateItem = useCallback((data) => {
    localStorage.setItem(key, JSON.stringify(data || []))
}, [key])
```

This simplifies the hook and removes a misleading use of `useState` that implied the key could change reactively.
