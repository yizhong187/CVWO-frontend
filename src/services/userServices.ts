import { ReplyModel } from "../interfaces/ReplyModel";
import { ThreadModel } from "../interfaces/ThreadModel";
import apiClient from "../services/api";

export const getUsernameByUserId = async (userID: string): Promise<string> => {
  try {
    const response = await apiClient.get<string>(`/username`, {
      params: { id: userID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const replyCount = async (
  threadID: number,
  subforumID: number
): Promise<number> => {
  interface responseModel {
    thread: ThreadModel;
    replies: ReplyModel[];
    replyCount: number;
  }

  try {
    const response = await apiClient.get<responseModel>(
      `/guest/subforum/${subforumID}/threads/${threadID}`
    );
    return response.data.replyCount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
