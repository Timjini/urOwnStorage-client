
if (!process.env.EXPO_PUBLIC_API_URL) {
  throw new Error('EXPO_PUBLIC_API_URL is not defined in environment variables');
}

export const API: string = process.env.EXPO_PUBLIC_API_URL;
export const LOGIN = `${API}/v1/auth/login`;
export const SIGNUP = `${API}/v1/auth/login`;
export const STORAGE_SPACES = `${API}/v1/storage_spaces`;