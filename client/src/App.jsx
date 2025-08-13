// src/App.jsx
import React, { useState } from 'react';
import { useTasks } from './hooks/useTasks.js';

// Components
import TaskModal from './components/TaskModal.jsx';
import TaskList from './components/TaskList.jsx';
import FilterButtons from './components/FilterButtons.jsx';
import Pagination from './components/Pagination.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

const App = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    tasks,
    loading,
    error,
    currentPage,
    totalPages,
    filter,
    fetchTasks,
    handleFilterChange,
    handlePageChange,
    handleTaskCreated,
    handleTaskUpdated,
    handleTaskDeleted,
    getFilteredTaskCount,
  } = useTasks();

  const handleOpenModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleRetry = () => {
    fetchTasks(currentPage, filter);
  };

  if (loading && tasks.length === 0) {
    return <LoadingSpinner message="Loading tasks..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600">Stay organized and get things done</p>
        </div>

        <ErrorMessage error={error} onRetry={handleRetry} />

        <div className="mb-6">
          <button
            onClick={handleOpenModal}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Task
          </button>
        </div>

        <FilterButtons
          currentFilter={filter}
          onFilterChange={handleFilterChange}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          filter={filter}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
          onEditTask={handleEditTask}
          getFilteredTaskCount={getFilteredTaskCount}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onTaskCreated={handleTaskCreated}
          editingTask={editingTask}
          onTaskUpdated={handleTaskUpdated}
        />

      </div>
    </div>
  );
};

export default App;