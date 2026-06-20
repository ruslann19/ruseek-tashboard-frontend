const apiHost = import.meta.env.VITE_API_URL;

const headers = {
  "Content-Type": "application/json",
};

const wsUrl = import.meta.env.VITE_WS_URL;

export { apiHost, headers, wsUrl };
