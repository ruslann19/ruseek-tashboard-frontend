import { apiHost, headers } from "@/shared/api/common";

const apiUrl = `${apiHost}/llms`;

const llmsApi = {
  getAll: async () => {
    try {
      const response = await fetch(apiUrl);
      const llms = await response.json();
      return llms;
    } catch (error) {
      console.error("Ошибка при загрузке моделей:", error);
    }
  },

  getById: async (taskId) => {
    try {
      const response = await fetch(`${apiUrl}/${taskId}`);
      const llm = await response.json();
      return llm;
    } catch (error) {
      console.error("Ошибка при загрузке модели:", error);
    }
  },

  add: async (llm) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(llm),
      });

      return response;
    } catch (error) {
      console.log("Ошибка при добавлении модели:", error);
    }
  },

  delete: async (llmId) => {
    try {
      await fetch(`${apiUrl}/${llmId}`, {
        method: "DELETE",
        headers: headers,
      });
    } catch (error) {
      console.log("Ошибка при удалении модели:", error);
    }
  },

  put: async (llm) => {
    try {
      await fetch(`${apiUrl}/${llm.id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(llm),
      });
    } catch (error) {
      console.log("Ошибка при изменении модели:", error);
    }
  },
};

export default llmsApi;
