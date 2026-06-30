import { Lease } from "@/entities/lease/models";
import { JsonApiSingleResponse } from "@/types/api";
import { LeaseApi } from "./api";

export const LeaseService = {
  async searchLeaseByReference(
    refence: string,
  ): Promise<JsonApiSingleResponse<Lease>> {
    const response = await LeaseApi.searchLeaseByReference(refence);
    return response;
  },
};
