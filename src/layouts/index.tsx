import Header from "@/components/header";
import { Footer } from "@/components/footer/Footer";
import MainSection from "@/components/main-section";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>  
    <Link to="questionPage" className="bg-blue-300 ">QuestionPage</Link>
      <Header />
      <MainSection>
        <Outlet />
      </MainSection>
      <Footer />
    </>
  );
};

export default Layout;
