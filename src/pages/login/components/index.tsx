import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LoginDefaultValues } from "./login-default-values";
import { LoginFormValues } from "./types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "./schema";
import { Label } from "@radix-ui/react-label";

import { useTranslation } from "react-i18next";

import { Login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: LoginDefaultValues,
  });
  const { t } = useTranslation();
  const { mutate: handleLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (data) => {
      console.log("User signed in:", data);
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    const { email, password } = values;
    alert("login successfully");
    console.log(email, password);
    handleLogin(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      {/* მეილი */}
      <div className="flex flex-col space-y-1.5">
        <Label
          htmlFor="email"
          className="
        text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("email")}
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              id="email"
              type="email"
              placeholder={t("email-placeholder")}
              {...field}
            />
          )}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      {/* პაროლი */}
      <div className="flex flex-col space-y-1.5">
        <Label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("password")}
        </Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              id="password"
              type="password"
              placeholder={t("password-placeholder")}
              {...field}
            />
          )}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      {/*დალოგინება/რეგისტრაციაზე გადასვლა */}
      <div className="flex justify-between">
        <Button className="w-full" variant="outline" type="submit">
          {t("sign-in")}
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-muted-foreground text-xs">{t("no-account")} </p>
        <Button variant="link">
          <Link className="text-bold " to="/signup">
            {t("sign-up")}
          </Link>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
