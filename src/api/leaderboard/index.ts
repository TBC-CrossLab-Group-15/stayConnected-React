import { httpClient } from "..";
import { LeaderBoardResponseType } from "./index.types";
import { LEADERBOARD_ENDPOINTS } from "./index.enum";
import axios from "axios";

type LeaderBoardDataType = {
  order: "asc" | "desc";
};

export const getLeaderBoard = async (
  params: LeaderBoardDataType,
): Promise<LeaderBoardResponseType | undefined> => {
  try {
    const result = await httpClient.get(LEADERBOARD_ENDPOINTS.LEADERBOARD, {
      params,
    });
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
