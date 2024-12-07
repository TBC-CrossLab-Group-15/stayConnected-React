import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
};

export default AuthGuard;
