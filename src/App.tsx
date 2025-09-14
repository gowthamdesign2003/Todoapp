import React, { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons'; // Import new component

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all'); // New state for filtering

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => { // New function for editing
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompletedTodos = () => { // New function to clear completed todos
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <div className="min-h-screen bg-background text-text font-sans flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-surface p-6 sm:p-8 rounded-xl shadow-2xl border border-border animate-fade-in-up">
        <header className="flex items-center justify-center gap-4 mb-8">
          <ListTodo className="w-10 h-10 text-primary animate-bounce-in" />
          <h1 className="text-4xl font-bold text-primary tracking-tight text-center">
            My Tasks
          </h1>
        </header>

        <div className="mb-8">
          <TodoForm onAddTodo={addTodo} />
        </div>

        <FilterButtons currentFilter={filter} onSelectFilter={setFilter} />

        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />

        {hasCompletedTodos && (
          <div className="mt-6 text-center animate-fade-in">
            <button
              onClick={clearCompletedTodos}
              className="px-6 py-3 bg-error text-white rounded-xl shadow-lg hover:bg-error/80 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 ease-in-out text-lg font-medium"
              aria-label="Clear all completed tasks"
            >
              Clear Completed Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
