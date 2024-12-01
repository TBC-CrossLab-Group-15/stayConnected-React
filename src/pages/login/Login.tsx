import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./components";

const Login: React.FC = () => {
  return (
    <div className=" flex items-center justify-center ">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle>
            <div className="w-full flex justify-center ">
              <img src="images/pc.jpg" alt="stayConnected" />
            </div>
          </CardTitle>
          <CardDescription>Login </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
