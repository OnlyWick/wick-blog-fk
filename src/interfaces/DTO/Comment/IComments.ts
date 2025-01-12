import IReplies from "./IReplies";
import IUser from "../IUser";
import IUserInteract from "../IUserInteract";

export default interface IComments {
  id: string;
  replier_id: string;
  content: string;
  article_id: string;
  updatedAt: string;
  voteUpCount: number;
  voteDownCount: number;
  user: IUser;
  reply_count: number;
  replies: IReplies[];
  user_interact?: IUserInteract;
}
