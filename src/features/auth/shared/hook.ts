import { JsonApiSingleResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { AuthAttributes, IAuth } from "@/entities/auth/models/auth";
import { AuthService } from "./service";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createAccountMutation = useMutation<JsonApiSingleResponse<AuthAttributes>, Error, IAuth>({
    mutationFn: (data: IAuth) => AuthService.createAccount(data),
    onSuccess: (response) => {
      console.log("response ======>", response);
      queryClient.invalidateQueries({ queryKey: ["account"] });
      router.push({ pathname: "/home" });
    },
    onError: (error) =>
      console.error("creating an account failed:", error.message),
  });

  const createSessionMutation = useMutation<JsonApiSingleResponse<AuthAttributes>, Error, IAuth>({
    mutationFn: (data: IAuth) => AuthService.createSession(data),
    onSuccess: (response) => {
      console.log("response ======>", response);
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