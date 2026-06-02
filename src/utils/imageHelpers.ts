import { ROOT } from "@/constants/appGlobal";

export const getFullImageUrl = (path?: string): string => {
  if (!path) return 'https://via.placeholder.com/400';

  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${ROOT}${cleanPath}`;
};