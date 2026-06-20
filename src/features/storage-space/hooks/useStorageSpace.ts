"use client";
import { useQuery } from "@tanstack/react-query";
import { StorageSpaceService } from "../services";

export interface StorageSpaceFilters {
  status?: string;
  selectedInterval?: string;
  selectedSpaceType?: string;
  selectedFeatures?: string[];
  selectedAddress?: string;
  coordinates?: [number, number] | null;
}

export const useStorageSpaces = (
  filters?: StorageSpaceFilters,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["storageSpaces", "list", filters],
    queryFn: () => StorageSpaceService.getAvailableSpaces(filters),
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
