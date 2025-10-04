import { Todo } from '@/app/todos/page';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({todo, onDelete, onToggle}) => {
  return (
    <li key={todo.id} className="flex items-center gap-3 p-3 border rounded">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
        className="w-5 h-5"
      />
      <div className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
        <div className="font-semibold">{todo.title}</div>
        {todo.description && (
          <div className="text-sm text-gray-600">{todo.description}</div>
        )}
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  )
}
export default TodoItem;