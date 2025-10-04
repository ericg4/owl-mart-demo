import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import TodoItem from '@/components/todo/todo-item';``

export type Todo = {
  id: number
  title: string
  description: string
  completed: boolean
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await supabase.from('<Lexi>Todo').select('*');
    if (data) setTodos(data);
  };

  const addTodo = async () => {
    await supabase.from('<Lexi>Todo').insert(
      { title: newTitle, description: newDescription, completed: false }
    );
    setNewTitle('');
    setNewDescription('');
    fetchTodos();
  };

  const toggleComplete = async (id: number, completed: boolean) => {
    await supabase.from('<Lexi>Todo').update({ completed: !completed }).eq('id', id);
    fetchTodos();
  };

  const deleteTodo = async(id: number) => {
    await supabase.from('<Lexi>Todo').delete().eq('id', id);
    fetchTodos(); 
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">Todo List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleComplete}
          />
        ))}
      </ul>
    </div>
  )
}
