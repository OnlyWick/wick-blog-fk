import { ChangeEvent, FocusEventHandler, createContext } from "react";
import { EmojiArrayType } from "../Common/EmojiSelector/EmojiSelector";
import { ICreateReply } from "@/interfaces/DTO/Comment/ICreateReply";

type CommentContextType = {
  value?: string;
  activeTextarea: string | null;
  onShowTextarea: (commentOrReplyId: string) => void;
  onHideTextarea: () => void;
  emojiList?: EmojiArrayType;
  onEmojiSelect?: (data: string) => void;
  onPublish?: (payload: string) => void;
  onReply?: (payload: Omit<ICreateReply, "article_id">) => void;
  onGetMoreComments?: () => void;
  onGetMoreReplies?: (replyId: string, page: string) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};
export const CommentContext = createContext<CommentContextType | null>(null);
