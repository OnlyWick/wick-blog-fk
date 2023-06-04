import IReplies from "./IReplies";
import ISubReply from "./ISubReply";
import IUser from "./IUser";

export default interface IComments {
  id: string;
  author_id: string;
  content: string;
  article_id: string;
  updatedAt: string;
  replies: IReplies[];
  user: IUser;
}
