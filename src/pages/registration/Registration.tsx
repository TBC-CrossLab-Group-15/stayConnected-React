import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RegistrationForm from "./components/registration-form";

const Registration: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            <div className="w-full flex justify-center ">
              <img src="/images/pc.jpg" alt="stayConnected" />
            </div>
          </CardTitle>
          <CardDescription>Enter your details </CardDescription>
        </CardHeader>
        <CardContent>
          <RegistrationForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
