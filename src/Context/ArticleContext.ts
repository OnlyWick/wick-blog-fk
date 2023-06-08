import IArticle from "@/interfaces/DTO/IArticle";
import { createContext } from "react";

export interface IArticleContext {
  articleData: IArticle;
  getMoreSubReply: Function;
}

export default createContext<IArticleContext | null>(null);
