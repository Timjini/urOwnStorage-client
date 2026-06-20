import * as storageSpaceApi from "../api";
import { StorageSpaceFilters } from "../hooks/useStorageSpace";
import { StorageSpace } from "../types";

interface IStorageSpaceService {
  getAvailableSpaces(searchQuery?: string): Promise<StorageSpace[]>;
  getSpaceDetails(id: string): Promise<StorageSpace>;
}

export const StorageSpaceService: IStorageSpaceService = {
  getAvailableSpaces: async (
    searchQuery?: string | StorageSpaceFilters,
  ): Promise<StorageSpace[]> => {
    try {
      const response = await storageSpaceApi.fetchStorageSpaces(searchQuery);

      if (!response || !response.data) {
        return [];
      }

      return response.data.map((resource) => ({
        ...resource.attributes,
        id: resource.id,
      })) as StorageSpace[];
    } catch (error) {
      console.error("Service Error: Failed to load spaces", error);
      throw new Error(
        "We couldn't find any storage spaces right now. Please try again.",
      );
    }
  },

  getSpaceDetails: async (id: string): Promise<StorageSpace> => {
    try {
      const response = await storageSpaceApi.fetchStorageSpaceById(id);

      if (!response || !response.data) {
        throw new Error("Not Found");
      }

      const resource = response.data;

      return {
        ...resource.attributes,
        id: resource.id,
      } as StorageSpace;
    } catch (error) {
      console.error("Fetch Error:", error);
      throw new Error("This storage unit is no longer available.");
    }
  },
};
