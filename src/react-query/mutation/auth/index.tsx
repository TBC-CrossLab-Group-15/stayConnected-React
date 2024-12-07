import { refresh } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { Logout } from "@/api/auth";

export const useRefresh = () => {
  return useMutation({ mutationKey: ["refresh"], mutationFn: refresh });
};
export const useLogout = () => {
  return useMutation({ mutationKey: ["logout"], mutationFn: Logout });
};
