
if (!process.env.EXPO_PUBLIC_API_URL) {
  throw new Error('EXPO_PUBLIC_API_URL is not defined in environment variables');
}

export const ROOT: string = `${process.env.EXPO_PUBLIC_API_URL}`;
export const API: string = `${ROOT}/api`;
export const LOGIN = `${API}/v1/auth/login`;
export const SIGNUP = `${API}/v1/auth/login`;
export const STORAGE_SPACES = `${API}/v1/storage_spaces`;
export const PAYMENTS = `${API}/v1/payments`;
export const BOOKINGS = `${API}/v1/bookings`;