import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";


const MainSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="
        p-10
        flex items-center justify-center"
    >
      {children}
      <Link to="./questionPage">questionPage</Link>
    </div>
  );
};

export default MainSection;
