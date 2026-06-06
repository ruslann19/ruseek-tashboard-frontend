const API_URL = "http://localhost:8000/llms";
const HEADERS = {
  "Content-Type": "application/json",
};

const llmsApi = {
  getAll: async () => {
    try {
      const response = await fetch(API_URL);
      const llms = await response.json();
      return llms;
    } catch (error) {
      console.error("Ошибка при загрузке моделей:", error);
    }
  },

  getById: async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`);
      const llm = await response.json();
      return llm;
    } catch (error) {
      console.error("Ошибка при загрузке модели:", error);
    }
  },

  add: async (llm) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(llm),
      });

      return response;
    } catch (error) {
      console.log("Ошибка при добавлении модели:", error);
    }
  },

  delete: async (llmId) => {
    try {
      await fetch(`${API_URL}/${llmId}`, {
        method: "DELETE",
        headers: HEADERS,
      });
    } catch (error) {
      console.log("Ошибка при удалении модели:", error);
    }
  },

  put: async (llm) => {
    try {
      await fetch(`${API_URL}/${llm.id}`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(llm),
      });
    } catch (error) {
      console.log("Ошибка при изменении модели:", error);
    }
  },
};

export default llmsApi;
