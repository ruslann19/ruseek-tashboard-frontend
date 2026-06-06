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

  getById: async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`);
      const task = await response.json();
      return task;
    } catch (error) {
      console.error("Ошибка при загрузке задачи:", error);
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

  parseGame: async (sourceUrl, publishedDate) => {
    const body = {
      source_url: sourceUrl,
      published_date: publishedDate,
    };

    try {
      const response = await fetch(`${API_URL}/collect`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(body),
      });

      const addedTasks = await response.json();
      return addedTasks;
    } catch (error) {
      console.log("Ошибка при парсинге игры:", error);
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

  put: async (task) => {
    try {
      await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.log("Ошибка при изменении задачи:", error);
    }
  },
};

export default tasksAPI;
