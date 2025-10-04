import { Todo } from '@/app/todos/page';

interface TodoItemProps {
  todo: Todo
  onCheck: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({todo, onCheck, onDelete}) => {
  return (
    <li key={todo.id}>
      <input
        type='checkbox'
        checked = {todo.completed}
        onChange={() => onCheck(todo.id, todo.completed)}
      >
      </input>
      <button
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  )
}