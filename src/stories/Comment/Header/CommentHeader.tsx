import { Avatar, Button, Divider } from "antd";
import styled from "styled-components";
import { Input } from "antd";
import { useEffect, useState } from "react";
import EmojiIcon from "@/stories/Common/icon/EmojiIcon";
import EmojiSelector from "@/stories/Common/EmojiSelector/EmojiSelector";

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

export default function CommentHeader() {
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

  const handleShowEmojiSelector = (event) => {
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

  return (
    <>
      <CommentHeaderWrapper>
        <CommentHeaderHeader>
          <CommentCount>79 条评论</CommentCount>
          <CommentLogin>
            <Button type="link">登录</Button>
          </CommentLogin>
        </CommentHeaderHeader>
        <CommentHeaderBody>
          <CommentHeaderLeft>
            <Avatar src="freddie.jpg" size={52}></Avatar>
          </CommentHeaderLeft>
          <CommentHeaderRight>
            <TextArea
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
                  <EmojiSelector />
                </EmojiSelectorWrapper>
              </CommentActionLeft>
              <CommentActionRight>
                {count > 15 && (
                  <CommentWordsLeft>剩余 {maxLength - count}</CommentWordsLeft>
                )}
                <Button type="primary">发表评论</Button>
              </CommentActionRight>
            </CommentActions>
          </CommentHeaderRight>
        </CommentHeaderBody>
      </CommentHeaderWrapper>
    </>
  );
}
