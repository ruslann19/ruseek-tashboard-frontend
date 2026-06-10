import { apiHost, headers } from "@/shared/api/common";

const apiUrl = `${apiHost}/benchmark-versions`;

const benchmarkVersionsApi = {
  getAll: async () => {
    const response = await fetch(apiUrl);
    return await response.json();
  },

  getAllPotential: async () => {
    const response = await fetch(`${apiUrl}/potential`);
    return await response.json();
  },

  getById: async (benchmarkVersionId) => {
    const response = await fetch(`${apiUrl}/${benchmarkVersionId}`);
    return await response.json();
  },

  delete: async (benchmarkVersionId) => {
    await fetch(`${apiUrl}/${benchmarkVersionId}`, {
      method: "DELETE",
      headers: headers,
    });
  },
};

export default benchmarkVersionsApi;
