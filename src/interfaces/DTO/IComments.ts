import IReplies from "./IReplies";
import ISubReply from "./Comment/ISubReply";
import IUser from "./IUser";

export default interface IComments {
  id: string;
  author_id: string;
  content: string;
  article_id: string;
  voteUpCount: number;
  voteDownCount: number;
  updatedAt: string;
  replies: IReplies[];
  user: IUser;
}
