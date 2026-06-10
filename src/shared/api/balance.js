import { apiHost } from "@/shared/api/common";

const apiUrl = `${apiHost}/balance`;

const balanceApi = {
  getRouterAiBalance: async () => {
    const url = `${apiUrl}/router-ai`;
    const response = await fetch(url);
    const balance = await response.json();
    return balance;
  },

  getDeepSeekBalance: async () => {
    const url = `${apiUrl}/deepseek`;
    const response = await fetch(url);
    const balance = await response.json();
    return balance;
  },
};

export default balanceApi;
