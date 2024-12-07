import { httpClient } from "@/api";
import { refresh } from "@/api/auth";
import { queryClient } from "@/main";
import { AfterLoginSuccessn } from "@/pages/login/components/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHttpInterceptor = () => {
  const navigate = useNavigate();
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);

  // const { mutate: handleRefresh } = useRefresh();

  useEffect(() => {
    httpClient.interceptors.response.use(
      (res) => {
        return res;
      },
      (resErr) => {
        const refreshToken = localStorage.getItem("refreshToken");
        const userId = localStorage.getItem("userId");

        if (resErr.status === 401 && refreshToken) {
          setIsRefreshLoading(true);
          refresh({ payload: { refresh: refreshToken } })
            .then((res) => {
              AfterLoginSuccessn({
                accessToken: res?.access,
                refreshToken: refreshToken,
                userId: Number(userId),
              });
              queryClient.invalidateQueries({ queryKey: ["user"] });
            })
            .catch(() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              navigate("login");
            })
            .finally(() => {
              setIsRefreshLoading(false);
            });
        }

        if (resErr.status === 401 && !refreshToken) {
          return Promise.reject(resErr);
        }

        return resErr;
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isRefreshLoading };
};
