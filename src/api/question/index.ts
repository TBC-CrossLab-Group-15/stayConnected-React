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

export const sendAnswer = async ({ questionId, answerText }: { questionId: number; answerText: string }) => {
  


  try {
    const result = await httpClient.post(`posts/answers/`, {text: answerText, question: questionId});
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
}

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
