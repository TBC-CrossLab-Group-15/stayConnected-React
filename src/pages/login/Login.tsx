import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./components";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className=" flex items-center justify-center h-screen ">
      <Card className="w-[370px] ">
        <CardHeader>
          <CardTitle>
            <div className="w-full flex justify-center mb-2 rounded-sm ">
              <img
                className="rounded-sm"
                src="/images/pc.jpg"
                alt="stayConnected"
              />
            </div>
          </CardTitle>
          <CardDescription>{t("enter-details")} </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
