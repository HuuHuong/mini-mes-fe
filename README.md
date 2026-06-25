# Mini MES Frontend

A modern, responsive, real-time Manufacturing Execution System (MES) frontend application built with React, Redux, Tailwind CSS, and TypeScript.

---

## 🚀 Key Features

- **Dashboard & Analytics**: Real-time tracking of OEE, production output, defect rates, and machine status summaries.
- **Production Management**: Create and track Work Orders, assign machines, and record production output/defects.
- **Bill of Materials (BOM)**: Manage complex product formulas, material associations, sort orders, and item statuses.
- **Real-Time Synchronization**: Seamless, live updates using **SignalR Hub connection** for production output updates and work order status changes.
- **Inventory Control**: Log transactions, track adjustments, and monitor material stock levels.
- **Machine Monitoring**: Real-time state indicators (Idle, Running, Maintenance, Error) and downtime logs.
- **Quality Control**: Manage inspections (Pass/Fail) and inspect defects.

---

## 🛠️ Technology Stack

- **Core**: React 19, TypeScript
- **State Management**: Redux Toolkit (Action-Listener middleware flow)
- **Styling**: Tailwind CSS v4
- **Real-Time Communication**: Microsoft SignalR
- **Networking**: Axios client with interceptors
- **Build Tool**: Vite

---

## 🏗️ Folder Structure & Architecture

This project strictly enforces separation of concerns and a custom React component hook pattern:

```text
src/
├── common/             # Common hooks, utilities, and helper scripts
├── components/         # Shared global UI components (Buttons, Inputs, Modals)
├── networking/         # API endpoints configuration and Axios clients
├── redux/              # Action creators, slices, and Redux listeners
│   ├── listener/       # Thunk-less API listeners matching action triggers
│   ├── redux-action/   # Pure Action definitions
│   └── redux-slice/    # Redux slices for global state
├── screens/            # Application views (grouped by features)
│   └── auth/           # Authenticated screens
│       └── production/
│           └── products/
│               ├── index.tsx         # Pure UI rendering (memoized)
│               ├── useFunctions.ts   # Screen Business Logic & API calls
│               └── components/       # Feature-specific sub-components
└── types/              # Unified TypeScript definitions & Interfaces
```

---

## 📜 Coding Rules

Developers contributing to this codebase must adhere to the following rules (defined in `coding-rules.md`):

### 1. Screen Separation Pattern
- Screens must only contain `index.tsx` (pure UI rendering, must be wrapped in `memo`) and a sibling `useFunctions.ts` file.
- All states, API call triggers, form handlers, navigation logic, and business logic must live inside `useFunctions.ts`.
- Direct API calls inside screen components are strictly forbidden.

### 2. Export & Function Definitions
- Only **Named Exports** are allowed. Default exports are prohibited.
- All function declarations (components, hooks, helpers) must use **Arrow Function** syntax.

### 3. Stable Callback Lifecycle
- All event handlers and callbacks must be wrapped in `useEventCallback`.
- Custom `useEventCallback` hooks in this project **do not accept a dependency array** (internal ref updates).

### 4. API / Network Requests
- API requests must flow through the **Action-Listener** pattern:
  1. Screen calls a function from `useFunctions`.
  2. `useFunctions` dispatches a Redux Action with a payload containing `body`, `onSuccess`, and `onError` callbacks.
  3. A Redux middleware listener intercepts the action, performs the async HTTP call via `apiClient`, and invokes the callbacks.

### 5. JSX Optimization
- No inline functions or inline objects inside JSX. Wrap operations in helper functions inside `useFunctions` or sub-components.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- Yarn or npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

### Development Server
Run the dev server locally:
```bash
yarn dev
# or
npm run dev
```

### Production Build
Build and optimize for production:
```bash
yarn build
# or
npm run build
```
