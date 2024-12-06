import { PropsWithChildren } from "react";

const MainSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="
        p-4
        sm:p-10
        flex items-center justify-center bg-background  dark:text-white"
    >
      {children}
    </div>
  );
};

export default MainSection;
