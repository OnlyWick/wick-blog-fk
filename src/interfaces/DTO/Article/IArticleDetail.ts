import IUserInteract from "../IUserInteract";
import IArticle from "./IArticle";

export default interface IReturnArticleDetail {
  detail: IArticle;

  user_interact?: IUserInteract;
}
