
import { apiClient } from '@/lib/apiClient';
import { StorageSpace } from '../types';
import { JsonApiResponse, JsonApiSingleResponse } from '@/types/api';
import { STORAGE_SPACES } from '@/constants/appGlobal';

export const fetchStorageSpaces = async (query?: string) => {

  try {
        let url = STORAGE_SPACES; 
        if (query) {
          const searchParams = new URLSearchParams({ q: query });
          url += `?${searchParams.toString()}`;
        }
        return await apiClient.get<JsonApiResponse<StorageSpace>>(url);
  } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message); 
      } else {
        console.log("An unexpected error occurred", String(error));
      }
    }

};
export const fetchStorageSpaceById = async (id: string) => {
  return await apiClient.get<JsonApiSingleResponse<StorageSpace>>(`${STORAGE_SPACES}/${id}`);
};