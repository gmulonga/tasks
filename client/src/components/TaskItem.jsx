import React, { useState } from 'react';
import { api } from '../services/api';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted, onEditTask }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggleComplete = async () => {
        setIsUpdating(true);
        try {
            await api.updateTask(task.id, { is_completed: !task.is_completed });
            onTaskUpdated();
        } catch (error) {
            console.error('Error updating task:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await api.deleteTask(task.id);
            onTaskDeleted();
        } catch (error) {
            console.error('Error deleting task:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 transition-all ${task.is_completed ? 'border-green-500 bg-green-50' : 'border-blue-500'
            }`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                    <input
                        type="checkbox"
                        checked={task.is_completed}
                        onChange={handleToggleComplete}
                        disabled={isUpdating}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />

                    <div className="flex-1">
                        <h3 className={`text-lg font-medium transition-all ${task.is_completed ? 'line-through text-gray-500' : 'text-gray-800'
                            }`}>
                            {task.title}
                        </h3>

                        {task.description && (
                            <p className={`mt-1 text-sm transition-all ${task.is_completed ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                {task.description}
                            </p>
                        )}

                        <p className="mt-2 text-xs text-gray-500">
                            Created: {formatDate(task.created_at)}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                    <button
                        onClick={() => onEditTask(task)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors px-2 py-1 rounded hover:bg-blue-50"
                    >
                        Edit
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors disabled:text-red-300 px-2 py-1 rounded hover:bg-red-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;