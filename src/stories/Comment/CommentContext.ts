import { ChangeEvent, FocusEventHandler, createContext } from "react";
import { EmojiArrayType } from "../Common/EmojiSelector/EmojiSelector";
import { ICreateReply } from "@/interfaces/DTO/ICreateReply";

type CommentContextType = {
  value?: string;
  activeTextarea: string | null;
  onShowTextarea: (commentOrReplyId: string) => void;
  onHideTextarea: () => void;
  emojiList?: EmojiArrayType;
  onEmojiSelect?: (data: string) => void;
  onPublish?: (content: string) => void;
  onReply?: (payload: ICreateReply) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};
export const CommentContext = createContext<CommentContextType | null>(null);
