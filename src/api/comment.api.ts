import { VoteCategoryType } from "@/interfaces/DTO/IVoteCommentOrReply";
import { axios } from "./base";
import { AxiosRequestConfig } from "axios";
import { ReplyTypeEnum } from "@/interfaces/DTO/IReplyType";
import { ICreateComment } from "@/interfaces/DTO/Comment/ICreateComment";
import { ICreateReply } from "@/interfaces/DTO/Comment/ICreateReply";

export const publishComment = async (content: string, articleId: string) => {
  const config: AxiosRequestConfig<ICreateComment> = {
    method: "post",
    url: "/comment/publish",
    data: {
      content: content,
      article_id: articleId,
    },
  };
  return await axios(config);
};

export const replyComment = async (
  payload: ICreateReply,
  articleId: string
) => {
  const source_key =
    payload.reply_type === ReplyTypeEnum.COMMENT_TYPE
      ? "root_comment_id"
      : "root_reply_id";
  const config: AxiosRequestConfig<ICreateReply> = {
    method: "post",
    url: "/comment/reply",
    data: {
      ...payload,
    },
  };
  return await axios(config);
};

export const voteCommentOrReply = async (
  voteId: string,
  category: VoteCategoryType,
  voteType: number
) => {
  return await axios({
    method: "post",
    url: "/comment/vote",
    data: {
      vote_id: voteId,
      category: category,
      vote_type: voteType,
    },
  });
};
