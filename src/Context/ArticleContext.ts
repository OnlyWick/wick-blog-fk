import ArticleType from "@/interfaces/IArticleType";
import IComments from "@/interfaces/IComments";
import { createContext } from "react";

export interface IArticleContext {
  articleData: ArticleType;
  // commentData: IComments;
  getMoreSubReply: Function;
}

export default createContext<IArticleContext | null>(null);
