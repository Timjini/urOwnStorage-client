import { Lease, LeaseSchema } from "@/entities/lease/model";
import { JsonApiSingleResponse } from "@/types/api";
import { LeaseApi } from "./api";

export const LeaseService = {
  async searchLeaseByReference(
    refence: string,
  ): Promise<JsonApiSingleResponse<Lease>> {
    const response = await LeaseApi.searchLeaseByReference(refence);

    const validation = LeaseSchema.safeParse(response.data);

    if (!validation.success) {
      console.error("Lease validation failed:", validation.error.message);
      throw new Error("Invalid server response format");
    }
    return response;
  },
};
