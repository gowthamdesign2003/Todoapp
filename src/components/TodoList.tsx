import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void; // New prop for editing
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <p className="text-textSecondary text-center text-xl py-8 animate-fade-in">
        No tasks yet! Add something to get started.
      </p>
    );
  }

  return (
    <ul className="space-y-4 w-full">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TodoList;
