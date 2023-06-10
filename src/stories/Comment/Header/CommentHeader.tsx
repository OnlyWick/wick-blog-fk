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
import { CommentTextarea } from "../Textarea/CommentTextarea";

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

interface CommentHeaderProps {
  commentCount?: number;
  value?: string;
  onPublish?: (content: string) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

export default function CommentHeader({
  commentCount,
  value,
  onPublish,
  onChange,
  onBlur,
}: CommentHeaderProps) {
  const commentContext = useContext(CommentContext);

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
            <CommentTextarea onPublish={onPublish}></CommentTextarea>
          </CommentHeaderRight>
        </CommentHeaderBody>
      </CommentHeaderWrapper>
    </>
  );
}
