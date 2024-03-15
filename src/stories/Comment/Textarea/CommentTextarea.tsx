import EmojiSelector from "@/stories/Common/EmojiSelector/EmojiSelector";
import EmojiIcon from "@/stories/Common/icon/EmojiIcon";
import { Button, Popover, TextArea } from "@douyinfe/semi-ui";
import {
  ChangeEvent,
  FocusEventHandler,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { CommentContext } from "../CommentContext";
import { ICreateReply } from "@/interfaces/DTO/Comment/ICreateReply";

const CommentActions = styled.div`
`;
interface EmojiSelectorWrapperProps {
  show?: boolean;
}
const EmojiSelectorWrapper = styled.div<EmojiSelectorWrapperProps>`
  position: absolute;
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 99888999998;
`;

const CommentActionRight = styled.div`
  display: flex;
  align-items: center;
`;
const CommentWordsLeft = styled.div`
  color: #7d7d7d;
  font-size: 12px;
  margin: 0 16px;
`;

interface CommentTextareaProps {
  value?: string;
  placeholder?: string;
  onEmojiSelect?: (data: string) => void;
  onPublish?: (content: string) => void; // 只留一个发布, 发布评论或者回复
  onReply?: (content: string) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}
export function CommentTextarea({
  value,
  placeholder,
  onEmojiSelect,
  onReply,
  onPublish,
  onChange,
  onBlur,
}: CommentTextareaProps) {
  const [internalValue, SetInternalValue] = useState("");
  const [curPointPosition, setCurPointPosition] = useState(0);
  const commentContext = useContext(CommentContext);
  const [count, setCount] = useState(0);
  const [maxLength, setMaxLength] = useState(0);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);

  // FIXME: setTimeout 可以, 但是记得修复(感觉不优雅, 临时解决)
  const handleFormatter = (info: any) => {
    setTimeout(() => {
      setCount(info.count);
      setMaxLength(info.maxLength);
    });
    return false;
  };

  const handleShowEmojiSelector = (event: any) => {
    setVisible(!visible)
  };

  const handleCloseEmojiSelector = () => {
    setShowEmojiSelector(false);
  };
  // TODO: 拿不到值
  // const handlePublishComment = async () => {
  //   onPublish && onPublish();
  // };
  const handleReplyComment = async (content: string) => {
    console.log("mlgb", onReply);
    onReply && onReply(content);
  };
  const handlePublish = (content: string) => {
    // 优先 publish
    if (onPublish) {
      onPublish(content);
    } else if (onReply) {
      // 没有就 reply
      onReply(content);
    }
  };
  const handleGetEmoji = (emoji: string) => {
    onEmojiSelect?.(emoji);
    const newValue = `${internalValue.slice(
      0,
      curPointPosition
    )}${emoji}${internalValue.slice(curPointPosition)}`;
    SetInternalValue(newValue);
    setVisible(false)
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const elem = e.target;
    SetInternalValue(elem.value);
    if (onChange) {
      onChange(e);
    } else {
      commentContext?.onChange?.(e);
    }
  };

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const elem = e.target;
    setCurPointPosition(elem.selectionStart);
    if (onBlur) {
      onBlur(e);
    } else {
      commentContext?.onBlur?.(e);
    }
  };
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TextArea
        value={internalValue}
        placeholder={placeholder ? placeholder : "快来发表一条友善的评论吧"}
        maxLength={500}
      />
      <div className="flex justify-between items-center mt-2">
        <div>
          <Popover visible={visible} onClickOutSide={() => setVisible(false)} trigger="custom" content={
            <EmojiSelector
              onEmojiSelect={handleGetEmoji}
              emojiList={
                commentContext && commentContext.emojiList
                  ? commentContext.emojiList
                  : []
              } />
          }>
            <Button
              icon={<EmojiIcon />}
              onClick={handleShowEmojiSelector}
            >
              表情
            </Button>
          </Popover>
        </div>
        <CommentActionRight>
          {count > 15 && (
            <CommentWordsLeft>剩余 {maxLength - count}</CommentWordsLeft>
          )}
          <Button type="primary" onClick={() => handlePublish(internalValue)}>
            发表评论
          </Button>
          {/* <Button type="primary">发表评论</Button> */}
        </CommentActionRight>
      </div>
    </>
  );
}
