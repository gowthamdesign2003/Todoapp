import React from 'react';

interface FilterButtonsProps {
  currentFilter: 'all' | 'active' | 'completed';
  onSelectFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onSelectFilter }) => {
  const filters: Array<'all' | 'active' | 'completed'> = ['all', 'active', 'completed'];

  return (
    <div className="flex justify-center gap-3 mb-6 p-2 bg-surface rounded-xl shadow-inner border border-border animate-fade-in">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelectFilter(filter)}
          className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out
            ${currentFilter === filter
              ? 'bg-primary text-white shadow-md'
              : 'text-textSecondary hover:bg-background/50 hover:text-text'
            }
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface
          `}
          aria-pressed={currentFilter === filter}
          aria-label={`Show ${filter} tasks`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
