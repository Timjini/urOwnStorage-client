"use client";
import { useQuery } from "@tanstack/react-query";
import { StorageSpaceService } from "../services";
import { StorageSpaceFilters } from "@/features/localisation/filter-location/types";

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
        per_page: 5,
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
