import React from 'react';

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All', icon: '📋' },
    { key: 'pending', label: 'Pending', icon: '⏳' },
    { key: 'completed', label: 'Completed', icon: '✅' },
  ];

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
            currentFilter === filter.key
              ? 'bg-blue-500 text-white shadow-md transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'
          }`}
        >
          <span>{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
