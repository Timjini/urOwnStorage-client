import { JsonApiSingleResponse } from "@/types/api";
import { AuthAttributes, IAuth } from "@/entities/auth/models/auth";
import { AuthApi } from "./api";

export const AuthService = {
  async createAccount(
    data: IAuth,
  ): Promise<JsonApiSingleResponse<AuthAttributes>> {
    try {
      const response = await AuthApi.signup(data);
      return response;
    } catch (error) {
      console.error("AuthService.create failed:", error);
      throw error;
    }
  },

  async createSession(
    data: IAuth,
  ): Promise<JsonApiSingleResponse<AuthAttributes>> {
    try {
      const response = await AuthApi.login(data);
      return response;
    } catch (error) {
      console.error("AuthService.create failed:", error);
      throw error;
    }
  },
};
