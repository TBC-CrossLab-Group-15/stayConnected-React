import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RegisterDataType } from "../../types";
import { registerFormSchema } from "./shema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

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
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input id="name" type="text" placeholder="Name" {...field} />
            )}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastName">Last Name</Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                {...field}
              />
            )}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input id="email" type="email" placeholder="Email" {...field} />
            )}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...field}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...field}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="flex justify-between">
          <Button className="w-full" variant="outline" type="submit">
            Register
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-muted-foreground">Don't have an account?</p>
          <Button variant="link">
            <Link className="text-bold " to="/login">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
