import styled from "styled-components";
import CommentHeader from "./Header/CommentHeader";
import CommentItem from "./Item/CommentItem";
import { Card } from "antd";
import { ChangeEvent, FocusEventHandler, useContext, useEffect } from "react";
import IReturnComments from "@/interfaces/DTO/IReturnComments";
import { VoteCategoryType } from "@/interfaces/DTO/IVoteCommentOrReply";
import { EmojiArrayType } from "../Common/EmojiSelector/EmojiSelector";
import { CommentContext } from "./CommentContext";

const CommentWrapper = styled.div`
  width: 100%;
`;
const CommentListWrapper = styled.div`
  margin-top: 32px;
`;
interface CommentProps {
  commentData?: IReturnComments;
  value?: string;
  onPublish: () => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onVoteUp?: (id: string, categoryType: VoteCategoryType) => void;
  onVoteDown?: (id: string, categoryType: VoteCategoryType) => void;
}
// TODO: 组件内部使用 context 还差不多, 但是用户不需要传递 context
export default function Comment({
  commentData,
  value,
  onPublish,
  onChange,
  onBlur,
  onVoteUp,
  onVoteDown,
}: CommentProps) {
  const commentContext = useContext(CommentContext);
  return (
    <CommentWrapper>
      <Card>
        <CommentHeader
          onPublish={onPublish}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          commentCount={commentData?.count}
        ></CommentHeader>
        <CommentListWrapper>
          {Array.isArray(commentData?.data) &&
            commentData?.data.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onVoteUp={onVoteUp}
                onVoteDown={onVoteDown}
              ></CommentItem>
            ))}
        </CommentListWrapper>
      </Card>
    </CommentWrapper>
  );
}
