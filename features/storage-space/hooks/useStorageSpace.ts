"use client"; 
import { useQuery } from "@tanstack/react-query";
import { storageSpaceService } from "../services";


export const useStorageSpaces = (query?: string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['storageSpaces', 'list', query], 
        queryFn: () => storageSpaceService.getAvailableSpaces(query),
        staleTime: 1000 * 60 * 5,
        ...options,
    });
};


export const useStorageSpaceDetails = (id: string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['storageSpaces', 'detail', id],
        queryFn: () => storageSpaceService.getSpaceDetails(id),
        enabled: !!id && options?.enabled !== false,
        staleTime: 1000 * 60 * 5,
        ...options,
    });
};

