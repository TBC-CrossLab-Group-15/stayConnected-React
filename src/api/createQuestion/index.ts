import { CreateQuestion_ENDPOINTS } from "../createQuestion/index.enum";
import { httpClient } from "..";

export interface CreateQuestionType {
  title: string;
  text: string;
  tags: number[];
}

export const CreateQuestionAPI = async (
  data: CreateQuestionType,
): Promise<CreateQuestionType> => {
  console.log("amis dabla");
  console.log(data);
  try {
    const response = await httpClient.post(
      CreateQuestion_ENDPOINTS.CreateQuestion,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to create question");
  }
};

export const fetchTags = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await httpClient.get("posts/tags/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    throw new Error("Error fetching tags");
  }
};

// const response = await fetch("/your-api-endpoint");
// const data = await response.json(); // ან response.text() თუ მონაცემები არ არის JSON
// console.log(data); // ნახეთ, როგორ ჩანს მონაცემები
