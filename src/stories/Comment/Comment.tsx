import styled from "styled-components";
import CommentHeader from "./Header/CommentHeader";
import CommentItem from "./Item/CommentItem";
import { Card } from "antd";
import { useContext, useEffect } from "react";
import IReturnComments from "@/interfaces/DTO/IReturnComments";
import { VoteCategoryType } from "@/interfaces/DTO/IVoteCommentOrReply";
import { EmojiArray } from "../Common/EmojiSelector/EmojiSelector";
import { CommentContext } from "./CommentContext";

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
// TODO: 数据传递全部改成 Context
export default function Comment({
  commentData,
  onVoteUp,
  onVoteDown,
}: CommentProps) {
  const commentContext = useContext(CommentContext);
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
