import { AxiosResponse } from "axios";
import { axios } from "./base";
import Response from "@/interfaces/Response";
import IReturnArticleDetail from "@/interfaces/DTO/Article/IArticleDetail";

type ResponseType<T> = AxiosResponse<Response<T>>;

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
