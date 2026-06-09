import { apiHost, headers } from "@/shared/api/common";

const apiUrl = `${apiHost}/tasks`;

const tasksApi = {
  getAll: async () => {
    try {
      const response = await fetch(apiUrl);
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  },

  getById: async (taskId) => {
    try {
      const response = await fetch(`${apiUrl}/${taskId}`);
      const task = await response.json();
      return task;
    } catch (error) {
      console.error("Ошибка при загрузке задачи:", error);
    }
  },

  getByMonth: async (year, month) => {
    const params = {
      year: year,
      month: month,
    };
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${apiUrl}/by-month?${queryString}`);
    return await response.json();
  },

  getBenchmarkVersions: async () => {
    const response = await fetch(`${apiUrl}/benchmark-versions`);
    return await response.json();
  },

  add: async (task) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
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
      await fetch(`${apiUrl}/${taskId}`, {
        method: "DELETE",
        headers: headers,
      });
    } catch (error) {
      console.log("Ошибка при удалении задачи:", error);
    }
  },

  put: async (task) => {
    try {
      await fetch(`${apiUrl}/${task.id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.log("Ошибка при изменении задачи:", error);
    }
  },
};

export default tasksApi;
