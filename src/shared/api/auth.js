import { apiHost, headers } from "@/shared/api/common";

const apiUrl = `${apiHost}/auth`;

const authApi = {
  login: async (password) => {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ password: password }),
      credentials: "include",
    });
    return response;
  },

  logout: async () => {
    const response = await fetch(`${apiUrl}/logout`, {
      method: "POST",
      headers: headers,
      credentials: "include",
    });
    return response;
  },

  checkAuth: async () => {
    const response = await fetch(`${apiUrl}/check-auth`, {
      method: "GET",
      headers: headers,
      credentials: "include",
    });

    return response;
  },
};

export default authApi;
