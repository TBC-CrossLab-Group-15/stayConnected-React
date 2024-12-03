import { LoginFormValues } from "@/pages/login/types/types";
import { httpClient } from "..";
import { RegisterDataType } from "@/pages/registration/types";
import { LoginResponseType, RegisterResponseType } from "./types";

export const Login = async (
  data: LoginFormValues
): Promise<LoginResponseType> => {
  try {
    const result = await httpClient.post("/login", data);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

// Adjust the import path as needed

export const Register = async (
  data: RegisterDataType
): Promise<RegisterResponseType> => {
  try {
    const result = await httpClient.post("/register", data);
    console.log("Response data:", result.data);
    return result.data;
  } catch (error: any) {
    console.log("Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to register");
  }
};
