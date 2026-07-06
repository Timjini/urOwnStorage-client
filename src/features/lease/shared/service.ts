import { Lease, LeaseSchema } from "@/entities/lease/model";
import { JsonApiSingleResponse } from "@/types/api";
import { LeaseApi } from "./api";

export const LeaseService = {
  async searchLeaseByReference(
    reference: string,
  ): Promise<JsonApiSingleResponse<Lease>> {
    const response = await LeaseApi.searchLeaseByReference(reference);

    const singleLease =
      response?.data && Array.isArray(response.data)
        ? response.data[0]
        : response;

    const validation = LeaseSchema.safeParse(singleLease);

    if (!validation.success) {
      console.error("Lease validation failed:", validation.error.message);
      throw new Error("Invalid server response format");
    }
    return response;
  },
};
