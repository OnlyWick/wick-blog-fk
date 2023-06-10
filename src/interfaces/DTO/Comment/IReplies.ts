import IFromUser from "../IFromUser";
import IToUser from "../IToUser";
import IParentReply from "./IParentReply";

export default interface IReplies {
  id: string;
  content: string;
  updatedAt: string;
  from_user_id: string;
  root_comment_id: string;
  parent_reply_id: null;
  voteUpCount: number;
  voteDownCount: number;
  parent_reply?: IParentReply;
  from_user: IFromUser;
  to_user: IToUser;
}
