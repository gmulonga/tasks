const API_BASE_URL = 'http://localhost:8000/api/tasks';

export const api = {
  getTasks: async (page = 1, isCompleted = null) => {
    let url = `${API_BASE_URL}/all/?page=${page}`;
    if (isCompleted !== null) {
      url += `&is_completed=${isCompleted}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  createTask: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  updateTask: async (id, taskData) => {
    const response = await fetch(`${API_BASE_URL}/${id}/update/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}/delete/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  },
};