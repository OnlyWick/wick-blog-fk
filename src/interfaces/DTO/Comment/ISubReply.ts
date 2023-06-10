import IFromUser from "../IFromUser";
import IToUser from "../IToUser";
import IParentReply from "./IParentReply";

export default interface ISubReply {
  id: string;
  content: string;
  reply_type: null;
  updatedAt: string;
  voteUpCount: number;
  voteDownCount: number;
  root_comment_id: null;
  from_user: IFromUser;
  to_user: IToUser;
  parent_reply: IParentReply;
}
