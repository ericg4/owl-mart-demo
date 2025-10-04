"use client"
import { useState, useEffect } from "react";
import Supabase from 'supabase-ts';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    
    supabase.from('CharlieVinnyTodo').fetch('*')
  }
  const handleFormSubmit = async () => {
    

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
          onSubmit={handleDescrChange}/>
      </form>
      
    </div>
  );
}