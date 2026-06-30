import { useQueryClient } from "@tanstack/react-query";
import { LeaseService } from "./service";

export const useLease = () => {
  const queryClient = useQueryClient();

  const searchLeaseByReference = async (reference: string) => {
    const response = await LeaseService.searchLeaseByReference(reference);
    queryClient.setQueryData(["lease", reference], response);
    return response;
  };

  return { searchLeaseByReference };
};
