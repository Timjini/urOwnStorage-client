import { JsonApiSingleResponse } from "@/types/api";
import { AuthAttributes, IAuth } from "@/entities/auth/models/auth";
import { createAccount, createSession } from "../api";

export const AuthService = {
  async createAccount(data: IAuth): Promise<JsonApiSingleResponse<AuthAttributes>> {
    try {
      const response = await createAccount(data);
      return response;
    } catch (error) {
      console.error("AuthService.create failed:", error);
      throw error;
    }
  },

  async createSession(data: IAuth): Promise<JsonApiSingleResponse<AuthAttributes>> {
    try{
      const response = await createSession(data);
      return response;
    } catch (error: any) {
      console.error("AuthService.create failed:", error);
    }
  }
};
