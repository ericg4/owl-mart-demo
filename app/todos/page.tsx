"use client"
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';
import {TodoItem} from '../../components/todo/todo-item'

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function Page() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState<string>("")
  const [newDescr, setNewDescr] = useState<string>("")

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const {data} = await supabase
      .from('CharlieVinnyTodo')
      .select('*')
      .order('id', {ascending: true})
    if (data) setTodos(data);
  }
  
  const handleFormSubmit = async () => {
    if (!newTitle.trim()) return;
    await supabase
    .from('CharlieVinnyTodo')
    .insert({
      title: newTitle,
      description: newDescr,
      completed: false
    })
    setNewTitle('')
    setNewDescr('')
    fetchTodos()
  }
  
  const onCheck = async (id: number, completed: boolean) => {
    await supabase
    .from('CharlieVinnyTodo')
    .update({completed: completed})
    .eq('id', id)
  }

   const onDelete = async (id: number) => {
    await supabase
    .from('CharlieVinnyTodo')
    .delete()
    .eq('id', id)
    fetchTodos()
  } 

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  }

  const handleDescrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescr(event.target.value)
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input 
          type="text"
          placeholder="Enter title"
          value={newTitle}
          onChange={handleTitleChange}
        />
        <input 
          type="text"
          placeholder=""
          value={newDescr}
          onChange={handleDescrChange}/>
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => {return <TodoItem todo={todo} onCheck={onCheck} key={todo.id} onDelete={onDelete} />})}
      </ul>
    </div>
  );
}