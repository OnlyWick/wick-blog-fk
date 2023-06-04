import IFromUser from "./IFromUser";
import ISubReply from "./ISubReply";
import IToUser from "./IToUser";

export default interface IReplies {
  id: string;
  content: string;
  reply_type: null;
  updatedAt: string;
  root_comment_id: string;
  from_user: IFromUser;
  sub_reply: ISubReply[];
  sub_reply_count: number;
}
