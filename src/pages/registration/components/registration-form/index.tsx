import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RegisterDataType } from "../../types";
import { registerFormSchema } from "./shema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegistrationForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { t } = useTranslation();
  const onSubmit = (values: RegisterDataType) => {
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("register successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">{t("name")}</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input id="name" type="text" placeholder={t("name")} {...field} />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              {t(`${errors.name.message}`)}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastName">{t("last-name")}</Label>
          <Controller
            name="lastName"
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
          {errors.lastName && (
            <p className="text-red-500 text-sm">
              {t(`${errors.lastName.message}`)}
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
            <p className="text-red-500 text-sm">
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
            <p className="text-red-500 text-sm">
              {t(`${errors.password.message}`)}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="confirmPassword">{t("confirm-password")}</Label>
          <Controller
            name="confirmPassword"
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
          {errors.password && (
            <p className="text-red-500 text-sm">
              {t(`${errors.password.message}`)}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <Button className="w-full" variant="outline" type="submit">
            {t("sign-up")}
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-muted-foreground text-xs">
            {t("already-have-account")}{" "}
          </p>
          <Button variant="link">
            <Link className="text-bold  " to="/login">
              {t("sign-in")}
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
