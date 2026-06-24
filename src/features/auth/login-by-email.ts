import { useAuthStore } from "@/entities/auth";
import { AuthAttributes } from "@/entities/auth/auth.types";
import { JsonApiSingleResponse } from "@/types/api";

const handleLoginSuccess = (
  apiResponse: JsonApiSingleResponse<AuthAttributes>,
) => {
  useAuthStore.setCredentials(
    apiResponse.data.id,
    apiResponse.data.attributes.authToken,
  );
};
