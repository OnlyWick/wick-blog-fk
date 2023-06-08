import { createContext } from "react";
import { EmojiArrayType } from "../Common/EmojiSelector/EmojiSelector";

type CommentContextType = {
  emojiList: EmojiArrayType;
  onEmojiSelect?: (data: string) => void;
};
export const CommentContext = createContext<CommentContextType | undefined>(
  undefined
);
