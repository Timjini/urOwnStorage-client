"use client";
import { STORAGE_SPACES } from "@/constants/appGlobal";
import { StorageSpace } from "@/entities/storage-space/model";
import { StorageSpaceFilters } from "@/features/localisation/filter-location/types";
import { apiClient } from "@/lib/apiClient";
import { JsonApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { StorageSpaceService } from "../services";

export const storageSpaceApi = {
  // later convert this url to infinite scrolling
  fetchAllStorageSpaces: () => async () => {
    return await apiClient.get<JsonApiResponse<StorageSpace>>(
      `${STORAGE_SPACES}`,
    );
  },
};

export const useStorageSpaces = (
  filters?: StorageSpaceFilters,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["storageSpaces", "list", filters],
    queryFn: ({ pageParam = 1 }) =>
      StorageSpaceService.getAvailableSpaces({
        ...filters,
        page: pageParam,
      }),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useStorageSpaceDetails = (
  id: string,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["storageSpaces", "detail", id],
    queryFn: () => StorageSpaceService.getSpaceDetails(id),
    enabled: !!id && options?.enabled !== false,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
