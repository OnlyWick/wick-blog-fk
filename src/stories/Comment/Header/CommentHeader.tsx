import { Avatar, Button } from "@douyinfe/semi-ui";
import styled from "styled-components";
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
  onLogin?: () => void;
  onPublish?: (content: string) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

export default function CommentHeader({
  commentCount,
  value,
  onPublish,
  onLogin,
  onChange,
  onBlur,
}: CommentHeaderProps) {
  return (
    <>
      <CommentHeaderWrapper>
        <CommentHeaderHeader>
          <div className="text-base text-gray-500 font-bold">
            {Number.isInteger(commentCount) && commentCount !== 0

              ? `${commentCount} 条评论`
              : "暂无评论"}
          </div>
          <CommentLogin>
            <Button onClick={onLogin}>
              登录
            </Button>
          </CommentLogin>
        </CommentHeaderHeader>
        <CommentHeaderBody>
          <CommentHeaderLeft>
            <Avatar src="/freddie.jpg" ></Avatar>
          </CommentHeaderLeft>
          <CommentHeaderRight>
            <CommentTextarea onPublish={onPublish}></CommentTextarea>
          </CommentHeaderRight>
        </CommentHeaderBody>
      </CommentHeaderWrapper>
    </>
  );
}
