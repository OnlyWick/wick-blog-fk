import styled from "styled-components";
import CommentHeader from "./Header/CommentHeader";
import CommentItem from "./Item/CommentItem";
import { Card } from "antd";
import { useEffect } from "react";
import IComments from "@/interfaces/DTO/IComments";
import IReturnComments from "@/interfaces/DTO/IReturnComments";
import { VoteCategoryType } from "@/interfaces/DTO/IVoteCommentOrReply";

const CommentWrapper = styled.div`
  width: 100%;
`;
const CommentListWrapper = styled.div`
  margin-top: 32px;
`;
interface CommentProps {
  commentData?: IReturnComments;
  onVoteUp?: (id: string, categoryType: VoteCategoryType) => void;
  onVoteDown?: (id: string, categoryType: VoteCategoryType) => void;
}
export default function Comment({
  commentData,
  onVoteUp,
  onVoteDown,
}: CommentProps) {
  return (
    <CommentWrapper>
      <Card>
        <CommentHeader commentCount={commentData?.count}></CommentHeader>
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
