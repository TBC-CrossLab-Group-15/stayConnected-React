import { LoginFormValues } from "@/pages/login/components/types/types";
import { httpClient } from "..";
import { RegisterDataType } from "@/pages/registration/types";
import {
  LoginResponseType,
  RefreshPayload,
  RegisterResponseType,
} from "./index.types";
import axios from "axios";
import { AUTH_ENDPOINTS } from "./index.enum";

export const Login = async (
  data: LoginFormValues
): Promise<LoginResponseType | undefined> => {
  try {
    console.log(data);
    const result = await httpClient.post(AUTH_ENDPOINTS.SIGN_IN, data);
    console.log("Response data:", result.data);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to login");
    }
  }
};

// Adjust the import path as needed

export const Register = async (
  data: RegisterDataType
): Promise<RegisterResponseType | undefined> => {
  try {
    const result = await httpClient.post(AUTH_ENDPOINTS.SIGN_UP, data);
    console.log("Response data:", result.data);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to register");
    }
  }
};

export const GetUser = async () => {
  try {
    const result = await httpClient.get(AUTH_ENDPOINTS.USER);
    console.log("Response data:", result);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to register");
    }
  }
};

export const refresh = ({ payload }: RefreshPayload) => {
  console.log("This is Payload: ", payload);

  return httpClient
    .post(AUTH_ENDPOINTS.REFRESH, payload)
    .then((res) => res.data);
};
