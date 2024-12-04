import { refresh } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useRefresh = () => {
  return useMutation({ mutationKey: ["refresh"], mutationFn: refresh });
};
