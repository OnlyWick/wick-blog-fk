import { AxiosResponse } from "axios";
import { axios } from "./base";
import Response from "@/interfaces/Response";
import IReturnArticleDetail from "@/interfaces/DTO/Article/IArticleDetail";
import { VoteArticleType } from "@/interfaces/DTO/IVoteArticle";
import { ResponseType } from "./type/ResponseType";

export const articleVote = async (
  articleId: string,
  voteType: VoteArticleType
): Promise<ResponseType<null>> => {
  return await axios({
    url: "/article/vote",
    method: "post",
    withCredentials: true,
    data: {
      vote_id: articleId,
      vote_type: voteType,
    },
  });
};

export const getArticleDetail = async (
  articleId: string
): Promise<ResponseType<IReturnArticleDetail>> => {
  return await axios({
    url: `article/detail`,
    method: "get",
    withCredentials: true,
    params: {
      article_id: articleId,
    },
  });
};
