import IFromUser from "./IFromUser";
import ISubReply from "./Comment/ISubReply";

export default interface IReplies {
  id: string;
  content: string;
  reply_type: null;
  updatedAt: string;
  root_comment_id: string;
  voteUpCount: number;
  voteDownCount: number;
  from_user: IFromUser;
  sub_reply: ISubReply[];
  sub_reply_count: number;
}
