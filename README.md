# Todo App

A modern, responsive todo application built with Next.js, TypeScript, and Tailwind CSS. This app provides full CRUD (Create, Read, Update, Delete) operations with local storage persistence.

## Features

- ✅ **Create** new todos
- 📖 **Read** and display todos
- ✏️ **Update** existing todos with inline editing
- 🗑️ **Delete** individual todos
- ✔️ Mark todos as complete/incomplete
- 🔍 Filter todos by status (All, Active, Completed)
- 💾 Local storage persistence
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔢 Real-time counters for active and completed todos
- 🧹 Bulk delete completed todos

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Storage**: Browser Local Storage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
todo-app/
├── app/
│   ├── layout.tsx              # Root layout (default)
│   ├── page.tsx                # Main todo app page
│   └── globals.css             # Global styles (default)
├── components/
│   ├── ui/                     # shadcn/ui components (default)
│   │   ├── button.tsx          # Button component
│   │   ├── input.tsx           # Input component
│   │   ├── checkbox.tsx        # Checkbox component
│   │   ├── tabs.tsx            # Tabs component
│   │   └── ...                 # Other UI components
│   └── TodoItem.tsx            # Individual todo item component
├── lib/
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Utility functions (default)
├── hooks/                      # Custom hooks (default)
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Usage

### Adding Todos
1. Type your task in the input field at the top
2. Click "Add" or press Enter to create the todo

### Managing Todos
- **Complete**: Click the checkbox next to any todo
- **Edit**: Click on the todo text to edit inline
  - Press Enter or click the ✓ button to save
  - Press Escape or click the ✗ button to cancel
- **Delete**: Click the trash icon to remove a todo
- **Filter**: Use the tabs to view All, Active, or Completed todos
- **Clear Completed**: Use the "Clear completed" button to remove all completed todos

### Data Persistence
All todos are automatically saved to your browser's local storage, so your data persists between sessions.

## Key Features Explained

### CRUD Operations

1. **Create**: Add new todos using the inline form in the main page
2. **Read**: Display todos with filtering capabilities
3. **Update**: Inline editing with save/cancel options in TodoItem component
4. **Delete**: Individual and bulk delete operations

### State Management
- Uses React's `useState` for local state management
- `useEffect` hooks for local storage synchronization
- No external state management library needed for this scope

### TypeScript Integration
- Fully typed components and props
- Type-safe todo operations
- Enhanced developer experience with IntelliSense

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive layout for different screen sizes
- Touch-friendly interface elements

## Component Architecture

### Main Components

1. **app/page.tsx** - Main application component
   - Manages global state for todos
   - Handles all CRUD operations
   - Implements filtering logic (All, Active, Completed)
   - Local storage integration
   - Inline form for adding new todos
   - Statistics display (active/completed counts)

2. **components/TodoItem.tsx** - Individual todo item
   - Inline editing functionality
   - Toggle completion status
   - Delete individual todos
   - Keyboard shortcuts (Enter to save, Escape to cancel)
   - Visual feedback for completed items

3. **lib/types.ts** - TypeScript definitions
   - Todo interface definition
   - Type safety for all components

### Key Functions

- `addTodo(text: string)` - Creates new todo with unique ID
- `updateTodo(id: string, text: string)` - Updates existing todo text
- `toggleTodo(id: string)` - Toggles completion status
- `deleteTodo(id: string)` - Removes single todo
- `clearCompleted()` - Removes all completed todos

## File Details

### app/page.tsx
- Main component with all todo logic
- State management for todos array
- Filter state management
- Local storage integration
- Form handling for new todos
- Statistics calculation

### components/TodoItem.tsx
-
