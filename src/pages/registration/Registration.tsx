import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RegistrationForm from "./components/registration-form";
import { useTranslation } from "react-i18next";

const Registration: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className=" flex items-center justify-center h-full  py-0 sm:p-00   sm:h-full ">
      <Card className="w-[370px]">
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
          <RegistrationForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
