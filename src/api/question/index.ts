import { httpClient } from "..";

export const getQuestion = async (id: number) => {
  try {
    const result = await httpClient.get(`/posts/question/${id}`);
    return result;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};
