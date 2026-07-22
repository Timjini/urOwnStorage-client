interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, headers = {}, ...customConfig } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    ...customConfig,
  };

  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${endpoint}`, config);

  // if (response.status === 401) {
  //   if (typeof window !== 'undefined') window.location.href = '/auth/login';
  //   return Promise.reject("Unauthorized");
  // }

  if (response.status === 422) return response as T;
  if (response.status === 204) return {} as T;

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API Error");
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T, B = unknown>(endpoint: string, body: B, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "POST", body }),

  put: <T, B = unknown>(endpoint: string, body: B, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "PUT", body }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};
