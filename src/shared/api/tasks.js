import { apiHost, headers } from "@/shared/api/common";

const apiUrl = `${apiHost}/tasks`;

const tasksApi = {
  getAll: async () => {
    const response = await fetch(apiUrl);
    return await response.json();
  },

  getById: async (taskId) => {
    const response = await fetch(`${apiUrl}/${taskId}`);
    return await response.json();
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

  add: async (task) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(task),
    });

    return await response.json();
  },

  delete: async (taskId) => {
    await fetch(`${apiUrl}/${taskId}`, {
      method: "DELETE",
      headers: headers,
    });
  },

  put: async (task) => {
    await fetch(`${apiUrl}/${task.id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(task),
    });
  },
};

export default tasksApi;
