import { EmojiType } from "@/stories/Common/EmojiSelector/EmojiSelector";
import { axios } from "./base";
import { ResponseType } from "./type/ResponseType";

export const getEmoji = async (): Promise<ResponseType<EmojiType[]>> => {
  return await axios({
    url: "emoji",
    method: "get",
  });
};
