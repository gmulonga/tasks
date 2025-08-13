import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({
    tasks,
    loading,
    filter,
    onTaskUpdated,
    onTaskDeleted,
    onEditTask,
    getFilteredTaskCount
}) => {
    const getEmptyStateMessage = () => {
        if (filter === 'all') return 'No tasks yet. Create your first task!';
        if (filter === 'completed') return 'No completed tasks yet.';
        return 'No pending tasks. Great job!';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Tasks ({getFilteredTaskCount()})
                </h2>
                {loading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                )}
            </div>

            {/* Task List */}
            {tasks.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                        {getEmptyStateMessage()}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onTaskUpdated={onTaskUpdated}
                            onTaskDeleted={onTaskDeleted}
                            onEditTask={onEditTask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;