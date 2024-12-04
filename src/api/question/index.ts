import { httpClient } from "..";

export const getQuestion = async (id: number) => {
  try {
    const result = await httpClient.get(`posts/questions/${id}`);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};
<<<<<<< HEAD
=======

export const getCorrectAnswer = async ({
  id,
  payload,
}: {
  id: number;
  payload: boolean;
}) => {
  try {
    const result = await httpClient.put(`posts/answers/${id}/`, payload);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};
>>>>>>> ff45b7a98e7bb13d2f76160177e96f216022a6c0
