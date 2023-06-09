import EmojiSelector from "@/stories/Common/EmojiSelector/EmojiSelector";
import EmojiIcon from "@/stories/Common/icon/EmojiIcon";
import { Button, Input } from "antd";
import {
  ChangeEvent,
  FocusEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { CommentContext } from "../CommentContext";

const { TextArea } = Input;

const CommentActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const CommentActionLeft = styled.div`
  position: relative;

  & > .ant-btn:first-child {
    padding: 0;
  }
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
  onPublish?: () => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}
export function CommentTextarea({
  value,
  placeholder,
  onEmojiSelect,
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
    event.stopPropagation();
    setShowEmojiSelector(true);
  };
  const handleCloseEmojiSelector = () => {
    setShowEmojiSelector(false);
  };
  const handlePublishComment = async () => {
    onPublish && onPublish();
  };
  const handleGetEmoji = (emoji: string) => {
    onEmojiSelect?.(emoji);
    const newValue = `${internalValue.slice(
      0,
      curPointPosition
    )}${emoji}${internalValue.slice(curPointPosition)}`;
    SetInternalValue(newValue);
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

  useEffect(() => {
    document.body.addEventListener("click", handleCloseEmojiSelector);
    return () => {
      document.body.removeEventListener("click", handleCloseEmojiSelector);
    };
  }, [showEmojiSelector]);

  return (
    <>
      <TextArea
        size={"large"}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder ? placeholder : "快来发表一条友善的评论吧"}
        autoSize
        maxLength={500}
        showCount={{
          formatter: (info) => handleFormatter(info),
        }}
      />
      <CommentActions>
        <CommentActionLeft>
          <Button
            type="link"
            icon={<EmojiIcon />}
            onClick={handleShowEmojiSelector}
          >
            表情
          </Button>
          <EmojiSelectorWrapper show={showEmojiSelector}>
            <EmojiSelector
              onEmojiSelect={handleGetEmoji}
              emojiList={
                commentContext && commentContext.emojiList
                  ? commentContext.emojiList
                  : []
              }
            />
          </EmojiSelectorWrapper>
        </CommentActionLeft>
        <CommentActionRight>
          {count > 15 && (
            <CommentWordsLeft>剩余 {maxLength - count}</CommentWordsLeft>
          )}
          <Button type="primary" onClick={handlePublishComment}>
            发表评论
          </Button>
        </CommentActionRight>
      </CommentActions>
    </>
  );
}
