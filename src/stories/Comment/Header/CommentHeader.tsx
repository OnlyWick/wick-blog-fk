import { Avatar, Button, Divider } from "antd";
import styled from "styled-components";
import { Input } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import EmojiIcon from "@/stories/Common/icon/EmojiIcon";
import EmojiSelector from "@/stories/Common/EmojiSelector/EmojiSelector";
import ArticleContext from "@/Context/ArticleContext";
import { CommentContext } from "../CommentContext";
import { ChangeEvent } from "react";
import { FocusEventHandler } from "react";

const { TextArea } = Input;

const CommentHeaderWrapper = styled.div``;

const CommentHeaderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  border-bottom: 2px solid #c2c6cc;
  padding: 12px 0;
`;

const CommentCount = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #2a2e2e;
  font-weight: bold;
`;
const CommentLogin = styled.div`
  & > .ant-btn {
    color: #494e58;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  }
`;

const CommentHeaderBody = styled.div`
  display: flex;
`;

const CommentHeaderLeft = styled.div``;
const CommentHeaderRight = styled.div`
  margin-left: 16px;
  flex: 1;
`;

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
  z-index: 1;
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

interface CommentHeaderProps {
  commentCount?: number;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

export default function CommentHeader({
  commentCount,
  value,
  onChange,
  onBlur,
}: CommentHeaderProps) {
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

  useEffect(() => {
    document.body.addEventListener("click", handleCloseEmojiSelector);
    return () => {
      document.body.removeEventListener("click", handleCloseEmojiSelector);
    };
  }, [showEmojiSelector]);

  const handleLogin = () => {
    const childWindow = window.open(
      `${window.location.origin}/oauth/?platform=github`,
      "_blank",
      "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=800, height=600"
    );

    // 授权页面关闭后后刷新父窗口
    const timerId = window.setInterval(function () {
      console.log("关闭", childWindow?.closed);
      if (!(childWindow && !childWindow.closed)) {
        window.clearInterval(timerId);
        setTimeout(function () {
          window.location.reload();
        }, 100);
      }
    }, 300);
  };

  // TODO: 父元素传递进来
  const handlePublishComment = async () => {
    const res = await fetch(`http://localhost:9396/article/703400588868952123`);
    console.log(await res.json());
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e);
  };

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    onBlur && onBlur(e);
  };

  return (
    <>
      <CommentHeaderWrapper>
        <CommentHeaderHeader>
          <CommentCount>
            {Number.isInteger(commentCount) && commentCount !== 0
              ? `${commentCount} 条评论`
              : "暂无评论"}
          </CommentCount>
          <CommentLogin>
            <Button type="link" onClick={handleLogin}>
              登录
            </Button>
          </CommentLogin>
        </CommentHeaderHeader>
        <CommentHeaderBody>
          <CommentHeaderLeft>
            <Avatar src="/freddie.jpg" size={52}></Avatar>
          </CommentHeaderLeft>
          <CommentHeaderRight>
            <TextArea
              size={"large"}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="快来发表一条友善的评论吧"
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
          </CommentHeaderRight>
        </CommentHeaderBody>
      </CommentHeaderWrapper>
    </>
  );
}
