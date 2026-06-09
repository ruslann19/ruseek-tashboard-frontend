import { apiHost } from "@/shared/api/common";

const apiUrl = `${apiHost}/answers`;

const answersApi = {
  getAll: async () => {
    try {
      const response = await fetch(apiUrl);
      const answers = await response.json();
      return answers;
    } catch (error) {
      console.error("Ошибка при загрузке ответов:", error);
    }
  },

  getById: async (answerId) => {
    try {
      const response = await fetch(`${apiUrl}/${answerId}`);
      const answer = await response.json();
      return answer;
    } catch (error) {
      console.error("Ошибка при загрузке задачи:", error);
    }
  },

  getByBenchmarkVersion: async (year, month) => {
    const params = {
      year: year,
      month: month,
    };
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `${apiUrl}/by-benchmark-version?${queryString}`,
    );
    return await response.json();
  },
};

export default answersApi;
