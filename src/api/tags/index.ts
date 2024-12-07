import { httpClient } from "..";
import { TagsResponseType } from "./index.types";
import { TAGS_ENDPOINTS } from "./index.enum";
import axios from "axios";

export const getTags = async (): Promise<TagsResponseType | undefined> => {
  try {
    const result = await httpClient.get(TAGS_ENDPOINTS.TAGS, {});
    console.log("Response Data:", result.data);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch leaderboard",
      );
    }
  }
};
