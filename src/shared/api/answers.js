import { apiHost } from "@/shared/api/common";

const apiUrl = `${apiHost}/answers`;

const answersApi = {
  getAll: async () => {
    const response = await fetch(apiUrl);
    return await response.json();
  },

  getById: async (answerId) => {
    const response = await fetch(`${apiUrl}/${answerId}`);
    return await response.json();
  },

  getByBenchmarkVersion: async (benchmarkVersionId) => {
    const response = await fetch(
      `${apiUrl}/by-benchmark-version/${benchmarkVersionId}`,
    );
    return await response.json();
  },
};

export default answersApi;
