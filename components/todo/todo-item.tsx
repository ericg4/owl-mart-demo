import { Todo } from '@/app/todos/page';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onToggle: (id: number, completed: boolean) => void; 
}

const TodoItem: React.FC<TodoItemProps> = ({todo, onDelete, onToggle}) => {
    return(
    <li key={todo.id} className="flex items-center gap-3 p-3 border rounded">
    <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
        className="w-5 h-5"
      />
      <div className = "flex-1">
          <div className="font-bold">{todo.title}</div>
          <div className="font-comic-sans"></div>{todo.description}</div>
      </div>




    </li>

)
}

export default TodoItem;

