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
  data: LoginFormValues,
): Promise<LoginResponseType | undefined> => {
  try {
    const result = await httpClient.post(AUTH_ENDPOINTS.SIGN_IN, data);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        alert("Your Email or password is incorrect");
      }
      throw new Error(error.response?.data?.message || "Failed to login");
    }
  }
};

export const Register = async (
  data: RegisterDataType,
): Promise<RegisterResponseType | undefined> => {
  try {
    const result = await httpClient.post(AUTH_ENDPOINTS.SIGN_UP, data);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to register");
    }
  }
};

export const GetUser = async () => {
  try {
    const result = await httpClient.get(AUTH_ENDPOINTS.USER);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get User");
    }
  }
};

export const refresh = ({ payload }: RefreshPayload) => {
  return httpClient
    .post(AUTH_ENDPOINTS.REFRESH, payload)
    .then((res) => res.data);
};
export const Logout = ({ payload }: RefreshPayload) => {
  return httpClient
    .post(AUTH_ENDPOINTS.LOGOUT, payload)
    .then((res) => res.data);
};
