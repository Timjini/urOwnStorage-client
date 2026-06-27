import { LOGIN, SIGNUP } from "@/constants/appGlobal";
import { AuthAttributes, IAuth } from "@/entities/auth/models/auth";
import { apiClient } from "@/lib/apiClient";
import { JsonApiSingleResponse } from "@/types/api";

export const AuthApi = {
  async signup(data: IAuth): Promise<JsonApiSingleResponse<AuthAttributes>> {
    const response = await apiClient.post<JsonApiSingleResponse<AuthAttributes>>(`${SIGNUP}`,data);
    return response;
  },

  async login(data: IAuth): Promise<JsonApiSingleResponse<AuthAttributes>> {
    const reponse = await apiClient.post<JsonApiSingleResponse<AuthAttributes>>(`${LOGIN}`,data);
    return reponse;
  }
}
