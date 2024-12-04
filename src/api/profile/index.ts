import { httpClient } from "..";

export const changeAvagar = async ({
  id,
  avatar,
}: {
  id: number;
  avatar: string;
}) => {
  try {
    const result = await httpClient.put(`/user/profile/${id}/`, {
      "avatar_id": avatar
    } );
    return result;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

export const getUser = async () => {
  try {
    const result = await httpClient.get("/user/currentuser");

    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};