'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import TodoItem from '@/components/todo/todo-item';

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { data } = await supabase
      .from('exampleTodo')
      .select('*')
      .order('id', { ascending: true });
    if (data) setTodos(data);
  }

  async function addTodo() {
    if (!newTitle.trim()) return;
    await supabase.from('exampleTodo').insert({
      title: newTitle,
      description: newDescription,
      completed: false
    });
    setNewTitle('');
    setNewDescription('');
    fetchTodos();
  }

  async function toggleTodo(id: number, completed: boolean) {
    await supabase.from('exampleTodo').update({ completed: !completed }).eq('id', id);
    fetchTodos();
  }

  async function deleteTodo(id: number) {
    await supabase.from('exampleTodo').delete().eq('id', id);
    fetchTodos();
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>

      <div className="space-y-2 mb-6">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-4 py-2 border rounded"
        />
        <div className="flex gap-2">
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Description (optional)"
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
        ))}
      </ul>
    </div>
  );
}
