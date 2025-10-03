# OwlMart Next.js + Supabase Practice Project

## Overview

This is a practice project designed to familiarize you guys with the tech stack we're using for OwlMart. Built as a full-stack todo application, this project spans the full stack dev process of frontend with **React + Next.js** and backend integration with the **Supabase** database.

### TODO app?

You'll be creating a TODO list app--an app that lets you keep track of all of your TODOs. You'll be able to view all the items, add items to your list, remove items, and mark tasks as completed. These create, read, update, and delete (CRUD) operations are the basics of any full-stack app so we'll be implementing all of those operations.

### Features you'll be implementing

- **Supabase Tables** for storing todo data
- **Create, Read, Update, Delete (CRUD)** operations for managing the data
- **UI components in React** for displaying the todo items
- **Async functions** to handle the supabase requests

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)

### Project Structure
Next.js provides many starter templates with fully functional authentication + supabase integration, so that's what we started this project off with

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── protected/         # Protected routes
│   └── todos/             # Todo management page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── tutorial/         # Onboarding components
├── lib/                  # Utility functions and configurations
│   └── supabase/         # Supabase client setup
└── middleware.ts         # Route protection middleware
```

## Getting Started

### Setup
1. Clone this repository:
   ```bash
   git clone -b template <repository-url>
   cd owl-mart-demo
   ```

2. Create a new branch for your work:
   ```bash
   git checkout -b your-name/todo
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Step 1 - Supabase Integration

1. **Create a Supabase account** at [supabase.com](https://supabase.com)
2. **Tell us which email you signed up with** so we can add you to the demo supabase project that you'll be using.
3. **Get your project credentials**:
   - Go to "Connect" at the top of the project screen
   - Under "App Frameworks" copy the `URL` and `anon public` key
4. **Set up environment variables**:
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```
   - The anonymous key should NEVER be pushed to github. This key is private and gives access to your database. Ensure that the `.gitignore` file contains `.env.local` and that the `.env.local` file itself is grayed out in your editor.
5. **Test the connection** by running the app and checking if the environment warning disappears

### Step 2 - Creating the Supabase Table

1. **Navigate to the Table Editor**:
   - In your Supabase dashboard, click on "Table Editor" in the left sidebar
   - Click the "New table" button

2. **Set up the table**:
   - **Table name**: `<name>Todo`
   - Click "Create table"
   - disable Row Level Security just for this project (we usually have this enabled btw)

3. **Add the following columns** (click "Add column" for each):

   **Column 1 - id**:
   - leave as default

   **Column 2 - created_at**:
   - leave as default

   **Column 3 - title**:
   - **Name**: `title`
   - **Type**: `text`
   - **Default Value**: Leave as `EMPTY`
   - **Primary**: Leave unchecked

   **Column 4 - description**:
   - **Name**: `description`
   - **Type**: `text`
   - **Default Value**: Leave as `NULL`
   - **Primary**: Leave unchecked

   **Column 5 - completed**:
   - **Name**: `completed`
   - **Type**: `bool` (boolean)
   - **Default Value**: `false`
   - **Primary**: Leave unchecked

   Then, save and the table should be created.

### Step 3 - Creating UI Components

Look at `/components/todo/todo-item.tsx` for a component reference.

1. **Break down the structure** - what ui components will you need to display the todo list?
   - Input fields for title and description
   - Add button to create new todos
   - List display for existing todos
   - Checkbox for completion status
   - Delete button for each todo
2. **Use TypeScript types for the TODO data**:
   This'll keep consistency in the components.
   ```typescript
   type Todo = {
     id: number;
     title: string;
     description: string;
     completed: boolean;
   };
   ```

### Step 4 - Fetching the Data

1. **Storing the data with React Hooks**:

   **useState Hook** - For managing component state:
   ```typescript
   const [todos, setTodos] = useState<Todo[]>([]);
   const [newTitle, setNewTitle] = useState('');
   ```

   - **Purpose**: Store and update data in your component
   - **Syntax**: `const [value, setValue] = useState(initialValue)`
   - **`value`**: Current state value
   - **`setValue`**: Function to update the state
   - **`initialValue`**: Starting value for the state

   **useEffect Hook** - For side effects and data fetching:
   ```typescript
   useEffect(() => {
     // Code that runs when component mounts
     fetchTodos();
   }, []);
   ```

   - **Purpose**: Run code when component loads or when dependencies change
   - **Empty array `[]`**: Runs only once when component mounts
   - **Common use**: Fetch data from database when page loads

   **Key Concepts**:
   - **State**: Data that can change and causes the UI to re-render
   - **Hooks**: Special functions that let you use React features
   - **Side effects**: Operations like API calls that happen outside the normal render cycle

1. **Understand the data fetching pattern**:
   ```typescript
   async function fetchTodos() {
     const { data } = await supabase
       .from('exampleTodo')
       .select('*')
       .order('id', { ascending: true });
     if (data) setTodos(data);
   }
   ```
2. **Learn about Supabase queries**:
   - `.from('tableName')` - selects the table
   - `.select('*')` - selects all columns
   - `.order('column', { ascending: true })` - orders results

### Step 5 - Create / Update / Delete Data

1. **Create (INSERT) operations**:
   - **Function to create**: `addTodo()`
   - **Purpose**: When user clicks "Add" button, this function saves a new todo to the database
   - **What it does**: Takes the title and description from input fields, creates a new todo record with `completed: false`
   - **Supabase method**: `.insert()`
   - **User experience**: User types in the form, clicks add, and sees the new todo appear in the list

2. **Update operations**:
   - **Function to update**: `toggleTodo()`
   - **Purpose**: When user clicks the checkbox next to a todo, this function marks it as complete/incomplete
   - **What it does**: Changes the `completed` status from true to false (or vice versa) for a specific todo
   - **Supabase method**: `.update()`
   - **User experience**: User clicks checkbox, todo gets crossed out (or un-crossed out) and stays that way

3. **Delete operations**:
   - **Function to delete**: `deleteTodo()`
   - **Purpose**: When user clicks the "Delete" button, this function removes the todo from the database
   - **What it does**: Permanently deletes the todo record from the database
   - **Supabase method**: `.delete()`
   - **User experience**: User clicks delete, todo disappears from the list forever

### Step 6 - Link it all up

1. **Test all CRUD operations**:
   - Connect all buttons to their corresponding Supabase interaction functions
   - Fetch the todo list data at the start, display it with the components you created
   - Update todo list data
   - Remove items, should update

2. **Understand the data flow**:
   - User interaction → State update → Supabase API call → Database update → Re-fetch data → UI update

3. **Key concepts**:
   - **State management** with React hooks (`useState`, `useEffect`)
   - **Async/await** for handling database operations
   - **Component lifecycle** and re-rendering
   - **Database relationships** and queries
