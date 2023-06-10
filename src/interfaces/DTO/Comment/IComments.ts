import IReplies from "./IReplies";
import IUser from "../IUser";

export default interface IComments {
  id: string;
  replier_id: string;
  content: string;
  article_id: string;
  updatedAt: string;
  voteUpCount: number;
  voteDownCount: number;
  user: IUser;
  replies: IReplies[];
}
