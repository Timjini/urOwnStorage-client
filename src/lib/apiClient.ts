interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown; 
}

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, ...customConfig } = options;
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    },
    ...customConfig,
  };

  if (body) config.body = JSON.stringify(body);

  try {
    const response = await fetch(`${endpoint}`, config);
    
    if (response.status === 204) return {} as T;

    const data = await response.json();

    console.log("------apiClient data-----", data);
    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("------apiClient error-----", error.message);
    } else {
      console.log("An unexpected error occurred", String(error));
    }

    throw error; 
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) => 
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T, B = unknown>(endpoint: string, body: B, options?: RequestOptions) => 
    apiRequest<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T, B = unknown>(endpoint: string, body: B, options?: RequestOptions) => 
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),

  delete: <T>(endpoint: string, options?: RequestOptions) => 
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};