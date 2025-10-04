'use client'

import TodoItem from "@/components/todo/todo-item";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import Modal from "@/components/modal/modal"
import './todos.css'

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }


  useEffect(() => {
    fetchTodos();
  }, []);


  async function fetchTodos() {
    const { data } = await supabase
      .from('AnthonyStellaTodo')
      .select('*')
      .order('id', { ascending: true });
    if (data) setTodos(data);
  }

  async function addTodos() {
    await supabase.from('AnthonyStellaTodo').insert({
      title: newTitle,
      description: newDescription,
      completed: false
    })
    setNewTitle('')
    setNewDescription('')
    fetchTodos()
  }

  async function deleteTodo(id: number) {
    await supabase.from('AnthonyStellaTodo').delete().eq('id', id)
    fetchTodos()
  }

  async function toggleTodo(id: number, completed: boolean) {
    await supabase.from('AnthonyStellaTodo').update({completed: !completed}).eq('id', id)
    fetchTodos()
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Todo List</p>
      <button onClick={handleOpenModal}>
        Add Todo Item
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <div>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
            />
            <button
              onClick={addTodos}
              className='add-button'
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
      
      <ul>
        {todos.map((todo) => 
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />)}
      </ul>
    </div>
  )
}
