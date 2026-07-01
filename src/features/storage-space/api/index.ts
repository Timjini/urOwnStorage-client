import { apiClient } from "@/lib/apiClient";
import { StorageSpace } from "../types";
import { JsonApiResponse, JsonApiSingleResponse } from "@/types/api";
import { STORAGE_SPACES } from "@/constants/appGlobal";
import { StorageSpaceFilters } from "@/features/localisation/filter-location/types";

export const fetchStorageSpaces = async (
  query?: string | StorageSpaceFilters,
) => {
  try {
    let url = STORAGE_SPACES;

    if (query) {
      const searchParams = new URLSearchParams();

      if (typeof query === "string") {
        searchParams.append("q", query);
      } else {
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value) || typeof value === "object") {
              searchParams.append(key, JSON.stringify(value));
            } else {
              searchParams.append(key, String(value));
            }
          }
        });
      }

      const queryString = searchParams.toString();
      console.log("------------>", url, queryString);
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return await apiClient.get<JsonApiResponse<StorageSpace>>(url);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unexpected error occurred", String(error));
    }
    throw error;
  }
};

export const fetchStorageSpaceById = async (id: string) => {
  return await apiClient.get<JsonApiSingleResponse<StorageSpace>>(
    `${STORAGE_SPACES}/${id}`,
  );
};
