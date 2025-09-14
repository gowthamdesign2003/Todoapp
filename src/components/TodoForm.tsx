import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow p-3 rounded-xl bg-surface text-text border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out text-lg placeholder-textSecondary"
        aria-label="New todo item"
      />
      <button
        type="submit"
        className="bg-primary text-white p-3 rounded-xl shadow-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 ease-in-out flex items-center justify-center group"
        aria-label="Add todo"
      >
        <Plus className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </form>
  );
};

export default TodoForm;
