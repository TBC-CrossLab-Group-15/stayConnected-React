import { httpClient } from "..";
import { QuestionType } from "./index.types";

type QuestionsListDataType = {
  page: number;
  page_size: number;
};

export const getQuestion = async (id: number) => {
  try {
    const result = await httpClient.get(`posts/questions/${id}`);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};
export type QuestionsListResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: QuestionType[];
};

export const getQuestions = async (
  params: QuestionsListDataType
): Promise<QuestionsListResponseType> => {
  try {
    const result = await httpClient.get("posts/questions/", {
      params,
    });
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};
