import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProfileGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return children || <Outlet />;
};

export default ProfileGuard;
