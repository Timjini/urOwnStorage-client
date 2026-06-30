import { JsonApiSingleResponse } from "@/types/api";
import { Lease } from "@/entities/lease/models";
import { apiClient } from "@/lib/apiClient";
import { LEASE } from "@/constants/appGlobal";

export const LeaseApi = {
  async searchLeaseByReference(
    reference: string,
  ): Promise<JsonApiSingleResponse<Lease>> {
    const response = await apiClient.get<JsonApiSingleResponse<Lease>>(
      `${LEASE}?q[reference_eq]=${reference}`,
    );
    return response;
  },
};
