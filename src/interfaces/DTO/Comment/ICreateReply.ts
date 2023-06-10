import { ReplyTypeEnum } from "../IReplyType";

export interface ICreateReply {
  content: string;

  article_id: string;

  root_comment_id: string;

  to_user_id: string;

  parent_id?: string;
}
