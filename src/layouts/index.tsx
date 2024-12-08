import Header from "@/components/header";
import { Footer } from "@/components/footer/Footer";
import MainSection from "@/components/main-section";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
   <>      
    <Header />
      <MainSection>
        <Outlet />
      </MainSection>
      <Footer />
      </>

  );
};

export default Layout;
