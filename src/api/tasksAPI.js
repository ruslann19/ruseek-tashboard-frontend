const API_URL = "http://localhost:8000/tasks";
const HEADERS = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: async () => {
    try {
      const response = await fetch(API_URL);
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  },

  add: async (task) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(task),
      });

      const addedTask = await response.json();
      return addedTask;
    } catch (error) {
      console.log("Ошибка при добавлении задачи:", error);
    }
  },

  delete: async (taskId) => {
    try {
      await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
        headers: HEADERS,
      });
    } catch (error) {
      console.log("Ошибка при удалении задачи:", error);
    }
  },
};

export default tasksAPI;
