import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async (page = 1, filterType = 'all') => {
    setLoading(true);
    setError(null);

    try {
      let isCompleted = null;
      if (filterType === 'completed') isCompleted = true;
      if (filterType === 'pending') isCompleted = false;

      const response = await api.getTasks(page, isCompleted);
      setTasks(response.results || []);
      setTotalPages(Math.ceil(response.count / 5));
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load tasks. Please check if your Django server is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage, filter);
  }, [currentPage, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleTaskCreated = () => {
    fetchTasks(1, filter);
    setCurrentPage(1);
  };

  const handleTaskUpdated = () => {
    fetchTasks(currentPage, filter);
  };

  const handleTaskDeleted = () => {
    fetchTasks(currentPage, filter);
  };

  const getFilteredTaskCount = () => {
    if (filter === 'all') return 'all tasks';
    if (filter === 'completed') return 'completed tasks';
    return 'pending tasks';
  };

  return {
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
  };
};