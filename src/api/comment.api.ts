import { VoteCategoryType } from "@/interfaces/DTO/IVoteCommentOrReply";
import { axios } from "./base";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ReplyTypeEnum } from "@/interfaces/DTO/IReplyType";
import { ICreateComment } from "@/interfaces/DTO/Comment/ICreateComment";
import { ICreateReply } from "@/interfaces/DTO/Comment/ICreateReply";
import { IGetMoreReply } from "@/interfaces/DTO/Comment/IGetMoreReply";
import IReplies from "@/interfaces/DTO/Comment/IReplies";
import Response from "@/interfaces/Response";

type AsyncResponseType<T> = AxiosResponse<Response<T>>;

export const getComments = async (articleId: string) => {
  return await axios({
    url: `http://192.168.31.86:9396/comment/list`,
    method: "get",
    params: {
      article_id: articleId,
    },
  });
};

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

export const replyComment = async (payload: ICreateReply) => {
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

export const getMoreReply = async (
  commentId: string,
  page: string
): Promise<Response<IReplies>> => {
  const config: AxiosRequestConfig<IGetMoreReply> = {
    url: "comment/getMoreReply",
    method: "get",
    params: {
      comment_id: commentId,
      page,
    },
  };
  return (await axios(config)).data;
};
