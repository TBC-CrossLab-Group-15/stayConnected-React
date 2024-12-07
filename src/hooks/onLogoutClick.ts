import { Logout } from "@/api/auth";

const UseLogoutClick = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  Logout({ payload: { refresh: refreshToken } }).then((res) => {
    return res.data;
  });
};

export default UseLogoutClick;
