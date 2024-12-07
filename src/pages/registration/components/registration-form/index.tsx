import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RegisterDataType } from "../../types";
import { registerFormSchema } from "./shema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/api/auth/index.ts";
import { RegistrationDefaultValues } from "../registration-default-values/index.tsx";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: RegistrationDefaultValues,
  });
  const { t } = useTranslation();

  const { mutate: handleRegister } = useMutation({
    mutationKey: ["register"],
    mutationFn: Register,
    onSuccess: (data) => {
      console.log("User signed in:", data);
      navigate("/login");
    },
  });
  const onSubmit = (values: RegisterDataType) => {
    if (values.password !== values.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    console.log("values:", values);
    handleRegister(values);
    alert("register successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="first_name">{t("name")}</Label>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input id="name" type="text" placeholder={t("name")} {...field} />
            )}
          />

          {errors.first_name && (
            <p className="text-sm text-destructive">
              {t(`${errors.first_name.message}`)}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastName">{t("last-name")}</Label>
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input
                id="lastName"
                type="text"
                placeholder={t("last-name")}
                {...field}
              />
            )}
          />

          {errors.last_name && (
            <p className="text-sm text-destructive">
              {t(`${errors.last_name.message}`)}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">{t("email")}</Label>
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
            <p className="text-sm text-destructive">
              {t(`${errors.email.message}`)}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor={t("password")}>{t("password")}</Label>
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
            <p className="text-sm text-destructive">
              {t(`${errors.password.message}`)}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="confirmPassword">{t("confirm-password")}</Label>
          <Controller
            name="confirm_password"
            control={control}
            render={({ field }) => (
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t("confirm-password-placeholder")}
                {...field}
              />
            )}
          />

          {errors.confirm_password && (
            <p className="text-sm text-destructive">
              {t(`${errors.confirm_password.message}`)}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <Button className="w-full " variant="primary" type="submit">
            {t("sign-up")}
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-muted-foreground text-xs">
            {t("already-have-account")}
          </p>
          <Button variant="link">
            <Link className="text-bold text-lg text-accent " to="/login">
              {t("sign-in")}
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
