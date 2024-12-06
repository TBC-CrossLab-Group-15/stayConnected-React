import { PropsWithChildren } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProfileGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate state={{ from: location }} to="/login" />;
  }

  return children || <Outlet />;
};

export default ProfileGuard;
