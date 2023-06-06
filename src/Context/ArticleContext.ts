import IArticleType from "@/interfaces/DTO/IArticleType";
import { createContext } from "react";

export interface IArticleContext {
  articleData: IArticleType;
  getMoreSubReply: Function;
}

export default createContext<IArticleContext | null>(null);
