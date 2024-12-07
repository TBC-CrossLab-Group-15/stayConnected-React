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
  params: QuestionsListDataType,
): Promise<QuestionsListResponseType> => {
  try {
    const result = await httpClient.get("posts/questions", {
      params,
    });
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

export const sendAnswer = async ({
  questionId,
  answerText,
}: {
  questionId: number;
  answerText: string;
}) => {
  try {
    const result = await httpClient.post(`posts/answers/`, {
      text: answerText,
      question: questionId,
    });
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

export const getCorrectAnswer = async ({
  id,
  payload,
}: {
  id: number;
  payload: boolean;
}) => {
  console.log(id, payload);
  try {
    const result = await httpClient.patch(`posts/answers/${id}/`, {
      isCorrect: payload,
    });
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

export const deleteAnswer = async (id: number) => {
  console.log(id);
  try {
    const result = await httpClient.delete(`posts/answers/${id}/`);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

export const deleteQuestion = async (id: number) => {
  try {
    const result = await httpClient.delete(`posts/questions/${id}/`);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

type FilterDataType = {
  tag: string;
};

export const filterByTag = async (params: FilterDataType) => {
  console.log(params);
  try {
    const result = await httpClient.get(`posts/search/?search=${params.tag}`);
    console.log("filtered data by tag:", result.data);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

export const filterByText = async (params: FilterDataType) => {
  console.log(params);
  try {
    const result = await httpClient.get(
      `posts/search/question/?search=${params.tag}`,
    );
    console.log("filtered data by text:", result.data);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};
