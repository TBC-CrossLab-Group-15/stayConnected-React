import { useHttpInterceptor } from "@/hooks/useHttpInterceptor";
import { useGetUser } from "@/react-query/query/auth";
import { createContext, PropsWithChildren } from "react";
import Loader from "@/components/loader/loader";

type UserType = {
  avatar: string | null;
  email: string;
  first_name: string;
  last_name: string;
  my_answers: number;
  rating: number;
};
type AuthContextType = {
  user: UserType | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  useHttpInterceptor();
  const { data: user, isFetching: isUserLoading } = useGetUser({
    isEnabled: !!accessToken,
    accessToken,
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {isUserLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
