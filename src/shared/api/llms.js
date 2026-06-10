import { apiHost, headers } from "@/shared/api/common";

const apiUrl = `${apiHost}/llms`;

const llmsApi = {
  getAll: async () => {
    const response = await fetch(apiUrl);
    return await response.json();
  },

  getById: async (taskId) => {
    const response = await fetch(`${apiUrl}/${taskId}`);
    return await response.json();
  },

  add: async (llm) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(llm),
    });

    return response;
  },

  delete: async (llmId) => {
    await fetch(`${apiUrl}/${llmId}`, {
      method: "DELETE",
      headers: headers,
    });
  },

  put: async (llm) => {
    await fetch(`${apiUrl}/${llm.id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(llm),
    });
  },
};

export default llmsApi;
