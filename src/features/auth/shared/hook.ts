import { AuthAttributes, IAuth } from "@/entities/auth/model";
import { useAppStore } from "@/entities/auth/store/store";
import { JsonApiSingleResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { AuthService } from "./service";
// import { useAppStore } from "@/entities/auth/store";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createAccountMutation = useMutation<
    JsonApiSingleResponse<AuthAttributes>,
    Error,
    IAuth
  >({
    mutationFn: (data: IAuth) => AuthService.createAccount(data),
    onSuccess: (response) => {
      console.log("response ======>", response);
      const authToken = response.data.attributes.authToken;

      console.log("Setting auth token to store:", authToken);
      useAppStore.getState().setAuth(authToken);
      queryClient.invalidateQueries({ queryKey: ["account"] });
      router.push({ pathname: "/home" });
    },
    onError: (error) =>
      console.error("creating an account failed:", error.message),
  });

  const createSessionMutation = useMutation<
    JsonApiSingleResponse<AuthAttributes>,
    Error,
    IAuth
  >({
    mutationFn: (data: IAuth) => AuthService.createSession(data),
    onSuccess: (response) => {
      const authToken = response.data.attributes.authToken;

      console.log("Setting auth token to store:", authToken);
      useAppStore.getState().setAuth(authToken);

      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push({ pathname: "/home" });
    },
    onError: (error) =>
      console.error("creating a session failed:", error.message),
  });

  return {
    createAccount: createAccountMutation,
    createSession: createSessionMutation,
  };
};
