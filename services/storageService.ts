

import { api } from '@/lib/apiClient';
import { JsonApiResponse } from '@/types/api';
import { StorageSpace } from '@/types/storage';
import { STORAGE_SPACES } from '@/utils/appGlobal';


export const storageService = {
  getAll: async (query?: string): Promise<JsonApiResponse<StorageSpace>> => {
    const url = query ? `${STORAGE_SPACES}?q=${query}` : STORAGE_SPACES;

    return await api.get<JsonApiResponse<StorageSpace>>(url);
  },
};