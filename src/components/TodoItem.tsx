import React, { useState } from 'react';
import { Check, Trash2, Pencil, Save } from 'lucide-react';

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void; // New prop for editing
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditSave = () => {
    if (editedText.trim() && editedText !== todo.text) {
      onEdit(todo.id, editedText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
  };

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.01]
        ${todo.completed ? 'bg-surface/70 border-l-4 border-success' : 'bg-surface border-l-4 border-primary'}
      `}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={handleEditSave}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 rounded-md bg-background text-text border border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200 ease-in-out text-lg"
          autoFocus
          aria-label="Edit todo text"
        />
      ) : (
        <span
          className={`flex-grow text-lg font-medium transition-all duration-200 ease-in-out
            ${todo.completed ? 'line-through text-textSecondary' : 'text-text'}
          `}
        >
          {todo.text}
        </span>
      )}
      <div className="flex gap-2 ml-4">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full bg-accent text-white hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition-all duration-200 ease-in-out"
            aria-label="Edit todo"
          >
            <Pencil className="w-5 h-5" />
          </button>
        )}
        {isEditing && (
          <button
            onClick={handleEditSave}
            className="p-2 rounded-full bg-success text-white hover:bg-success/80 focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 focus:ring-offset-surface transition-all duration-200 ease-in-out"
            aria-label="Save todo"
          >
            <Save className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => onToggle(todo.id)}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out
            ${todo.completed ? 'bg-success hover:bg-success/80' : 'bg-secondary hover:bg-secondary/80'}
            text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface
            ${todo.completed ? 'focus:ring-success' : 'focus:ring-secondary'}
          `}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          <Check className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 rounded-full bg-error text-white hover:bg-error/80 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-surface transition-all duration-200 ease-in-out"
          aria-label="Delete todo"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
