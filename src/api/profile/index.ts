import { httpClient } from "..";

export const getUser = async () => {
  try {
    const result = await httpClient.get("/user/currentuser/");
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

export const changeAvagar = async ({
  id,
  payload,
}: {
  id: number;
  payload: string;
}) => {
  try {
    const result = await httpClient.put(`/user/profile/${id}`, payload);
    return result;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};
