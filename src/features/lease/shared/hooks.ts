import { useQueryClient } from "@tanstack/react-query";
import { LeaseService } from "./service";

export const useLease = () => {
  const queryClient = useQueryClient();

  const searchLeaseByReference = async (reference: string) => {
    const response = await LeaseService.searchLeaseByReference(reference);
    
    const singleLease = response?.data && Array.isArray(response.data) 
      ? response.data[0] 
      : response;

    queryClient.setQueryData(["lease", reference], singleLease);
    
    return singleLease;
  };

  return { searchLeaseByReference };
};